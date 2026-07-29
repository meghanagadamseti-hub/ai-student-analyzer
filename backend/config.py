# config.py
# ─────────────────────────────────────────────────────────────────────────────
# Centralised configuration using python-dotenv.
# All sensitive values come from .env — never hardcoded.
# ─────────────────────────────────────────────────────────────────────────────

import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    # ── Database ────────────────────────────────────────────────────────────
    DB_HOST     = os.getenv("DATABASE_HOST",     "localhost")
    DB_PORT     = os.getenv("DATABASE_PORT",     "3306")
    DB_NAME     = os.getenv("DATABASE_NAME",     "ai_career_platform")
    DB_USER     = os.getenv("DATABASE_USER",     "root")
    DB_PASSWORD = os.getenv("DATABASE_PASSWORD", "")

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}"
        f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
        f"?charset=utf8mb4"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_recycle":    3600,   # recycle connections every hour
        "pool_pre_ping":   True,   # test connection health before use
        "pool_size":       10,
        "max_overflow":    20,
    }

    # ── Flask ───────────────────────────────────────────────────────────────
    SECRET_KEY  = os.getenv("SECRET_KEY", "dev-secret-change-in-production")
    DEBUG       = os.getenv("FLASK_DEBUG", "false").lower() == "true"

    # ── Uploads ─────────────────────────────────────────────────────────────
    UPLOAD_FOLDER      = os.getenv("UPLOAD_FOLDER", "uploads")
    MAX_CONTENT_LENGTH = 10 * 1024 * 1024   # 10 MB limit

    # ── CORS origins ────────────────────────────────────────────────────────
    # Allow any localhost port (Vite picks 5173, 5174, 5175, 5176... dynamically)
    CORS_ORIGINS = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        "http://localhost:5177",
        "http://localhost:5178",
        "http://localhost:5179",
        "http://localhost:5180",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
        "http://127.0.0.1:5176",
    ]
