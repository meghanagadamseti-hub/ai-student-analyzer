# services/ai_resume_coach.py
# ─────────────────────────────────────────────────────────────────────────────
# AI Resume Coach — rule-based engine (LLM-ready).
# All heavy knowledge lives here; prompt_templates.py owns text templates.
#
# LLM UPGRADE PATH: replace _llm_call() with your OpenAI / Gemini call.
# Every public function already passes the rendered prompt to _llm_call().
#
# Public API (called by app.py /resume-coach):
#   generate_coach_report(resume_text, detected_skills, missing_skills,
#                         company, role, experience, ats_score,
#                         required_skills) -> dict
# ─────────────────────────────────────────────────────────────────────────────

import re
from services.prompt_templates import (
    COMPANY_COACH_PROMPT, REWRITE_BULLET_PROMPT,
    SUGGEST_PROJECT_PROMPT, KEYWORD_EXTRACT_PROMPT,
    CERTIFICATIONS_PROMPT, REWRITE_SUMMARY_PROMPT,
)

# ── LLM stub (swap for real API call) ────────────────────────────────────────
def _llm_call(prompt: str) -> str:
    """
    Placeholder for an LLM API call.
    Replace this function body with:
        import openai
        response = openai.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content
    """
    return ""   # rule-based engine handles output without LLM


