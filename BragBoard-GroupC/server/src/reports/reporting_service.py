from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Tuple
from sqlalchemy import func
from app.models import User
from app.models import Shoutout
from src.entities.shoutout_report import ShoutoutReport
from .reporting_schemas import ReportUpdateRequest
from datetime import datetime

class ReportingService:
    
    @staticmethod
    def create_report_service(db_session: Session, shoutout_id: int, employee_id: int, reason: str):
        # Check if shoutout exists
        shoutout = db_session.query(Shoutout).filter(Shoutout.id == shoutout_id).first()
        if not shoutout:
            raise ValueError("Shoutout not found")
        
        # Check if employee exists
        employee = db_session.query(User).filter(User.id == employee_id).first()
        if not employee:
            raise ValueError("Employee not found")
        
        # Check for duplicate report
        existing_report = db_session.query(ShoutoutReport).filter(
            ShoutoutReport.shoutout_id == shoutout_id,
            ShoutoutReport.reporter_id == employee_id
        ).first()
        
        if existing_report:
            raise ValueError("Already reported this shoutout")
        
        # Create report
        new_report = ShoutoutReport(
            shoutout_id=shoutout_id,
            reporter_id=employee_id,
            reason=reason,
            status="pending"
        )
        
        db_session.add(new_report)
        db_session.commit()
        db_session.refresh(new_report)
        return new_report
    
    @staticmethod
    def get_employee_reports_service(db_session: Session, employee_id: int, status_filter: Optional[str] = None):
        query = db_session.query(ShoutoutReport).filter(
            ShoutoutReport.reporter_id == employee_id
        )
        
        if status_filter:
            query = query.filter(ShoutoutReport.status == status_filter)
        
        return query.order_by(ShoutoutReport.created_at.desc()).all()
    
    @staticmethod
    def get_all_reports_service(db_session: Session, status_filter: Optional[str] = None, page_number: int = 1, page_size: int = 10):
        query = db_session.query(ShoutoutReport)
        
        if status_filter:
            query = query.filter(ShoutoutReport.status == status_filter)
        
        offset = (page_number - 1) * page_size
        reports_list = query.order_by(ShoutoutReport.created_at.desc())\
                          .offset(offset)\
                          .limit(page_size)\
                          .all()
        
        total_count = query.count()
        
        return reports_list, total_count
    
    @staticmethod
    def resolve_report_service(db_session: Session, report_id: int, admin_id: int, resolution_data: ReportUpdateRequest):
        report = db_session.query(ShoutoutReport).filter(ShoutoutReport.id == report_id).first()
        
        if not report:
            raise ValueError("Report not found")
        
        if report.status != "pending":
            raise ValueError(f"Report is already {report.status}")
        
        # Update report
        report.status = resolution_data.reporting_status
        report.resolving_admin_id = admin_id
        report.admin_resolution_notes = resolution_data.admin_resolution_notes
        report.resolved_at = func.now()
        
        db_session.commit()
        db_session.refresh(report)
        return report
    
    @staticmethod
    def get_reporting_statistics_service(db_session: Session):
        total = db_session.query(ShoutoutReport).count()
        pending = db_session.query(ShoutoutReport).filter(ShoutoutReport.status == "pending").count()
        resolved = db_session.query(ShoutoutReport).filter(ShoutoutReport.status == "resolved").count()
        dismissed = db_session.query(ShoutoutReport).filter(ShoutoutReport.status == "dismissed").count()
        
        return {
            "total_reports": total,
            "pending_reports": pending,
            "resolved_reports": resolved,
            "dismissed_reports": dismissed
        }
    
    @staticmethod
    def format_report_response(db_session: Session, report: ShoutoutReport) -> dict:
        """Convert ShoutoutReport to response dictionary with additional info"""
        # Get reporter info
        reporter = db_session.query(User).filter(User.id == report.reporter_id).first()
        
        # Get resolver info if resolved
        resolver = None
        if report.resolved_by:
            resolver = db_session.query(User).filter(User.id == report.resolved_by).first()
        
        # Get shoutout info
        shoutout = db_session.query(Shoutout).filter(Shoutout.id == report.shoutout_id).first()
        
        # Get shoutout sender info
        shoutout_sender = None
        if shoutout:
            shoutout_sender = db_session.query(User).filter(User.id == shoutout.sender_id).first()
        
        return {
            "id": report.id,
            "shoutout_id": report.shoutout_id,
            "reporting_employee_id": report.reporter_id,
            "reporting_reason": report.reason,
            "reporting_status": report.status,
            "admin_resolution_notes": report.resolution_notes,
            "resolving_admin_id": report.resolved_by,
            "created_at": report.created_at,
            "resolved_at": report.resolved_at,
            # Additional info
            "reporter_name": reporter.name if reporter else None,
            "resolver_name": resolver.name if resolver else None,
            "shoutout_message": shoutout.message if shoutout else None,
            "shoutout_sender_name": shoutout_sender.name if shoutout_sender else None
        }