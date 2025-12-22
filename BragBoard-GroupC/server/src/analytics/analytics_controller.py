from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from src.database.core import get_database

from src.analytics.analytics_service import AnalyticsService

router = APIRouter(
    prefix="/admin/analytics",
    tags=["Admin Analytics"],
)


@router.get("/overview")
def overview(db: Session = Depends(get_database)):
    return AnalyticsService.overview(db)


@router.get("/top-contributors")
def top_contributors(db: Session = Depends(get_database)):
    return AnalyticsService.top_contributors(db)


@router.get("/most-tagged")
def most_tagged(db: Session = Depends(get_database)):
    return AnalyticsService.most_tagged(db)


@router.get("/department")
def department(db: Session = Depends(get_database)):
    return AnalyticsService.department_wise(db)


@router.get("/time")
def time_based(
    type: str = Query(..., enum=["week", "month", "quarter", "year"]),
    db: Session = Depends(get_database)
):
    return AnalyticsService.time_based(db, type)
