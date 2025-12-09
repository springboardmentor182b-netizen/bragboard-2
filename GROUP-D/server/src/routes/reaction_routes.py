from fastapi import APIRouter, Depends
from src.controllers.reaction_controller import add_reaction, remove_reaction
from src.middleware.auth import verify_token

router = APIRouter(prefix="/reactions")

@router.post("/add")
async def add(data: dict, user=Depends(verify_token)):
    return await add_reaction(data["shoutoutId"], user["id"], data["reactionType"])

@router.delete("/remove")
async def remove(data: dict, user=Depends(verify_token)):
    return await remove_reaction(data["shoutoutId"], user["id"])
