from pydantic import BaseModel

class LeaderboardResponse(BaseModel):
    id: int
    name: str
    total_hours: int
    weekly_hours: int
    report: str

    class Config:
        orm_mode = True
