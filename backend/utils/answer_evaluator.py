# utils/answer_evaluator.py
# ─────────────────────────────────────────────────────────────────────────────
# Rule-based answer evaluator for the Mock Interview module.
# No external AI API required — uses keyword coverage, structure signals,
# depth indicators, and length heuristics to score answers 0–10.
#
# Scoring dimensions (total 100 pts, scaled to 0–10):
#   Length / substance      25 pts
#   Technical keyword match 30 pts
#   Structure / clarity     20 pts
#   Depth / analysis        15 pts
#   Red-flag penalty       −10 pts max
#
# Public API:
#   evaluate_answer(question: str, answer: str) -> dict
#   Returns: { score, feedback, strengths, improvements }
# ─────────────────────────────────────────────────────────────────────────────

import re

# ─────────────────────────────────────────────────────────────────────────────
# Keyword signal banks
# key   = substring that must appear in the question (lowercase)
# value = list of technical terms expected in a good answer
# ─────────────────────────────────────────────────────────────────────────────
KEYWORD_SIGNALS = {
    # Data Structures & Algorithms
    "binary search":       ["mid", "left", "right", "log n", "sorted", "iteration", "recursion"],
    "linked list":         ["node", "pointer", "next", "head", "null", "traverse"],
    "lru cache":           ["hashmap", "doubly linked", "evict", "o(1)", "capacity", "node"],
    "dynamic programming": ["memoization", "tabulation", "subproblem", "overlap", "cache", "dp"],
    "sorting":             ["compare", "divide", "merge", "pivot", "complexity", "stable"],
    "graph":               ["vertex", "edge", "bfs", "dfs", "adjacency", "cycle", "path"],
    "tree":                ["root", "leaf", "height", "traversal", "inorder", "balanced", "bst"],
    "hash":                ["collision", "bucket", "key", "value", "load factor", "chaining"],
    "time complexity":     ["o(n)", "o(log n)", "o(n^2)", "constant", "linear", "quadratic"],
    # System Design
    "system design":       ["scalability", "availability", "consistency", "load balance",
                            "cache", "database", "microservice", "api", "latency", "throughput"],
    "url shortener":       ["hash", "base62", "redirect", "collision", "database", "cache"],
    "notification":        ["queue", "pub/sub", "kafka", "push", "websocket", "fanout"],
    "cache":               ["redis", "lru", "eviction", "hit rate", "ttl", "invalidation"],
    "database":            ["index", "query", "schema", "normalization", "acid", "transaction"],
    # OOP & Patterns
    "solid":               ["single responsibility", "open closed", "liskov", "interface",
                            "dependency"],
    "singleton":           ["instance", "thread safe", "lazy", "private", "static"],
    "design pattern":      ["factory", "observer", "strategy", "decorator", "proxy"],
    "polymorphism":        ["override", "interface", "abstract", "runtime", "compile"],
    "inheritance":         ["extend", "parent", "child", "super", "base class", "override"],
    "encapsulation":       ["private", "getter", "setter", "access modifier", "hide"],
    # Databases
    "join":                ["inner", "left", "right", "outer", "on", "where", "table"],
    "index":               ["clustered", "non-clustered", "b-tree", "query", "scan"],
    "normalization":       ["1nf", "2nf", "3nf", "redundancy", "dependency", "atomic"],
    "acid":                ["atomicity", "consistency", "isolation", "durability", "transaction"],
    # Distributed Systems
    "cap theorem":         ["consistency", "availability", "partition", "trade-off", "eventual"],
    "kafka":               ["producer", "consumer", "topic", "partition", "broker", "offset"],
    "microservice":        ["service", "api gateway", "discovery", "decouple", "docker"],
    # Cloud & DevOps
    "docker":              ["image", "container", "dockerfile", "layer", "volume", "compose"],
    "kubernetes":          ["pod", "deployment", "service", "namespace", "node", "orchestration"],
    "aws":                 ["ec2", "s3", "lambda", "iam", "rds", "vpc", "region"],
    # Python
    "gil":                 ["global interpreter lock", "thread", "cpython", "multiprocessing"],
    "generator":           ["yield", "lazy", "iterator", "memory", "next", "iterable"],
    "decorator":           ["wrapper", "functools", "higher order", "closure"],
    # Java
    "garbage collection":  ["heap", "gc", "jvm", "generational", "eden", "survivor"],
    "thread":              ["runnable", "synchronize", "lock", "deadlock", "race condition"],
    # JavaScript / React
    "closure":             ["outer function", "scope", "lexical", "inner function"],
    "event loop":          ["call stack", "callback", "microtask", "macrotask", "non-blocking"],
    "virtual dom":         ["reconciliation", "diff", "fiber", "render", "component"],
    "useeffect":           ["side effect", "dependency", "cleanup", "mount", "unmount"],
    # Behavioral / HR (presence of narrative words counts)
    "tell me about":       ["i", "my", "team", "project", "result", "learned", "challenge"],
    "challenging":         ["problem", "solution", "approach", "result", "learned"],
    "disagreement":        ["communicated", "listened", "compromise", "resolved"],
    "why":                 ["because", "interested", "passion", "growth", "opportunity"],
    "strength":            ["i am", "skilled", "example", "demonstrated", "result"],
    "weakness":            ["improving", "working on", "aware", "steps", "better"],
}

