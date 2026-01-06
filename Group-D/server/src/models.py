from sqlalchemy import Column, Integer, String
from src.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False)     # EMPLOYEE | ADMIN | SUPER_ADMIN
    status = Column(String, default="ACTIVE") # ACTIVE | INACTIVE
