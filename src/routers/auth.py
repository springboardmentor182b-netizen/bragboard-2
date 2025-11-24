from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..schemas.auth import Register, Login, OTPVerify, ResetPassword
from ..models.user import User
from ..utils import hash_password, verify_password, generate_otp, create_access_token
from ..database import get_db

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register_user(data: Register, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = User(
        name=data.name,
        email=data.email,
        password=hash_password(data.password)
    )
    db.add(new_user)
    db.commit()
    return {"message": "User registered successfully"}

@router.post("/login")
def login_user(data: Login, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"email": user.email})
    return {"message":"User login successfully","access_token": token, "token_type": "bearer"}

@router.post("/forgot-password")
def forgot_password(email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Email not found")

    otp = generate_otp()
    user.otp = otp
    db.commit()
    print("OTP:", otp)
    return {"message": "OTP sent"}

@router.post("/verify-otp")
def verify_otp(data: OTPVerify, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or user.otp != data.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    return {"message": "OTP Verified"}

@router.post("/reset-password")
def reset_password(data: ResetPassword, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Email not found")

    user.password = hash_password(data.new_password)
    user.otp = None
    db.commit()
    return {"message": "Password reset successful"}
