from fastapi import FastAPI
from fastapi.responses import RedirectResponse

from src import entities  # noqa: F401  # ensures models register with Base
from src.comments.controller import router as comments_router
from src.todos.controller import router as shoutout_router
from src.shoutout_reports.controller import router as shoutout_reports_router
from src.database.core import Base, engine

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(
    title="BragBoard API",
    description="API for BragBoard - Shoutouts, Comments, and Reports",
    version="1.0.0",
)

# Register routers
app.include_router(comments_router, prefix="/api")
app.include_router(shoutout_router)  # Shoutouts API at /shoutouts
app.include_router(shoutout_reports_router)  # Reports API at /api/shoutout-reports


# Redirect root to Swagger UI
@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/docs")
