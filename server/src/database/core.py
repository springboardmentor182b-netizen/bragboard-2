import os
from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker


# ---------------------------
# Path Setup
# ---------------------------
BASE_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)


# ---------------------------
# Database URLs
# ---------------------------

MYSQL_DATABASE_URL = "mysql+pymysql://root:root%40123@localhost:3306/bragboard"
POSTGRES_DATABASE_URL = "postgresql://user:password@localhost/bragboard_db"
SQLITE_DATABASE_URL = f"sqlite:///{DATA_DIR / 'app.db'}"

# Priority:
# 1. Environment variable DATABASE_URL
# 2. Default to SQLITE for local development
DATABASE_URL = os.getenv("DATABASE_URL", SQLITE_DATABASE_URL)


# ---------------------------
# Engine Configuration
# ---------------------------

# SQLite needs check_same_thread=False
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

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


# ---------------------------
# Dependency for FastAPI
# ---------------------------

def get_db():
    """FastAPI dependency that yields a database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------------------
# Create tables
# ---------------------------

def create_db_tables():
    """Creates all database tables defined in Base metadata."""
    Base.metadata.create_all(bind=engine)
