from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from src.entities.user import User
from src.entities.todo import shoutout_recipient_table
from src.auth.schemas import UserCreate
from src.auth.auth import hash_password

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    hashed_pwd = hash_password(user.password)
    db_user = User(
        email=user.email,
        name=user.full_name or user.email.split('@')[0],
        password_hash=hashed_pwd,
        role=user.role,
        department="General" # Default department for now
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def list_users(db: Session):
    return db.query(User).all()

def get_leaderboard(db: Session, limit: int = 5):
    """
    Returns users ordered by number of shoutouts received.
    """
    # Join User with shoutout_recipient_table and count
    results = db.query(
        User,
        func.count(shoutout_recipient_table.c.shoutout_id).label("score")
    ).outerjoin(
        shoutout_recipient_table, User.id == shoutout_recipient_table.c.recipient_id
    ).group_by(
        User.id
    ).order_by(
        desc("score")
    ).limit(limit).all()
    
    # Format for frontend: { name, score, ... }
    return [
        {"name": user.name, "score": score, "avatar": "", "id": user.id} 
        for user, score in results
        if score > 0 # Optional: only show users with score? Or top N regardless.
    ]

def get_top_tagged(db: Session, limit: int = 5):
    """
    Returns users ordered by number of shoutouts received (same as leaderboard for now).
    """
    # Simply reuse leaderboard logic or different metric if 'tagged' means something else (e.g. in message body tags vs recipients).
    # Based on models, 'recipients' are the main way to 'tag' someone formally.
    return get_leaderboard(db, limit)
