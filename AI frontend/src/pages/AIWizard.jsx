/**
 * AIWizard.jsx  —  7-Step AI Resume Wizard powered by Groq
 *
 * Steps:
 *  1. Professional Summary
 *  2. Experience
 *  3. Projects
 *  4. Skills
 *  5. ATS Keywords
 *  6. Formatting Suggestions
 *  7. Final Preview + Download
 *
 * Single Groq API call on entry (or on explicit Regenerate).
 * All edits auto-save when navigating between steps.
 * Groq-unavailable → rule-based fallback (same UX, no error crash).
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronLeft, ChevronRight, RefreshCw, Check, Download,
  Loader2, Sparkles, AlertCircle, CheckCircle, Copy,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar  from "../components/Navbar";
import useCompanyRoles from "../hooks/useCompanyRoles";
import { downloadResumePDF } from "../utils/downloadResume";

const API = "http://127.0.0.1:5000";

/* ── Step definitions ─────────────────────────────────────────────────────── */
const STEPS = [
  { id: "summary",     label: "Summary",     emoji: "✏️", key: "summary"    },
  { id: "experience",  label: "Experience",  emoji: "💼", key: "experience" },
  { id: "projects",    label: "Projects",    emoji: "🛠", key: "projects"   },
  { id: "skills",      label: "Skills",      emoji: "⚡", key: "skills"     },
  { id: "keywords",    label: "ATS Keywords",emoji: "🔑", key: "ats_keywords"        },
  { id: "formatting",  label: "Formatting",  emoji: "📐", key: "formatting_suggestions" },
  { id: "preview",     label: "Final Preview",emoji:"🎉", key: null         },
];
const LAST_EDITABLE = 5;  // index of step 6 (0-based)
const PREVIEW_STEP  = 6;  // index of step 7

