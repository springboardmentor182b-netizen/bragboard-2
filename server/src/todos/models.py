from datetime import datetime
from pydantic import BaseModel, Field
from typing import List, Optional
from src.users.models import UserRead

class ShoutoutCreate(BaseModel):
    title: str = Field(..., max_length=300)
    message: str
    sender_id: int
    recipient_id: int
    tags: Optional[List[str]] = None

class TagRead(BaseModel):
    class Config:
        orm_mode = True
    id: int
    name: str

class CommentCreate(BaseModel):
    content: str
    parent_id: Optional[int] = None

class CommentRead(BaseModel):
    class Config:
        orm_mode = True
    id: int
    content: str
    parent_id: Optional[int] = None
    author: UserRead
    created_at: datetime

class ShoutoutRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    title: str
    message: str
    sender: UserRead
    recipients: List[UserRead] = []
    tags: List[TagRead] = []
    comments: List[CommentRead] = []
    likes: List[UserRead] = []
    claps: List[UserRead] = []
    stars: List[UserRead] = []
    created_at: datetime
