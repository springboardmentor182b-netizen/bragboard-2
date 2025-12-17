from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import Optional, List
from src.database.core import get_database_session
from src.entities.user import User
from src.entities.shoutout_report import ShoutoutReport
from .reporting_schemas import ReportCreateRequest, ReportUpdateRequest, ReportResponse, ReportingStatsResponse
from .reporting_service import ReportingService

router = APIRouter(prefix="/api/reporting", tags=["Reporting"])

def verify_user(db_session: Session, user_id: int) -> User:
    """Verify user exists."""
    user = db_session.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user

def verify_admin(db_session: Session, admin_id: int) -> User:
    """Verify admin exists and has admin role."""
    user = db_session.query(User).filter(User.id == admin_id, User.role == "admin").first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return user

@router.post("/submit", response_model=ReportResponse)
def submit_report(
    report_data: ReportCreateRequest,
    employee_id: int = Query(..., ge=1, description="Employee ID"),
    db_session: Session = Depends(get_database_session)
):
    try:
        verify_user(db_session, employee_id)
        report = ReportingService.create_report_service(
            db_session,
            report_data.shoutout_id,
            employee_id,
            report_data.reporting_reason
        )
        return ReportingService.format_report_response(db_session, report)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))

@router.get("/my-reports", response_model=List[ReportResponse])
def get_my_reports(
    employee_id: int = Query(..., ge=1, description="Employee ID"),
    status: Optional[str] = Query(None, description="Filter by status"),
    db_session: Session = Depends(get_database_session)
):
    verify_user(db_session, employee_id)
    reports = ReportingService.get_employee_reports_service(
        db_session, 
        employee_id, 
        status
    )
    return [ReportingService.format_report_response(db_session, report) for report in reports]

@router.get("/admin/all", response_model=dict)
def admin_get_all_reports(
    admin_id: int = Query(..., ge=1, description="Admin ID"),
    status: Optional[str] = Query(None, description="Filter by status"),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db_session: Session = Depends(get_database_session)
):
    verify_admin(db_session, admin_id)
    reports_list, total_count = ReportingService.get_all_reports_service(
        db_session, 
        status, 
        page, 
        limit
    )
    
    return {
        "reports": [ReportingService.format_report_response(db_session, report) for report in reports_list],
        "pagination": {
            "current_page": page,
            "total_items": total_count,
            "total_pages": (total_count + limit - 1) // limit,
            "items_per_page": limit
        }
    }

@router.patch("/admin/resolve/{report_id}", response_model=ReportResponse)
def admin_resolve_report(
    report_id: int,
    resolution_data: ReportUpdateRequest,
    admin_id: int = Query(..., ge=1, description="Admin ID"),
    db_session: Session = Depends(get_database_session)
):
    verify_admin(db_session, admin_id)
    try:
        report = ReportingService.resolve_report_service(
            db_session, 
            report_id, 
            admin_id, 
            resolution_data
        )
        return ReportingService.format_report_response(db_session, report)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error))

@router.get("/admin/stats", response_model=ReportingStatsResponse)
def get_report_stats(
    admin_id: int = Query(..., ge=1, description="Admin ID"),
    db_session: Session = Depends(get_database_session)
):
    verify_admin(db_session, admin_id)
    stats = ReportingService.get_reporting_statistics_service(db_session)
    return stats

@router.get("/{report_id}", response_model=ReportResponse)
def get_report(
    report_id: int,
    user_id: int = Query(..., ge=1, description="User ID"),
    db_session: Session = Depends(get_database_session)
):
    user = verify_user(db_session, user_id)
    report = db_session.query(ShoutoutReport).filter(ShoutoutReport.id == report_id).first()
    
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    # Check access: employees can only see their own reports, admins can see all
    if user.role != "admin" and report.reporter_id != user_id:
        raise HTTPException(
            status_code=403,
            detail="You can only view your own reports"
        )
    
    return ReportingService.format_report_response(db_session, report)