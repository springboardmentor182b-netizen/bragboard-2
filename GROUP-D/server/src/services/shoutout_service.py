from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from fastapi import HTTPException

from server.src.models.shoutout import Shoutout, ShoutoutStatus

def get_shoutouts(db: Session, page: int, size: int, search: str, status_filter: str):
    query = db.query(Shoutout).filter(Shoutout.is_deleted == False)

    if search:
        query = query.filter(Shoutout.employee_name.ilike(f"%{search}%"))

    if status_filter:
        query = query.filter(Shoutout.status == status_filter)

    total = query.count()

    shoutouts = query.order_by(Shoutout.created_at.desc()) \
                     .offset((page - 1) * size) \
                     .limit(size) \
                     .all()

    return total, shoutouts


def get_one(db: Session, shoutout_id: int):
    shoutout = db.query(Shoutout).filter(
        Shoutout.id == shoutout_id,
        Shoutout.is_deleted == False
    ).first()

    if not shoutout:
        raise HTTPException(404, "Shoutout not found")

    return shoutout


def approve(db: Session, shoutout_id: int):
    shoutout = get_one(db, shoutout_id)
    shoutout.status = ShoutoutStatus.approved
    db.commit()
    db.refresh(shoutout)
    return shoutout


def reject(db: Session, shoutout_id: int):
    shoutout = get_one(db, shoutout_id)
    shoutout.status = ShoutoutStatus.rejected
    db.commit()
    db.refresh(shoutout)
    return shoutout


def delete(db: Session, shoutout_id: int, admin_id: int):
    shoutout = get_one(db, shoutout_id)
    shoutout.is_deleted = True
    shoutout.deleted_at = func.now()
    shoutout.deleted_by = admin_id
    db.commit()
    return {"message": "Shoutout deleted successfully"}
