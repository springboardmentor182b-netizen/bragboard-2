from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.employee import Employee
from app.models.work_log import WorkLog
from app.schemas.leaderboard_schema import LeaderboardResponse

router = APIRouter(prefix="/leaderboard", tags=["Leaderboard"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=list[LeaderboardResponse])
def get_leaderboard(db: Session = Depends(get_db)):
    results = (
        db.query(
            Employee.id,
            Employee.name,
            WorkLog.total_hours,
            WorkLog.weekly_hours,
            WorkLog.report
        )
        .join(WorkLog, Employee.id == WorkLog.employee_id)
        .order_by(WorkLog.total_hours.desc())
        .all()
    )

    return results


@router.get("/weekly", response_model=list[LeaderboardResponse])
def weekly_leaderboard(db: Session = Depends(get_db)):
    return (
        db.query(
            Employee.id,
            Employee.name,
            WorkLog.total_hours,
            WorkLog.weekly_hours,
            WorkLog.report
        )
        .join(WorkLog)
        .order_by(WorkLog.weekly_hours.desc())
        .all()
    )
