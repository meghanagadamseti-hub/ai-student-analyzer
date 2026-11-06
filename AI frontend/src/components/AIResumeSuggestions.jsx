/**
 * AIResumeSuggestions.jsx
 *
 * Right-column card on the Resume page.
 *
 * FIXED BEHAVIOUR:
 *  - Individual "Apply" button calls /ai/rewrite-section and writes the
 *    improved text back into resumeData via setResumeData (single source of truth).
 *  - "Apply All" calls /ai/rewrite-section for every pending section
 *    concurrently, updates resumeData for each, then navigates to the
 *    AI Resume Builder so the user can review and download.
 *  - Reject keeps the original content unchanged.
 *  - Undo restores the original content from the pre-apply snapshot.
 *
 * Props:
 *   resumeData    — full /analyze response object (or upload object)
 *   setResumeData — state setter from Resume.jsx (parent)
 */
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HiSparkles } from "react-icons/hi2";
import { Loader2, RefreshCw } from "lucide-react";

const API = "http://127.0.0.1:5000";

/* ── Map a recommendation text to a suggestion object ── */
function parseRecommendation(text, index) {
  const lower = text.toLowerCase();
  if (lower.includes("skill") || lower.includes("learn"))
    return { id:`rec-${index}`, section:"skills",     emoji:"➕", label:"Add Skills",         color:"#22C55E", desc:text };
  if (lower.includes("project") || lower.includes("github"))
    return { id:`rec-${index}`, section:"projects",   emoji:"📂", label:"Improve Projects",   color:"#06B6D4", desc:text };
  if (lower.includes("summary") || lower.includes("profile"))
    return { id:`rec-${index}`, section:"summary",    emoji:"✏️", label:"Rewrite Summary",    color:"#7C3AED", desc:text };
  if (lower.includes("keyword") || lower.includes("ats"))
    return { id:`rec-${index}`, section:"skills",     emoji:"🔍", label:"ATS Keywords",       color:"#EC4899", desc:text };
  if (lower.includes("experience") || lower.includes("bullet"))
    return { id:`rec-${index}`, section:"experience", emoji:"💼", label:"Improve Experience", color:"#F59E0B", desc:text };
  return   { id:`rec-${index}`, section:"summary",    emoji:"💡", label:"AI Suggestion",      color:"#A78BFA", desc:text };
}

const DEFAULT_ACTIONS = [
  { id:"summary",    section:"summary",    emoji:"✏️", label:"Rewrite Summary",    color:"#7C3AED", desc:"Craft a compelling 3-line professional summary." },
  { id:"projects",   section:"projects",   emoji:"📂", label:"Improve Projects",   color:"#06B6D4", desc:"Add measurable impact and tech stack to projects." },
  { id:"skills",     section:"skills",     emoji:"➕", label:"Add Missing Skills",  color:"#22C55E", desc:"Include skills required by your target company." },
  { id:"experience", section:"experience", emoji:"💼", label:"Improve Experience", color:"#F59E0B", desc:"Rewrite bullets with action verbs and metrics." },
  { id:"keywords",   section:"skills",     emoji:"🔍", label:"Add ATS Keywords",   color:"#EC4899", desc:"Optimise your resume for applicant tracking." },
];

