from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import SessionLocal
from app.schemas.shoutout import ShoutoutCreate, ShoutoutResponse
from app.models.shoutout import Shoutout
from app.models.shoutout_recipient import ShoutoutRecipient

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CREATE - Post a new shoutout
@router.post("/", response_model=ShoutoutResponse, status_code=201)
def create_shoutout(data: ShoutoutCreate, db: Session = Depends(get_db)):
    # TODO: Replace with actual JWT user authentication
    current_user_id = 1  # Hardcoded for now
    
    # Create shoutout
    shoutout = Shoutout(
        message=data.message,
        sender_id=current_user_id
    )
    db.add(shoutout)
    db.flush()  # Flush to get the ID without committing
    
    # Add recipients
    for recipient_id in data.recipient_ids:
        recipient = ShoutoutRecipient(
            shoutout_id=shoutout.id,
            recipient_id=recipient_id
        )
        db.add(recipient)
    
    db.commit()
    db.refresh(shoutout)
    
    return ShoutoutResponse(
        id=shoutout.id,
        message=shoutout.message,
        sender_id=shoutout.sender_id,
        recipient_ids=data.recipient_ids,
        created_at=shoutout.created_at,
        updated_at=shoutout.updated_at
    )

# READ - Get all shoutouts
@router.get("/", response_model=List[ShoutoutResponse])
def get_all_shoutouts(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    shoutouts = db.query(Shoutout).offset(skip).limit(limit).all()
    
    result = []
    for shoutout in shoutouts:
        recipient_ids = [r.recipient_id for r in shoutout.recipients]
        result.append(ShoutoutResponse(
            id=shoutout.id,
            message=shoutout.message,
            sender_id=shoutout.sender_id,
            recipient_ids=recipient_ids,
            created_at=shoutout.created_at,
            updated_at=shoutout.updated_at
        ))
    
    return result

# READ - Get single shoutout by ID
@router.get("/{shoutout_id}", response_model=ShoutoutResponse)
def get_shoutout(shoutout_id: int, db: Session = Depends(get_db)):
    shoutout = db.query(Shoutout).filter(Shoutout.id == shoutout_id).first()
    
    if not shoutout:
        raise HTTPException(status_code=404, detail="Shoutout not found")
    
    recipient_ids = [r.recipient_id for r in shoutout.recipients]
    
    return ShoutoutResponse(
        id=shoutout.id,
        message=shoutout.message,
        sender_id=shoutout.sender_id,
        recipient_ids=recipient_ids,
        created_at=shoutout.created_at,
        updated_at=shoutout.updated_at
    )

# READ - Get shoutouts by sender
@router.get("/sender/{sender_id}", response_model=List[ShoutoutResponse])
def get_shoutouts_by_sender(sender_id: int, db: Session = Depends(get_db)):
    shoutouts = db.query(Shoutout).filter(Shoutout.sender_id == sender_id).all()
    
    result = []
    for shoutout in shoutouts:
        recipient_ids = [r.recipient_id for r in shoutout.recipients]
        result.append(ShoutoutResponse(
            id=shoutout.id,
            message=shoutout.message,
            sender_id=shoutout.sender_id,
            recipient_ids=recipient_ids,
            created_at=shoutout.created_at,
            updated_at=shoutout.updated_at
        ))
    
    return result

# READ - Get shoutouts received by a user
@router.get("/recipient/{recipient_id}", response_model=List[ShoutoutResponse])
def get_shoutouts_by_recipient(recipient_id: int, db: Session = Depends(get_db)):
    # Get all shoutout_recipient entries for this user
    recipient_entries = db.query(ShoutoutRecipient).filter(
        ShoutoutRecipient.recipient_id == recipient_id
    ).all()
    
    result = []
    for entry in recipient_entries:
        shoutout = entry.shoutout
        recipient_ids = [r.recipient_id for r in shoutout.recipients]
        result.append(ShoutoutResponse(
            id=shoutout.id,
            message=shoutout.message,
            sender_id=shoutout.sender_id,
            recipient_ids=recipient_ids,
            created_at=shoutout.created_at,
            updated_at=shoutout.updated_at
        ))
    
    return result

# UPDATE - Edit a shoutout
@router.put("/{shoutout_id}", response_model=ShoutoutResponse)
def update_shoutout(shoutout_id: int, data: ShoutoutCreate, db: Session = Depends(get_db)):
    # TODO: Add permission check - only sender should be able to edit
    current_user_id = 1  # Hardcoded for now
    
    shoutout = db.query(Shoutout).filter(Shoutout.id == shoutout_id).first()
    
    if not shoutout:
        raise HTTPException(status_code=404, detail="Shoutout not found")
    
    # Check if current user is the sender
    if shoutout.sender_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this shoutout")
    
    # Update message
    shoutout.message = data.message
    
    # Update recipients - delete old ones and add new ones
    db.query(ShoutoutRecipient).filter(ShoutoutRecipient.shoutout_id == shoutout_id).delete()
    
    for recipient_id in data.recipient_ids:
        recipient = ShoutoutRecipient(
            shoutout_id=shoutout.id,
            recipient_id=recipient_id
        )
        db.add(recipient)
    
    db.commit()
    db.refresh(shoutout)
    
    return ShoutoutResponse(
        id=shoutout.id,
        message=shoutout.message,
        sender_id=shoutout.sender_id,
        recipient_ids=data.recipient_ids,
        created_at=shoutout.created_at,
        updated_at=shoutout.updated_at
    )

# DELETE - Remove a shoutout
@router.delete("/{shoutout_id}", status_code=204)
def delete_shoutout(shoutout_id: int, db: Session = Depends(get_db)):
    # TODO: Add permission check - only sender or admin should be able to delete
    current_user_id = 1  # Hardcoded for now
    
    shoutout = db.query(Shoutout).filter(Shoutout.id == shoutout_id).first()
    
    if not shoutout:
        raise HTTPException(status_code=404, detail="Shoutout not found")
    
    # Check if current user is the sender
    if shoutout.sender_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this shoutout")
    
    # Delete shoutout (recipients will be cascade deleted)
    db.delete(shoutout)
    db.commit()
    
    return None