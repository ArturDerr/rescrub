from datetime import datetime
import pytz
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.models.user import User
from app.schemas.user_schema import UserRegister
from app.exceptions import EmailAlreadyExistsException, PhoneAlreadyExistsException
from ..exceptions import UserNotFoundException, InvalidCredentialsException
from ..schemas.user_schema import UserLogin
import bcrypt

pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")


class UserRepository:
    """Репозиторий для работы с пользователями"""

    def __init__(self, db: Session):
        self.db = db

    def get_user_by_email(self, email: str) -> User | None:
        return self.db.query(User).filter(User.email == email).first()

    def register_user(self, user_data: UserRegister) -> User:
        msk_timezone = pytz.timezone('Europe/Moscow')
        current_time = datetime.now(msk_timezone)

        if self.get_user_by_email(user_data.email):
            raise EmailAlreadyExistsException()

        if self.db.query(User).filter(User.phone == user_data.phone).first():
            raise PhoneAlreadyExistsException()

        db_user = User(
            email=user_data.email,
            phone=user_data.phone,
            passwordHash=pwd_context.hash(user_data.password),
            firstName=user_data.firstName,
            lastName=user_data.lastName,
            middleName=user_data.middleName,
            birthDate=user_data.birthDate,
            isEmailVerified=False,
            isPhoneVerified=False,
            createdAt=current_time,
            updatedAt=current_time
        )

        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user

    def authenticate_user(self, login_data: UserLogin) -> User:
        """Аутентификация пользователя"""
        if login_data.email:
            user = self.db.query(User).filter(User.email == login_data.email).first()
        elif login_data.phone:
            user = self.db.query(User).filter(User.phone == login_data.phone).first()
        else:
            raise InvalidCredentialsException("Не указаны email или телефон")

        if not user:
            raise UserNotFoundException("Пользователь не найден")

        if not self.verify_password(login_data.password, user.passwordHash):
            raise InvalidCredentialsException("Неверный пароль")

        return user

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Проверка пароля using passlib"""
        try:
            return pwd_context.verify(plain_password, hashed_password)
        except Exception as e:
            print(f"Password verification error: {e}")
            return False

    def get_user_by_id(self, user_id: int) -> User:
        """Получение пользователя по ID"""
        user = self.db.query(User).filter(User.userid == user_id).first()
        if not user:
            raise UserNotFoundException("Пользователь не найден")
        return user