/* ─────────────────────────────────────────────────────── */
/* Single action card                                      */
/* ─────────────────────────────────────────────────────── */
function ActionCard({ action, index, status, onApply, onReject, onUndo }) {
  const [hovered, setHovered] = useState(false);
  const isApplied  = status === "applied";
  const isRejected = status === "rejected";
  const isLoading  = status === "loading";

  return (
    <motion.div
      initial={{ opacity:0, x:12 }}
      animate={{ opacity:1, x:0 }}
      transition={{ delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-xl overflow-hidden"
      style={{
        border: `1px solid ${
          isApplied  ? "rgba(34,197,94,0.30)"
          : isRejected ? "rgba(239,68,68,0.25)"
          : hovered    ? `${action.color}30`
          : "var(--border-default)"
        }`,
        background: isApplied  ? "rgba(34,197,94,0.06)"
                  : isRejected ? "rgba(239,68,68,0.06)"
                  : hovered    ? `${action.color}0d`
                  : "var(--bg-surface)",
        transition: "all 0.2s ease",
      }}
    >
      {/* Main row */}
      <div className="flex items-start gap-3 p-3.5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base"
          style={{ background: `${action.color}12` }}>
          {action.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color:"var(--text-primary)" }}>
            {action.label}
            {isApplied  && <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background:"rgba(34,197,94,0.15)", color:"var(--color-green-text)" }}>✓ Applied</span>}
            {isRejected && <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background:"rgba(239,68,68,0.12)", color:"var(--color-red-text)" }}>✗ Rejected</span>}
          </p>
          <p className="text-xs mt-0.5 leading-relaxed line-clamp-2" style={{ color:"var(--text-muted)" }}>
            {action.desc}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      {!isApplied && !isRejected && (
        <div className="flex gap-2 px-3.5 pb-3">
          <button onClick={() => onApply(action)} disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white disabled:opacity-55"
            style={{ background:`linear-gradient(135deg,${action.color},${action.color}cc)` }}>
            {isLoading
              ? <><Loader2 size={10} className="animate-spin"/>Applying…</>
              : <>✓ Apply</>
            }
          </button>
          <button onClick={() => onReject(action.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.20)", color:"var(--color-red-text)" }}>
            ✗ Reject
          </button>
        </div>
      )}
      {(isApplied || isRejected) && (
        <div className="px-3.5 pb-3">
          <button onClick={() => onUndo(action.id)}
            className="text-[11px] px-3 py-1.5 rounded-lg font-semibold hover:opacity-75"
            style={{ background:"var(--bg-elevated)", border:"1px solid var(--border-default)", color:"var(--text-faint)" }}>
            ↩ Undo
          </button>
        </div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/* Main export                                             */
/* ═══════════════════════════════════════════════════════ */
export default function AIResumeSuggestions({ resumeData, setResumeData }) {
  const navigate   = useNavigate();
  const [statuses, setStatuses] = useState({});   // { actionId: "loading"|"applied"|"rejected" }
  const [snapshots, setSnapshots] = useState({});  // { actionId: prevSectionText } — for Undo
  const [launching, setLaunching] = useState(false);
  const [applyAllProgress, setApplyAllProgress] = useState(0);  // 0-100

  const company = resumeData?.company || "";
  const role    = resumeData?.role    || "";

  const rawRecs = Array.isArray(resumeData?.recommendations) ? resumeData.recommendations : [];
  const actions = rawRecs.length > 0
    ? rawRecs.map((text, i) => parseRecommendation(text, i))
    : DEFAULT_ACTIONS;

  const hasData = !!resumeData;

  /* ── Get the current text for a section from resumeData ── */
  const getSectionText = (section) => {
    // 1. Prefer the parsed sections dict (set at upload and kept in sync)
    const parsed = (resumeData?.sections || {})[section];
    if (parsed) return parsed;

    // 2. Top-level key (set when Apply writes back, or from /analyze response)
    const topLevel = resumeData?.[section];
    if (topLevel && typeof topLevel === "string") return topLevel;

    // 3. Special case: skills is an array in resumeData.skills
    if (section === "skills") {
      const arr = resumeData?.skills;
      if (Array.isArray(arr) && arr.length > 0) return arr.join(", ");
    }

    // 4. raw_text as last resort so AI always has something to improve
    if (resumeData?.raw_text) return resumeData.raw_text.slice(0, 800);

    return "";
  };

  /* ── Call /ai/rewrite-section and return the improved text ── */
  const callRewrite = async (section, currentText) => {
    console.log(`[AIResumeSuggestions] callRewrite section="${section}" textLen=${currentText.length} company="${company}" role="${role}"`);

    const res = await fetch(`${API}/ai/rewrite-section`, {
      method:  "POST",
      headers: { "Content-Type":"application/json", "Cache-Control":"no-store" },
      cache:   "no-store",
      body: JSON.stringify({
        section,
        current_text:           currentText || `(No ${section} content found in resume)`,
        original_uploaded_text: currentText || "",
        company:    company  || "Google",        // fallback so backend never rejects
        role:       role     || "Software Engineer",
        experience: "Fresher",
        timestamp:  Date.now(),
        regenerate: true,
      }),
    });
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      throw new Error(e.error || `Server error ${res.status}`);
    }
    const data = await res.json();
    console.log(`[AIResumeSuggestions] rewrite response groq=${data.groq_powered} len=${(data.rewritten||"").length}`);
    return data.rewritten || "";
  };

  /* ── Apply a single suggestion ── */
  const handleApply = async (action) => {
    const { id, section } = action;
    const currentText = getSectionText(section);

    // Save snapshot for Undo
    setSnapshots(p => ({ ...p, [id]: currentText }));
    setStatuses(p => ({ ...p, [id]: "loading" }));

    try {
      const improved = await callRewrite(section, currentText);

      // Write improved text into the ACTUAL resumeData (single source of truth)
      setResumeData(prev => ({
        ...prev,
        sections: { ...(prev?.sections || {}), [section]: improved },
        // Also update top-level key so other components (editor, preview) see it
        [section]: improved,
      }));

      setStatuses(p => ({ ...p, [id]: "applied" }));
      console.log(`[AIResumeSuggestions] Applied "${section}" — ${improved.length} chars`);

    } catch (err) {
      console.error(`[AIResumeSuggestions] Apply failed for "${section}":`, err.message);
      setStatuses(p => ({ ...p, [id]: "pending" }));
      alert(`Apply failed: ${err.message}`);
    }
  };

  /* ── Reject: mark as rejected, keep original ── */
  const handleReject = (id) => setStatuses(p => ({ ...p, [id]: "rejected" }));

  /* ── Undo: restore the snapshot ── */
  const handleUndo = (id) => {
    const action   = actions.find(a => a.id === id);
    const prevText = snapshots[id];

    if (action && prevText !== undefined) {
      setResumeData(prev => ({
        ...prev,
        sections: { ...(prev?.sections || {}), [action.section]: prevText },
        [action.section]: prevText,
      }));
    }
    setStatuses(p => ({ ...p, [id]: "pending" }));
  };

  /* ── Apply All: rewrite every pending section, update resumeData, then navigate ── */
  const handleApplyAll = async () => {
    const pending = actions.filter(a => !statuses[a.id] || statuses[a.id] === "pending");
    if (pending.length === 0) {
      // Nothing pending — just navigate with current data
      navigate("/ai-resume-builder", {
        state: { resumeData, applyAll:true, actions, fromResume:true },
      });
      return;
    }

    setLaunching(true);
    setApplyAllProgress(0);

    // Snapshot all sections before applying
    const snap = {};
    pending.forEach(a => { snap[a.id] = getSectionText(a.section); });
    setSnapshots(p => ({ ...p, ...snap }));

    // Mark all as loading
    const loadingMap = {};
    pending.forEach(a => { loadingMap[a.id] = "loading"; });
    setStatuses(p => ({ ...p, ...loadingMap }));

    let done     = 0;
    const total  = pending.length;
    // Accumulate all improvements then write once to avoid race conditions
    const improvements = {};

    await Promise.allSettled(
      pending.map(async (action) => {
        const { id, section } = action;
        try {
          const currentText = getSectionText(section);
          const improved    = await callRewrite(section, currentText);
          improvements[section] = improved;
          setStatuses(p => ({ ...p, [id]: "applied" }));
          console.log(`[AIResumeSuggestions] ApplyAll "${section}" done`);
        } catch (err) {
          console.error(`[AIResumeSuggestions] ApplyAll "${action.section}" failed:`, err.message);
          setStatuses(p => ({ ...p, [id]: "pending" }));
        } finally {
          done += 1;
          setApplyAllProgress(Math.round((done / total) * 100));
        }
      })
    );

    // Write all improvements into resumeData at once
    if (Object.keys(improvements).length > 0) {
      setResumeData(prev => {
        const updated = { ...prev, sections: { ...(prev?.sections || {}), ...improvements } };
        // Also propagate to top-level keys
        Object.entries(improvements).forEach(([k, v]) => { updated[k] = v; });
        return updated;
      });
    }

    setLaunching(false);

    // Navigate to the builder so the user can review, fine-tune, and download
    setTimeout(() => {
      navigate("/ai-resume-builder", {
        state: {
          resumeData: { ...resumeData, sections: { ...(resumeData?.sections || {}), ...improvements } },
          applyAll:   true,
          actions,
          fromResume: true,
        },
      });
    }, 400);
  };

  /* ── Undo Apply All (restore all snapshots) ── */
  const handleUndoAll = () => {
    const appliedActions = actions.filter(a => statuses[a.id] === "applied");
    if (appliedActions.length === 0) return;

    const restored = {};
    appliedActions.forEach(a => {
      const prev = snapshots[a.id];
      if (prev !== undefined) restored[a.section] = prev;
    });

    if (Object.keys(restored).length > 0) {
      setResumeData(prev => {
        const updated = { ...prev, sections: { ...(prev?.sections || {}), ...restored } };
        Object.entries(restored).forEach(([k, v]) => { updated[k] = v; });
        return updated;
      });
    }

    const resetMap = {};
    appliedActions.forEach(a => { resetMap[a.id] = "pending"; });
    setStatuses(p => ({ ...p, ...resetMap }));
  };

  const appliedCount = actions.filter(a => statuses[a.id] === "applied").length;
  const pendingCount = actions.filter(a => !statuses[a.id] || statuses[a.id] === "pending").length;

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
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background:"linear-gradient(135deg,rgba(124,58,237,0.20),rgba(236,72,153,0.15))", color:"#A78BFA" }}>
            <HiSparkles style={{ fontSize:"16px" }} />
          </div>
          <div>
            <h2 className="font-semibold text-base" style={{ color:"var(--text-primary)" }}>
              AI Resume Suggestions
            </h2>
            <p className="text-xs mt-0.5" style={{ color:"var(--text-faint)" }}>
              {company && role
                ? `Tailored for ${company} · ${role}`
                : "Upload &amp; analyse to get AI suggestions"}
            </p>
          </div>
        </div>

        {actions.length > 0 && (
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-xl flex-shrink-0"
              style={{ background:"rgba(124,58,237,0.12)", border:"1px solid rgba(124,58,237,0.25)", color:"#A78BFA" }}>
              {actions.length} actions
            </span>
            {appliedCount > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg"
                style={{ background:"rgba(34,197,94,0.12)", color:"var(--color-green-text)" }}>
                ✓ {appliedCount} applied
              </span>
            )}
          </div>
        )}
      </div>

      {/* Progress bar during Apply All */}
      <AnimatePresence>
        {launching && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }}
            className="mb-3 overflow-hidden">
            <div className="flex items-center gap-2 mb-1">
              <Loader2 size={12} className="animate-spin" style={{ color:"#7C3AED" }}/>
              <span className="text-xs font-semibold" style={{ color:"#A78BFA" }}>
                Applying AI improvements… {applyAllProgress}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background:"var(--border-subtle)" }}>
              <motion.div className="h-1.5 rounded-full"
                style={{ background:"linear-gradient(90deg,#7C3AED,#22C55E)" }}
                animate={{ width:`${applyAllProgress}%` }}
                transition={{ duration:0.3 }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!hasData ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
            style={{ background:"rgba(124,58,237,0.08)", border:"1px solid rgba(124,58,237,0.15)" }}>
            🤖
          </div>
          <p className="text-sm font-semibold" style={{ color:"var(--text-muted)" }}>No suggestions yet</p>
          <p className="text-xs mt-2 max-w-[200px]" style={{ color:"var(--text-faint)" }}>
            Upload your resume and click Analyse Resume to get AI-powered suggestions.
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
                status={statuses[action.id] || "pending"}
                onApply={handleApply}
                onReject={handleReject}
                onUndo={handleUndo}
              />
            ))}
          </div>

          {/* Bottom action bar */}
          <div className="mt-5 pt-4 space-y-2" style={{ borderTop:"1px solid var(--border-subtle)" }}>
            {/* Undo All (only shown when something is applied) */}
            <AnimatePresence>
              {appliedCount > 0 && (
                <motion.button
                  initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }}
                  onClick={handleUndoAll}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold"
                  style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.20)", color:"var(--color-red-text)" }}>
                  <RefreshCw size={11}/> Undo All Applied Changes ({appliedCount})
                </motion.button>
              )}
            </AnimatePresence>

            {/* Apply All */}
            <motion.button
              whileHover={!launching ? { scale:1.01 } : {}}
              whileTap={!launching  ? { scale:0.98 } : {}}
              onClick={handleApplyAll}
              disabled={launching}
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-80"
              style={{
                background: launching
                  ? "linear-gradient(135deg,#22C55E,#16A34A)"
                  : "linear-gradient(135deg,#7C3AED,#6D28D9)",
                boxShadow: "0 6px 20px rgba(124,58,237,0.38)",
              }}
            >
              <AnimatePresence mode="wait">
                {launching ? (
                  <motion.span key="loading" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                    className="flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin"/>
                    Applying {pendingCount} improvement{pendingCount !== 1 ? "s" : ""}…
                  </motion.span>
                ) : (
                  <motion.span key="idle" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                    className="flex items-center gap-2">
                    <HiSparkles style={{ fontSize:"14px" }} />
                    {appliedCount > 0 ? `Continue in AI Builder (${appliedCount} applied)` : "Apply All → AI Resume Builder"}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  );
}
