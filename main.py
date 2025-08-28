from fastapi import FastAPI, Depends, status, HTTPException, Request
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core.database import DatabaseManager
from backend.app.repositories.user_repository import UserRepository
from backend.app.schemas.user_schema import UserRegister, UserResponse
from backend.app.exceptions import (
    UserRegistrationException,
    EmailAlreadyExistsException,
    PhoneAlreadyExistsException
)
import logging
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="User Registration API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db_manager = DatabaseManager()
db_manager.create_tables()


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
    error_msg = first_error["msg"]

    if "ctx" in first_error and "reason" in first_error["ctx"]:
        error_msg += f": {first_error['ctx']['reason']}"

    return JSONResponse(
        status_code=422,
        content={"detail": error_msg}
    )


@app.exception_handler(RequestValidationError)
async def validation_handler(request, exc):
    errors = exc.errors()
    first_error = errors[0]

    if first_error['type'] == 'missing':
        detail = f"Обязательное поле: {first_error['loc'][-1]}"
    else:
        detail = first_error['msg']

    return JSONResponse(
        status_code=422,
        content={"detail": detail}
    )

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )


@app.post("/register/",
          status_code=status.HTTP_201_CREATED,
          responses={
              201: {"description": "User created successfully"},
              400: {"description": "Invalid input data"},
              409: {"description": "User already exists"},
              422: {"description": "Validation error"},
              500: {"description": "Internal server error"}
          })
async def register_user(user_data: UserRegister, db: Session = Depends(db_manager.get_db)):
    """
    Регистрация нового пользователя

    - **email**: Email пользователя (должен быть валидным)
    - **phone**: Номер телефона (формат: +79123456789)
    - **password**: Пароль (минимум 6 символов)
    - **firstName**: Имя
    - **lastName**: Фамилия
    - **middleName**: Отчество (опционально)
    - **birthDate**: Дата рождения (опционально)
    """
    try:
        repo = UserRepository(db)
        user = repo.register_user(user_data)
        logger.info(f"User registered: {user.email}")
        return {
            "message": "Пользователь успешно зарегистрирован.",
            "userId": user.userid,
            "email": user.email
        }
    except EmailAlreadyExistsException:
        raise HTTPException(
            status_code=409,
            detail="Пользователь с таким email уже существует"
        )
    except PhoneAlreadyExistsException:
        raise HTTPException(
            status_code=409,
            detail="Пользователь с таким телефоном уже существует"
        )


@app.get("/users/{user_id}",
         response_model=UserResponse,
         responses={
             200: {"description": "User data"},
             404: {"description": "User not found"},
             500: {"description": "Internal server error"}
         })
async def get_user(
        user_id: int,
        db: Session = Depends(db_manager.get_db)
):
    """
    Получение информации о пользователе по ID

    - **user_id**: ID пользователя
    """
    repo = UserRepository(db)
    user = repo.get_user_by_id(user_id)
    if not user:
        logger.warning(f"User not found: {user_id}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user


@app.get("/ring", status_code=status.HTTP_200_OK)
async def health_check():
    """
    Проверка работоспособности сервера

    Возвращает статус сервера и текущее время
    """
    return {
        "status": "OK",
        "timestamp": datetime.now().isoformat(),
        "service": "User Registration API"
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
    )