from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
from datetime import datetime
from src.database.core import Base

shoutout_recipient_table = Table(
    "shoutout_recipients", Base.metadata,
    Column("shoutout_id", Integer, ForeignKey("shoutouts.id", ondelete="CASCADE"), primary_key=True),
    Column("recipient_id", Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),
)

shoutout_tag_table = Table(
    "shoutout_tags", Base.metadata,
    Column("shoutout_id", Integer, ForeignKey("shoutouts.id", ondelete="CASCADE"), primary_key=True),
    Column("tag_id", Integer, ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True),
)

class Shoutout(Base):
    __tablename__ = "shoutouts"
    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(300), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=True)
    recipients = relationship("User", secondary=shoutout_recipient_table)
    tags = relationship("Tag", secondary=shoutout_tag_table)

class Tag(Base):
    __tablename__ = "tags"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    shoutouts = relationship("Shoutout", secondary=shoutout_tag_table)
