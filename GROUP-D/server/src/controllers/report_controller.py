from src.database.mongodb import db

async def create_report(userId, title, description):
    report = {
        "userId": userId,
        "title": title,
        "description": description
    }

    await db.reports.insert_one(report)

    return {"message": "Report created"}

async def get_reports():
    reports = await db.reports.find().to_list(1000)
    return {"reports": reports}

async def delete_report(reportId):
    await db.reports.delete_one({"_id": reportId})
    return {"message": "Report deleted"}
