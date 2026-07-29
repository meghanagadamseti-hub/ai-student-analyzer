# routes/coach_routes.py
# ─────────────────────────────────────────────────────────────────────────────
# POST /resume-coach       — full AI coach report
# POST /rewrite-bullet     — rewrite one resume bullet point
#
# Response shapes are IDENTICAL to the old app.py routes.
# ─────────────────────────────────────────────────────────────────────────────

from flask import Blueprint, jsonify, request

from services.company_service import get_required_skills, get_role_data
from services.ats_service     import calculate_ats_score, match_skills
from services.ai_resume_coach import generate_coach_report, rewrite_bullet
from routes.resume_routes     import LATEST_RESUME

coach_bp = Blueprint("coach", __name__)


# ─────────────────────────────────────────────────────────────────────────────
# POST /resume-coach
# ─────────────────────────────────────────────────────────────────────────────
@coach_bp.route("/resume-coach", methods=["POST"])
def resume_coach():
    print("\n===== RESUME-COACH API CALLED =====")

    if not LATEST_RESUME["text"]:
        return jsonify({"error": "Please upload a resume first."}), 400

    body       = request.get_json(silent=True) or {}
    company    = (body.get("company",    "") or "").strip()
    role       = (body.get("role",       "") or "").strip()
    experience = (body.get("experience", "Fresher") or "Fresher").strip()

    if not company or not role:
        return jsonify({"error": "company and role are required."}), 400

    print(f"Coach: {company} / {role} / {experience}")

    resume_text     = LATEST_RESUME["text"]
    detected_skills = LATEST_RESUME["skills"]

    required_skills = get_required_skills(company, role) or []
    matched_skills, missing_skills = match_skills(detected_skills, required_skills)

    ats_scores = calculate_ats_score(resume_text, matched_skills, required_skills)

    try:
        report = generate_coach_report(
            resume_text     = resume_text,
            detected_skills = detected_skills,
            missing_skills  = missing_skills,
            company         = company,
            role            = role,
            experience      = experience,
            ats_score       = ats_scores["overall_score"],
            required_skills = required_skills,
            ats_breakdown   = ats_scores,
        )
        return jsonify(report)
    except Exception as exc:
        return jsonify({"error": f"Coach report failed: {exc}"}), 500


# ─────────────────────────────────────────────────────────────────────────────
# POST /rewrite-bullet
# ─────────────────────────────────────────────────────────────────────────────
@coach_bp.route("/rewrite-bullet", methods=["POST"])
def rewrite_bullet_endpoint():
    body     = request.get_json(silent=True) or {}
    original = (body.get("original") or "").strip()
    if not original:
        return jsonify({"error": "original is required."}), 400

    try:
        rewritten = rewrite_bullet(original, LATEST_RESUME.get("skills", []))
        return jsonify({"original": original, "rewritten": rewritten})
    except Exception as exc:
        return jsonify({"error": f"Rewrite failed: {exc}"}), 500
