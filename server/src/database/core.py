import os
from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker


BASE_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)


# Common database URLs; override with DATABASE_URL env var.
MYSQL_DATABASE_URL = "mysql+pymysql://root:root%40123@localhost:3306/bragboard"
POSTGRES_DATABASE_URL = "postgresql://user:password@localhost/bragboard_db"
SQLITE_DATABASE_URL = f"sqlite:///{DATA_DIR / 'app.db'}"

# Prefer explicit env setting; fall back to MySQL string (legacy), else sqlite for local dev.
DATABASE_URL = os.getenv("DATABASE_URL", MYSQL_DATABASE_URL) or MYSQL_DATABASE_URL

connect_args = {"check_same_thread": False} if "sqlite" in DATABASE_URL else {}

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    echo=False,
)

Base = declarative_base()

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


def get_db():
    """
    FastAPI dependency that yields a database session.
    It handles session creation and automatic closing.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_db_tables():
    """Creates all database tables defined in the Base metadata."""
    Base.metadata.create_all(bind=engine)
