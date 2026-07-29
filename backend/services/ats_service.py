# services/ats_service.py
# ─────────────────────────────────────────────────────────────────────────────
# Thin service wrapper around utils/ats_score.py.
# Keeps route handlers clean and makes the scoring logic easily mockable.
# ─────────────────────────────────────────────────────────────────────────────

from utils.ats_score import calculate_ats_score as _calculate


def calculate_ats_score(
    resume_text: str,
    matched_skills: list,
    required_skills: list,
) -> dict:
    """
    Delegate to the utility function and return the score dict.
    Keys: overall_score, skill_score, section_score,
          project_score, experience_score, quality_score
    """
    return _calculate(resume_text, matched_skills, required_skills)


# ── Skill-matching helper ────────────────────────────────────────────────────
# Kept here (not in the util) because it needs the expand map which is
# business logic, not pure scoring maths.

EXPAND = {
    "dsa":               {"dsa", "data structures", "algorithms",
                          "data structures & algorithms",
                          "data structures and algorithms"},
    "oop":               {"oop", "oops", "object oriented programming",
                          "object-oriented programming"},
    "dbms":              {"dbms", "database management",
                          "database management system"},
    "operating system":  {"operating system", "operating systems", "os"},
    "computer networks": {"computer networks", "computer network",
                          "networking", "computer networking"},
    "rest api":          {"rest api", "rest", "restful", "restful api",
                          "rest apis", "http api"},
    "node.js":           {"node.js", "nodejs", "node js"},
    "react":             {"react", "reactjs", "react.js", "react js"},
    "express.js":        {"express.js", "expressjs", "express js", "express"},
    "spring boot":       {"spring boot", "springboot"},
    "ruby on rails":     {"ruby on rails", "ror", "rails"},
    "scikit-learn":      {"scikit-learn", "scikit learn", "sklearn"},
    "ci/cd":             {"ci/cd", "cicd", "continuous integration",
                          "continuous deployment", "github actions"},
    "machine learning":  {"machine learning", "ml", "ai/ml"},
    "deep learning":     {"deep learning", "dl"},
    "system design":     {"system design"},
    "microservices":     {"microservices", "microservice",
                          "micro services", "micro-services"},
    "distributed systems": {"distributed systems", "distributed system"},
}


def match_skills(detected_skills: list, required_skills: list):
    """
    Return (matched, missing) using case-insensitive + alias expansion.

    Parameters
    ----------
    detected_skills  : skills extracted from the resume
    required_skills  : skills required by the target role

    Returns
    -------
    matched : list[str]  required skills present in the resume
    missing : list[str]  required skills absent from the resume
    """
    detected_lower = {s.lower(): s for s in detected_skills}
    detected_set   = set(detected_lower.keys())

    def _is_matched(req: str) -> bool:
        rk = req.lower()
        if rk in detected_set:
            return True
        return bool(EXPAND.get(rk, set()) & detected_set)

    matched = [s for s in required_skills if _is_matched(s)]
    missing = [s for s in required_skills if not _is_matched(s)]
    return matched, missing