# ── Company culture / values knowledge base ──────────────────────────────────
COMPANY_PROFILES = {
    "google": {
        "culture":   "Data-driven engineering, open-source contributions, scalable systems, "
                     "Googleyness, intellectual humility, and impact at massive scale.",
        "values":    ["scalability", "algorithms", "open-source", "impact", "data-driven"],
        "keywords":  ["distributed systems", "algorithms", "DSA", "system design", "Google Cloud",
                      "scalability", "machine learning", "Python", "Go", "Kubernetes"],
        "tips": [
            "Highlight strong algorithmic problem-solving — Google screens heavily on DSA.",
            "Mention any open-source contributions; Google values community involvement.",
            "Showcase projects that operate at scale (millions of users or records).",
            "Add quantifiable achievements: 'reduced query time by 60%'.",
            "Google values Googleyness — show collaboration and intellectual curiosity.",
            "Include system design experience: distributed caches, queues, sharded databases.",
        ],
        "certifications": [
            {"name": "Google Cloud Professional Data Engineer", "provider": "Google Cloud",
             "why": "Directly aligns with GCP — Google's own cloud platform.",
             "url": "https://cloud.google.com/certification/data-engineer", "priority": "High"},
            {"name": "TensorFlow Developer Certificate", "provider": "Google / Coursera",
             "why": "Demonstrates ML proficiency valued by Google AI teams.",
             "url": "https://www.tensorflow.org/certificate", "priority": "High"},
            {"name": "LeetCode 100 Days Badge", "provider": "LeetCode",
             "why": "Signals consistent DSA practice — critical for Google interviews.",
             "url": "https://leetcode.com", "priority": "High"},
        ],
    },
    "amazon": {
        "culture":   "Customer Obsession, Ownership, Bias for Action, Frugality, Dive Deep, "
                     "Deliver Results — Amazon's 16 Leadership Principles drive every decision.",
        "values":    ["ownership", "customer obsession", "results", "leadership", "frugality"],
        "keywords":  ["AWS", "distributed systems", "DSA", "Java", "microservices", "SQL",
                      "system design", "CI/CD", "leadership principles"],
        "tips": [
            "Amazon evaluates Leadership Principles in every interview — weave ownership and "
            "customer obsession into every project description.",
            "Add measurable impact metrics: 'reduced API latency by 40%', 'handled 10k req/s'.",
            "AWS experience is critical — add any AWS services you have used (Lambda, S3, EC2).",
            "Show DSA proficiency prominently; Amazon's OA is heavily algorithm-focused.",
            "Use STAR-format bullet points: Situation, Task, Action, Result.",
            "Mention microservices and distributed systems experience.",
        ],
        "certifications": [
            {"name": "AWS Certified Developer – Associate", "provider": "Amazon Web Services",
             "why": "Core AWS certification — signals cloud readiness for Amazon SDE roles.",
             "url": "https://aws.amazon.com/certification/certified-developer-associate/",
             "priority": "High"},
            {"name": "AWS Certified Solutions Architect", "provider": "Amazon Web Services",
             "why": "Demonstrates system design capability aligned with Amazon's scale.",
             "url": "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
             "priority": "High"},
        ],
    },
    "microsoft": {
        "culture":   "Growth mindset, teamwork, diversity and inclusion, customer focus, "
                     "enterprise collaboration, and Satya Nadella's 'Learn-it-all' philosophy.",
        "values":    ["growth mindset", "collaboration", "teamwork", "diversity", "enterprise"],
        "keywords":  ["Azure", "C#", ".NET", "TypeScript", "React", "SQL", "microservices",
                      "system design", "Git", "Agile", "collaboration"],
        "tips": [
            "Highlight team collaboration and code review experience — Microsoft values teamwork.",
            "Azure exposure is a strong differentiator — even free-tier projects count.",
            "Mention enterprise-scale projects: ERPs, internal tools, B2B APIs.",
            "Show growth mindset — online courses, certifications, and self-learning.",
            "TypeScript + React experience matters for frontend-leaning Microsoft roles.",
            "Include any experience with .NET / C# even from side projects.",
        ],
        "certifications": [
            {"name": "Microsoft Certified: Azure Developer Associate", "provider": "Microsoft",
             "why": "The primary Azure engineering certification valued across Microsoft.",
             "url": "https://learn.microsoft.com/en-us/certifications/azure-developer/",
             "priority": "High"},
            {"name": "Microsoft Certified: Azure Fundamentals (AZ-900)", "provider": "Microsoft",
             "why": "Entry-level Azure cert that demonstrates cloud awareness.",
             "url": "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
             "priority": "Medium"},
        ],
    },
    "meta": {
        "culture":   "Move fast, be bold, focus on long-term impact, and build for billions.",
        "values":    ["impact", "scale", "speed", "boldness", "data-driven"],
        "keywords":  ["React", "Python", "C++", "distributed systems", "machine learning",
                      "GraphQL", "system design", "DSA", "scalability"],
        "tips": [
            "Meta prizes engineers who can operate at billion-user scale — show scale in projects.",
            "React is core to Meta's stack — strong React/JavaScript skills are essential.",
            "Include any ML or data engineering experience — Meta invests heavily in AI.",
            "Demonstrate speed of delivery: 'shipped feature in 2-week sprint'.",
            "Mention GraphQL experience — Meta invented it.",
        ],
        "certifications": [
            {"name": "Meta Front-End Developer Certificate", "provider": "Meta / Coursera",
             "why": "Official Meta certification directly relevant to frontend roles.",
             "url": "https://www.coursera.org/professional-certificates/meta-front-end-developer",
             "priority": "High"},
        ],
    },
    "netflix": {
        "culture":   "Freedom and Responsibility, radical transparency, high performance, "
                     "context not control — Netflix hires fully formed adults.",
        "values":    ["freedom", "responsibility", "high performance", "transparency"],
        "keywords":  ["Java", "Spring Boot", "microservices", "distributed systems", "Kafka",
                      "AWS", "system design", "Chaos Engineering", "DSA"],
        "tips": [
            "Netflix expects senior-level engineering — show architectural decision-making.",
            "Chaos Engineering and resilience patterns are highly valued — mention them.",
            "Distributed systems depth (Kafka, service mesh, circuit breakers) is critical.",
            "Show ownership: you built, deployed, and monitored production systems.",
            "Netflix values radical candour — frame projects with honest trade-off discussions.",
        ],
        "certifications": [
            {"name": "AWS Certified Solutions Architect – Professional", "provider": "AWS",
             "why": "Netflix runs entirely on AWS — professional-level cert signals readiness.",
             "url": "https://aws.amazon.com/certification/certified-solutions-architect-professional/",
             "priority": "High"},
        ],
    },
    "tcs": {
        "culture":   "Process-oriented, large-scale enterprise delivery, continuous learning, "
                     "Agile and waterfall methodologies, client partnership.",
        "values":    ["process", "reliability", "enterprise", "learning", "client focus"],
        "keywords":  ["Java", "SQL", "Python", "Selenium", "Manual Testing", "Agile",
                      "SDLC", "JIRA", "REST API", "OOP"],
        "tips": [
            "TCS values strong Java and SQL fundamentals — make these prominent.",
            "Mention Agile/Scrum experience and sprint participation.",
            "Include testing experience: manual testing, Selenium automation.",
            "Highlight academic projects clearly with tech stack and outcomes.",
            "TCS NQT performance matters — mention relevant aptitude training.",
            "Add certifications from TCS iON, Coursera, or NPTEL.",
        ],
        "certifications": [
            {"name": "TCS Certified Associate", "provider": "TCS iON",
             "why": "TCS's own certification is directly valued during NQT evaluation.",
             "url": "https://www.tcsion.com/", "priority": "High"},
            {"name": "Java SE 11 Developer (1Z0-819)", "provider": "Oracle",
             "why": "Java is TCS's primary language — Oracle certification validates skills.",
             "url": "https://education.oracle.com/", "priority": "Medium"},
        ],
    },
    "infosys": {
        "culture":   "Learning-first culture, InfyTQ, client-focused delivery, innovation hubs.",
        "values":    ["learning", "innovation", "client value", "diversity"],
        "keywords":  ["Java", "Python", "SQL", "Angular", "React", "Spring Boot",
                      "OOP", "DBMS", "REST API", "Git"],
        "tips": [
            "Infosys filters through InfyTQ — score well by focusing on core Java and aptitude.",
            "Full-stack exposure (React + Spring Boot + SQL) stands out.",
            "Mention any Infosys Springboard or Coursera certifications.",
            "Add CGPA prominently — Infosys has a 6.0+ CGPA filter.",
            "Show project experience with REST APIs and databases.",
        ],
        "certifications": [
            {"name": "Infosys Certified Software Programmer", "provider": "Infosys Springboard",
             "why": "Infosys's own platform certification is directly recognised.",
             "url": "https://www.infosys.com/infosys-springboard/", "priority": "High"},
            {"name": "Python for Everybody", "provider": "Coursera / University of Michigan",
             "why": "Python fundamentals validated — matches Infosys Python assessments.",
             "url": "https://www.coursera.org/specializations/python", "priority": "Medium"},
        ],
    },
    "wipro": {
        "culture":   "Values-driven, inclusive, sustainability-focused enterprise IT delivery.",
        "values":    ["values", "sustainability", "inclusion", "enterprise delivery"],
        "keywords":  ["Java", "Python", "SQL", "Selenium", "Agile", "OOP",
                      "Linux", "REST API", "Git", "SDLC"],
        "tips": [
            "Wipro Elite NTH score is primary filter — practice aptitude and verbal reasoning.",
            "Java and SQL are core — ensure these are well represented with projects.",
            "Wipro values cloud skills — add any AWS or Azure exposure.",
            "Mention testing: Wipro hires heavily into QA automation roles.",
            "Show community involvement or sustainability projects aligned with Wipro's values.",
        ],
        "certifications": [
            {"name": "AWS Cloud Practitioner", "provider": "Amazon Web Services",
             "why": "Foundational cloud cert aligned with Wipro's cloud practice growth.",
             "url": "https://aws.amazon.com/certification/certified-cloud-practitioner/",
             "priority": "High"},
        ],
    },
    "accenture": {
        "culture":   "Innovation, inclusion, digital transformation, client partnership, "
                     "continuous upskilling through badges and certifications.",
        "values":    ["innovation", "inclusion", "transformation", "client partnership"],
        "keywords":  ["Java", "Python", "SQL", "Cloud", "Agile", "REST API",
                      "React", "Salesforce", "SAP", "OOP"],
        "tips": [
            "Accenture values certifications — add any cloud, Salesforce, or SAP badges.",
            "Digital transformation experience (modernising legacy systems) is a strong differentiator.",
            "Include client-facing or communication experience — Accenture is consulting-heavy.",
            "Show Agile/Scrum project participation with sprint metrics.",
            "Mention any AI/ML or data analytics work — Accenture's AI practice is growing.",
        ],
        "certifications": [
            {"name": "Salesforce Administrator", "provider": "Salesforce",
             "why": "Salesforce is a major Accenture platform — admin cert adds immediate value.",
             "url": "https://trailhead.salesforce.com/credentials/administrator",
             "priority": "High"},
            {"name": "Google Cloud Associate Cloud Engineer", "provider": "Google Cloud",
             "why": "Accenture partners with GCP — cloud engineering certs are recognised.",
             "url": "https://cloud.google.com/certification/cloud-engineer",
             "priority": "Medium"},
        ],
    },
}

