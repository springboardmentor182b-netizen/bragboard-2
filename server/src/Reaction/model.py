
from sqlalchemy import Column, Integer, ForeignKey, Enum, UniqueConstraint
from sqlalchemy.orm import relationship
from pydantic import BaseModel
from typing import Literal
from ..database.core import Base


class ReactionORM(Base):
    __tablename__ = "reactions"
    id = Column(Integer, primary_key=True, index=True)
    shoutout_id = Column(Integer, ForeignKey("shoutouts.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    type = Column(Enum('like', 'clap', 'star', name='reaction_type', create_type=False), nullable=False) # 'like', 'clap', 'star' are key features [cite: 8]

    __table_args__ = (
        UniqueConstraint('shoutout_id', 'user_id', name='_user_shoutout_uc'),
    )

