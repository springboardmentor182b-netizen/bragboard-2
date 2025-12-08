from pydantic import BaseModel

class ReportBase(BaseModel):
    shoutout_id: int
    reported_by: str
    reason: str

class ReportCreate(ReportBase):
    pass

class ReportResponse(BaseModel):
    id: int
    shoutout_id: int
    reported_by: str
    reason: str
    resolved: bool

    class Config:
        orm_mode = True
