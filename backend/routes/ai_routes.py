# routes/ai_routes.py
# ─────────────────────────────────────────────────────────────────────────────
# POST /ai/rewrite   — Groq-powered resume improvement
# GET  /ai/status    — check whether Groq is configured
# ─────────────────────────────────────────────────────────────────────────────

from flask import Blueprint, jsonify, request

from services.groq_service   import call_groq, get_groq_status
from services.company_service import get_required_skills
from services.ats_service     import match_skills, calculate_ats_score
from routes.resume_routes     import LATEST_RESUME

ai_bp = Blueprint("ai", __name__, url_prefix="/ai")


# ─────────────────────────────────────────────────────────────────────────────
# GET /ai/status
# Returns whether GROQ_API_KEY is configured so the frontend can decide
# whether to show the AI wizard or fall back to rule-based mode.
# ─────────────────────────────────────────────────────────────────────────────
@ai_bp.route("/status", methods=["GET"])
def ai_status():
    return jsonify(get_groq_status())


# ─────────────────────────────────────────────────────────────────────────────
# POST /ai/rewrite
#
# Body (all optional except company + role when no resume is in session):
#   {
#     "company":      "Google",
#     "role":         "Software Engineer",
#     "experience":   "Fresher",
#     "resume_text":  "..."      // optional — falls back to session resume
#   }
#
# Response:
#   {
#     "summary":                "...",
#     "experience":             "...",
#     "projects":               "...",
#     "skills":                 "...",
#     "ats_keywords":           [...],
#     "grammar_improvements":   [...],
#     "formatting_suggestions": [...],
#     "estimated_ats_score":    85,
#     "improvement_summary":    "...",
#     "groq_powered":           true,
#     "company":                "Google",
#     "role":                   "Software Engineer",
#     "current_ats_score":      62
#   }
# ─────────────────────────────────────────────────────────────────────────────
@ai_bp.route("/rewrite", methods=["POST"])
def ai_rewrite():
    print("\n===== POST /ai/rewrite CALLED =====")

    body = request.get_json(silent=True) or {}

    company    = (body.get("company",    "") or "").strip()
    role       = (body.get("role",       "") or "").strip()
    experience = (body.get("experience", "Fresher") or "Fresher").strip()

    # Resume text: prefer body payload, fall back to session
    resume_text = (body.get("resume_text") or "").strip()
    if not resume_text:
        resume_text = LATEST_RESUME.get("text", "")

    if not company or not role:
        return jsonify({"error": "company and role are required."}), 400

    if not resume_text:
        return jsonify({
            "error": "No resume text available. Upload a resume first or pass resume_text in the request body."
        }), 400

    print(f"  company={company!r}  role={role!r}  experience={experience!r}")
    print(f"  resume_text length: {len(resume_text)} chars")

    # ── Build skill context ──────────────────────────────────────────────
    detected_skills = LATEST_RESUME.get("skills", [])
    required_skills = get_required_skills(company, role) or []
    matched_skills, missing_skills = match_skills(detected_skills, required_skills)

    # ── Compute current ATS score ────────────────────────────────────────
    ats_data    = calculate_ats_score(resume_text, matched_skills, required_skills)
    ats_score   = ats_data.get("overall_score", 50)

    print(f"  ATS score: {ats_score}%  "
          f"matched: {len(matched_skills)}  missing: {len(missing_skills)}")

    # ── Call Groq ────────────────────────────────────────────────────────
    try:
        suggestions = call_groq(
            resume_text     = resume_text,
            company         = company,
            role            = role,
            experience      = experience,
            ats_score       = ats_score,
            missing_skills  = missing_skills,
            matched_skills  = matched_skills,
            required_skills = required_skills,
        )
        suggestions["groq_powered"]       = True
        suggestions["company"]            = company
        suggestions["role"]               = role
        suggestions["current_ats_score"]  = ats_score
        suggestions["missing_skills"]     = missing_skills
        suggestions["matched_skills"]     = matched_skills

        print(f"  Groq success — estimated ATS: {suggestions.get('estimated_ats_score')}%")
        return jsonify(suggestions)

    except RuntimeError as exc:
        # Groq not configured or API error — return a graceful fallback
        msg = str(exc)
        print(f"  Groq error: {msg}")

        # Build rule-based fallback so the wizard still works
        from services.ai_resume_coach import generate_coach_report
        try:
            fallback = generate_coach_report(
                resume_text     = resume_text,
                detected_skills = detected_skills,
                missing_skills  = missing_skills,
                company         = company,
                role            = role,
                experience      = experience,
                ats_score       = ats_score,
                required_skills = required_skills,
                ats_breakdown   = ats_data,
            )
        except Exception:
            fallback = {}

        # Map coach report keys → wizard expected keys
        rule_based = {
            "summary":               _first(fallback.get("section_suggestions", []),
                                            "suggestion", f"Motivated {role} with expertise in {', '.join(required_skills[:3])}."),
            "experience":            "• Engineered solutions with measurable impact.\n• Collaborated with cross-functional teams.\n• Delivered features on schedule.",
            "projects":              "• Full-Stack Project | Python, React, PostgreSQL\n  Built application serving 1,000+ users daily.",
            "skills":                ", ".join(detected_skills[:12] + missing_skills[:5]),
            "ats_keywords":          missing_skills[:8],
            "grammar_improvements":  fallback.get("grammar_issues", ["Ensure consistent verb tense.", "Use strong action verbs."]),
            "formatting_suggestions":fallback.get("formatting_tips", ["Use ATS-friendly single-column layout.", "Keep resume to one page."]),
            "estimated_ats_score":   min(99, ats_score + 15),
            "improvement_summary":   f"Adding {company}-specific keywords will boost your score.",
            "groq_powered":          False,
            "groq_error":            msg,
            "company":               company,
            "role":                  role,
            "current_ats_score":     ats_score,
            "missing_skills":        missing_skills,
            "matched_skills":        matched_skills,
        }
        return jsonify(rule_based)

    except Exception as exc:
        print(f"  Unexpected error: {exc}")
        return jsonify({"error": f"AI rewrite failed: {exc}"}), 500


def _first(items: list, key: str, default: str) -> str:
    """Pull first item's key from a list of dicts, or return default."""
    if items and isinstance(items[0], dict):
        return items[0].get(key, default)
    return default
