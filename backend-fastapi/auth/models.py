from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserModel(BaseModel):
    id: Optional[str] = None
    email: EmailStr
    password: str
    role: str = "user"
    created_by: Optional[str] = None
    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()
