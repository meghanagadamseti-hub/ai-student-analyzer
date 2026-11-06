# routes/ai_routes.py
# ─────────────────────────────────────────────────────────────────────────────
# GET  /ai/status           — is Groq configured?
# POST /ai/rewrite          — full resume improvement (all sections at once)
# POST /ai/rewrite-section  — rewrite ONE section, fresh every call (no cache)
# GET  /resume/current      — return the current session resume parsed into sections
# ─────────────────────────────────────────────────────────────────────────────

from flask import Blueprint, jsonify, request

from services.groq_service    import call_groq, rewrite_section, get_groq_status
from services.company_service  import get_required_skills
from services.ats_service      import match_skills, calculate_ats_score
from routes.resume_routes      import LATEST_RESUME

ai_bp = Blueprint("ai", __name__, url_prefix="/ai")


# ─────────────────────────────────────────────────────────────────────────────
# GET /ai/status
# ─────────────────────────────────────────────────────────────────────────────
@ai_bp.route("/status", methods=["GET"])
def ai_status():
    return jsonify(get_groq_status())


# ─────────────────────────────────────────────────────────────────────────────
# POST /ai/rewrite-section
#
# Rewrites a SINGLE resume section.  Always makes a fresh Groq call.
# No response caching on the backend.
#
# Body:
#   {
#     "section":       "summary" | "experience" | "projects" | "skills" | "achievements",
#     "current_text":  "candidate's existing text for this section",
#     "company":       "Google",
#     "role":          "Software Engineer",
#     "experience":    "Fresher",       // optional
#     "resume_text":   "full resume",   // optional — for context
#     "timestamp":     1234567890,      // optional — ignored but prevents browser cache
#     "regenerate":    true             // optional flag
#   }
#
# Response:
#   { "section": "summary", "rewritten": "...", "groq_powered": true }
# ─────────────────────────────────────────────────────────────────────────────
@ai_bp.route("/rewrite-section", methods=["POST"])
def ai_rewrite_section():
    print("\n" + "="*50)
    print("POST /ai/rewrite-section CALLED")
    print(f"  timestamp in request: {request.get_json(silent=True, force=True) and request.get_json().get('timestamp', 'not sent')}")
    print("="*50)

    body = request.get_json(silent=True) or {}

    section      = (body.get("section",      "") or "").strip().lower()
    current_text = (body.get("current_text", "") or "").strip()
    company      = (body.get("company",      "") or "").strip()
    role         = (body.get("role",         "") or "").strip()
    experience   = (body.get("experience",   "Fresher") or "Fresher").strip()
    resume_text  = (body.get("resume_text",  "") or "").strip()
    if not resume_text:
        resume_text = LATEST_RESUME.get("text", "")

    VALID_SECTIONS = {"summary", "experience", "projects", "skills", "achievements"}
    if section not in VALID_SECTIONS:
        return jsonify({
            "error": f"Invalid section '{section}'. Must be one of: {sorted(VALID_SECTIONS)}"
        }), 400

    if not company or not role:
        return jsonify({"error": "company and role are required."}), 400

    print(f"  section={section!r}  company={company!r}  role={role!r}")
    print(f"  current_text length: {len(current_text)} chars")

    # Missing skills for context
    detected_skills = LATEST_RESUME.get("skills", [])
    required_skills = get_required_skills(company, role) or []
    _, missing_skills = match_skills(detected_skills, required_skills)

    try:
        improved = rewrite_section(
            section        = section,
            current_text   = current_text,
            company        = company,
            role           = role,
            experience     = experience,
            missing_skills = missing_skills,
            resume_text    = resume_text,
        )
        return jsonify({
            "section":     section,
            "rewritten":   improved,
            "groq_powered": True,
        })

    except RuntimeError as exc:
        msg = str(exc)
        print(f"  Groq error: {msg}")
        # Rule-based fallback so the UI never crashes
        fallback = _rule_based_rewrite(section, current_text, company, role,
                                        detected_skills, missing_skills)
        return jsonify({
            "section":     section,
            "rewritten":   fallback,
            "groq_powered": False,
            "groq_error":   msg,
        })

    except Exception as exc:
        print(f"  Unexpected error: {exc}")
        return jsonify({"error": f"Rewrite failed: {exc}"}), 500


