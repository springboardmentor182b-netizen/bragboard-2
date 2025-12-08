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
    return format_shoutout(shout)  # ✅ Convert before returning

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
    shoutouts = db.query(Shoutout).order_by(Shoutout.created_at.desc()).all()
    return [format_shoutout(s) for s in shoutouts]  # ✅ Convert list

def get_shoutout(db: Session, shoutout_id: int):
    shout = db.get(Shoutout, shoutout_id)
    if shout:
        return format_shoutout(shout)
    return None

def update_shoutout(db: Session, shoutout_id: int, payload: ShoutoutCreate):
    shout = db.get(Shoutout, shoutout_id)
    if payload.title:
        shout.title = payload.title
    if payload.message:
        shout.message = payload.message
    db.commit()
    db.refresh(shout)
    return format_shoutout(shout)

def delete_shoutout(db: Session, shoutout_id: int):
    shout = db.get(Shoutout, shoutout_id)
    db.delete(shout)
    db.commit()

# -----------------------------
# Helper to convert ORM -> dict
# -----------------------------
def format_shoutout(shout: Shoutout):
    return {
        "id": shout.id,
        "title": shout.title,
        "message": shout.message,
        "sender_id": shout.sender_id,
        "recipients": [r.id for r in shout.recipients],  # convert User objects to IDs
        "tags": [t.name for t in shout.tags],            # convert Tag objects to strings
        "created_at": shout.created_at,
    }
