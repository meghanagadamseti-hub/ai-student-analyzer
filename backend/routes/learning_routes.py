# routes/learning_routes.py
# ─────────────────────────────────────────────────────────────────────────────
# GET/POST /learning   — generate learning plan (DB-persisted when possible)
#
# Response shape is IDENTICAL to the old /learning route.
# ─────────────────────────────────────────────────────────────────────────────

from flask import Blueprint, jsonify, request
from services.learning_service import generate_and_save_plan
# Import shared session from resume_routes at runtime to avoid circular import
from routes.resume_routes import LATEST_RESUME

learning_bp = Blueprint("learning", __name__)


@learning_bp.route("/learning", methods=["GET", "POST"])
def learning():
    body = request.get_json(silent=True) or {}

    detected_skills = body.get("detected_skills") or LATEST_RESUME["skills"]
    missing_skills  = body.get("missing_skills",  [])
    ats_score       = body.get("ats_score",        50)
    user_id         = body.get("user_id")
    company_name    = body.get("company",          "")
    role_name       = body.get("role",             "")

    if not detected_skills and not missing_skills:
        missing_skills  = ["DSA", "System Design", "SQL", "Docker", "Git"]
        detected_skills = ["Python", "Java", "OOP", "HTML", "CSS"]

    try:
        plan = generate_and_save_plan(
            detected_skills = detected_skills,
            missing_skills  = missing_skills,
            ats_score       = int(ats_score),
            user_id         = user_id,
            company_name    = company_name,
            role_name       = role_name,
        )
        return jsonify(plan)
    except Exception as exc:
        return jsonify({"error": f"Failed to generate learning plan: {exc}"}), 500
