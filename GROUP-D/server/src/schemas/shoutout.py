from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import List, Optional


class ShoutoutOut(BaseModel):
    id: int
    employee_name: str
    industry: Optional[str]
    message: str
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ShoutoutList(BaseModel):
    shoutouts: List[ShoutoutOut]
