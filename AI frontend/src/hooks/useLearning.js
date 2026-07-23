import { useState, useEffect, useCallback } from "react";

const API_BASE = "http://127.0.0.1:5000";

/* ── Fallback data — shown when Flask is offline ────────────── */
const FALLBACK = {
  recommendedSkills: ["Python", "React", "Flask", "SQL", "DSA", "System Design"],
  roadmap: [
    { week: 1,  title: "Python Basics",            description: "Variables, loops, functions, OOP",              status: "completed" },
    { week: 2,  title: "Data Structures & Algorithms", description: "Arrays, linked lists, stacks, queues",      status: "completed" },
    { week: 3,  title: "React Fundamentals",        description: "Components, props, state, hooks",               status: "in_progress" },
    { week: 4,  title: "Flask & REST APIs",         description: "Routes, models, JWT auth, CORS",                status: "upcoming"   },
    { week: 5,  title: "SQL & Databases",           description: "Queries, joins, normalisation, indexing",       status: "upcoming"   },
    { week: 6,  title: "System Design",             description: "Scalability, caching, load balancing, DBs",     status: "upcoming"   },
    { week: 7,  title: "Docker & DevOps",           description: "Containerisation, CI/CD, AWS basics",           status: "upcoming"   },
    { week: 8,  title: "Mock Interviews & Revision","description": "Full revision and practice interviews",        status: "upcoming"   },
  ],
  resources: [
    {
      title:         "Python",
      icon:          "🐍",
      youtube:       "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
      documentation: "https://docs.python.org/3/",
      practice:      "https://www.hackerrank.com/domains/python",
    },
    {
      title:         "React",
      icon:          "⚛️",
      youtube:       "https://www.youtube.com/watch?v=SqcY0GlETPk",
      documentation: "https://react.dev",
      practice:      "https://codesandbox.io",
    },
    {
      title:         "Flask",
      icon:          "🌶️",
      youtube:       "https://www.youtube.com/watch?v=Z1RJmh_OqeA",
      documentation: "https://flask.palletsprojects.com",
      practice:      "https://replit.com",
    },
    {
      title:         "SQL",
      icon:          "🗄️",
      youtube:       "https://www.youtube.com/watch?v=HXV3zeQKqGY",
      documentation: "https://www.w3schools.com/sql/",
      practice:      "https://sqlzoo.net",
    },
    {
      title:         "DSA",
      icon:          "🧮",
      youtube:       "https://www.youtube.com/watch?v=8hly31xKli0",
      documentation: "https://www.geeksforgeeks.org/data-structures/",
      practice:      "https://leetcode.com",
    },
    {
      title:         "System Design",
      icon:          "🏗️",
      youtube:       "https://www.youtube.com/watch?v=i53Gi_K3o7I",
      documentation: "https://github.com/donnemartin/system-design-primer",
      practice:      "https://www.educative.io/courses/grokking-the-system-design-interview",
    },
  ],
  skillProgress: [
    { name: "Python",        progress: 75, color: "#818cf8" },
    { name: "React",         progress: 60, color: "#34d399" },
    { name: "SQL",           progress: 55, color: "#22d3ee" },
    { name: "DSA",           progress: 50, color: "#fbbf24" },
    { name: "Flask",         progress: 40, color: "#f87171" },
    { name: "Docker",        progress: 20, color: "#a78bfa" },
    { name: "System Design", progress: 15, color: "#fb923c" },
  ],
  dailyChallenge: {
    title:       "Implement a Binary Search",
    description: "Write a function that performs binary search on a sorted array and returns the index of the target element, or -1 if not found.",
    difficulty:  "Medium",
    topic:       "DSA",
    timeLimit:   "30 min",
    hint:        "Use two pointers: left and right. Check the middle element each iteration.",
    practiceUrl: "https://leetcode.com/problems/binary-search/",
  },
  aiSuggestions: [
    "Focus on React hooks this week — useState and useEffect are commonly tested.",
    "Practice 2–3 LeetCode problems daily to build DSA consistency.",
    "Build a CRUD Flask app to solidify your backend fundamentals.",
    "Study SQL window functions — they appear frequently in data roles.",
    "Complete the Week 3 roadmap before moving to Week 4.",
  ],
  overallProgress: 38,
};

/* ══════════════════════════════════════════════════════════════
   useLearning  — custom hook
   Fetches GET /learning, merges with fallback, exposes refresh.
══════════════════════════════════════════════════════════════ */
export function useLearning() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/learning`);
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const json = await res.json();

      /* Merge API response with fallback so missing fields never crash the UI */
      setData({
        ...FALLBACK,
        ...json,
        skillProgress:  json.skillProgress  ?? FALLBACK.skillProgress,
        dailyChallenge: json.dailyChallenge  ?? FALLBACK.dailyChallenge,
        aiSuggestions:  json.aiSuggestions   ?? FALLBACK.aiSuggestions,
        overallProgress:json.overallProgress ?? FALLBACK.overallProgress,
      });
      setUsingFallback(false);
    } catch (err) {
      console.warn("Learning API unavailable, using fallback data.", err);
      setData(FALLBACK);
      setError(err.message);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, usingFallback, refresh: fetchData };
}
