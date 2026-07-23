import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaLightbulb, FaTimesCircle } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

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

  const improvements = [];
  if (missingSkills.includes("React"))  improvements.push("Learn React.js fundamentals and hooks");
  if (missingSkills.includes("Docker")) improvements.push("Learn Docker containerisation basics");
  if (missingSkills.includes("SQL"))    improvements.push("Practice SQL queries and optimisation");
  if (missingSkills.includes("AWS"))    improvements.push("Learn AWS Cloud core services");
  if (missingSkills.includes("Git"))    improvements.push("Practice Git workflows and GitHub");
  if (improvements.length === 0)        improvements.push("Great resume! Focus on advanced projects.");

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
            {improvements.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(99,102,241,0.15)", color: "var(--color-indigo-text)" }}>
                  {i + 1}
                </span>
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default ResumeAnalysis;
