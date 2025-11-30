from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes.shoutout_routes import router as shoutout_router
from src.routes.reaction_routes import router as reaction_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(shoutout_router, prefix="/api")
app.include_router(reaction_router, prefix="/api")

@app.get("/")
def home():
    return {"message": "Backend OK"}
