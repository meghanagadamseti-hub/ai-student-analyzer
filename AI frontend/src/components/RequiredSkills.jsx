import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaListAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

/**
 * RequiredSkills
 * Props: resumeData — the full object returned by POST /analyze
 *
 * Fields consumed:
 *   resumeData.company          — selected company name
 *   resumeData.role             — selected role name
 *   resumeData.required_skills  — string[]  all skills for this role
 *   resumeData.matched_skills   — string[]  skills the resume has
 *   resumeData.missing_skills   — string[]  skills the resume is missing
 *   resumeData.skill_match_pct  — number    0-100 (pre-computed by backend)
 */
function RequiredSkills({ resumeData }) {
  /* ── derive values from the backend response ── */
  const company        = resumeData?.company        || "";
  const role           = resumeData?.role           || "";
  const requiredSkills = resumeData?.required_skills || [];
  const matchedSkills  = new Set(
    (resumeData?.matched_skills || []).map((s) => s.toLowerCase())
  );
  const totalRequired  = requiredSkills.length;
  const totalMatched   = (resumeData?.matched_skills || []).length;

  // Use backend-computed pct when available; fall back to calculating locally
  const matchPct =
    resumeData?.skill_match_pct != null
      ? resumeData.skill_match_pct
      : totalRequired > 0
      ? Math.round((totalMatched / totalRequired) * 100)
      : 0;

  /* ── animate the progress bar whenever matchPct changes ── */
  const [barWidth, setBarWidth] = useState(0);
  useEffect(() => {
    setBarWidth(0);                                    // reset first so bar re-animates
    const t = setTimeout(() => setBarWidth(matchPct), 120);
    return () => clearTimeout(t);
  }, [matchPct]);

  /* ── colour for the percentage text ── */
  const pctColor =
    matchPct >= 75 ? "var(--color-green-text)"
    : matchPct >= 50 ? "var(--color-indigo-text)"
    : "var(--color-red-text)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="theme-card rounded-2xl p-6"
    >
      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(6,182,212,0.12)", color: "var(--color-cyan-text)" }}
        >
          <FaListAlt className="text-sm" />
        </div>
        <div>
          <h2
            className="font-semibold text-base"
            style={{ color: "var(--text-primary)" }}
          >
            Required Skills
          </h2>
          {/* Dynamic company · role subtitle — no more hardcoded "Google" */}
          <p className="text-xs" style={{ color: "var(--text-faint)" }}>
            {company && role ? `${company} · ${role}` : "Select a company and role"}
          </p>
        </div>
      </div>

      {/* ── Skill Match progress bar ── */}
      <div
        className="rounded-xl p-4 my-5"
        style={{
          background: "rgba(99,102,241,0.07)",
          border:     "1px solid var(--border-default)",
        }}
      >
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
            Skill Match
          </span>
          <span className="text-xl font-bold" style={{ color: pctColor }}>
            {matchPct}%
          </span>
        </div>

        <div
          className="w-full h-2.5 rounded-full overflow-hidden"
          style={{ background: "var(--border-subtle)" }}
        >
          <div
            className="h-2.5 rounded-full"
            style={{
              width:      `${barWidth}%`,
              background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
              transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </div>

        <p className="text-xs mt-2" style={{ color: "var(--text-faint)" }}>
          {totalRequired > 0
            ? `You match ${totalMatched} of ${totalRequired} required skills`
            : "Run the analysis to see your skill match"}
        </p>
      </div>

      {/* ── All required skills with matched / missing indicators ── */}
      <h3
        className="text-xs font-semibold uppercase tracking-wider mb-3"
        style={{ color: "var(--text-faint)" }}
      >
        All Required Skills
      </h3>

      {requiredSkills.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--text-faint)" }}>
          No skills data yet — click Analyze Resume.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {requiredSkills.map((skill, i) => {
            const isMatched = matchedSkills.has(skill.toLowerCase());
            return (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-1.5"
                style={{
                  display:      "inline-flex",
                  alignItems:   "center",
                  gap:          "5px",
                  padding:      "4px 12px",
                  borderRadius: "20px",
                  fontSize:     "0.8rem",
                  fontWeight:   500,
                  background:   isMatched
                    ? "var(--tag-green-bg)"
                    : "var(--tag-red-bg)",
                  border: `1px solid ${
                    isMatched
                      ? "var(--tag-green-border)"
                      : "var(--tag-red-border)"
                  }`,
                  color: isMatched
                    ? "var(--color-green-text)"
                    : "var(--color-red-text)",
                }}
              >
                {isMatched
                  ? <FaCheckCircle style={{ fontSize: "9px" }} />
                  : <FaTimesCircle style={{ fontSize: "9px" }} />
                }
                {skill}
              </motion.span>
            );
          })}
        </div>
      )}

      {/* ── Legend ── */}
      {requiredSkills.length > 0 && (
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-faint)" }}>
            <FaCheckCircle style={{ color: "var(--color-green-text)", fontSize: "10px" }} />
            Matched ({totalMatched})
          </div>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-faint)" }}>
            <FaTimesCircle style={{ color: "var(--color-red-text)", fontSize: "10px" }} />
            Missing ({totalRequired - totalMatched})
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default RequiredSkills;