# ── Default profile for companies not in the knowledge base ──────────────────
DEFAULT_PROFILE = {
    "culture":   "Engineering excellence, teamwork, continuous learning, and delivering value.",
    "values":    ["quality", "teamwork", "delivery", "learning"],
    "keywords":  ["Python", "Java", "SQL", "Git", "REST API", "Docker", "OOP", "DSA"],
    "tips": [
        "Quantify every project achievement with a specific metric.",
        "Ensure your GitHub profile contains active repositories with README files.",
        "Add a professional summary tailored to the role at the top of your resume.",
        "List skills in order of proficiency and relevance to the target role.",
        "Include internship or project experience with clear tech stack mentions.",
        "Add relevant certifications to show continuous learning commitment.",
    ],
    "certifications": [
        {"name": "AWS Cloud Practitioner", "provider": "Amazon Web Services",
         "why": "Foundational cloud certification recognised across the industry.",
         "url": "https://aws.amazon.com/certification/certified-cloud-practitioner/",
         "priority": "High"},
        {"name": "Python for Everybody", "provider": "Coursera",
         "why": "Validates Python fundamentals for software roles.",
         "url": "https://www.coursera.org/specializations/python", "priority": "Medium"},
    ],
}


# ── Resume section checklist ──────────────────────────────────────────────────
CHECKLIST_ITEMS = [
    ("contact",      ["email", "phone", "linkedin", "mobile", "contact"]),
    ("skills",       ["skills", "technical skills", "technologies", "tech stack"]),
    ("projects",     ["project", "portfolio", "work done"]),
    ("experience",   ["experience", "internship", "intern", "worked at", "employment"]),
    ("education",    ["education", "b.tech", "bachelor", "university", "college", "degree"]),
    ("certifications",["certification", "certified", "certificate", "credential"]),
    ("github",       ["github", "github.com"]),
    ("linkedin",     ["linkedin", "linkedin.com"]),
    ("portfolio",    ["portfolio", "website", "personal site", "https://"]),
    ("achievements", ["achievement", "award", "hackathon", "competition", "winner"]),
]

