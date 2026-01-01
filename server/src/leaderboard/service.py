from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from typing import List

from src.entities.user import User
from src.entities.todo import Shoutout, shoutout_recipient_table
from .models import LeaderboardEntry

def get_top_receivers(db: Session, limit: int = 10) -> List[LeaderboardEntry]:
    """
    Returns users who have received the most shoutouts.
    """
    # Join Users with the recipients association table
    results = (
        db.query(
            User.id.label("user_id"),
            User.name,
            User.department,
            func.count(shoutout_recipient_table.c.shoutout_id).label("count")
        )
        .join(shoutout_recipient_table, User.id == shoutout_recipient_table.c.recipient_id)
        .group_by(User.id)
        .order_by(desc("count"))
        .limit(limit)
        .all()
    )

    return [
        LeaderboardEntry(
            user_id=r.user_id,
            name=r.name,
            department=r.department,
            count=r.count,
            rank=i + 1
        )
        for i, r in enumerate(results)
    ]

def get_top_senders(db: Session, limit: int = 10) -> List[LeaderboardEntry]:
    """
    Returns users who have sent the most shoutouts.
    """
    results = (
        db.query(
            User.id.label("user_id"),
            User.name,
            User.department,
            func.count(Shoutout.id).label("count")
        )
        .join(Shoutout, User.id == Shoutout.sender_id)
        .group_by(User.id)
        .order_by(desc("count"))
        .limit(limit)
        .all()
    )

    return [
        LeaderboardEntry(
            user_id=r.user_id,
            name=r.name,
            department=r.department,
            count=r.count,
            rank=i + 1
        )
        for i, r in enumerate(results)
    ]
