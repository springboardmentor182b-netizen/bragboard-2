from fastapi import FastAPI
from auth.router import router as auth_router

app = FastAPI()

# Register all routes
app.include_router(auth_router)

@app.get("/")
def root():
    return {"message": "FastAPI Auth Service Running"}