# ── Weak-bullet patterns → rewrite templates ─────────────────────────────────
WEAK_PATTERNS = [
    (r"\bworked on\b",   "Developed / Built / Engineered"),
    (r"\bhelped with\b", "Contributed to / Implemented"),
    (r"\bdid\b",         "Executed / Delivered"),
    (r"\bmade\b",        "Designed / Created"),
    (r"\bassisted\b",    "Supported / Facilitated"),
    (r"\bdone\b",        "Completed / Delivered"),
    (r"\bimproved\b",    "Optimised / Enhanced (add a %)"),
    (r"\bbuilt\b",       "Engineered / Architected (add tech stack and scale)"),
]

IMPACT_REWRITES = {
    "worked on":  "Engineered {tech} solution that {outcome} for {scale}.",
    "built":      "Architected and deployed {tech} system achieving {outcome}.",
    "helped":     "Collaborated on {tech} feature delivering {outcome}.",
    "created":    "Designed and implemented {tech} application resulting in {outcome}.",
    "developed":  "Developed full-stack {tech} platform that {outcome}.",
    "made":       "Built {tech} tool that automated {outcome} reducing manual effort by 60%.",
    "wrote":      "Authored {tech} module that improved {outcome} by 40%.",
    "tested":     "Designed automated test suite using {tech} achieving 90%+ code coverage.",
}


# ─────────────────────────────────────────────────────────────────────────────
# Helper — get company profile
# ─────────────────────────────────────────────────────────────────────────────
def _get_profile(company: str) -> dict:
    return COMPANY_PROFILES.get(company.lower(), DEFAULT_PROFILE)


