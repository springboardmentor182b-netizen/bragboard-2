from sqlalchemy.orm import Session, aliased
from datetime import datetime
from typing import List, Optional, Dict, Any
import io
import csv

try:
    from fpdf import FPDF
except ImportError:
   
    class FPDF: pass

from src.entities.shoutout_report import ShoutoutReport, ReportStatus, CommentReport
from src.entities.todo import Shoutout, Comment
from src.entities.user import User
from .models import ShoutoutReportCreate, ShoutoutReportResolve, CommentReportCreate, CommentReportResolve


def create_report(db: Session, reporter_id: int, payload: ShoutoutReportCreate) -> ShoutoutReport:
    """
    Create a new shoutout report.
    """
    
    shoutout = db.get(Shoutout, payload.shoutout_id)
    if not shoutout:
        raise ValueError("Shoutout not found")
    
    
    reporter = db.get(User, reporter_id)
    if not reporter:
        raise ValueError("Reporter not found")
    
    
    existing_report = db.query(ShoutoutReport).filter(
        ShoutoutReport.shoutout_id == payload.shoutout_id,
        ShoutoutReport.reporter_id == reporter_id
    ).first()
    
    if existing_report:
        raise ValueError("You have already reported this shoutout")
    
    
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

    # Notify Admins
    from src.users.service import get_admin_users
    from src.notifications.service import create_notification
    from src.notifications.models import NotificationCreate
    
    admins = get_admin_users(db)
    for admin in admins:
        notif = NotificationCreate(
            recipient_id=admin.id,
            type="report",
            message=f"New Shoutout Report against shoutout #{payload.shoutout_id}",
            link="/admin/moderation"
        )
        create_notification(db, notif)

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
            
            pass
    
    return query.order_by(ShoutoutReport.created_at.desc()).all()


def resolve_report(db: Session, report_id: int, admin_id: int, payload: ShoutoutReportResolve) -> ShoutoutReport:
    """
    Resolve a report (admin only). Note: Admin role is verified in the controller.
    """
    report = db.get(ShoutoutReport, report_id)
    if not report:
        raise ValueError("Report not found")
    
    if report.status != ReportStatus.PENDING:
        raise ValueError(f"Report is already {report.status.value}")
    
    
    admin = db.get(User, admin_id)
    if not admin:
        raise ValueError("Admin user not found")
    
    
    try:
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

            # Notify reporter
    from src.notifications.service import create_notification
    from src.notifications.models import NotificationCreate
    
    notif = NotificationCreate(
        recipient_id=report.reporter_id,
        type="report_resolved",
        message=f"Your report against shoutout #{report.shoutout_id} has been resolved: {status_enum.value}",
        link=f"/my-reports"
    )
    create_notification(db, notif)

    return report


def to_report_read(db: Session, report: ShoutoutReport) -> dict:
    """
    Convert a ShoutoutReport entity to a dictionary suitable for ShoutoutReportRead.
    """
    
    reporter = db.get(User, report.reporter_id)
    reporter_name = reporter.name if reporter else None
    
    
    resolver_name = None
    if report.resolved_by:
        resolver = db.get(User, report.resolved_by)
        resolver_name = resolver.name if resolver else None
    
   
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


def get_all_reports_for_export(db: Session) -> List[Dict[str, Any]]:
    """
    Fetches all report data with necessary joined fields for export.
    This uses aliases for clarity in joins on the User table.
    """
    Reporter = aliased(User)
    Resolver = aliased(User)
    ShoutoutSender = aliased(User)

    query = db.query(
        ShoutoutReport,
        Reporter,
        Resolver,
        Shoutout,
        ShoutoutSender,
    ).join(
        Reporter, ShoutoutReport.reporter_id == Reporter.id
    ).join(
        Shoutout, ShoutoutReport.shoutout_id == Shoutout.id
    ).join(
        ShoutoutSender, Shoutout.sender_id == ShoutoutSender.id
    ).outerjoin(
        Resolver, ShoutoutReport.resolved_by == Resolver.id
    ).order_by(ShoutoutReport.created_at.desc())

    report_tuples = query.all()

    def get_name(user_obj):
        return user_obj.name if user_obj else None

    
    data = []
    for report, reporter, resolver, shoutout, sender in report_tuples:
        data.append({
            "report_id": report.id,
            "status": report.status.value,
            "reason": report.reason,
            "description": report.description,
            "created_at": report.created_at.isoformat(),
            "reporter_name": get_name(reporter),
            "shoutout_message": shoutout.message,
            "shoutout_sender_name": get_name(sender),
            "resolved_by_name": get_name(resolver),
            "resolved_at": report.resolved_at.isoformat() if report.resolved_at else None,
            "resolution_notes": report.resolution_notes,
        })
    return data


