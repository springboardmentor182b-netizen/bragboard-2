from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.authroutes import router as auth_router

app = FastAPI(
    title="BragBoard API",
    version="1.0.0",
)

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

app.include_router(auth_router)

@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok"}
