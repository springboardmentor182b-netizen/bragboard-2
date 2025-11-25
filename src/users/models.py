from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, func, Table
from sqlalchemy.orm import relationship
from src.database.core import Base

shoutout_recipient_table = Table(
    "shoutout_recipients",
    Base.metadata,
    Column("shoutout_id", Integer, ForeignKey("shoutouts.id", ondelete="CASCADE"), primary_key=True),
    Column("recipient_id", Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),
)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(320), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    department = Column(String(100), nullable=False)
    role = Column(String(20), default="employee")
    joined_at = Column(DateTime(timezone=True), server_default=func.now())
    is_active = Column(Boolean, default=True)
    shoutouts_sent = relationship("Shoutout", back_populates="sender", foreign_keys="Shoutout.sender_id")
    shoutouts_received = relationship("Shoutout", secondary=shoutout_recipient_table, back_populates="recipients")
    reactions = relationship("Reaction", back_populates="user", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="user", cascade="all, delete-orphan")