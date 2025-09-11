from fastapi import FastAPI, Depends, status, HTTPException, Request
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Annotated
from datetime import datetime, timedelta, date
from jose import JWTError, jwt
import logging
import smtplib
from email.mime.text import MIMEText
from email.header import Header

from app.core.database import DatabaseManager
from app.repositories.user_repository import UserRepository
from app.schemas.user_schema import UserRegister, UserResponse, UserLogin
from app.exceptions import (
    UserRegistrationException,
    EmailAlreadyExistsException,
    PhoneAlreadyExistsException,
    UserNotFoundException,
    InvalidCredentialsException,
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="ReScrub User API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db_manager = DatabaseManager()
db_manager.create_tables()

ALGORITHM = "HS256"
SECRET_KEY = "ydkdskdwwwwljsdheajlfdkaekfhkld"
REFRESH_SECRET_KEY = "hdkewlwkwejk1"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 30
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login/")


class Token(BaseModel):
    access_token: str
    token_type: str
    expires_in: int
    user_id: int
    email: str
    refresh_token: str
    refresh_expires_in: int

    class Config:
        json_schema_extra = {
            "example": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "bearer",
                "expires_in": 1800,
                "user_id": 1,
                "email": "user@example.com",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "refresh_expires_in": 2592000
            }
        }


class RefreshRequest(BaseModel):
    refresh_token: Optional[str] = None


class AccessTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class UpdateEmailRequest(BaseModel):
    email: EmailStr


class UpdatePhoneRequest(BaseModel):
    phone: Annotated[str, Field(pattern=r"^\+\d{11,15}$")]


class UpdateFirstNameRequest(BaseModel):
    firstName: Annotated[str, Field(min_length=1, max_length=100)]


class UpdateLastNameRequest(BaseModel):
    lastName: Annotated[str, Field(min_length=1, max_length=100)]


class UpdateMiddleNameRequest(BaseModel):
    middleName: Optional[Annotated[str, Field(min_length=1, max_length=100)]] = None


class UpdateBirthDateRequest(BaseModel):
    birthDate: Optional[date] = None


class MailRequest(BaseModel):
    recipients: list[str] = []


@app.exception_handler(UserRegistrationException)
async def user_registration_handler(request: Request, exc: UserRegistrationException):
    logger.error(f"Registration error: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail, "timestamp": datetime.now().isoformat()}
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    errors = exc.errors()
    first_error = errors[0]
    error_msg = first_error.get("msg", "Validation error")

    if "ctx" in first_error and isinstance(first_error["ctx"], dict) and "reason" in first_error["ctx"]:
        error_msg += f": {first_error['ctx']['reason']}"

    return JSONResponse(
        status_code=422,
        content={"detail": error_msg}
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire, "type": "access"})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS))
    to_encode.update({"exp": expire, "type": "refresh"})
    return jwt.encode(to_encode, REFRESH_SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])


def decode_refresh_token(token: str):
    return jwt.decode(token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM])


