from fastapi import APIRouter, Depends
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from src.leaderboard.models import get_db
from src.leaderboard.models import Leaderboard

router = APIRouter(
    prefix="/leaderboard",
    tags=["leaderboard"]
)

@router.get("/")
async def get_leaderboard(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Leaderboard).order_by(Leaderboard.points.desc()))
    rows = result.scalars().all()

    leaderboard = [
        {
            "rank": idx + 1,
            "username": row.username,
            "points": row.points
        }
        for idx, row in enumerate(rows)
    ]

    return leaderboard
