from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import random
from .config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

# FIX: use bcrypt_sha256 instead of bcrypt (no 72-byte limit)
pwd_context = CryptContext(
    schemes=["bcrypt_sha256"],
    deprecated="auto"
)

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def generate_otp():
    return str(random.randint(100000, 999999))

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
