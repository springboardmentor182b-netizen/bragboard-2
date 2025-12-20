from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from src.schemas.userschema import UserCreate, UserLogin, UserRead, Token
from src.schemas.authschema import (
    ForgotPasswordRequest,
    OTPVerifyRequest,
    ResetPasswordRequest,
)
from src.services.authservice import (
    create_user,
    authenticate_user,
    get_current_user_from_id,
    start_forgot_password,
    verify_otp,
    reset_password,
)
from src.security import decode_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


async def get_current_user(token: str = Depends(oauth2_scheme)) -> UserRead:
    sub = decode_access_token(token)
    if sub is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )
    return await get_current_user_from_id(sub)


@router.post("/signup", response_model=Token, status_code=status.HTTP_201_CREATED)
async def signup(user_in: UserCreate):
    user = await create_user(user_in)
    token = await authenticate_user(
        UserLogin(email=user.email, password=user_in.password)
    )
    return Token(access_token=token)


@router.post("/login", response_model=Token)
async def login(user_in: UserLogin):
    token = await authenticate_user(user_in)
    return Token(access_token=token)


@router.get("/me", response_model=UserRead)
async def read_current_user(current_user: UserRead = Depends(get_current_user)):
    return current_user


# ---------- Forgot password routes ----------

@router.post("/forgot-password", status_code=status.HTTP_200_OK)
async def forgot_password(data: ForgotPasswordRequest):
    await start_forgot_password(data)
    return {"message": "If the email exists, an OTP has been sent"}


@router.post("/verify-otp", status_code=status.HTTP_200_OK)
async def verify_forgot_otp(data: OTPVerifyRequest):
    await verify_otp(data)
    return {"message": "OTP verified"}


@router.post("/reset-password", status_code=status.HTTP_200_OK)
async def reset_password_route(data: ResetPasswordRequest):
    await reset_password(data)
    return {"message": "Password reset successful"}
