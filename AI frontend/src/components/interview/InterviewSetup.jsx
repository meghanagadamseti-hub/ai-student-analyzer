import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBrain, FaBuilding, FaCode, FaTachometerAlt,
  FaListOl, FaPlayCircle, FaRobot, FaSpinner,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

/* ─── Static option lists ─────────────────────────────────── */
const COMPANIES = [
  "Google", "Microsoft", "Amazon", "Apple", "Meta",
  "Adobe", "Oracle", "Salesforce", "Cisco", "NVIDIA",
  "Intel", "SAP", "PayPal", "Uber", "LinkedIn",
  "Atlassian", "Zoom", "TCS", "Infosys", "Wipro",
  "Accenture", "Cognizant", "Capgemini", "HCLTech",
  "Tech Mahindra", "IBM", "Razorpay", "CRED",
  "Freshworks", "Meesho", "Groww", "PhonePe",
  "Swiggy", "Zomato", "Zerodha", "Postman",
];

const ROLES = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "Machine Learning Engineer",
  "DevOps Engineer",
  "Cloud Engineer",
  "Android Developer",
  "iOS Developer",
  "Data Analyst",
  "Product Manager",
  "QA / Test Engineer",
  "System Design Engineer",
  "AI / ML Research Engineer",
];

const DIFFICULTIES = [
  { value: "Easy",   label: "Easy",   desc: "Core concepts & fundamentals",     color: "#34d399", bg: "rgba(16,185,129,0.10)"  },
  { value: "Medium", label: "Medium", desc: "Applied problem solving",           color: "#fbbf24", bg: "rgba(245,158,11,0.10)"  },
  { value: "Hard",   label: "Hard",   desc: "System design & advanced concepts", color: "#f87171", bg: "rgba(239,68,68,0.10)"   },
];

const QUESTION_COUNTS = [5, 10, 15, 20];

/* ─── Reusable field label ────────────────────────────────── */
function FieldLabel({ icon: Icon, color, children }) {
  return (
    <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2"
      style={{ color: "var(--text-faint)" }}>
      {Icon && <Icon style={{ color, fontSize: "10px" }} />}
      {children}
    </label>
  );
}

/* ─── Difficulty radio cards ─────────────────────────────── */
function DifficultyCard({ option, selected, onClick }) {
  const active = selected === option.value;
  return (
    <button
      type="button"
      onClick={() => onClick(option.value)}
      className="flex flex-col items-start p-3 rounded-xl transition-all duration-200 text-left"
      style={{
        background: active ? option.bg : "var(--bg-surface)",
        border:     `1.5px solid ${active ? option.color : "var(--border-default)"}`,
        boxShadow:  active ? `0 0 0 3px ${option.color}22` : "none",
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ background: option.color,
            boxShadow: active ? `0 0 6px ${option.color}` : "none" }} />
        <span className="text-sm font-semibold" style={{ color: active ? option.color : "var(--text-primary)" }}>
          {option.label}
        </span>
      </div>
      <p className="text-[11px] leading-tight" style={{ color: "var(--text-faint)" }}>
        {option.desc}
      </p>
    </button>
  );
}

