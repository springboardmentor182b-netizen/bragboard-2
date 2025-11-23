# auth/controller.py
from fastapi import HTTPException
from .service import register_user, login_user, send_otp_service, verify_otp_service, reset_password_service

# Controller functions
def register(data: dict):
    return register_user(data)

def login(data: dict):
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password required")
    return login_user(email=email, password=password)

def send_otp(data: dict):
    email = data.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email required")
    return send_otp_service(email)

def verify_otp(data: dict):
    email = data.get("email")
    otp = data.get("otp")
    if not email or not otp:
        raise HTTPException(status_code=400, detail="Email and OTP required")
    return verify_otp_service(email, otp)

def reset_password(data: dict):
    email = data.get("email")
    new_password = data.get("new_password")
    if not email or not new_password:
        raise HTTPException(status_code=400, detail="Email and new password required")
    return reset_password_service(email, new_password)
