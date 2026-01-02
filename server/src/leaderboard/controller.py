from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from src.database.core import get_db
from . import service
from .models import LeaderboardResponse, LeaderboardEntry

router = APIRouter(prefix="/api/leaderboard", tags=["Leaderboard"])

@router.get("", response_model=LeaderboardResponse)
def get_leaderboard(
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get the top senders and receivers of shoutouts.
    """
    top_receivers = service.get_top_receivers(db, limit)
    top_senders = service.get_top_senders(db, limit)
    
    return LeaderboardResponse(
        top_receivers=top_receivers,
        top_senders=top_senders
    )

@router.get("/receivers", response_model=List[LeaderboardEntry])
def get_top_receivers(
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get just the top receivers.
    """
    return service.get_top_receivers(db, limit)

@router.get("/senders", response_model=List[LeaderboardEntry])
def get_top_senders(
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get just the top senders.
    """
    return service.get_top_senders(db, limit)
