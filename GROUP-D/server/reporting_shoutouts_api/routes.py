from fastapi import APIRouter
from .schemas import ShoutoutCreate, ShoutoutResponse

router = APIRouter()

fake_db = []  # Temporary fake database


@router.post("/report-shoutout", response_model=ShoutoutResponse)
def report_shoutout(data: ShoutoutCreate):
    new_id = len(fake_db) + 1
    shoutout = {
        "id": new_id,
        "employee_id": data.employee_id,
        "message": data.message,
        "status": "Pending"
    }
    fake_db.append(shoutout)
    return shoutout


@router.get("/my-reported-shoutouts", response_model=list[ShoutoutResponse])
def get_my_shoutouts(employee_id: int):
    return [s for s in fake_db if s["employee_id"] == employee_id]


@router.put("/resolve-shoutout/{shoutout_id}")
def resolve_shoutout(shoutout_id: int):
    for s in fake_db:
        if s["id"] == shoutout_id:
            s["status"] = "Resolved"
            return {"message": "Shoutout resolved"}
    return {"error": "Shoutout not found"}
