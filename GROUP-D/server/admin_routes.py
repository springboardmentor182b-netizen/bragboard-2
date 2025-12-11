from fastapi import APIRouter
from controllers.admin_analytics import get_admin_analytics

router = APIRouter()

@router.get("/analytics")
def fetch_analytics():
    return get_admin_analytics()
