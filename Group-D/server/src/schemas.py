from pydantic import BaseModel, EmailStr

# ---------- LOGIN ----------

class Login(BaseModel):
    email: EmailStr
    password: str


# ---------- USER CREATE (USED BY ADMIN & SUPERADMIN) ----------

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    secret_key: str 


# ---------- USER RESPONSE ----------

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str
    status: str

    class Config:
        from_attributes = True


# ---------- TOKEN RESPONSE ----------

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserOut
