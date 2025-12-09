# src/entities/user.py
from sqlalchemy import Column, Integer, String, Enum, DateTime, func
from src.database.core import Base, UserRole  # ✅ Import Base from core

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)
    department = Column(String(50))
    role = Column(Enum(UserRole), default=UserRole.EMPLOYEE)  # ✅ Use imported enum
    joined_at = Column(DateTime(timezone=True), server_default=func.now())