from flask import Flask, jsonify, request
from flask_cors import CORS
import os

from utils.resume_parser import extract_text_from_pdf
from utils.skill_extractor import extract_skills
from utils.ats_score import calculate_ats_score
from data.companies import COMPANIES

app = Flask(__name__)

# Allow requests from React frontend
CORS(app, origins=["http://localhost:5173"])

# Upload folder
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Store latest uploaded resume (temporary)
LATEST_RESUME = {
    "text": "",
    "skills": [],
    "filename": ""
}


# ---------------------------------------
# Home Route
# ---------------------------------------
@app.route("/")
def home():
    return jsonify({
        "message": "AI Placement Readiness Platform Backend Running 🚀"
    })


# ---------------------------------------
# Upload Resume
# ---------------------------------------
@app.route("/upload", methods=["POST"])
def upload_resume():http://127.0.0.1:5000

    if "resume" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["resume"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    filename = file.filename
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)

    file.save(filepath)

    # Extract resume text
    resume_text = extract_text_from_pdf(filepath)

    # Extract skills
    skills = extract_skills(resume_text)

    # Store resume temporarily
    LATEST_RESUME["text"] = resume_text
    LATEST_RESUME["skills"] = skills
    LATEST_RESUME["filename"] = filename

    return jsonify({
        "message": "Resume uploaded successfully",
        "filename": filename
    })


# ---------------------------------------
# Analyze Resume
# ---------------------------------------
@app.route("/analyze", methods=["POST"])
def analyze_resume():

    if LATEST_RESUME["text"] == "":
        return jsonify({
            "error": "Please upload a resume first."
        }), 400

    data = request.get_json()

    company = data.get("company")
    role = data.get("role")
    experience = data.get("experience")

    print(company)
    print(role)
    print(experience)

    # Get required skills
    required_skills = COMPANIES.get(company, {}).get(role)

    if not required_skills:
        return jsonify({
            "error": "Company or Role not found"
        }), 404

    resume_text = LATEST_RESUME["text"]
    skills = LATEST_RESUME["skills"]

    matched_skills = [
        skill for skill in required_skills
        if skill.lower() in [s.lower() for s in skills]
    ]

    missing_skills = [
        skill for skill in required_skills
        if skill not in matched_skills
    ]

    ats = calculate_ats_score(
        resume_text,
        matched_skills,
        required_skills
    )

    return jsonify({

        "company": company,

        "role": role,

        "experience": experience,

        "skills": skills,

        "required_skills": required_skills,

        "matched_skills": matched_skills,

        "missing_skills": missing_skills,

        "ats": ats

    })


if __name__ == "__main__":
    app.run(debug=True)