# ─────────────────────────────────────────────────────────────────────────────
# Feature 1 & 6 — Company-specific coaching suggestions
# ─────────────────────────────────────────────────────────────────────────────
def generate_company_feedback(
    company: str, role: str, experience: str,
    detected_skills: list, missing_skills: list,
    required_skills: list, ats_score: int,
) -> list:
    """
    Return 5-7 specific, company-aware coaching suggestions.
    Each suggestion is a plain string.
    """
    profile = _get_profile(company)
    tips    = list(profile["tips"])          # company-specific base

    det_lower = {s.lower() for s in detected_skills}
    mis_lower = {s.lower() for s in missing_skills}

    # Personalise: mention skills the candidate already has
    strengths = [s for s in detected_skills if s.lower() in
                 {k.lower() for k in required_skills}]
    if strengths:
        tips.insert(0, (
            f"You already have {', '.join(strengths[:3])} — "
            f"showcase these prominently for {company}."
        ))

    # Personalise: call out critical missing skills
    critical_missing = missing_skills[:3]
    if critical_missing:
        tips.append(
            f"{company} requires {', '.join(critical_missing)}. "
            f"Add hands-on projects using these to close the gap."
        )

    # Experience-level adjustments
    if experience.lower() in ("fresher", "0-1 years"):
        tips.append(
            f"As a fresher targeting {company}, focus on 2–3 strong "
            f"GitHub projects that use {', '.join(required_skills[:3])}."
        )
    else:
        tips.append(
            f"For a {experience} candidate, {company} expects "
            f"system design depth — include HLD/LLD for your major projects."
        )

    # ATS score nudge
    if ats_score < 60:
        tips.append(
            "Your ATS score is below 60% — add action verbs, "
            "quantified results, and the exact keywords from the job description."
        )

    return tips[:7]


# ─────────────────────────────────────────────────────────────────────────────
# Feature 4 — Keyword analysis
# ─────────────────────────────────────────────────────────────────────────────
def extract_keywords(
    company: str, role: str,
    resume_text: str, required_skills: list,
) -> dict:
    """
    Returns:
        matched_keywords   list[str]
        missing_keywords   list[str]
        weak_keywords      list[str]  present but mentioned only once
        keyword_score      int  0-100
        ats_keywords       list[str]  all important keywords for this role
    """
    profile      = _get_profile(company)
    ats_keywords = list(set(profile["keywords"] + required_skills))

    resume_low = resume_text.lower()

    matched  = []
    missing  = []
    weak     = []

    for kw in ats_keywords:
        kw_low = kw.lower()
        count  = resume_low.count(kw_low)
        if count == 0:
            missing.append(kw)
        elif count == 1:
            weak.append(kw)
            matched.append(kw)
        else:
            matched.append(kw)

    total         = len(ats_keywords) or 1
    keyword_score = round((len(matched) / total) * 100)

    return {
        "matched_keywords": matched,
        "missing_keywords": missing,
        "weak_keywords":    weak,
        "keyword_score":    keyword_score,
        "ats_keywords":     ats_keywords,
    }


# ─────────────────────────────────────────────────────────────────────────────
# Feature 5 — Detailed ATS breakdown
# ─────────────────────────────────────────────────────────────────────────────
def build_ats_breakdown(
    ats_scores: dict,           # dict returned by calculate_ats_score()
    keyword_data: dict,
) -> dict:
    """Merge ATS dimension scores with keyword scores into one display dict."""
    return {
        "overall":            ats_scores.get("overall_score",    0),
        "keyword_match":      keyword_data.get("keyword_score",  0),
        "formatting_score":   ats_scores.get("quality_score",    0),
        "project_quality":    ats_scores.get("project_score",    0),
        "experience_score":   ats_scores.get("experience_score", 0),
        "section_completeness": ats_scores.get("section_score",  0),
    }


# ─────────────────────────────────────────────────────────────────────────────
# Feature 7 — Resume checklist
# ─────────────────────────────────────────────────────────────────────────────
def build_checklist(resume_text: str) -> list:
    """
    Returns list of { item, present, label } dicts.
    present=True → green ✔, False → red ✗
    """
    low    = resume_text.lower()
    result = []
    labels = {
        "contact":        "Contact Information",
        "skills":         "Skills Section",
        "projects":       "Projects",
        "experience":     "Work / Internship Experience",
        "education":      "Education",
        "certifications": "Certifications",
        "github":         "GitHub Profile",
        "linkedin":       "LinkedIn Profile",
        "portfolio":      "Portfolio / Website",
        "achievements":   "Achievements / Awards",
    }
    for item, signals in CHECKLIST_ITEMS:
        present = any(sig in low for sig in signals)
        result.append({
            "item":    item,
            "label":   labels[item],
            "present": present,
        })
    return result


