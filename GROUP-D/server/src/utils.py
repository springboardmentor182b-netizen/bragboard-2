# server/src/utils.py
import bcrypt
import hashlib
from jose import jwt
from datetime import datetime, timedelta
import random
from .config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

# --- helpers: SHA256 pre-hash, then bcrypt ---
def _prehash(password: str) -> bytes:
    """
    Return SHA256 digest of password as bytes.
    This guarantees a fixed-length input (32 bytes) for bcrypt and avoids
    the 72-byte limitation completely.
    """
    if isinstance(password, str):
        password = password.encode("utf-8")
    return hashlib.sha256(password).digest()

def hash_password(password: str) -> str:
    """
    Hash password: sha256(password) -> bcrypt.
    Returns the bcrypt hash as utf-8 string (so it can be stored in DB).
    """
    ph = _prehash(password)
    hashed = bcrypt.hashpw(ph, bcrypt.gensalt())
    # hashed is bytes, decode to str for DB storage
    return hashed.decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify: prehash plain_password and check against stored bcrypt hash.
    hashed_password: string from DB (utf-8). bcrypt.checkpw expects bytes.
    """
    if isinstance(hashed_password, str):
        hashed_password = hashed_password.encode("utf-8")
    ph = _prehash(plain_password)
    return bcrypt.checkpw(ph, hashed_password)

# --- OTP + JWT helpers (unchanged) ---
def generate_otp() -> str:
    return str(random.randint(100000, 999999))

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
