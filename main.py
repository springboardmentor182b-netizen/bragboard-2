from fastapi import FastAPI
from routers.admin_routes import router as admin_router

app = FastAPI()

# home check
@app.get("/")
def home():
    return {"message": "FastAPI Backend Running Successfully!"}

# include admin analytics routes
app.include_router(admin_router, prefix="/admin")
