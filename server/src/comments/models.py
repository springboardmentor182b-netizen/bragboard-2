from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, ConfigDict


class CommentBase(BaseModel):
    post_id: int = Field(..., ge=1, description="ID of the post this comment belongs to")
    author: str = Field(..., min_length=1, max_length=100)
    content: str = Field(..., min_length=1, max_length=5000)


class CommentCreate(CommentBase):
    pass


class CommentUpdate(BaseModel):
    post_id: Optional[int] = Field(None, ge=1, description="ID of the post this comment belongs to")
    author: Optional[str] = Field(None, min_length=1, max_length=100)
    content: Optional[str] = Field(None, min_length=1, max_length=5000)

    def validate_has_value(self) -> None:
        if self.post_id is None and self.author is None and self.content is None:
            raise ValueError("At least one field must be provided for an update.")


class CommentRead(CommentBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    created_at: datetime
    updated_at: datetime

