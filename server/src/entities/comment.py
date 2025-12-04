from datetime import datetime
from sqlalchemy import Column, DateTime, Integer, String, Text
from src.database.core import Base


class Comment(Base):
    """SQLAlchemy model representing a comment on a post."""
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, nullable=False, index=True)
    author = Column(String(100), nullable=False, index=True)
    content = Column(Text, nullable=False)

    
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    def __repr__(self):
        """Provides a helpful string representation for debugging."""
        return f"<Comment(id={self.id}, post_id={self.post_id}, author='{self.author}')>"

