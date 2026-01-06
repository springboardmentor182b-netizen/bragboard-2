from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
import sys

# Add parent directory to path to import modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.database.core import DATABASE_URL
from src.entities.user import User
# Notification must be imported to register the relationship back reference
from src.entities.notification import Notification

def promote_user(email):
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()

    user = db.query(User).filter(User.email == email).first()
    if user:
        user.role = "admin"
        db.commit()
        print(f"User {email} promoted to admin.")
    else:
        print(f"User {email} not found.")

    db.close()

if __name__ == "__main__":
    promote_user("rishabh@gmail.com")
