from fastapi import APIRouter
from .controller import register, login, send_otp, verify_otp, reset_password

router = APIRouter(prefix="/auth")

# Endpoints
@router.post("/register")
def register_endpoint(data: dict):
    return register(data)

@router.post("/login")
def login_endpoint(data: dict):
    return login(data)

@router.post("/send_otp")
def send_otp_endpoint(data: dict):
    return send_otp(data)

@router.post("/verify_otp")
def verify_otp_endpoint(data: dict):
    return verify_otp(data)

@router.post("/reset_password")
def reset_password_endpoint(data: dict):
    return reset_password(data)
