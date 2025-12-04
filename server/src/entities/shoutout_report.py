from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from src.database.core import Base


class ReportStatus(enum.Enum):
    PENDING = "pending"
    RESOLVED = "resolved"
    DISMISSED = "dismissed"


class ShoutoutReport(Base):
    __tablename__ = "shoutout_reports"
    id = Column(Integer, primary_key=True, index=True)
    shoutout_id = Column(Integer, ForeignKey("shoutouts.id", ondelete="CASCADE"), nullable=False)
    reporter_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    reason = Column(String(200), nullable=False)  # e.g., "inappropriate content", "spam", "harassment"
    description = Column(Text, nullable=True)  # Optional detailed description
    status = Column(SQLEnum(ReportStatus), default=ReportStatus.PENDING, nullable=False)
    resolved_by = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    resolved_at = Column(DateTime, nullable=True)
    resolution_notes = Column(Text, nullable=True)  # Admin's notes when resolving
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relationships
    shoutout = relationship("Shoutout", backref="reports")
    reporter = relationship("User", foreign_keys=[reporter_id], backref="reported_shoutouts")
    resolver = relationship("User", foreign_keys=[resolved_by])

