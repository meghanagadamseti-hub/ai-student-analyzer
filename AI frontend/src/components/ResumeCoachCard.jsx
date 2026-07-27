/**
 * ResumeCoachCard.jsx
 * AI Resume Coach card — rendered below RequiredSkills on the Resume page.
 *
 * Props:
 *   resumeData  — full object returned by POST /analyze (has company/role/etc.)
 *
 * Fetches POST /resume-coach on mount / when company+role changes.
 * All features implemented as collapsible sub-sections.
 */
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  FaBrain, FaCheckCircle, FaTimesCircle, FaLightbulb,
  FaRedo, FaKey, FaClipboardList, FaBolt, FaRocket,
  FaCertificate, FaChevronDown, FaChevronUp, FaSpinner,
  FaExternalLinkAlt, FaSearch,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const API = "http://127.0.0.1:5000";

/* ── Reusable sub-section wrapper ── */
function Section({ icon: Icon, color, title, badge, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--border-default)" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        style={{ background: "var(--bg-surface)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${color}18`, color }}>
            <Icon style={{ fontSize: "11px" }} />
          </div>
          <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            {title}
          </span>
          {badge != null && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg"
              style={{ background: `${color}18`, color }}>
              {badge}
            </span>
          )}
        </div>
        {open
          ? <FaChevronUp style={{ fontSize: "10px", color: "var(--text-faint)" }} />
          : <FaChevronDown style={{ fontSize: "10px", color: "var(--text-faint)" }} />
        }
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2" style={{ background: "var(--bg-elevated)" }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Animated progress bar ── */
function Bar({ value, color }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(value), 200); return () => clearTimeout(t); }, [value]);
  return (
    <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
      <div className="h-2 rounded-full"
        style={{ width: `${w}%`, background: color, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
    </div>
  );
}

/* ── Rewrite button with inline result ── */
function RewriteBtn({ original, company, role }) {
  const [loading,   setLoading]   = useState(false);
  const [rewritten, setRewritten] = useState("");
  const [error,     setError]     = useState("");

  const handleRewrite = async () => {
    setLoading(true); setError(""); setRewritten("");
    try {
      const res  = await fetch(`${API}/rewrite-bullet`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ original, company, role }),
      });
      const data = await res.json();
      setRewritten(data.rewritten || "");
    } catch {
      setError("Could not rewrite. Check backend connection.");
    } finally { setLoading(false); }
  };

  return (
    <div>
      <button
        onClick={handleRewrite}
        disabled={loading}
        className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg mt-2
                   hover:opacity-80 transition-opacity disabled:opacity-50"
        style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)",
                 color: "var(--color-indigo-text)" }}
      >
        {loading ? <FaSpinner className="animate-spin" style={{ fontSize: "10px" }} /> : <FaRedo style={{ fontSize: "9px" }} />}
        Rewrite using AI
      </button>

      {error && <p className="text-xs mt-1.5" style={{ color: "var(--color-red-text)" }}>{error}</p>}

      <AnimatePresence>
        {rewritten && (
          <motion.div
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-2 p-3 rounded-xl text-xs leading-relaxed"
            style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.22)",
                     color: "var(--color-green-text)" }}
          >
            <span className="font-semibold block mb-1">✨ AI Version:</span>
            {rewritten}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ResumeCoachCard — main export
═══════════════════════════════════════════════════════ */
export default function ResumeCoachCard({ resumeData }) {
  const [coach,   setCoach]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const company    = resumeData?.company    || "";
  const role       = resumeData?.role       || "";
  const experience = resumeData?.experience || "Fresher";

  /* Fetch coach report whenever company/role changes */
  const fetchReport = useCallback(async () => {
    if (!company || !role) return;
    setLoading(true); setError(""); setCoach(null);
    try {
      const res  = await fetch(`${API}/resume-coach`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ company, role, experience }),
      });
      if (!res.ok) throw new Error(`Server ${res.status}`);
      const data = await res.json();
      setCoach(data);
    } catch (e) {
      setError(e.message || "Could not load AI coach. Ensure the backend is running.");
    } finally { setLoading(false); }
  }, [company, role, experience]);

  useEffect(() => { fetchReport(); }, [fetchReport]);

  /* ── Header ── */
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="theme-card rounded-2xl p-6 mt-0"
    >
      {/* Title row */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.2))",
                     color: "var(--color-indigo-text)" }}>
            <FaBrain style={{ fontSize: "15px" }} />
          </div>
          <div>
            <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
              AI Resume Improvement Suggestions
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
              {company && role ? `${company} · ${role}` : "Run an analysis first"}
            </p>
          </div>
        </div>
        <button
          onClick={fetchReport}
          disabled={loading || !company}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold
                     hover:opacity-80 transition-opacity disabled:opacity-40"
          style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.22)",
                   color: "var(--color-indigo-text)" }}
        >
          {loading
            ? <FaSpinner className="animate-spin" style={{ fontSize: "11px" }} />
            : <FaRedo style={{ fontSize: "10px" }} />
          }
          {loading ? "Analyzing…" : "Refresh"}
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 p-4 rounded-xl"
            style={{ background: "rgba(99,102,241,0.07)", border: "1px solid var(--border-default)" }}>
            <FaSpinner className="animate-spin flex-shrink-0" style={{ color: "var(--color-indigo-text)", fontSize: "14px" }} />
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                AI is analyzing your resume…
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
                Generating {company}-specific suggestions for {role}
              </p>
            </div>
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 rounded-xl shimmer" style={{ background: "var(--border-subtle)" }} />
          ))}
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="flex items-start gap-3 p-4 rounded-xl mb-4"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)" }}>
          <FaTimesCircle style={{ color: "var(--color-red-text)", fontSize: "14px", flexShrink: 0, marginTop: 2 }} />
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--color-red-text)" }}>{error}</p>
            <button onClick={fetchReport}
              className="text-xs mt-1.5 underline hover:no-underline"
              style={{ color: "var(--color-indigo-text)" }}>
              Try again
            </button>
          </div>
        </div>
      )}

      {/* ── Coach sections ── */}
      {!loading && coach && (
        <div className="space-y-3">

          {/* ── 1. Resume Quality ── */}
          <Section icon={HiSparkles} color="#818cf8"
            title="Overall Resume Quality"
            badge={`${coach.resume_quality?.strength_score ?? 0}%`}
            defaultOpen={true}>
            <div className="mb-3">
              <div className="flex justify-between mb-1.5">
                <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                  Resume Strength
                </span>
                <span className="text-xs font-bold" style={{ color: "#818cf8" }}>
                  {coach.resume_quality?.strength_score ?? 0}% — {coach.resume_quality?.strength_label}
                </span>
              </div>
              <Bar value={coach.resume_quality?.strength_score ?? 0} color="#818cf8" />
            </div>
            {coach.resume_quality?.weaknesses?.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "var(--text-faint)" }}>
                  Weaknesses to Fix
                </p>
                <div className="space-y-1.5">
                  {coach.resume_quality.weaknesses.map((w, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs"
                      style={{ color: "var(--color-red-text)" }}>
                      <FaTimesCircle style={{ fontSize: "9px", flexShrink: 0, marginTop: 3 }} />
                      {w}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Section>

          {/* ── 2. ATS Breakdown ── */}
          <Section icon={FaSearch} color="#22d3ee" title="ATS Score Breakdown"
            badge={`${coach.ats_breakdown?.overall ?? 0}%`}>
            <div className="space-y-3">
              {[
                { label: "Overall ATS Score",     val: coach.ats_breakdown?.overall,            color: "#6366f1" },
                { label: "Keyword Match",          val: coach.ats_breakdown?.keyword_match,      color: "#22d3ee" },
                { label: "Formatting Score",       val: coach.ats_breakdown?.formatting_score,   color: "#fbbf24" },
                { label: "Project Quality",        val: coach.ats_breakdown?.project_quality,    color: "#34d399" },
                { label: "Experience Score",       val: coach.ats_breakdown?.experience_score,   color: "#a78bfa" },
                { label: "Section Completeness",   val: coach.ats_breakdown?.section_completeness,color: "#f87171" },
              ].map(({ label, val = 0, color }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
                    <span className="text-xs font-bold" style={{ color }}>{val}%</span>
                  </div>
                  <Bar value={val} color={color} />
                </div>
              ))}
            </div>
          </Section>

          {/* ── 3. Company-specific suggestions ── */}
          <Section icon={FaLightbulb} color="#fbbf24"
            title={`${company} Coach Suggestions`}
            badge={coach.company_suggestions?.length}
            defaultOpen={true}>
            <div className="space-y-2.5">
              {(coach.company_suggestions || []).map((tip, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: "rgba(99,102,241,0.06)", border: "1px solid var(--border-default)" }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(99,102,241,0.18)", color: "var(--color-indigo-text)" }}>
                    {i + 1}
                  </span>
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>{tip}</span>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* ── 4. Keyword Analysis ── */}
          <Section icon={FaKey} color="#06b6d4"
            title="Keyword Optimization"
            badge={`${coach.keyword_analysis?.keyword_score ?? 0}%`}>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "var(--color-green-text)" }}>
                  ✓ Matched Keywords ({coach.keyword_analysis?.matched_keywords?.length ?? 0})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(coach.keyword_analysis?.matched_keywords || []).map((kw) => (
                    <span key={kw} className="tag-green text-[11px]">{kw}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "var(--color-red-text)" }}>
                  ✗ Missing Keywords ({coach.keyword_analysis?.missing_keywords?.length ?? 0})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(coach.keyword_analysis?.missing_keywords || []).map((kw) => (
                    <span key={kw} className="tag-red text-[11px]">{kw}</span>
                  ))}
                </div>
              </div>
              {(coach.keyword_analysis?.weak_keywords || []).length > 0 && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                    style={{ color: "var(--color-yellow-text)" }}>
                    ⚠ Weak Keywords (mentioned only once)
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {coach.keyword_analysis.weak_keywords.map((kw) => (
                      <span key={kw} className="tag-yellow text-[11px]">{kw}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Section>

          {/* ── 5. Resume Checklist ── */}
          <Section icon={FaClipboardList} color="#34d399" title="Resume Checklist">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(coach.checklist || []).map(({ item, label, present }) => (
                <div key={item}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl"
                  style={{
                    background: present ? "rgba(16,185,129,0.06)" : "rgba(239,68,68,0.06)",
                    border:     `1px solid ${present ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`,
                  }}>
                  {present
                    ? <FaCheckCircle style={{ color: "var(--color-green-text)", fontSize: "11px", flexShrink: 0 }} />
                    : <FaTimesCircle style={{ color: "var(--color-red-text)",   fontSize: "11px", flexShrink: 0 }} />
                  }
                  <span className="text-xs font-medium"
                    style={{ color: present ? "var(--color-green-text)" : "var(--color-red-text)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          {/* ── 6. Impact Analyzer ── */}
          <Section icon={FaBolt} color="#f87171"
            title="Resume Impact Analyzer"
            badge={`${coach.impact_analysis?.weak_bullets?.length ?? 0} weak`}>
            {(coach.impact_analysis?.weak_bullets || []).length === 0 ? (
              <p className="text-sm" style={{ color: "var(--color-green-text)" }}>
                🎉 No weak bullet points detected!
              </p>
            ) : (
              <div className="space-y-4">
                {coach.impact_analysis.weak_bullets.map((item, i) => (
                  <div key={i} className="rounded-xl p-3"
                    style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}>
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-1"
                      style={{ color: "var(--text-faint)" }}>
                      Current (Weak)
                    </p>
                    <p className="text-xs mb-2 italic" style={{ color: "var(--color-red-text)" }}>
                      "{item.original}"
                    </p>
                    <p className="text-[10px] font-semibold mb-1" style={{ color: "var(--text-faint)" }}>
                      Suggestion
                    </p>
                    <p className="text-xs mb-2" style={{ color: "var(--color-yellow-text)" }}>
                      {item.suggestion}
                    </p>
                    <RewriteBtn original={item.original} company={company} role={role} />
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* ── 7. Section-wise Suggestions ── */}
          <Section icon={FaLightbulb} color="#a78bfa"
            title="Section-wise Resume Suggestions"
            badge={(coach.section_suggestions || []).length}>
            <div className="space-y-3">
              {(coach.section_suggestions || []).map((s, i) => (
                <div key={i} className="rounded-xl p-3"
                  style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}>
                  <p className="text-xs font-bold mb-1" style={{ color: "var(--color-indigo-text)" }}>
                    📌 {s.section}
                  </p>
                  <p className="text-xs mb-1.5" style={{ color: "var(--color-red-text)" }}>
                    Issue: {s.current_issue}
                  </p>
                  <p className="text-xs mb-1.5" style={{ color: "var(--text-muted)" }}>
                    💡 {s.suggestion}
                  </p>
                  <div className="rounded-lg p-2.5 text-xs italic"
                    style={{ background: "rgba(99,102,241,0.07)", color: "var(--color-green-text)" }}>
                    Example: {s.example}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── 8. Project Suggestions ── */}
          <Section icon={FaRocket} color="#fb923c"
            title="Suggested Projects for Missing Skills"
            badge={(coach.project_suggestions || []).length}>
            <div className="space-y-3">
              {(coach.project_suggestions || []).map((p, i) => (
                <div key={i} className="rounded-xl p-3"
                  style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      🛠 {p.title}
                    </p>
                    <span className="tag-indigo text-[10px] flex-shrink-0">{p.skill_focus}</span>
                  </div>
                  <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
                    <strong>Stack:</strong> {p.stack}
                  </p>
                  <p className="text-xs mb-1" style={{ color: "var(--color-green-text)" }}>
                    <strong>Impact:</strong> {p.impact}
                  </p>
                  <p className="text-[11px]" style={{ color: "var(--text-faint)" }}>
                    {p.company_value}
                  </p>
                  <NavLink to="/learning">
                    <button className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-lg mt-2
                                       hover:opacity-80 transition-opacity"
                      style={{ background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.22)",
                               color: "var(--color-green-text)" }}>
                      📚 Learn Now
                    </button>
                  </NavLink>
                </div>
              ))}
            </div>
          </Section>

          {/* ── 9. Certifications ── */}
          <Section icon={FaCertificate} color="#fbbf24"
            title="Recommended Certifications"
            badge={(coach.certifications || []).length}>
            <div className="space-y-2.5">
              {(coach.certifications || []).map((cert, i) => {
                const prColor = cert.priority === "High"
                  ? "var(--color-red-text)"
                  : cert.priority === "Medium"
                  ? "var(--color-yellow-text)"
                  : "var(--color-green-text)";
                return (
                  <div key={i} className="flex items-start justify-between gap-3 p-3 rounded-xl"
                    style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                        🎓 {cert.name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
                        {cert.provider}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                        {cert.why}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg"
                        style={{ background: `${prColor}18`, color: prColor }}>
                        {cert.priority}
                      </span>
                      {cert.url && (
                        <a href={cert.url} target="_blank" rel="noreferrer"
                          className="flex items-center gap-1 text-[10px] font-semibold hover:opacity-75 transition-opacity"
                          style={{ color: "var(--color-indigo-text)" }}>
                          <FaExternalLinkAlt style={{ fontSize: "8px" }} />
                          Enroll
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>

        </div>
      )}
    </motion.div>
  );
}
