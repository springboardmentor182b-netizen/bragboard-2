from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ReportCreateRequest(BaseModel):
    shoutout_id: int
    reporting_reason: str

class ReportUpdateRequest(BaseModel):
    reporting_status: str
    admin_resolution_notes: Optional[str] = None

class ReportResponse(BaseModel):
    id: int
    shoutout_id: int
    reporting_employee_id: int
    reporting_reason: str
    reporting_status: Optional[str] = None
    admin_resolution_notes: Optional[str]
    resolving_admin_id: Optional[int]
    created_at: datetime
    resolved_at: Optional[datetime]
    
    # Additional info for frontend
    reporter_name: Optional[str] = None
    resolver_name: Optional[str] = None
    shoutout_message: Optional[str] = None
    shoutout_sender_name: Optional[str] = None
    
    class Config:
        from_attributes = True

class ReportingStatsResponse(BaseModel):
    total_reports: int
    pending_reports: int
    resolved_reports: int
    dismissed_reports: int