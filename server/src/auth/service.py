from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

def get_current_user_id(token: str = Depends(oauth2_scheme)) -> int:
    user_id = 1 # Replace with actual decoded ID
    return user_id

