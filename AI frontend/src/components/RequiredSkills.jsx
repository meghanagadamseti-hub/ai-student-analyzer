/**
 * RequiredSkills.jsx
 *
 * Displays required skills from backend /analyze response.
 * Each skill shown as a badge card — green if matched, red if missing.
 * Includes skill match progress bar and legend.
 *
 * Props:
 *   resumeData — full /analyze response object
 */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ── Skill → emoji map (expands over time) ─────────────────── */
const SKILL_EMOJI = {
  python:             "🐍",
  java:               "☕",
  javascript:         "📜",
  typescript:         "🔷",
  react:              "⚛️",
  "node.js":          "🟩",
  "express.js":       "🚂",
  flask:              "🌶️",
  django:             "🎸",
  fastapi:            "⚡",
  sql:                "🗄️",
  mysql:              "🐬",
  postgresql:         "🐘",
  mongodb:            "🍃",
  docker:             "🐳",
  kubernetes:         "☸️",
  aws:                "☁️",
  azure:              "🔵",
  gcp:                "🌈",
  git:                "🔀",
  github:             "🐙",
  linux:              "🐧",
  dsa:                "🧮",
  "system design":    "🏗️",
  "machine learning": "🤖",
  "deep learning":    "🧠",
  tensorflow:         "🔬",
  pytorch:            "🔥",
  "scikit-learn":     "📊",
  pandas:             "🐼",
  numpy:              "🔢",
  "rest api":         "🔌",
  graphql:            "◼️",
  oop:                "📦",
  dbms:               "🗃️",
  "operating system": "💻",
  "computer networks":"🌐",
  microservices:      "⚙️",
  "ci/cd":            "🔄",
  ansible:            "🅰️",
  terraform:          "🏔️",
  kafka:              "📨",
  redis:              "💾",
  spark:              "✨",
  c:                  "🔧",
  "c++":              "⚙️",
  html:               "🏷️",
  css:                "🎨",
  swift:              "🐦",
  kotlin:             "🎯",
  go:                 "🐹",
  rust:               "⚓",
};

function getSkillEmoji(skillName) {
  return SKILL_EMOJI[skillName.toLowerCase()] || "🔹";
}

