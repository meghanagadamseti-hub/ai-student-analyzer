# services/interview_service.py
# ─────────────────────────────────────────────────────────────────────────────
# Database persistence for mock interviews and their questions/answers.
# Generation logic stays in utils/interview_generator.py.
# ─────────────────────────────────────────────────────────────────────────────

from datetime import datetime, timezone

from database import db
from models.interview import MockInterview, InterviewQuestion
from utils.interview_generator import generate_interview_questions as _generate
from utils.answer_evaluator    import evaluate_answer as _evaluate


def generate_and_save_interview(
    company:     str,
    role:        str,
    experience:  str  = "Fresher",
    user_id:     int  = None,
    company_id:  int  = None,
    role_id:     int  = None,
) -> dict:
    """
    Generate interview questions and create a MockInterview record.
    Returns { company, role, experience, total, summary, questions, interview_id }.
    """
    questions_data = _generate(
        company=company,
        role=role,
        experience=experience,
    )

    summary = {
        "Technical":  sum(1 for q in questions_data if q["type"] == "Technical"),
        "Coding":     sum(1 for q in questions_data if q["type"] == "Coding"),
        "Behavioral": sum(1 for q in questions_data if q["type"] == "Behavioral"),
        "HR":         sum(1 for q in questions_data if q["type"] == "HR"),
    }

    interview_id = None
    try:
        interview = MockInterview(
            user_id      = user_id,
            company_id   = company_id,
            role_id      = role_id,
            company_name = company,
            role_name    = role,
            experience   = experience,
            completed_at = datetime.now(timezone.utc),
        )
        interview.feedback = []
        db.session.add(interview)
        db.session.flush()   # get interview.id before committing

        # Persist each question (answers saved later via submit_answer)
        for q in questions_data:
            iq = InterviewQuestion(
                interview_id  = interview.id,
                question      = q["question"],
                question_type = q["type"],
            )
            db.session.add(iq)

        db.session.commit()
        interview_id = interview.id
    except Exception as exc:
        db.session.rollback()
        print(f"[interview_service] Warning: could not persist interview: {exc}")

    return {
        "company":      company,
        "role":         role,
        "experience":   experience,
        "total":        len(questions_data),
        "summary":      summary,
        "questions":    questions_data,
        "interview_id": interview_id,
    }


def save_answer(
    interview_id: int,
    question:     str,
    answer:       str,
) -> dict:
    """
    Evaluate an answer, persist it, and return the evaluation result.
    Returns the same shape as utils/answer_evaluator.evaluate_answer().
    """
    result = _evaluate(question=question, answer=answer)

    try:
        # Find the matching InterviewQuestion row
        iq = (
            InterviewQuestion.query
            .filter_by(interview_id=interview_id)
            .filter(InterviewQuestion.question == question)
            .first()
        )
        if iq:
            iq.answer      = answer
            iq.ai_feedback = result.get("feedback", "")
            iq.score       = result.get("score", 0)
            db.session.commit()
    except Exception as exc:
        db.session.rollback()
        print(f"[interview_service] Warning: could not persist answer: {exc}")

    return result


def finalize_interview(interview_id: int, answers: dict, config: dict) -> dict:
    """
    Score a completed mock interview and update the MockInterview record.
    Mirrors the old /mock-interview/evaluate response shape exactly.
    """
    answered = sum(1 for v in answers.values() if str(v).strip())
    total    = len(answers) or 1

    base          = round((answered / total) * 100)
    overall_score = min(95, max(35, base))
    tech_score    = min(95, max(30, overall_score - 5))
    comm_score    = min(95, max(40, overall_score + 3))
    conf_score    = min(95, max(35, overall_score - 2))

    grade   = ("A" if overall_score >= 85 else
               "B" if overall_score >= 70 else
               "C" if overall_score >= 55 else "D")

    company = config.get("company", "")
    role    = config.get("role", "")

    # Fetch required skills for strong/weak breakdown
    from services.company_service import get_required_skills
    required = get_required_skills(company, role)
    strong   = required[:max(1, len(required) // 2)]
    weak     = required[max(1, len(required) // 2):]

    suggestions = [
        "Structure answers with STAR format for behavioural questions.",
        "Always mention time/space complexity for DSA answers.",
        "Relate examples to real projects you have built.",
        "Ask clarifying questions before jumping into solutions.",
        f"Review the core {company} engineering principles before your next attempt.",
    ]

    result = {
        "overall_score":       overall_score,
        "technical_score":     tech_score,
        "communication_score": comm_score,
        "confidence_score":    conf_score,
        "grade":               grade,
        "strong_areas":        strong[:4],
        "weak_areas":          weak[:4],
        "suggestions":         suggestions,
        "skill_breakdown": [
            {"skill": "Data Structures", "score": tech_score},
            {"skill": "System Design",   "score": max(30, tech_score - 8)},
            {"skill": "Communication",   "score": comm_score},
            {"skill": "Problem Solving", "score": max(35, overall_score - 3)},
        ],
    }

    # Persist the final score
    try:
        if interview_id:
            interview = MockInterview.query.get(interview_id)
            if interview:
                interview.score = overall_score
                db.session.commit()
    except Exception as exc:
        db.session.rollback()
        print(f"[interview_service] Warning: could not update interview score: {exc}")

    return result
