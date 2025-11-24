from fastapi import FastAPI
from .database import Base, engine
from .routers.auth import router as auth_router

app = FastAPI(
    title="Bandboard2-D",
    description="Authentication System for Bandboard2-D",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)

@app.get("/")
def home():
    return {"message": "Auth API Running Successfully"}
