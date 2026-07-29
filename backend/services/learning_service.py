# services/learning_service.py
# ─────────────────────────────────────────────────────────────────────────────
# Database persistence for learning plans.
# The actual plan generation stays in utils/learning_generator.py.
# ─────────────────────────────────────────────────────────────────────────────

from datetime import datetime, timezone

from database import db
from models.learning import LearningPlan
from utils.learning_generator import generate_learning_plan as _generate


def generate_and_save_plan(
    detected_skills: list,
    missing_skills:  list,
    ats_score:       int,
    user_id:         int  = None,
    company_name:    str  = "",
    role_name:       str  = "",
    company_id:      int  = None,
    role_id:         int  = None,
) -> dict:
    """
    Generate a learning plan using the rule-based engine and persist it.
    Returns the full plan dict (same shape as before — frontend unchanged).
    """
    plan_data = _generate(
        detected_skills=detected_skills,
        missing_skills=missing_skills,
        ats_score=ats_score,
    )

    # Persist if we have enough context (user or company/role)
    if user_id or company_id:
        try:
            record = LearningPlan(
                user_id      = user_id,
                company_id   = company_id,
                role_id      = role_id,
                company_name = company_name or "",
                role_name    = role_name or "",
                progress     = plan_data.get("overallProgress", 0),
                created_at   = datetime.now(timezone.utc),
            )
            record.roadmap = plan_data.get("roadmap", [])
            db.session.add(record)
            db.session.commit()
        except Exception as exc:
            db.session.rollback()
            # Non-fatal: plan still returned even if DB write fails
            print(f"[learning_service] Warning: could not persist plan: {exc}")

    return plan_data
