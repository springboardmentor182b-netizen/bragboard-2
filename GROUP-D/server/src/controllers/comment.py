from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.models.comment import Comment
from src.models.comment_schema import CommentCreate, CommentUpdate

def create_comment(db: Session, user_id: int, comment_in: CommentCreate):
    comment = Comment(
        shoutout_id=comment_in.shoutout_id,
        user_id=user_id,
        content=comment_in.content
    )
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment

def get_comments_by_shoutout(db: Session, shoutout_id: int):
    return db.query(Comment).filter(Comment.shoutout_id == shoutout_id).all()

def update_comment(db: Session, comment_id: int, user_id: int, update_data: CommentUpdate):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    if comment.user_id != user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    comment.content = update_data.content
    db.commit()
    db.refresh(comment)
    return comment

def delete_comment(db: Session, comment_id: int, user_id: int):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    if comment.user_id != user_id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    db.delete(comment)
    db.commit()
    return {"msg": "Deleted successfully"}
