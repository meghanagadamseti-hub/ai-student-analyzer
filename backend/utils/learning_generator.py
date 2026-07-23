# utils/learning_generator.py
# ──────────────────────────────────────────────────────────────────
# All business logic for generating a personalised learning roadmap.
# Called from the /learning route in app.py.
#
# Public API:
#   generate_learning_plan(detected_skills, missing_skills, ats_score)
#   -> dict   (the full JSON response)
# ──────────────────────────────────────────────────────────────────

import random
from data.learning_resources import get_resources_for_skills

# ── Priority / ordering metadata ─────────────────────────────────
# Weight = how often this skill appears across companies × role criticality.
# Higher weight → higher learning priority.
SKILL_WEIGHTS = {
    "dsa":                100,
    "python":              95,
    "java":                93,
    "sql":                 90,
    "git":                 88,
    "oop":                 85,
    "dbms":                82,
    "operating system":    80,
    "computer networks":   78,
    "react":               76,
    "javascript":          75,
    "node.js":             73,
    "flask":               70,
    "django":              68,
    "fastapi":             66,
    "rest api":            72,
    "docker":              65,
    "kubernetes":          60,
    "aws":                 62,
    "azure":               58,
    "gcp":                 55,
    "linux":               65,
    "system design":       70,
    "machine learning":    50,
    "deep learning":       45,
    "typescript":          60,
    "mongodb":             58,
    "postgresql":          60,
    "mysql":               60,
    "graphql":             50,
    "c++":                 70,
    "c":                   68,
    "html":                55,
    "css":                 55,
    "github":              70,
    "pandas":              45,
    "numpy":               40,
}

# What to learn after acquiring a skill (prerequisite map, reversed)
PREREQUISITES = {
    "flask":         ["python"],
    "django":        ["python", "sql"],
    "fastapi":       ["python"],
    "react":         ["html", "css", "javascript"],
    "node.js":       ["javascript"],
    "docker":        ["linux"],
    "kubernetes":    ["docker"],
    "aws":           ["linux"],
    "azure":         ["linux"],
    "gcp":           ["linux"],
    "machine learning": ["python", "numpy", "pandas"],
    "deep learning": ["machine learning"],
    "graphql":       ["rest api"],
    "postgresql":    ["sql"],
    "mysql":         ["sql"],
    "mongodb":       ["dbms"],
    "system design": ["dsa", "dbms", "computer networks"],
    "rest api":      ["http basics"],
}

