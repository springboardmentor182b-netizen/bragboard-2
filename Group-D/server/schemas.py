from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: EmailStr
    department: Optional[str] = None
    avatar_url: Optional[str] = None

class UserCreate(UserBase):
    password: str
    role: str = "EMPLOYEE"
    secret_code: Optional[str] = None

class UserOut(UserBase):
    id: int
    role: str
    points: int
    status: str

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class ShoutOutCreate(BaseModel):
    recipient_ids: List[int]
    message: str
    category: str

class ShoutOutOut(BaseModel):
    id: int
    from_user_id: int
    message: str
    category: str
    timestamp: datetime
    sentiment_score: Optional[float]
    mood: Optional[str]

    class Config:
        orm_mode = True

class AnnouncementCreate(BaseModel):
    title: str
    content: str

class AnnouncementOut(AnnouncementCreate):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

class ChallengeCreate(BaseModel):
    title: str
    description: str
    reward_points: int
    is_active: bool = True

class ChallengeOut(ChallengeCreate):
    id: int
    class Config:
        orm_mode = True