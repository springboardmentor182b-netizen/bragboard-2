from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from src.comments.models import CommentCreate, CommentRead, CommentUpdate
from src.database.core import get_session
from . import service

router = APIRouter(prefix="/comments", tags=["comments"])


@router.get("", response_model=List[CommentRead])
def read_comments(
    post_id: Optional[int] = Query(None, ge=1, description="Filter comments by post ID"),
    author: Optional[str] = Query(None, description="Filter comments by author"),
    db: Session = Depends(get_session),
):
    return service.list_comments(db, post_id=post_id, author=author)


@router.get("/{comment_id}", response_model=CommentRead)
def read_comment(comment_id: int, db: Session = Depends(get_session)):
    comment = service.get_comment(db, comment_id)
    if comment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found",
        )
    return comment


@router.post("", response_model=CommentRead, status_code=status.HTTP_201_CREATED)
def create_comment(payload: CommentCreate, db: Session = Depends(get_session)):
    return service.add_comment(db, payload)


@router.put("/{comment_id}", response_model=CommentRead)
def edit_comment(
    comment_id: int,
    payload: CommentUpdate,
    db: Session = Depends(get_session),
):
    try:
        payload.validate_has_value()
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(exc),
        ) from exc

    updated = service.update_comment(db, comment_id, payload)
    if updated is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found",
        )
    return updated


@router.delete("/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_comment(comment_id: int, db: Session = Depends(get_session)):
    deleted = service.delete_comment(db, comment_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found",
        )
    return None

