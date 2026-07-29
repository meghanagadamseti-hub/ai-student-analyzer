# services/groq_service.py
# ─────────────────────────────────────────────────────────────────────────────
# Groq Cloud API integration for AI resume improvements.
#
# Uses the Groq Python SDK (groq>=0.4.0).
# Install:  pip install groq
#
# Set GROQ_API_KEY in backend/.env
# Get a free key at: https://console.groq.com
# ─────────────────────────────────────────────────────────────────────────────

import os
import json
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL   = os.getenv("GROQ_MODEL", "llama3-8b-8192")


def _build_prompt(
    resume_text:     str,
    company:         str,
    role:            str,
    experience:      str,
    ats_score:       int,
    missing_skills:  list,
    matched_skills:  list,
    required_skills: list,
) -> str:
    """Build the structured prompt sent to Groq."""
    missing_str  = ", ".join(missing_skills[:8])  or "None identified"
    matched_str  = ", ".join(matched_skills[:8])  or "None identified"
    required_str = ", ".join(required_skills[:10]) or "Not specified"
    exp_label    = experience or "Fresher"

    return f"""You are an expert AI Resume Coach. Analyse the resume below and generate personalized improvements for a {exp_label} candidate applying to {company} as {role}.

RESUME TEXT:
\"\"\"
{resume_text[:3000]}
\"\"\"

CONTEXT:
- Target Company: {company}
- Target Role: {role}
- Experience Level: {exp_label}
- Current ATS Score: {ats_score}%
- Required Skills: {required_str}
- Matched Skills: {matched_str}
- Missing Skills: {missing_str}

INSTRUCTIONS:
Return ONLY a valid JSON object with EXACTLY these keys. No markdown fences, no extra text.

{{
  "summary": "2-3 line professional summary targeting {company} as {role}. Use action verbs and include 2-3 of the required skills.",
  "experience": "3 bullet points rewriting the candidate's experience with strong action verbs, metrics, and {company}-relevant keywords.",
  "projects": "2 project bullet points with tech stack, scale metrics, and {company}-relevant impact.",
  "skills": "Comma-separated optimised skills list adding the missing skills while keeping the existing ones.",
  "ats_keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6", "keyword7", "keyword8"],
  "grammar_improvements": ["Fix 1 from the resume", "Fix 2 from the resume", "Fix 3 from the resume"],
  "formatting_suggestions": ["Formatting tip 1 for ATS", "Formatting tip 2", "Formatting tip 3"],
  "estimated_ats_score": 85,
  "improvement_summary": "One sentence explaining the most impactful change for {company}."
}}

Rules:
- estimated_ats_score must be an integer 1-100, higher than the current score of {ats_score}
- ats_keywords must be a JSON array of strings
- grammar_improvements must be a JSON array of strings
- formatting_suggestions must be a JSON array of strings
- All other values are plain strings
- Be specific to {company}'s engineering culture and {role} requirements
- Do NOT wrap in markdown code blocks
"""


def call_groq(
    resume_text:     str,
    company:         str,
    role:            str,
    experience:      str       = "Fresher",
    ats_score:       int       = 50,
    missing_skills:  list      = None,
    matched_skills:  list      = None,
    required_skills: list      = None,
) -> dict:
    """
    Call the Groq API and return a structured suggestions dict.

    Returns a dict with keys:
        summary, experience, projects, skills,
        ats_keywords, grammar_improvements, formatting_suggestions,
        estimated_ats_score, improvement_summary

    Raises RuntimeError on API failure with a user-friendly message.
    """
    if not GROQ_API_KEY or GROQ_API_KEY == "your_groq_api_key_here":
        raise RuntimeError(
            "GROQ_API_KEY is not configured. "
            "Get your free key at https://console.groq.com and set it in backend/.env"
        )

    try:
        from groq import Groq
    except ImportError:
        raise RuntimeError(
            "Groq SDK is not installed. Run: pip install groq"
        )

    client = Groq(api_key=GROQ_API_KEY)

    prompt = _build_prompt(
        resume_text     = resume_text,
        company         = company,
        role            = role,
        experience      = experience,
        ats_score       = ats_score,
        missing_skills  = missing_skills  or [],
        matched_skills  = matched_skills  or [],
        required_skills = required_skills or [],
    )

    print(f"[groq_service] Calling Groq API: model={GROQ_MODEL} "
          f"company={company} role={role} ats={ats_score}%")

    try:
        response = client.chat.completions.create(
            model       = GROQ_MODEL,
            messages    = [{"role": "user", "content": prompt}],
            temperature = 0.7,
            max_tokens  = 1500,
        )
    except Exception as exc:
        raise RuntimeError(f"Groq API call failed: {exc}") from exc

    raw = response.choices[0].message.content.strip()
    print(f"[groq_service] Raw response length: {len(raw)} chars")

    # ── Parse JSON safely ────────────────────────────────────────────────
    # Strip accidental markdown fences if model adds them
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
        raw = raw.strip()
    if raw.endswith("```"):
        raw = raw.rsplit("```", 1)[0].strip()

    try:
        result = json.loads(raw)
    except json.JSONDecodeError as exc:
        print(f"[groq_service] JSON parse failed: {exc}\nRaw:\n{raw[:500]}")
        raise RuntimeError(
            "Groq returned an invalid response. Please try again."
        ) from exc

    # ── Normalise / validate keys ────────────────────────────────────────
    defaults = {
        "summary":               f"Motivated {role} with expertise in required technologies, "
                                  f"seeking to contribute to {company}.",
        "experience":            "• Engineered solutions delivering measurable business impact.\n"
                                  "• Collaborated cross-functionally to deliver features on schedule.\n"
                                  "• Improved system performance through optimisation.",
        "projects":              "• Full-Stack Project | React, Python, PostgreSQL\n"
                                  "  Built application serving 1,000+ daily users with 99.9% uptime.",
        "skills":                ", ".join((matched_skills or []) + (missing_skills or [])[:5]),
        "ats_keywords":          missing_skills[:8] if missing_skills else [],
        "grammar_improvements":  ["Review verb tenses for consistency.",
                                   "Ensure all bullet points start with action verbs."],
        "formatting_suggestions":["Use a clean single-column ATS-friendly layout.",
                                   "Keep resume to one page.",
                                   "Use standard section headings."],
        "estimated_ats_score":   min(99, ats_score + 18),
        "improvement_summary":   f"Adding {company}-specific keywords will significantly boost your ATS score.",
    }

    for key, default_val in defaults.items():
        if key not in result or result[key] is None:
            result[key] = default_val

    # Ensure list fields are actually lists
    for list_key in ("ats_keywords", "grammar_improvements", "formatting_suggestions"):
        if isinstance(result[list_key], str):
            result[list_key] = [s.strip() for s in result[list_key].split(",") if s.strip()]

    # Ensure score is int
    try:
        result["estimated_ats_score"] = int(result["estimated_ats_score"])
    except (ValueError, TypeError):
        result["estimated_ats_score"] = defaults["estimated_ats_score"]

    print(f"[groq_service] Estimated ATS after improvements: {result['estimated_ats_score']}%")
    return result


def get_groq_status() -> dict:
    """Return whether Groq is configured and which model is in use."""
    configured = bool(GROQ_API_KEY and GROQ_API_KEY != "your_groq_api_key_here")
    return {
        "configured": configured,
        "model":      GROQ_MODEL if configured else None,
        "message":    (
            "Groq AI is ready."
            if configured
            else "Set GROQ_API_KEY in backend/.env to enable AI improvements."
        ),
    }
