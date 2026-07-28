/**
 * AIOptimize.jsx — Company-specific Resume Optimization
 * Select company → see matched/missing keywords, ATS breakdown,
 * and tailored action items pulled from POST /resume-coach.
 * Falls back gracefully when the backend is offline.
 */
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar  from "../components/Navbar";

const API = "http://127.0.0.1:5000";

const COMPANIES = [
  "Google","Microsoft","Amazon","Apple","Netflix","Meta","Adobe","Oracle",
  "IBM","Salesforce","TCS","Infosys","Wipro","Accenture","Capgemini",
  "Cognizant","Flipkart","Swiggy","Zomato","Razorpay","CRED","Freshworks",
];
const ROLES = [
  "Software Engineer","Frontend Developer","Backend Developer",
  "Full Stack Developer","Data Scientist","Machine Learning Engineer",
  "DevOps Engineer","Cloud Engineer","Android Developer",
];

/* ── Animated bar ─────────────────────────────────────────── */
function Bar({ value, color, delay = 0 }) {
  const [w, setW] = useState(0);
  const start = useCallback(() => {
    const t = setTimeout(() => setW(value), 300 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  useState(() => { start(); });
  return (
    <div className="w-full h-2 rounded-full overflow-hidden"
      style={{ background: "var(--border-subtle)" }}>
      <div className="h-2 rounded-full"
        style={{ width: `${w}%`, background: color, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
    </div>
  );
}

/* ── Keyword chip ─────────────────────────────────────────── */
function KwChip({ word, type }) {
  const styles = {
    matched: { bg: "var(--tag-green-bg)", border: "var(--tag-green-border)", color: "var(--color-green-text)" },
    missing: { bg: "var(--tag-red-bg)",   border: "var(--tag-red-border)",   color: "var(--color-red-text)"   },
    weak:    { bg: "var(--tag-yellow-bg)",border: "var(--tag-yellow-border)",color: "var(--color-yellow-text)" },
  };
  const s = styles[type] || styles.matched;
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
      {type === "matched" ? "✓" : type === "missing" ? "✗" : "~"} {word}
    </span>
  );
}

/* ── Action item card ─────────────────────────────────────── */
function ActionCard({ text, priority, index }) {
  const pColors = { High: "#EF4444", Medium: "#F59E0B", Low: "#22C55E" };
  const color   = pColors[priority] || "#7C3AED";
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className="flex items-start gap-3 p-3.5 rounded-xl"
      style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}
    >
      <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
        <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black"
          style={{ background: `${color}18`, color }}>{index + 1}</span>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
          style={{ background: `${color}18`, color }}>{priority}</span>
      </div>
      <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{text}</span>
    </motion.div>
  );
}

/* ── Score ring ───────────────────────────────────────────── */
function ScoreRing({ value, color, label, size = 96 }) {
  const [pct, setPct] = useState(0);
  useState(() => { const t = setTimeout(() => setPct(value), 400); return () => clearTimeout(t); });
  const r = (size - 10) / 2, circ = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={9} />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={9}
            strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)} strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1.3s cubic-bezier(0.4,0,0.2,1)" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-black" style={{ color }}>{value}%</span>
        </div>
      </div>
      <span className="text-xs font-medium text-center" style={{ color: "var(--text-muted)" }}>{label}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Page export
═══════════════════════════════════════════════════════════ */
export default function AIOptimize() {
  const [company,  setCompany]  = useState("Google");
  const [role,     setRole]     = useState("Software Engineer");
  const [loading,  setLoading]  = useState(false);
  const [data,     setData]     = useState(null);
  const [error,    setError]    = useState("");

  const analyze = async () => {
    setLoading(true); setError(""); setData(null);
    try {
      const res  = await fetch(`${API}/resume-coach`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, role, experience: "Fresher" }),
      });
      if (!res.ok) throw new Error(`Server ${res.status} — upload your resume first.`);
      setData(await res.json());
    } catch (e) {
      // Graceful offline fallback
      setData(buildFallback(company, role));
      setError("Backend offline — showing demo data. Upload a resume for real results.");
    } finally {
      setLoading(false);
    }
  };

  const kw  = data?.keyword_analysis   || {};
  const atd = data?.ats_breakdown       || {};
  const sug = data?.company_suggestions || [];
  const chk = data?.checklist           || [];

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />
      <main className="ml-64 flex-1 p-6 min-w-0">
        <Navbar />

        {/* Header */}
        <motion.div initial={{ opacity:0,y:-10 }} animate={{ opacity:1,y:0 }} className="mb-7">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{ background:"rgba(34,197,94,0.14)", border:"1px solid rgba(34,197,94,0.28)", color:"var(--color-green-text)" }}>
              🎯 Company-Specific
            </span>
          </div>
          <h1 className="text-3xl font-bold" style={{ color:"var(--text-primary)" }}>Resume Optimization</h1>
          <p className="text-sm mt-1" style={{ color:"var(--text-faint)" }}>
            Tailor your resume for any company. See keyword gaps, ATS score, and exact action items.
          </p>
        </motion.div>

        {/* Config bar */}
        <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.08 }}
          className="theme-card rounded-2xl p-5 mb-6 flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[160px]">
            <label className="text-[11px] font-semibold uppercase tracking-wider block mb-1.5" style={{ color:"var(--text-faint)" }}>Target Company</label>
            <select className="select-dark text-sm" value={company} onChange={e=>setCompany(e.target.value)}>
              {COMPANIES.map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[160px]">
            <label className="text-[11px] font-semibold uppercase tracking-wider block mb-1.5" style={{ color:"var(--text-faint)" }}>Target Role</label>
            <select className="select-dark text-sm" value={role} onChange={e=>setRole(e.target.value)}>
              {ROLES.map(r=><option key={r}>{r}</option>)}
            </select>
          </div>
          <motion.button
            whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
            onClick={analyze} disabled={loading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-55"
            style={{ background:"linear-gradient(135deg,#7C3AED,#6D28D9)", boxShadow:"0 6px 18px rgba(124,58,237,0.35)", flexShrink:0 }}>
            {loading
              ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>Analyzing…</>
              : <>🎯 Optimize for {company}</>}
          </motion.button>
        </motion.div>

        {/* Error banner */}
        {error && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-5 text-sm"
            style={{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.25)", color:"var(--color-yellow-text)" }}>
            ⚠️ {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            {[1,2,3,4,5,6].map(i=>(
              <div key={i} className="h-40 rounded-2xl shimmer" style={{ background:"var(--border-subtle)" }} />
            ))}
          </div>
        )}

        {/* Results */}
        {!loading && data && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.4 }}
            className="space-y-5">

            {/* ATS Score rings */}
            <div className="theme-card rounded-2xl p-6">
              <h2 className="font-semibold text-base mb-5" style={{ color:"var(--text-primary)" }}>
                ATS Score Breakdown — {company}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
                <ScoreRing value={atd.overall        || 62} color="#7C3AED" label="Overall ATS"       />
                <ScoreRing value={atd.keyword_match  || 55} color="#06B6D4" label="Keyword Match"     />
                <ScoreRing value={atd.formatting_score||78} color="#22C55E" label="Formatting"        />
                <ScoreRing value={atd.project_quality||65} color="#F59E0B" label="Project Quality"   />
                <ScoreRing value={atd.experience_score||50}color="#EC4899" label="Experience"        />
                <ScoreRing value={atd.section_completeness||83} color="#A78BFA" label="Sections" />
              </div>
            </div>

            {/* Keywords + Actions */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

              {/* Keywords */}
              <div className="theme-card rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-base" style={{ color:"var(--text-primary)" }}>
                    Keyword Analysis
                  </h2>
                  <span className="text-sm font-bold" style={{ color:"#7C3AED" }}>
                    Score: {kw.keyword_score || 0}%
                  </span>
                </div>
                <Bar value={kw.keyword_score || 0} color="#7C3AED" />

                {(kw.matched_keywords || []).length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color:"var(--color-green-text)" }}>
                      ✓ Matched ({(kw.matched_keywords||[]).length})
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {(kw.matched_keywords||[]).map(k=><KwChip key={k} word={k} type="matched"/>)}
                    </div>
                  </div>
                )}
                {(kw.missing_keywords || []).length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color:"var(--color-red-text)" }}>
                      ✗ Missing — Add These ({(kw.missing_keywords||[]).length})
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {(kw.missing_keywords||[]).map(k=><KwChip key={k} word={k} type="missing"/>)}
                    </div>
                  </div>
                )}
                {(kw.weak_keywords || []).length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color:"var(--color-yellow-text)" }}>
                      ~ Mentioned Once — Strengthen These
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {(kw.weak_keywords||[]).map(k=><KwChip key={k} word={k} type="weak"/>)}
                    </div>
                  </div>
                )}
              </div>

              {/* Company-specific action items */}
              <div className="theme-card rounded-2xl p-5 space-y-3">
                <h2 className="font-semibold text-base" style={{ color:"var(--text-primary)" }}>
                  {company} Action Items
                </h2>
                {sug.length > 0
                  ? sug.map((s,i) => (
                      <ActionCard key={i} text={s} index={i}
                        priority={i === 0 ? "High" : i <= 2 ? "Medium" : "Low"} />
                    ))
                  : <p className="text-sm" style={{ color:"var(--text-faint)" }}>
                      Run the analysis to see company-specific recommendations.
                    </p>
                }
              </div>
            </div>

            {/* Resume Checklist */}
            {chk.length > 0 && (
              <div className="theme-card rounded-2xl p-5">
                <h2 className="font-semibold text-base mb-4" style={{ color:"var(--text-primary)" }}>
                  Resume Checklist
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {chk.map(({ item, label, present }) => (
                    <div key={item}
                      className="flex items-center gap-2 p-2.5 rounded-xl"
                      style={{
                        background: present ? "rgba(34,197,94,0.06)" : "rgba(239,68,68,0.06)",
                        border: `1px solid ${present ? "rgba(34,197,94,0.20)" : "rgba(239,68,68,0.20)"}`,
                      }}>
                      <span style={{ color: present ? "var(--color-green-text)" : "var(--color-red-text)", fontSize:"12px" }}>
                        {present ? "✓" : "✗"}
                      </span>
                      <span className="text-xs font-medium truncate"
                        style={{ color: present ? "var(--color-green-text)" : "var(--color-red-text)" }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Empty state */}
        {!loading && !data && (
          <div className="theme-card rounded-2xl p-16 flex flex-col items-center text-center">
            <span className="text-6xl mb-4">🎯</span>
            <p className="text-lg font-semibold" style={{ color:"var(--text-muted)" }}>
              Ready to optimize your resume
            </p>
            <p className="text-sm mt-2 max-w-md" style={{ color:"var(--text-faint)" }}>
              Select a company and role above, then click Optimize.
              Upload your resume on the Resume page first for real results.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

/* ── Offline fallback data ────────────────────────────────── */
function buildFallback(company, role) {
  return {
    company, role,
    keyword_analysis: {
      keyword_score:    55,
      matched_keywords: ["Python","React","SQL","Git","REST API"],
      missing_keywords: ["DSA","System Design","Docker","AWS","OOP"],
      weak_keywords:    ["Linux","Agile"],
    },
    ats_breakdown: {
      overall: 62, keyword_match: 55, formatting_score: 78,
      project_quality: 65, experience_score: 50, section_completeness: 83,
    },
    company_suggestions: [
      `Add ${company}-specific keywords to your resume headline and summary.`,
      `Quantify your project achievements — add metrics like users, uptime, and performance gains.`,
      `Include GitHub profile with active repositories showcasing the required tech stack.`,
      `Add a professional summary tailored to ${company}'s engineering culture.`,
      `Move your Skills section above Experience for better ATS parsing.`,
    ],
    checklist: [
      { item:"contact",        label:"Contact Info",   present:true  },
      { item:"skills",         label:"Skills",         present:true  },
      { item:"projects",       label:"Projects",       present:true  },
      { item:"experience",     label:"Experience",     present:false },
      { item:"education",      label:"Education",      present:true  },
      { item:"certifications", label:"Certifications", present:false },
      { item:"github",         label:"GitHub",         present:false },
      { item:"linkedin",       label:"LinkedIn",       present:false },
      { item:"portfolio",      label:"Portfolio",      present:false },
      { item:"achievements",   label:"Achievements",   present:false },
    ],
  };
}
