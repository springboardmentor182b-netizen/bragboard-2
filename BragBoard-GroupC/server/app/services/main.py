from fastapi import FastAPI
from app.core.database import Base, engine
from app.api.shoutout import router as shoutout_router

# Import models to ensure they're registered
from app.models import User, Shoutout, ShoutoutRecipient

app = FastAPI(title="BragBoard API", version="1.0.0")

# Create tables in database
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(shoutout_router, prefix="/shoutouts", tags=["Shoutouts"])

@app.get("/")
def root():
    return {"message": "BragBoard API is running!", "version": "1.0.0"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}