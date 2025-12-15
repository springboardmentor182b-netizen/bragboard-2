import enum
from sqlalchemy import Column, Integer, String, Text, DateTime, Enum
from sqlalchemy.sql import func
from src.database.connection import Base


class ShoutoutStatus(str, enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"


class Shoutout(Base):
    __tablename__ = "ad_shoutouts"

    id = Column(Integer, primary_key=True, index=True)
    employee_name = Column(String(100), nullable=False)
    industry = Column(String(100), nullable=True)
    message = Column(Text, nullable=False)

    status = Column(
        Enum(ShoutoutStatus),
        default=ShoutoutStatus.pending,
        nullable=False
    )

    created_at = Column(DateTime(timezone=True), server_default=func.now())
