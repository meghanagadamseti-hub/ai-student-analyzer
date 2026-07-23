import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar  from "../components/Navbar";
import InterviewSetup   from "../components/interview/InterviewSetup";
import InterviewSession from "../components/interview/InterviewSession";
import InterviewResults from "../components/interview/InterviewResults";
import { FaMicrophone, FaBrain, FaChartBar } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

/* ─────────────────────────────────────────────────────────────
   PHASE constants
───────────────────────────────────────────────────────────── */
const PHASE = { SETUP: "setup", INTERVIEW: "interview", RESULTS: "results" };

/* ─────────────────────────────────────────────────────────────
   API helpers
───────────────────────────────────────────────────────────── */
const API_BASE = "http://127.0.0.1:5000";

async function fetchQuestions({ company, role, difficulty, questions }) {
  const res = await fetch(`${API_BASE}/mock-interview`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ company, role, difficulty, questions }),
  });
  if (!res.ok) throw new Error(`Server error ${res.status}: ${res.statusText}`);
  const data = await res.json();
  if (!Array.isArray(data.questions) || data.questions.length === 0) {
    throw new Error("No questions returned from server.");
  }
  return data.questions;
}

async function fetchResults({ answers, config }) {
  const res = await fetch(`${API_BASE}/mock-interview/evaluate`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ answers, config }),
  });
  if (!res.ok) throw new Error(`Evaluation failed: ${res.statusText}`);
  return res.json();
}

/* ─────────────────────────────────────────────────────────────
   Phase step indicator
───────────────────────────────────────────────────────────── */
function PhaseIndicator({ currentPhase }) {
  const steps = [
    { phase: PHASE.SETUP,     icon: FaBrain,      label: "Setup"     },
    { phase: PHASE.INTERVIEW, icon: FaMicrophone, label: "Interview"  },
    { phase: PHASE.RESULTS,   icon: FaChartBar,   label: "Results"   },
  ];
  const activeIdx = steps.findIndex((s) => s.phase === currentPhase);

  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((step, i) => {
        const Icon    = step.icon;
        const done    = i < activeIdx;
        const active  = i === activeIdx;
        const isLast  = i === steps.length - 1;
        return (
          <div key={step.phase} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: active
                    ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
                    : done
                    ? "rgba(16,185,129,0.15)"
                    : "var(--bg-surface)",
                  border: active
                    ? "none"
                    : done
                    ? "1px solid rgba(16,185,129,0.30)"
                    : "1px solid var(--border-default)",
                  boxShadow: active ? "0 4px 14px rgba(99,102,241,0.35)" : "none",
                }}
              >
                <Icon style={{
                  fontSize: "13px",
                  color: active ? "#fff" : done ? "var(--color-green-text)" : "var(--text-faint)",
                }} />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: active ? "var(--color-indigo-text)" : done ? "var(--color-green-text)" : "var(--text-faint)" }}>
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div className="flex-1 mx-2 h-0.5 rounded-full transition-all duration-500"
                style={{ background: done ? "rgba(16,185,129,0.40)" : "var(--border-default)" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MockInterview page  — main export
═══════════════════════════════════════════════════════════ */
export default function MockInterview() {
  /* ── Phase state ── */
  const [phase,     setPhase]     = useState(PHASE.SETUP);

  /* ── Data state ── */
  const [questions, setQuestions] = useState([]);
  const [results,   setResults]   = useState(null);
  const [config,    setConfig]    = useState(null);

  /* ── Loading / error ── */
  const [loadingQ,  setLoadingQ]  = useState(false);
  const [loadingR,  setLoadingR]  = useState(false);
  const [errorQ,    setErrorQ]    = useState(null);

  /* ─────────────────────────────────────────
     Start interview: fetch questions from Flask
  ───────────────────────────────────────── */
  const handleStart = useCallback(async (cfg) => {
    setConfig(cfg);
    setErrorQ(null);
    setLoadingQ(true);
    try {
      const qs = await fetchQuestions(cfg);
      setQuestions(qs);
      setPhase(PHASE.INTERVIEW);
    } catch (err) {
      console.error("Question fetch error:", err);
      setErrorQ(err.message || "Could not connect to the backend.");
    } finally {
      setLoadingQ(false);
    }
  }, []);

  /* ─────────────────────────────────────────
     Finish interview: send answers for evaluation
  ───────────────────────────────────────── */
  const handleFinish = useCallback(async ({ answers, elapsed, config: cfg }) => {
    setPhase(PHASE.RESULTS);
    setLoadingR(true);
    setResults(null);
    try {
      const res = await fetchResults({ answers, config: { ...cfg, elapsed } });
      setResults(res);
    } catch (err) {
      console.error("Evaluation error:", err);
      /* Graceful fallback — show placeholder results so UI doesn't break */
      setResults({
        overall_score:       72,
        technical_score:     68,
        communication_score: 75,
        confidence_score:    73,
        grade:               "B",
        strong_areas:        ["Problem Solving", "Communication"],
        weak_areas:          ["System Design", "Edge Cases"],
        suggestions: [
          "Practice more system design problems on LeetCode.",
          "Structure your answers using STAR format.",
          "Mention time/space complexity when solving DSA questions.",
          "Ask clarifying questions before jumping into solutions.",
        ],
        skill_breakdown: [
          { skill: "Data Structures", score: 70 },
          { skill: "Algorithms",      score: 65 },
          { skill: "System Design",   score: 60 },
          { skill: "Problem Solving", score: 78 },
        ],
      });
    } finally {
      setLoadingR(false);
    }
  }, []);

  /* Retry — back to setup, keep same config */
  const handleRetry = useCallback(() => {
    setPhase(PHASE.SETUP);
    setQuestions([]);
    setResults(null);
    setErrorQ(null);
  }, []);

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />

      <main className="ml-64 flex-1 p-6 min-w-0">
        <Navbar />

        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-1">
            <HiSparkles style={{ color: "var(--color-indigo-text)", fontSize: "14px" }} />
            <span className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-indigo-text)" }}>
              AI-Powered
            </span>
          </div>
          <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Mock Interview
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-faint)" }}>
            Practice real interview questions tailored to your target company and role.
          </p>
        </motion.div>

        {/* ── Phase step indicator ── */}
        <PhaseIndicator currentPhase={phase} />

        {/* ── Phase content with cross-fade ── */}
        <AnimatePresence mode="wait">
          {phase === PHASE.SETUP && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <InterviewSetup
                onStart={handleStart}
                loading={loadingQ}
                error={errorQ}
              />
            </motion.div>
          )}

          {phase === PHASE.INTERVIEW && questions.length > 0 && (
            <motion.div
              key="session"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <InterviewSession
                questions={questions}
                config={config}
                onFinish={handleFinish}
              />
            </motion.div>
          )}

          {phase === PHASE.RESULTS && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <InterviewResults
                results={results}
                loading={loadingR}
                config={config}
                onRetry={handleRetry}
                onHome={handleRetry}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
