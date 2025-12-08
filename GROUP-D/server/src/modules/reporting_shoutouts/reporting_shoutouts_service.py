from sqlalchemy.orm import Session
from . import reporting_shoutouts_repository as repo
from .reporting_shoutouts_schema import ReportCreate, ReportResolve


def report_shoutout(db: Session, report: ReportCreate):
    return repo.create_report(db, report)


def view_my_reports(db: Session, employee_id: int):
    return repo.get_employee_reports(db, employee_id)


def view_all_reports(db: Session):
    return repo.get_all_reports(db)


def resolve_report(db: Session, report_id: int, data: ReportResolve):
    return repo.resolve_report(db, report_id, data)
