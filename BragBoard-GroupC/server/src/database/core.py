# src/database/core.py - UPDATED (REMOVE DUPLICATE CLASSES)
from sqlalchemy import create_engine, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import enum

# SQLite database
SQLALCHEMY_DATABASE_URL = "sqlite:///./bragboard.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Enums ONLY - NO TABLE DEFINITIONS HERE
class UserRole(str, enum.Enum):
    EMPLOYEE = "employee"
    ADMIN = "admin"

class ReportStatus(str, enum.Enum):
    PENDING = "pending"
    RESOLVED = "resolved"
    DISMISSED = "dismissed"

def get_database_session():
    db_session = SessionLocal()
    try:
        yield db_session
    finally:
        db_session.close()