# Concise week-by-week topic descriptions
WEEK_DESCRIPTIONS = {
    "python":          "Variables, functions, OOP, file I/O, and standard library.",
    "java":            "Core Java, collections, multithreading, and JVM internals.",
    "javascript":      "ES6+ syntax, async/await, DOM manipulation, and fetch API.",
    "typescript":      "Types, interfaces, generics, and TypeScript with React.",
    "react":           "Components, JSX, props, state, hooks (useState, useEffect), routing.",
    "node.js":         "Event loop, Express.js, REST APIs, middleware, and npm.",
    "flask":           "Routes, request handling, Blueprints, SQLAlchemy, JWT auth.",
    "django":          "MVT pattern, ORM, Django REST Framework, authentication.",
    "fastapi":         "Path operations, Pydantic models, async routes, OpenAPI docs.",
    "sql":             "SELECT, JOINs, GROUP BY, window functions, normalisation.",
    "mysql":           "Schema design, indexes, transactions, stored procedures.",
    "postgresql":      "Advanced queries, JSONB, full-text search, replication.",
    "mongodb":         "Documents, collections, aggregation pipelines, indexing.",
    "git":             "Branching, merging, rebasing, pull requests, Git workflows.",
    "github":          "Repositories, issues, CI/CD with GitHub Actions, collaboration.",
    "docker":          "Images, containers, Dockerfile, docker-compose, networking.",
    "kubernetes":      "Pods, Deployments, Services, ConfigMaps, Helm charts.",
    "aws":             "EC2, S3, Lambda, IAM, RDS, CloudFormation basics.",
    "azure":           "Azure VMs, Blob Storage, Azure Functions, AAD, DevOps.",
    "gcp":             "Compute Engine, Cloud Run, BigQuery, Cloud Storage.",
    "linux":           "Bash scripting, file system, processes, cron jobs, SSH.",
    "dsa":             "Arrays, linked lists, trees, graphs, dynamic programming, sorting.",
    "system design":   "Scalability, caching, load balancing, microservices, CAP theorem.",
    "oop":             "Classes, inheritance, polymorphism, encapsulation, SOLID.",
    "dbms":            "ER diagrams, normalisation, ACID, transactions, query optimisation.",
    "operating system":"Processes, threads, memory management, scheduling, deadlocks.",
    "computer networks":"OSI model, TCP/IP, HTTP/HTTPS, DNS, load balancers, CDN.",
    "rest api":        "HTTP methods, status codes, JSON, authentication, versioning.",
    "graphql":         "Queries, mutations, subscriptions, schema design, resolvers.",
    "machine learning":"Supervised/unsupervised learning, sklearn pipelines, model evaluation.",
    "deep learning":   "Neural networks, backpropagation, CNNs, RNNs, PyTorch basics.",
    "pandas":          "DataFrames, series, merging, groupby, data cleaning.",
    "numpy":           "Arrays, broadcasting, linear algebra, random, slicing.",
    "c":               "Pointers, memory management, structs, file I/O.",
    "c++":             "STL, templates, smart pointers, OOP, competitive programming.",
    "html":            "Semantic HTML5, forms, accessibility, SEO meta tags.",
    "css":             "Flexbox, Grid, responsive design, animations, CSS variables.",
}

# Daily challenges keyed by skill (title, description, difficulty)
DAILY_CHALLENGES = {
    "dsa":             ("Implement Binary Search",           "Write iterative and recursive binary search on a sorted array.",   "Medium"),
    "python":          ("Fibonacci with Memoisation",        "Generate the Nth Fibonacci number using dynamic programming.",      "Easy"),
    "java":            ("Reverse a Linked List",             "Reverse a singly linked list in-place in O(n).",                   "Medium"),
    "react":           ("Build a Todo App",                  "Create a React todo app with add, delete, and filter features.",    "Easy"),
    "flask":           ("Create a REST API",                 "Build a CRUD REST API for a student resource using Flask.",         "Medium"),
    "sql":             ("Second Highest Salary",             "Write a SQL query to find the second highest salary without MAX.",  "Medium"),
    "docker":          ("Containerise a Flask App",          "Write a Dockerfile and docker-compose.yml for a Flask + Postgres app.", "Medium"),
    "aws":             ("Deploy to EC2",                     "Launch an EC2 instance and deploy a simple Flask app.",             "Hard"),
    "system design":   ("Design a URL Shortener",           "Design a scalable URL shortener like bit.ly.",                     "Hard"),
    "git":             ("Fix a Merge Conflict",              "Simulate and resolve a Git merge conflict on a feature branch.",   "Easy"),
    "javascript":      ("Debounce Function",                 "Implement a debounce utility function from scratch.",              "Medium"),
    "node.js":         ("Build an Express Server",          "Create an Express REST API with error handling middleware.",       "Medium"),
    "machine learning":("Train a Classifier",               "Train a Logistic Regression classifier on the Iris dataset.",     "Medium"),
    "linux":           ("Write a Bash Script",              "Write a script that backs up a directory and logs the timestamp.", "Easy"),
    "mongodb":         ("Aggregation Pipeline",             "Write a MongoDB aggregation to group orders by status.",          "Medium"),
    "computer networks":("Explain TCP Handshake",           "Describe the TCP 3-way handshake with sequence numbers.",        "Easy"),
}

