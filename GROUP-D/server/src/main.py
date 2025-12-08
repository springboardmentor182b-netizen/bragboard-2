from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Existing routes
from src.routes.shoutout_routes import router as shoutout_router
from src.routes.reaction_routes import router as reaction_router

# NEW: Report Export Router
from src.routes.report_routes import router as report_router

# NEW: Auth Router (your code)
from src.routes.auth import router as auth_router

app = FastAPI(
    title="Bragboard-2",
    description="Backend API for Bragboard-2",
    version="1.0.0"
)

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Existing routes
app.include_router(shoutout_router, prefix="/api")
app.include_router(reaction_router, prefix="/api")

# New Export Routes
app.include_router(report_router, prefix="/api/reports")

# Add your Auth Router
app.include_router(auth_router, prefix="/api")

@app.get("/")
def home():
    return {"message": "Backend OK"}
