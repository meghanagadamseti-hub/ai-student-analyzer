# data/learning_resources.py
# ──────────────────────────────────────────────────────────────────
# Single source of truth for every curated learning resource.
# Keys are lowercase canonical skill names so lookup is case-insensitive.
# Each entry has:
#   youtube       – a free full-course link (YouTube)
#   documentation – official / best-in-class reference
#   practice      – a hands-on coding / exercise platform
# ──────────────────────────────────────────────────────────────────

RESOURCES = {
    "python": {
        "icon": "🐍",
        "youtube":       "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
        "documentation": "https://docs.python.org/3/",
        "practice":      "https://www.hackerrank.com/domains/python",
    },
    "java": {
        "icon": "☕",
        "youtube":       "https://www.youtube.com/watch?v=eIrMbAQSU34",
        "documentation": "https://docs.oracle.com/en/java/",
        "practice":      "https://www.hackerrank.com/domains/java",
    },
    "javascript": {
        "icon": "📜",
        "youtube":       "https://www.youtube.com/watch?v=W6NZfCO5SIk",
        "documentation": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        "practice":      "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
    },
    "typescript": {
        "icon": "🔷",
        "youtube":       "https://www.youtube.com/watch?v=30LWjhZzg50",
        "documentation": "https://www.typescriptlang.org/docs/",
        "practice":      "https://www.typescriptlang.org/play",
    },
    "react": {
        "icon": "⚛️",
        "youtube":       "https://www.youtube.com/watch?v=SqcY0GlETPk",
        "documentation": "https://react.dev",
        "practice":      "https://codesandbox.io",
    },
    "node.js": {
        "icon": "🟩",
        "youtube":       "https://www.youtube.com/watch?v=ENrzD9HAZK4",
        "documentation": "https://nodejs.org/en/docs",
        "practice":      "https://www.hackerrank.com/domains/nodejs",
    },
    "flask": {
        "icon": "🌶️",
        "youtube":       "https://www.youtube.com/watch?v=Z1RJmh_OqeA",
        "documentation": "https://flask.palletsprojects.com",
        "practice":      "https://replit.com",
    },
    "django": {
        "icon": "🎸",
        "youtube":       "https://www.youtube.com/watch?v=PtQiiknWUcI",
        "documentation": "https://docs.djangoproject.com/en/stable/",
        "practice":      "https://replit.com",
    },
    "fastapi": {
        "icon": "⚡",
        "youtube":       "https://www.youtube.com/watch?v=0sOvCWFmrtA",
        "documentation": "https://fastapi.tiangolo.com",
        "practice":      "https://replit.com",
    },
    "sql": {
        "icon": "🗄️",
        "youtube":       "https://www.youtube.com/watch?v=HXV3zeQKqGY",
        "documentation": "https://www.w3schools.com/sql/",
        "practice":      "https://sqlzoo.net",
    },
    "mysql": {
        "icon": "🐬",
        "youtube":       "https://www.youtube.com/watch?v=7S_tz1z_5bA",
        "documentation": "https://dev.mysql.com/doc/",
        "practice":      "https://sqlzoo.net",
    },
    "postgresql": {
        "icon": "🐘",
        "youtube":       "https://www.youtube.com/watch?v=qw--VYLpxG4",
        "documentation": "https://www.postgresql.org/docs/",
        "practice":      "https://www.pgexercises.com",
    },
    "mongodb": {
        "icon": "🍃",
        "youtube":       "https://www.youtube.com/watch?v=ofme2o29ngU",
        "documentation": "https://www.mongodb.com/docs/",
        "practice":      "https://learn.mongodb.com",
    },
    "docker": {
        "icon": "🐳",
        "youtube":       "https://www.youtube.com/watch?v=fqMOX6JJhGo",
        "documentation": "https://docs.docker.com",
        "practice":      "https://labs.play-with-docker.com",
    },
    "kubernetes": {
        "icon": "☸️",
        "youtube":       "https://www.youtube.com/watch?v=X48VuDVv0do",
        "documentation": "https://kubernetes.io/docs/home/",
        "practice":      "https://killercoda.com/kubernetes",
    },
    "aws": {
        "icon": "☁️",
        "youtube":       "https://www.youtube.com/watch?v=k1RI5locZE4",
        "documentation": "https://docs.aws.amazon.com",
        "practice":      "https://aws.amazon.com/training/",
    },
    "azure": {
        "icon": "🔵",
        "youtube":       "https://www.youtube.com/watch?v=NKEFWyqJ5XA",
        "documentation": "https://learn.microsoft.com/en-us/azure/",
        "practice":      "https://learn.microsoft.com/en-us/training/azure/",
    },
    "gcp": {
        "icon": "🌈",
        "youtube":       "https://www.youtube.com/watch?v=IeMYQ-qJeK4",
        "documentation": "https://cloud.google.com/docs",
        "practice":      "https://cloud.google.com/training",
    },
    "git": {
        "icon": "🔀",
        "youtube":       "https://www.youtube.com/watch?v=RGOj5yH7evk",
        "documentation": "https://git-scm.com/doc",
        "practice":      "https://learngitbranching.js.org",
    },
    "github": {
        "icon": "🐙",
        "youtube":       "https://www.youtube.com/watch?v=RGOj5yH7evk",
        "documentation": "https://docs.github.com/en",
        "practice":      "https://learngitbranching.js.org",
    },
    "dsa": {
        "icon": "🧮",
        "youtube":       "https://www.youtube.com/watch?v=8hly31xKli0",
        "documentation": "https://www.geeksforgeeks.org/data-structures/",
        "practice":      "https://leetcode.com",
    },
    "machine learning": {
        "icon": "🤖",
        "youtube":       "https://www.youtube.com/watch?v=NWONeJKn9Gg",
        "documentation": "https://scikit-learn.org/stable/documentation.html",
        "practice":      "https://www.kaggle.com/learn",
    },
    "deep learning": {
        "icon": "🧠",
        "youtube":       "https://www.youtube.com/watch?v=aircAruvnKk",
        "documentation": "https://www.deeplearningbook.org",
        "practice":      "https://www.kaggle.com/learn",
    },
    "rest api": {
        "icon": "🔌",
        "youtube":       "https://www.youtube.com/watch?v=SLwpqD8n3d0",
        "documentation": "https://restfulapi.net",
        "practice":      "https://reqres.in",
    },
    "graphql": {
        "icon": "◼️",
        "youtube":       "https://www.youtube.com/watch?v=ed8SzALpx1Q",
        "documentation": "https://graphql.org/learn/",
        "practice":      "https://graphqlzero.almansi.me",
    },
    "linux": {
        "icon": "🐧",
        "youtube":       "https://www.youtube.com/watch?v=sWbUDq4S6Y8",
        "documentation": "https://linuxcommand.org",
        "practice":      "https://linuxjourney.com",
    },
    "oop": {
        "icon": "📦",
        "youtube":       "https://www.youtube.com/watch?v=SiBw7os-_zI",
        "documentation": "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/",
        "practice":      "https://www.hackerrank.com/domains/java",
    },
    "dbms": {
        "icon": "🗃️",
        "youtube":       "https://www.youtube.com/watch?v=kBdlM6hNDAE",
        "documentation": "https://www.geeksforgeeks.org/dbms/",
        "practice":      "https://sqlzoo.net",
    },
    "operating system": {
        "icon": "💻",
        "youtube":       "https://www.youtube.com/watch?v=vBURTt97EkA",
        "documentation": "https://www.geeksforgeeks.org/operating-systems/",
        "practice":      "https://www.geeksforgeeks.org/operating-systems/",
    },
    "computer networks": {
        "icon": "🌐",
        "youtube":       "https://www.youtube.com/watch?v=qiQR5rTSshw",
        "documentation": "https://www.geeksforgeeks.org/computer-network-tutorials/",
        "practice":      "https://www.geeksforgeeks.org/computer-network-tutorials/",
    },
    "system design": {
        "icon": "🏗️",
        "youtube":       "https://www.youtube.com/watch?v=i53Gi_K3o7I",
        "documentation": "https://github.com/donnemartin/system-design-primer",
        "practice":      "https://www.educative.io/courses/grokking-the-system-design-interview",
    },
    "pandas": {
        "icon": "🐼",
        "youtube":       "https://www.youtube.com/watch?v=ZyhVh-qRZPA",
        "documentation": "https://pandas.pydata.org/docs/",
        "practice":      "https://www.kaggle.com/learn/pandas",
    },
    "numpy": {
        "icon": "🔢",
        "youtube":       "https://www.youtube.com/watch?v=QUT1VHiLmmI",
        "documentation": "https://numpy.org/doc/stable/",
        "practice":      "https://www.kaggle.com/learn",
    },
    "c": {
        "icon": "🔧",
        "youtube":       "https://www.youtube.com/watch?v=KJgsSFOSQv0",
        "documentation": "https://en.cppreference.com/w/c",
        "practice":      "https://www.hackerrank.com/domains/c",
    },
    "c++": {
        "icon": "⚙️",
        "youtube":       "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
        "documentation": "https://en.cppreference.com/w/cpp",
        "practice":      "https://www.hackerrank.com/domains/cpp",
    },
    "html": {
        "icon": "🏷️",
        "youtube":       "https://www.youtube.com/watch?v=qz0aGYrrlhU",
        "documentation": "https://developer.mozilla.org/en-US/docs/Web/HTML",
        "practice":      "https://www.freecodecamp.org",
    },
    "css": {
        "icon": "🎨",
        "youtube":       "https://www.youtube.com/watch?v=yfoY53QXEnI",
        "documentation": "https://developer.mozilla.org/en-US/docs/Web/CSS",
        "practice":      "https://flexboxfroggy.com",
    },
}

# ── Helper ──────────────────────────────────────────────────────
def get_resource(skill_name: str) -> dict:
    """
    Return the resource dict for a skill (case-insensitive).
    Returns an empty dict when no match is found.
    """
    return RESOURCES.get(skill_name.lower(), {})


def get_resources_for_skills(skill_names: list) -> list:
    """
    Return a list of resource objects (with 'title' added) for
    each skill that has a known resource entry.
    """
    result = []
    seen   = set()
    for skill in skill_names:
        key = skill.lower()
        if key in seen:
            continue
        seen.add(key)
        entry = RESOURCES.get(key)
        if entry:
            result.append({
                "title":         skill,
                "icon":          entry.get("icon", "📚"),
                "youtube":       entry.get("youtube", ""),
                "documentation": entry.get("documentation", ""),
                "practice":      entry.get("practice", ""),
            })
    return result