/* ─── Summary chip ────────────────────────────────────────── */
function SummaryChip({ icon: Icon, color, label, value }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl"
      style={{ background: `${color}12`, border: `1px solid ${color}25` }}>
      <div className="flex items-center gap-2">
        <Icon style={{ color, fontSize: "12px" }} />
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
      </div>
      <span className="text-xs font-bold" style={{ color }}>{value}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   InterviewSetup  — main export
═══════════════════════════════════════════════════════════ */
export default function InterviewSetup({ onStart, loading, error }) {
  const [company,    setCompany]    = useState("Google");
  const [role,       setRole]       = useState("Software Engineer");
  const [difficulty, setDifficulty] = useState("Medium");
  const [numQ,       setNumQ]       = useState(10);

  const selectedDiff = DIFFICULTIES.find((d) => d.value === difficulty);

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart({ company, role, difficulty, questions: numQ });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="grid grid-cols-1 xl:grid-cols-3 gap-6"
    >
      {/* ── Left / Centre: Config form ── */}
      <form onSubmit={handleSubmit} className="xl:col-span-2 space-y-5">

        {/* Header card */}
        <div className="theme-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
              <FaBrain className="text-white" style={{ fontSize: "16px" }} />
            </div>
            <div>
              <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
                Interview Configuration
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
                Customise your practice session
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Company */}
            <div>
              <FieldLabel icon={FaBuilding} color="var(--color-indigo-text)">Target Company</FieldLabel>
              <select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="select-dark"
              >
                {COMPANIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* Role */}
            <div>
              <FieldLabel icon={FaCode} color="var(--color-green-text)">Job Role</FieldLabel>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="select-dark"
              >
                {ROLES.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Difficulty card */}
        <div className="theme-card rounded-2xl p-6">
          <FieldLabel icon={FaTachometerAlt} color="var(--color-yellow-text)">Difficulty Level</FieldLabel>
          <div className="grid grid-cols-3 gap-3 mt-1">
            {DIFFICULTIES.map((opt) => (
              <DifficultyCard
                key={opt.value}
                option={opt}
                selected={difficulty}
                onClick={setDifficulty}
              />
            ))}
          </div>
        </div>

        {/* Number of Questions card */}
        <div className="theme-card rounded-2xl p-6">
          <FieldLabel icon={FaListOl} color="var(--color-cyan-text)">Number of Questions</FieldLabel>
          <div className="flex gap-3 mt-1">
            {QUESTION_COUNTS.map((n) => {
              const active = numQ === n;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setNumQ(n)}
                  className="flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-200"
                  style={{
                    background: active
                      ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
                      : "var(--bg-surface)",
                    border: `1.5px solid ${active ? "#6366f1" : "var(--border-default)"}`,
                    color:  active ? "#ffffff" : "var(--text-muted)",
                    boxShadow: active ? "0 4px 14px rgba(99,102,241,0.35)" : "none",
                  }}
                >
                  {n}
                </button>
              );
            })}
          </div>
          <p className="text-xs mt-3" style={{ color: "var(--text-faint)" }}>
            Estimated time: ~{Math.round(numQ * 2.5)} minutes
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 px-4 py-3 rounded-2xl text-sm"
            style={{
              background: "rgba(239,68,68,0.10)",
              border:     "1px solid rgba(239,68,68,0.28)",
              color:      "var(--color-red-text)",
            }}
          >
            <span className="text-base flex-shrink-0">⚠️</span>
            <div>
              <p className="font-semibold">Failed to fetch questions</p>
              <p className="text-xs mt-0.5 opacity-80">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={!loading ? { scale: 1.01 } : {}}
          whileTap={!loading  ? { scale: 0.98 } : {}}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-sm font-bold text-white disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            background:  "linear-gradient(135deg,#6366f1,#8b5cf6)",
            boxShadow:   loading ? "none" : "0 8px 28px rgba(99,102,241,0.40)",
          }}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" style={{ fontSize: "15px" }} />
              Generating Questions…
            </>
          ) : (
            <>
              <FaPlayCircle style={{ fontSize: "16px" }} />
              Start Mock Interview
            </>
          )}
        </motion.button>
      </form>

      {/* ── Right: Live summary ── */}
      <div className="space-y-5">

        {/* Session summary */}
        <motion.div
          initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="theme-card rounded-2xl p-6"
        >
          <h3 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>
            Session Summary
          </h3>
          <div className="space-y-2.5">
            <SummaryChip icon={FaBuilding}     color="#6366f1" label="Company"    value={company} />
            <SummaryChip icon={FaCode}         color="#10b981" label="Role"       value={role.length > 18 ? role.slice(0,18)+"…" : role} />
            <SummaryChip icon={FaTachometerAlt}color={selectedDiff.color} label="Difficulty" value={difficulty} />
            <SummaryChip icon={FaListOl}       color="#22d3ee" label="Questions"  value={`${numQ} Questions`} />
          </div>
        </motion.div>

        {/* AI chat preview */}
        <motion.div
          initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.22 }}
          className="rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg,rgba(99,102,241,0.12),rgba(139,92,246,0.08))",
            border:     "1px solid var(--border-default)",
          }}
        >
          <div className="flex items-start gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
              <FaRobot className="text-white" style={{ fontSize: "12px" }} />
            </div>
            <div className="rounded-xl rounded-tl-sm px-3 py-2.5 flex-1 text-xs leading-relaxed"
              style={{
                background: "var(--bg-card)",
                border:     "1px solid var(--border-default)",
                color:      "var(--text-muted)",
              }}>
              Hello! I'll be your AI interviewer today for the{" "}
              <span style={{ color: "var(--color-indigo-text)", fontWeight: 600 }}>{role}</span>{" "}
              role at{" "}
              <span style={{ color: "var(--color-indigo-text)", fontWeight: 600 }}>{company}</span>.
              Ready when you are!
              <span className="inline-block w-1.5 h-3.5 ml-1 rounded-sm align-middle cursor-blink"
                style={{ background: "var(--color-indigo-text)" }} />
            </div>
          </div>
          <p className="text-[10px] text-center" style={{ color: "var(--text-faint)" }}>
            AI Interviewer Preview
          </p>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="theme-card rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <HiSparkles style={{ color: "var(--color-yellow-text)", fontSize: "14px" }} />
            <h3 className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Tips</h3>
          </div>
          <ul className="space-y-2">
            {[
              "Think aloud — explain your reasoning",
              "Use examples from real projects",
              "Mention trade-offs in your approach",
              "Ask clarifying questions if needed",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: "var(--color-indigo-text)" }} />
                {tip}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
