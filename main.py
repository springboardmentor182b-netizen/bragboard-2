from fastapi import FastAPI
from app.database import Base, engine
from app.routers.comments import router as comments_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(comments_router)
