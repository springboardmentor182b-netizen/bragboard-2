from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.shoutout_report import ShoutoutReport
from app.models.shoutout import Shoutout
from app.schemas.shoutout_report_schema import ReportCreate, ReportResponse

router = APIRouter(prefix="/reports", tags=["Shoutout Reports"])

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ▶ USER: Create a shoutout report
@router.post("/", response_model=ReportResponse)
def report_shoutout(report: ReportCreate, db: Session = Depends(get_db)):
    shoutout = db.query(Shoutout).filter(Shoutout.id == report.shoutout_id).first()

    if not shoutout:
        raise HTTPException(status_code=404, detail="Shoutout not found")

    new_report = ShoutoutReport(**report.dict())
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    return new_report


# ▶ ADMIN: Get all reports
@router.get("/", response_model=list[ReportResponse])
def get_all_reports(db: Session = Depends(get_db)):
    return db.query(ShoutoutReport).all()


# ▶ ADMIN: Resolve a report
@router.put("/{report_id}/resolve", response_model=ReportResponse)
def resolve_report(report_id: int, admin_name: str, db: Session = Depends(get_db)):
    report = db.query(ShoutoutReport).filter(ShoutoutReport.id == report_id).first()

    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    report.resolved = True
    report.resolved_by = admin_name  # NEW FIELD SET HERE

    db.commit()
    db.refresh(report)

    return report


# ▶ ADMIN: Delete shoutout connected to report
@router.delete("/{report_id}/delete-shoutout")
def delete_reported_shoutout(report_id: int, db: Session = Depends(get_db)):
    report = db.query(ShoutoutReport).filter(ShoutoutReport.id == report_id).first()

    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    shoutout = db.query(Shoutout).filter(Shoutout.id == report.shoutout_id).first()

    if not shoutout:
        raise HTTPException(status_code=404, detail="Shoutout already deleted")

    db.delete(shoutout)
    db.delete(report)
    db.commit()

    return {"message": "Shoutout and related report deleted successfully"}
