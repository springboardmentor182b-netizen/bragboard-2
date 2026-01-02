from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from src.database.core import get_db
from . import service

router = APIRouter(prefix="/api/admin", tags=["Admin"])

@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    """Returns dashboard statistics for the admin."""
    return service.get_admin_stats(db)

@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """Deletes a user by ID."""
    success = service.delete_user(db, user_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return {"message": "User deleted successfully"}
