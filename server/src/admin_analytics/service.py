from datetime import datetime, timedelta
from typing import List, Tuple

from sqlalchemy.orm import Session
from sqlalchemy import func, desc

from entities.shoutout import Shoutout
from entities.user import User
from .schemas import (
    TopContributor,
    MostTaggedEmployee,
    DepartmentAnalytics,
    AnalyticsSummary,
)


def _get_period_range(period: str) -> Tuple[datetime, datetime]:
    """
    Convert a period string (week, month, quarter, year) into (start, end) datetimes.
    Default is week.
    """
    now = datetime.utcnow()
    period = (period or "week").lower()

    if period == "month":
        start = now - timedelta(days=30)
    elif period == "quarter":
        start = now - timedelta(days=90)
    elif period == "year":
        start = now - timedelta(days=365)
    else:  # "week" or anything else
        start = now - timedelta(days=7)

    return start, now


def get_top_contributors(
    db: Session, period: str = "week", limit: int = 10
) -> List[TopContributor]:
    """
    Users who SENT the most shoutouts in the given period.
    """
    start, end = _get_period_range(period)

    query = (
        db.query(
            Shoutout.sender_id.label("user_id"),
            func.count(Shoutout.id).label("count"),
            User.name.label("name"),
        )
        .join(User, User.id == Shoutout.sender_id)
        .filter(Shoutout.created_at.between(start, end))
        .group_by(Shoutout.sender_id, User.name)
        .order_by(desc("count"))
        .limit(limit)
    )

    rows = query.all()

    return [
        TopContributor(user_id=row.user_id, name=row.name, count=row.count)
        for row in rows
    ]


def get_most_tagged_employees(
    db: Session, period: str = "week", limit: int = 10
) -> List[MostTaggedEmployee]:
    """
    Users who RECEIVED the most shoutouts in the given period.
    """
    start, end = _get_period_range(period)

    query = (
        db.query(
            Shoutout.receiver_id.label("user_id"),
            func.count(Shoutout.id).label("count"),
            User.name.label("name"),
        )
        .join(User, User.id == Shoutout.receiver_id)
        .filter(Shoutout.created_at.between(start, end))
        .group_by(Shoutout.receiver_id, User.name)
        .order_by(desc("count"))
        .limit(limit)
    )

    rows = query.all()

    return [
        MostTaggedEmployee(user_id=row.user_id, name=row.name, count=row.count)
        for row in rows
    ]


def get_department_analytics(
    db: Session, period: str = "week"
) -> List[DepartmentAnalytics]:
    """
    Count of shoutouts per department in the given period.
    """
    start, end = _get_period_range(period)

    query = (
        db.query(
            Shoutout.department.label("department"),
            func.count(Shoutout.id).label("count"),
        )
        .filter(Shoutout.created_at.between(start, end))
        .group_by(Shoutout.department)
        .order_by(desc("count"))
    )

    rows = query.all()

    return [
        DepartmentAnalytics(department=row.department or "Unknown", count=row.count)
        for row in rows
    ]


def get_overall_summary(db: Session, period: str = "week") -> AnalyticsSummary:
    """
    High-level summary for the admin dashboard analytics.
    """
    start, end = _get_period_range(period)

    base_q = db.query(Shoutout).filter(Shoutout.created_at.between(start, end))

    total_shoutouts = base_q.count()

    unique_senders = (
        db.query(func.count(func.distinct(Shoutout.sender_id)))
        .filter(Shoutout.created_at.between(start, end))
        .scalar()
        or 0
    )

    unique_receivers = (
        db.query(func.count(func.distinct(Shoutout.receiver_id)))
        .filter(Shoutout.created_at.between(start, end))
        .scalar()
        or 0
    )

    department_breakdown = get_department_analytics(db, period)

    return AnalyticsSummary(
        total_shoutouts=total_shoutouts,
        unique_senders=unique_senders,
        unique_receivers=unique_receivers,
        department_breakdown=department_breakdown,
        period=period.lower(),
    )