# ─────────────────────────────────────────────────────────────────────────────
# POST /ai/rewrite   (full resume — all sections at once)
# ─────────────────────────────────────────────────────────────────────────────
@ai_bp.route("/rewrite", methods=["POST"])
def ai_rewrite():
    print("\n===== POST /ai/rewrite CALLED =====")

    body = request.get_json(silent=True) or {}

    company    = (body.get("company",    "") or "").strip()
    role       = (body.get("role",       "") or "").strip()
    experience = (body.get("experience", "Fresher") or "Fresher").strip()

    resume_text = (body.get("resume_text") or "").strip()
    if not resume_text:
        resume_text = LATEST_RESUME.get("text", "")

    if not company or not role:
        return jsonify({"error": "company and role are required."}), 400

    if not resume_text:
        return jsonify({
            "error": "No resume text available. Upload a resume first."
        }), 400

    print(f"  company={company!r}  role={role!r}  experience={experience!r}")

    detected_skills = LATEST_RESUME.get("skills", [])
    required_skills = get_required_skills(company, role) or []
    matched_skills, missing_skills = match_skills(detected_skills, required_skills)

    ats_data  = calculate_ats_score(resume_text, matched_skills, required_skills)
    ats_score = ats_data.get("overall_score", 50)

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
        suggestions.update({
            "groq_powered":      True,
            "company":           company,
            "role":              role,
            "current_ats_score": ats_score,
            "missing_skills":    missing_skills,
            "matched_skills":    matched_skills,
        })
        return jsonify(suggestions)

    except RuntimeError as exc:
        msg = str(exc)
        print(f"  Groq error: {msg}")
        rule_based = {
            "summary":               f"Motivated {role} with expertise in {', '.join(required_skills[:3])}.",
            "experience":            "• Engineered solutions with measurable impact.\n• Collaborated with cross-functional teams.\n• Delivered features on schedule.",
            "projects":              "• Full-Stack Project | Python, React, PostgreSQL\n  Built application serving 1,000+ users daily.",
            "skills":                ", ".join(detected_skills[:12] + missing_skills[:5]),
            "ats_keywords":          missing_skills[:8],
            "grammar_improvements":  ["Ensure consistent verb tense.", "Use strong action verbs."],
            "formatting_suggestions":["Use ATS-friendly single-column layout.", "Keep resume to one page."],
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
        return jsonify({"error": f"AI rewrite failed: {exc}"}), 500


# ─────────────────────────────────────────────────────────────────────────────
# GET /resume/current
# Returns the parsed sections from the currently uploaded resume session.
# Used by the AI Resume Builder to pre-populate form fields.
# ─────────────────────────────────────────────────────────────────────────────
@ai_bp.route("/resume/current", methods=["GET"])
def get_current_resume():
    """
    Returns the raw text, skills, and parsed sections of the most recently uploaded resume.
    Sections are pre-parsed at upload time and cached in LATEST_RESUME["sections"].
    """
    text     = LATEST_RESUME.get("text", "")
    skills   = LATEST_RESUME.get("skills", [])
    filename = LATEST_RESUME.get("filename", "")

    if not text:
        return jsonify({
            "available": False,
            "message":   "No resume uploaded yet.",
        })

    # Use cached sections from upload; re-parse only if missing
    sections = LATEST_RESUME.get("sections") or _parse_resume_sections(text)

    return jsonify({
        "available": True,
        "filename":  filename,
        "raw_text":  text,
        "skills":    skills,
        "sections":  sections,
    })


# ─────────────────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────────────────

def _parse_resume_sections(text: str) -> dict:
    """
    Heuristic section parser.
    Looks for common heading keywords and extracts the text that follows.
    Returns a dict with keys: summary, experience, projects, skills,
                               education, certifications, achievements.
    """
    import re

    HEADINGS = {
        "summary":        r"(?:professional\s+)?summary|objective|profile|about\s+me",
        "experience":     r"experience|work\s+history|employment|internship",
        "projects":       r"projects?|portfolio|personal\s+projects?",
        "skills":         r"technical\s+skills?|skills?|technologies|competencies",
        "education":      r"education|academics?|qualifications?",
        "certifications": r"certifications?|licenses?|credentials?",
        "achievements":   r"achievements?|awards?|honors?|accomplishments?",
    }

    lines   = text.split("\n")
    result  = {k: "" for k in HEADINGS}
    current = None
    buf: list[str] = []

    def flush():
        if current and buf:
            result[current] = "\n".join(buf).strip()

    for line in lines:
        stripped = line.strip()
        if not stripped:
            if buf:
                buf.append("")
            continue

        matched = False
        for section_key, pattern in HEADINGS.items():
            if re.match(r"^\s*(" + pattern + r")\s*:?\s*$", stripped, re.IGNORECASE):
                flush()
                buf     = []
                current = section_key
                matched = True
                break

        if not matched and current:
            buf.append(line.rstrip())

    flush()

    # ── Fallback: put everything into experience if no sections found ──
    if not any(result.values()):
        result["experience"] = text.strip()

    return result


def _rule_based_rewrite(
    section:        str,
    current:        str,
    company:        str,
    role:           str,
    skills:         list,
    missing_skills: list,
) -> str:
    """
    Rule-based fallback when Groq is unavailable.
    Uses random verb/metric selection so each call produces visibly different text.
    """
    import random as _r

    skill_str   = ", ".join(skills[:5]) or "Python, React, SQL"
    missing_str = ", ".join(missing_skills[:3])
    top_skill   = skill_str.split(",")[0].strip()

    # Pick different verbs and metrics each call
    verbs_exp   = _r.choice(["Engineered","Developed","Architected","Built","Implemented","Designed"])
    verbs_feat  = _r.choice(["Spearheaded","Delivered","Shipped","Launched","Rolled out"])
    verbs_perf  = _r.choice(["Reduced","Optimised","Improved","Accelerated","Streamlined"])
    metric_ret  = _r.choice(["28%","32%","41%","19%","35%"])
    metric_feat = _r.choice(["12","15","18","10","20"])
    metric_ci   = _r.choice(["50%","45%","60%","38%","55%"])
    metric_up   = _r.choice(["1,000+","2,500+","5,000+","800+","3,000+"])
    metric_lat  = _r.choice(["60%","45%","70%","52%","65%"])

    verb_sum  = _r.choice(["Results-driven","Impact-focused","Motivated","Dedicated","Experienced"])
    adj_sum   = _r.choice(["scalable","reliable","user-centric","high-performance","production-grade"])

    rewrites = {
        "summary": (
            f"{verb_sum} {role} with expertise in {skill_str}. "
            f"Passionate about building {adj_sum} systems at {company}. "
            f"Seeking to bring technical depth{' and ' + missing_str + ' skills' if missing_str else ''} "
            f"to your engineering team."
        ),
        "experience": (
            f"• {verbs_exp} {top_skill} features adopted by 500+ enterprise clients, "
            f"increasing user retention by {metric_ret}.\n"
            f"• {verbs_feat} {metric_feat}+ sprint features in collaboration with cross-functional teams "
            f"with zero critical regressions.\n"
            f"• {verbs_perf} CI/CD pipeline runtime by {metric_ci} through build caching optimisation."
        ),
        "projects": (
            f"• {role} Platform | {skill_str}\n"
            f"  {verbs_exp} and deployed a production application serving {metric_up} daily users "
            f"with 99.9% uptime.\n\n"
            f"• Data Pipeline | Python, Spark, PostgreSQL\n"
            f"  Designed ETL pipeline processing 500K records/day, reducing report latency by {metric_lat}."
        ),
        "skills": (
            f"{current or skill_str}, {missing_str}".strip(", ")
            if missing_str else (current or skill_str)
        ),
        "achievements": (
            f"• Ranked top 5% among 10,000+ participants in national coding competition ({_r.choice(['2023','2024','2022'])}).\n"
            f"• {verbs_feat} {_r.choice(['3','4','5'])} production features in first 30 days — commended by engineering lead.\n"
            f"• {verbs_perf} bug count by {_r.choice(['60%','55%','70%','50%'])} by introducing automated test suite."
        ),
    }
    return rewrites.get(section, current or f"Improved {section} section for {company} {role} role.")
