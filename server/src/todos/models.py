from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ShoutoutBase(BaseModel):
    title: str
    description: str
    department: str
    created_by: str
    is_flagged: bool = False


class ShoutoutCreate(ShoutoutBase):
    # used for POST body
    pass


class ShoutoutRead(ShoutoutBase):
    # used for responses
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
