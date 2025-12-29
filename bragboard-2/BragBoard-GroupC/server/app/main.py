from fastapi import FastAPI, Depends, status
from sqlalchemy.orm import Session
from app.models import user
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import engine, SessionLocal, Base

import src.auth.auth as auth
from app.api.shoutout import router as shoutout_router
from app.api.shoutoutreaction_API import router as reaction_router
from app.api.exportreports import router as reports_router
from app.api.leaderboard import router as leaderboard_router
from src.reports.reporting_controller import router as reporting_router

app = FastAPI()

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(shoutout_router, prefix="/shoutouts", tags=["Shoutouts"])
app.include_router(reaction_router)
app.include_router(reports_router)
app.include_router(leaderboard_router)
app.include_router(reporting_router)

@app.get("/", status_code=status.HTTP_200_OK)
async def home():
    return {"message": "API Running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/me", status_code=200)
async def get_me(user: dict = Depends(auth.get_current_user)):
    return {"User": user}
