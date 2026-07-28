/**
 * AIResumeSuggestions.jsx
 *
 * Right-column card on the Resume page.
 * Displays AI-generated improvement actions from the backend.
 *
 * "Apply All" navigates to /ai-resume-builder and passes the full
 * resumeData as router state so the builder can pre-load all tasks.
 *
 * Props:
 *   resumeData — full /analyze response object
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HiSparkles } from "react-icons/hi2";

/* ── Default actions when backend has no recommendations ── */
const DEFAULT_ACTIONS = [
  { id:"summary",    emoji:"✏️", label:"Rewrite Summary",    color:"#7C3AED",
    desc:"Craft a compelling 3-line professional summary."    },
  { id:"projects",   emoji:"📂", label:"Improve Projects",   color:"#06B6D4",
    desc:"Add measurable impact and tech stack to projects."  },
  { id:"skills",     emoji:"➕", label:"Add Missing Skills",  color:"#22C55E",
    desc:"Include skills required by your target company."    },
  { id:"experience", emoji:"💼", label:"Improve Experience", color:"#F59E0B",
    desc:"Rewrite bullets with action verbs and metrics."     },
  { id:"keywords",   emoji:"🔍", label:"Add ATS Keywords",   color:"#EC4899",
    desc:"Optimise your resume for applicant tracking."       },
];

function parseRecommendation(text, index) {
  const lower = text.toLowerCase();
  if (lower.includes("skill") || lower.includes("learn"))
    return { id:`rec-${index}`, emoji:"➕", label:"Add Skills",         color:"#22C55E", desc:text };
  if (lower.includes("project") || lower.includes("github"))
    return { id:`rec-${index}`, emoji:"📂", label:"Improve Projects",   color:"#06B6D4", desc:text };
  if (lower.includes("summary") || lower.includes("profile"))
    return { id:`rec-${index}`, emoji:"✏️", label:"Rewrite Summary",    color:"#7C3AED", desc:text };
  if (lower.includes("keyword") || lower.includes("ats"))
    return { id:`rec-${index}`, emoji:"🔍", label:"ATS Keywords",       color:"#EC4899", desc:text };
  if (lower.includes("experience") || lower.includes("bullet"))
    return { id:`rec-${index}`, emoji:"💼", label:"Improve Experience", color:"#F59E0B", desc:text };
  return   { id:`rec-${index}`, emoji:"💡", label:"AI Suggestion",      color:"#A78BFA", desc:text };
}

