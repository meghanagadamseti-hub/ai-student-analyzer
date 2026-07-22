# utils/ats_score.py

import re

def calculate_ats_score(resume_text, matched_skills, required_skills):

    resume_lower = resume_text.lower()

    # -------------------------
    # ATS Parse Rate
    # -------------------------
    ats_parse = 100

    if "|" in resume_text:
        ats_parse -= 10

    if len(resume_text) < 500:
        ats_parse -= 15

    ats_parse = max(60, ats_parse)

    # -------------------------
    # Resume Sections
    # -------------------------
    sections = [
        "contact",
        "education",
        "skills",
        "projects",
        "experience",
        "certification"
    ]

    found_sections = 0

    for section in sections:
        if section in resume_lower:
            found_sections += 1

    section_score = round((found_sections / len(sections)) * 100)

    # -------------------------
    # Skill Match
    # -------------------------
    if required_skills:
        skill_score = round(
            (len(matched_skills) / len(required_skills)) * 100
        )
    else:
        skill_score = 0

    # -------------------------
    # Project Score
    # -------------------------
    project_score = 30

    if "project" in resume_lower:
        project_score += 30

    if "github" in resume_lower:
        project_score += 20

    if "http" in resume_lower:
        project_score += 10

    if "react" in resume_lower or "python" in resume_lower:
        project_score += 10

    project_score = min(project_score, 100)

    # -------------------------
    # Experience
    # -------------------------
    experience_score = 20

    experience_keywords = [
        "intern",
        "experience",
        "worked",
        "developer",
        "engineer"
    ]

    for word in experience_keywords:
        if word in resume_lower:
            experience_score += 15

    experience_score = min(experience_score, 100)

    # -------------------------
    # Grammar (basic heuristic)
    # -------------------------
    grammar_score = 90

    repeated_spaces = len(re.findall(r" {2,}", resume_text))
    grammar_score -= repeated_spaces * 2

    grammar_score = max(60, grammar_score)

    # -------------------------
    # Formatting
    # -------------------------
    formatting_score = 100

    if len(resume_text.splitlines()) < 15:
        formatting_score -= 20

    if len(resume_text) < 700:
        formatting_score -= 10

    formatting_score = max(60, formatting_score)

    # -------------------------
    # Overall ATS Score
    # -------------------------
    overall_score = round(
        ats_parse * 0.15 +
        section_score * 0.20 +
        skill_score * 0.30 +
        project_score * 0.15 +
        experience_score * 0.10 +
        grammar_score * 0.05 +
        formatting_score * 0.05
    )

    overall_score = max(35, min(overall_score, 100))

    return {
        "overall_score": overall_score,
        "ats_parse": ats_parse,
        "section_score": section_score,
        "skill_score": skill_score,
        "project_score": project_score,
        "experience_score": experience_score,
        "grammar_score": grammar_score,
        "formatting_score": formatting_score,
    }