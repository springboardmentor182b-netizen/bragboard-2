
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 1. Database URL (Replace with your actual PostgreSQL connection string)
SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/bragboard_db"


engine = create_engine(SQLALCHEMY_DATABASE_URL)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker


BASE_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)

# SQLite database (default)
DATABASE_URL = f"sqlite:///{DATA_DIR / 'app.db'}"

# Uncomment below and comment above if you want to use MySQL instead:
# DATABASE_URL = "mysql+pymysql://root:root%40123@localhost:3306/bragboard"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {},
    echo=False,
)

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)


Base = declarative_base()





def get_session():
    """FastAPI dependency that yields a database session (for comments API)."""
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


def get_db():
    """FastAPI dependency that yields a database session (for shoutouts/reports API)."""

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



def create_db_tables():
    Base.metadata.create_all(bind=engine)