# ─────────────────────────────────────────────────────────────────────────────
# Feature 8 — Impact analyzer (weak bullet detection + rewrite)
# ─────────────────────────────────────────────────────────────────────────────
def analyze_impact(resume_text: str, detected_skills: str) -> dict:
    """
    Scan resume text for weak bullet patterns.
    Returns:
        weak_bullets    list[{original, suggestion, rewritten}]
        strength_score  int 0-100
    """
    lines = [l.strip() for l in resume_text.splitlines() if l.strip()]
    weak  = []
    tech  = detected_skills[0] if detected_skills else "relevant technology"

    for line in lines:
        low  = line.lower()
        flag = None
        for pattern, suggestion in WEAK_PATTERNS:
            if re.search(pattern, low):
                flag = suggestion
                break
        if flag:
            # Identify the trigger word to build a rewrite template
            trigger = re.search(
                r"\b(worked on|helped|built|created|developed|made|wrote|tested|did)\b",
                low
            )
            key = trigger.group(1) if trigger else "worked on"
            tmpl = IMPACT_REWRITES.get(key, "Engineered {tech} solution achieving {outcome}.")
            rewritten = tmpl.format(
                tech    = tech,
                outcome = "measurable performance improvement",
                scale   = "production environment",
            )
            weak.append({
                "original":  line[:120],
                "suggestion": flag,
                "rewritten":  rewritten,
            })

    strength_score = max(0, 100 - len(weak) * 10)
    return {
        "weak_bullets":   weak[:5],
        "strength_score": strength_score,
    }


# ─────────────────────────────────────────────────────────────────────────────
# Feature 3 — Rewrite a single bullet point
# ─────────────────────────────────────────────────────────────────────────────
def rewrite_bullet(original: str, detected_skills: list) -> str:
    """
    Return an improved version of a single resume bullet point.
    Uses the LLM stub; falls back to a template-based rewrite.
    """
    prompt = REWRITE_BULLET_PROMPT.format(original=original)
    llm_out = _llm_call(prompt).strip()
    if llm_out:
        return llm_out

    # Rule-based fallback
    tech = detected_skills[0] if detected_skills else "technology"
    low  = original.lower()
    for key, tmpl in IMPACT_REWRITES.items():
        if key in low:
            return tmpl.format(
                tech    = tech,
                outcome = "improved performance by 40%",
                scale   = "1,000+ daily active users",
            )
    return (
        f"Developed and deployed {tech} solution that automated the workflow, "
        f"reducing processing time by 35% and improving reliability."
    )


# ─────────────────────────────────────────────────────────────────────────────
# Feature 2 — Section-wise improvement suggestions
# ─────────────────────────────────────────────────────────────────────────────
def section_suggestions(
    resume_text: str,
    company: str, role: str,
    detected_skills: list, missing_skills: list,
) -> list:
    """
    Return per-section improvement cards:
    [{ section, current_issue, suggestion, example }]
    """
    low      = resume_text.lower()
    profile  = _get_profile(company)
    sections = []

    # Professional Summary
    if "summary" not in low and "objective" not in low and "profile" not in low:
        sections.append({
            "section":       "Professional Summary",
            "current_issue": "No professional summary found.",
            "suggestion":    f"Add a 2–3 line summary targeting {company} as a {role}.",
            "example":       (
                f"Motivated {role} with experience in "
                f"{', '.join(detected_skills[:3] or ['Python', 'JavaScript'])}. "
                f"Seeking to leverage problem-solving skills at {company} to build "
                f"scalable, impactful solutions."
            ),
        })
    else:
        sections.append({
            "section":       "Professional Summary",
            "current_issue": "Summary may be generic.",
            "suggestion":    f"Tailor summary to mention {company}'s culture: {profile['culture'][:80]}.",
            "example":       (
                f"Results-driven {role} skilled in "
                f"{', '.join(detected_skills[:3] or ['Python'])} "
                f"with a passion for {profile['values'][0]} — "
                f"eager to contribute to {company}'s mission."
            ),
        })

    # Projects
    if "project" in low:
        sections.append({
            "section":       "Projects",
            "current_issue": "Projects may lack measurable impact.",
            "suggestion":    "Add metrics to every project: users, performance gain, lines of code, etc.",
            "example":       (
                f"Built a {role.lower()} platform using "
                f"{', '.join(detected_skills[:2] or ['Python', 'SQL'])} "
                f"that served 500+ users and reduced load time by 45%."
            ),
        })

    # Skills
    if missing_skills:
        sections.append({
            "section":       "Skills",
            "current_issue": f"Missing {company}-critical skills: {', '.join(missing_skills[:3])}.",
            "suggestion":    "Learn and add these skills with supporting projects.",
            "example":       f"Add: {', '.join(missing_skills[:4])} to your skills section.",
        })

    # Experience
    sections.append({
        "section":       "Experience / Internship",
        "current_issue": "Bullet points may start with weak verbs.",
        "suggestion":    "Start each bullet with a strong action verb + technology + metric.",
        "example":       (
            f"Engineered REST API using {detected_skills[0] if detected_skills else 'Python'} "
            f"handling 10,000+ requests/day with 99.9% uptime."
        ),
    })

    # Certifications
    sections.append({
        "section":       "Certifications",
        "current_issue": "Certifications are missing or not visible.",
        "suggestion":    f"Add {company}-relevant certifications to stand out.",
        "example":       profile["certifications"][0]["name"] if profile["certifications"] else "AWS Cloud Practitioner",
    })

    return sections


