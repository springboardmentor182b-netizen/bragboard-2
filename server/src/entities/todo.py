from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
from datetime import datetime
from src.database.core import Base
from src.entities.user import User

class Tag(Base):
    __tablename__ = "tags"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    shoutouts = relationship("Shoutout", secondary="shoutout_tags", back_populates="tags")

class Shoutout(Base):
    __tablename__ = "shoutouts"
    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer, ForeignKey(User.id, ondelete="CASCADE"), nullable=False)
    sender = relationship("User", foreign_keys=[sender_id])
    title = Column(String(300), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=True)
    recipients = relationship("User", secondary="shoutout_recipients")
    tags = relationship("Tag", secondary="shoutout_tags", back_populates="shoutouts")
    comments = relationship("Comment", back_populates="shoutout", cascade="all, delete-orphan")
    likes = relationship("User", secondary="shoutout_likes", backref="liked_shoutouts")
    reports = relationship("ShoutoutReport", back_populates="shoutout", cascade="all, delete-orphan")

class Comment(Base):
    __tablename__ = "shoutout_comments"
    id = Column(Integer, primary_key=True, index=True)
    author_id = Column(Integer, ForeignKey(User.id, ondelete="CASCADE"), nullable=False)
    author = relationship("User")
    shoutout_id = Column(Integer, ForeignKey("shoutouts.id", ondelete="CASCADE"), nullable=False)
    shoutout = relationship("Shoutout", back_populates="comments")
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# Association Tables defined after Classes to ensure __tablename__ are resolved
shoutout_recipient_table = Table(
    "shoutout_recipients", Base.metadata,
    Column("shoutout_id", Integer, ForeignKey("shoutouts.id", ondelete="CASCADE"), primary_key=True),
    Column("recipient_id", Integer, ForeignKey(User.id, ondelete="CASCADE"), primary_key=True),
)

shoutout_tag_table = Table(
    "shoutout_tags", Base.metadata,
    Column("shoutout_id", Integer, ForeignKey("shoutouts.id", ondelete="CASCADE"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True),
)

shoutout_likes_table = Table(
    "shoutout_likes", Base.metadata,
    Column("shoutout_id", Integer, ForeignKey("shoutouts.id", ondelete="CASCADE"), primary_key=True),
    Column("user_id", Integer, ForeignKey(User.id, ondelete="CASCADE"), primary_key=True),
)
