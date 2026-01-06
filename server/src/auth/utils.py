import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.message import EmailMessage

import os

SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587

def send_otp(email: str):
    otp = str(random.randint(100000, 999999))
    print(f"Simulated OTP for {email}: {otp}")  # just prints to console
    return otp

def send_welcome_email(to_email: str):
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    
    print(f"Attempting to send email to {to_email}")
    print(f"SMTP Config Found: User={bool(smtp_user)}, Pass={bool(smtp_pass)}")
    
    if smtp_pass:
        print(f"Password Length: {len(smtp_pass)}")
        print(f"First/Last chars: {smtp_pass[0]}...{smtp_pass[-1]}")
        if smtp_pass.strip() != smtp_pass:
            print("WARNING: Password has leading/trailing whitespace!")
    
    if not smtp_user or not smtp_pass:
        print("SMTP env vars (SMTP_USER/SMTP_PASS) not set, skipping email")
        return

    msg = EmailMessage()
    msg["Subject"] = "Welcome to Bragboard.🎉"
    msg["From"] = smtp_user
    msg["To"] = to_email
    msg.set_content(
        "Your account has been created successfully.\n\n"
        "You can now log in and start using the app.\n\n"
        "your password is 123456.\n\n"
        "Please change your password after first login."
    )

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)
        print("Email sent successfully!")
    except Exception as e:
        # Do NOT break registration if email fails
        print(f"Email send failed with error: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
