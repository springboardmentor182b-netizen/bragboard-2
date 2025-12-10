from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Existing routers
from src.routes.shoutout_routes import router as shoutout_router
from src.routes.reaction_routes import router as reaction_router

# NEW: Report Export Router
from src.routes.report_routes import router as report_router

# NEW: Comments Router
from src.routes.comment import router as comment_router

app = FastAPI()

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

# Export routes
app.include_router(report_router, prefix="/api/reports")

# Comment routes
app.include_router(comment_router, prefix="/api")

@app.get("/")
def home():
    return {"message": "Backend OK"}
