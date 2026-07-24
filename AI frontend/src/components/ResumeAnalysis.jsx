import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle, FaLightbulb, FaTimesCircle,
  FaClock, FaCode, FaLayerGroup, FaRocket,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

/* ── Priority badge colours ── */
const PRIORITY_STYLE = {
  High:   { bg: "rgba(239,68,68,0.10)",   border: "rgba(239,68,68,0.25)",   color: "var(--color-red-text)"    },
  Medium: { bg: "rgba(245,158,11,0.10)",  border: "rgba(245,158,11,0.25)",  color: "var(--color-yellow-text)" },
  Low:    { bg: "rgba(16,185,129,0.10)",  border: "rgba(16,185,129,0.25)",  color: "var(--color-green-text)"  },
};

const DIFFICULTY_STYLE = {
  Easy:   { bg: "rgba(16,185,129,0.10)",  border: "rgba(16,185,129,0.25)",  color: "var(--color-green-text)"  },
  Medium: { bg: "rgba(99,102,241,0.10)",  border: "rgba(99,102,241,0.25)",  color: "var(--color-indigo-text)" },
  Hard:   { bg: "rgba(239,68,68,0.10)",   border: "rgba(239,68,68,0.25)",   color: "var(--color-red-text)"    },
};

/* ── Single skill card inside the Learning Plan section ── */
function SkillLearningCard({ skill, index }) {
  const ps = PRIORITY_STYLE[skill.priority]   || PRIORITY_STYLE.Medium;
  const ds = DIFFICULTY_STYLE[skill.difficulty] || DIFFICULTY_STYLE.Medium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="rounded-xl p-4"
      style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}
    >
      {/* Skill name + badges row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(99,102,241,0.12)", color: "var(--color-indigo-text)" }}
          >
            <FaCode style={{ fontSize: "11px" }} />
          </div>
          <span className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
            {skill.name}
          </span>
        </div>

        <div className="flex gap-1.5 flex-shrink-0">
          {/* Priority badge */}
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-lg"
            style={{ background: ps.bg, border: `1px solid ${ps.border}`, color: ps.color }}
          >
            {skill.priority}
          </span>
          {/* Difficulty badge */}
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-lg"
            style={{ background: ds.bg, border: `1px solid ${ds.border}`, color: ds.color }}
          >
            {skill.difficulty}
          </span>
        </div>
      </div>

      {/* Estimated time */}
      <div className="flex items-center gap-1.5 mb-2">
        <FaClock style={{ fontSize: "10px", color: "var(--text-faint)", flexShrink: 0 }} />
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          <span style={{ color: "var(--text-faint)", fontWeight: 500 }}>Est. time: </span>
          {skill.estimated_time || "2–3 weeks"}
        </span>
      </div>

      {/* Suggested project */}
      <div className="flex items-start gap-1.5">
        <FaRocket style={{ fontSize: "10px", color: "var(--color-indigo-text)", flexShrink: 0, marginTop: "3px" }} />
        <span className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
          <span style={{ color: "var(--text-faint)", fontWeight: 500 }}>Project: </span>
          {skill.suggested_project || `Build a project using ${skill.name}`}
        </span>
      </div>
    </motion.div>
  );
}

