from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.users import service
from src.users.models import UserRead

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("", response_model=list[UserRead])
def get_users(db: Session = Depends(get_db)):
    return service.list_users(db)

@router.get("/leaderboard")
def get_leaderboard(db: Session = Depends(get_db)):
    return service.get_leaderboard(db)

@router.get("/top-tagged")
def get_top_tagged(db: Session = Depends(get_db)):
    return service.get_top_tagged(db)
