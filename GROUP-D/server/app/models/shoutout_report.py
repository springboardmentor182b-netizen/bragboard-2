from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.core.database import Base

class ShoutoutReport(Base):
    __tablename__ = "shoutout_reports"

    id = Column(Integer, primary_key=True, index=True)
    shoutout_id = Column(Integer, ForeignKey("shoutouts.id", ondelete="CASCADE"))
    reported_by = Column(String, nullable=False)
    reason = Column(Text, nullable=False)
    resolved = Column(Boolean, default=False)

    shoutout = relationship("Shoutout", back_populates="reports")
