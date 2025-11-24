from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class CommentBase(BaseModel):
    author: str = Field(..., min_length=1, max_length=100)
    content: str = Field(..., min_length=1, max_length=5000)


class CommentCreate(CommentBase):
    pass


class CommentUpdate(BaseModel):
    author: Optional[str] = Field(None, min_length=1, max_length=100)
    content: Optional[str] = Field(None, min_length=1, max_length=5000)

    def validate_has_value(self) -> None:
        if self.author is None and self.content is None:
            raise ValueError("At least one field must be provided for an update.")


class CommentRead(CommentBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

