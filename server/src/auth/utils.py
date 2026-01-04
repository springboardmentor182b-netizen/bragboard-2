import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.message import EmailMessage

import os

SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASS = os.getenv("SMTP_PASS")

def send_otp(email: str):
    otp = str(random.randint(100000, 999999))
    print(f"Simulated OTP for {email}: {otp}")  # just prints to console
    return otp

def send_welcome_email(to_email: str):
    if not SMTP_USER or not SMTP_PASS:
        print("SMTP env vars not set, skipping email")
        return

    msg = EmailMessage()
    msg["Subject"] = "Welcome to Bragboard.🎉"
    msg["From"] = SMTP_USER
    msg["To"] = to_email
    msg.set_content(
        "Your account has been created successfully.\n\n"
        "You can now log in and start using the app.\n\n"
        "Please ask for the password from the Administrator."
    )

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.send_message(msg)
    except Exception as e:
        # Do NOT break registration if email fails
        print("Email send failed:", e)
