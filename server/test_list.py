import requests
import sys

BASE_URL = "http://127.0.0.1:8000"

def test_list_persistence():
    # 1. Get first shoutout
    resp = requests.get(f"{BASE_URL}/shoutouts")
    data = resp.json()
    if not data:
        print("No shoutouts.")
        return
    
    s = data[0]
    s_id = s['id']
    sender_id = s['sender']['id']
    initial_claps = len(s.get('claps', []))
    print(f"ID: {s_id}, Initial Claps (List): {initial_claps}")
    
    # 2. Toggle Clap
    print("Toggling clap...")
    requests.post(f"{BASE_URL}/shoutouts/{s_id}/clap?user_id={sender_id}")
    
    # 3. Get List AGAIN
    resp2 = requests.get(f"{BASE_URL}/shoutouts")
    data2 = resp2.json()
    
    # Find the same shoutout
    s2 = next(item for item in data2 if item['id'] == s_id)
    new_claps = len(s2.get('claps', []))
    print(f"ID: {s_id}, New Claps (List): {new_claps}")
    
    if new_claps == initial_claps:
        print("FAILURE: List endpoint did not show updated clap count!")
    else:
        print("SUCCESS: List endpoint reflected change.")

if __name__ == "__main__":
    test_list_persistence()
