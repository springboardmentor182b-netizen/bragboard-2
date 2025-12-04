from sqlalchemy.orm import Session
from . import models, schemas


def create_shoutout(db: Session, shoutout_data: schemas.ShoutoutCreate):
    new_shoutout = models.Shoutout(
        employee_id=shoutout_data.employee_id,
        message=shoutout_data.message,
        status="Pending"
    )
    db.add(new_shoutout)
    db.commit()
    db.refresh(new_shoutout)
    return new_shoutout


def get_my_shoutouts(db: Session, employee_id: int):
    return db.query(models.Shoutout).filter(
        models.Shoutout.employee_id == employee_id
    ).all()


def get_reported_shoutouts(db: Session):
    return db.query(models.Shoutout).all()


def resolve_shoutout(db: Session, shoutout_id: int, new_status: str):
    shoutout = db.query(models.Shoutout).filter(
        models.Shoutout.id == shoutout_id
    ).first()

    if shoutout:
        shoutout.status = new_status
        db.commit()
        db.refresh(shoutout)
        return shoutout

    return None
