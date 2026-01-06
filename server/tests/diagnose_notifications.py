from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import os
import sys

# Add parent directory to path to import modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.database.core import DATABASE_URL
from src.entities.user import User
from src.entities.notification import Notification

def run_diagnostics():
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()

    print("--- User List ---")
    users = db.query(User).all()
    for u in users:
        print(f"ID: {u.id} | Email: {u.email} | Role: {u.role} | Name: {u.name}")

    print("\n--- Notification List ---")
    notifs = db.query(Notification).all()
    if not notifs:
        print("No notifications found in the database.")
    else:
        for n in notifs:
            recipient = db.query(User).get(n.recipient_id)
            recipient_name = recipient.name if recipient else "Unknown"
            print(f"ID: {n.id} | Recipient: {recipient_name} (ID: {n.recipient_id}) | Type: {n.type} | Read: {n.is_read} | Msg: {n.message}")

    db.close()

if __name__ == "__main__":
    run_diagnostics()