/* ── Single action card ────────────────────────────────── */
function ActionCard({ action, index, applied, onApply }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity:0, x:12 }}
      animate={{ opacity:1, x:0 }}
      transition={{ delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-start gap-3 p-3.5 rounded-xl transition-all duration-200"
      style={{
        background: hovered ? `${action.color}0d` : "var(--bg-surface)",
        border:     `1px solid ${hovered ? `${action.color}30` : "var(--border-default)"}`,
        transform:  hovered ? "translateX(3px)" : "translateX(0)",
        cursor:     "default",
      }}
    >
      {/* Icon */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base transition-all duration-200"
        style={{ background: hovered ? `${action.color}20` : `${action.color}12` }}
      >
        {action.emoji}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color:"var(--text-primary)" }}>
          {action.label}
        </p>
        <p className="text-xs mt-0.5 leading-relaxed line-clamp-2" style={{ color:"var(--text-muted)" }}>
          {action.desc}
        </p>
      </div>

      {/* Status dot */}
      <motion.div
        whileHover={{ scale:1.1 }}
        onClick={() => onApply(action.id)}
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer transition-all duration-200"
        style={{
          background: applied ? "rgba(34,197,94,0.15)" : `${action.color}15`,
          color:      applied ? "var(--color-green-text)" : action.color,
          border:     `1px solid ${applied ? "rgba(34,197,94,0.25)" : `${action.color}30`}`,
        }}
      >
        <span style={{ fontSize:"11px" }}>{applied ? "✓" : "→"}</span>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   Main export
════════════════════════════════════════════════════════ */
export default function AIResumeSuggestions({ resumeData }) {
  const navigate    = useNavigate();
  const [appliedIds, setAppliedIds] = useState(new Set());
  const [launching,  setLaunching]  = useState(false);

  const company = resumeData?.company || "";
  const role    = resumeData?.role    || "";

  const rawRecs = Array.isArray(resumeData?.recommendations) ? resumeData.recommendations : [];
  const actions = rawRecs.length > 0
    ? rawRecs.map((text, i) => parseRecommendation(text, i))
    : DEFAULT_ACTIONS;

  const hasData = !!resumeData;

  const handleApply = (id) =>
    setAppliedIds(prev => new Set([...prev, id]));

  /* ── Apply All: pass full resumeData as router state ── */
  const handleApplyAll = () => {
    setLaunching(true);
    // Short delay so the user sees the transition animation
    setTimeout(() => {
      navigate("/ai-resume-builder", {
        state: {
          resumeData,
          applyAll:    true,
          actions,
          fromResume:  true,
        },
      });
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity:0, y:16 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.5, delay:0.12 }}
      className="theme-card rounded-2xl p-5 flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg,rgba(124,58,237,0.20),rgba(236,72,153,0.15))",
              color: "#A78BFA",
            }}
          >
            <HiSparkles style={{ fontSize:"16px" }} />
          </div>
          <div>
            <h2 className="font-semibold text-base" style={{ color:"var(--text-primary)" }}>
              AI Resume Suggestions
            </h2>
            <p className="text-xs mt-0.5" style={{ color:"var(--text-faint)" }}>
              {company && role
                ? `Tailored for ${company} · ${role}`
                : "Upload resume to get AI suggestions"}
            </p>
          </div>
        </div>

        {actions.length > 0 && (
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-xl flex-shrink-0"
            style={{
              background: "rgba(124,58,237,0.12)",
              border:     "1px solid rgba(124,58,237,0.25)",
              color:      "#A78BFA",
            }}
          >
            {actions.length} actions
          </span>
        )}
      </div>

      {/* Empty state */}
      {!hasData ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
            style={{ background:"rgba(124,58,237,0.08)", border:"1px solid rgba(124,58,237,0.15)" }}
          >
            🤖
          </div>
          <p className="text-sm font-semibold" style={{ color:"var(--text-muted)" }}>
            No suggestions yet
          </p>
          <p className="text-xs mt-2 max-w-[200px]" style={{ color:"var(--text-faint)" }}>
            Upload your resume and click Analyze Resume to get AI-powered suggestions.
          </p>
        </div>
      ) : (
        <>
          {/* Action cards */}
          <div className="space-y-2 flex-1">
            {actions.map((action, i) => (
              <ActionCard
                key={action.id}
                action={action}
                index={i}
                applied={appliedIds.has(action.id)}
                onApply={handleApply}
              />
            ))}
          </div>

          {/* Apply All button */}
          <div className="mt-5 pt-4" style={{ borderTop:"1px solid var(--border-subtle)" }}>
            <motion.button
              whileHover={!launching ? { scale:1.01 } : {}}
              whileTap={!launching  ? { scale:0.98 } : {}}
              onClick={handleApplyAll}
              disabled={launching}
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 disabled:opacity-80"
              style={{
                background: launching
                  ? "linear-gradient(135deg,#22C55E,#16A34A)"
                  : "linear-gradient(135deg,#7C3AED,#6D28D9)",
                boxShadow: launching
                  ? "0 6px 18px rgba(34,197,94,0.32)"
                  : "0 6px 20px rgba(124,58,237,0.38)",
              }}
            >
              <AnimatePresence mode="wait">
                {launching ? (
                  <motion.span key="go"
                    initial={{ opacity:0, scale:0.85 }}
                    animate={{ opacity:1, scale:1 }}
                    exit={{ opacity:0 }}
                    className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Opening AI Resume Builder…
                  </motion.span>
                ) : (
                  <motion.span key="idle"
                    initial={{ opacity:0 }}
                    animate={{ opacity:1 }}
                    exit={{ opacity:0 }}
                    className="flex items-center gap-2">
                    <HiSparkles style={{ fontSize:"14px" }} />
                    Apply All → AI Resume Builder
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <p className="text-[10px] text-center mt-2" style={{ color:"var(--text-faint)" }}>
              Review &amp; accept each improvement before generating your final resume
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
}
