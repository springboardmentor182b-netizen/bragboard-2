from fastapi import FastAPI

from server.src import entities  # noqa: F401  # ensures models register with Base
from server.src.comments.controller import router as comments_router
from server.src.database.core import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="BragBoard Comment Service",
    description="Minimal API to create, edit, delete, and list comments.",
    version="1.0.0",
)

app.include_router(comments_router, prefix="/api")

from fastapi import FastAPI
from src.todos.controller import router as shoutout_router

app = FastAPI(title="Bragboard API", version="1.0.0")

# Mount your shoutouts API under /shoutouts
app.include_router(shoutout_router)

# OPTIONAL: Redirect root to Swagger UI
from fastapi.responses import RedirectResponse

@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/docs")
