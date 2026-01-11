from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class NotificationBase(BaseModel):
    type: str
    message: str
    link: Optional[str] = None

class NotificationCreate(NotificationBase):
    recipient_id: int

class NotificationRead(NotificationBase):
    id: int
    recipient_id: int
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True

class NotificationUpdate(BaseModel):
    is_read: Optional[bool] = None
