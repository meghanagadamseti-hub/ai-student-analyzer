/**
 * AISuggestions.jsx — AI Resume Suggestions
 * Section-by-section resume improvement suggestions powered by /resume-coach.
 * Each suggestion has Copy / Apply buttons. Falls back gracefully offline.
 */
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar  from "../components/Navbar";

const API = "http://127.0.0.1:5000";

const COMPANIES = [
  "Google","Microsoft","Amazon","Apple","Meta","Adobe","Netflix",
  "TCS","Infosys","Wipro","Accenture","Cognizant","Flipkart",
  "Razorpay","Freshworks","Swiggy","Zomato",
];
const ROLES = [
  "Software Engineer","Frontend Developer","Backend Developer",
  "Full Stack Developer","Data Scientist","DevOps Engineer",
];

/* ── Suggestion card with copy/apply ─────────────────────── */
function SuggestionCard({ section, issue, suggestion, example, index }) {
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(`${suggestion}\n\nExample: ${example}`).catch(()=>{});
    setCopied(true); setTimeout(()=>setCopied(false), 2000);
  };

  const SECTION_COLORS = {
    "Professional Summary": "#7C3AED",
    "Projects":             "#06B6D4",
    "Skills":               "#22C55E",
    "Experience / Internship": "#F59E0B",
    "Certifications":       "#EC4899",
  };
  const color = SECTION_COLORS[section] || "#A78BFA";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid var(--border-default)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3"
        style={{ background: `${color}0e`, borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: color }} />
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color }}>
            {section}
          </span>
        </div>
        <div className="flex gap-2">
          <button onClick={copy}
            className="text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-all"
            style={{ background: copied ? "rgba(34,197,94,0.14)" : `${color}18`,
                     color: copied ? "var(--color-green-text)" : color }}>
            {copied ? "✓ Copied" : "Copy"}
          </button>
          <button onClick={() => setApplied(true)}
            className="text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-all"
            style={{ background: applied ? "rgba(34,197,94,0.14)" : "rgba(34,197,94,0.10)",
                     color: "var(--color-green-text)" }}>
            {applied ? "✓ Applied" : "Apply"}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-4 space-y-3" style={{ background: "var(--bg-elevated)" }}>
        {issue && (
          <div className="flex items-start gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider flex-shrink-0 mt-0.5"
              style={{ color: "var(--color-red-text)" }}>Issue</span>
            <span className="text-xs" style={{ color: "var(--color-red-text)" }}>{issue}</span>
          </div>
        )}
        <div className="flex items-start gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider flex-shrink-0 mt-0.5"
            style={{ color: "var(--text-faint)" }}>Fix</span>
          <span className="text-sm" style={{ color: "var(--text-primary)" }}>{suggestion}</span>
        </div>
        {example && (
          <div className="px-3 py-2.5 rounded-xl text-xs italic"
            style={{ background: `${color}0a`, border: `1px solid ${color}20`,
                     color: "var(--text-muted)" }}>
            💡 <strong>Example:</strong> {example}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Quality bar ──────────────────────────────────────────── */
function QualityBar({ score, label, color }) {
  const [w, setW] = useState(0);
  useState(() => { const t = setTimeout(()=>setW(score), 400); return ()=>clearTimeout(t); });
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-xs" style={{ color:"var(--text-muted)" }}>{label}</span>
        <span className="text-xs font-bold" style={{ color }}>{score}%</span>
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background:"var(--border-subtle)" }}>
        <div className="h-2 rounded-full"
          style={{ width:`${w}%`, background:color, transition:"width 1.2s cubic-bezier(0.4,0,0.2,1)" }}/>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Page export
═══════════════════════════════════════════════════════════ */
export default function AISuggestions() {
  const [company,  setCompany]  = useState("Google");
  const [role,     setRole]     = useState("Software Engineer");
  const [loading,  setLoading]  = useState(false);
  const [data,     setData]     = useState(null);
  const [error,    setError]    = useState("");

  const analyze = async () => {
    setLoading(true); setError(""); setData(null);
    try {
      const res = await fetch(`${API}/resume-coach`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ company, role, experience:"Fresher" }),
      });
      if (!res.ok) throw new Error(`Server ${res.status}`);
      setData(await res.json());
    } catch {
      setData(buildFallback(company, role));
      setError("Backend offline — showing demo suggestions. Upload your resume for personalized results.");
    } finally { setLoading(false); }
  };

  const sections  = data?.section_suggestions || [];
  const quality   = data?.resume_quality      || {};
  const aiTips    = data?.ai_suggestions      || data?.company_suggestions || [];

  return (
    <div className="flex min-h-screen" style={{ background:"var(--bg-base)" }}>
      <Sidebar />
      <main className="ml-64 flex-1 p-6 min-w-0">
        <Navbar />

        {/* Header */}
        <motion.div initial={{ opacity:0,y:-10 }} animate={{ opacity:1,y:0 }} className="mb-7">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{ background:"rgba(124,58,237,0.14)", border:"1px solid rgba(124,58,237,0.30)", color:"#A78BFA" }}>
              💡 AI Powered
            </span>
          </div>
          <h1 className="text-3xl font-bold" style={{ color:"var(--text-primary)" }}>AI Resume Suggestions</h1>
          <p className="text-sm mt-1" style={{ color:"var(--text-faint)" }}>
            Section-by-section improvements tailored to your target company and role.
          </p>
        </motion.div>

        {/* Config bar */}
        <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.08 }}
          className="theme-card rounded-2xl p-5 mb-6 flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[150px]">
            <label className="text-[11px] font-semibold uppercase tracking-wider block mb-1.5" style={{ color:"var(--text-faint)" }}>Company</label>
            <select className="select-dark text-sm" value={company} onChange={e=>setCompany(e.target.value)}>
              {COMPANIES.map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="text-[11px] font-semibold uppercase tracking-wider block mb-1.5" style={{ color:"var(--text-faint)" }}>Role</label>
            <select className="select-dark text-sm" value={role} onChange={e=>setRole(e.target.value)}>
              {ROLES.map(r=><option key={r}>{r}</option>)}
            </select>
          </div>
          <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
            onClick={analyze} disabled={loading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-55 flex-shrink-0"
            style={{ background:"linear-gradient(135deg,#7C3AED,#6D28D9)", boxShadow:"0 6px 18px rgba(124,58,237,0.32)" }}>
            {loading
              ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>Analyzing…</>
              : <>💡 Generate Suggestions</>}
          </motion.button>
        </motion.div>

        {/* Offline banner */}
        {error && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-5 text-sm"
            style={{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.25)", color:"var(--color-yellow-text)" }}>
            ⚠️ {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            {[...Array(6)].map((_,i)=>(
              <div key={i} className="h-36 rounded-2xl shimmer" style={{ background:"var(--border-subtle)" }}/>
            ))}
          </div>
        )}

        {/* Results */}
        {!loading && data && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* LEFT — quality overview + AI tips */}
            <div className="space-y-5">
              <div className="theme-card rounded-2xl p-5">
                <h2 className="font-semibold text-sm mb-4" style={{ color:"var(--text-primary)" }}>
                  Resume Quality
                </h2>
                <div className="flex items-center gap-3 mb-5">
                  <div className="text-3xl font-black" style={{ color:"#7C3AED" }}>
                    {quality.strength_score || 72}%
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color:"var(--text-primary)" }}>
                      {quality.strength_label || "Good"}
                    </p>
                    <p className="text-xs" style={{ color:"var(--text-faint)" }}>Overall strength</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <QualityBar score={quality.strength_score || 72} label="Overall Strength" color="#7C3AED" />
                  <QualityBar score={65} label="Keyword Coverage" color="#06B6D4" />
                  <QualityBar score={78} label="Section Completeness" color="#22C55E" />
                  <QualityBar score={55} label="Impact Metrics" color="#F59E0B" />
                </div>
                {(quality.weaknesses || []).length > 0 && (
                  <div className="mt-4 space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color:"var(--color-red-text)" }}>
                      Weaknesses to Fix
                    </p>
                    {quality.weaknesses.map((w,i) => (
                      <div key={i} className="flex items-start gap-2 text-xs"
                        style={{ color:"var(--color-red-text)" }}>
                        <span className="flex-shrink-0">✗</span>{w}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* AI Tips for company */}
              {aiTips.length > 0 && (
                <div className="rounded-2xl p-5"
                  style={{ background:"linear-gradient(135deg,rgba(124,58,237,0.10),rgba(109,40,217,0.07))",
                           border:"1px solid rgba(124,58,237,0.25)" }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color:"#A78BFA" }}>
                    {company} Specific Tips
                  </p>
                  <div className="space-y-2.5">
                    {aiTips.slice(0,5).map((t,i) => (
                      <div key={i} className="flex items-start gap-2 text-xs"
                        style={{ color:"var(--text-muted)" }}>
                        <span className="flex-shrink-0 font-bold" style={{ color:"#7C3AED" }}>→</span>
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT — section suggestions */}
            <div className="xl:col-span-2 space-y-4">
              <h2 className="font-semibold text-base" style={{ color:"var(--text-primary)" }}>
                Section-wise Suggestions
              </h2>
              {sections.length > 0
                ? sections.map((s, i) => (
                    <SuggestionCard key={i} index={i}
                      section={s.section} issue={s.current_issue}
                      suggestion={s.suggestion} example={s.example} />
                  ))
                : <div className="theme-card rounded-2xl p-12 text-center">
                    <span className="text-4xl">💡</span>
                    <p className="text-sm mt-3" style={{ color:"var(--text-faint)" }}>
                      No suggestions yet — click Generate Suggestions above.
                    </p>
                  </div>
              }
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && !data && (
          <div className="theme-card rounded-2xl p-16 flex flex-col items-center text-center">
            <span className="text-6xl mb-4">💡</span>
            <p className="text-lg font-semibold" style={{ color:"var(--text-muted)" }}>
              Ready to improve your resume
            </p>
            <p className="text-sm mt-2 max-w-md" style={{ color:"var(--text-faint)" }}>
              Select a company and role, then click Generate Suggestions.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

function buildFallback(company, role) {
  return {
    resume_quality: {
      strength_score: 72, strength_label: "Good",
      weaknesses: ["No GitHub link found","Missing quantified metrics","No professional summary"],
    },
    company_suggestions: [
      `Tailor your summary to mention ${company}'s engineering culture.`,
      `Add measurable outcomes to every project: users, uptime, performance gains.`,
      `Include ${company}-relevant keywords: ${role === "Software Engineer" ? "DSA, System Design, OOP" : "React, REST API, SQL"}.`,
      "Push active projects to GitHub — recruiters check profiles.",
      "Add a certifications section to stand out from other candidates.",
    ],
    section_suggestions: [
      { section:"Professional Summary", current_issue:"Summary is missing or too generic.",
        suggestion:`Add a 2-3 line summary targeting ${company} as a ${role}.`,
        example:`Results-driven ${role} with expertise in Python and React, seeking to build scalable systems at ${company}.` },
      { section:"Projects", current_issue:"Projects lack measurable impact.",
        suggestion:"Add metrics to every project: users served, performance improvements, uptime.",
        example:"Built a REST API serving 10,000+ daily requests with 99.9% uptime using Flask and PostgreSQL." },
      { section:"Skills", current_issue:`Missing ${company}-critical skills.`,
        suggestion:"Add missing skills supported by project evidence.",
        example:"Add: Docker, AWS, System Design, CI/CD — each backed by a project in the same section." },
      { section:"Experience / Internship", current_issue:"Bullet points use weak verbs.",
        suggestion:"Start each bullet with a strong action verb + tech + measurable result.",
        example:`Engineered microservices using Java and Spring Boot, reducing API latency by 35%.` },
      { section:"Certifications", current_issue:"No certifications listed.",
        suggestion:`Add ${company}-relevant certifications.`,
        example:"AWS Cloud Practitioner, Google Data Analytics Certificate, Meta Front-End Developer." },
    ],
  };
}
