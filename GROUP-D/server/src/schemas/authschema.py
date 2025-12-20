from pydantic import BaseModel, EmailStr, constr


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class OTPVerifyRequest(BaseModel):
    email: EmailStr
    otp: constr(min_length=4, max_length=6)


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    otp: constr(min_length=4, max_length=6)
    new_password: constr(min_length=6)
