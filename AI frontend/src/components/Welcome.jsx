import { motion } from "framer-motion";
import { FaRocket, FaChartLine } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

function Welcome() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl p-7 mb-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(99,102,241,0.14) 0%, rgba(139,92,246,0.10) 50%, rgba(6,182,212,0.06) 100%)",
        border: "1px solid var(--border-strong)",
      }}
    >
      {/* background orbs */}
      <div
        className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
      />
      <div
        className="absolute -bottom-8 left-1/3 w-36 h-36 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent)" }}
      />
      {/* top shine */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(139,92,246,0.5), transparent)",
        }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div>
          {/* badge */}
          <div className="flex items-center gap-2 mb-3">
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(99,102,241,0.12)",
                border:     "1px solid rgba(99,102,241,0.28)",
                color:      "var(--color-indigo-text)",
              }}
            >
              <HiSparkles className="text-xs" />
              AI-Powered Career Coach
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
            👋 Welcome Back,{" "}
            <span className="gradient-text">Meghana!</span>
          </h2>

          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Continue your interview preparation and track your progress.
            Your resume score improved by{" "}
            <span style={{ color: "var(--color-green-text)" }} className="font-semibold">
              +5%
            </span>{" "}
            this week.
          </p>

          {/* mini stats */}
          <div className="flex items-center gap-5 mt-4">
            {[
              { label: "Resume Score",   value: "85%",   color: "var(--color-indigo-text)" },
              { label: "Skills Matched", value: "18/25", color: "var(--color-green-text)"  },
              { label: "Interviews",     value: "12",    color: "var(--color-yellow-text)" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="text-lg font-bold" style={{ color: s.color }}>{s.value}</span>
                <span className="text-xs" style={{ color: "var(--text-faint)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <NavLink to="/resume">
            <button
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white hover:opacity-85 hover:-translate-y-0.5 transition-all"
              style={{
                background:  "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow:   "0 8px 20px rgba(99,102,241,0.32)",
              }}
            >
              <FaRocket className="text-xs" />
              Start Assessment
            </button>
          </NavLink>
          <NavLink to="/analytics">
            <button
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold hover:opacity-80 transition-all"
              style={{
                background: "var(--bg-card)",
                border:     "1px solid var(--border-default)",
                color:      "var(--text-secondary)",
              }}
            >
              <FaChartLine className="text-xs" />
              View Progress
            </button>
          </NavLink>
        </div>
      </div>
    </motion.div>
  );
}

export default Welcome;
