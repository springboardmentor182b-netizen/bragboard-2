import sys
from sqlalchemy import inspect, text
from src.database.core import engine, SessionLocal
from src.entities.todo import Shoutout, User
import requests

def check_tables():
    print("Checking database tables...")
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    print(f"Existing tables: {tables}")
    
    required = ['shoutout_claps', 'shoutout_stars']
    missing = [t for t in required if t not in tables]
    
    if missing:
        print(f"CRITICAL: Missing tables: {missing}")
        print("Detailed verification: The server likely needs a full restart (Ctrl+C and restart) to create new tables, as 'reload' might not trigger create_all if the module is already loaded.")
        return False
    else:
        print("SUCCESS: New tables found.")
        return True

def check_api():
    print("\nChecking API endpoints...")
    base_url = "http://127.0.0.1:8000"
    
    # 1. Get a shoutout
    try:
        resp = requests.get(f"{base_url}/shoutouts")
        if resp.status_code != 200:
            print(f"Failed to list shoutouts: {resp.status_code}")
            return
            
        data = resp.json()
        if not data:
            print("No shoutouts to test.")
            return

        s_id = data[0]['id']
        sender_id = data[0]['sender']['id']
        
        print(f"Testing on Shoutout ID: {s_id}")
        
        # 2. Toggle Clap
        print("Calling POST /clap...")
        clap_resp = requests.post(f"{base_url}/shoutouts/{s_id}/clap?user_id={sender_id}")
        if clap_resp.status_code != 200:
            print(f"Clap API failed: {clap_resp.status_code} - {clap_resp.text}")
        else:
            print("Clap API succeeded.")
            print(f"Response: {clap_resp.json()}")

    except Exception as e:
        print(f"API Check failed: {e}")

if __name__ == "__main__":
    if check_tables():
        check_api()
