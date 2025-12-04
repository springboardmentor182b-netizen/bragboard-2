from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey, Enum, func
from sqlalchemy.orm import relationship
from src.database.core import Base

class ShoutoutReport(Base):
    __tablename__ = "shoutout_reports"
    
    id = Column(Integer, primary_key=True, index=True)
    shoutout_id = Column(Integer, ForeignKey("shoutouts.id"), nullable=False)
    reporter_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    reason = Column(Text, nullable=False)
    description = Column(Text, nullable=True)
    status = Column(Enum('pending', 'resolved', 'dismissed', name='report_status'), default='pending')
    resolved_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    resolution_notes = Column(Text, nullable=True)
    resolved_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    shoutout = relationship("Shoutout", foreign_keys=[shoutout_id])
    reporter = relationship("User", foreign_keys=[reporter_id])
    resolver = relationship("User", foreign_keys=[resolved_by])