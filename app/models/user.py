from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP
from sqlalchemy.sql import func
from app.core.models import Base


class User(Base):
    """Модель пользователя"""

    __tablename__ = "users"

    userid = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    phone = Column(String(20), unique=True, index=True)
    passwordHash = Column(String(255))
    firstName = Column(String(100))
    lastName = Column(String(100))
    middleName = Column(String(100), nullable=True)
    birthDate = Column(String)
    isEmailVerified = Column(Boolean, default=False)
    isPhoneVerified = Column(Boolean, default=False)
    createdAt = Column(TIMESTAMP, server_default=func.now())
    updatedAt = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
    lastLoginAt = Column(TIMESTAMP, nullable=True)

    def __init__(self, birthDate: str, **kwargs):
        day, month, year = map(int, birthDate.split('-'))
        self.birthDate = f"{day:02d}-{month:02d}-{year}"
        super().__init__(**kwargs)

    def to_dict(self):
        return {
            "userid": self.userid,
            "email": self.email,
            "phone": self.phone,
            "passwordHash": self.passwordHash,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "middleName": self.middleName,
            "birthDate": self.birthDate.strftime("%d-%m-%Y") if self.birthDate else None,
            "isEmailVerified": self.isEmailVerified,
            "isPhoneVerified": self.isPhoneVerified,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
            "lastLoginAt": self.lastLoginAt
        }