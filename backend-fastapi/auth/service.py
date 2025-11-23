# auth/service.py

# -----------------------------
# User Registration & Login
# -----------------------------
def register_user(user_data: dict):
    """
    Handles user registration.
    user_data: dict containing user info like email, password, etc.
    """
    # TODO: implement registration logic
    return {"message": "User registered successfully", "user": user_data}

def login_user(email: str, password: str):
    """
    Handles user login.
    """
    # TODO: implement login logic
    return {"message": "User logged in successfully", "email": email}

# -----------------------------
# OTP Management
# -----------------------------
def send_otp_service(email: str):
    """
    Sends OTP to the given email.
    """
    # TODO: implement sending OTP logic
    return {"message": f"OTP sent to {email}"}

def verify_otp_service(email: str, otp: str):
    """
    Verifies OTP for the given email.
    """
    # TODO: implement OTP verification logic
    return {"message": f"OTP verified for {email}"}

# -----------------------------
# Password Reset
# -----------------------------
def reset_password_service(email: str, new_password: str):
    """
    Resets password for the given email.
    """
    # TODO: implement password reset logic
    return {"message": f"Password reset for {email}"}
