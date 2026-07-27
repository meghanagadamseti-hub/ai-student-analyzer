# utils/ats_score.py
# ─────────────────────────────────────────────────────────────────────────────
# Calculates an ATS-style resume score on five weighted dimensions:
#
#   Dimension          Weight   Description
#   ─────────────────  ──────   ────────────────────────────────────────────
#   Skill Match          50%    How many required skills are present
#   Resume Sections      20%    Presence of standard resume sections
#   Projects & Links     15%    GitHub, project descriptions, live URLs
#   Experience           10%    Work experience and internship signals
#   Resume Quality        5%    Length, formatting, grammar heuristics
#
# Overall score is clamped to [0, 100].
# The floor is removed so a resume with no matching skills correctly scores low.
# ─────────────────────────────────────────────────────────────────────────────

import re


def calculate_ats_score(
    resume_text: str,
    matched_skills: list,
    required_skills: list,
) -> dict:
    """
    Parameters
    ----------
    resume_text     : raw text extracted from the resume PDF
    matched_skills  : skills present in both the resume and the role requirement
    required_skills : full list of skills the selected role requires

    Returns
    -------
    dict with keys:
        overall_score     int   0-100
        skill_score       int   0-100  (raw skill match %)
        section_score     int   0-100
        project_score     int   0-100
        experience_score  int   0-100
        quality_score     int   0-100
    """
    text = resume_text or ""
    low  = text.lower()

    # ── 1. Skill Match  (50%) ─────────────────────────────────────────────
    if required_skills:
        skill_score = round((len(matched_skills) / len(required_skills)) * 100)
    else:
        skill_score = 0

    # ── 2. Resume Sections  (20%) ─────────────────────────────────────────
    section_keywords = {
        "contact":       ["contact", "email", "phone", "linkedin", "github"],
        "education":     ["education", "b.tech", "b.e.", "bachelor", "university",
                          "college", "degree", "cgpa", "gpa"],
        "skills":        ["skills", "technical skills", "technologies", "tech stack"],
        "projects":      ["project", "projects", "work done", "portfolio"],
        "experience":    ["experience", "internship", "intern", "work experience",
                          "employment", "worked at"],
        "achievements":  ["achievement", "award", "certification", "certificate",
                          "competition", "hackathon"],
    }
    found_sections = 0
    for _section, signals in section_keywords.items():
        if any(sig in low for sig in signals):
            found_sections += 1
    section_score = round((found_sections / len(section_keywords)) * 100)

    # ── 3. Projects & Links  (15%) ────────────────────────────────────────
    project_score = 0
    if "project" in low:
        project_score += 40
    if "github" in low or "github.com" in low:
        project_score += 25
    if re.search(r"https?://", low):
        project_score += 20
    if "deployed" in low or "live" in low or "production" in low:
        project_score += 15
    project_score = min(project_score, 100)

    # ── 4. Experience  (10%) ──────────────────────────────────────────────
    experience_score = 0
    exp_signals = [
        "intern", "internship", "experience", "worked", "developer",
        "engineer", "analyst", "associate", "position", "role",
    ]
    for sig in exp_signals:
        if sig in low:
            experience_score += 12
    experience_score = min(experience_score, 100)

    # ── 5. Resume Quality  (5%) ───────────────────────────────────────────
    quality_score = 100
    word_count = len(text.split())
    if word_count < 150:
        quality_score -= 30
    elif word_count < 300:
        quality_score -= 15
    if len(text.splitlines()) < 10:
        quality_score -= 20
    double_spaces = len(re.findall(r" {3,}", text))
    quality_score -= min(double_spaces * 3, 20)
    quality_score = max(0, min(quality_score, 100))

    # ── Overall weighted score ─────────────────────────────────────────────
    overall = round(
        skill_score       * 0.50 +
        section_score     * 0.20 +
        project_score     * 0.15 +
        experience_score  * 0.10 +
        quality_score     * 0.05
    )
    overall = max(0, min(overall, 100))

    return {
        "overall_score":    overall,
        "skill_score":      skill_score,
        "section_score":    section_score,
        "project_score":    project_score,
        "experience_score": experience_score,
        "quality_score":    quality_score,
    }
