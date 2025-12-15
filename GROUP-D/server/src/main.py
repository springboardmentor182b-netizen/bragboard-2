from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# -------------------------
# Database
# -------------------------
from src.database.connection import Base, engine

# -------------------------
# Existing routes
# -------------------------
from src.routes.shoutout_routes import router as shoutout_router
from src.routes.reaction_routes import router as reaction_router
from src.routes.report_routes import router as report_router
from src.routes.comment import router as comment_router
from src.routers.auth import router as auth_router

# -------------------------
# NEW: Admin Shoutout API
# -------------------------
from src.routes.admin_shoutouts import router as admin_shoutout_router


app = FastAPI(
    title="Bragboard-2",
    description="Backend API for Bragboard-2",
    version="1.0.0"
)

# -------------------------
# CORS Setup
# -------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Create DB tables
# -------------------------
Base.metadata.create_all(bind=engine)

# -------------------------
# Include existing routers
# -------------------------
app.include_router(shoutout_router, prefix="/api")
#app.include_router(reaction_router, prefix="/api")
#app.include_router(comment_router, prefix="/api")
#app.include_router(auth_router, prefix="/api")

# Report routes (already had custom prefix)
#app.include_router(report_router, prefix="/api/reports")

# -------------------------
# Include ADMIN shoutout router
# -------------------------
# Admin-only APIs
app.include_router(admin_shoutout_router)

# -------------------------
# Root health check
# -------------------------
@app.get("/")
def home():
    return {"message": "Backend OK"}
