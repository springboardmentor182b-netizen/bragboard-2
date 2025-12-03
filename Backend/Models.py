from sqlalchemy import Column, Integer, String, Date
from database import Base

class Shoutout(Base):
    __tablename__ = "shoutouts"

    id = Column(Integer, primary_key=True, index=True)
    employee_name = Column(String)
    message = Column(String)
    created_date = Column(Date)
