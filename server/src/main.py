from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.auth.routes import router as auth_router

app = FastAPI()

# Allow frontend dev origin; adjust list as needed
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth")

@app.get("/")
def read_root():
    return {"message": "BragBoard API is running", "docs": "/docs"}

from src.leaderboard.controller import router as leaderboard_router
from src.todos.controller import router as shoutouts_router
from src.shoutout_reports.controller import router as reports_router

app.include_router(leaderboard_router)
app.include_router(shoutouts_router)
app.include_router(reports_router)

#uvicorn src.main:app --reload
