from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Fixed file-based SQLite database (persistent local file).
# This produces server/bragboard.db (file created automatically by SQLite when first used).
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SQLALCHEMY_DATABASE_URL = f"sqlite:///{os.path.join(BASE_DIR, 'bragboard.db')}"

# FastAPI-safe SQLite engine: allow same-thread usage across sessions used by FastAPI.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Per-request session factory (no global session)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base for models
Base = declarative_base()

# Dependency to get DB session for each request - proper lifecycle management
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