def generate_reports_csv(data: List[Dict[str, Any]]) -> io.StringIO:
    """Generates CSV content from a list of report dictionaries."""
    output = io.StringIO()
    
    fieldnames = list(data[0].keys()) if data else []
    
    writer = csv.DictWriter(output, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(data)
    
    output.seek(0)
    return output


def generate_reports_pdf(data: List[Dict[str, Any]]) -> io.BytesIO:
    """Generates PDF content (BytesIO) from a list of report dictionaries."""
    
    if not FPDF:
        raise ImportError("fpdf2 is required for PDF export. Please run: pip install fpdf2")

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Helvetica", size=10)
    
    pdf.cell(0, 10, txt="Shoutout Moderation Report", ln=1, align="C")
    pdf.ln(5)

    headers = ["ID", "Status", "Reporter", "Shoutout Message", "Created At"]
    col_widths = [10, 20, 30, 80, 30]

    
    pdf.set_font("Helvetica", 'B', 9)
    for i, header in enumerate(headers):
        pdf.set_fill_color(200, 220, 255)
        pdf.cell(col_widths[i], 7, header, 1, 0, 'C', 1)
    pdf.ln()
    pdf.set_font("Helvetica", size=9)
    
    
    for row in data:
        pdf.cell(col_widths[0], 6, str(row['report_id']), 1, 0, 'C')
        pdf.cell(col_widths[1], 6, row['status'].title(), 1, 0, 'C')
        pdf.cell(col_widths[2], 6, row['reporter_name'] or 'N/A', 1, 0, 'L')
        
        msg = row['shoutout_message'][:45] + "..." if len(row['shoutout_message']) > 45 else row['shoutout_message']
        pdf.cell(col_widths[3], 6, msg, 1, 0, 'L') 
        
        pdf.cell(col_widths[4], 6, row['created_at'].split('T')[0], 1, 0, 'C')
        pdf.ln()
    
    pdf_output = pdf.output(dest='S').encode('latin-1')
    
    
    buffer = io.BytesIO(pdf_output)
    buffer.seek(0)
    return buffer


# --- Comment Reporting Service Functions ---

def create_comment_report(db: Session, reporter_id: int, payload: CommentReportCreate) -> CommentReport:
    """Create a new comment report."""
    comment = db.get(Comment, payload.comment_id)
    if not comment:
        raise ValueError("Comment not found")
    
    reporter = db.get(User, reporter_id)
    if not reporter:
        raise ValueError("Reporter not found")
    
    existing_report = db.query(CommentReport).filter(
        CommentReport.comment_id == payload.comment_id,
        CommentReport.reporter_id == reporter_id
    ).first()
    
    if existing_report:
        raise ValueError("You have already reported this comment")
    
    report = CommentReport(
        comment_id=payload.comment_id,
        reporter_id=reporter_id,
        reason=payload.reason.strip(),
        description=payload.description.strip() if payload.description else None,
        status=ReportStatus.PENDING
    )
    
    db.add(report)
    db.commit()
    db.refresh(report)

    # Notify Admins
    from src.users.service import get_admin_users
    from src.notifications.service import create_notification
    from src.notifications.models import NotificationCreate
    
    admins = get_admin_users(db)
    for admin in admins:
        notif = NotificationCreate(
            recipient_id=admin.id,
            type="report",
            message=f"New Comment Report against comment #{payload.comment_id}",
            link="/admin/moderation"
        )
        create_notification(db, notif)

    return report

def get_comment_reports_by_reporter(db: Session, reporter_id: int) -> List[CommentReport]:
    """Get all comment reports by a reporter."""
    return db.query(CommentReport).filter(
        CommentReport.reporter_id == reporter_id
    ).order_by(CommentReport.created_at.desc()).all()


def get_all_comment_reports(db: Session, status: Optional[str] = None) -> List[CommentReport]:
    """Get all comment reports (admin)."""
    query = db.query(CommentReport)
    if status:
        try:
            status_enum = ReportStatus(status.lower())
            query = query.filter(CommentReport.status == status_enum)
        except ValueError:
            pass
    return query.order_by(CommentReport.created_at.desc()).all()


def resolve_comment_report(db: Session, report_id: int, admin_id: int, payload: CommentReportResolve) -> CommentReport:
    """Resolve a comment report."""
    report = db.get(CommentReport, report_id)
    if not report:
        raise ValueError("Report not found")
    
    if report.status != ReportStatus.PENDING:
        raise ValueError(f"Report is already {report.status.value}")
    
    # Ensure admin exists
    if not db.get(User, admin_id):
        raise ValueError("Admin not found")
    
    try:
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

    # Notify reporter
    from src.notifications.service import create_notification
    from src.notifications.models import NotificationCreate
    
    notif = NotificationCreate(
        recipient_id=report.reporter_id,
        type="report_resolved",
        message=f"Your report against comment #{report.comment_id} has been resolved: {status_enum.value}",
        link=f"/my-reports"
    )
    create_notification(db, notif)

    return report


def to_comment_report_read(db: Session, report: CommentReport) -> dict:
    """Convert CommentReport to dict."""
    reporter = db.get(User, report.reporter_id)
    reporter_name = reporter.name if reporter else None
    
    resolver_name = None
    if report.resolved_by:
        resolver = db.get(User, report.resolved_by)
        resolver_name = resolver.name if resolver else None
    
    comment = db.get(Comment, report.comment_id)
    comment_content = comment.content if comment else None
    comment_author_id = comment.author_id if comment else None
    
    return {
        "id": report.id,
        "comment_id": report.comment_id,
        "reporter_id": report.reporter_id,
        "reporter_name": reporter_name,
        "reason": report.reason,
        "description": report.description,
        "status": report.status.value,
        "resolved_by": report.resolved_by,
        "resolver_name": resolver_name,
        "resolved_at": report.resolved_at,
        "resolution_notes": report.resolution_notes,
        "created_at": report.created_at,
        "comment_content": comment_content,
        "comment_author_id": comment_author_id,
    }

def delete_comment(db: Session, comment_id: int):
    """Delete a comment (admin action)."""
    comment = db.get(Comment, comment_id)
    if comment:
        db.delete(comment)
        db.commit()
    return True
