from fastapi import APIRouter
from .leaderboard.controller import router as leaderboard_router
from src.analytics.analytics_controller import router as analytics_router

api_router = APIRouter()

api_router.include_router(leaderboard_router)
api_router.include_router(analytics_router)