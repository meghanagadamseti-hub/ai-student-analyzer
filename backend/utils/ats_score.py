def calculate_resume_score(skills, resume_text):

    score = 0

    strengths = []
    weaknesses = []
    improvements = []
    missing_skills = []

    text = resume_text.lower()

    # -------------------------
    # Contact Information (5)
    # -------------------------
    if "@" in resume_text:
        score += 5
        strengths.append("Email Address Added")
    else:
        weaknesses.append("Email Missing")
        improvements.append("Add a professional email address")

    # -------------------------
    # Education (10)
    # -------------------------
    if "education" in text:
        score += 10
        strengths.append("Education Section Present")
    else:
        weaknesses.append("Education Section Missing")
        improvements.append("Add Education details")

    # -------------------------
    # Technical Skills (15)
    # -------------------------
    skill_marks = min(len(skills) * 2, 15)
    score += skill_marks

    if len(skills) >= 7:
        strengths.append("Good Technical Skills")
    else:
        weaknesses.append("Limited Technical Skills")
        improvements.append("Learn more industry skills")

    # -------------------------
    # Projects (20)
    # -------------------------
    if "project" in text:
        score += 20
        strengths.append("Projects Included")
    else:
        weaknesses.append("No Projects")
        improvements.append("Add at least 2 Projects")

    # -------------------------
    # Internship / Experience (15)
    # -------------------------
    if "internship" in text or "experience" in text:
        score += 15
        strengths.append("Experience Mentioned")
    else:
        weaknesses.append("No Internship")
        improvements.append("Complete an Internship")

    # -------------------------
    # GitHub / Portfolio (10)
    # -------------------------
    if "github" in text:
        score += 5
        strengths.append("GitHub Profile Added")
    else:
        missing_skills.append("GitHub")
        improvements.append("Add GitHub Profile")

    if "portfolio" in text:
        score += 5
        strengths.append("Portfolio Added")
    else:
        improvements.append("Create Portfolio Website")

    # -------------------------
    # Certifications (10)
    # -------------------------
    if "certificate" in text or "certification" in text:
        score += 10
        strengths.append("Certifications Added")
    else:
        weaknesses.append("No Certifications")
        improvements.append("Complete Certifications")

    # -------------------------
    # Resume Formatting (5)
    # -------------------------
    if len(resume_text) > 800:
        score += 5
    else:
        weaknesses.append("Resume is too short")
        improvements.append("Improve Resume Content")

    # -------------------------
    # Company Skills (10)
    # -------------------------
    company_skills = [
        "Python",
        "SQL",
        "React",
        "Git",
        "Docker"
    ]

    matched = []

    for skill in company_skills:
        if skill in skills:
            matched.append(skill)
        else:
            missing_skills.append(skill)

    company_score = int((len(matched) / len(company_skills)) * 10)

    score += company_score

    # -------------------------
    # Placement Level
    # -------------------------
    if score <= 40:
        level = "🔴 Needs Major Improvement"
    elif score <= 60:
        level = "🟠 Beginner"
    elif score <= 75:
        level = "🟡 Placement Ready"
    elif score <= 90:
        level = "🟢 Strong Candidate"
    else:
        level = "⭐ Outstanding"

    potential_score = min(score + len(improvements) * 4, 100)

    return {
        "resume_score": score,
        "level": level,
        "potential_score": potential_score,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "missing_skills": list(set(missing_skills)),
        "improvements": improvements,
        "matched_skills": matched
    }