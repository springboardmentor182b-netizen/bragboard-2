from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.user import User
from app.models.leaderboard import Leaderboard

router = APIRouter(
    prefix="/leaderboard",
    tags=["leaderboard"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_leaderboard(db: Session = Depends(get_db)):
    rows = (
        db.query(User.name, Leaderboard.points)  # now points exists
        .join(Leaderboard, User.id == Leaderboard.user_id)
        .order_by(Leaderboard.points.desc())
        .all()
    )

    return [
        {
            "rank": idx + 1,
            "username": row[0],  # tuple index 0 = User.name
            "points": row[1]     # tuple index 1 = Leaderboard.points
        }
        for idx, row in enumerate(rows)
    ]
