import urllib.request
import urllib.error
import json
import sys
import os

# Add parent directory to path to import modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.auth.auth import create_access_token

def simulate():
    print("--- Simulating Frontend Request ---")
    # Token for User 3 (Rishabh)
    token = create_access_token({"sub": "rishabh@gmail.com", "role": "admin", "user_id": 3})
    
    url = "http://127.0.0.1:8000/notifications"
    req = urllib.request.Request(url)
    req.add_header("Authorization", f"Bearer {token}")

    try:
        with urllib.request.urlopen(req) as response:
            print(f"Response Code: {response.status}")
            data = json.loads(response.read().decode())
            print(f"Notifications: {len(data)}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    simulate()
