from pydantic import BaseModel, EmailStr, constr
from typing import Optional


class UserBase(BaseModel):
    email: EmailStr
    name: constr(min_length=2, max_length=255)


class UserCreate(UserBase):
    password: constr(min_length=6)
    role: str = "EMPLOYEE"


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserRead(UserBase):
    id: str                # Mongo ObjectId as string
    role: str = "EMPLOYEE"
    is_active: bool = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenPayload(BaseModel):
    sub: Optional[str] = None
