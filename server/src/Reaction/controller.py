from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from ..database.core import get_db 
from ..users.service import get_current_user_id 
from .models import ReactionCreate, ReactionResponse
from . import service as reactions_service 

router = APIRouter(prefix="/shoutouts", tags=["Reactions"])

@router.post("/{shoutout_id}/reactions", 
             status_code=status.HTTP_200_OK,
             response_model=ReactionResponse | dict[str, str] ) 
def toggle_or_update_reaction(
    shoutout_id: int, 
    reaction_data: ReactionCreate,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):

    reaction = reactions_service.upsert_reaction(
        db=db,
        shoutout_id=shoutout_id,
        user_id=user_id,
        reaction_type=reaction_data.type
    )

    if reaction is None:
        return {"message": "Reaction removed successfully"}

    return reaction
