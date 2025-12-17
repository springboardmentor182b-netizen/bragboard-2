from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.database.core import engine, Base
from src.reports.reporting_controller import router as reporting_router

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="BragBoard Reporting API",
    description="API for reporting and managing shoutouts in BragBoard",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include router
app.include_router(reporting_router)

@app.get("/")
def root():
    return {
        "message": "BragBoard Reporting API",
        "version": "2.0.0",
        "endpoints": {
            "employee": {
                "POST /api/reporting/submit": "Submit report",
                "GET /api/reporting/my-reports": "Get my reports",
                "GET /api/reporting/{report_id}": "Get specific report"
            },
            "admin": {
                "GET /api/reporting/admin/all": "Get all reports (with pagination)",
                "PATCH /api/reporting/admin/resolve/{report_id}": "Resolve report",
                "GET /api/reporting/admin/stats": "Get statistics"
            }
        }
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "bragboard-reporting-api"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)