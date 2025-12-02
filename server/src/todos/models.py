from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional

class ShoutoutCreate(BaseModel):
    title: str = Field(..., max_length=300)
    message: str
    sender_id: int
    recipient_id: int
    tags: Optional[List[str]] = None

class ShoutoutRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    title: str
    message: str
    sender_id: int
    recipients: List[int] = []
    tags: List[str] = []
    created_at: datetime
