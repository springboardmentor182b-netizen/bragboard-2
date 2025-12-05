from pydantic import BaseModel
from datetime import datetime

class CommentCreate(BaseModel):
    shoutout_id: int
    content: str

class CommentOut(BaseModel):
    id: int
    shoutout_id: int
    user_id: int
    content: str
    created_at: datetime

    class Config:
        orm_mode = True
