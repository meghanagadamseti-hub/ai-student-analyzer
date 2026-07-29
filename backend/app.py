# app.py
# ─────────────────────────────────────────────────────────────────────────────
# Application factory.  All routes are registered via Blueprints.
# Database is MySQL via SQLAlchemy + Flask-Migrate.
# Backward-compatible: every existing API URL and response shape is preserved.
# ─────────────────────────────────────────────────────────────────────────────

import os
from flask      import Flask, jsonify
from flask_cors import CORS

from config   import Config
from database import init_db, check_db_connection


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # ── Upload folder ────────────────────────────────────────────────────
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    # ── CORS ─────────────────────────────────────────────────────────────
    # Allow any localhost / 127.0.0.1 origin (Vite picks port dynamically)
    import re as _re
    CORS(
        app,
        origins=_re.compile(r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$"),
        supports_credentials=True,
    )

    # ── Database + Migrations ────────────────────────────────────────────
    init_db(app)

    # Import models so Flask-Migrate can discover them
    with app.app_context():
        import models  # noqa: F401 — registers all ORM classes with metadata

    # ── Register Blueprints ───────────────────────────────────────────────
    from routes.company_routes   import company_bp
    from routes.resume_routes    import resume_bp
    from routes.learning_routes  import learning_bp
    from routes.interview_routes import interview_bp
    from routes.coach_routes     import coach_bp

    app.register_blueprint(company_bp)
    app.register_blueprint(resume_bp)
    app.register_blueprint(learning_bp)
    app.register_blueprint(interview_bp)
    app.register_blueprint(coach_bp)

    # ── Home route ───────────────────────────────────────────────────────
    @app.route("/")
    def home():
        return jsonify({
            "message": "AI Placement Readiness Platform Backend Running 🚀",
            "version": "2.0 — MySQL edition",
        })

    # ── Global error handlers ─────────────────────────────────────────────
    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": "Endpoint not found."}), 404

    @app.errorhandler(405)
    def method_not_allowed(e):
        return jsonify({"error": "Method not allowed."}), 405

    @app.errorhandler(500)
    def internal_error(e):
        from database import db
        db.session.rollback()
        return jsonify({"error": "Internal server error.", "detail": str(e)}), 500

    return app


# ── Entry point ───────────────────────────────────────────────────────────────
app = create_app()

if __name__ == "__main__":
    # Validate DB connection before serving
    check_db_connection(app)
    app.run(
        debug = app.config.get("DEBUG", False),
        host  = "0.0.0.0",
        port  = int(os.getenv("PORT", 5000)),
    )
