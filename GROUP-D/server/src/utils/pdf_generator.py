from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from io import BytesIO


def generate_pdf(text_lines: list, title: str = "Report"):
    """
    Generate a simple PDF file.

    Args:
        text_lines (list): list of strings to print in pdf
        title (str): header/title

    Returns:
        bytes: PDF file bytes
    """

    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=A4)

    width, height = A4

    y = height - 50  # starting position

    pdf.setTitle(title)
    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(50, y, title)

    y -= 40
    pdf.setFont("Helvetica", 12)

    for line in text_lines:
        pdf.drawString(50, y, line)
        y -= 20
        if y <= 50:
            pdf.showPage()
            y = height - 50

    pdf.save()
    pdf_data = buffer.getvalue()
    buffer.close()

    return pdf_data