async def get_current_user(
        token: str = Depends(oauth2_scheme),
        db: Session = Depends(db_manager.get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Недействительные учетные данные",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_access_token(token)
        if payload.get("type") != "access":
            raise credentials_exception
        user_id: Optional[str] = payload.get("sub")
        if not user_id:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    repo = UserRepository(db)
    user = repo.get_user_by_id(int(user_id))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def ensure_self(user_id_path: int, current_user_id: int):
    if user_id_path != current_user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Нельзя изменять данные другого пользователя"
        )


@app.post(
    "/register/",
    status_code=status.HTTP_201_CREATED,
    responses={
        201: {"description": "User created successfully"},
        400: {"description": "Invalid input data"},
        409: {"description": "User already exists"},
        422: {"description": "Validation error"},
        500: {"description": "Internal server error"},
    },
)
async def register_user(user_data: UserRegister, db: Session = Depends(db_manager.get_db)):
    try:
        repo = UserRepository(db)
        user = repo.register_user(user_data)
        logger.info(f"User registered: {user.email}")
        return {"message": "Пользователь успешно зарегистрирован.", "userId": user.userid, "email": user.email}
    except EmailAlreadyExistsException:
        raise HTTPException(status_code=409, detail="Пользователь с таким email уже существует")
    except PhoneAlreadyExistsException:
        raise HTTPException(status_code=409, detail="Пользователь с таким телефоном уже существует")


@app.post(
    "/login/",
    response_model=Token,
    responses={
        200: {"description": "Successful login"},
        400: {"description": "Invalid input data"},
        401: {"description": "Invalid credentials"},
        404: {"description": "User not found"},
        422: {"description": "Validation error"},
    },
)
async def login_user(login_data: UserLogin, db: Session = Depends(db_manager.get_db)):
    try:
        repo = UserRepository(db)
        user = repo.authenticate_user(login_data)

        access_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        refresh_expires = timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)

        access_token = create_access_token(
            data={"sub": str(user.userid), "email": user.email},
            expires_delta=access_expires
        )
        refresh_token = create_refresh_token(
            data={"sub": str(user.userid), "email": user.email},
            expires_delta=refresh_expires
        )

        return Token(
            access_token=access_token,
            token_type="bearer",
            expires_in=int(access_expires.total_seconds()),
            user_id=user.userid,
            email=user.email,
            refresh_token=refresh_token,
            refresh_expires_in=int(refresh_expires.total_seconds())
        )

    except (InvalidCredentialsException, UserNotFoundException):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверные учетные данные",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail="Ошибка сервера при аутентификации")


@app.post(
    "/refresh/",
    response_model=AccessTokenResponse,
    responses={200: {"description": "Token refreshed"}, 401: {"description": "Invalid refresh token"}},
)
async def refresh_access_token(payload: RefreshRequest):
    refresh_token = payload.refresh_token
    if not refresh_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token отсутствует")

    try:
        refresh_payload = decode_refresh_token(refresh_token)
        if refresh_payload.get("type") != "refresh":
            raise JWTError("Invalid token type")

        user_id = refresh_payload.get("sub")
        email = refresh_payload.get("email")
        if not user_id:
            raise JWTError("Missing subject")

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Недействительный refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    new_access = create_access_token(data={"sub": str(user_id), "email": email}, expires_delta=access_expires)

    return AccessTokenResponse(access_token=new_access, expires_in=int(access_expires.total_seconds()),
                               token_type="bearer")


@app.get(
    "/users/{user_id}",
    response_model=UserResponse,
    responses={200: {"description": "User data"}, 404: {"description": "User not found"},
               500: {"description": "Internal server error"}},
)
async def get_user(user_id: int, db: Session = Depends(db_manager.get_db)):
    repo = UserRepository(db)
    user = repo.get_user_by_id(user_id)
    if not user:
        logger.warning(f"User not found: {user_id}")
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


