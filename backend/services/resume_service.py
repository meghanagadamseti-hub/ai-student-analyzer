# services/resume_service.py
# ─────────────────────────────────────────────────────────────────────────────
# Handles all database operations for resumes and resume analyses.
# Route handlers call these functions; no raw db.session calls in routes.
# ─────────────────────────────────────────────────────────────────────────────

from datetime import datetime, timezone

from database import db
from models.resume   import Resume
from models.analysis import ResumeAnalysis


# ── Resume CRUD ───────────────────────────────────────────────────────────────

def save_resume(filename: str, extracted_text: str, user_id: int = None) -> Resume:
    """
    Persist a newly uploaded resume to the database.
    Returns the saved Resume ORM object.
    """
    try:
        resume = Resume(
            filename       = filename,
            extracted_text = extracted_text,
            user_id        = user_id,
            uploaded_at    = datetime.now(timezone.utc),
        )
        db.session.add(resume)
        db.session.commit()
        return resume
    except Exception as exc:
        db.session.rollback()
        raise RuntimeError(f"Failed to save resume: {exc}") from exc


def get_resume_by_id(resume_id: int) -> Resume:
    """Return a Resume by primary key or None."""
    return Resume.query.get(resume_id)


def get_resumes_for_user(user_id: int) -> list:
    """
    Return all resumes uploaded by a user, newest first.
    Response shape: [{ id, filename, uploaded_at }]
    """
    resumes = (
        Resume.query
        .filter_by(user_id=user_id)
        .order_by(Resume.uploaded_at.desc())
        .all()
    )
    return [r.to_dict() for r in resumes]


# ── ResumeAnalysis CRUD ───────────────────────────────────────────────────────

def save_analysis(
    resume_id:       int,
    company_name:    str,
    role_name:       str,
    experience:      str,
    ats_score:       int,
    skill_match_pct: int,
    placement_level: str,
    matched_skills:  list,
    missing_skills:  list,
    recommendations: list,
    ats_breakdown:   dict,
    company_id:      int  = None,
    role_id:         int  = None,
) -> ResumeAnalysis:
    """
    Persist a completed ATS analysis to the database.
    Returns the saved ResumeAnalysis ORM object.
    """
    try:
        analysis = ResumeAnalysis(
            resume_id       = resume_id,
            company_id      = company_id,
            role_id         = role_id,
            company_name    = company_name,
            role_name       = role_name,
            experience      = experience,
            ats_score       = ats_score,
            skill_match_pct = skill_match_pct,
            placement_level = placement_level,
            analyzed_at     = datetime.now(timezone.utc),
        )
        analysis.matched_skills          = matched_skills
        analysis.missing_skills          = missing_skills
        analysis.improvement_suggestions = recommendations
        analysis.ats_breakdown           = ats_breakdown

        db.session.add(analysis)
        db.session.commit()
        return analysis
    except Exception as exc:
        db.session.rollback()
        raise RuntimeError(f"Failed to save analysis: {exc}") from exc


def get_analysis_history(user_id: int) -> list:
    """
    Return all analyses for resumes owned by a given user, newest first.
    Joins Resume → ResumeAnalysis.
    """
    rows = (
        db.session.query(ResumeAnalysis)
        .join(Resume, ResumeAnalysis.resume_id == Resume.id)
        .filter(Resume.user_id == user_id)
        .order_by(ResumeAnalysis.analyzed_at.desc())
        .all()
    )
    return [r.to_dict() for r in rows]
