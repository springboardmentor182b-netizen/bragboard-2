from fastapi import Header, HTTPException


def get_current_admin(x_admin: str = Header(None)):
    if x_admin != "true":
        raise HTTPException(status_code=403, detail="Admin access required")
    return True
