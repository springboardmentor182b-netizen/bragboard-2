from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional

from src.database.connection import get_db
from src.models.shoutout import Shoutout, ShoutoutStatus
from src.schemas.shoutout import ShoutoutList
from src.deps.auth import get_current_admin

router = APIRouter(
    prefix="/admin/shoutouts",
    tags=["Admin Shoutouts"],
    dependencies=[Depends(get_current_admin)]
)


# 1View all shoutouts (Pagination)
@router.get("/", response_model=ShoutoutList)
def get_all_shoutouts(
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    offset = (page - 1) * limit

    shoutouts = (
        db.query(Shoutout)
        .order_by(Shoutout.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

    return {"shoutouts": shoutouts}


# View shoutouts by status
@router.get("/status/{status}", response_model=ShoutoutList)
def get_shoutouts_by_status(
    status: ShoutoutStatus,
    db: Session = Depends(get_db)
):
    shoutouts = (
        db.query(Shoutout)
        .filter(Shoutout.status == status)
        .order_by(Shoutout.created_at.desc())
        .all()
    )

    return {"shoutouts": shoutouts}


# Filter shoutouts (status + industry)
@router.get("/filter", response_model=ShoutoutList)
def filter_shoutouts(
    status: Optional[ShoutoutStatus] = None,
    industry: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Shoutout)

    if status:
        query = query.filter(Shoutout.status == status)

    if industry:
        query = query.filter(Shoutout.industry.ilike(f"%{industry}%"))

    shoutouts = query.order_by(Shoutout.created_at.desc()).all()

    return {"shoutouts": shoutouts}


# Approve shoutout
@router.put("/{shoutout_id}/approve")
def approve_shoutout(shoutout_id: int, db: Session = Depends(get_db)):
    shoutout = db.query(Shoutout).filter(Shoutout.id == shoutout_id).first()

    if not shoutout:
        raise HTTPException(status_code=404, detail="Shoutout not found")

    shoutout.status = ShoutoutStatus.approved
    db.commit()

    return {"message": "Shoutout approved"}


# Reject shoutout
@router.put("/{shoutout_id}/reject")
def reject_shoutout(shoutout_id: int, db: Session = Depends(get_db)):
    shoutout = db.query(Shoutout).filter(Shoutout.id == shoutout_id).first()

    if not shoutout:
        raise HTTPException(status_code=404, detail="Shoutout not found")

    shoutout.status = ShoutoutStatus.rejected
    db.commit()

    return {"message": "Shoutout rejected"}