@app.patch(
    "/users/{user_id}/email",
    response_model=UserResponse,
    responses={200: {"description": "Email updated"}, 401: {"description": "Unauthorized"},
               403: {"description": "Forbidden"},
               409: {"description": "Email already exists"}, 404: {"description": "User not found"},
               422: {"description": "Validation error"}},
)
async def update_email(user_id: int, payload: UpdateEmailRequest, db: Session = Depends(db_manager.get_db),
                       current=Depends(get_current_user)):
    ensure_self(user_id, current.userid)
    repo = UserRepository(db)
    try:
        repo.update_user(user_id, email=payload.email)
    except EmailAlreadyExistsException:
        raise HTTPException(status_code=409, detail="Пользователь с таким email уже существует")
    user = repo.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.patch(
    "/users/{user_id}/phone",
    response_model=UserResponse,
    responses={200: {"description": "Phone updated"}, 401: {"description": "Unauthorized"},
               403: {"description": "Forbidden"},
               409: {"description": "Phone already exists"}, 404: {"description": "User not found"},
               422: {"description": "Validation error"}},
)
async def update_phone(user_id: int, payload: UpdatePhoneRequest, db: Session = Depends(db_manager.get_db),
                       current=Depends(get_current_user)):
    ensure_self(user_id, current.userid)
    repo = UserRepository(db)
    try:
        repo.update_user(user_id, phone=payload.phone)
    except PhoneAlreadyExistsException:
        raise HTTPException(status_code=409, detail="Пользователь с таким телефоном уже существует")
    user = repo.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.patch(
    "/users/{user_id}/first-name",
    response_model=UserResponse,
    responses={200: {"description": "First name updated"}, 401: {"description": "Unauthorized"},
               403: {"description": "Forbidden"},
               404: {"description": "User not found"}, 422: {"description": "Validation error"}},
)
async def update_first_name(user_id: int, payload: UpdateFirstNameRequest, db: Session = Depends(db_manager.get_db),
                            current=Depends(get_current_user)):
    ensure_self(user_id, current.userid)
    repo = UserRepository(db)
    repo.update_user(user_id, firstName=payload.firstName)
    user = repo.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.patch(
    "/users/{user_id}/last-name",
    response_model=UserResponse,
    responses={200: {"description": "Last name updated"}, 401: {"description": "Unauthorized"},
               403: {"description": "Forbidden"},
               404: {"description": "User not found"}, 422: {"description": "Validation error"}},
)
async def update_last_name(user_id: int, payload: UpdateLastNameRequest, db: Session = Depends(db_manager.get_db),
                           current=Depends(get_current_user)):
    ensure_self(user_id, current.userid)
    repo = UserRepository(db)
    repo.update_user(user_id, lastName=payload.lastName)
    user = repo.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.patch(
    "/users/{user_id}/middle-name",
    response_model=UserResponse,
    responses={200: {"description": "Middle name updated"}, 401: {"description": "Unauthorized"},
               403: {"description": "Forbidden"},
               404: {"description": "User not found"}, 422: {"description": "Validation error"}},
)
async def update_middle_name(user_id: int, payload: UpdateMiddleNameRequest, db: Session = Depends(db_manager.get_db),
                             current=Depends(get_current_user)):
    ensure_self(user_id, current.userid)
    repo = UserRepository(db)
    repo.update_user(user_id, middleName=payload.middleName)
    user = repo.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.patch(
    "/users/{user_id}/birth-date",
    response_model=UserResponse,
    responses={200: {"description": "Birth date updated"}, 401: {"description": "Unauthorized"},
               403: {"description": "Forbidden"},
               404: {"description": "User not found"}, 422: {"description": "Validation error"}},
)
async def update_birth_date(user_id: int, payload: UpdateBirthDateRequest, db: Session = Depends(db_manager.get_db),
                            current=Depends(get_current_user)):
    ensure_self(user_id, current.userid)
    repo = UserRepository(db)
    repo.update_user(user_id, birthDate=payload.birthDate)
    user = repo.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.post(
    "/mail",
    status_code=200,
    responses={200: {"description": "Emails sent"}, 401: {"description": "Unauthorized"},
               500: {"description": "Mail server error"}},
)
async def send_mail(mail_data: MailRequest, current_user=Depends(get_current_user)):
    recipients = mail_data.recipients or []
    if not recipients:
        return {"message": "Нет получателей, массив пуст."}

    try:
        smtpObj = smtplib.SMTP("smtp.yandex.ru", 587)
        smtpObj.starttls()
        smtpObj.ehlo()
        smtpObj.login("d1arama@yandex.ru", "qpetjwgrdzkdlkvf")

        msg = MIMEText("Тест", "plain", "utf-8")
        msg["From"] = "d1arama@yandex.ru"
        msg["Subject"] = Header("Тестовое письмо", "utf-8")

        smtpObj.sendmail("d1arama@yandex.ru", recipients, msg.as_string())
        smtpObj.quit()

        return {"message": f"Письма отправлены: {len(recipients)}"}
    except Exception as e:
        logger.error(f"Ошибка при отправке почты: {e}")
        raise HTTPException(status_code=500, detail="Ошибка при отправке писем")


@app.get(
    "/analyze",
    status_code=200,
    responses={200: {"description": "Analyze results"}, 401: {"description": "Unauthorized"}},
)
async def analyze(current_user=Depends(get_current_user)):
    return {"sent": 10, "read": 0}


@app.get("/ring", status_code=status.HTTP_200_OK)
async def health_check():
    return {"status": "OK", "timestamp": datetime.now().isoformat(), "service": "Rescrub User API"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
