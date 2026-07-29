# routes/resume_routes.py
# ─────────────────────────────────────────────────────────────────────────────
# POST /upload                          — upload + parse resume, save to DB
# POST /analyze                         — ATS analysis, save result to DB
# GET  /analysis/history/<user_id>      — previous analyses for a user
# GET  /resume/history/<user_id>        — previously uploaded resumes for a user
#
# All existing response shapes are preserved exactly.
# ─────────────────────────────────────────────────────────────────────────────

import os
from flask import Blueprint, jsonify, request, current_app

from utils.resume_parser   import extract_text_from_pdf
from utils.skill_extractor import extract_skills

from services.company_service import (
    get_required_skills,
    get_role_data,
    get_company_meta,
    get_company_and_role_ids,
)
from services.ats_service     import calculate_ats_score, match_skills
from services.resume_service  import (
    save_resume,
    get_resumes_for_user,
    save_analysis,
    get_analysis_history,
)
from services.learning_service import generate_and_save_plan

resume_bp = Blueprint("resume", __name__)

# ── In-process session (one resume at a time — backward-compatible) ──────────
LATEST_RESUME = {"text": "", "skills": [], "filename": "", "db_id": None}


# ─────────────────────────────────────────────────────────────────────────────
# POST /upload
# ─────────────────────────────────────────────────────────────────────────────
@resume_bp.route("/upload", methods=["POST"])
def upload_resume():
    if "resume" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["resume"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    # Optional user_id from form data (anonymous upload is fine)
    user_id  = request.form.get("user_id", type=int)
    filename = file.filename
    filepath = os.path.join(current_app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    resume_text = extract_text_from_pdf(filepath)
    skills      = extract_skills(resume_text)

    print("\n===== RESUME UPLOADED =====")
    print("Filename:", filename)
    print("Skills Found:", skills)

    # ── Persist to DB ────────────────────────────────────────────────────
    try:
        resume_row = save_resume(
            filename       = filename,
            extracted_text = resume_text,
            user_id        = user_id,
        )
        db_id = resume_row.id
    except Exception as exc:
        print(f"[upload] DB save failed (non-fatal): {exc}")
        db_id = None

    # ── Update in-process session ────────────────────────────────────────
    LATEST_RESUME["text"]     = resume_text
    LATEST_RESUME["skills"]   = skills
    LATEST_RESUME["filename"] = filename
    LATEST_RESUME["db_id"]    = db_id

    return jsonify({
        "message":  "Resume uploaded successfully",
        "filename": filename,
        "resume_id": db_id,
    })


# ─────────────────────────────────────────────────────────────────────────────
# POST /analyze
# ─────────────────────────────────────────────────────────────────────────────
@resume_bp.route("/analyze", methods=["POST"])
def analyze_resume():
    print("\n===== ANALYZE API CALLED =====")

    if not LATEST_RESUME["text"]:
        return jsonify({"error": "Please upload a resume first."}), 400

    body       = request.get_json() or {}
    company    = (body.get("company")    or "").strip()
    role       = (body.get("role")       or "").strip()
    experience = (body.get("experience") or "Fresher").strip()

    print(f"Company: '{company}'")
    print(f"Role:    '{role}'")
    print(f"Experience: '{experience}'")

    # ── Validate company ─────────────────────────────────────────────────
    company_meta = get_company_meta(company)
    if not company_meta["roles"]:
        from services.company_service import get_all_companies_meta
        available = [c["name"] for c in get_all_companies_meta()]
        return jsonify({
            "error":               f"Company '{company}' not found.",
            "available_companies": available,
        }), 404

    # ── Validate role ────────────────────────────────────────────────────
    role_data       = get_role_data(company, role)
    required_skills = get_required_skills(company, role)

    if role_data.get("_error") == "role_not_found":
        return jsonify({
            "error":           f"Role '{role}' not found for company '{company}'.",
            "available_roles": role_data.get("_available_roles", []),
        }), 404

    if not required_skills:
        return jsonify({
            "error": f"No skills data found for '{company}' / '{role}'."
        }), 404

    # ── Skill matching ───────────────────────────────────────────────────
    resume_text     = LATEST_RESUME["text"]
    detected_skills = LATEST_RESUME["skills"]

    matched_skills, missing_skills = match_skills(detected_skills, required_skills)

    preferred_skills  = role_data.get("preferred_skills", [])
    preferred_missing = [s for s in preferred_skills
                         if s.lower() not in {m.lower() for m in matched_skills}]

    # ── ATS score ────────────────────────────────────────────────────────
    ats = calculate_ats_score(resume_text, matched_skills, required_skills)
    overall         = ats["overall_score"]
    skill_match_pct = (
        round(len(matched_skills) / len(required_skills) * 100)
        if required_skills else 0
    )

    if overall >= 85:
        placement_level = "Excellent Candidate"
    elif overall >= 70:
        placement_level = "Strong Candidate"
    elif overall >= 55:
        placement_level = "Average Candidate"
    else:
        placement_level = "Needs Improvement"

    # ── Recommendations ──────────────────────────────────────────────────
    recommendations = []
    if missing_skills:
        recommendations.append(
            f"Learn {', '.join(missing_skills[:3])} to meet {company}'s core requirements."
        )
    if preferred_missing:
        recommendations.append(
            f"Preferred skills to add: {', '.join(preferred_missing[:3])}."
        )
    if overall < 60:
        recommendations.append(
            "Add quantified project impacts to your resume to improve ATS score."
        )
    if "github" not in resume_text.lower():
        recommendations.append("Include your GitHub profile link in the resume.")

    # ── Learning plan ────────────────────────────────────────────────────
    company_id, role_id = get_company_and_role_ids(company, role)
    learning_plan = generate_and_save_plan(
        detected_skills = detected_skills,
        missing_skills  = missing_skills,
        ats_score       = overall,
        company_name    = company,
        role_name       = role,
        company_id      = company_id,
        role_id         = role_id,
    )

    # ── Skill groups ─────────────────────────────────────────────────────
    skill_groups = role_data.get("skill_groups", {})

    # ── Persist analysis to DB ───────────────────────────────────────────
    resume_db_id = LATEST_RESUME.get("db_id")
    if resume_db_id:
        try:
            save_analysis(
                resume_id       = resume_db_id,
                company_name    = company,
                role_name       = role,
                experience      = experience,
                ats_score       = overall,
                skill_match_pct = skill_match_pct,
                placement_level = placement_level,
                matched_skills  = matched_skills,
                missing_skills  = missing_skills,
                recommendations = recommendations,
                ats_breakdown   = ats,
                company_id      = company_id,
                role_id         = role_id,
            )
        except Exception as exc:
            print(f"[analyze] DB save failed (non-fatal): {exc}")

    print(f"Matched: {matched_skills}  Missing: {missing_skills}  ATS: {overall}")

    return jsonify({
        # Core
        "company":           company,
        "role":              role,
        "experience":        experience,
        # Skills
        "skills":            detected_skills,
        "required_skills":   required_skills,
        "matched_skills":    matched_skills,
        "missing_skills":    missing_skills,
        "preferred_missing": preferred_missing,
        "skill_groups":      skill_groups,
        "skill_match_pct":   skill_match_pct,
        # ATS
        "ats":               ats,
        # Analysis
        "placement_level":   placement_level,
        "recommendations":   recommendations,
        # Company details
        "company_details": {
            "name":             company,
            "description":      company_meta.get("description", ""),
            "logo":             company_meta.get("logo", ""),
            "locations":        company_meta.get("locations", []),
            "package":          role_data.get("package", ""),
            "difficulty":       role_data.get("difficulty", ""),
            "hiring_category":  role_data.get("hiring_category", ""),
            "role_description": role_data.get("role_description", ""),
        },
        # Learning
        "learning_plan": learning_plan,
        # Legacy flag consumed by frontend
        "uploaded": True,
    })


# ─────────────────────────────────────────────────────────────────────────────
# GET /analysis/history/<user_id>
# ─────────────────────────────────────────────────────────────────────────────
@resume_bp.route("/analysis/history/<int:user_id>", methods=["GET"])
def analysis_history(user_id):
    try:
        return jsonify(get_analysis_history(user_id))
    except Exception as exc:
        return jsonify({"error": f"Failed to fetch analysis history: {exc}"}), 500


# ─────────────────────────────────────────────────────────────────────────────
# GET /resume/history/<user_id>
# ─────────────────────────────────────────────────────────────────────────────
@resume_bp.route("/resume/history/<int:user_id>", methods=["GET"])
def resume_history(user_id):
    try:
        return jsonify(get_resumes_for_user(user_id))
    except Exception as exc:
        return jsonify({"error": f"Failed to fetch resume history: {exc}"}), 500
