from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from src.todos.service import create_shoutout, list_shoutouts, get_shoutout, update_shoutout, delete_shoutout
from src.todos.models import ShoutoutCreate, ShoutoutRead
from src.database.core import get_db

router = APIRouter(prefix="/shoutouts", tags=["Shoutouts"])

@router.post("", response_model=ShoutoutRead, status_code=status.HTTP_201_CREATED)
def api_create(payload: ShoutoutCreate, db: Session = Depends(get_db)):
    return create_shoutout(db, payload)

@router.get("", response_model=list[ShoutoutRead])
def api_list(db: Session = Depends(get_db)):
    return list_shoutouts(db)

@router.get("/{shoutout_id}", response_model=ShoutoutRead)
def api_get(shoutout_id: int, db: Session = Depends(get_db)):
    shout = get_shoutout(db, shoutout_id)
    if not shout:
        raise HTTPException(status_code=404, detail="Shoutout not found")
    return shout

@router.put("/{shoutout_id}", response_model=ShoutoutRead)
def api_update(shoutout_id: int, payload: ShoutoutCreate, db: Session = Depends(get_db)):
    return update_shoutout(db, shoutout_id, payload)

@router.delete("/{shoutout_id}", status_code=status.HTTP_204_NO_CONTENT)
def api_delete(shoutout_id: int, db: Session = Depends(get_db)):
    delete_shoutout(db, shoutout_id)