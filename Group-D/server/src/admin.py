from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database import SessionLocal
from src.models import User
from src.schemas import UserCreate
from src.security import hash_password

router = APIRouter(prefix="/admin", tags=["Admin"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register-employee")
def register_employee(data: UserCreate, db: Session = Depends(get_db)):
    if data.secret_key != "ADMIN_123":
        raise HTTPException(status_code=403, detail="Invalid admin secret")

    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="User already exists")

    user = User(
        username=data.username,
        email=data.email,
        hashed_password=hash_password(data.password),  # ✅ PERMANENT FIX
        role="employee",
        status="ACTIVE"
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "Employee registered successfully"}
