from pydantic import BaseModel
from typing import List
from datetime import datetime

class ShoutoutCreate(BaseModel):
    message: str
    recipient_ids: List[int]

class ShoutoutResponse(BaseModel):
    id: int
    message: str
    sender_id: int
    recipient_ids: List[int]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True  