/**
 * AIRewriter.jsx  — AI Resume Rewriter
 * Paste weak bullet points → AI rewrites them into strong, metric-driven versions.
 * Backend: POST /rewrite-bullet  (already implemented in app.py)
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar  from "../components/Navbar";

const API = "http://127.0.0.1:5000";

const EXAMPLES = [
  "Worked on a website",
  "Helped with backend tasks",
  "Built a chat app",
  "Did testing for the project",
  "Worked on inventory system",
];

/* ── Single rewrite card ───────────────────────────────────── */
function RewriteCard({ original, index, onRemove }) {
  const [loading,   setLoading]   = useState(false);
  const [rewritten, setRewritten] = useState("");
  const [error,     setError]     = useState("");
  const [copied,    setCopied]    = useState(false);

  const rewrite = async () => {
    if (!original.trim()) return;
    setLoading(true); setError(""); setRewritten("");
    try {
      const res  = await fetch(`${API}/rewrite-bullet`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ original }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Rewrite failed");
      setRewritten(data.rewritten || "");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(rewritten).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid var(--border-default)" }}
    >
      {/* Original */}
      <div className="p-4" style={{ background: "var(--bg-surface)" }}>
        <div className="flex items-start justify-between gap-2 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: "var(--color-red-text)" }}>
            ⚠ Weak Bullet
          </span>
          <button onClick={onRemove}
            className="text-[11px] hover:opacity-60 transition-opacity"
            style={{ color: "var(--text-faint)" }}>
            ✕
          </button>
        </div>
        <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>
          "{original}"
        </p>
      </div>

      {/* Arrow */}
      <div className="flex items-center justify-between px-4 py-2"
        style={{ background: "rgba(124,58,237,0.06)", borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}>
        <span className="text-xs" style={{ color: "var(--text-faint)" }}>AI Rewriter</span>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={rewrite}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold text-white disabled:opacity-50"
          style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)" }}
        >
          {loading
            ? <><span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />Rewriting…</>
            : <>✨ Rewrite with AI</>
          }
        </motion.button>
      </div>

      {/* Result */}
      <AnimatePresence>
        {rewritten && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4" style={{ background: "rgba(34,197,94,0.05)" }}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: "var(--color-green-text)" }}>
                  ✅ AI-Improved Version
                </span>
                <button onClick={copy}
                  className="text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-all"
                  style={{
                    background: copied ? "rgba(34,197,94,0.15)" : "rgba(124,58,237,0.12)",
                    color: copied ? "var(--color-green-text)" : "var(--color-indigo-text)",
                  }}>
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                "{rewritten}"
              </p>
            </div>
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 text-xs"
            style={{ color: "var(--color-red-text)", background: "rgba(239,68,68,0.06)" }}>
            ⚠ {error} — ensure the backend is running.
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Page export
═══════════════════════════════════════════════════════════ */
export default function AIRewriter() {
  const [bullets,  setBullets]  = useState([""]);
  const [inputVal, setInputVal] = useState("");

  const addBullet = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setBullets(prev => [...prev.filter(Boolean), trimmed]);
    setInputVal("");
  };

  const removeBullet = (i) =>
    setBullets(prev => prev.filter((_, idx) => idx !== i));

  const loadExamples = () =>
    setBullets(EXAMPLES);

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />
      <main className="ml-64 flex-1 p-6 min-w-0">
        <Navbar />

        {/* Header */}
        <motion.div initial={{ opacity:0,y:-10 }} animate={{ opacity:1,y:0 }} className="mb-7">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{ background:"rgba(124,58,237,0.14)", border:"1px solid rgba(124,58,237,0.28)", color:"#A78BFA" }}>
              ✨ AI Powered
            </span>
          </div>
          <h1 className="text-3xl font-bold" style={{ color:"var(--text-primary)" }}>AI Resume Rewriter</h1>
          <p className="text-sm mt-1" style={{ color:"var(--text-faint)" }}>
            Paste weak bullet points — AI transforms them into powerful, metric-driven statements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* LEFT — input */}
          <div className="space-y-4">
            <div className="theme-card rounded-2xl p-5">
              <h2 className="font-semibold text-sm mb-3" style={{ color:"var(--text-primary)" }}>
                Add Bullet Points
              </h2>
              <textarea
                rows={3}
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); addBullet(inputVal); } }}
                placeholder="Paste a weak bullet point here…&#10;Press Enter to add"
                className="input-dark text-sm resize-none mb-3"
                style={{ lineHeight:"1.6" }}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => addBullet(inputVal)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white hover:opacity-85 transition-opacity"
                  style={{ background:"linear-gradient(135deg,#7C3AED,#6D28D9)" }}>
                  + Add Bullet
                </button>
                <button
                  onClick={loadExamples}
                  className="px-3 py-2.5 rounded-xl text-xs font-semibold hover:opacity-80 transition-opacity"
                  style={{ background:"rgba(124,58,237,0.10)", border:"1px solid rgba(124,58,237,0.22)", color:"#A78BFA" }}>
                  Try Examples
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="theme-card rounded-2xl p-5 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color:"var(--text-faint)" }}>
                What makes a strong bullet?
              </p>
              {[
                "Start with a strong action verb (Built, Engineered, Led)",
                "Mention the specific technology used",
                "Include a measurable outcome (%, users, time saved)",
                "Keep it under 20 words",
              ].map((tip,i) => (
                <div key={i} className="flex items-start gap-2 text-xs" style={{ color:"var(--text-muted)" }}>
                  <span className="mt-0.5" style={{ color:"#7C3AED" }}>→</span>
                  {tip}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — rewrite cards */}
          <div className="xl:col-span-2 space-y-4">
            {bullets.length === 0 || (bullets.length === 1 && !bullets[0]) ? (
              <div className="theme-card rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                <span className="text-5xl mb-4">✍️</span>
                <p className="text-base font-semibold" style={{ color:"var(--text-muted)" }}>
                  No bullets added yet
                </p>
                <p className="text-sm mt-1" style={{ color:"var(--text-faint)" }}>
                  Add a bullet point on the left or click "Try Examples"
                </p>
              </div>
            ) : (
              <AnimatePresence>
                {bullets.filter(Boolean).map((b, i) => (
                  <RewriteCard key={`${b}-${i}`} original={b} index={i}
                    onRemove={() => removeBullet(i)} />
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
