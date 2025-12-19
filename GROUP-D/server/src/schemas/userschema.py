from pydantic import BaseModel, EmailStr, constr


class UserBase(BaseModel):
    email: EmailStr
    name: constr(min_length=2, max_length=255)


class UserCreate(UserBase):
    password: constr(min_length=6)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserRead(UserBase):
    id: int

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenPayload(BaseModel):
    sub: str | None = None
