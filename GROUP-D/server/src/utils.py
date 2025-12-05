# server/src/utils.py
import bcrypt
import hashlib
from jose import jwt
from datetime import datetime, timedelta
import random
from .config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

# Pre-hash the password with SHA256 before applying bcrypt
def _prehash(password: str) -> bytes:
    """Convert the password to a SHA256 digest (32 bytes)."""
    if isinstance(password, str):
        password = password.encode("utf-8")
    return hashlib.sha256(password).digest()

def hash_password(password: str) -> str:
    """Hash the password using SHA256 + bcrypt."""
    ph = _prehash(password)
    hashed = bcrypt.hashpw(ph, bcrypt.gensalt())
    return hashed.decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Check a plain password against a stored bcrypt hash."""
    if isinstance(hashed_password, str):
        # hashed is bytes, decode to str for DB storage
        hashed_password = hashed_password.encode("utf-8")
    ph = _prehash(plain_password)
    return bcrypt.checkpw(ph, hashed_password)

# OTP and JWT utilities
def generate_otp() -> str:
    return str(random.randint(100000, 999999))

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
