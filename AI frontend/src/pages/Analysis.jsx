import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FaFileAlt, FaChartLine, FaCheckCircle, FaBuilding } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

function AnimatedBar({ value, color, delay = 0 }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(value), 300 + delay); return () => clearTimeout(t); }, [value, delay]);
  return (
    <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
      <div className="h-2 rounded-full" style={{ width: `${w}%`, background: color, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
    </div>
  );
}

const scoreCards = [
  { label: "Resume Score",       value: 89,   icon: FaFileAlt,   color: "#6366f1", desc: "Strong structure"     },
  { label: "ATS Score",          value: 91,   icon: FaChartLine, color: "#10b981", desc: "ATS-friendly format"  },
  { label: "Interview Readiness",value: 82,   icon: FaCheckCircle,color:"#f59e0b", desc: "Near interview-ready" },
  { label: "Target Company",     value: null, display: "Google", icon: FaBuilding, color: "#ef4444", desc: "Software Engineer" },
];

function Analysis() {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />
      <main className="ml-64 flex-1 p-6 min-w-0">
        <Navbar />

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-7">
          <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>AI Resume Analysis</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-faint)" }}>
            Compare your resume with your target company and receive AI-powered recommendations.
          </p>
        </motion.div>

        {/* Status bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="theme-card rounded-2xl p-5 mb-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--color-green-text)", boxShadow: "0 0 8px var(--color-green-text)" }} />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Resume Status</p>
              <p className="text-sm font-semibold mt-0.5" style={{ color: "var(--color-green-text)" }}>✅ Resume Uploaded Successfully</p>
            </div>
          </div>
          <div className="h-px md:h-10 md:w-px w-full" style={{ background: "var(--border-default)" }} />
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--color-indigo-text)", boxShadow: "0 0 8px var(--color-indigo-text)" }} />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Selected Company</p>
              <p className="text-sm font-bold mt-0.5" style={{ color: "var(--color-indigo-text)" }}>Google</p>
            </div>
          </div>
        </motion.div>

        {/* Score cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">
          {scoreCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.label}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="theme-card rounded-2xl p-5 relative overflow-hidden"
                style={{ borderColor: `${card.color}25` }}>
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${card.color}66, transparent)` }} />
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-10 blur-xl pointer-events-none"
                  style={{ background: card.color }} />
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>{card.label}</p>
                    <h2 className="text-3xl font-bold mt-2" style={{ color: "var(--text-primary)" }}>
                      {card.value !== null ? `${card.value}%` : card.display}
                    </h2>
                    <p className="text-xs mt-1" style={{ color: "var(--text-faint)" }}>{card.desc}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${card.color}1a`, color: card.color }}>
                    <Icon className="text-base" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Resume Strength */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="theme-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(99,102,241,0.12)", color: "var(--color-indigo-text)" }}>
              <HiSparkles />
            </div>
            <div className="flex-1 flex justify-between items-center">
              <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>Resume Strength</h2>
              <span className="text-xl font-bold" style={{ color: "var(--color-indigo-text)" }}>89%</span>
            </div>
          </div>
          <AnimatedBar value={89} color="linear-gradient(90deg, #6366f1, #8b5cf6)" />
          <p className="text-sm mt-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Your resume has a strong structure and good technical skills.
            Adding industry-level projects and cloud technologies will further improve your profile.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              { label: "Technical Keywords", v: 91, color: "#10b981" },
              { label: "Project Impact",     v: 78, color: "#6366f1" },
              { label: "Cloud & DevOps",     v: 55, color: "#f59e0b" },
            ].map((item, i) => (
              <div key={item.label} className="rounded-xl p-4"
                style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}>
                <div className="flex justify-between mb-2">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{item.label}</span>
                  <span className="text-xs font-bold" style={{ color: item.color }}>{item.v}%</span>
                </div>
                <AnimatedBar value={item.v} color={item.color} delay={i * 100} />
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default Analysis;
