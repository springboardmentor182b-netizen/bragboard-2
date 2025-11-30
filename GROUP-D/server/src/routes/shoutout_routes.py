from fastapi import APIRouter
from src.controllers.shoutout_controller import get_all_shoutouts

router = APIRouter(prefix="/shoutouts")

@router.get("")
async def fetch_all():
    data = await get_all_shoutouts()
    return {"data": data}
