# database.py
# ─────────────────────────────────────────────────────────────────────────────
# Single SQLAlchemy instance shared across the entire application.
# Import `db` anywhere you need ORM access.
# Flask-Migrate is also wired here so migrations stay in one place.
# ─────────────────────────────────────────────────────────────────────────────

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db      = SQLAlchemy()
migrate = Migrate()


def init_db(app):
    """
    Initialise SQLAlchemy and Flask-Migrate with the Flask app.
    Call this once inside create_app().
    """
    db.init_app(app)
    migrate.init_app(app, db)
    return db


def check_db_connection(app):
    """
    Validate that the database is reachable at startup.
    Prints a clear message rather than crashing silently.
    Returns True on success, False on failure.
    """
    try:
        with app.app_context():
            from sqlalchemy import text
            db.session.execute(text("SELECT 1"))
        print("✅  Database connection OK")
        return True
    except Exception as exc:
        print(f"❌  Database connection FAILED: {exc}")
        print("    → Check DATABASE_HOST / USER / PASSWORD / NAME in .env")
        return False
