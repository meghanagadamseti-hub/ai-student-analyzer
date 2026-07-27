# services/prompt_templates.py
# ─────────────────────────────────────────────────────────────────────────────
# All prompt templates are stored here — separated from business logic so
# they can be swapped to OpenAI / Gemini / any LLM with zero changes elsewhere.
#
# Every template is a plain Python string with {placeholders}.
# Call  template.format(**kwargs)  to render.
#
# The rule-based engine in ai_resume_coach.py uses these same templates as
# structured headings / context strings so the output format stays consistent
# whether we run locally or call an LLM API.
# ─────────────────────────────────────────────────────────────────────────────


# ── Company-specific coaching ─────────────────────────────────────────────────

COMPANY_COACH_PROMPT = """
You are an expert AI Resume Coach specialised in {company} hiring.

Candidate profile:
- Role applying for : {role}
- Experience level  : {experience}
- Skills on resume  : {detected_skills}
- Missing skills    : {missing_skills}
- ATS score         : {ats_score}%

{company} engineering culture:
{company_culture}

{company} must-have technical skills:
{required_skills}

Generate 5–7 highly specific, actionable resume improvement suggestions for this
candidate targeting {company} as a {role}.

Rules:
- Each suggestion must mention {company} by name or reference its culture.
- Focus on gaps: {missing_skills}
- Recommend specific metrics (e.g. "improved latency by 40%") where possible.
- Do NOT give generic advice like "write a better resume".
""".strip()


# ── Resume section rewrite ────────────────────────────────────────────────────

REWRITE_BULLET_PROMPT = """
You are an expert resume writer.

Rewrite the following weak resume bullet point into a strong, ATS-optimised,
impact-focused statement.

Rules:
- Start with a strong action verb.
- Add specific technologies used.
- Include a measurable outcome (%, users, time saved, etc.).
- Keep it to one sentence under 20 words.
- Do NOT use first-person pronouns.

Original bullet point:
"{original}"

Improved version:
""".strip()


# ── Project suggestion ────────────────────────────────────────────────────────

SUGGEST_PROJECT_PROMPT = """
Suggest 3 impressive portfolio projects for a {role} candidate targeting {company}.

Requirements:
- Each project must use at least 2 of these skills: {missing_skills}
- Each project should demonstrate impact that {company} values: {company_values}
- Include: project title, tech stack, and one measurable outcome

Format each as:
Project: <title>
Stack  : <technologies>
Impact : <measurable outcome>
""".strip()


# ── Resume summary rewrite ────────────────────────────────────────────────────

REWRITE_SUMMARY_PROMPT = """
Rewrite this professional summary for a {role} candidate targeting {company}.

Current summary:
"{current_summary}"

Candidate skills: {detected_skills}
Missing skills:   {missing_skills}

Rules:
- 2–3 sentences maximum.
- Mention top 3 matched skills.
- Align tone with {company}'s culture: {company_culture}
- Include a career goal specific to {company}.
""".strip()


# ── Keyword extraction ────────────────────────────────────────────────────────

KEYWORD_EXTRACT_PROMPT = """
Extract the top 15 ATS keywords that {company} uses for a {role} position.

Context:
- Required skills: {required_skills}
- Company culture: {company_culture}
- Industry       : {industry}

Return as a flat JSON list of strings.
""".strip()


# ── Certification recommendations ────────────────────────────────────────────

CERTIFICATIONS_PROMPT = """
Recommend 4–6 professional certifications for a {role} candidate targeting {company}.

Candidate missing skills: {missing_skills}
Company required skills:  {required_skills}

For each certification provide:
- name     : certification name
- provider : issuing organisation
- why      : one sentence why it helps for this role at {company}
- url      : official certification page URL
- priority : High / Medium / Low
""".strip()
