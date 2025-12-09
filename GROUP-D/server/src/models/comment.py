from pydantic import BaseModel

class Reaction(BaseModel):
    shoutoutId: str
    userId: str
    reactionType: str
