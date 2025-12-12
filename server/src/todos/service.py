from sqlalchemy.orm import Session
from .models import ShoutoutCreate
from src.entities.todo import Shoutout, Tag
from src.entities.user import User

def create_shoutout(db: Session, payload: ShoutoutCreate):
    recipient = db.get(User, payload.recipient_id)
    shout = Shoutout(
        title=payload.title.strip(),
        message=payload.message,
        sender_id=payload.sender_id,
    )
    if recipient:
        shout.recipients.append(recipient)
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
    return db.query(Shoutout).order_by(Shoutout.created_at.desc()).all()

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
    db.delete(shout)
    db.commit()