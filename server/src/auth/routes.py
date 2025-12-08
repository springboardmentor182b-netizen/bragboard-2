from fastapi import APIRouter
from auth.schemas import UserCreate, UserLogin
from auth.auth import create_access_token, hash_password, verify_password
from auth.utils import send_otp

users_db = {}
otp_db = {}

router = APIRouter()

@router.post("/register")
def register(user: UserCreate):
    if user.email in users_db:
        return {"error": "User already exists"}
    hashed = hash_password(user.password)
    users_db[user.email] = {"password": hashed, "full_name": user.full_name}
    return {"msg": "User registered successfully"}

@router.post("/login")
def login(user: UserLogin):
    db_user = users_db.get(user.email)
    if not db_user or not verify_password(user.password, db_user["password"]):
        return {"error": "Invalid credentials"}
    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/forgot-password")
def forgot_password(email: str):
    if email not in users_db:
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
