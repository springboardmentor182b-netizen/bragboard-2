from fastapi import FastAPI
from database import Base, engine
from routes import report_routes

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Reporting Shoutouts API")

app.include_router(report_routes.router)

