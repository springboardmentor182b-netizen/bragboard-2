from typing import List, Optional

from sqlalchemy.orm import Session

from server.src.comments.models import CommentCreate, CommentUpdate
from server.src.entities.comment import Comment


def list_comments(
    db: Session,
    post_id: Optional[int] = None,
    author: Optional[str] = None,
) -> List[Comment]:
    query = db.query(Comment)
    if post_id is not None:
        query = query.filter(Comment.post_id == post_id)
    if author:
        query = query.filter(Comment.author == author)
    return query.order_by(Comment.created_at.desc()).all()


def get_comment(db: Session, comment_id: int) -> Optional[Comment]:
    return db.query(Comment).filter(Comment.id == comment_id).first()


def add_comment(db: Session, payload: CommentCreate) -> Comment:
    comment = Comment(
        post_id=payload.post_id,
        author=payload.author,
        content=payload.content,
    )
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment


def update_comment(
    db: Session,
    comment_id: int,
    payload: CommentUpdate,
) -> Optional[Comment]:
    comment = get_comment(db, comment_id)
    if comment is None:
        return None

    if payload.post_id is not None:
        comment.post_id = payload.post_id
    if payload.author is not None:
        comment.author = payload.author
    if payload.content is not None:
        comment.content = payload.content

    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment


def delete_comment(db: Session, comment_id: int) -> bool:
    comment = get_comment(db, comment_id)
    if comment is None:
        return False
    db.delete(comment)
    db.commit()
    return True

