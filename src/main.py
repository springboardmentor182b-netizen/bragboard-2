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
