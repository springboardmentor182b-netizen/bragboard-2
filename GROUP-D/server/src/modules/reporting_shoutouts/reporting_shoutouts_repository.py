from sqlalchemy.orm import Session
from .reporting_shoutouts_model import ReportingShoutout
from .reporting_shoutouts_schema import ReportCreate, ReportResolve


def create_report(db: Session, report: ReportCreate):
    new_report = ReportingShoutout(**report.dict())
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    return new_report


def get_employee_reports(db: Session, employee_id: int):
    return db.query(ReportingShoutout).filter(
        ReportingShoutout.reported_by_employee_id == employee_id
    ).all()


def get_all_reports(db: Session):
    return db.query(ReportingShoutout).all()


def resolve_report(db: Session, report_id: int, data: ReportResolve):
    report = db.query(ReportingShoutout).filter(
        ReportingShoutout.id == report_id
    ).first()

    if report:
        report.status = data.status
        report.admin_remarks = data.admin_remarks
        db.commit()
        db.refresh(report)

    return report
