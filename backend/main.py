"""
AgroGuard AI - Main Application
Serves frontend + API from same port 8000
"""

import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

from app.utils.config import APP_NAME, APP_VERSION, UPLOAD_DIR
from app.utils.database import connect_db, disconnect_db
from app.services.prediction_service import load_model
from app.routes import auth, prediction, scans

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title=APP_NAME,
    version=APP_VERSION,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── API Routes (register BEFORE static files) ────────────────────────────────
app.include_router(auth.router)
app.include_router(prediction.router)
app.include_router(scans.router)

# ─── Uploads folder ───────────────────────────────────────────────────────────
Path(UPLOAD_DIR).mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# ─── Frontend folder paths ────────────────────────────────────────────────────
import os

FRONTEND_DIR = Path(__file__).parent / "frontend"


# ─── Page routes ──────────────────────────────────────────────────────────────
@app.get("/", include_in_schema=False)
async def index():
    return FileResponse(str(FRONTEND_DIR / "index.html"))

@app.get("/dashboard.html", include_in_schema=False)
async def dashboard():
    return FileResponse(str(FRONTEND_DIR / "dashboard.html"))

@app.get("/map.html", include_in_schema=False)
async def map_page():
    return FileResponse(str(FRONTEND_DIR / "map.html"))

@app.get("/index.html", include_in_schema=False)
async def index_html():
    return FileResponse(str(FRONTEND_DIR / "index.html"))

# ─── All other static files (css, js, translations, assets) ──────────────────
# This MUST come after page routes
app.mount("/", StaticFiles(directory=str(FRONTEND_DIR), html=True), name="frontend")

# ─── Lifecycle ────────────────────────────────────────────────────────────────
@app.on_event("startup")
async def startup():
    logger.info(f"🌿 Starting {APP_NAME} v{APP_VERSION}")
    await connect_db()
    # load_model()
    logger.info("🌐 Open browser: http://127.0.0.1:8000")

@app.on_event("shutdown")
async def shutdown():
    await disconnect_db()

@app.get("/health", tags=["Health"])
async def health():
    return {"status": "ok", "app": APP_NAME, "version": APP_VERSION}