# services/groq_service.py
# ─────────────────────────────────────────────────────────────────────────────
# Groq Cloud API integration for AI resume improvements.
# Install: pip install groq
# Set GROQ_API_KEY in backend/.env — get a free key at https://console.groq.com
# ─────────────────────────────────────────────────────────────────────────────

import os, json, random, string
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_MODEL   = os.getenv("GROQ_MODEL", "llama3-8b-8192")


# ── Helpers ───────────────────────────────────────────────────────────────────

def _make_seed() -> str:
    """Random seed injected into every prompt so Groq never caches output."""
    return "".join(random.choices(string.ascii_uppercase + string.digits, k=8))


def _groq_client():
    """
    Return a Groq client instance.
    Raises RuntimeError with a clear message if the key is missing or still the placeholder.
    """
    placeholder_values = {
        "",
        "your_groq_api_key_here",
        "YOUR_GROQ_API_KEY",
        "ADD_YOUR_KEY_HERE",
    }
    if not GROQ_API_KEY or GROQ_API_KEY.strip() in placeholder_values:
        raise RuntimeError(
            "GROQ_API_KEY is not configured. "
            "Get your free key at https://console.groq.com and set it in backend/.env"
        )
    try:
        from groq import Groq
    except ImportError:
        raise RuntimeError("Groq SDK not installed. Run: pip install groq")
    print(f"[groq_service] _groq_client: using key ending ...{GROQ_API_KEY[-6:]}")
    return Groq(api_key=GROQ_API_KEY)


def _strip_fences(raw: str) -> str:
    """Remove accidental markdown code fences the model sometimes adds."""
    if raw.startswith("```"):
        parts = raw.split("```")
        raw = parts[1] if len(parts) > 1 else raw
        if raw.startswith(("json", "text", "markdown")):
            raw = raw.split("\n", 1)[-1]
    if raw.endswith("```"):
        raw = raw.rsplit("```", 1)[0]
    return raw.strip()


# ── Public: status check ──────────────────────────────────────────────────────

def get_groq_status() -> dict:
    """Return whether Groq is configured and which model is in use."""
    placeholders = {"", "your_groq_api_key_here", "YOUR_GROQ_API_KEY", "ADD_YOUR_KEY_HERE"}
    configured = bool(GROQ_API_KEY and GROQ_API_KEY.strip() not in placeholders)
    return {
        "configured": configured,
        "model":      GROQ_MODEL if configured else None,
        "message": (
            f"Groq AI is ready — model: {GROQ_MODEL}."
            if configured
            else "Set GROQ_API_KEY in backend/.env to enable AI improvements."
        ),
    }


# ── Public: rewrite a single section ─────────────────────────────────────────

def rewrite_section(
    section:        str,
    current_text:   str,
    company:        str,
    role:           str,
    experience:     str  = "Fresher",
    missing_skills: list = None,
    resume_text:    str  = "",
) -> str:
    """
    Rewrite ONE resume section via Groq.
    A fresh random seed is injected every call → unique output every time.
    temperature=0.9, top_p=0.95 for maximum variation.

    Returns plain text (not JSON). Raises RuntimeError on failure.
    """
    client  = _groq_client()
    missing = ", ".join((missing_skills or [])[:6]) or "none identified"
    seed    = _make_seed()
    exp     = experience or "Fresher"

    ACTION_VERBS = {
        "summary":      "Architected, Spearheaded, Championed, Delivered, Transformed",
        "experience":   "Engineered, Optimised, Automated, Reduced, Scaled, Implemented",
        "projects":     "Built, Deployed, Designed, Developed, Launched, Integrated",
        "skills":       "",
        "achievements": "Achieved, Awarded, Ranked, Recognised, Surpassed, Earned",
    }
    verbs = ACTION_VERBS.get(section, "Improved, Enhanced, Developed")

    system_msg = (
        "You are an expert ATS resume writer. "
        "Your ONLY job is to IMPROVE the candidate's EXISTING resume section. "
        "You must: improve grammar, use strong action verbs, add measurable metrics where plausible, "
        "optimise for ATS keywords, and improve professional language. "
        "You must NOT: invent fake jobs, add fake skills, change employer names, alter dates, "
        "remove information, or generate new experiences that didn't exist in the original. "
        "Return ONLY the improved text — no headers, no JSON, no preamble."
    )

    user_msg = f"""[Seed: {seed}]

TASK: Rewrite this resume section to improve ATS score and professional impact.

TARGET JOB: {company} — {role} ({exp})
RELEVANT SKILLS TO WEAVE IN (if genuinely applicable): {missing}
VARY YOUR LANGUAGE: use different action verbs from any previous rewrite.
SUGGESTED VERBS THIS TIME: {verbs}

---ORIGINAL UPLOADED RESUME SECTION ({section.upper()})---
{current_text or "(empty — write a concise professional placeholder appropriate for this role)"}
---END OF ORIGINAL SECTION---

FULL RESUME (for context only — do not rewrite this):
{resume_text[:1500] if resume_text else "Not provided"}

STRICT RULES:
1. Preserve ALL facts: employer names, project names, technologies, dates, universities, CGPA.
2. Do NOT invent any experience, project, skill, or metric that is not in the original.
3. Improve wording — use strong action verbs, quantify achievements with real or plausible metrics.
4. For summary: 2–3 sentences max, mention {company} and 2–3 real skills from original.
5. For experience: rewrite each bullet with a strong verb + measurable outcome.
6. For projects: include the actual tech stack from original + one realistic impact metric.
7. For skills: keep all original skills; add only the missing skills if they genuinely fit.
8. For achievements: use numbers and percentages from the original or conservatively improve.
9. Return ONLY the rewritten section text — nothing else.
10. This must be a REWRITE of the UPLOADED CONTENT, not a generic template.
"""

    print(f"[groq_service] rewrite_section section={section!r} "
          f"company={company!r} seed={seed}")

    try:
        resp = client.chat.completions.create(
            model       = GROQ_MODEL,
            messages    = [
                {"role": "system", "content": system_msg},
                {"role": "user",   "content": user_msg},
            ],
            temperature = 0.9,
            top_p       = 0.95,
            max_tokens  = 600,
        )
    except Exception as exc:
        raise RuntimeError(f"Groq API call failed: {exc}") from exc

    result = _strip_fences(resp.choices[0].message.content)
    print(f"[groq_service] rewrite_section done: {len(result)} chars")
    return result


