from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ReportCreate(BaseModel):
    shoutout_id: int
    reported_by_employee_id: int
    reason: str


class ReportResolve(BaseModel):
    status: str  # resolved / rejected
    admin_remarks: Optional[str] = None


class ReportResponse(BaseModel):
    id: int
    shoutout_id: int
    reported_by_employee_id: int
    reason: str
    status: str
    admin_remarks: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True
