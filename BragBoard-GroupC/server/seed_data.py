# server/seed_data.py - UPDATED
from src.database.core import SessionLocal, engine, Base
from src.entities.user import User
from src.entities.shoutout import Shoutout
from src.entities.shoutout_report import ShoutoutReport
from datetime import datetime, timedelta
import random

def seed_database():
    db = SessionLocal()
    
    try:
        print(" Seeding database...")
        
        # Create all tables first (in case they don't exist)
        Base.metadata.create_all(bind=engine)
        
        # Clear existing data (in correct order due to foreign keys)
        db.query(ShoutoutReport).delete()
        db.query(Shoutout).delete()
        db.query(User).delete()
        db.commit()
        
        # Create users
        users = []
        departments = ["Engineering", "Marketing", "Sales", "HR", "Finance"]
        names = ["Alice Johnson", "Bob Smith", "Charlie Brown", "Diana Prince", "Eve Davis"]
        
        for i in range(1, 6):
            user = User(
                name=names[i-1],
                email=f"user{i}@company.com",
                password=f"password{i}",
                department=random.choice(departments),
                role="admin" if i == 1 else "employee"
            )
            users.append(user)
        
        db.add_all(users)
        db.commit()
        print(f" Created {len(users)} users")
        
        # Create shoutouts
        shoutouts = []
        messages = [
            "Great work on the project!",
            "Thanks for helping me out!",
            "Amazing presentation skills!",
            "Excellent teamwork!",
            "Outstanding problem-solving!"
        ]
        
        for i in range(1, 11):
            shoutout = Shoutout(
                sender_id=random.randint(1, 5),
                message=random.choice(messages),
                created_at=datetime.utcnow() - timedelta(days=random.randint(0, 30))
            )
            shoutouts.append(shoutout)
        
        db.add_all(shoutouts)
        db.commit()
        print(f"Created {len(shoutouts)} shoutouts")
        
        # Create reports
        reports = []
        reasons = [
            "Inappropriate content",
            "Spam",
            "Harassment",
            "False information",
            "Offensive language"
        ]
        
        for i in range(1, 6):
            report = ShoutoutReport(
                shoutout_id=random.randint(1, 10),
                reporter_id=random.randint(2, 5),  # Don't use admin as reporter
                reason=random.choice(reasons),
                description=f"Detailed description of issue {i}",
                status=random.choice(["pending", "resolved", "dismissed"])
            )
            
            if report.status in ["resolved", "dismissed"]:
                report.resolved_by = 1  # Admin
                report.resolution_notes = f"Resolved by admin"
                report.resolved_at = datetime.utcnow() - timedelta(days=random.randint(1, 10))
            
            reports.append(report)
        
        db.add_all(reports)
        db.commit()
        print(f" Created {len(reports)} reports")
        
        print("Database seeding completed successfully!")
        
    except Exception as e:
        print(f" Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()