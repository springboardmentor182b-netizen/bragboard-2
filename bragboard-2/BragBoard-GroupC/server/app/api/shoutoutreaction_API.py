from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.shoutout_reaction import Reaction
from app.models.shoutout import Shoutout
from app.schemas.shoutout_reaction import ReactionCreate, ReactionCountResponse

router = APIRouter(prefix="/reactions", tags=["Reactions"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# POST - Add Reaction
@router.post("/{shoutout_id}")
def add_reaction(shoutout_id: int, body: ReactionCreate, db: Session = Depends(get_db)):
    current_user_id = 1  # TEMP

    shoutout = db.query(Shoutout).filter(Shoutout.id == shoutout_id).first()
    if not shoutout:
        raise HTTPException(status_code=404, detail="Shoutout not found")

    # If user already reacted, update reaction_type
    existing = db.query(Reaction).filter(
        Reaction.shoutout_id == shoutout_id,
        Reaction.user_id == current_user_id
    ).first()

    if existing:
        existing.reaction_type = body.reaction_type
    else:
        new_reaction = Reaction(
            shoutout_id=shoutout_id,
            user_id=current_user_id,
            reaction_type=body.reaction_type
        )
        db.add(new_reaction)

    db.commit()
    return {"message": "Reaction added/updated"}

# DELETE - Remove Reaction
@router.delete("/{shoutout_id}")
def remove_reaction(shoutout_id: int, db: Session = Depends(get_db)):
    current_user_id = 1  # TEMP

    reaction = db.query(Reaction).filter(
        Reaction.shoutout_id == shoutout_id,
        Reaction.user_id == current_user_id
    ).first()

    if not reaction:
        raise HTTPException(status_code=404, detail="Reaction not found")

    db.delete(reaction)
    db.commit()

    return {"message": "Reaction removed"}

# GET - Count all reaction types
@router.get("/{shoutout_id}/count", response_model=ReactionCountResponse)
def get_reaction_count(shoutout_id: int, db: Session = Depends(get_db)):
    reactions = db.query(Reaction).filter(Reaction.shoutout_id == shoutout_id).all()

    counts = {}
    for r in reactions:
        counts[r.reaction_type] = counts.get(r.reaction_type, 0) + 1

    return ReactionCountResponse(shoutout_id=shoutout_id, count=counts)

# GET - Check which reaction the user gave
@router.get("/{shoutout_id}/my-reaction")
def get_user_reaction(shoutout_id: int, db: Session = Depends(get_db)):
    current_user_id = 1  # TEMP

    reaction = db.query(Reaction).filter(
        Reaction.shoutout_id == shoutout_id,
        Reaction.user_id == current_user_id
    ).first()

    if not reaction:
        return {"reaction_type": None}

    return {"reaction_type": reaction.reaction_type}
