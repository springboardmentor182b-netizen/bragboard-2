from fastapi import HTTPException

# Temporary in-memory storage for demo purposes
users_db = {}
otp_db = {}

def register_user(data: dict):
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password required")

    if email in users_db:
        raise HTTPException(status_code=400, detail="User already exists")

    users_db[email] = {"password": password}
    return {"message": "User registered successfully"}

def login_user(email: str, password: str):
    user = users_db.get(email)
    if not user or user["password"] != password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"message": "Login successful"}

def send_otp_service(email: str):
    if email not in users_db:
        raise HTTPException(status_code=404, detail="User not found")

    otp = "123456"  # dummy OTP
    otp_db[email] = otp
    return {"message": "OTP sent", "otp": otp}

def verify_otp_service(email: str, otp: str):
    real_otp = otp_db.get(email)
    if not real_otp or real_otp != otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")
    return {"message": "OTP verified"}

def reset_password_service(email: str, new_password: str):
    if email not in users_db:
        raise HTTPException(status_code=404, detail="User not found")

    users_db[email]["password"] = new_password
    return {"message": "Password reset successfully"}
