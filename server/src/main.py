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

