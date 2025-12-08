from fastapi import APIRouter
from src.controllers.report_controller import (
    create_report,
    get_reports,
    delete_report
)

router = APIRouter(prefix="/reports")

@router.post("/")
async def api_create_report(userId: str, title: str, description: str):
    return await create_report(userId, title, description)

@router.get("/")
async def api_get_reports():
    return await get_reports()

@router.delete("/{reportId}")
async def api_delete_report(reportId: str):
    return await delete_report(reportId)
