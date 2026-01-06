from sqlalchemy.orm import Session, joinedload
from .models import ShoutoutCreate
from src.entities.todo import Shoutout, Tag, Comment
from src.entities.user import User
from src.notifications.service import create_notification
from src.notifications.models import NotificationCreate

def create_shoutout(db: Session, payload: ShoutoutCreate):
    shout = Shoutout(
        title=payload.title.strip(),
        message=payload.message,
        sender_id=payload.sender_id,
    )
    # Fetch sender for notification details
    sender = db.get(User, payload.sender_id)
    sender_name = sender.name if sender else "Someone"


    if payload.recipient_ids:
        # Fetch all recipients
        recipients = db.query(User).filter(User.id.in_(payload.recipient_ids)).all()
        shout.recipients.extend(recipients)
        
        # Trigger Notification for each tagged user
        for recipient in recipients:
             if recipient.id != payload.sender_id:
                notif = NotificationCreate(
                    recipient_id=recipient.id,
                    type="shoutout_tag",
                    message=f"{sender_name} tagged you in a shoutout",
                    link=f"/dashboard" 
                )
                create_notification(db, notif)

    tags = [get_or_create_tag(db, t) for t in (payload.tags or []) if t and t.strip()]
    shout.tags = tags
    db.add(shout)
    db.commit()
    db.refresh(shout)
    return shout

def get_or_create_tag(db: Session, tag_name: str):
    tag_name = tag_name.strip().lower()
    tag = db.query(Tag).filter(Tag.name == tag_name).first()
    if not tag:
        tag = Tag(name=tag_name)
        db.add(tag)
        db.commit()
        db.refresh(tag)
    return tag

def list_shoutouts(db: Session):
    return db.query(Shoutout).options(
        joinedload(Shoutout.sender),
        joinedload(Shoutout.likes),
        joinedload(Shoutout.claps),
        joinedload(Shoutout.stars),
        joinedload(Shoutout.comments).joinedload(Comment.author)
    ).order_by(Shoutout.created_at.desc()).all()

def get_shoutout(db: Session, shoutout_id: int):
    return db.get(Shoutout, shoutout_id)

def update_shoutout(db: Session, shoutout_id: int, payload):
    shout = db.get(Shoutout, shoutout_id)
    if payload.title:
        shout.title = payload.title
    if payload.message:
        shout.message = payload.message
    db.commit()
    db.refresh(shout)
    return shout

def delete_shoutout(db: Session, shoutout_id: int):
    shout = db.get(Shoutout, shoutout_id)
    if shout:
        db.delete(shout)
        db.commit()
    return True

def toggle_like(db: Session, shoutout_id: int, user_id: int):
    shout = db.get(Shoutout, shoutout_id)
    if not shout:
        return None
    user = db.get(User, user_id)
    if not user:
        return None
        
    if user in shout.likes:
        shout.likes.remove(user)
    else:
        shout.likes.append(user)
        # Notify author if not self-reaction
        if shout.sender_id != user_id:
            notif = NotificationCreate(
                recipient_id=shout.sender_id,
                type="like",
                message=f"{user.name} liked your shoutout",
                link=f"/dashboard" # TBD specific link
            )
            create_notification(db, notif)
    
    db.commit()
    db.refresh(shout)
    return shout

def toggle_clap(db: Session, shoutout_id: int, user_id: int):
    shout = db.get(Shoutout, shoutout_id)
    if not shout:
        return None
    user = db.get(User, user_id)
    if not user:
        return None
        
    if user in shout.claps:
        shout.claps.remove(user)
    else:
        shout.claps.append(user)
        # Notify author if not self-reaction
        if shout.sender_id != user_id:
            notif = NotificationCreate(
                recipient_id=shout.sender_id,
                type="clap",
                message=f"{user.name} clapped for your shoutout",
                link=f"/dashboard"
            )
            create_notification(db, notif)
    
    db.commit()
    db.refresh(shout)
    return shout

def toggle_star(db: Session, shoutout_id: int, user_id: int):
    shout = db.get(Shoutout, shoutout_id)
    if not shout:
        return None
    user = db.get(User, user_id)
    if not user:
        return None
        
    if user in shout.stars:
        shout.stars.remove(user)
    else:
        shout.stars.append(user)
        # Notify author if not self-reaction
        if shout.sender_id != user_id:
            notif = NotificationCreate(
                recipient_id=shout.sender_id,
                type="star",
                message=f"{user.name} starred your shoutout",
                link=f"/dashboard"
            )
            create_notification(db, notif)
    
    db.commit()
    db.refresh(shout)
    return shout


def add_comment(db: Session, shoutout_id: int, user_id: int, content: str, parent_id: int = None):
    shout = db.get(Shoutout, shoutout_id)
    if not shout:
        return None
    
    comment = Comment(
        shoutout_id=shoutout_id,
        author_id=user_id, 
        content=content,
        parent_id=parent_id
    )
    db.add(comment)
    db.commit()
    db.refresh(comment)

    # Notify shoutout author
    if shout.sender_id != user_id:
        author = db.get(User, user_id)
        author_name = author.name if author else "Someone"
        notif = NotificationCreate(
            recipient_id=shout.sender_id,
            type="comment",
            message=f"{author_name} commented on your shoutout",
            link=f"/dashboard"
        )
        create_notification(db, notif)

    return comment

def get_recent_reactions(db: Session, limit: int = 5):
    # This is a bit complex with mixed likes and comments. 
    # For now, let's return just recent comments as "reactions" for the widget
    # or we can do a union. 
    # To keep it simple for the MVP widget: Recent Comments.
    return db.query(Comment).order_by(Comment.created_at.desc()).limit(limit).all()
