# utils/skill_extractor.py
# ─────────────────────────────────────────────────────────────────────────────
# Extracts technical skills from resume text using:
#   1. Direct canonical skill matching (case-insensitive)
#   2. Alias / variant matching  (e.g. "ReactJS" → "React", "NodeJS" → "Node.js")
#   3. Multi-word phrase matching (e.g. "machine learning", "computer networks")
#
# Returns a sorted, deduplicated list of canonical skill names.
# ─────────────────────────────────────────────────────────────────────────────

import re

# ── Canonical skill list ───────────────────────────────────────────────────
# These are the exact strings used in companies.py required_skills lists.
# Matching is case-insensitive against resume text.

CANONICAL_SKILLS = [
    # Languages
    "Python", "Java", "C", "C++", "Go", "Rust", "Kotlin", "Swift",
    "JavaScript", "TypeScript", "PHP", "Ruby", "Scala", "R",
    "MATLAB", "Bash", "Shell", "Perl",
    # Web / Frontend
    "HTML", "CSS", "React", "Angular", "Vue", "Next.js", "Nuxt.js",
    "Bootstrap", "Tailwind CSS", "Webpack", "Redux",
    # Backend / Frameworks
    "Node.js", "Express.js", "Flask", "Django", "FastAPI",
    "Spring Boot", "Spring", "Laravel", "Rails", "Ruby on Rails",
    "ASP.NET", "Hibernate",
    # Databases
    "SQL", "MySQL", "PostgreSQL", "MongoDB", "SQLite", "Oracle DB",
    "Redis", "Cassandra", "DynamoDB", "Firebase", "Elasticsearch",
    "ElasticSearch", "HBase", "Neo4j", "Snowflake",
    # Cloud
    "AWS", "Azure", "GCP", "Google Cloud", "Heroku", "Vercel",
    "Netlify", "DigitalOcean",
    # DevOps / Infrastructure
    "Docker", "Kubernetes", "Terraform", "Ansible", "Jenkins",
    "CI/CD", "Git", "GitHub", "GitLab", "Bitbucket",
    "Linux", "Nginx", "Apache", "Vagrant", "Prometheus", "Grafana",
    # ML / AI
    "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch",
    "Scikit-learn", "Keras", "OpenCV", "NLP", "NLTK", "SpaCy",
    "Pandas", "NumPy", "Matplotlib", "Seaborn", "Spark",
    "MLflow", "Airflow", "Hadoop", "Hive", "Kafka",
    # APIs & Protocols
    "REST API", "GraphQL", "gRPC", "WebSockets", "SOAP",
    "JWT", "OAuth", "OpenAPI",
    # CS Fundamentals (as they appear in job descriptions)
    "DSA", "OOP", "DBMS", "Operating System", "Computer Networks",
    "System Design", "Microservices", "Distributed Systems",
    "Data Structures", "Algorithms",
    # Mobile
    "Android", "iOS", "React Native", "Flutter",
    "Android SDK", "Jetpack Compose",
    # Testing
    "Selenium", "Jest", "JUnit", "TestNG", "Cypress",
    "Postman", "Manual Testing", "Automation Testing",
    # Other tools & practices
    "Agile", "Scrum", "JIRA", "Confluence",
    "SAP", "Salesforce", "Power BI", "Tableau", "Excel",
]

# ── Alias / variant map ────────────────────────────────────────────────────
# Key   = lowercase string that may appear in resume text
# Value = canonical skill name (must exist in CANONICAL_SKILLS or be returned directly)
#
# Order matters for overlapping keys — more specific first.

