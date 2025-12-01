from sqlalchemy.orm import Session
from datetime import datetime
from typing import List, Optional
from src.entities.shoutout_report import ShoutoutReport, ReportStatus
from src.entities.todo import Shoutout
from src.entities.user import User
from .models import ShoutoutReportCreate, ShoutoutReportResolve


def create_report(db: Session, reporter_id: int, payload: ShoutoutReportCreate) -> ShoutoutReport:
    """
    Create a new shoutout report.
    """
    # Verify shoutout exists
    shoutout = db.get(Shoutout, payload.shoutout_id)
    if not shoutout:
        raise ValueError("Shoutout not found")
    
    # Verify reporter exists
    reporter = db.get(User, reporter_id)
    if not reporter:
        raise ValueError("Reporter not found")
    
    # Check if user already reported this shoutout
    existing_report = db.query(ShoutoutReport).filter(
        ShoutoutReport.shoutout_id == payload.shoutout_id,
        ShoutoutReport.reporter_id == reporter_id
    ).first()
    
    if existing_report:
        raise ValueError("You have already reported this shoutout")
    
    # Create the report
    report = ShoutoutReport(
        shoutout_id=payload.shoutout_id,
        reporter_id=reporter_id,
        reason=payload.reason.strip(),
        description=payload.description.strip() if payload.description else None,
        status=ReportStatus.PENDING
    )
    
    db.add(report)
    db.commit()
    db.refresh(report)
    return report


def get_report(db: Session, report_id: int) -> Optional[ShoutoutReport]:
    """
    Get a report by ID.
    """
    return db.get(ShoutoutReport, report_id)


def get_reports_by_reporter(db: Session, reporter_id: int) -> List[ShoutoutReport]:
    """
    Get all reports created by a specific employee.
    """
    return db.query(ShoutoutReport).filter(
        ShoutoutReport.reporter_id == reporter_id
    ).order_by(ShoutoutReport.created_at.desc()).all()


def get_all_reports(db: Session, status: Optional[str] = None) -> List[ShoutoutReport]:
    """
    Get all reports (for admin). Optionally filter by status.
    """
    query = db.query(ShoutoutReport)
    
    if status:
        try:
            status_enum = ReportStatus(status.lower())
            query = query.filter(ShoutoutReport.status == status_enum)
        except ValueError:
            # Invalid status, return all
            pass
    
    return query.order_by(ShoutoutReport.created_at.desc()).all()


def resolve_report(db: Session, report_id: int, admin_id: int, payload: ShoutoutReportResolve) -> ShoutoutReport:
    """
    Resolve a report (admin only).
    """
    report = db.get(ShoutoutReport, report_id)
    if not report:
        raise ValueError("Report not found")
    
    if report.status != ReportStatus.PENDING:
        raise ValueError(f"Report is already {report.status.value}")
    
    # Verify admin exists
    admin = db.get(User, admin_id)
    if not admin:
        raise ValueError("Admin user not found")
    
    if admin.role != "admin":
        raise ValueError("Only admins can resolve reports")
    
    # Update report - convert string status to enum
    try:
        # payload.status could be a string (from Pydantic) or an enum
        status_value = payload.status.value if hasattr(payload.status, 'value') else payload.status
        status_enum = ReportStatus(status_value.lower())
    except (ValueError, AttributeError):
        raise ValueError(f"Invalid status: {payload.status}")
    
    if status_enum == ReportStatus.PENDING:
        raise ValueError("Cannot set status back to pending")
    
    report.status = status_enum
    report.resolved_by = admin_id
    report.resolved_at = datetime.utcnow()
    report.resolution_notes = payload.resolution_notes.strip() if payload.resolution_notes else None
    
    db.commit()
    db.refresh(report)
    return report


def to_report_read(db: Session, report: ShoutoutReport) -> dict:
    """
    Convert a ShoutoutReport entity to a dictionary suitable for ShoutoutReportRead.
    """
    # Get reporter name
    reporter = db.get(User, report.reporter_id)
    reporter_name = reporter.name if reporter else None
    
    # Get resolver name if resolved
    resolver_name = None
    if report.resolved_by:
        resolver = db.get(User, report.resolved_by)
        resolver_name = resolver.name if resolver else None
    
    # Get shoutout details
    shoutout = db.get(Shoutout, report.shoutout_id)
    shoutout_message = shoutout.message if shoutout else None
    shoutout_sender_id = shoutout.sender_id if shoutout else None
    
    return {
        "id": report.id,
        "shoutout_id": report.shoutout_id,
        "reporter_id": report.reporter_id,
        "reporter_name": reporter_name,
        "reason": report.reason,
        "description": report.description,
        "status": report.status.value if isinstance(report.status, ReportStatus) else report.status,
        "resolved_by": report.resolved_by,
        "resolver_name": resolver_name,
        "resolved_at": report.resolved_at,
        "resolution_notes": report.resolution_notes,
        "created_at": report.created_at,
        "shoutout_message": shoutout_message,
        "shoutout_sender_id": shoutout_sender_id,
    }

