from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.auth.routes import router as auth_router
from src.users.controller import router as users_router
from src.todos.controller import router as shoutouts_router
from src.shoutout_reports.controller import router as reports_router
from src.admin.controller import router as admin_router
from src.database.core import engine, Base

# Import all entities to ensure they are registered with Base.metadata
from src.entities.user import User
from src.entities.todo import Shoutout, Comment, Tag
from src.entities.shoutout_report import ShoutoutReport

# Create tables
# Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow frontend dev origin; adjust list as needed
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth")
app.include_router(users_router) # Prefix is defined in controller
app.include_router(shoutouts_router) # Prefix is defined in controller
app.include_router(reports_router)
app.include_router(admin_router)