ALIASES = {
    # React variants
    "reactjs":              "React",
    "react.js":             "React",
    "react js":             "React",
    "react native":         "React Native",

    # Node variants
    "nodejs":               "Node.js",
    "node js":              "Node.js",
    "node.js":              "Node.js",

    # Express variants
    "expressjs":            "Express.js",
    "express.js":           "Express.js",
    "express js":           "Express.js",
    "express":              "Express.js",

    # Next.js variants
    "nextjs":               "Next.js",
    "next js":              "Next.js",

    # Spring variants
    "spring boot":          "Spring Boot",
    "springboot":           "Spring Boot",

    # Ruby on Rails
    "ruby on rails":        "Ruby on Rails",
    "ror":                  "Ruby on Rails",
    "rails":                "Ruby on Rails",

    # C++ variants
    "c plus plus":          "C++",
    "cplusplus":            "C++",
    "cpp":                  "C++",

    # C# variants
    "c#":                   "C#",
    "csharp":               "C#",
    "c sharp":              "C#",

    # Java variants
    "core java":            "Java",

    # TypeScript
    "ts":                   "TypeScript",

    # Python variants
    "py":                   "Python",

    # Go / Golang
    "golang":               "Go",

    # SQL variants
    "mysql":                "MySQL",
    "postgresql":           "PostgreSQL",
    "postgres":             "PostgreSQL",
    "sqlite":               "SQLite",
    "oracle":               "Oracle DB",
    "oracle database":      "Oracle DB",
    "pl/sql":               "SQL",
    "plsql":                "SQL",
    "t-sql":                "SQL",

    # Cloud variants
    "amazon web services":  "AWS",
    "microsoft azure":      "Azure",
    "google cloud platform":"GCP",
    "google cloud":         "GCP",

    # DevOps variants
    "ci/cd":                "CI/CD",
    "cicd":                 "CI/CD",
    "continuous integration":"CI/CD",
    "continuous deployment": "CI/CD",
    "github actions":       "CI/CD",

    # Git variants
    "git/github":           "Git",
    "github":               "GitHub",
    "gitlab":               "GitLab",
    "bitbucket":            "Bitbucket",

    # ML / AI variants
    "ml":                   "Machine Learning",
    "machine learning":     "Machine Learning",
    "deep learning":        "Deep Learning",
    "dl":                   "Deep Learning",
    "artificial intelligence": "Machine Learning",
    "ai/ml":                "Machine Learning",
    "scikit learn":         "Scikit-learn",
    "sklearn":              "Scikit-learn",
    "natural language processing": "NLP",
    "computer vision":      "Deep Learning",

    # Data variants
    "data analysis":        "Pandas",
    "data science":         "Machine Learning",
    "apache spark":         "Spark",
    "apache kafka":         "Kafka",
    "apache airflow":       "Airflow",
    "apache hadoop":        "Hadoop",

    # CS Fundamentals — critical for matching company requirements
    "data structures":          "DSA",
    "data structures & algorithms": "DSA",
    "data structures and algorithms": "DSA",
    "algorithms":               "DSA",
    "dsa":                      "DSA",
    "object oriented programming": "OOP",
    "object-oriented programming": "OOP",
    "object oriented":          "OOP",
    "oops":                     "OOP",
    "oop":                      "OOP",
    "database management":      "DBMS",
    "database management system": "DBMS",
    "dbms":                     "DBMS",
    "operating systems":        "Operating System",
    "os":                       "Operating System",
    "computer network":         "Computer Networks",
    "networking":               "Computer Networks",
    "computer networking":      "Computer Networks",
    "system design":            "System Design",
    "distributed systems":      "Distributed Systems",
    "microservice":             "Microservices",
    "micro services":           "Microservices",
    "micro-services":           "Microservices",

    # Docker / K8s
    "docker container":         "Docker",
    "containerization":         "Docker",
    "k8s":                      "Kubernetes",

    # Testing variants
    "junit":                    "JUnit",
    "testng":                   "TestNG",
    "unit testing":             "JUnit",
    "automation testing":       "Selenium",
    "manual testing":           "Manual Testing",
    "api testing":              "Postman",

    # REST API variants
    "rest":                     "REST API",
    "restful":                  "REST API",
    "restful api":              "REST API",
    "rest apis":                "REST API",
    "http api":                 "REST API",

    # Agile
    "agile methodology":        "Agile",
    "agile/scrum":              "Agile",

    # Salesforce variants
    "apex":                     "Salesforce",
    "salesforce crm":           "Salesforce",

    # Power BI
    "powerbi":                  "Power BI",
    "power bi":                 "Power BI",

    # Android
    "android development":      "Android",
    "android sdk":              "Android SDK",
    "jetpack compose":          "Jetpack Compose",

    # Flutter
    "flutter/dart":             "Flutter",

    # Shell scripting
    "shell scripting":          "Bash",
    "bash scripting":           "Bash",
    "linux commands":           "Linux",
}


def _normalise(text: str) -> str:
    """Lower-case and collapse whitespace."""
    return re.sub(r"\s+", " ", text.lower().strip())


def extract_skills(resume_text: str) -> list:
    """
    Extract canonical technical skills from raw resume text.

    Strategy (in order):
      1. Try alias map first (longer phrases win over shorter)
      2. Try canonical skill direct match
      3. Deduplicate and sort alphabetically

    Returns a sorted list of canonical skill name strings.
    """
    if not resume_text:
        return []

    norm_text = _normalise(resume_text)
    found     = set()

    # ── Pass 1: alias map (sorted longest-key-first to avoid partial overlap) ──
    sorted_aliases = sorted(ALIASES.keys(), key=len, reverse=True)
    for alias in sorted_aliases:
        if alias in norm_text:
            found.add(ALIASES[alias])

    # ── Pass 2: canonical skills direct match ──
    for skill in CANONICAL_SKILLS:
        skill_lower = skill.lower()
        # Use word-boundary-aware check to avoid e.g. "C" matching "CSS"
        if skill_lower in ("c", "r"):
            # Single-letter skills need stricter matching
            pattern = r"\b" + re.escape(skill_lower) + r"\b"
            if re.search(pattern, norm_text):
                found.add(skill)
        else:
            if skill_lower in norm_text:
                found.add(skill)

    # ── Consolidate: if both "Data Structures" and "DSA" found, keep "DSA" ──
    if "Data Structures" in found and "DSA" in found:
        found.discard("Data Structures")
    if "Algorithms" in found and "DSA" in found:
        found.discard("Algorithms")

    return sorted(found)
