from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..schemas.auth import Register, Login, OTPVerify, ResetPassword
from ..models.user import User
from ..utils import hash_password, verify_password, generate_otp, create_access_token
from ..database import get_db
from ..config import ADMIN_SECRET_KEY, ADMIN_EMAIL, ADMIN_PASSWORD

router = APIRouter(prefix="/auth", tags=["Auth"])


# REGISTER (Only employees register)

@router.post("/register")
def register_user(data: Register, db: Session = Depends(get_db)):

    # Validate admin secret key for allowing registration
    if data.admin_key != ADMIN_SECRET_KEY:
        raise HTTPException(status_code=403, detail="Invalid admin key")

    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        name=data.name,
        email=data.email,
        password=hash_password(data.password)
    )
    db.add(user)
    db.commit()
    return {"message": "Registered successfully"}


# LOGIN (Handles both admin & employee login)

@router.post("/login")
def login_user(data: Login, db: Session = Depends(get_db)):

    # 1️ ADMIN LOGIN CHECK
    if data.login_type == "admin":

        # Compare with predefined admin credentials
        if data.email == ADMIN_EMAIL and data.password == ADMIN_PASSWORD:

            token = create_access_token({"email": data.email, "admin": True})

            return {
                "message": "Admin login successful",
                "admin": True,
                "access_token": token
            }
        else:
            raise HTTPException(status_code=401, detail="Invalid admin credentials")

    # 2️ EMPLOYEE LOGIN (existing DB logic)
    user = db.query(User).filter(User.email == data.email).first()

    if not user or not verify_password(data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"email": user.email, "admin": False})

    return {
        "message": "Login successful",
        "admin": False,
        "access_token": token
    }


# FORGOT PASSWORD

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



# OTP VERIFY

@router.post("/verify-otp")
def verify_otp(data: OTPVerify, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == data.email).first()
    if not user or user.otp != data.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    return {"message": "OTP Verified"}

# RESET PASSWORD

@router.post("/reset-password")
def reset_password(data: ResetPassword, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Email not found")

    user.password = hash_password(data.new_password)
    user.otp = None
    db.commit()

    return {"message": "Password reset successful"}
