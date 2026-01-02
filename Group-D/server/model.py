from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Float, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from server.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="EMPLOYEE")  # EMPLOYEE | ADMIN | SUPER_ADMIN
    department = Column(String, nullable=True)
    points = Column(Integer, default=0)
    avatar_url = Column(String, nullable=True)
    status = Column(String, default="ACTIVE")  # ACTIVE | PENDING

    sent_shoutouts = relationship("ShoutOut", back_populates="sender")
    received_shoutouts = relationship("Recipient", back_populates="user")
    transactions = relationship("Transaction", back_populates="user")

class ShoutOut(Base):
    __tablename__ = "shoutouts"

    id = Column(Integer, primary_key=True, index=True)
    from_user_id = Column(Integer, ForeignKey("users.id"))
    message = Column(Text)
    category = Column(String)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    sentiment_score = Column(Float, nullable=True)
    mood = Column(String, nullable=True)
    is_reported = Column(Boolean, default=False)

    sender = relationship("User", back_populates="sent_shoutouts")
    recipients = relationship("Recipient", back_populates="shoutout")

class Recipient(Base):
    __tablename__ = "recipients"

    shoutout_id = Column(Integer, ForeignKey("shoutouts.id"), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)

    shoutout = relationship("ShoutOut", back_populates="recipients")
    user = relationship("User", back_populates="received_shoutouts")

class Announcement(Base):
    __tablename__ = "announcements"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Challenge(Base):
    __tablename__ = "challenges"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    reward_points = Column(Integer)
    is_active = Column(Boolean, default=True)

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    points = Column(Integer)
    reason = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="transactions")
