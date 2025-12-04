from fastapi import FastAPI
from routes import router

app = FastAPI(
    title="Reporting Shoutouts API",
    description="API for reporting, viewing and resolving shoutout reports",
    version="1.0.0"
)

# Include all routes
app.include_router(router)
