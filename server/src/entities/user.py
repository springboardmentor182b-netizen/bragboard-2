from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Boolean
)


from src.database.core import Base


class User(Base):
    """SQLAlchemy model representing a system user."""
    __tablename__ = "users"

    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    
   
    email = Column(String(320), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    
    
    department = Column(String(100), nullable=False)
    role = Column(String(20), default="employee")
    joined_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    
    

    def __repr__(self):
        """Provides a helpful string representation for debugging."""
        return f"<User(id={self.id}, email='{self.email}', role='{self.role}')>"