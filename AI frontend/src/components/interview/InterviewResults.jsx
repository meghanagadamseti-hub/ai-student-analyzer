import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaTrophy, FaChartBar, FaComments, FaBrain,
  FaCheckCircle, FaTimesCircle, FaLightbulb,
  FaRedo, FaArrowRight, FaSpinner, FaStar,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

/* ── Animated counter ──────────────────────────────────────── */
function AnimatedNumber({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const steps = 40;
    const step  = target / steps;
    let current = 0;
    const t = setInterval(() => {
      current += step;
      if (current >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.round(current));
    }, 30);
    return () => clearInterval(t);
  }, [target]);
  return <>{val}{suffix}</>;
}

/* ── Animated score arc (SVG) ──────────────────────────────── */
function ScoreArc({ score, size = 100, strokeWidth = 8, color }) {
  const r   = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);
  useEffect(() => {
    const t = setTimeout(() => setOffset(circ * (1 - score / 100)), 200);
    return () => clearTimeout(t);
  }, [score, circ]);
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke="var(--border-subtle)" strokeWidth={strokeWidth} />
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
      />
    </svg>
  );
}

/* ── Score card ────────────────────────────────────────────── */
function ScoreCard({ label, score, color, icon: Icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="theme-card rounded-2xl p-5 flex flex-col items-center text-center relative overflow-hidden"
    >
      {/* top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg,transparent,${color},transparent)` }} />

      <div className="relative mb-2">
        <ScoreArc score={score} color={color} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-black" style={{ color }}>
            <AnimatedNumber target={score} suffix="%" />
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-1">
        <Icon style={{ color, fontSize: "11px" }} />
        <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{label}</span>
      </div>
    </motion.div>
  );
}

/* ── Animated progress bar ─────────────────────────────────── */
function ResultBar({ label, value, color, delay = 0 }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(value), 300 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{label}</span>
        <span className="text-xs font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
        <div className="h-2 rounded-full"
          style={{ width: `${w}%`, background: color, transition: "width 1.1s cubic-bezier(0.4,0,0.2,1)" }} />
      </div>
    </div>
  );
}

/* ── Loading skeleton for results ──────────────────────────── */
function ResultsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1,2,3,4].map((i) => (
          <div key={i} className="theme-card rounded-2xl p-5 h-36 shimmer"
            style={{ background: "var(--border-subtle)" }} />
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {[1,2].map((i) => (
          <div key={i} className="theme-card rounded-2xl p-6 h-48 shimmer"
            style={{ background: "var(--border-subtle)" }} />
        ))}
      </div>
    </div>
  );
}
/* ══════════════════════════════════════════════════════════════
   InterviewResults  — main export
══════════════════════════════════════════════════════════════ */
export default function InterviewResults({ results, loading, config, onRetry, onHome }) {
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="theme-card rounded-2xl p-8 flex flex-col items-center gap-5">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
            <FaSpinner className="text-white animate-spin" style={{ fontSize: "22px" }} />
          </div>
          <div className="text-center">
            <p className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
              Analysing Your Answers…
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--text-faint)" }}>
              The AI is evaluating your responses. This takes a few seconds.
            </p>
          </div>
          <div className="w-64 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
            <motion.div
              className="h-1.5 rounded-full"
              style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)" }}
              animate={{ width: ["0%","100%","0%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
        <ResultsSkeleton />
      </div>
    );
  }

  if (!results) return null;

  const {
    overall_score       = 0,
    communication_score = 0,
    technical_score     = 0,
    confidence_score    = 0,
    strong_areas        = [],
    weak_areas          = [],
    suggestions         = [],
    skill_breakdown     = [],
    grade               = "B",
  } = results;

  const gradeColor =
    overall_score >= 85 ? "#34d399" :
    overall_score >= 70 ? "#818cf8" :
    overall_score >= 55 ? "#fbbf24" : "#f87171";

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* ── Hero banner ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl p-7 overflow-hidden"
        style={{
          background: "linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.10))",
          border:     "1px solid var(--border-strong)",
        }}
      >
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle,#6366f1,transparent)" }} />
        <div className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.6),transparent)" }} />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white flex-shrink-0"
              style={{
                background: `linear-gradient(135deg,${gradeColor}bb,${gradeColor})`,
                boxShadow:  `0 0 24px ${gradeColor}55`,
              }}>
              {grade}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <HiSparkles style={{ color: "var(--color-yellow-text)" }} />
                <span className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-faint)" }}>Interview Complete</span>
              </div>
              <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                Overall Score:{" "}
                <span style={{ color: gradeColor }}>
                  <AnimatedNumber target={overall_score} suffix="%" />
                </span>
              </h2>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                {config.company} · {config.role} · {config.difficulty}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-shrink-0">
            <button onClick={onRetry}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-85 transition-opacity"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
              <FaRedo style={{ fontSize: "11px" }} />Try Again
            </button>
            <button onClick={onHome}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-80 transition-opacity"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)", color: "var(--text-muted)" }}>
              <FaArrowRight style={{ fontSize: "11px" }} />New Session
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Four score cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ScoreCard label="Overall"       score={overall_score}       color="#6366f1" icon={FaTrophy}   delay={0.0}  />
        <ScoreCard label="Technical"     score={technical_score}     color="#818cf8" icon={FaBrain}    delay={0.07} />
        <ScoreCard label="Communication" score={communication_score} color="#34d399" icon={FaComments} delay={0.14} />
        <ScoreCard label="Confidence"    score={confidence_score}    color="#fbbf24" icon={FaStar}     delay={0.21} />
      </div>

      {/* ── Skill breakdown + Strengths/Weaknesses ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {skill_breakdown.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="theme-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <FaChartBar style={{ color: "var(--color-indigo-text)", fontSize: "13px" }} />
              <h3 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
                Skill Breakdown
              </h3>
            </div>
            <div className="space-y-4">
              {skill_breakdown.map((item, i) => (
                <ResultBar
                  key={item.skill}
                  label={item.skill}
                  value={item.score}
                  color={item.score >= 70 ? "#34d399" : item.score >= 50 ? "#fbbf24" : "#f87171"}
                  delay={i * 80}
                />
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="theme-card rounded-2xl p-6 space-y-5"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FaCheckCircle style={{ color: "var(--color-green-text)", fontSize: "13px" }} />
              <h3 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
                Strong Areas
              </h3>
            </div>
            {strong_areas.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {strong_areas.map((a) => <span key={a} className="tag-green text-xs">{a}</span>)}
              </div>
            ) : (
              <p className="text-sm" style={{ color: "var(--text-faint)" }}>
                Answer more questions to identify your strengths.
              </p>
            )}
          </div>

          <div className="h-px" style={{ background: "var(--border-default)" }} />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <FaTimesCircle style={{ color: "var(--color-red-text)", fontSize: "13px" }} />
              <h3 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
                Areas to Improve
              </h3>
            </div>
            {weak_areas.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {weak_areas.map((a) => <span key={a} className="tag-red text-xs">{a}</span>)}
              </div>
            ) : (
              <p className="text-sm" style={{ color: "var(--text-faint)" }}>
                No major weak areas detected. Great job!
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── AI Suggestions ── */}
      {suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36 }}
          className="theme-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <FaLightbulb style={{ color: "var(--color-yellow-text)", fontSize: "13px" }} />
            <h3 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
              AI Improvement Suggestions
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestions.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.38 + i * 0.05 }}
                className="flex items-start gap-3 p-3.5 rounded-xl"
                style={{
                  background: "rgba(99,102,241,0.07)",
                  border:     "1px solid var(--border-default)",
                }}
              >
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(99,102,241,0.18)", color: "var(--color-indigo-text)" }}>
                  {i + 1}
                </span>
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>{tip}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── What's Next CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.44 }}
        className="rounded-2xl p-6"
        style={{
          background: "linear-gradient(135deg,rgba(99,102,241,0.12),rgba(139,92,246,0.08))",
          border:     "1px solid var(--border-strong)",
        }}
      >
        <h3 className="font-semibold text-base mb-4 flex items-center gap-2"
          style={{ color: "var(--text-primary)" }}>
          <HiSparkles style={{ color: "var(--color-indigo-text)" }} />
          What's Next?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "Retake Interview",     action: onRetry,   color: "#6366f1", bg: "rgba(99,102,241,0.12)" },
            { label: "Review Weak Areas",    action: () => {},  color: "#fbbf24", bg: "rgba(245,158,11,0.10)" },
            { label: "Practice More Skills", action: () => {},  color: "#34d399", bg: "rgba(16,185,129,0.10)" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="p-3 rounded-xl text-sm font-semibold text-left hover:opacity-85 transition-opacity"
              style={{ background: item.bg, color: item.color, border: `1px solid ${item.color}28` }}
            >
              {item.label} →
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