# ─────────────────────────────────────────────────────────────────────────────
# Feature 9 — Project suggestions for missing skills
# ─────────────────────────────────────────────────────────────────────────────
def suggest_projects(
    company: str, role: str,
    missing_skills: list, detected_skills: list,
) -> list:
    """Return 3 project suggestions targeting missing skills."""
    profile = _get_profile(company)
    top3    = missing_skills[:3] or ["Python", "SQL", "Docker"]

    PROJECTS = {
        "dsa":           ("LeetCode Tracker App",
                          "React + Node.js + MongoDB",
                          "Track 200+ solved problems with analytics dashboard"),
        "sql":           ("Employee Management System",
                          "Flask + PostgreSQL + React",
                          "Manage 1,000+ employee records with reports"),
        "docker":        ("Containerised Microservices",
                          "Docker + Flask + Nginx",
                          "Deploy 3 microservices with docker-compose"),
        "aws":           ("Cloud File Storage App",
                          "Flask + AWS S3 + EC2",
                          "Store and serve 10,000+ files with CDN delivery"),
        "machine learning":("Customer Churn Predictor",
                           "Python + Scikit-learn + Flask",
                           "Predict churn with 88% accuracy on real dataset"),
        "system design": ("URL Shortener at Scale",
                          "Flask + Redis + PostgreSQL",
                          "Handle 100k+ requests/day with caching layer"),
        "react":         ("Real-time Dashboard",
                          "React + WebSockets + Node.js",
                          "Live data updates for 500+ concurrent users"),
        "kubernetes":    ("Auto-scaling Web App",
                          "Kubernetes + Docker + Flask",
                          "Scale from 0 to 50 pods based on traffic"),
        "graphql":       ("Social Network API",
                          "Node.js + GraphQL + MongoDB",
                          "Query social graph with nested resolvers"),
    }

    results = []
    for skill in top3:
        key  = skill.lower()
        data = PROJECTS.get(key)
        if data:
            results.append({
                "title":        data[0],
                "stack":        data[1],
                "impact":       data[2],
                "skill_focus":  skill,
                "company_value": (
                    f"Demonstrates {skill} to {company} hiring team."
                ),
            })
        else:
            results.append({
                "title":        f"{skill} Showcase Project",
                "stack":        f"{skill} + " + (detected_skills[0] if detected_skills else "Python"),
                "impact":       f"Demonstrates hands-on {skill} proficiency",
                "skill_focus":  skill,
                "company_value": f"Closes the {skill} gap for {company}.",
            })
    return results