/* ── Animated progress bar ─────────────────────────────────── */
function MatchBar({ value, color = "linear-gradient(90deg,#7C3AED,#6D28D9)" }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    setW(0);
    const t = setTimeout(() => setW(value), 150);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
      <div
        className="h-2.5 rounded-full"
        style={{
          width:      `${w}%`,
          background: color,
          transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
    </div>
  );
}

/* ── Skill badge card ──────────────────────────────────────── */
function SkillBadge({ skill, isMatched, index }) {
  const [hovered, setHovered] = useState(false);

  const matchedStyle = {
    bg:     hovered ? "rgba(34,197,94,0.14)" : "rgba(34,197,94,0.08)",
    border: `1px solid ${hovered ? "rgba(34,197,94,0.40)" : "rgba(34,197,94,0.22)"}`,
    color:  "var(--color-green-text)",
    dot:    "#22C55E",
  };
  const missingStyle = {
    bg:     hovered ? "rgba(239,68,68,0.12)" : "rgba(239,68,68,0.06)",
    border: `1px solid ${hovered ? "rgba(239,68,68,0.38)" : "rgba(239,68,68,0.20)"}`,
    color:  "var(--color-red-text)",
    dot:    "#EF4444",
  };
  const s = isMatched ? matchedStyle : missingStyle;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200"
      style={{
        background: s.bg,
        border:     s.border,
        transform:  hovered ? "translateY(-2px)" : "translateY(0)",
        cursor:     "default",
      }}
    >
      {/* Status dot */}
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: s.dot, boxShadow: hovered ? `0 0 5px ${s.dot}` : "none" }}
      />

      {/* Emoji */}
      <span className="text-sm leading-none flex-shrink-0">
        {getSkillEmoji(skill)}
      </span>

      {/* Skill name */}
      <span className="text-xs font-semibold" style={{ color: s.color }}>
        {skill}
      </span>

      {/* Status icon */}
      <span className="text-[10px] flex-shrink-0 ml-auto" style={{ color: s.color }}>
        {isMatched ? "✓" : "✗"}
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   RequiredSkills — main export
═══════════════════════════════════════════════════════════ */
export default function RequiredSkills({ resumeData }) {
  const company        = resumeData?.company         || "";
  const role           = resumeData?.role            || "";
  const requiredSkills = resumeData?.required_skills || [];
  const matchedSet     = new Set(
    (resumeData?.matched_skills || []).map(s => s.toLowerCase())
  );
  const totalRequired = requiredSkills.length;
  const totalMatched  = (resumeData?.matched_skills || []).length;

  const matchPct =
    resumeData?.skill_match_pct != null
      ? resumeData.skill_match_pct
      : totalRequired > 0
      ? Math.round((totalMatched / totalRequired) * 100)
      : 0;

  const pctColor =
    matchPct >= 75 ? "var(--color-green-text)"
    : matchPct >= 50 ? "var(--color-indigo-text)"
    : "var(--color-red-text)";

  const pctGrad =
    matchPct >= 75
      ? "linear-gradient(90deg,#22C55E,#16A34A)"
      : matchPct >= 50
      ? "linear-gradient(90deg,#7C3AED,#6D28D9)"
      : "linear-gradient(90deg,#EF4444,#DC2626)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="theme-card rounded-2xl p-5 flex flex-col h-full"
    >
      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(6,182,212,0.12)", color: "var(--color-cyan-text)" }}
          >
            <span style={{ fontSize: "16px" }}>🎯</span>
          </div>
          <div>
            <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
              Required Skills
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
              {company && role
                ? `${company} · ${role}`
                : "Select a company and role"}
            </p>
          </div>
        </div>

        {/* Skill count badge */}
        {totalRequired > 0 && (
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-xl flex-shrink-0"
            style={{
              background: "rgba(6,182,212,0.10)",
              border:     "1px solid rgba(6,182,212,0.22)",
              color:      "var(--color-cyan-text)",
            }}
          >
            {totalRequired} skills
          </span>
        )}
      </div>

      {/* ── Match progress ── */}
      <div
        className="rounded-xl p-4 mb-4"
        style={{
          background: "rgba(124,58,237,0.06)",
          border:     "1px solid var(--border-default)",
        }}
      >
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
            Skill Match
          </span>
          <span className="text-xl font-black" style={{ color: pctColor }}>
            {matchPct}%
          </span>
        </div>

        <MatchBar value={matchPct} color={pctGrad} />

        <p className="text-xs mt-2" style={{ color: "var(--text-faint)" }}>
          {totalRequired > 0
            ? `${totalMatched} of ${totalRequired} required skills found on your resume`
            : "Run the analysis to see your skill match"}
        </p>
      </div>

      {/* ── Empty state ── */}
      {requiredSkills.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-3"
            style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.15)" }}
          >
            🎯
          </div>
          <p className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>
            No missing skills detected
          </p>
          <p className="text-xs mt-1.5" style={{ color: "var(--text-faint)" }}>
            Select a company and role, then click Analyze Resume.
          </p>
        </div>
      ) : (
        <>
          {/* ── Skill badges grid ── */}
          <div className="grid grid-cols-1 gap-2 flex-1">
            {requiredSkills.map((skill, i) => (
              <SkillBadge
                key={skill}
                skill={skill}
                isMatched={matchedSet.has(skill.toLowerCase())}
                index={i}
              />
            ))}
          </div>

          {/* ── Legend ── */}
          <div
            className="flex items-center justify-between mt-4 pt-3"
            style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-faint)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "#22C55E" }} />
              Matched ({totalMatched})
            </div>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-faint)" }}>
              <span className="w-2 h-2 rounded-full" style={{ background: "#EF4444" }} />
              Missing ({totalRequired - totalMatched})
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
