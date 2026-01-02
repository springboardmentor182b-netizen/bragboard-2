#!/usr/bin/env python3
"""
Simple smoke test for local BragBoard API.

Usage:
  pip install requests
  python smoke_test.py

This script will:
- Register a test user (if email already exists, registration will fail but we continue)
- Login to get a token
- Fetch /users and print a summary
"""
import requests

BASE = "http://127.0.0.1:8000"
REGISTER = f"{BASE}/auth/register"
TOKEN = f"{BASE}/auth/token"
USERS = f"{BASE}/users"

TEST_USER = {
    "name": "smoke-tester",
    "email": "smoke+t@test.local",
    "password": "smoketest",
    "role": "EMPLOYEE"
}

def register():
    try:
        r = requests.post(REGISTER, json=TEST_USER, timeout=5)
        if r.status_code == 200 or r.status_code == 201:
            print("Registered test user.")
        else:
            print(f"Register response: {r.status_code} - {r.text}")
    except Exception as e:
        print("Register failed:", e)

def get_token():
    try:
        r = requests.post(TOKEN, data={"username": TEST_USER["email"], "password": TEST_USER["password"]}, timeout=5)
        r.raise_for_status()
        data = r.json()
        return data.get("access_token")
    except Exception as e:
        print("Login failed:", e)
        return None

def fetch_users(token):
    try:
        headers = {"Authorization": f"Bearer {token}"} if token else {}
        r = requests.get(USERS, headers=headers, timeout=5)
        r.raise_for_status()
        users = r.json()
        print(f"Users count: {len(users)}")
        for u in users[:5]:
            print(f"- {u.get('id')} {u.get('name')} ({u.get('email')}) points={u.get('points')}")
    except Exception as e:
        print("Fetch users failed:", e)

if __name__ == "__main__":
    print("Registering test user (if not exists)...")
    register()
    print("Logging in...")
    token = get_token()
    if token:
        print("Token acquired, fetching users...")
        fetch_users(token)
    else:
        print("Could not obtain token. Ensure the server is running on http://127.0.0.1:8000")
