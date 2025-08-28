from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Base


class DatabaseManager:
    """Управление подключениями к базе данных"""

    def __init__(self, db_url: str = "sqlite:///bd/database.db"):
        self._engine = create_engine(db_url)
        self._SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self._engine)

    def get_db(self):
        """Генератор сессий БД"""
        db = self._SessionLocal()
        try:
            yield db
        finally:
            db.close()

    def create_tables(self):
        """Создание всех таблиц"""
        Base.metadata.create_all(bind=self._engine)
