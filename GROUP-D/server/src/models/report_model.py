from pydantic import BaseModel
from typing import Optional

class Report(BaseModel):
    userId: str
    title: str
    description: str
    createdAt: Optional[str] = None
