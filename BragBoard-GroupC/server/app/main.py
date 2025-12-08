from pathlib import Path
from dotenv import load_dotenv
load_dotenv()

BASE_DIR = Path(__file__).resolve().parent

DOTENV_PATH = BASE_DIR.parent / '.env'

load_dotenv(DOTENV_PATH)

from fastapi import FastAPI, HTTPException, Depends, status
from app.models import User as models
from src.database.core import engine, SessionLocal, Base
from typing import Annotated
from sqlalchemy.orm import Session
import src.auth.auth as auth
from src.auth.auth import get_current_user
from app.api.shoutout import router as shoutout_router
from app.models import User, Shoutout, ShoutoutRecipient
from fastapi.middleware.cors import CORSMiddleware
from app.api.shoutoutreaction_API import router as reaction_router
from app.api.exportreports import router as reports_router


app = FastAPI()
app.include_router(auth.router)
app.include_router(reaction_router)
app.include_router(reports_router)

models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", status_code=status.HTTP_200_OK)
async def home():
    return {"message": "API Running"}
  
@app.get("/health")
def health_check():
    return {"status": "healthy"}
  
app.include_router(shoutout_router, prefix="/shoutouts", tags=["Shoutouts"])

@app.get("/me", status_code=200)
async def get_me(user: dict = Depends(auth.get_current_user)):
    return {"User": user}