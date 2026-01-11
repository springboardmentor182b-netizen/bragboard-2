from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.auth.service import get_current_user_id
from src.notifications import service
from src.notifications.models import NotificationRead

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.get("", response_model=list[NotificationRead])
def get_notifications(db: Session = Depends(get_db), user_id: int = Depends(get_current_user_id)):
    print(f"DEBUG NOTIF CONTROLLER: Fetching for user_id={user_id}")
    return service.get_my_notifications(db, user_id)

@router.get("/unread-count")
def get_unread_count(db: Session = Depends(get_db), user_id: int = Depends(get_current_user_id)):
    count = service.get_unread_count(db, user_id)
    return {"count": count}

@router.patch("/{notification_id}/read")
def mark_notification_as_read(notification_id: int, db: Session = Depends(get_db), user_id: int = Depends(get_current_user_id)):
    notification = service.mark_as_read(db, notification_id, user_id)
    if not notification:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found"
        )
    return {"message": "Notification marked as read"}