# ─────────────────────────────────────────────────────────────────────────────
# Certifications helper
# ─────────────────────────────────────────────────────────────────────────────
def recommend_certifications(company: str, missing_skills: list) -> list:
    profile = _get_profile(company)
    certs   = list(profile["certifications"])

    # Add generic skill-specific certs if not already covered
    SKILL_CERTS = {
        "aws":     {"name": "AWS Certified Cloud Practitioner", "provider": "AWS",
                    "why": "Core AWS cert — entry point for cloud roles.",
                    "url": "https://aws.amazon.com/certification/certified-cloud-practitioner/",
                    "priority": "High"},
        "docker":  {"name": "Docker Certified Associate", "provider": "Docker",
                    "why": "Validates container skills required in most DevOps roles.",
                    "url": "https://www.docker.com/certification/", "priority": "Medium"},
        "java":    {"name": "Oracle Certified Associate Java SE", "provider": "Oracle",
                    "why": "Industry-standard Java certification.",
                    "url": "https://education.oracle.com/", "priority": "Medium"},
        "python":  {"name": "PCEP – Python Certified Entry Professional", "provider": "Python Institute",
                    "why": "Globally recognised Python fundamentals certification.",
                    "url": "https://pythoninstitute.org/pcep", "priority": "Medium"},
        "sql":     {"name": "SQL for Data Science", "provider": "Coursera",
                    "why": "Validates SQL query and database design skills.",
                    "url": "https://www.coursera.org/learn/sql-for-data-science",
                    "priority": "Medium"},
    }
    existing_names = {c["name"].lower() for c in certs}
    for skill in missing_skills:
        extra = SKILL_CERTS.get(skill.lower())
        if extra and extra["name"].lower() not in existing_names:
            certs.append(extra)
            existing_names.add(extra["name"].lower())

    return certs[:5]


# ─────────────────────────────────────────────────────────────────────────────
# Overall resume quality
# ─────────────────────────────────────────────────────────────────────────────
def resume_quality(
    resume_text: str, ats_score: int,
    matched_skills: list, required_skills: list,
) -> dict:
    """Return strength score, weakness list, and strength label."""
    score      = ats_score
    weaknesses = []

    if len(resume_text.split()) < 300:
        weaknesses.append("Resume is too short — add more project details.")
        score -= 5
    if "github" not in resume_text.lower():
        weaknesses.append("Missing GitHub profile link.")
        score -= 5
    if not any(c.isdigit() for c in resume_text):
        weaknesses.append("No quantifiable metrics found (%, numbers, scale).")
        score -= 10
    if len(matched_skills) < len(required_skills) * 0.5:
        weaknesses.append(f"Skill match below 50% — add missing skills with projects.")
        score -= 8
    if "summary" not in resume_text.lower() and "objective" not in resume_text.lower():
        weaknesses.append("Missing professional summary section.")
        score -= 5

    score = max(0, min(100, score))

    if score >= 80:
        label = "Strong"
    elif score >= 60:
        label = "Good"
    elif score >= 40:
        label = "Average"
    else:
        label = "Needs Work"

    return {
        "strength_score": score,
        "strength_label": label,
        "weaknesses":     weaknesses,
    }


# ─────────────────────────────────────────────────────────────────────────────
# PUBLIC entry point — called by app.py
# ─────────────────────────────────────────────────────────────────────────────
def generate_coach_report(
    resume_text:      str,
    detected_skills:  list,
    missing_skills:   list,
    company:          str,
    role:             str,
    experience:       str,
    ats_score:        int,
    required_skills:  list,
    ats_breakdown:    dict,
) -> dict:
    """
    Aggregates all coach features into a single response dict.
    app.py calls this and returns the result directly to the frontend.
    """
    company_tips   = generate_company_feedback(
        company, role, experience,
        detected_skills, missing_skills,
        required_skills, ats_score,
    )
    keyword_data   = extract_keywords(company, role, resume_text, required_skills)
    ats_detail     = build_ats_breakdown(ats_breakdown, keyword_data)
    checklist      = build_checklist(resume_text)
    impact_data    = analyze_impact(resume_text, detected_skills)
    sections       = section_suggestions(
        resume_text, company, role, detected_skills, missing_skills
    )
    projects       = suggest_projects(company, role, missing_skills, detected_skills)
    certs          = recommend_certifications(company, missing_skills)
    quality        = resume_quality(
        resume_text, ats_score, detected_skills, required_skills
    )

    return {
        # Feature 1 & 6 — company-specific coaching
        "company_suggestions":  company_tips,
        # Feature 2 — section-wise improvements
        "section_suggestions":  sections,
        "resume_quality":       quality,
        # Feature 4 — keyword analysis
        "keyword_analysis":     keyword_data,
        # Feature 5 — ATS breakdown
        "ats_breakdown":        ats_detail,
        # Feature 7 — checklist
        "checklist":            checklist,
        # Feature 8 — impact analyzer
        "impact_analysis":      impact_data,
        # Feature 9 — project suggestions
        "project_suggestions":  projects,
        # Certifications
        "certifications":       certs,
        # Meta
        "company":              company,
        "role":                 role,
        "experience":           experience,
    }