function ProgressBar({ value, color = "#6366f1", delay = 0 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 200 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return (
    <div className="w-full h-2.5 rounded-full overflow-hidden"
      style={{ background: "var(--border-subtle)" }}>
      <div className="h-2.5 rounded-full"
        style={{ width: `${width}%`, background: color, transition: "width 1s cubic-bezier(0.4,0,0.2,1)" }} />
    </div>
  );
}

function ResumeAnalysis({ resumeData }) {
  console.log("ResumeAnalysis Data:", resumeData);

  const score         = resumeData?.ats?.overall_score || 0;
  const matchedSkills = resumeData?.matched_skills || [];
  const missingSkills = resumeData?.missing_skills || [];

  // learning_plan.recommendedSkills — each item has name, priority, reason,
  // estimated_time, suggested_project, difficulty
  const recommendedSkills = resumeData?.learning_plan?.recommendedSkills || [];

  const level =
    score >= 85 ? "Excellent Candidate"
    : score >= 70 ? "Strong Candidate"
    : score >= 55 ? "Average Candidate"
    : "Needs Improvement";

  const levelColor =
    score >= 85 ? "var(--color-green-text)"
    : score >= 70 ? "var(--color-indigo-text)"
    : score >= 55 ? "var(--color-yellow-text)"
    : "var(--color-red-text)";

  // Use backend recommendations directly — no hardcoded logic
  const improvements = Array.isArray(resumeData?.recommendations) && resumeData.recommendations.length > 0
    ? resumeData.recommendations
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="theme-card rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(99,102,241,0.12)", color: "var(--color-indigo-text)" }}>
          <HiSparkles />
        </div>
        <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
          AI Resume Analysis
        </h2>
      </div>

      <div className="space-y-5">
        {/* ATS Score */}
        <div className="rounded-xl p-4"
          style={{ background: "rgba(99,102,241,0.07)", border: "1px solid var(--border-default)" }}>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>ATS Resume Score</span>
            <span className="text-2xl font-bold" style={{ color: "var(--color-indigo-text)" }}>{score}%</span>
          </div>
          <ProgressBar value={score} color="linear-gradient(90deg, #6366f1, #8b5cf6)" />
        </div>

        {/* Placement Level */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Placement Level</span>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold"
            style={{ background: "rgba(99,102,241,0.08)", color: levelColor, border: "1px solid var(--border-default)" }}>
            <FaCheckCircle className="text-[10px]" />{level}
          </div>
        </div>

        {/* Skills Found */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-faint)" }}>
            Skills Found
          </h3>
          <div className="flex flex-wrap gap-2">
            {matchedSkills.length
              ? matchedSkills.map((s) => (
                  <span key={s} className="tag-green flex items-center gap-1">
                    <FaCheckCircle className="text-[9px]" />{s}
                  </span>
                ))
              : <p className="text-sm" style={{ color: "var(--text-faint)" }}>No matching skills found.</p>
            }
          </div>
        </div>

        {/* Missing Skills */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-faint)" }}>
            Missing Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {missingSkills.length
              ? missingSkills.map((s) => (
                  <span key={s} className="tag-red flex items-center gap-1">
                    <FaTimesCircle className="text-[9px]" />{s}
                  </span>
                ))
              : <span className="tag-green">🎉 No missing skills!</span>
            }
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="rounded-xl p-4"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.06))",
            border:     "1px solid var(--border-default)",
          }}>
          <div className="flex items-center gap-2 mb-3">
            <FaLightbulb style={{ color: "var(--color-yellow-text)" }} />
            <h4 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>AI Suggestions</h4>
          </div>
          <ul className="space-y-2">
            {improvements.length > 0 ? (
              improvements.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(99,102,241,0.15)", color: "var(--color-indigo-text)" }}>
                    {i + 1}
                  </span>
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>{item}</span>
                </li>
              ))
            ) : (
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(99,102,241,0.15)", color: "var(--color-indigo-text)" }}>
                  —
                </span>
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                  No AI recommendations available.
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* ── Learning Plan ── */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(139,92,246,0.12)", color: "var(--accent-secondary, #8b5cf6)" }}
            >
              <FaLayerGroup style={{ fontSize: "13px" }} />
            </div>
            <div>
              <h4 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                Learning Plan
              </h4>
              <p className="text-xs" style={{ color: "var(--text-faint)" }}>
                Skills to learn, in priority order
              </p>
            </div>
          </div>

          {recommendedSkills.length > 0 ? (
            <div className="space-y-3">
              {recommendedSkills.map((skill, i) => (
                <SkillLearningCard key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          ) : (
            <div
              className="rounded-xl p-4 text-sm"
              style={{
                background: "var(--bg-surface)",
                border:     "1px solid var(--border-default)",
                color:      "var(--text-faint)",
              }}
            >
              Run the analysis to generate your personalised learning plan.
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
}

export default ResumeAnalysis;
