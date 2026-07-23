import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FaMicrophone, FaBuilding, FaCode, FaClock, FaPlayCircle, FaCheckCircle, FaBrain } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const topics = ["DSA","OOP","DBMS","Operating System","Computer Networks","SQL","React","Java"];

function MockInterview() {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />
      <main className="ml-64 flex-1 p-6 min-w-0">
        <Navbar />

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-7">
          <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>AI Mock Interview</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-faint)" }}>Practice interviews tailored to your target company and role.</p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-5">

            {/* Config */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="theme-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(99,102,241,0.12)", color: "var(--color-indigo-text)" }}>
                  <FaBrain className="text-sm" />
                </div>
                <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>Interview Configuration</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: "Company",   icon: FaBuilding, iconColor: "var(--color-indigo-text)", options: ["Google","Microsoft","Amazon","Adobe","TCS","Infosys"] },
                  { label: "Job Role",  icon: FaCode,     iconColor: "var(--color-green-text)",  options: ["Software Engineer","Frontend Developer","Backend Developer","Full Stack Developer","AI Engineer"] },
                  { label: "Difficulty",icon: null,       iconColor: null,                        options: ["Easy","Medium","Hard"] },
                  { label: "Duration",  icon: FaClock,    iconColor: "var(--color-red-text)",    options: ["15 Minutes","30 Minutes","45 Minutes"] },
                ].map((field) => {
                  const Icon = field.icon;
                  return (
                    <div key={field.label}>
                      <label className="text-xs font-semibold uppercase tracking-wider flex items-center gap-2 mb-2"
                        style={{ color: "var(--text-faint)" }}>
                        {Icon && <Icon className="text-[10px]" style={{ color: field.iconColor }} />}
                        {field.label}
                      </label>
                      <select className="select-dark">
                        {field.options.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Topics */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
              className="theme-card rounded-2xl p-6">
              <h2 className="font-semibold text-base mb-5" style={{ color: "var(--text-primary)" }}>Interview Topics</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {topics.map((topic) => (
                  <label key={topic}
                    className="flex items-center gap-2.5 rounded-xl p-3 cursor-pointer transition-all duration-200"
                    style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}>
                    <input type="checkbox" defaultChecked className="accent-indigo-500 w-3.5 h-3.5 flex-shrink-0" />
                    <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>{topic}</span>
                  </label>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right panel */}
          <div className="space-y-5">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="theme-card rounded-2xl p-6">
              <h2 className="font-semibold text-base mb-5" style={{ color: "var(--text-primary)" }}>Interview Summary</h2>
              <div className="space-y-3">
                {[
                  { icon: FaCheckCircle, color: "#6366f1",  bg: "rgba(99,102,241,0.10)",  label: "Total Questions", value: "20"         },
                  { icon: FaMicrophone,  color: "#10b981",  bg: "rgba(16,185,129,0.10)",  label: "Voice Mode",      value: "Phase 3"    },
                  { icon: FaClock,       color: "#f59e0b",  bg: "rgba(245,158,11,0.10)",  label: "Est. Duration",   value: "30 Minutes" },
                  { icon: HiSparkles,    color: "#06b6d4",  bg: "rgba(6,182,212,0.10)",   label: "AI Feedback",     value: "Instant"    },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="flex items-center justify-between p-3 rounded-xl"
                      style={{ background: s.bg, border: `1px solid ${s.color}20` }}>
                      <div className="flex items-center gap-2">
                        <Icon style={{ color: s.color, fontSize: "13px" }} />
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</span>
                      </div>
                      <span className="text-xs font-bold" style={{ color: s.color }}>{s.value}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* AI preview bubble */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="theme-card rounded-2xl p-5"
              style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))" }}>
              <div className="flex items-start gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                  <FaBrain className="text-white text-xs" />
                </div>
                <div className="rounded-xl rounded-tl-sm px-3 py-2 text-xs leading-relaxed flex-1"
                  style={{ background: "var(--bg-card)", color: "var(--text-muted)", border: "1px solid var(--border-default)" }}>
                  Hello! I'm your AI interviewer. Are you ready to begin?
                  <span className="inline-block w-1.5 h-3.5 ml-1 rounded-sm align-middle cursor-blink"
                    style={{ background: "var(--color-indigo-text)" }} />
                </div>
              </div>
              <p className="text-[10px] text-center" style={{ color: "var(--text-faint)" }}>Live AI Interview Preview</p>
            </motion.div>

            {/* Start button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 8px 25px rgba(99,102,241,0.35)" }}>
              <FaPlayCircle className="text-base" />Start Mock Interview
            </motion.button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MockInterview;
