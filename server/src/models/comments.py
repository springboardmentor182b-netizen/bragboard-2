from sqlalchemy import Column, Integer, Text, DateTime
from datetime import datetime
from app.database import Base

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True)
    shoutout_id = Column(Integer, nullable=False)
    user_id = Column(Integer, nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
