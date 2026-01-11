import sys
import os
import random

# Ensure the server directory is in python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from src.database.core import SessionLocal
from src.entities.user import User
from src.entities.todo import Shoutout
from src.notifications.service import create_notification
from src.notifications.models import NotificationCreate

def boost_leaderboard():
    db = SessionLocal()
    try:
        sneha = db.query(User).filter(User.name == "Sneha Kulkarni").first()
        pooja = db.query(User).filter(User.name == "Pooja Iyer").first()
        
        if not sneha or not pooja:
            print("Could not find Sneha or Pooja. Run seed_users.py first.")
            return

        all_users = db.query(User).all()
        # Potential senders (exclude sneha and pooja to avoid self-shoutouts or weird loops, basically anyone can send)
        # Actually random anyone is fine, but usually people don't shoutout themselves.
        
        print(f"Boosting Sneha Kulkarni with 25 shoutouts...")
        for i in range(25):
            sender = random.choice([u for u in all_users if u.id != sneha.id])
            shout = Shoutout(
                title=f"Amazing work! #{i+1}",
                message=f"Consistently delivering great results. Thank you Sneha! #{i+1}",
                sender_id=sender.id
            )
            shout.recipients.append(sneha)
            db.add(shout)
            db.commit() # Commit to get ID
            
            # Notification
            create_notification(db, NotificationCreate(
                recipient_id=sneha.id,
                type="shoutout_tag",
                message=f"{sender.name} tagged you in a shoutout",
                link="/dashboard"
            ))

        print(f"Boosting Pooja Iyer with 15 shoutouts...")
        for i in range(15):
            sender = random.choice([u for u in all_users if u.id != pooja.id])
            shout = Shoutout(
                title=f"Kudos! #{i+1}",
                message=f"Great collaboration on the recent project. Thanks Pooja! #{i+1}",
                sender_id=sender.id
            )
            shout.recipients.append(pooja)
            db.add(shout)
            db.commit()
            
            # Notification
            create_notification(db, NotificationCreate(
                recipient_id=pooja.id,
                type="shoutout_tag",
                message=f"{sender.name} tagged you in a shoutout",
                link="/dashboard"
            ))

        print("Leaderboard boosted successfully.")

    except Exception as e:
        print(f"Error boosting leaderboard: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    boost_leaderboard()
