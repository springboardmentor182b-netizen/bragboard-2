import sys
import os

# Add the project root to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.core.database import SessionLocal, engine, Base
from app.models.user import User

# Create all tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Check if users already exist
existing_users = db.query(User).count()

if existing_users == 0:
    # Create test users
    users = [
        User(name="John Doe", email="john@example.com", role="employee"),
        User(name="Jane Smith", email="jane@example.com", role="employee"),
        User(name="Bob Wilson", email="bob@example.com", role="employee"),
        User(name="Alice Brown", email="alice@example.com", role="admin"),
    ]
    
    db.add_all(users)
    db.commit()
    
    print("✅ Test users created successfully!")
    for user in users:
        db.refresh(user)
        print(f"  - ID: {user.id}, Name: {user.name}, Email: {user.email}")
else:
    print(f"ℹ️  Database already has {existing_users} user(s)")

db.close()