import random

def send_otp(email: str):
    otp = str(random.randint(100000, 999999))
    print(f"Simulated OTP for {email}: {otp}")  # just prints to console
    return otp
