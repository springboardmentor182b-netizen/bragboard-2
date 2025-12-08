from datetime import datetime
from typing import List

from fastapi import APIRouter, HTTPException

from .models import ShoutoutCreate, ShoutoutRead

router = APIRouter(prefix="/shoutouts", tags=["Shoutouts"])

# Temporary in‑memory storage
shoutouts_db: list[ShoutoutRead] = []


def seed_data() -> None:
    """Fill initial sample shoutouts once."""
    global shoutouts_db
    if shoutouts_db:
        return

    now = datetime.utcnow()
    shoutouts_db = [
        ShoutoutRead(
            id=1,
            title="Project Launch Success",
            description="Great work on the new product launch.",
            department="Engineering",
            created_by="Alice",
            is_flagged=False,
            created_at=now,
        ),
        ShoutoutRead(
            id=2,
            title="Marketing Campaign Win",
            description="Amazing campaign results this quarter.",
            department="Marketing",
            created_by="Bob",
            is_flagged=False,
            created_at=now,
        ),
        ShoutoutRead(
            id=3,
            title="Customer Support Hero",
            description="Handled a critical customer issue smoothly.",
            department="Support",
            created_by="Chitra",
            is_flagged=False,
            created_at=now,
        ),
        ShoutoutRead(
            id=4,
            title="Design Sprint Success",
            description="Great collaboration in the design sprint.",
            department="Design",
            created_by="David",
            is_flagged=False,
            created_at=now,
        ),
        ShoutoutRead(
            id=5,
            title="Operations On‑call",
            description="Kept the systems stable all weekend.",
            department="Operations",
            created_by="Eve",
            is_flagged=False,
            created_at=now,
        ),
    ]


@router.get("", response_model=List[ShoutoutRead])
def get_shoutouts():
    seed_data()
    return shoutouts_db


@router.post("", response_model=ShoutoutRead)
def create_shoutout(shoutout: ShoutoutCreate):
    new_id = (shoutouts_db[-1].id + 1) if shoutouts_db else 1
    shoutout_read = ShoutoutRead(
        id=new_id,
        title=shoutout.title,
        description=shoutout.description,
        department=shoutout.department,
        created_by=shoutout.created_by,
        is_flagged=shoutout.is_flagged,
        created_at=datetime.utcnow(),
    )
    shoutouts_db.append(shoutout_read)
    return shoutout_read


@router.delete("/{shoutout_id}")
def delete_shoutout(shoutout_id: int):
    global shoutouts_db
    for s in shoutouts_db:
        if s.id == shoutout_id:
            shoutouts_db = [x for x in shoutouts_db if x.id != shoutout_id]
            return {"message": "Deleted"}
    raise HTTPException(status_code=404, detail="Shoutout not found")
