from pydantic import BaseModel, ConfigDict
from typing import List

class LeaderboardEntry(BaseModel):
    user_id: int
    name: str
    department: str
    count: int
    rank: int

    model_config = ConfigDict(from_attributes=True)

class LeaderboardResponse(BaseModel):
    top_receivers: List[LeaderboardEntry]
    top_senders: List[LeaderboardEntry]
