# utils/interview_generator.py
# ─────────────────────────────────────────────────────────────────────────────
# Generates a structured set of 10 interview questions tailored to:
#   - company   (determines tech stack, culture, question tone)
#   - role      (determines technical depth and domain)
#   - experience (Fresher / 0-1 Years / 1-3 Years / 3-5 Years)
#
# Question distribution (10 total):
#   4 × Technical   — concept / system design questions
#   2 × Coding      — data structures / algorithmic problems
#   2 × Behavioral  — situational / STAR-format questions
#   2 × HR          — motivation / culture-fit questions
#
# Public API:
#   generate_interview_questions(company, role, experience) -> list[dict]
#   Each dict: { id, type, question }
# ─────────────────────────────────────────────────────────────────────────────

from data.companies import get_required_skills, get_role_data

# ── Question banks ────────────────────────────────────────────────────────────
# Keyed by lowercase skill name.  Each list has Easy/Medium/Hard variants.

TECHNICAL_QUESTIONS = {
    "python": [
        "Explain the difference between a list, tuple, and set in Python.",
        "How does Python's Global Interpreter Lock (GIL) affect multi-threaded programs?",
        "Describe Python's memory management and garbage collection strategy.",
    ],
    "java": [
        "Explain the difference between HashMap and ConcurrentHashMap.",
        "How does Java's JVM handle garbage collection, and what are the GC algorithms?",
        "Describe the difference between checked and unchecked exceptions.",
    ],
    "javascript": [
        "Explain closures and the event loop in JavaScript.",
        "What is the difference between == and === in JavaScript?",
        "How does the prototype chain work in JavaScript?",
    ],
    "react": [
        "Explain the Virtual DOM and how React's reconciliation algorithm works.",
        "What is the difference between useEffect and useLayoutEffect?",
        "How would you optimize a React application that re-renders too frequently?",
    ],
    "node.js": [
        "How does Node.js handle asynchronous I/O using libuv?",
        "Explain the difference between process.nextTick(), setImmediate(), and setTimeout().",
        "How would you handle memory leaks in a long-running Node.js process?",
    ],
    "sql": [
        "Explain the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN.",
        "What is query optimization and how would you use EXPLAIN to diagnose a slow query?",
        "Describe the difference between clustered and non-clustered indexes.",
    ],
    "system design": [
        "Design a URL shortener like bit.ly — walk through HLD and LLD.",
        "How would you design a distributed cache like Redis at scale?",
        "Design a notification system that handles 10 million users.",
    ],
    "docker": [
        "Explain the difference between a Docker image and a Docker container.",
        "How does Docker networking work? Explain bridge, host, and overlay networks.",
        "What are multi-stage Docker builds and why are they useful?",
    ],
    "kubernetes": [
        "Explain the difference between a Deployment and a StatefulSet in Kubernetes.",
        "How does Kubernetes handle pod scheduling and resource allocation?",
        "What is a Kubernetes Ingress controller and when would you use it?",
    ],
    "aws": [
        "Explain the difference between EC2, Lambda, and ECS/EKS.",
        "How does AWS Auto Scaling work and how would you configure it?",
        "What is the difference between S3 storage classes and when would you use Glacier?",
    ],
    "dsa": [
        "Explain the time and space complexity of QuickSort versus MergeSort.",
        "What is the difference between BFS and DFS, and when would you use each?",
        "Describe a situation where a heap is preferable over a sorted array.",
    ],
    "machine learning": [
        "Explain the difference between overfitting and underfitting and how to address them.",
        "What is the bias-variance trade-off in machine learning?",
        "Explain how gradient descent works and its variants (SGD, Adam).",
    ],
    "dbms": [
        "Explain the ACID properties with a real-world example.",
        "What is database normalization? Explain 1NF, 2NF, and 3NF.",
        "Describe the difference between pessimistic and optimistic concurrency control.",
    ],
    "os": [
        "Explain the difference between a process and a thread.",
        "How does virtual memory work and what is a page fault?",
        "Describe the dining philosophers problem and common solutions.",
    ],
    "operating system": [
        "Explain the difference between a process and a thread.",
        "How does virtual memory work and what is a page fault?",
        "Describe the dining philosophers problem and common solutions.",
    ],
    "computer networks": [
        "Explain the TCP three-way handshake in detail.",
        "What is the difference between TCP and UDP? When would you use each?",
        "How does HTTPS work? Describe the TLS handshake.",
    ],
    "git": [
        "Explain the difference between git merge and git rebase.",
        "How would you revert a commit that has already been pushed to main?",
        "What is a git detached HEAD state and how do you recover from it?",
    ],
    "linux": [
        "Explain the difference between a hard link and a symbolic link.",
        "How would you diagnose high CPU usage on a Linux server?",
        "Describe how the Linux kernel handles system calls.",
    ],
    "default": [
        "Explain the most important design patterns you use in your work.",
        "How do you approach debugging a production issue?",
        "Describe the architecture of a recent project you built.",
    ],
}

