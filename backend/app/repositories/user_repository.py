from datetime import datetime
import pytz
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from backend.app.models.user import User
from backend.app.schemas.user_schema import UserRegister
from backend.app.exceptions import EmailAlreadyExistsException, PhoneAlreadyExistsException

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

    def get_user_by_id(self, user_id: int) -> User | None:
        """Получение пользователя по ID"""
        return self.db.query(User).filter(User.userid == user_id).first()
