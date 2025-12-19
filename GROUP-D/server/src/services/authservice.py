from typing import Optional

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from ..models.user import User
from ..schemas.userschema import UserCreate, UserLogin, UserRead
from ..security import hash_password, verify_password, create_access_token


def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user_in: UserCreate) -> UserRead:
    existing = get_user_by_email(db, user_in.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists",
        )

    db_user = User(
        email=user_in.email,
        name=user_in.name,
        hashed_password=hash_password(user_in.password),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return UserRead.model_validate(db_user)


def authenticate_user(db: Session, user_in: UserLogin) -> str:
    user = get_user_by_email(db, user_in.email)
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    # subject is user id as string
    token = create_access_token(str(user.id))
    return token


def get_current_user_from_id(db: Session, user_id: int) -> UserRead:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return UserRead.model_validate(user)
