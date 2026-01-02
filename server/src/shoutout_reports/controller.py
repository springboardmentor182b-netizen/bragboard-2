from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import StreamingResponse, Response
from sqlalchemy.orm import Session
from typing import Optional, List, Literal
from datetime import datetime
import io
from src.database.core import get_db
from src.entities.user import User
from . import service
from .models import (
    ShoutoutReportCreate,
    ShoutoutReportRead,
    ShoutoutReportResolve,
    ReportStatus
)

router = APIRouter(prefix="/api/shoutout-reports", tags=["Shoutout Reports"])


def verify_user(db: Session, user_id: int) -> User:
    """Helper to verify user exists."""
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user


def verify_admin(db: Session, admin_id: int) -> User:
    """Helper to verify admin exists and has admin role."""
    user = verify_user(db, admin_id)
    if user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return user


@router.post("", response_model=ShoutoutReportRead, status_code=status.HTTP_201_CREATED)
def create_report(
    payload: ShoutoutReportCreate,
    reporter_id: int = Query(..., ge=1, description="ID of the employee reporting the shoutout"),
    db: Session = Depends(get_db)
):
    """
    Report a shoutout (Employee endpoint).
    Employees can report shoutouts they find inappropriate, spam, or problematic.
    """
    try:
        verify_user(db, reporter_id)
        report = service.create_report(db, reporter_id, payload)
        report_dict = service.to_report_read(db, report)
        return ShoutoutReportRead(**report_dict)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get("/my-reports", response_model=List[ShoutoutReportRead])
def get_my_reports(
    reporter_id: int = Query(..., ge=1, description="ID of the employee"),
    db: Session = Depends(get_db)
):
    """
    Get all reports created by the current employee (Employee endpoint).
    Shows the employee's reported shoutouts and their current status.
    """
    verify_user(db, reporter_id)
    reports = service.get_reports_by_reporter(db, reporter_id)
    return [ShoutoutReportRead(**service.to_report_read(db, report)) for report in reports]


@router.get("", response_model=List[ShoutoutReportRead])
def get_all_reports(
    admin_id: int = Query(..., ge=1, description="ID of the admin user"),
    status: Optional[ReportStatus] = Query(None, description="Filter reports by status (pending, resolved, dismissed)"),
    db: Session = Depends(get_db)
):
    """
    Get all shoutout reports (Admin endpoint).
    Admins can view all reports and filter by status.
    """
    verify_admin(db, admin_id)
    status_str = status.value if status else None
    reports = service.get_all_reports(db, status_str)
    return [ShoutoutReportRead(**service.to_report_read(db, report)) for report in reports]


@router.get("/{report_id}", response_model=ShoutoutReportRead)
def get_report(
    report_id: int,
    user_id: int = Query(..., ge=1, description="ID of the user requesting the report"),
    db: Session = Depends(get_db)
):
    """
    Get a specific report by ID.
    Employees can view their own reports, admins can view any report.
    """
    verify_user(db, user_id)
    user = db.get(User, user_id)
    report = service.get_report(db, report_id)
    
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found"
        )
    
    
    if user.role != "admin" and report.reporter_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only view your own reports"
        )
    
    return ShoutoutReportRead(**service.to_report_read(db, report))


@router.patch("/{report_id}/resolve", response_model=ShoutoutReportRead)
def resolve_report(
    report_id: int,
    payload: ShoutoutReportResolve,
    admin_id: int = Query(..., ge=1, description="ID of the admin user resolving the report"),
    db: Session = Depends(get_db)
):
    """
    Resolve a shoutout report (Admin endpoint).
    Admins can resolve reports by setting status to 'resolved' or 'dismissed' and optionally add resolution notes.
    """
    verify_admin(db, admin_id)
    
    try:
        report = service.resolve_report(db, report_id, admin_id, payload)
        return ShoutoutReportRead(**service.to_report_read(db, report))
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get("/export/{file_format}")
def export_reports(
    file_format: Literal["csv", "pdf"],
    admin_id: int = Query(..., ge=1, description="ID of the admin user"),
    db: Session = Depends(get_db)
):
    """
    API endpoint for admins to export a report of all shoutout reports 
    in either CSV or PDF format.
    """
    verify_admin(db, admin_id)
    
    
    report_data = service.get_all_reports_for_export(db)
    
    if not report_data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No reports found to export")

    
    filename_base = f"shoutout_moderation_report_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}"

    if file_format == "csv":
        
        csv_file = service.generate_reports_csv(report_data)
        
        
        headers = {'Content-Disposition': f'attachment; filename="{filename_base}.csv"'}
        return StreamingResponse(
            iter([csv_file.getvalue()]), 
            media_type="text/csv", 
            headers=headers
        )
    
    elif file_format == "pdf":
        
        pdf_buffer = service.generate_reports_pdf(report_data)

        
        headers = {'Content-Disposition': f'attachment; filename="{filename_base}.pdf"'}
        return Response(
            content=pdf_buffer.getvalue(), 
            media_type="application/pdf", 
            headers=headers
        )
    
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid file format requested")