# ── Public: rewrite full resume (all sections at once as JSON) ────────────────

def call_groq(
    resume_text:     str,
    company:         str,
    role:            str,
    experience:      str  = "Fresher",
    ats_score:       int  = 50,
    missing_skills:  list = None,
    matched_skills:  list = None,
    required_skills: list = None,
) -> dict:
    """
    Call Groq and return a structured dict with all resume sections improved.
    A fresh seed is injected every call → different output every time.
    Raises RuntimeError on failure.
    """
    client        = _groq_client()
    seed          = _make_seed()
    missing_str   = ", ".join((missing_skills  or [])[:8]) or "None identified"
    matched_str   = ", ".join((matched_skills  or [])[:8]) or "None identified"
    required_str  = ", ".join((required_skills or [])[:10]) or "Not specified"
    exp_label     = experience or "Fresher"

    prompt = f"""[Request ID: {seed}]
You are an expert AI Resume Coach. Generate personalized improvements for a
{exp_label} candidate applying to {company} as {role}.

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
Return ONLY a valid JSON object. No markdown. No extra text.
Use DIFFERENT wording and action verbs from any previous response.

{{
  "summary": "2-3 sentence professional summary for {company} / {role}.",
  "experience": "3 rewritten bullet points with strong verbs, metrics, and {company}-keywords.",
  "projects": "2 project bullets with tech stack and measurable impact.",
  "skills": "Comma-separated optimised skills list including missing skills.",
  "ats_keywords": ["kw1","kw2","kw3","kw4","kw5","kw6","kw7","kw8"],
  "grammar_improvements": ["Fix1","Fix2","Fix3"],
  "formatting_suggestions": ["Tip1","Tip2","Tip3"],
  "estimated_ats_score": 85,
  "improvement_summary": "One sentence on the biggest improvement for {company}."
}}

Rules:
- estimated_ats_score must be an integer > {ats_score}
- ats_keywords, grammar_improvements, formatting_suggestions must be JSON arrays
- Do NOT wrap in markdown code blocks
"""

    print(f"[groq_service] call_groq: model={GROQ_MODEL} "
          f"company={company} role={role} ats={ats_score}% seed={seed}")

    try:
        resp = client.chat.completions.create(
            model       = GROQ_MODEL,
            messages    = [{"role": "user", "content": prompt}],
            temperature = 0.9,
            top_p       = 0.95,
            max_tokens  = 1500,
        )
    except Exception as exc:
        raise RuntimeError(f"Groq API call failed: {exc}") from exc

    raw = _strip_fences(resp.choices[0].message.content)
    print(f"[groq_service] call_groq raw length: {len(raw)} chars")

    try:
        result = json.loads(raw)
    except json.JSONDecodeError as exc:
        print(f"[groq_service] JSON parse failed: {exc}\nRaw:\n{raw[:400]}")
        raise RuntimeError("Groq returned an invalid response. Please try again.") from exc

    # Fill any missing keys with safe defaults
    defaults = {
        "summary":               f"Motivated {role} with expertise in {required_str[:40]}.",
        "experience":            "• Engineered solutions delivering measurable impact.\n• Collaborated cross-functionally.\n• Improved system performance.",
        "projects":              "• Full-Stack Project | React, Python, PostgreSQL\n  Served 1,000+ daily users with 99.9% uptime.",
        "skills":                ", ".join((matched_skills or []) + (missing_skills or [])[:5]),
        "ats_keywords":          (missing_skills or [])[:8],
        "grammar_improvements":  ["Use consistent verb tense.", "Start bullets with action verbs."],
        "formatting_suggestions":["Use ATS-friendly single-column layout.", "Keep to one page."],
        "estimated_ats_score":   min(99, ats_score + 18),
        "improvement_summary":   f"Adding {company}-specific keywords will significantly boost your score.",
    }
    for k, v in defaults.items():
        if k not in result or result[k] is None:
            result[k] = v

    for lk in ("ats_keywords", "grammar_improvements", "formatting_suggestions"):
        if isinstance(result[lk], str):
            result[lk] = [s.strip() for s in result[lk].split(",") if s.strip()]

    try:
        result["estimated_ats_score"] = int(result["estimated_ats_score"])
    except (ValueError, TypeError):
        result["estimated_ats_score"] = defaults["estimated_ats_score"]

    print(f"[groq_service] call_groq estimated ATS: {result['estimated_ats_score']}%")
    return result
