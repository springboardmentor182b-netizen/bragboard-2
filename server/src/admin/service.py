from sqlalchemy.orm import Session
from src.entities.user import User
from src.entities.todo import Shoutout
from src.entities.shoutout_report import ShoutoutReport

def get_admin_stats(db: Session):
    total_users = db.query(User).count()
    total_shoutouts = db.query(Shoutout).count()
    pending_reports = db.query(ShoutoutReport).filter(ShoutoutReport.status == "pending").count()
    
    # Simple engagement calculation: shoutouts per user ratio as percentage
    engagement = 0
    if total_users > 0:
        engagement = (total_shoutouts / total_users) * 100
        
    return {
        "total_users": str(total_users),
        "shoutouts": str(total_shoutouts),
        "flagged_items": str(pending_reports),
        "engagement": f"{min(round(engagement), 100)}%"
    }

def delete_user(db: Session, user_id: int):
    user = db.get(User, user_id)
    if user:
        db.delete(user)
        db.commit()
        return True
    return False
