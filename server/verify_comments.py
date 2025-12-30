import requests
import sys

BASE_URL = "http://127.0.0.1:8000"

def verify_comments():
    print("Verifying nested comments...")
    
    # 1. Get a shoutout and user
    resp = requests.get(f"{BASE_URL}/shoutouts")
    data = resp.json()
    if not data:
        print("No shoutouts found.")
        return
        
    shoutout = data[0]
    s_id = shoutout['id']
    sender_id = shoutout['sender']['id']
    print(f"Using Shoutout ID: {s_id}, User ID: {sender_id}")
    
    # 2. Add Root Comment
    print("Adding root comment...")
    root_payload = {"content": "This is a root comment"}
    try:
        # Note: In my fix I used a generalized endpoint or query params, let's verify controller.
        # My controller Update: @router.post("/{shoutout_id}/comments", ...)
        # It takes query param user_id
        res1 = requests.post(f"{BASE_URL}/shoutouts/{s_id}/comments?user_id={sender_id}", json=root_payload)
        res1.raise_for_status()
        root_comment = res1.json()
        print(f"Root Comment Created: ID={root_comment['id']}")
    except Exception as e:
        print(f"Failed to create root comment: {e}")
        return

    # 3. Add Reply
    print("Adding reply...")
    reply_payload = {
        "content": "This is a reply", 
        "parent_id": root_comment['id']
    }
    try:
        res2 = requests.post(f"{BASE_URL}/shoutouts/{s_id}/comments?user_id={sender_id}", json=reply_payload)
        res2.raise_for_status()
        reply_comment = res2.json()
        print(f"Reply Created: ID={reply_comment['id']}, ParentID={reply_comment.get('parent_id')}")
        
        if reply_comment.get('parent_id') == root_comment['id']:
            print("SUCCESS: Reply is correctly linked to parent.")
        else:
            print(f"FAILURE: Parent ID mismatch. Expected {root_comment['id']}, got {reply_comment.get('parent_id')}")
            
    except Exception as e:
        print(f"Failed to create reply: {e}")
        
if __name__ == "__main__":
    verify_comments()
