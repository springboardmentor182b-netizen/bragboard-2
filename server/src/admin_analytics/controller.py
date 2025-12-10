from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.core import get_db  # make sure this exists in your project

from .schemas import (
    TopContributor,
    MostTaggedEmployee,
    DepartmentAnalytics,
    AnalyticsSummary,
)
from .service import (
    get_top_contributors,
    get_most_tagged_employees,
    get_department_analytics,
    get_overall_summary,
)

router = APIRouter(
    prefix="/admin/analytics",
    tags=["Admin Dashboard Analytics"],
)


@router.get("/top-contributors", response_model=List[TopContributor])
def top_contributors(period: str = "week", db: Session = Depends(get_db)):
    """
    Get users who sent the most shoutouts in the selected period.
    period: week | month | quarter | year
    """
    return get_top_contributors(db=db, period=period)


@router.get("/most-tagged", response_model=List[MostTaggedEmployee])
def most_tagged(period: str = "week", db: Session = Depends(get_db)):
    """
    Get users who received the most shoutouts in the selected period.
    """
    return get_most_tagged_employees(db=db, period=period)


@router.get("/departments", response_model=List[DepartmentAnalytics])
def department_analytics(period: str = "week", db: Session = Depends(get_db)):
    """
    Get department-wise analytics for the selected period.
    """
    return get_department_analytics(db=db, period=period)


@router.get("/summary", response_model=AnalyticsSummary)
def summary(period: str = "week", db: Session = Depends(get_db)):
    """
    Get overall analytics summary for the selected period.
    """
    return get_overall_summary(db=db, period=period)