# Tips library — selected based on skill gaps and ATS score
ALL_TIPS = [
    "Solve 2–3 LeetCode problems every day to build DSA consistency.",
    "Build a CRUD project using Flask + SQL to solidify backend basics.",
    "Complete each roadmap week before moving to the next — depth over breadth.",
    "Push all projects to GitHub; recruiters notice active profiles.",
    "Practice SQL window functions (ROW_NUMBER, RANK, LAG) — they appear in every data role.",
    "Study the AWS Cloud Practitioner free tier — hands-on experience matters.",
    "Write unit tests for every project you build; it signals engineering maturity.",
    "Revisit OOP concepts: design patterns (Singleton, Factory) are common interview topics.",
    "Read through the System Design Primer on GitHub at least once.",
    "Contribute to one open-source repository — even documentation counts.",
    "Mock-interview yourself weekly; record and review your own answers.",
    "Focus on explaining your thought process, not just the final answer.",
    "Learn Docker basics before cloud platforms — containers underpin most cloud services.",
    "Study DBMS normalisation (1NF–3NF) and ACID properties for backend roles.",
    "Improve your resume ATS score by using action verbs and quantifying impact.",
]


# ─────────────────────────────────────────────────────────────────
# Helper — prioritise missing skills
# ─────────────────────────────────────────────────────────────────
def _prioritise_skills(missing_skills: list, detected_skills: list) -> list:
    """
    Sort missing skills by weight (descending), then tag each with
    a priority label and reason string.
    Returns a list of dicts:
      { name, priority, reason, weight }
    """
    detected_lower = {s.lower() for s in detected_skills}
    tagged = []

    for skill in missing_skills:
        key    = skill.lower()
        weight = SKILL_WEIGHTS.get(key, 30)

        # Boost weight if prerequisites are already known
        prereqs   = PREREQUISITES.get(key, [])
        met_prereqs = sum(1 for p in prereqs if p.lower() in detected_lower)
        if prereqs:
            boost = int((met_prereqs / len(prereqs)) * 20)
            weight += boost

        if weight >= 80:
            priority = "High"
            reason   = f"Core skill required by 80%+ of top companies."
        elif weight >= 55:
            priority = "Medium"
            reason   = f"Frequently requested in mid-level and senior roles."
        else:
            priority = "Low"
            reason   = f"Useful specialisation — learn after core skills."

        tagged.append({
            "name":     skill,
            "priority": priority,
            "reason":   reason,
            "weight":   weight,
        })

    # Sort: High first, then Medium, Low; within same priority sort by weight desc
    priority_order = {"High": 0, "Medium": 1, "Low": 2}
    tagged.sort(key=lambda x: (priority_order[x["priority"]], -x["weight"]))

    return tagged


# ─────────────────────────────────────────────────────────────────
# Helper — build weekly roadmap
# ─────────────────────────────────────────────────────────────────
def _build_roadmap(prioritised_skills: list, ats_score: int) -> list:
    """
    Assign each prioritised skill to a week.
    Weeks 1-N cover missing skills.
    Tail weeks add foundational topics if the ATS score is low.
    """
    roadmap = []

    # Determine status for the first 2–3 weeks so the UI shows progress
    for i, skill_info in enumerate(prioritised_skills):
        week = i + 1
        key  = skill_info["name"].lower()

        if week == 1:
            status = "in_progress"
        elif week <= len(prioritised_skills):
            status = "upcoming"
        else:
            status = "upcoming"

        roadmap.append({
            "week":        week,
            "title":       f"{skill_info['name']} Fundamentals",
            "description": WEEK_DESCRIPTIONS.get(key, f"Core concepts and hands-on practice for {skill_info['name']}."),
            "skill":       skill_info["name"],
            "status":      status,
            "priority":    skill_info["priority"],
        })

    # Add foundational supplement weeks when ATS score is low
    if ats_score < 60:
        supplement_week = len(roadmap) + 1
        roadmap.append({
            "week":        supplement_week,
            "title":       "Resume & ATS Optimisation",
            "description": "Restructure your resume with action verbs, quantified impact, and ATS-friendly formatting.",
            "skill":       "Resume",
            "status":      "upcoming",
            "priority":    "High",
        })
        roadmap.append({
            "week":        supplement_week + 1,
            "title":       "Mock Interviews & Soft Skills",
            "description": "Practice structured answers using STAR format. Record and review your mock sessions.",
            "skill":       "Soft Skills",
            "status":      "upcoming",
            "priority":    "Medium",
        })

    return roadmap


