from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from src.database.core import (
    Shoutout,
    ShoutoutRecipient,
    Employee,
    Report
)
from datetime import datetime


class AnalyticsService:

    # 🔹 Overall analytics
    @staticmethod
    def overview(db: Session):
        return {
            "total_shoutouts": db.query(Shoutout).count(),
            "total_reports": db.query(Report).count(),
            "resolved_reports": db.query(Report).filter(Report.status == "resolved").count(),
            "pending_reports": db.query(Report).filter(Report.status == "pending").count(),
            "dismissed_reports": db.query(Report).filter(Report.status == "dismissed").count()
        }

    # 🔹 Top contributors
    @staticmethod
    def top_contributors(db: Session):
        rows = (
            db.query(Employee.name, func.count(Shoutout.id))
            .join(Shoutout, Shoutout.sender_id == Employee.id)
            .group_by(Employee.name)
            .order_by(func.count(Shoutout.id).desc())
            .limit(10)
            .all()
        )
        return [{"label": r[0], "count": r[1]} for r in rows]

    # 🔹 Most tagged employees
    @staticmethod
    def most_tagged(db: Session):
        rows = (
            db.query(Employee.name, func.count(ShoutoutRecipient.id))
            .join(ShoutoutRecipient, ShoutoutRecipient.employee_id == Employee.id)
            .group_by(Employee.name)
            .order_by(func.count(ShoutoutRecipient.id).desc())
            .limit(10)
            .all()
        )
        return [{"label": r[0], "count": r[1]} for r in rows]

    # 🔹 Department-wise analytics
    @staticmethod
    def department_wise(db: Session):
        rows = (
            db.query(Employee.department, func.count(Shoutout.id))
            .join(Shoutout, Shoutout.sender_id == Employee.id)
            .group_by(Employee.department)
            .all()
        )
        return [{"label": r[0], "count": r[1]} for r in rows]

    # 🔹 Time-based analytics
    @staticmethod
    def time_based(db: Session, type_: str):
        query = db.query(func.count(Shoutout.id))

        if type_ == "week":
            query = query.add_columns(extract("week", Shoutout.created_at))
        elif type_ == "month":
            query = query.add_columns(extract("month", Shoutout.created_at))
        elif type_ == "quarter":
            query = query.add_columns(extract("quarter", Shoutout.created_at))
        elif type_ == "year":
            query = query.add_columns(extract("year", Shoutout.created_at))
        else:
            return []

        rows = query.group_by(2).order_by(2).all()
        return [{"label": str(r[1]), "count": r[0]} for r in rows]
