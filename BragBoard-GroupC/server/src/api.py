from fastapi import APIRouter
from .leaderboard.controller import router as leaderboard_router

api_router = APIRouter()

api_router.include_router(leaderboard_router)
