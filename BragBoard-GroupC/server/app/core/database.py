from sqlalchemy import create_engine, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from enum import Enum as PyEnum   # ✅ correct Python enum import
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/bragboard")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class UserRole(str, PyEnum):
    EMPLOYEE = "employee"
    ADMIN = "admin"

class ReportStatus(str, PyEnum):
    PENDING = "pending"
    RESOLVED = "resolved"
    DISMISSED = "dismissed"

def get_database_session():
    db_session = SessionLocal()
    try:
        yield db_session
    finally:
        db_session.close()
