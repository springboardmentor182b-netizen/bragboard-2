from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.entities.shoutout_report import ShoutoutReport
from src.entities.todo import Shoutout
from src.entities.user import User

DATABASE_URL = "sqlite:///data/app.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def check_reports():
    db = SessionLocal()
    try:
        reports = db.query(ShoutoutReport).all()
        print(f"Total reports: {len(reports)}")
        for r in reports:
            print(f"Report ID: {r.id}, Shoutout ID: {r.shoutout_id}, Status: {r.status.value}, Reason: {r.reason}")
            shoutout = db.get(Shoutout, r.shoutout_id)
            if shoutout:
                print(f"  Shoutout Message: {shoutout.message}")
            else:
                print(f"  Shoutout NOT FOUND")
    finally:
        db.close()

if __name__ == "__main__":
    check_reports()
