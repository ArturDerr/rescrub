class Settings:
    """Класс для хранения настроек приложения."""

    DB_URL: str = "sqlite:///bd/database.db"
    SECRET_KEY: str = "ключ"
    ALGORITHM: str = "HS256"