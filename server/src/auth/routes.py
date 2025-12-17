from fastapi import APIRouter
from src.auth.schemas import UserCreate, UserLogin, ChangePassword
from src.auth.auth import create_access_token, hash_password, verify_password
from src.auth.utils import send_otp

# In-memory stores (replace with real DB in production)
users_db = {
    "admin@example.com": {
        "password": hash_password("AdminPass123!"),
        "full_name": "Admin User",
        "role": "admin",
    },
    "user@example.com": {
        "password": hash_password("UserPass123!"),
        "full_name": "Demo User",
        "role": "user",
    },
}
otp_db = {}

router = APIRouter()

@router.post("/register")
def register(user: UserCreate):
    if user.email in users_db:
        return {"error": "User already exists"}
    hashed = hash_password(user.password)
    users_db[user.email] = {
        "password": hashed,
        "full_name": user.full_name,
        "role": user.role,
    }
    return {"msg": "User registered successfully", "role": user.role}

@router.post("/login")
def login(user: UserLogin):
    db_user = users_db.get(user.email)
    if not db_user or not verify_password(user.password, db_user["password"]):
        return {"error": "Invalid credentials"}
    token = create_access_token({"sub": user.email, "role": db_user["role"]})
    return {"access_token": token, "token_type": "bearer", "role": db_user["role"]}

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


@router.post("/change-password")
def change_password(payload: ChangePassword):
    db_user = users_db.get(payload.email)
    if not db_user or not verify_password(payload.current_password, db_user["password"]):
        return {"error": "Invalid credentials"}
    db_user["password"] = hash_password(payload.new_password)
    return {"msg": "Password changed successfully"}
