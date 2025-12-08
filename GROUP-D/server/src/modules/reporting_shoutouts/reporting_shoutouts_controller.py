from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database import get_db
from .reporting_shoutouts_schema import (
    ReportCreate,
    ReportResolve,
    ReportResponse,
)
from . import reporting_shoutouts_service as service

router = APIRouter(prefix="/reporting-shoutouts", tags=["Reporting Shoutouts"])


# ✅ EMPLOYEE: Report a shoutout
@router.post("/", response_model=ReportResponse)
def create_report(report: ReportCreate, db: Session = Depends(get_db)):
    return service.report_shoutout(db, report)


# ✅ EMPLOYEE: View my reported shoutouts
@router.get("/employee/{employee_id}", response_model=list[ReportResponse])
def get_my_reports(employee_id: int, db: Session = Depends(get_db)):
    return service.view_my_reports(db, employee_id)


# ✅ ADMIN: View all reports
@router.get("/admin", response_model=list[ReportResponse])
def get_all_reports(db: Session = Depends(get_db)):
    return service.view_all_reports(db)


# ✅ ADMIN: Resolve report
@router.put("/admin/{report_id}", response_model=ReportResponse)
def resolve_report(
    report_id: int,
    data: ReportResolve,
    db: Session = Depends(get_db),
):
    report = service.resolve_report(db, report_id, data)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report
