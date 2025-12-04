from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Shoutout
import pandas as pd
from fastapi.responses import FileResponse
from reportlab.pdfgen import canvas

router = APIRouter(prefix="/reports", tags=["Reports"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Export CSV
@router.get("/export/csv")
def export_shoutouts_csv(db: Session = Depends(get_db)):
    shoutouts = db.query(Shoutout).all()

    data = [{
        "Employee Name": s.employee_name,
        "Message": s.message,
        "Date": s.created_date
    } for s in shoutouts]

    df = pd.DataFrame(data)
    file_path = "shoutouts_report.csv"
    df.to_csv(file_path, index=False)

    return FileResponse(file_path, media_type="text/csv", filename=file_path)

# ✅ Export PDF
@router.get("/export/pdf")
def export_shoutouts_pdf(db: Session = Depends(get_db)):
    shoutouts = db.query(Shoutout).all()
    file_path = "shoutouts_report.pdf"

    pdf = canvas.Canvas(file_path)
    y = 800
    pdf.drawString(50, y, "Shoutouts Report")

    for s in shoutouts:
        y -= 20
        pdf.drawString(50, y, f"{s.employee_name}: {s.message}")

    pdf.save()

    return FileResponse(file_path, media_type="application/pdf", filename=file_path)
