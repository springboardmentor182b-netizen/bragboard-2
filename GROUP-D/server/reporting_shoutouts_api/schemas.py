from pydantic import BaseModel

class ShoutoutCreate(BaseModel):
    employee_id: int
    message: str

class Shoutout(BaseModel):
    id: int
    employee_id: int
    message: str
    status: str

    class Config:
        orm_mode = True
