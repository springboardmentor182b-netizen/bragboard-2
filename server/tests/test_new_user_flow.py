import urllib.request
import urllib.error
import json
import sys
import os
import random
import string

def test_new_user():
    print("--- Testing New User Flow ---")
    
    # 1. Random User Details
    suffix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))
    email = f"testUser_{suffix}@example.com"
    password = "password123"
    payload = {
        "email": email,
        "password": password,
        "full_name": f"Test User {suffix}",
        "department": "Engineering"
    }
    
    # 2. Register
    print(f"Registering {email}...")
    reg_req = urllib.request.Request(
        "http://127.0.0.1:8000/auth/register",
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    try:
        with urllib.request.urlopen(reg_req) as resp:
            print(f"Registration Status: {resp.status}")
            print(resp.read().decode())
    except urllib.error.HTTPError as e:
        print(f"Registration Failed: {e.code} - {e.reason}")
        print(e.read().decode())
        return

    # 3. Login
    print("Logging in...")
    login_payload = {"email": email, "password": password}
    login_req = urllib.request.Request(
        "http://127.0.0.1:8000/auth/login",
        data=json.dumps(login_payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    
    token = None
    try:
        with urllib.request.urlopen(login_req) as resp:
            data = json.loads(resp.read().decode())
            token = data.get("access_token")
            print("Login Successful. Token obtained.")
    except urllib.error.HTTPError as e:
        print(f"Login Failed: {e.code}")
        print(e.read().decode())
        return

    # 4. Fetch Notifications
    print("Fetching Notifications...")
    notif_req = urllib.request.Request("http://127.0.0.1:8000/notifications")
    notif_req.add_header("Authorization", f"Bearer {token}")
    
    try:
        with urllib.request.urlopen(notif_req) as resp:
            data = json.loads(resp.read().decode())
            print(f"Notifications Found: {len(data)}")
            for n in data:
                print(f" - {n['type']}: {n['message']}")
    except urllib.error.HTTPError as e:
        print(f"Fetch Failed: {e.code}")
        print(e.read().decode())

if __name__ == "__main__":
    test_new_user()
