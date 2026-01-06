from sqlalchemy.orm import Session
from src.entities.notification import Notification
from src.notifications.models import NotificationCreate, NotificationUpdate

def create_notification(db: Session, notification: NotificationCreate):
    db_notification = Notification(
        recipient_id=notification.recipient_id,
        type=notification.type,
        message=notification.message,
        link=notification.link
    )
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
    return db_notification

def get_my_notifications(db: Session, user_id: int):
    return db.query(Notification).filter(Notification.recipient_id == user_id).order_by(Notification.created_at.desc()).all()

def mark_as_read(db: Session, notification_id: int, user_id: int):
    db_notification = db.query(Notification).filter(Notification.id == notification_id, Notification.recipient_id == user_id).first()
    if db_notification:
        db_notification.is_read = True
        db.commit()
        db.refresh(db_notification)
    return db_notification

def get_unread_count(db: Session, user_id: int):
    return db.query(Notification).filter(Notification.recipient_id == user_id, Notification.is_read == False).count()
