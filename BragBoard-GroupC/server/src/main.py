from fastapi import FastAPI
from .api import api_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="BragBoard Backend")
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def root():
    return {"status": "backend running"}
