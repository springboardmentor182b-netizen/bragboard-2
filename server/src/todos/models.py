from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from src.users.models import UserRead

class ShoutoutCreate(BaseModel):
    title: str = Field(..., max_length=300)
    message: str
    sender_id: int
    recipient_id: int
    tags: Optional[List[str]] = None

class TagRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str

class CommentCreate(BaseModel):
    content: str

class CommentRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    content: str
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
    created_at: datetime
