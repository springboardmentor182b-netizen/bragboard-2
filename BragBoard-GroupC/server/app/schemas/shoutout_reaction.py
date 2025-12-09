from pydantic import BaseModel

class ReactionCreate(BaseModel):
    reaction_type: str

class ReactionResponse(BaseModel):
    id: int
    user_id: int
    shoutout_id: int
    reaction_type: str

    class Config:
        orm_mode = True

class ReactionCountResponse(BaseModel):
    shoutout_id: int
    count: dict
