from flask import Flask, jsonify, request
from flask_cors import CORS
import os

from utils.resume_parser      import extract_text_from_pdf
from utils.skill_extractor    import extract_skills
from utils.ats_score          import calculate_ats_score
from utils.learning_generator import generate_learning_plan
from utils.interview_generator import generate_interview_questions
from data.companies import (
    COMPANIES,
    get_required_skills,
    get_role_data,
    get_company_meta,
    get_all_companies_meta,
    get_roles_for_company,
)

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173", "http://localhost:5174"])

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# In-process resume session (one user at a time)
LATEST_RESUME = {"text": "", "skills": [], "filename": ""}


# ─────────────────────────────────────────────────────────────
# Home
# ─────────────────────────────────────────────────────────────
@app.route("/")
def home():
    return jsonify({"message": "AI Placement Readiness Platform Backend Running 🚀"})


# ─────────────────────────────────────────────────────────────
# GET /companies  — dropdown data for the frontend
# Returns every company's name, roles list, package, difficulty,
# logo, locations, and description.
# ─────────────────────────────────────────────────────────────
@app.route("/companies", methods=["GET"])
def list_companies():
    return jsonify(get_all_companies_meta())


# ─────────────────────────────────────────────────────────────
# GET /companies/<name>/roles
# Returns the roles list + company meta for a single company.
# ─────────────────────────────────────────────────────────────
@app.route("/companies/<company_name>/roles", methods=["GET"])
def company_roles(company_name):
    meta = get_company_meta(company_name)
    if not meta["roles"]:
        return jsonify({"error": f"Company '{company_name}' not found."}), 404
    return jsonify(meta)


# ─────────────────────────────────────────────────────────────
# POST /upload
# ─────────────────────────────────────────────────────────────
@app.route("/upload", methods=["POST"])
def upload_resume():
    if "resume" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["resume"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    filename = file.filename
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    resume_text = extract_text_from_pdf(filepath)
    skills      = extract_skills(resume_text)

    LATEST_RESUME["text"]     = resume_text
    LATEST_RESUME["skills"]   = skills
    LATEST_RESUME["filename"] = filename

    print("\n===== RESUME UPLOADED =====")
    print("Filename:", filename)
    print("Skills Found:", skills)

    return jsonify({"message": "Resume uploaded successfully", "filename": filename})


# ─────────────────────────────────────────────────────────────
# POST /analyze
# Body: { company, role, experience }
# Returns full analysis + company_details + learning_plan
# ─────────────────────────────────────────────────────────────
@app.route("/analyze", methods=["POST"])
def analyze_resume():
    print("\n===== ANALYZE API CALLED =====")

    if not LATEST_RESUME["text"]:
        return jsonify({"error": "Please upload a resume first."}), 400

    body       = request.get_json() or {}
    company    = body.get("company", "")
    role       = body.get("role", "")
    experience = body.get("experience", "Fresher")

    print(f"Company: {company}  Role: {role}  Experience: {experience}")

    # ── Fetch role data ──────────────────────────────────────
    required_skills = get_required_skills(company, role)
    role_data       = get_role_data(company, role)
    company_meta    = get_company_meta(company)

    if not required_skills:
        return jsonify({"error": f"Company '{company}' or role '{role}' not found."}), 404

    resume_text     = LATEST_RESUME["text"]
    detected_skills = LATEST_RESUME["skills"]
    skills_lower    = {s.lower() for s in detected_skills}

    matched_skills = [s for s in required_skills if s.lower() in skills_lower]
    missing_skills = [s for s in required_skills if s.lower() not in skills_lower]

    # Preferred skills gap
    preferred_skills   = role_data.get("preferred_skills", []) if isinstance(role_data, dict) else []
    preferred_missing  = [s for s in preferred_skills if s.lower() not in skills_lower]

    # ── ATS score ────────────────────────────────────────────
    ats = calculate_ats_score(resume_text, matched_skills, required_skills)

    # ── Skill-match percentage ───────────────────────────────
    skill_match_pct = round(len(matched_skills) / len(required_skills) * 100) if required_skills else 0

    # ── Placement readiness level ────────────────────────────
    overall = ats["overall_score"]
    if overall >= 85:
        placement_level = "Excellent Candidate"
    elif overall >= 70:
        placement_level = "Strong Candidate"
    elif overall >= 55:
        placement_level = "Average Candidate"
    else:
        placement_level = "Needs Improvement"

    # ── Recommendations ──────────────────────────────────────
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
        recommendations.append("Add quantified project impacts to your resume to improve ATS score.")
    if "github" not in resume_text.lower():
        recommendations.append("Include your GitHub profile link in the resume.")

    # ── Learning plan (reuses existing generator) ────────────
    learning_plan = generate_learning_plan(
        detected_skills=detected_skills,
        missing_skills=missing_skills,
        ats_score=overall,
    )

    # ── Skill groups (from role data) ────────────────────────
    skill_groups = role_data.get("skill_groups", {}) if isinstance(role_data, dict) else {}

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
            "package":          role_data.get("package", "") if isinstance(role_data, dict) else "",
            "difficulty":       role_data.get("difficulty", "") if isinstance(role_data, dict) else "",
            "hiring_category":  role_data.get("hiring_category", "") if isinstance(role_data, dict) else "",
            "role_description": role_data.get("role_description", "") if isinstance(role_data, dict) else "",
        },
        # Learning
        "learning_plan": learning_plan,
        # Legacy upload flag consumed by frontend
        "uploaded": True,
    })


