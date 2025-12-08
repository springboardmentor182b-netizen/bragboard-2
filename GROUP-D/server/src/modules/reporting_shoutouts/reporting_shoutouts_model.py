from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from src.database import Base


class ReportingShoutout(Base):
    __tablename__ = "reporting_shoutouts"

    id = Column(Integer, primary_key=True, index=True)
    shoutout_id = Column(Integer, nullable=False)
    reported_by_employee_id = Column(Integer, nullable=False)
    reason = Column(String, nullable=False)
    status = Column(String, default="pending")  # pending/resolved/rejected
    admin_remarks = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

