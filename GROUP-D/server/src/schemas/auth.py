from pydantic import BaseModel, EmailStr

class Register(BaseModel):
    name: str
    email: EmailStr
    password: str
    admin_key: str   # registration protection key

class Login(BaseModel):
    email: EmailStr
    password: str
    login_type: str   # "admin" or "employee"

class OTPVerify(BaseModel):
    email: EmailStr
    otp: str

class ResetPassword(BaseModel):
    email: EmailStr
    new_password: str
