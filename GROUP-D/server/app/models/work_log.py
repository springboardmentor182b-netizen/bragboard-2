from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship
from app.core.database import Base

class WorkLog(Base):
    __tablename__ = "work_logs"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"))
    total_hours = Column(Integer, default=0)
    weekly_hours = Column(Integer, default=0)
    report = Column(String)

    employee = relationship("Employee", back_populates="work_logs")
