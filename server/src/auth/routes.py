from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from src.auth.schemas import UserCreate, UserLogin, ChangePassword
from src.auth.auth import create_access_token, verify_password, hash_password
from src.auth.utils import send_otp
from src.database.core import get_db
from src.users import service as user_service

router = APIRouter()

# In-memory OTP store (still okay for simple demo, but could be DB)
otp_db = {}

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = user_service.get_user_by_email(db, user.email)
    if db_user:
        return {"error": "User already exists"}
    
    new_user = user_service.create_user(db, user)
    return {"msg": "User registered successfully", "role": new_user.role}

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = user_service.get_user_by_email(db, user.email)
    if not db_user or not verify_password(user.password, db_user.password_hash):
        return {"error": "Invalid credentials"}
    
    token = create_access_token({"sub": db_user.email, "role": db_user.role, "user_id": db_user.id})
    return {"access_token": token, "token_type": "bearer", "role": db_user.role}

@router.post("/forgot-password")
def forgot_password(email: str, db: Session = Depends(get_db)):
    db_user = user_service.get_user_by_email(db, email)
    if not db_user:
        return {"error": "User not found"}
    otp = send_otp(email)
    otp_db[email] = otp
    return {"msg": "OTP sent to email"}

@router.post("/verify-otp")
def verify_otp_endpoint(email: str, otp: str):
    real_otp = otp_db.get(email)
    if not real_otp or otp != real_otp:
        return {"error": "Invalid OTP"}
    otp_db.pop(email)
    return {"msg": "OTP verified"}

@router.post("/change-password")
def change_password(payload: ChangePassword, db: Session = Depends(get_db)):
    db_user = user_service.get_user_by_email(db, payload.email)
    if not db_user or not verify_password(payload.current_password, db_user.password_hash):
        return {"error": "Invalid credentials"}
    
    db_user.password_hash = hash_password(payload.new_password)
    db.commit()
    return {"msg": "Password changed successfully"}