CODING_QUESTIONS = {
    "dsa": [
        "Implement an LRU Cache using a HashMap and Doubly Linked List.",
        "Given a binary tree, write a function to find the maximum path sum.",
        "Implement Dijkstra's algorithm for shortest path in a weighted graph.",
        "Find all permutations of a string without using built-in functions.",
    ],
    "python": [
        "Write a Python function to find the longest substring without repeating characters.",
        "Implement a stack that supports push, pop, and getMin in O(1) time.",
        "Write a function to flatten a deeply nested dictionary.",
        "Implement binary search on a rotated sorted array.",
    ],
    "java": [
        "Implement a thread-safe Singleton class in Java.",
        "Write a Java solution to detect a cycle in a linked list.",
        "Implement a custom iterator for a range of integers.",
        "Write a function to serialize and deserialize a binary tree.",
    ],
    "javascript": [
        "Implement a debounce function from scratch in JavaScript.",
        "Write a function to deep clone a JavaScript object without using JSON methods.",
        "Implement Promise.all from scratch.",
        "Write a function to find all pairs in an array that sum to a target.",
    ],
    "sql": [
        "Write a SQL query to find the second-highest salary without using MAX or LIMIT.",
        "Write a query to find employees who earn more than their managers.",
        "Implement a running total using SQL window functions.",
        "Write a query to detect duplicate rows in a table.",
    ],
    "default": [
        "Reverse a linked list in-place and explain your approach.",
        "Given an array of integers, find two numbers that sum to a target value.",
        "Write a function to check if a string is a valid palindrome.",
        "Implement a queue using two stacks.",
    ],
}

BEHAVIORAL_QUESTIONS_FRESHER = [
    "Tell me about a challenging project you built during your studies and what you learned.",
    "Describe a time when you had to learn a new technology quickly. How did you approach it?",
    "Give an example of a time you worked in a team. What was your role and contribution?",
    "Tell me about a time you faced a technical problem you couldn't solve immediately. What did you do?",
    "Describe a situation where you had to prioritise multiple tasks with tight deadlines.",
    "Tell me about a time you received critical feedback. How did you respond?",
    "Give an example of when you took initiative on a project without being asked.",
    "Describe a time when you disagreed with a teammate. How did you handle it?",
]

BEHAVIORAL_QUESTIONS_EXPERIENCED = [
    "Describe a time you led a team through a critical technical challenge.",
    "Tell me about a time you had to make a technical decision with incomplete information.",
    "Give an example of a system design decision you regret and what you learned from it.",
    "Describe a situation where you had to push back on a deadline with stakeholders.",
    "Tell me about a time you improved the performance of a production system significantly.",
    "Describe a time when you had to mentor a junior engineer. What approach did you take?",
    "Give an example of a time you identified and fixed a critical bug in production.",
    "Tell me about the most complex distributed system you have designed or worked on.",
]

HR_QUESTIONS_FRESHER = [
    f"Why do you want to join {{company}}?",
    "Where do you see yourself in 3–5 years?",
    "What motivates you to pursue a career in software engineering?",
    "What do you know about {company}'s products and culture?",
    "Why did you choose this role specifically?",
    "How do you keep yourself updated with the latest technology trends?",
    "What is your greatest strength and how will it help you in this role?",
    "What is one area you are actively working to improve?",
]

HR_QUESTIONS_EXPERIENCED = [
    "Why are you looking to leave your current company?",
    "What factors are most important to you in your next role?",
    "How do you evaluate a new technology before adopting it in production?",
    "What does a healthy engineering culture look like to you?",
    "How do you balance technical debt with feature delivery?",
    "Describe your ideal engineering team dynamic.",
    "What is your approach to performance reviews and growing your team?",
    "Why {company} specifically — what excites you about our engineering challenges?",
]

