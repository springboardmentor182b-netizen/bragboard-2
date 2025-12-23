from datetime import datetime, timedelta
from sqlalchemy import func
from sqlalchemy.orm import Session
from src.entities.user import User
from src.entities.todo import Shoutout, shoutout_recipient_table
from src.entities.shoutout_report import ShoutoutReport

def get_admin_stats(db: Session):
    total_users = db.query(User).count()
    total_shoutouts = db.query(Shoutout).count()
    pending_reports = db.query(ShoutoutReport).filter(ShoutoutReport.status == "pending").count()
    
    # Weekly Activity (7 days)
    seven_days_ago = datetime.utcnow() - timedelta(days=6)
    activity_query = db.query(
        func.date(Shoutout.created_at).label('date'),
        func.count(Shoutout.id).label('count')
    ).filter(
        Shoutout.created_at >= seven_days_ago
    ).group_by(
        func.date(Shoutout.created_at)
    ).all()
    
    # Fill in zeros for missing days
    activity_map = {str(row.date): row.count for row in activity_query}
    weekly_activity = []
    for i in range(7):
        date = (seven_days_ago + timedelta(days=i)).date()
        date_str = str(date)
        weekly_activity.append({
            "day": date.strftime("%a"),
            "count": activity_map.get(date_str, 0)
        })

    # Shoutouts by Department (grouped by recipient department)
    dept_query = db.query(
        User.department,
        func.count(shoutout_recipient_table.c.shoutout_id).label('count')
    ).join(
        shoutout_recipient_table, User.id == shoutout_recipient_table.c.recipient_id
    ).group_by(
        User.department
    ).all()
    
    department_stats = [
        {"department": row.department, "count": row.count}
        for row in dept_query
    ]

    # Simple engagement calculation: shoutouts per user ratio as percentage
    engagement = 0
    if total_users > 0:
        engagement = (total_shoutouts / total_users) * 100
        
    return {
        "total_users": str(total_users),
        "shoutouts": str(total_shoutouts),
        "flagged_items": str(pending_reports),
        "engagement": f"{min(round(engagement), 100)}%",
        "weekly_activity": weekly_activity,
        "department_stats": department_stats
    }

def delete_user(db: Session, user_id: int):
    user = db.get(User, user_id)
    if user:
        db.delete(user)
        db.commit()
        return True
    return False
