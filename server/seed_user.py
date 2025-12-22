from sqlalchemy.orm import sessionmaker
from src.database.core import Base, engine
from src.entities.user import User
from src.entities.todo import Shoutout, Comment, Tag
from src.entities.shoutout_report import ShoutoutReport
from src.auth.auth import hash_password

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)

def seed():
    db = SessionLocal()
    try:
        if db.query(User).first():
            print("Users already exist. Skipping seed.")
            return

        user = User(
            email="admin@bragboard.com",
            name="Admin User",
            password_hash=hash_password("password123"),
            role="admin",
            department="HQ"
        )
        db.add(user)
        db.commit()
        print("Seeded admin user: admin@bragboard.com / password123")
    except Exception as e:
        print(f"Error seeding: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed()
