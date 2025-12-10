from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime


class TopContributor(BaseModel):
    user_id: int
    name: Optional[str] = None
    count: int


class MostTaggedEmployee(BaseModel):
    user_id: int
    name: Optional[str] = None
    count: int


class DepartmentAnalytics(BaseModel):
    department: str
    count: int


class AnalyticsSummary(BaseModel):
    total_shoutouts: int
    unique_senders: int
    unique_receivers: int
    department_breakdown: List[DepartmentAnalytics]
    period: str

    class Config:
        orm_mode = True