# ─────────────────────────────────────────────────────────────────
# Helper — pick daily challenge
# ─────────────────────────────────────────────────────────────────
def _pick_daily_challenge(missing_skills: list, detected_skills: list) -> dict:
    """
    Return the daily challenge for the highest-priority missing skill
    that has a known challenge, else fall back to DSA.
    """
    for skill in missing_skills:
        key = skill.lower()
        if key in DAILY_CHALLENGES:
            title, description, difficulty = DAILY_CHALLENGES[key]
            return {
                "title":       title,
                "description": description,
                "difficulty":  difficulty,
                "topic":       skill,
                "timeLimit":   "30 min",
                "hint":        f"Start by reviewing the core {skill} concepts, then tackle the problem step-by-step.",
                "practiceUrl": get_resources_for_skills([skill])[0].get("practice", "https://leetcode.com")
                               if get_resources_for_skills([skill]) else "https://leetcode.com",
            }

    # Fallback — DSA challenge
    title, description, difficulty = DAILY_CHALLENGES["dsa"]
    return {
        "title":       title,
        "description": description,
        "difficulty":  difficulty,
        "topic":       "DSA",
        "timeLimit":   "30 min",
        "hint":        "Use two pointers: left = 0, right = len(arr)-1. Check the middle element each iteration.",
        "practiceUrl": "https://leetcode.com/problems/binary-search/",
    }


# ─────────────────────────────────────────────────────────────────
# Helper — select tips
# ─────────────────────────────────────────────────────────────────
def _select_tips(missing_skills: list, ats_score: int) -> list:
    """Return 5 curated tips relevant to the user's gaps."""
    tips = []

    missing_lower = {s.lower() for s in missing_skills}

    if "dsa" in missing_lower:
        tips.append("Solve 2–3 LeetCode problems every day to build DSA consistency.")
    if "flask" in missing_lower or "django" in missing_lower or "fastapi" in missing_lower:
        tips.append("Build a CRUD project using Flask + SQL to solidify backend basics.")
    if "docker" in missing_lower:
        tips.append("Learn Docker basics before cloud platforms — containers underpin most cloud services.")
    if ats_score < 65:
        tips.append("Improve your resume ATS score by using action verbs and quantifying project impact.")
    if "system design" in missing_lower:
        tips.append("Read through the System Design Primer on GitHub at least once.")
    if "sql" in missing_lower or "dbms" in missing_lower:
        tips.append("Practice SQL window functions (ROW_NUMBER, RANK, LAG) — they appear in every data role.")
    if "aws" in missing_lower or "azure" in missing_lower or "gcp" in missing_lower:
        tips.append("Sign up for the AWS / GCP free tier and deploy a real project to stand out.")
    if "git" in missing_lower or "github" in missing_lower:
        tips.append("Push all projects to GitHub; recruiters notice active profiles.")

    # Always add a few universal tips to reach 5
    universal = [
        "Complete each roadmap week before moving to the next — depth over breadth.",
        "Mock-interview yourself weekly; record and review your own answers.",
        "Write unit tests for every project you build; it signals engineering maturity.",
    ]
    for tip in universal:
        if tip not in tips:
            tips.append(tip)
        if len(tips) >= 5:
            break

    return tips[:5]


