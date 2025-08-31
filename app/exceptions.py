from fastapi import HTTPException, status


class UserRegistrationException(HTTPException):
    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail
        )


class EmailAlreadyExistsException(UserRegistrationException):
    def __init__(self):
        super().__init__("Пользователь с таким email уже существует")


class PhoneAlreadyExistsException(UserRegistrationException):
    def __init__(self):
        super().__init__("Пользователь с таким телефоном уже существует")


class InvalidCredentialsException(Exception):
    """Неверные учетные данные"""
    pass


class UserNotFoundException(Exception):
    """Пользователь не найден"""
    pass
