from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from io import StringIO, BytesIO
import csv
from reportlab.pdfgen import canvas

from app.core.database import get_database_session
from app.models.user import User
from app.models.shoutout import Shoutout
from src.auth.auth import get_current_user  

router = APIRouter(prefix="/reports", tags=["Reports"])


def ensure_admin(user: User):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Admins only")
    
#  EXPORT CSV

@router.get("/export/csv")
def export_csv(db: Session = Depends(get_database_session), user: User = Depends(get_current_user)):

    ensure_admin(user)

    shoutouts = db.query(Shoutout).all()

    output = StringIO()
    csv_writer = csv.writer(output)

    csv_writer.writerow(["id", "sender_id", "receiver_id", "message", "created_at"])

    for s in shoutouts:
        csv_writer.writerow([s.id, s.sender_id, s.receiver_id, s.message, s.created_at])

    output.seek(0)

    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=shoutouts.csv"}
    )

#  EXPORT PDF

@router.get("/export/pdf")
def export_pdf(db: Session = Depends(get_database_session), user: User = Depends(get_current_user)):

    ensure_admin(user)

    shoutouts = db.query(Shoutout).all()

    buffer = BytesIO()
    pdf = canvas.Canvas(buffer)
    pdf.setFont("Helvetica", 12)

    y = 800
    pdf.drawString(50, y, "Shoutout Report")
    y -= 30

    for s in shoutouts:
        pdf.drawString(50, y, f"Sender ID: {s.sender_id}")
        y -= 15
        pdf.drawString(50, y, f"Receiver ID: {s.receiver_id}")
        y -= 15
        pdf.drawString(50, y, f"Message: {s.message}")
        y -= 15
        pdf.drawString(50, y, f"Date: {s.created_at}")
        y -= 30

        if y < 50:
            pdf.showPage()
            y = 800

    pdf.save()
    buffer.seek(0)

    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=shoutouts.pdf"}
    )
