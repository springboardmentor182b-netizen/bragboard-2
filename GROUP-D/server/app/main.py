from fastapi import FastAPI

from app.core.database import Base, engine
from app.api.shoutout import router as shoutout_router

# Import to register models
from app.models.user import User
from app.models.shoutout import Shoutout
from app.models.shoutout_recipient import ShoutoutRecipient
from app.routers.shoutout_report_router import router as report_router
from app.routers.shoutout_report_router import router as report_router

app = FastAPI(title="BragBoard API", version="1.0.0")

# Create all tables
Base.metadata.create_all(bind=engine)

# Include Routes
app.include_router(shoutout_router, prefix="/shoutouts", tags=["Shoutouts"])
app.include_router(report_router)

@app.get("/")
def root():
    return {"message": "BragBoard API is running", "version": "1.0.0"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