# Phrases that raise the structure score
STRUCTURE_SIGNALS = [
    "first", "second", "third", "finally", "in conclusion",
    "for example", "such as", "specifically", "in addition",
    "however", "on the other hand", "therefore", "because",
    "the main", "step 1", "step 2", "approach",
]

# Phrases that show depth of analysis
DEPTH_SIGNALS = [
    "trade-off", "trade off", "however", "but", "although",
    "in practice", "real world", "production", "at scale",
    "time complexity", "space complexity", "big o",
    "edge case", "alternatively", "downside", "limitation",
    "compared to", "rather than", "instead of",
]

# Responses that attract a scoring penalty
RED_FLAGS = [
    "i don't know", "i dont know", "not sure", "no idea",
    "never heard", "skip", "n/a", "pass",
]

FILLER_ONLY = {
    "yes", "no", "ok", "okay", "done", "sure", "fine",
    "good", "great", "correct", "right", "exactly",
}

GENERIC_SIGNALS = [
    "because", "example", "approach", "result", "therefore",
    "i would", "we can", "the key", "important", "use case",
]


# ─────────────────────────────────────────────────────────────────────────────
# Scoring helpers
# ─────────────────────────────────────────────────────────────────────────────

def _score_length(answer: str):
    words = len(answer.split())
    if words >= 120:
        return 25, ["Well-developed answer with sufficient detail."], []
    if words >= 70:
        return 20, ["Good answer length covering the key points."], []
    if words >= 35:
        return 13, [], ["Expand your answer with more detail and examples (aim for 70+ words)."]
    if words >= 15:
        return 7,  [], ["Answer is too brief — provide a complete explanation with context."]
    return 0, [], ["Answer is too short to evaluate. Please provide a full response."]


def _score_keywords(question: str, answer: str):
    q = question.lower()
    a = answer.lower()

    # Find the best matching bank
    matched_bank  = None
    matched_topic = None
    for topic, keywords in KEYWORD_SIGNALS.items():
        if topic in q:
            matched_bank  = keywords
            matched_topic = topic
            break

    if matched_bank is None:
        hits  = sum(1 for kw in GENERIC_SIGNALS if kw in a)
        score = min(30, hits * 5)
        strs  = ["Covers the general topic adequately."] if score >= 15 else []
        imps  = [] if score >= 20 else ["Use specific technical terms relevant to the question."]
        return score, strs, imps

    hits     = [kw for kw in matched_bank if kw in a]
    coverage = len(hits) / len(matched_bank)
    score    = round(coverage * 30)

    if coverage >= 0.6:
        strs = [f"Strong technical vocabulary — covered: {', '.join(hits[:3])}."]
        imps = []
    elif coverage >= 0.35:
        strs = ["Mentions several relevant technical concepts."]
        missing = [kw for kw in matched_bank[:4] if kw not in a]
        imps = [f"Also mention: {', '.join(missing[:3])}."] if missing else []
    else:
        missing = [kw for kw in matched_bank[:5] if kw not in a]
        strs = []
        imps = [f"Include more technical terms for '{matched_topic}'. "
                f"Consider: {', '.join(missing[:3])}."]

    return score, strs, imps


def _score_structure(answer: str):
    a    = answer.lower()
    hits = sum(1 for s in STRUCTURE_SIGNALS if s in a)
    score = min(20, hits * 4)

    if hits >= 3:
        return score, ["Well-structured answer with clear logical flow."], []
    if hits >= 1:
        return score, ["Some structure present — reasonably clear answer."], []
    return score, [], [
        "Structure your answer using 'first / then / finally' "
        "or STAR format (Situation → Task → Action → Result)."
    ]


