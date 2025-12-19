from pydantic import BaseModel

class Shoutout(BaseModel):
    userName: str
    message: str