# ─────────────────────────────────────────────────────────────────
# Helper — skill progress (returns detected + missing with scores)
# ─────────────────────────────────────────────────────────────────
def _build_skill_progress(detected_skills: list, missing_skills: list) -> list:
    """
    Build a progress list combining known skills (high %) and
    missing skills (low %) so the frontend progress bars are meaningful.
    """
    COLORS = [
        "#818cf8", "#34d399", "#fbbf24", "#f87171",
        "#22d3ee", "#a78bfa", "#fb923c", "#e879f9",
        "#38bdf8", "#4ade80",
    ]

    progress = []
    color_idx = 0

    # Known skills — score based on weight (capped 60–95)
    for skill in detected_skills[:6]:
        key   = skill.lower()
        score = min(95, max(60, SKILL_WEIGHTS.get(key, 50) - random.randint(0, 10)))
        progress.append({
            "name":     skill,
            "progress": score,
            "color":    COLORS[color_idx % len(COLORS)],
            "status":   "known",
        })
        color_idx += 1

    # Missing skills — low scores (15–40)
    for skill in missing_skills[:4]:
        key   = skill.lower()
        score = random.randint(10, 35)
        progress.append({
            "name":     skill,
            "progress": score,
            "color":    COLORS[color_idx % len(COLORS)],
            "status":   "missing",
        })
        color_idx += 1

    return progress


# ─────────────────────────────────────────────────────────────────
# Helper — compute overall learning progress percentage
# ─────────────────────────────────────────────────────────────────
def _overall_progress(detected_skills: list, missing_skills: list, ats_score: int) -> int:
    """
    Simple heuristic:
      - 50% weight: what fraction of skills the user already has
      - 30% weight: ATS score (normalised)
      - 20% weight: fixed base (everyone starts at 20%)
    """
    total = len(detected_skills) + len(missing_skills)
    skill_ratio = len(detected_skills) / total if total else 0

    progress = round(
        skill_ratio * 50 +
        (ats_score / 100) * 30 +
        20
    )
    return min(progress, 95)   # never show 100% — always room to grow


# ─────────────────────────────────────────────────────────────────
# PUBLIC FUNCTION
# ─────────────────────────────────────────────────────────────────
def generate_learning_plan(
    detected_skills: list,
    missing_skills: list,
    ats_score: int,
) -> dict:
    """
    Entry point called by the /learning route.

    Parameters
    ----------
    detected_skills : skills already found in the resume
    missing_skills  : skills the user needs to learn
    ats_score       : integer 0–100 from calculate_ats_score()

    Returns
    -------
    dict — the complete JSON payload consumed by the React frontend
    """

    # 1. Prioritise and tag each missing skill
    prioritised = _prioritise_skills(missing_skills, detected_skills)

    # 2. Build week-by-week roadmap (max 10 weeks to keep UI clean)
    roadmap = _build_roadmap(prioritised[:8], ats_score)

    # 3. Collect curated resources for all relevant skills
    all_skills  = missing_skills + detected_skills
    resources   = get_resources_for_skills(all_skills)

    # 4. Daily challenge
    daily_challenge = _pick_daily_challenge(missing_skills, detected_skills)

    # 5. Personalised tips
    tips = _select_tips(missing_skills, ats_score)

    # 6. Skill progress (for progress bars)
    skill_progress = _build_skill_progress(detected_skills, missing_skills)

    # 7. AI suggestions (slightly different wording from tips)
    ai_suggestions = [
        f"Start with {prioritised[0]['name']} this week — it has the highest impact on your profile." if prioritised else
        "Your profile looks strong. Focus on system design and advanced topics.",
        *tips[1:4],
    ]

    # 8. Overall progress percentage
    overall_progress = _overall_progress(detected_skills, missing_skills, ats_score)

    return {
        "recommendedSkills": [
            {
                "name":     s["name"],
                "priority": s["priority"],
                "reason":   s["reason"],
            }
            for s in prioritised
        ],
        "roadmap":         roadmap,
        "resources":       resources,
        "skillProgress":   skill_progress,
        "dailyChallenge":  daily_challenge,
        "tips":            tips,
        "aiSuggestions":   ai_suggestions,
        "overallProgress": overall_progress,
        "detectedSkills":  detected_skills,
        "missingSkills":   missing_skills,
        "atsScore":        ats_score,
    }
