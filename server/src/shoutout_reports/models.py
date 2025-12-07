from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict
from enum import Enum


class ReportStatus(str, Enum):
    PENDING = "pending"
    RESOLVED = "resolved"
    DISMISSED = "dismissed"


class ShoutoutReportCreate(BaseModel):
    shoutout_id: int = Field(..., ge=1, description="ID of the shoutout being reported")
    reason: str = Field(..., min_length=1, max_length=200, description="Reason for reporting (e.g., 'inappropriate content', 'spam', 'harassment')")
    description: Optional[str] = Field(None, max_length=5000, description="Optional detailed description of the report")


class ShoutoutReportResolve(BaseModel):
    status: ReportStatus = Field(..., description="Resolution status: 'resolved' or 'dismissed'")
    resolution_notes: Optional[str] = Field(None, max_length=5000, description="Optional notes about the resolution")


class ShoutoutReportRead(BaseModel):
    model_config = ConfigDict(from_attributes=True, use_enum_values=True)
    
    id: int
    shoutout_id: int
    reporter_id: int
    reporter_name: Optional[str] = None
    reason: str
    description: Optional[str] = None
    status: ReportStatus
    resolved_by: Optional[int] = None
    resolver_name: Optional[str] = None
    resolved_at: Optional[datetime] = None
    resolution_notes: Optional[str] = None
    created_at: datetime
    
    
    shoutout_message: Optional[str] = None
    shoutout_sender_id: Optional[int] = None