# ─────────────────────────────────────────────────────────────
# POST /learning
# Body (optional): { detected_skills, missing_skills, ats_score }
# Falls back to LATEST_RESUME when body is empty.
# ─────────────────────────────────────────────────────────────
@app.route("/learning", methods=["GET", "POST"])
def learning():
    body = request.get_json(silent=True) or {}

    detected_skills = body.get("detected_skills") or LATEST_RESUME["skills"]
    missing_skills  = body.get("missing_skills",  [])
    ats_score       = body.get("ats_score",       50)

    if not detected_skills and not missing_skills:
        # No resume uploaded and no body — return generic plan
        missing_skills  = ["DSA", "System Design", "SQL", "Docker", "Git"]
        detected_skills = ["Python", "Java", "OOP", "HTML", "CSS"]

    plan = generate_learning_plan(
        detected_skills=detected_skills,
        missing_skills=missing_skills,
        ats_score=int(ats_score),
    )

    return jsonify(plan)


# ─────────────────────────────────────────────────────────────
# POST /generate-interview
# Body: { company, role, experience }
#
# Returns 10 interview questions distributed as:
#   4 × Technical  |  2 × Coding  |  2 × Behavioral  |  2 × HR
# Each question: { id, type, question }
# ─────────────────────────────────────────────────────────────
@app.route("/generate-interview", methods=["POST"])
def generate_interview():
    body = request.get_json(silent=True) or {}

    company    = body.get("company",    "").strip()
    role       = body.get("role",       "").strip()
    experience = body.get("experience", "Fresher").strip()

    print(f"\n===== GENERATE-INTERVIEW =====")
    print(f"Company: {company}  Role: {role}  Experience: {experience}")

    if not company or not role:
        return jsonify({"error": "company and role are required."}), 400

    questions = generate_interview_questions(
        company=company,
        role=role,
        experience=experience,
    )

    summary = {
        "Technical":  sum(1 for q in questions if q["type"] == "Technical"),
        "Coding":     sum(1 for q in questions if q["type"] == "Coding"),
        "Behavioral": sum(1 for q in questions if q["type"] == "Behavioral"),
        "HR":         sum(1 for q in questions if q["type"] == "HR"),
    }

    print(f"Generated {len(questions)} questions — {summary}")

    return jsonify({
        "company":    company,
        "role":       role,
        "experience": experience,
        "total":      len(questions),
        "summary":    summary,
        "questions":  questions,
    })


# ─────────────────────────────────────────────────────────────
# POST /mock-interview  (existing — unchanged)
# ─────────────────────────────────────────────────────────────
@app.route("/mock-interview", methods=["POST"])
def mock_interview():
    body       = request.get_json() or {}
    company    = body.get("company",    "Google")
    role       = body.get("role",       "Software Engineer")
    difficulty = body.get("difficulty", "Medium")
    num_q      = int(body.get("questions", 10))

    required = get_required_skills(company, role)

    questions = [
        {"id": i + 1, "question": f"Explain your experience with {skill} and how you have used it in a project."}
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
        for i, q in enumerate(generic):
            if len(questions) >= num_q:
                break
            questions.append({"id": len(questions) + 1, "question": q})

    return jsonify({"questions": questions[:num_q]})


# ─────────────────────────────────────────────────────────────
# POST /mock-interview/evaluate  (existing — unchanged)
# ─────────────────────────────────────────────────────────────
@app.route("/mock-interview/evaluate", methods=["POST"])
def evaluate_interview():
    body    = request.get_json() or {}
    answers = body.get("answers", {})
    config  = body.get("config", {})

    answered = sum(1 for v in answers.values() if str(v).strip())
    total    = len(answers) or 1

    base             = round((answered / total) * 100)
    overall_score    = min(95, max(35, base))
    technical_score  = min(95, max(30, overall_score - 5))
    comm_score       = min(95, max(40, overall_score + 3))
    conf_score       = min(95, max(35, overall_score - 2))

    grade = "A" if overall_score >= 85 else "B" if overall_score >= 70 else "C" if overall_score >= 55 else "D"

    company  = config.get("company", "")
    required = get_required_skills(company, config.get("role", ""))

    strong = required[:max(1, len(required) // 2)]
    weak   = required[max(1, len(required) // 2):]

    return jsonify({
        "overall_score":       overall_score,
        "technical_score":     technical_score,
        "communication_score": comm_score,
        "confidence_score":    conf_score,
        "grade":               grade,
        "strong_areas":        strong[:4],
        "weak_areas":          weak[:4],
        "suggestions": [
            "Structure answers with STAR format for behavioural questions.",
            "Always mention time/space complexity for DSA answers.",
            "Relate examples to real projects you have built.",
            "Ask clarifying questions before jumping into solutions.",
            f"Review the core {company} engineering principles before your next attempt.",
        ],
        "skill_breakdown": [
            {"skill": "Data Structures", "score": technical_score},
            {"skill": "System Design",   "score": max(30, technical_score - 8)},
            {"skill": "Communication",   "score": comm_score},
            {"skill": "Problem Solving", "score": max(35, overall_score - 3)},
        ],
    })


if __name__ == "__main__":
    app.run(debug=True)
