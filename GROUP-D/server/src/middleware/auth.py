from fastapi import Header, HTTPException

async def verify_token(Authorization: str = Header(None)):
    if Authorization != "Bearer valid-token":
        raise HTTPException(401, "Invalid token")
    return {"id": "123"}
