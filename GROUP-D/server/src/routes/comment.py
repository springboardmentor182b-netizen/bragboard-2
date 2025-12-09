from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.database import get_db
from src.middleware.auth import get_current_user
from server.src.controllers.comment import (
    create_comment, get_comments_by_shoutout,
    update_comment, delete_comment
)
from src.models.comment_schema import CommentCreate, CommentUpdate

router = APIRouter(prefix="/comments", tags=["Comments"])

@router.post("/")
def add_comment(payload: CommentCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return create_comment(db, current_user.id, payload)

@router.get("/shoutout/{shoutout_id}")
def list_comments(shoutout_id: int, db: Session = Depends(get_db)):
    return get_comments_by_shoutout(db, shoutout_id)

@router.put("/{comment_id}")
def edit_comment(comment_id: int, payload: CommentUpdate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return update_comment(db, comment_id, current_user.id, payload)

@router.delete("/{comment_id}")
def remove_comment(comment_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return delete_comment(db, comment_id, current_user.id)
