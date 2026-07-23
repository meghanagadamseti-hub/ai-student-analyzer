import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaClock, FaChevronLeft, FaChevronRight,
  FaFlagCheckered, FaBrain, FaLightbulb,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { useInterviewTimer, useQuestionTimer } from "../../hooks/useInterviewTimer";

/* ── Animated progress bar ─────────────────────────────────── */
function ProgressBar({ current, total }) {
  const pct = Math.round(((current) / total) * 100);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium" style={{ color: "var(--text-faint)" }}>
          Question {current} of {total}
        </span>
        <span className="text-xs font-bold" style={{ color: "var(--color-indigo-text)" }}>
          {pct}% complete
        </span>
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden"
        style={{ background: "var(--border-subtle)" }}>
        <motion.div
          className="h-2 rounded-full"
          style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

/* ── Question timer ring ────────────────────────────────────── */
function TimerRing({ formatted, isWarning, isDanger }) {
  const color = isDanger ? "#f87171" : isWarning ? "#fbbf24" : "var(--color-indigo-text)";
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
      style={{
        background: isDanger ? "rgba(239,68,68,0.10)" : isWarning ? "rgba(245,158,11,0.10)" : "rgba(99,102,241,0.10)",
        border:     `1px solid ${isDanger ? "rgba(239,68,68,0.25)" : isWarning ? "rgba(245,158,11,0.25)" : "rgba(99,102,241,0.20)"}`,
      }}>
      <FaClock style={{ color, fontSize: "12px" }} />
      <span className="text-sm font-bold tabular-nums" style={{ color }}>{formatted}</span>
    </div>
  );
}