def _score_depth(answer: str):
    a    = answer.lower()
    hits = sum(1 for s in DEPTH_SIGNALS if s in a)
    score = min(15, hits * 5)

    if hits >= 2:
        return score, ["Shows depth — discusses trade-offs or real-world considerations."], []
    return score, [], [
        "Add depth: mention trade-offs, edge cases, or real-world production scenarios."
    ]


def _red_flag_penalty(answer: str):
    a       = answer.lower().strip()
    penalty = 0
    imps    = []

    for phrase in RED_FLAGS:
        if phrase in a:
            penalty += 10
            imps.append("Avoid 'I don't know' — attempt an answer using what you do know.")
            break

    if a in FILLER_ONLY:
        penalty += 10
        imps.append("A one-word response is not sufficient for an interview question.")

    if re.search(r"(.)\1{4,}", answer):
        penalty += 5
        imps.append("Answer appears to contain placeholder or repeated characters.")

    return min(penalty, 10), imps


# ─────────────────────────────────────────────────────────────────────────────
# Question type detector
# ─────────────────────────────────────────────────────────────────────────────

def _question_type(question: str) -> str:
    q = question.lower()
    if any(w in q for w in ["implement", "write a", "code", "function", "algorithm"]):
        return "Coding"
    if any(w in q for w in ["tell me about", "describe a time", "give an example", "situation"]):
        return "Behavioral"
    if any(w in q for w in ["why do you", "where do you see", "motivates", "weakness", "strength"]):
        return "HR"
    return "Technical"


# ─────────────────────────────────────────────────────────────────────────────
# Feedback paragraph builder
# ─────────────────────────────────────────────────────────────────────────────

def _build_feedback(question: str, score_100: int,
                    strengths: list, improvements: list) -> str:
    if score_100 >= 80:
        opener = "Excellent answer."
    elif score_100 >= 65:
        opener = "Good answer overall."
    elif score_100 >= 45:
        opener = "Reasonable attempt, but there is room to improve."
    else:
        opener = "The answer needs significant improvement."

    body = ""
    if strengths:
        body += f" {strengths[0]}"
    if improvements:
        body += f" {improvements[0]}"

    qtype = _question_type(question)
    if qtype == "Coding":
        tip = " For coding questions, always state time and space complexity."
    elif qtype == "Behavioral":
        tip = " Use STAR format: Situation → Task → Action → Result."
    elif qtype == "HR":
        tip = " Be specific and genuine — back every claim with a concrete example."
    else:
        tip = " Relate your answer to real production scenarios where possible."

    return f"{opener}{body}{tip}".strip()


# ─────────────────────────────────────────────────────────────────────────────
# Public API
# ─────────────────────────────────────────────────────────────────────────────

def evaluate_answer(question: str, answer: str) -> dict:
    """
    Evaluate a single interview answer.

    Parameters
    ----------
    question : str  — the interview question text
    answer   : str  — the candidate's answer text

    Returns
    -------
    dict
        score        int   0–10  (one decimal place)
        feedback     str   natural-language paragraph
        strengths    list[str]
        improvements list[str]
    """
    if not answer or not answer.strip():
        return {
            "score":        0,
            "feedback":     "No answer provided. Please type your response before submitting.",
            "strengths":    [],
            "improvements": ["Provide a complete answer to receive meaningful feedback."],
        }

    ls,  l_str,  l_imp  = _score_length(answer)
    ks,  k_str,  k_imp  = _score_keywords(question, answer)
    ss,  s_str,  s_imp  = _score_structure(answer)
    ds,  d_str,  d_imp  = _score_depth(answer)
    pen, p_imp          = _red_flag_penalty(answer)

    raw = max(0, min(100, ls + ks + ss + ds - pen))

    strengths    = list(dict.fromkeys(l_str + k_str + s_str + d_str))[:3]
    improvements = list(dict.fromkeys(l_imp + k_imp + s_imp + d_imp + p_imp))[:3]

    score_10 = round(raw / 10, 1)
    feedback = _build_feedback(question, raw, strengths, improvements)

    print(f"[submit-answer] raw={raw} score={score_10} "
          f"l={ls} kw={ks} st={ss} d={ds} pen={pen}")

    return {
        "score":        score_10,
        "feedback":     feedback,
        "strengths":    strengths,
        "improvements": improvements,
    }
