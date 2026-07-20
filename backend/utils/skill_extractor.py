# utils/skill_extractor.py

SKILLS = [
    "Python", "Java", "C", "C++", "JavaScript", "TypeScript",
    "React", "Angular", "Vue", "Node.js", "Express.js",
    "HTML", "CSS", "Bootstrap", "Tailwind CSS",
    "Flask", "Django", "FastAPI",
    "SQL", "MySQL", "PostgreSQL", "MongoDB",
    "Git", "GitHub",
    "Docker", "Kubernetes",
    "AWS", "Azure", "GCP",
    "Machine Learning", "Deep Learning",
    "TensorFlow", "PyTorch",
    "Pandas", "NumPy", "Scikit-learn",
    "REST API", "GraphQL",
    "Linux", "OOP", "DBMS",
    "Operating System", "Computer Networks", "DSA"
]


def extract_skills(resume_text):
    """
    Find technical skills mentioned in the resume.
    """

    found_skills = []

    resume_text = resume_text.lower()

    for skill in SKILLS:

        if skill.lower() in resume_text:
            found_skills.append(skill)

    return sorted(list(set(found_skills)))