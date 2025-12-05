

# Updated Comments API - re-raised PR
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.comments import Comment
from app.schemas.comments import CommentCreate, CommentOut
from app.core.auth import get_current_user
from typing import List

router = APIRouter(prefix="/comments", tags=["Comments"])

@router.post("/", response_model=CommentOut)
def add_comment(payload: CommentCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    comment = Comment(
        shoutout_id=payload.shoutout_id,
        user_id=user.id,
        content=payload.content
    )
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment

@router.get("/{shoutout_id}", response_model=List[CommentOut])
def get_comments(shoutout_id: int, db: Session = Depends(get_db)):
    return db.query(Comment).filter(Comment.shoutout_id == shoutout_id).all()

@router.put("/{comment_id}", response_model=CommentOut)
def edit_comment(comment_id: int, new_content: str, db: Session = Depends(get_db), user=Depends(get_current_user)):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()

    if comment.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not allowed")

    comment.content = new_content
    db.commit()
    return comment

@router.delete("/{comment_id}")
def delete_comment(comment_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()

    if comment.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not allowed")

    db.delete(comment)
    db.commit()
    return {"message": "Deleted successfully"}
