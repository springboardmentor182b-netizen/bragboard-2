import bcrypt
import jwt
import os
from dotenv import load_dotenv

load_dotenv()
SECRET_KEY = os.getenv("JWT_SECRET", "secret")

def hash_password(password: str) -> str:
    pw = password.encode("utf-8")[:72]
    hashed = bcrypt.hashpw(pw, bcrypt.gensalt())
    return hashed.decode()

def verify_password(password: str, hashed: str) -> bool:
    pw = password.encode("utf-8")[:72]
    return bcrypt.checkpw(pw, hashed.encode())

def create_jwt(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm="HS256")

import random

def generate_otp(length: int = 6) -> str:
    """Generate a numeric OTP of given length"""
    return ''.join([str(random.randint(0, 9)) for _ in range(length)])