/* ── Progress bar ─────────────────────────────────────────────────────────── */
function ProgressBar({ current, total }) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold" style={{ color: "var(--text-faint)" }}>
          Step {current + 1} of {total}
        </span>
        <span className="text-xs font-bold" style={{ color: "#A78BFA" }}>{pct}%</span>
      </div>
      <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg,#7C3AED,#06B6D4)" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
      {/* Step pills */}
      <div className="flex gap-1 mt-3 overflow-x-auto pb-1">
        {STEPS.map((s, i) => (
          <div key={s.id}
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold flex-shrink-0"
            style={{
              background: i < current ? "rgba(34,197,94,0.12)"
                : i === current ? "rgba(124,58,237,0.18)"
                : "var(--bg-surface)",
              color: i < current ? "var(--color-green-text)"
                : i === current ? "#A78BFA"
                : "var(--text-faint)",
              border: `1px solid ${i === current ? "rgba(124,58,237,0.4)" : "transparent"}`,
            }}>
            {i < current ? <Check size={8} /> : <span>{s.emoji}</span>}
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Editable text section card ──────────────────────────────────────────── */
function SectionCard({ step, aiText, userText, onEdit, onAccept, onReject, onRestore, status, isLoading }) {
  const isKeywords   = step.key === "ats_keywords";
  const isFormatting = step.key === "formatting_suggestions";
  const isListField  = isKeywords || isFormatting;

  /* Convert array → display string for list fields */
  const displayText = isListField && Array.isArray(aiText)
    ? aiText.join("\n")
    : (typeof aiText === "string" ? aiText : "");

  const editDisplay = isListField && Array.isArray(userText)
    ? userText.join("\n")
    : (typeof userText === "string" ? userText : "");

  const handleChange = (val) => {
    if (isListField) {
      onEdit(val.split("\n").filter(Boolean));
    } else {
      onEdit(val);
    }
  };

  const statusColor = {
    accepted: { bg: "rgba(34,197,94,0.06)",  border: "rgba(34,197,94,0.30)"  },
    rejected: { bg: "rgba(239,68,68,0.06)",  border: "rgba(239,68,68,0.28)"  },
    pending:  { bg: "var(--bg-card)",         border: "var(--border-default)" },
  }[status] || { bg: "var(--bg-card)", border: "var(--border-default)" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${statusColor.border}`, background: statusColor.bg }}>

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}>
        <div className="flex items-center gap-2">
          <span className="text-lg">{step.emoji}</span>
          <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{step.label}</span>
          {status === "accepted" && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg"
              style={{ background: "rgba(34,197,94,0.15)", color: "var(--color-green-text)" }}>✓ Accepted</span>
          )}
          {status === "rejected" && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg"
              style={{ background: "rgba(239,68,68,0.12)", color: "var(--color-red-text)" }}>✗ Rejected</span>
          )}
          {status === "pending" && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg"
              style={{ background: "rgba(124,58,237,0.12)", color: "#A78BFA" }}>⏳ Review</span>
          )}
        </div>
        <button onClick={onRestore} title="Restore AI version"
          className="text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-opacity hover:opacity-75"
          style={{ background: "rgba(124,58,237,0.10)", color: "#A78BFA", border: "1px solid rgba(124,58,237,0.22)" }}>
          <RefreshCw size={10} className="inline mr-1" />Restore AI
        </button>
      </div>

      {/* AI suggestion */}
      <div className="px-5 pt-4 pb-2">
        <p className="text-[10px] font-bold uppercase tracking-wider mb-2"
          style={{ color: "var(--color-green-text)" }}>✨ AI Suggestion</p>
        {isLoading ? (
          <div className="flex items-center gap-2 py-4">
            <Loader2 size={16} className="animate-spin" style={{ color: "#7C3AED" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Generating AI suggestion…</span>
          </div>
        ) : (
          <div className="text-xs leading-relaxed whitespace-pre-wrap rounded-xl px-3 py-2"
            style={{ background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.12)", color: "var(--text-muted)" }}>
            {displayText || <em style={{ opacity: 0.5 }}>No suggestion available</em>}
          </div>
        )}
      </div>

      {/* Editable area */}
      <div className="px-5 pb-4">
        <p className="text-[10px] font-bold uppercase tracking-wider mb-2 mt-3"
          style={{ color: "var(--text-faint)" }}>✏️ Your Version (editable)</p>
        <textarea
          rows={isListField ? 5 : 4}
          value={editDisplay}
          onChange={e => handleChange(e.target.value)}
          className="input-dark text-xs resize-none w-full"
          style={{ lineHeight: "1.7", borderRadius: "12px" }}
          placeholder={`Edit your ${step.label.toLowerCase()} here…`}
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 px-5 pb-4">
        {status !== "accepted" && (
          <button onClick={onAccept}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg,#22C55E,#16A34A)" }}>
            <Check size={11} /> Accept
          </button>
        )}
        {status !== "rejected" && (
          <button onClick={onReject}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold"
            style={{ background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.22)", color: "var(--color-red-text)" }}>
            ✗ Reject
          </button>
        )}
        {(status === "accepted" || status === "rejected") && (
          <button onClick={() => onAccept("pending")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)", color: "var(--text-faint)" }}>
            ↩ Undo
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ── Loading overlay ─────────────────────────────────────────────────────── */
function LoadingOverlay({ company, role }) {
  const messages = [
    `Analysing resume for ${company}…`,
    `Matching skills for ${role}…`,
    "Generating personalised suggestions…",
    "Crafting ATS-optimised content…",
    "Almost ready…",
  ];
  const [msgIdx, setMsgIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setMsgIdx(i => (i + 1) % messages.length), 1400);
    return () => clearInterval(t);
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-5">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full animate-ping"
          style={{ background: "rgba(124,58,237,0.18)" }} />
        <div className="relative w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)" }}>
          <Sparkles size={32} color="white" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg font-black mb-1" style={{ color: "var(--text-primary)" }}>
          Groq AI is working…
        </p>
        <AnimatePresence mode="wait">
          <motion.p key={msgIdx}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-sm" style={{ color: "var(--text-faint)" }}>
            {messages[msgIdx]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="flex gap-1.5 mt-2">
        {[0,1,2].map(i => (
          <motion.div key={i} className="w-2 h-2 rounded-full"
            style={{ background: "#7C3AED" }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
        ))}
      </div>
    </div>
  );
}

/* ── Final Preview step ───────────────────────────────────────────────────── */
function PreviewStep({ form, decisions, aiData, currentAts, tplAccent, onDownload }) {
  const accepted   = Object.values(decisions).filter(d => d.status === "accepted").length;
  const estimated  = aiData?.estimated_ats_score ?? Math.min(99, currentAts + 15);
  const isGroq     = aiData?.groq_powered !== false;
  const [copied, setCopied] = useState(false);

  const copyResume = () => {
    const text = Object.entries(form).map(([k,v]) => `${k.toUpperCase()}:\n${v}`).join("\n\n");
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Score comparison */}
      <div className="rounded-2xl p-6"
        style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.10),rgba(6,182,212,0.08))", border: "1px solid rgba(124,58,237,0.25)" }}>
        <div className="flex items-center justify-center gap-10">
          <div className="text-center">
            <p className="text-4xl font-black" style={{ color: "var(--color-red-text)" }}>{currentAts}%</p>
            <p className="text-xs mt-1 font-semibold" style={{ color: "var(--text-faint)" }}>Before</p>
          </div>
          <div className="text-2xl" style={{ color: "var(--text-faint)" }}>→</div>
          <div className="text-center">
            <p className="text-4xl font-black" style={{ color: "var(--color-green-text)" }}>{estimated}%</p>
            <p className="text-xs mt-1 font-semibold" style={{ color: "var(--text-faint)" }}>After AI</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black" style={{ color: "#A78BFA" }}>+{estimated - currentAts}%</p>
            <p className="text-xs mt-1 font-semibold" style={{ color: "var(--text-faint)" }}>Improvement</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-4">
          {isGroq
            ? <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(124,58,237,0.15)", color: "#A78BFA", border: "1px solid rgba(124,58,237,0.3)" }}>⚡ Powered by Groq AI</span>
            : <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(245,158,11,0.10)", color: "var(--color-yellow-text)", border: "1px solid rgba(245,158,11,0.25)" }}>📊 Rule-based analysis</span>
          }
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(34,197,94,0.10)", color: "var(--color-green-text)", border: "1px solid rgba(34,197,94,0.25)" }}>
            {accepted} section{accepted !== 1 ? "s" : ""} accepted
          </span>
        </div>
      </div>

      {/* Resume preview */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border-default)" }}>
        <div className="px-5 py-3 flex items-center justify-between"
          style={{ background: "var(--bg-surface)", borderBottom: "1px solid var(--border-default)" }}>
          <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Resume Preview</span>
          <button onClick={copyResume}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: "rgba(124,58,237,0.10)", color: "#A78BFA", border: "1px solid rgba(124,58,237,0.22)" }}>
            {copied ? <><CheckCircle size={11} /> Copied!</> : <><Copy size={11} /> Copy</>}
          </button>
        </div>
        <div className="p-5 text-xs leading-relaxed overflow-auto max-h-96"
          style={{ background: "#FFFFFF", color: "#111827", fontFamily: "Inter, sans-serif" }}>
          <div style={{ borderBottom: `3px solid ${tplAccent}`, paddingBottom: 12, marginBottom: 12 }}>
            <h1 style={{ fontSize: 20, fontWeight: 900, margin: 0 }}>{form.name || "Your Name"}</h1>
            <p style={{ fontSize: 12, color: "#374151", margin: "3px 0 0" }}>{form.title || "Software Engineer"}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 6, fontSize: 11, color: "#6B7280" }}>
              {form.email    && <span>✉ {form.email}</span>}
              {form.phone    && <span>📞 {form.phone}</span>}
              {form.location && <span>📍 {form.location}</span>}
              {form.github   && <span>🔗 {form.github}</span>}
            </div>
          </div>
          {[
            { title: "Summary",    content: form.summary    },
            { title: "Skills",     content: form.skills     },
            { title: "Experience", content: form.experience },
            { title: "Projects",   content: form.projects   },
            { title: "Education",  content: form.education  },
          ].filter(s => s.content).map(({ title, content }) => (
            <div key={title} style={{ marginBottom: 12 }}>
              <h2 style={{ fontSize: 10, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.06em", color: tplAccent, marginBottom: 4 }}>{title}</h2>
              <pre style={{ fontSize: 11, color: "#374151", whiteSpace: "pre-wrap", fontFamily: "inherit", margin: 0, lineHeight: 1.65 }}>{content}</pre>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          onClick={onDownload}
          className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-white"
          style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)", boxShadow: "0 6px 18px rgba(124,58,237,0.35)" }}>
          <Download size={14} /> Download PDF
        </motion.button>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          onClick={copyResume}
          className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold"
          style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.28)", color: "var(--color-cyan-text, #06B6D4)" }}>
          <Copy size={14} /> Copy Text
        </motion.button>
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold"
          style={{ background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.25)", color: "var(--color-green-text)" }}>
          🖨 Print / Export
        </motion.button>
      </div>
    </div>
  );
}

/* ── Progress bar ─────────────────────────────────────────────────────────── */
function ProgressBar({ current, total }) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold" style={{ color: "var(--text-faint)" }}>
          Step {current + 1} of {total}
        </span>
        <span className="text-xs font-bold" style={{ color: "#A78BFA" }}>{pct}%</span>
      </div>
      <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
        <motion.div className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg,#7C3AED,#06B6D4)" }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }} />
      </div>
      <div className="flex gap-1 mt-3 overflow-x-auto pb-1">
        {STEPS.map((s, i) => (
          <div key={s.id}
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold flex-shrink-0"
            style={{
              background: i < current ? "rgba(34,197,94,0.12)" : i === current ? "rgba(124,58,237,0.18)" : "var(--bg-surface)",
              color: i < current ? "var(--color-green-text)" : i === current ? "#A78BFA" : "var(--text-faint)",
              border: `1px solid ${i === current ? "rgba(124,58,237,0.4)" : "transparent"}`,
            }}>
            {i < current ? <Check size={8} /> : <span>{s.emoji}</span>}
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Loading overlay ─────────────────────────────────────────────────────── */
function LoadingOverlay({ company, role }) {
  const msgs = [
    `Analysing resume for ${company}…`,
    `Matching skills for ${role}…`,
    "Generating AI suggestions…",
    "Crafting ATS-optimised content…",
    "Almost done…",
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => { const t = setInterval(() => setIdx(i => (i + 1) % msgs.length), 1400); return () => clearInterval(t); }, []); // eslint-disable-line
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-5">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(124,58,237,0.18)" }} />
        <div className="relative w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)" }}>
          <Sparkles size={32} color="white" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg font-black mb-1" style={{ color: "var(--text-primary)" }}>Groq AI is working…</p>
        <AnimatePresence mode="wait">
          <motion.p key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-sm" style={{ color: "var(--text-faint)" }}>{msgs[idx]}</motion.p>
        </AnimatePresence>
      </div>
      <div className="flex gap-1.5 mt-2">
        {[0,1,2].map(i => (
          <motion.div key={i} className="w-2 h-2 rounded-full" style={{ background: "#7C3AED" }}
            animate={{ scale: [1,1.5,1], opacity: [0.4,1,0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
        ))}
      </div>
    </div>
  );
}

/* ── Section card ─────────────────────────────────────────────────────────── */
function SectionCard({ step, aiText, userText, onEdit, onAccept, onReject, onRestore, status, isLoading }) {
  const isList = step.key === "ats_keywords" || step.key === "formatting_suggestions";
  const display = isList && Array.isArray(aiText) ? aiText.join("\n") : (aiText || "");
  const editVal = isList && Array.isArray(userText) ? userText.join("\n") : (userText || "");
  const onChange = v => onEdit(isList ? v.split("\n").filter(Boolean) : v);
  const colors = { accepted: { bg:"rgba(34,197,94,0.06)", bd:"rgba(34,197,94,0.30)" }, rejected: { bg:"rgba(239,68,68,0.06)", bd:"rgba(239,68,68,0.28)" }, pending: { bg:"var(--bg-card)", bd:"var(--border-default)" } }[status] || { bg:"var(--bg-card)", bd:"var(--border-default)" };
  return (
    <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
      className="rounded-2xl overflow-hidden" style={{ border:`1px solid ${colors.bd}`, background:colors.bg }}>
      <div className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom:"1px solid var(--border-subtle)", background:"var(--bg-surface)" }}>
        <div className="flex items-center gap-2">
          <span className="text-lg">{step.emoji}</span>
          <span className="font-bold text-sm" style={{ color:"var(--text-primary)" }}>{step.label}</span>
          {status === "accepted" && <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg" style={{ background:"rgba(34,197,94,0.15)", color:"var(--color-green-text)" }}>✓ Accepted</span>}
          {status === "rejected" && <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg" style={{ background:"rgba(239,68,68,0.12)", color:"var(--color-red-text)" }}>✗ Rejected</span>}
          {status === "pending"  && <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg" style={{ background:"rgba(124,58,237,0.12)", color:"#A78BFA" }}>⏳ Review</span>}
        </div>
        <button onClick={onRestore} className="text-[11px] px-2.5 py-1 rounded-lg font-semibold hover:opacity-75"
          style={{ background:"rgba(124,58,237,0.10)", color:"#A78BFA", border:"1px solid rgba(124,58,237,0.22)" }}>
          <RefreshCw size={10} className="inline mr-1" />Restore AI
        </button>
      </div>
      <div className="px-5 pt-4 pb-2">
        <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color:"var(--color-green-text)" }}>✨ AI Suggestion</p>
        {isLoading ? (
          <div className="flex items-center gap-2 py-4">
            <Loader2 size={16} className="animate-spin" style={{ color:"#7C3AED" }} />
            <span className="text-xs" style={{ color:"var(--text-muted)" }}>Generating…</span>
          </div>
        ) : (
          <div className="text-xs leading-relaxed whitespace-pre-wrap rounded-xl px-3 py-2"
            style={{ background:"rgba(34,197,94,0.04)", border:"1px solid rgba(34,197,94,0.12)", color:"var(--text-muted)" }}>
            {display || <em style={{ opacity:0.5 }}>No suggestion available</em>}
          </div>
        )}
      </div>
      <div className="px-5 pb-4">
        <p className="text-[10px] font-bold uppercase tracking-wider mb-2 mt-3" style={{ color:"var(--text-faint)" }}>✏️ Your Version (editable)</p>
        <textarea rows={isList ? 5 : 4} value={editVal} onChange={e => onChange(e.target.value)}
          className="input-dark text-xs resize-none w-full" style={{ lineHeight:"1.7", borderRadius:"12px" }}
          placeholder={`Edit your ${step.label.toLowerCase()} here…`} />
      </div>
      <div className="flex gap-2 px-5 pb-4">
        {status !== "accepted" && (
          <button onClick={onAccept} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white"
            style={{ background:"linear-gradient(135deg,#22C55E,#16A34A)" }}>
            <Check size={11} /> Accept
          </button>
        )}
        {status !== "rejected" && (
          <button onClick={onReject} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold"
            style={{ background:"rgba(239,68,68,0.10)", border:"1px solid rgba(239,68,68,0.22)", color:"var(--color-red-text)" }}>
            ✗ Reject
          </button>
        )}
        {(status === "accepted" || status === "rejected") && (
          <button onClick={() => onAccept("undo")} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold"
            style={{ background:"var(--bg-surface)", border:"1px solid var(--border-default)", color:"var(--text-faint)" }}>
            ↩ Undo
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ── Preview step ─────────────────────────────────────────────────────────── */
function PreviewStep({ form, decisions, aiData, currentAts, tplAccent, onDownload }) {
  const accepted  = Object.values(decisions).filter(d => d.status === "accepted").length;
  const estimated = aiData?.estimated_ats_score ?? Math.min(99, currentAts + 15);
  const isGroq    = aiData?.groq_powered !== false;
  const [copied, setCopied] = useState(false);
  const copyAll = () => {
    const text = [
      form.name, form.title, form.email,
      "\nSUMMARY:\n" + form.summary,
      "\nSKILLS:\n" + form.skills,
      "\nEXPERIENCE:\n" + form.experience,
      "\nPROJECTS:\n" + form.projects,
    ].join("\n");
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="space-y-6">
      {/* ATS comparison */}
      <div className="rounded-2xl p-6" style={{ background:"linear-gradient(135deg,rgba(124,58,237,0.10),rgba(6,182,212,0.08))", border:"1px solid rgba(124,58,237,0.25)" }}>
        <div className="flex items-center justify-center gap-10 mb-4">
          <div className="text-center">
            <p className="text-4xl font-black" style={{ color:"var(--color-red-text)" }}>{currentAts}%</p>
            <p className="text-xs mt-1 font-semibold" style={{ color:"var(--text-faint)" }}>Before</p>
          </div>
          <div className="text-2xl" style={{ color:"var(--text-faint)" }}>→</div>
          <div className="text-center">
            <p className="text-4xl font-black" style={{ color:"var(--color-green-text)" }}>{estimated}%</p>
            <p className="text-xs mt-1 font-semibold" style={{ color:"var(--text-faint)" }}>After AI</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-black" style={{ color:"#A78BFA" }}>+{estimated - currentAts}%</p>
            <p className="text-xs mt-1 font-semibold" style={{ color:"var(--text-faint)" }}>Improvement</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          {isGroq
            ? <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background:"rgba(124,58,237,0.15)", color:"#A78BFA", border:"1px solid rgba(124,58,237,0.3)" }}>⚡ Powered by Groq AI</span>
            : <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background:"rgba(245,158,11,0.10)", color:"var(--color-yellow-text)", border:"1px solid rgba(245,158,11,0.25)" }}>📊 Rule-based fallback</span>
          }
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background:"rgba(34,197,94,0.10)", color:"var(--color-green-text)", border:"1px solid rgba(34,197,94,0.25)" }}>
            {accepted} section{accepted !== 1 ? "s" : ""} accepted
          </span>
        </div>
      </div>
      {/* Resume preview */}
      <div className="rounded-2xl overflow-hidden" style={{ border:"1px solid var(--border-default)" }}>
        <div className="px-5 py-3 flex items-center justify-between" style={{ background:"var(--bg-surface)", borderBottom:"1px solid var(--border-default)" }}>
          <span className="text-sm font-bold" style={{ color:"var(--text-primary)" }}>Resume Preview</span>
          <button onClick={copyAll} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background:"rgba(124,58,237,0.10)", color:"#A78BFA", border:"1px solid rgba(124,58,237,0.22)" }}>
            {copied ? <><CheckCircle size={11} /> Copied!</> : <><Copy size={11} /> Copy</>}
          </button>
        </div>
        <div className="p-5 text-xs leading-relaxed overflow-auto max-h-96"
          style={{ background:"#FFFFFF", color:"#111827", fontFamily:"Inter,sans-serif" }}>
          <div style={{ borderBottom:`3px solid ${tplAccent}`, paddingBottom:12, marginBottom:12 }}>
            <h1 style={{ fontSize:20, fontWeight:900, margin:0 }}>{form.name || "Your Name"}</h1>
            <p style={{ fontSize:12, color:"#374151", margin:"3px 0 0" }}>{form.title || "Software Engineer"}</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginTop:6, fontSize:11, color:"#6B7280" }}>
              {form.email    && <span>✉ {form.email}</span>}
              {form.phone    && <span>📞 {form.phone}</span>}
              {form.location && <span>📍 {form.location}</span>}
              {form.github   && <span>🔗 {form.github}</span>}
            </div>
          </div>
          {[{title:"Summary",content:form.summary},{title:"Skills",content:form.skills},{title:"Experience",content:form.experience},{title:"Projects",content:form.projects},{title:"Education",content:form.education}].filter(s=>s.content).map(({title,content})=>(
            <div key={title} style={{ marginBottom:12 }}>
              <h2 style={{ fontSize:10, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.06em", color:tplAccent, marginBottom:4 }}>{title}</h2>
              <pre style={{ fontSize:11, color:"#374151", whiteSpace:"pre-wrap", fontFamily:"inherit", margin:0, lineHeight:1.65 }}>{content}</pre>
            </div>
          ))}
        </div>
      </div>
      {/* Action buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }} onClick={onDownload}
          className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-white"
          style={{ background:"linear-gradient(135deg,#7C3AED,#6D28D9)", boxShadow:"0 6px 18px rgba(124,58,237,0.35)" }}>
          <Download size={14} /> Download PDF
        </motion.button>
        <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }} onClick={copyAll}
          className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold"
          style={{ background:"rgba(6,182,212,0.12)", border:"1px solid rgba(6,182,212,0.28)", color:"#06B6D4" }}>
          <Copy size={14} /> Copy Resume
        </motion.button>
        <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }} onClick={() => window.print()}
          className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold"
          style={{ background:"rgba(34,197,94,0.10)", border:"1px solid rgba(34,197,94,0.25)", color:"var(--color-green-text)" }}>
          🖨 Print / Export
        </motion.button>
      </div>
    </div>
  );
}
