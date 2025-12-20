from typing import Optional
from datetime import datetime, timedelta

from fastapi import HTTPException, status
from bson import ObjectId

from src.database.mongodb import db
from src.schemas.userschema import UserCreate, UserLogin, UserRead
from src.schemas.authschema import (
    ForgotPasswordRequest,
    OTPVerifyRequest,
    ResetPasswordRequest,
)
from src.security import (
    hash_password,
    verify_password,
    create_access_token,
    generate_otp,
)


def _user_doc_to_read(user_doc) -> UserRead:
    return UserRead(
        id=str(user_doc["_id"]),
        email=user_doc["email"],
        name=user_doc.get("name", ""),
        is_active=user_doc.get("is_active", True),
        role=user_doc.get("role", "EMPLOYEE"),
    )


async def get_user_by_email(email: str) -> Optional[UserRead]:
    user_doc = await db["users"].find_one({"email": email})
    if not user_doc:
        return None
    return _user_doc_to_read(user_doc)


async def create_user(user_in: UserCreate) -> UserRead:
    existing = await db["users"].find_one({"email": user_in.email})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists",
        )

    user_doc = {
        "email": user_in.email,
        "name": user_in.name,
        "hashed_password": hash_password(user_in.password),
        "role": user_in.role,
        "is_active": True,
        "otp": None,
        "otp_expires_at": None,
    }

    result = await db["users"].insert_one(user_doc)
    user_doc["_id"] = result.inserted_id
    return _user_doc_to_read(user_doc)


async def authenticate_user(user_in: UserLogin) -> str:
    user_doc = await db["users"].find_one({"email": user_in.email})
    if not user_doc or not verify_password(
        user_in.password, user_doc["hashed_password"]
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    subject = str(user_doc["_id"])
    token = create_access_token(subject)
    return token


async def get_current_user_from_id(user_id: str) -> UserRead:
    try:
        oid = ObjectId(user_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user id",
        )

    user_doc = await db["users"].find_one({"_id": oid})
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return _user_doc_to_read(user_doc)


# ---------- Forgot password flow ----------

OTP_EXPIRY_MINUTES = 10


async def start_forgot_password(data: ForgotPasswordRequest) -> None:
    user_doc = await db["users"].find_one({"email": data.email})
    if not user_doc:
        # For security, do not reveal whether email exists
        return

    otp = generate_otp()
    expires_at = datetime.utcnow() + timedelta(minutes=OTP_EXPIRY_MINUTES)

    await db["users"].update_one(
        {"_id": user_doc["_id"]},
        {"$set": {"otp": otp, "otp_expires_at": expires_at}},
    )

    # TODO: send OTP via email/SMS in real system
    print("DEBUG OTP for", data.email, "->", otp)


async def verify_otp(data: OTPVerifyRequest) -> None:
    user_doc = await db["users"].find_one({"email": data.email})
    if not user_doc or not user_doc.get("otp"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OTP",
        )

    if user_doc["otp"] != data.otp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OTP",
        )

    expires_at = user_doc.get("otp_expires_at")
    if expires_at and datetime.utcnow() > expires_at:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OTP expired",
        )


async def reset_password(data: ResetPasswordRequest) -> None:
    user_doc = await db["users"].find_one({"email": data.email})
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email not found",
        )

    # Reuse verification logic
    await verify_otp(
        OTPVerifyRequest(email=data.email, otp=data.otp)
    )

    new_hashed = hash_password(data.new_password)

    await db["users"].update_one(
        {"_id": user_doc["_id"]},
        {
            "$set": {
                "hashed_password": new_hashed,
                "otp": None,
                "otp_expires_at": None,
            }
        },
    )
