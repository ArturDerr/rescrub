from datetime import date, datetime
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from pydantic import field_validator
from pydantic_core import PydanticCustomError


class UserRegister(BaseModel):
    """Схема регистрации пользователя"""
    email: EmailStr = Field(..., description="Email пользователя")
    phone: str = Field(..., min_length=5, max_length=20, description="Номер телефона")
    password: str = Field(..., min_length=6, description="Пароль")
    firstName: str = Field(..., min_length=1, max_length=100, description="Имя")
    lastName: str = Field(..., min_length=1, max_length=100, description="Фамилия")
    middleName: str = Field(..., min_length=1, max_length=100, description="Отчество")
    birthDate: str = Field(..., description="Дата рождения в формате ДД-ММ-ГГГГ")

    @field_validator('birthDate')
    def validate_birth_date(cls, v):
        try:
            day, month, year = map(int, v.split('-'))
            return date(year, month, day).strftime('%d-%m-%Y')
        except (ValueError, AttributeError):
            raise PydanticCustomError(
                'date_error',
                "Некорректный формат даты. Используйте ДД-ММ-ГГГГ",
                {'input': v}
            )

    @field_validator('email')
    def validate_email(cls, v):
        if not v.endswith(('.com', '.ru', '.net', '.org')):
            raise ValueError("Некорректный домен email. Используйте .com, .ru, .net или .org")
        return v.lower()

    @field_validator('phone')
    def validate_phone(cls, v):
        if not v.startswith('+'):
            raise PydanticCustomError(
                'phone_format',
                "Номер телефона должен начинаться с '+'",
                {'input': v}
            )
        if not v[1:].isdigit():
            raise PydanticCustomError(
                'phone_digits',
                "Номер телефона должен содержать только цифры после '+'",
                {'input': v}
            )
        return v

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "email": "user@example.com",
                "phone": "+79123456789",
                "password": "strongpassword",
                "firstName": "Иван",
                "lastName": "Иванов",
                "middleName": "Иванович",
                "birthDate": "1990-01-01"
            }
        }


class UserResponse(BaseModel):
    """Схема для отображения данных пользователя"""
    userid: int
    email: str
    phone: str
    firstName: str
    lastName: str
    middleName: Optional[str]
    birthDate: str
    isEmailVerified: bool
    isPhoneVerified: bool
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True

    @field_validator('birthDate')
    def validate_date_format(cls, v):
        try:
            day, month, year = map(int, v.split('-'))
            date(year, month, day)
            return v
        except (ValueError, AttributeError):
            raise ValueError("Дата должна быть в формате ДД-ММ-ГГГГ")
