# routes/interview_routes.py
# ─────────────────────────────────────────────────────────────────────────────
# POST /generate-interview          — generate questions + create DB record
# POST /submit-answer               — evaluate one answer + save to DB
# POST /mock-interview              — legacy skill-based questions
# POST /mock-interview/evaluate     — score a completed mock interview
#
# All response shapes are IDENTICAL to the old app.py routes.
# ─────────────────────────────────────────────────────────────────────────────

from flask import Blueprint, jsonify, request

from services.interview_service import (
    generate_and_save_interview,
    save_answer,
    finalize_interview,
)
from services.company_service import get_required_skills
from utils.answer_evaluator   import evaluate_answer

interview_bp = Blueprint("interview", __name__)


# ─────────────────────────────────────────────────────────────────────────────
# POST /generate-interview
# ─────────────────────────────────────────────────────────────────────────────
@interview_bp.route("/generate-interview", methods=["POST"])
def generate_interview():
    body = request.get_json(silent=True) or {}

    company    = (body.get("company",    "") or "").strip()
    role       = (body.get("role",       "") or "").strip()
    experience = (body.get("experience", "Fresher") or "Fresher").strip()
    user_id    = body.get("user_id")

    print(f"\n===== GENERATE-INTERVIEW =====")
    print(f"Company: {company}  Role: {role}  Experience: {experience}")

    if not company or not role:
        return jsonify({"error": "company and role are required."}), 400

    try:
        from services.company_service import get_company_and_role_ids
        company_id, role_id = get_company_and_role_ids(company, role)

        result = generate_and_save_interview(
            company    = company,
            role       = role,
            experience = experience,
            user_id    = user_id,
            company_id = company_id,
            role_id    = role_id,
        )
        print(f"Generated {result['total']} questions — {result['summary']}")
        return jsonify(result)
    except Exception as exc:
        return jsonify({"error": f"Failed to generate interview: {exc}"}), 500


# ─────────────────────────────────────────────────────────────────────────────
# POST /submit-answer
# ─────────────────────────────────────────────────────────────────────────────
@interview_bp.route("/submit-answer", methods=["POST"])
def submit_answer():
    body = request.get_json(silent=True) or {}

    question     = (body.get("question")     or "").strip()
    answer       = (body.get("answer")       or "").strip()
    interview_id = body.get("interview_id")   # optional — present when using new flow

    print(f"\n===== SUBMIT-ANSWER =====")
    print(f"Q: {question[:80]}")
    print(f"A: {answer[:80]}")

    if not question:
        return jsonify({"error": "question is required."}), 400

    try:
        if interview_id:
            result = save_answer(
                interview_id = interview_id,
                question     = question,
                answer       = answer,
            )
        else:
            # Legacy path: no DB persistence, just evaluate
            result = evaluate_answer(question=question, answer=answer)

        return jsonify(result)
    except Exception as exc:
        return jsonify({"error": f"Failed to evaluate answer: {exc}"}), 500


# ─────────────────────────────────────────────────────────────────────────────
# POST /mock-interview  (legacy — unchanged behaviour)
# ─────────────────────────────────────────────────────────────────────────────
@interview_bp.route("/mock-interview", methods=["POST"])
def mock_interview():
    body       = request.get_json() or {}
    company    = body.get("company",    "Google")
    role       = body.get("role",       "Software Engineer")
    num_q      = int(body.get("questions", 10))

    required = get_required_skills(company, role)

    questions = [
        {
            "id":       i + 1,
            "question": (
                f"Explain your experience with {skill} "
                f"and how you have used it in a project."
            ),
        }
        for i, skill in enumerate(required[:num_q])
    ]

    if len(questions) < num_q:
        generic = [
            "Describe a challenging technical problem you solved.",
            "How do you approach system design for a high-traffic application?",
            "Explain a time you optimised the performance of a system.",
            "How do you handle disagreements in a team?",
            "What is your approach to writing clean, maintainable code?",
        ]
        for q in generic:
            if len(questions) >= num_q:
                break
            questions.append({"id": len(questions) + 1, "question": q})

    return jsonify({"questions": questions[:num_q]})


# ─────────────────────────────────────────────────────────────────────────────
# POST /mock-interview/evaluate  (legacy — unchanged behaviour)
# ─────────────────────────────────────────────────────────────────────────────
@interview_bp.route("/mock-interview/evaluate", methods=["POST"])
def evaluate_interview():
    body         = request.get_json() or {}
    answers      = body.get("answers", {})
    config       = body.get("config",  {})
    interview_id = body.get("interview_id")  # optional

    try:
        result = finalize_interview(
            interview_id = interview_id,
            answers      = answers,
            config       = config,
        )
        return jsonify(result)
    except Exception as exc:
        return jsonify({"error": f"Failed to evaluate interview: {exc}"}), 500
