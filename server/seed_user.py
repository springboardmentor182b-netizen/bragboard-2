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

        # Admin User
        admin = User(
            email="admin@bragboard.com",
            name="Admin User",
            password_hash=hash_password("password123"),
            role="admin",
            department="HQ"
        )
        db.add(admin)

        # XYZ User
        xyz_user = User(
            email="xyz@gmail.com",
            name="xyz user",
            password_hash=hash_password("xyz1234"),
            role="employee",
            department="Engineering"
        )
        db.add(xyz_user)

        # Rishabh Sinha (as seen in screenshot)
        rishabh = User(
            email="rishabh@gmail.com",
            name="Rishabh Sinha",
            password_hash=hash_password("pass123"),
            role="employee",
            department="Product"
        )
        db.add(rishabh)

        db.commit()
        print("Seeded users successfully.")
    except Exception as e:
        print(f"Error seeding: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed()
