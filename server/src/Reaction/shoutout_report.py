from datetime import datetime
import enum

from sqlalchemy import (
    Column,
    DateTime,
    Integer,
    String,
    Text,
    ForeignKey,
    Enum as SQLEnum,
)
from sqlalchemy.orm import relationship

from src.database.core import Base




class ReportStatus(enum.Enum):
    """Defines the possible states for a report."""
    PENDING = "pending"
    RESOLVED = "resolved"
    DISMISSED = "dismissed"




class ShoutoutReport(Base):
    """SQLAlchemy model representing a report filed against a Shoutout."""
    __tablename__ = "shoutout_reports"


    id = Column(Integer, primary_key=True, index=True)
    shoutout_id = Column(
        Integer,
        ForeignKey("shoutouts.id", ondelete="CASCADE"),  
    )
    reporter_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"), 
        nullable=False
    )
    reason = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


    status = Column(SQLEnum(ReportStatus), default=ReportStatus.PENDING, nullable=False)
    resolved_by = Column(
        Integer,
        ForeignKey("users.id", ondelete="SET NULL"),  
        nullable=True
    )
    resolved_at = Column(DateTime, nullable=True)
    resolution_notes = Column(Text, nullable=True)

    shoutout = relationship("Shoutout", backref="reports")
    reporter = relationship("User", foreign_keys=[reporter_id], backref="reported_shoutouts")
    resolver = relationship("User", foreign_keys=[resolved_by])

    def __repr__(self):
        """Provides a helpful string representation for debugging."""
        return (
            f"<ShoutoutReport(id={self.id}, shoutout_id={self.shoutout_id}, "
            f"status='{self.status.value}', created_at='{self.created_at.date()}')>"
        )