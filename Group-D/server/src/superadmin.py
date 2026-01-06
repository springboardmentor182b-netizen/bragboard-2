from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from src.database import SessionLocal
from src.schemas import UserCreate
from src.models import User
from src.security import hash_password
from src.config import SUPERADMIN_SECRET_KEY

router = APIRouter(prefix="/superadmin", tags=["SuperAdmin"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register-admin")
def register_admin(data: UserCreate, db: Session = Depends(get_db)):
    try:
        if data.secret_key != SUPERADMIN_SECRET_KEY:
            raise HTTPException(status_code=403, detail="Invalid superadmin secret")

        if db.query(User).filter(User.email == data.email).first():
            raise HTTPException(status_code=400, detail="User already exists")

        user = User(
            username=data.username,
            email=data.email,
            hashed_password=hash_password(data.password),
            role="admin",
            status="ACTIVE"
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return {
            "message": "Admin registered successfully",
            "email": user.email,
            "role": user.role
        }

    except HTTPException:
        db.rollback()
        raise

    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Database integrity error")

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
