from fastapi import FastAPI
from app.api.shoutouts import router as shoutout_router

app = FastAPI()

# include shoutout APIs
app.include_router(shoutout_router)
