from flask import Flask, jsonify, request
from flask_cors import CORS
import os

from utils.resume_parser import extract_text_from_pdf
from utils.skill_extractor import extract_skills
from utils.ats_score import calculate_resume_score

app = Flask(__name__)

# Allow requests from React frontend
CORS(app, origins=["http://localhost:5173"])

# Upload folder
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


# Home Route
@app.route("/")
def home():
    return jsonify({
        "message": "AI Placement Readiness Platform Backend Running 🚀"
    })


# Resume Upload Route
@app.route("/upload", methods=["POST"])
def upload_resume():

    # Check if file is uploaded
    if "resume" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["resume"]

    # Check if filename is empty
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    # Save uploaded file
    filename = file.filename
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    # Extract text from PDF
    resume_text = extract_text_from_pdf(filepath)

    # Extract skills
    skills = extract_skills(resume_text)

    # Calculate ATS Score
    ats = calculate_resume_score(skills, resume_text)

    # Send response
    return jsonify({
        "message": "Resume uploaded successfully",
        "filename": filename,
        "resume_text": resume_text,
        "skills": skills,
        "ats": ats
    })


if __name__ == "__main__":
    app.run(debug=True)
    print("========== RESUME TEXT ==========")
print(resume_text)
print("=================================")