/* ── Skeleton loader for question card ─────────────────────── */
function QuestionSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 rounded-xl shimmer" style={{ background: "var(--border-subtle)", width: "20%" }} />
      <div className="h-5 rounded-xl shimmer" style={{ background: "var(--border-subtle)", width: "90%" }} />
      <div className="h-5 rounded-xl shimmer" style={{ background: "var(--border-subtle)", width: "70%" }} />
      <div className="h-28 rounded-xl shimmer mt-4" style={{ background: "var(--border-subtle)" }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   InterviewSession — main export
══════════════════════════════════════════════════════════════ */
export default function InterviewSession({ questions, config, onFinish }) {
  const total    = questions.length;
  const [idx,    setIdx]      = useState(0);
  const [answers, setAnswers] = useState(() =>
    Object.fromEntries(questions.map((q) => [q.id, ""]))
  );
  const [transitioning, setTransitioning] = useState(false);
  const [showHint,      setShowHint]      = useState(false);
  const [finished,      setFinished]      = useState(false);

  // Total elapsed timer (counts up)
  const { formatted: elapsed, start: startTotal } = useInterviewTimer(true);

  // Per-question countdown (2 min per question)
  const PER_Q_SECONDS = 120;
  const handleExpire = useCallback(() => {
    // Auto-advance on time expiry if not on last question
    if (idx < total - 1) goNext();
  }, [idx, total]); // eslint-disable-line

  const { formatted: qTime, isWarning, isDanger, reset: resetQTimer } =
    useQuestionTimer(PER_Q_SECONDS, handleExpire, !finished);

  // Reset per-question timer whenever index changes
  useEffect(() => { resetQTimer(); setShowHint(false); }, [idx]); // eslint-disable-line

  const currentQ = questions[idx];
  const currentAnswer = answers[currentQ?.id] ?? "";

  const saveAnswer = useCallback((val) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: val }));
  }, [currentQ?.id]);

  function goNext() {
    if (idx >= total - 1) return;
    setTransitioning(true);
    setTimeout(() => { setIdx((i) => i + 1); setTransitioning(false); }, 220);
  }

  function goPrev() {
    if (idx <= 0) return;
    setTransitioning(true);
    setTimeout(() => { setIdx((i) => i - 1); setTransitioning(false); }, 220);
  }

  function handleFinish() {
    setFinished(true);
    onFinish({ answers, elapsed, config });
  }

  const answeredCount = Object.values(answers).filter((a) => a.trim().length > 0).length;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* ── Main question panel ── */}
      <div className="xl:col-span-2 space-y-5">

        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="theme-card rounded-2xl px-5 py-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                <FaBrain className="text-white" style={{ fontSize: "12px" }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {config.company} · {config.role}
                </p>
                <p className="text-[11px]" style={{ color: "var(--text-faint)" }}>
                  {config.difficulty} difficulty
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Total elapsed */}
              <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-faint)" }}>
                <FaClock style={{ fontSize: "10px" }} />
                <span className="tabular-nums">{elapsed}</span>
              </div>
              {/* Per-question countdown */}
              <TimerRing formatted={qTime} isWarning={isWarning} isDanger={isDanger} />
            </div>
          </div>
          <ProgressBar current={idx + 1} total={total} />
        </motion.div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          {transitioning ? (
            <motion.div key="skeleton"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="theme-card rounded-2xl p-6">
              <QuestionSkeleton />
            </motion.div>
          ) : (
            <motion.div key={`q-${idx}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22 }}
              className="theme-card rounded-2xl p-6"
            >
              {/* Question number badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold"
                  style={{
                    background: "rgba(99,102,241,0.12)",
                    border:     "1px solid rgba(99,102,241,0.25)",
                    color:      "var(--color-indigo-text)",
                  }}>
                  Q{idx + 1} / {total}
                </span>
                {currentAnswer.trim().length > 0 && (
                  <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold"
                    style={{
                      background: "rgba(16,185,129,0.10)",
                      color:      "var(--color-green-text)",
                    }}>
                    ✓ Answered
                  </span>
                )}
              </div>

              {/* Question text */}
              <p className="text-base font-medium leading-relaxed mb-6"
                style={{ color: "var(--text-primary)" }}>
                {currentQ.question}
              </p>

              {/* Answer textarea */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-2 block"
                  style={{ color: "var(--text-faint)" }}>
                  Your Answer
                </label>
                <textarea
                  rows={6}
                  value={currentAnswer}
                  onChange={(e) => saveAnswer(e.target.value)}
                  placeholder="Type your answer here. Think aloud — explain your reasoning and approach…"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                  style={{
                    background:  "var(--bg-input)",
                    border:      "1px solid var(--border-input)",
                    color:       "var(--text-primary)",
                    lineHeight:  "1.7",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#6366f1";
                    e.target.style.boxShadow   = "0 0 0 3px rgba(99,102,241,0.12)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--border-input)";
                    e.target.style.boxShadow   = "none";
                  }}
                />
                <div className="flex justify-between items-center mt-1.5">
                  <span className="text-[10px]" style={{ color: "var(--text-faint)" }}>
                    Auto-saved
                  </span>
                  <span className="text-[10px]" style={{ color: "var(--text-faint)" }}>
                    {currentAnswer.length} chars
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation row */}
        <div className="flex items-center gap-3">
          <button
            onClick={goPrev}
            disabled={idx === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 transition-all hover:opacity-80"
            style={{
              background: "var(--bg-surface)",
              border:     "1px solid var(--border-default)",
              color:      "var(--text-muted)",
            }}
          >
            <FaChevronLeft style={{ fontSize: "11px" }} />
            Previous
          </button>

          <div className="flex-1 flex justify-center gap-1.5 flex-wrap">
            {questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => { setTransitioning(true); setTimeout(() => { setIdx(i); setTransitioning(false); }, 180); }}
                className="w-7 h-7 rounded-lg text-[11px] font-bold transition-all"
                style={{
                  background: i === idx
                    ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
                    : answers[q.id]?.trim()
                    ? "rgba(16,185,129,0.15)"
                    : "var(--bg-surface)",
                  border: i === idx
                    ? "none"
                    : answers[q.id]?.trim()
                    ? "1px solid rgba(16,185,129,0.30)"
                    : "1px solid var(--border-default)",
                  color: i === idx ? "#fff"
                    : answers[q.id]?.trim() ? "var(--color-green-text)"
                    : "var(--text-faint)",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {idx < total - 1 ? (
            <button
              onClick={goNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-85"
              style={{
                background: "rgba(99,102,241,0.12)",
                border:     "1px solid rgba(99,102,241,0.25)",
                color:      "var(--color-indigo-text)",
              }}
            >
              Next
              <FaChevronRight style={{ fontSize: "11px" }} />
            </button>
          ) : (
            <motion.button
              onClick={handleFinish}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
              style={{
                background: "linear-gradient(135deg,#10b981,#059669)",
                boxShadow:  "0 4px 14px rgba(16,185,129,0.35)",
              }}
            >
              <FaFlagCheckered style={{ fontSize: "12px" }} />
              Finish Interview
            </motion.button>
          )}
        </div>
      </div>

      {/* ── Right sidebar ── */}
      <div className="space-y-5">

        {/* Progress overview */}
        <motion.div
          initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="theme-card rounded-2xl p-5"
        >
          <h3 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>
            Progress Overview
          </h3>
          <div className="space-y-3">
            {[
              { label: "Answered",    value: answeredCount,         total, color: "#34d399" },
              { label: "Remaining",   value: total - answeredCount, total, color: "#fbbf24" },
              { label: "Current",     value: idx + 1,               total, color: "#818cf8" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
                <span className="text-sm font-bold" style={{ color }}>{value} / {total}</span>
              </div>
            ))}
          </div>

          {/* Finish early button */}
          {answeredCount > 0 && (
            <button
              onClick={handleFinish}
              className="mt-4 w-full py-2.5 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-85"
              style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}
            >
              Submit All & Get Results
            </button>
          )}
        </motion.div>

        {/* Hint panel */}
        <motion.div
          initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18 }}
          className="rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg,rgba(99,102,241,0.10),rgba(139,92,246,0.07))",
            border:     "1px solid var(--border-default)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FaLightbulb style={{ color: "var(--color-yellow-text)", fontSize: "12px" }} />
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                Hint
              </span>
            </div>
            <button
              onClick={() => setShowHint((v) => !v)}
              className="text-[11px] px-2.5 py-1 rounded-lg transition-all"
              style={{
                background: showHint ? "rgba(99,102,241,0.15)" : "var(--bg-surface)",
                border:     "1px solid var(--border-default)",
                color:      "var(--color-indigo-text)",
              }}
            >
              {showHint ? "Hide" : "Show"}
            </button>
          </div>
          <AnimatePresence>
            {showHint && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{    opacity: 0, height: 0 }}
                className="text-xs leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                Think step-by-step. Start with a clear definition, then give a real-world
                example, and finally discuss trade-offs or edge cases. Interviewers value
                structured thinking over a perfect answer.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* AI avatar */}
        <motion.div
          initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="theme-card rounded-2xl p-5"
        >
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
              <FaBrain className="text-white" style={{ fontSize: "12px" }} />
            </div>
            <div className="rounded-xl rounded-tl-sm px-3 py-2.5 flex-1 text-xs leading-relaxed"
              style={{
                background: "var(--bg-surface)",
                border:     "1px solid var(--border-default)",
                color:      "var(--text-muted)",
              }}>
              Take your time on Q{idx + 1}. Explain your thought process clearly.
              <span className="inline-block w-1.5 h-3.5 ml-1 rounded-sm align-middle cursor-blink"
                style={{ background: "var(--color-indigo-text)" }} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
