from pydantic import BaseModel

class UserRead(BaseModel):
    class Config:
        orm_mode = True
    
    id: int
    name: str
    email: str
    department: str
    role: str
