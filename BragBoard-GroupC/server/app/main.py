from fastapi import FastAPI
from src.database.core import Base, engine
from src.auth.controller import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(auth_router)

@app.get("/")
def home():
    return {"message": "API Running"}