# Company-specific technical question additions
COMPANY_SPECIFIC_QUESTIONS = {
    "google": [
        "How would you design Google Search's autocomplete feature?",
        "Explain how you would improve the ranking algorithm of Google Maps.",
    ],
    "amazon": [
        "Walk me through how you would design Amazon's recommendation engine.",
        "How does Amazon's Leadership Principle 'Customer Obsession' reflect in your technical decisions?",
    ],
    "microsoft": [
        "How would you design a real-time collaborative editor like Microsoft Word Online?",
        "Explain how Azure's auto-scaling handles sudden traffic spikes.",
    ],
    "meta": [
        "How would you design Facebook's News Feed ranking system?",
        "Walk me through the design of Instagram's notification delivery system.",
    ],
    "netflix": [
        "How would you design Netflix's video encoding and streaming pipeline?",
        "Explain how you would implement Netflix's chaos engineering approach in your team.",
    ],
    "apple": [
        "How does Apple's on-device machine learning differ from cloud-based ML?",
        "Explain the security model of iOS app sandboxing.",
    ],
    "uber": [
        "How would you design Uber's real-time driver-rider matching system?",
        "Explain how surge pricing works at a systems level.",
    ],
    "razorpay": [
        "How would you design a payment retry mechanism with idempotency guarantees?",
        "Explain how you would implement a distributed rate limiter for payment APIs.",
    ],
    "zerodha": [
        "How would you design a real-time stock order book?",
        "Explain how you would handle high-frequency writes in a trading platform.",
    ],
    "swiggy": [
        "How would you design Swiggy's real-time order tracking system?",
        "Explain the algorithm behind assigning delivery partners to orders.",
    ],
}


# ─────────────────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────────────────

def _is_experienced(experience: str) -> bool:
    return experience.lower() not in ("fresher", "0-1 years")


def _get_technical_questions(skills: list, company: str, count: int) -> list:
    """
    Pull technical questions relevant to the role's required skills.
    Falls back to company-specific questions, then generic defaults.
    """
    pool = []

    # Company-specific first (highest relevance)
    company_qs = COMPANY_SPECIFIC_QUESTIONS.get(company.lower(), [])
    pool.extend(company_qs)

    # Skill-based questions
    for skill in skills:
        key = skill.lower()
        qs  = TECHNICAL_QUESTIONS.get(key, [])
        pool.extend(qs)

    # Fallback
    if len(pool) < count:
        pool.extend(TECHNICAL_QUESTIONS["default"])

    # Deduplicate while preserving order
    seen, unique = set(), []
    for q in pool:
        if q not in seen:
            seen.add(q)
            unique.append(q)

    return unique[:count]


def _get_coding_questions(skills: list, count: int) -> list:
    """Pull coding questions from skills, fall back to default."""
    pool = []
    for skill in skills:
        key = skill.lower()
        qs  = CODING_QUESTIONS.get(key, [])
        pool.extend(qs)

    if len(pool) < count:
        pool.extend(CODING_QUESTIONS["default"])

    seen, unique = set(), []
    for q in pool:
        if q not in seen:
            seen.add(q)
            unique.append(q)

    return unique[:count]


def _get_behavioral_questions(experience: str, count: int) -> list:
    bank = BEHAVIORAL_QUESTIONS_EXPERIENCED if _is_experienced(experience) \
           else BEHAVIORAL_QUESTIONS_FRESHER
    return bank[:count]


def _get_hr_questions(company: str, experience: str, count: int) -> list:
    bank = HR_QUESTIONS_EXPERIENCED if _is_experienced(experience) \
           else HR_QUESTIONS_FRESHER
    # Format company name into placeholders
    formatted = [q.replace("{company}", company).replace("{company}'s", f"{company}'s")
                 for q in bank]
    return formatted[:count]


# ─────────────────────────────────────────────────────────────────────────────
# Public API
# ─────────────────────────────────────────────────────────────────────────────

def generate_interview_questions(
    company: str,
    role: str,
    experience: str = "Fresher",
) -> list:
    """
    Generate exactly 10 interview questions distributed as:
        4 × Technical
        2 × Coding
        2 × Behavioral
        2 × HR

    Parameters
    ----------
    company    : e.g. "Google"
    role       : e.g. "Software Engineer"
    experience : e.g. "Fresher" | "0-1 Years" | "1-3 Years" | "3-5 Years"

    Returns
    -------
    list of dicts: [{ "id": int, "type": str, "question": str }, ...]
    """
    skills = get_required_skills(company, role)
    if not skills:
        # Fallback skill set when company/role not found
        skills = ["DSA", "OOP", "SQL", "Python", "System Design"]

    technical  = _get_technical_questions(skills, company, count=4)
    coding     = _get_coding_questions(skills, count=2)
    behavioral = _get_behavioral_questions(experience, count=2)
    hr         = _get_hr_questions(company, experience, count=2)

    # Combine in the required order
    ordered = (
        [("Technical",  q) for q in technical]  +
        [("Coding",     q) for q in coding]      +
        [("Behavioral", q) for q in behavioral]  +
        [("HR",         q) for q in hr]
    )

    questions = [
        {"id": i + 1, "type": qtype, "question": question}
        for i, (qtype, question) in enumerate(ordered)
    ]

    return questions
