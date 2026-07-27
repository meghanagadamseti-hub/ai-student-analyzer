import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar  from "../components/Navbar";

/* ── tiny inline SVG icons ──────────────────────────────────── */
const Icon = ({ d, ...p }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...p}>
    <path fillRule="evenodd" d={d} clipRule="evenodd" />
  </svg>
);

/* ── Animated counter hook ────────────────────────────────── */
function useCounter(target, duration = 1200, started = true) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.round(start));
    }, 16);
    return () => clearInterval(id);
  }, [target, duration, started]);
  return val;
}

/* ── Circular progress ring ─────────────────────────────── */
function ProgressRing({ value, size = 80, stroke = 7, color }) {
  const [pct, setPct] = useState(0);
  useEffect(() => { const t = setTimeout(() => setPct(value), 300); return () => clearTimeout(t); }, [value]);
  const r    = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct / 100)}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.3s cubic-bezier(0.4,0,0.2,1)" }}
      />
    </svg>
  );
}

/* ── Stat card with ring ─────────────────────────────────── */
function StatCard({ title, value, suffix = "%", color, icon, change, positive, delay = 0 }) {
  const counted = useCounter(typeof value === "number" ? value : 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative rounded-2xl p-5 overflow-hidden card-hover"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}
    >
      {/* top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
      {/* bg orb */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-[0.08] blur-2xl pointer-events-none"
        style={{ background: color }} />

      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider mb-2"
            style={{ color: "var(--text-faint)" }}>{title}</p>
          <div className="flex items-end gap-1">
            <span className="text-3xl font-black" style={{ color: "var(--text-primary)" }}>
              {typeof value === "number" ? counted : value}
            </span>
            {suffix && <span className="text-lg font-bold mb-0.5" style={{ color }}>{suffix}</span>}
          </div>
          {change && (
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-xs px-2 py-0.5 rounded-lg font-semibold"
                style={{
                  background: positive ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                  color: positive ? "var(--color-green-text)" : "var(--color-red-text)",
                }}>
                {positive ? "↑" : "↓"} {change}
              </span>
              <span className="text-[10px]" style={{ color: "var(--text-faint)" }}>vs last month</span>
            </div>
          )}
        </div>

        {/* Ring */}
        <div className="relative flex-shrink-0">
          <ProgressRing value={typeof value === "number" ? value : 75} size={72} stroke={6} color={color} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center"
              style={{ background: `${color}18`, color }}>
              {icon}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Activity item ─────────────────────────────────────── */
function ActivityItem({ emoji, label, sub, time, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-center gap-3 py-3"
      style={{ borderBottom: "1px solid var(--border-subtle)" }}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base"
        style={{ background: `${color}18` }}>
        {emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{label}</p>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{sub}</p>
      </div>
      <span className="text-[10px] flex-shrink-0" style={{ color: "var(--text-faint)" }}>{time}</span>
      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
    </motion.div>
  );
}

/* ── Quick action button ─────────────────────────────── */
function QuickAction({ emoji, label, sub, to, color }) {
  return (
    <NavLink to={to}>
      <motion.div
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="flex flex-col items-center gap-2 p-4 rounded-2xl cursor-pointer text-center"
        style={{
          background: `${color}0e`,
          border:     `1px solid ${color}28`,
        }}
      >
        <span className="text-2xl">{emoji}</span>
        <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{label}</p>
        <p className="text-[10px]" style={{ color: "var(--text-faint)" }}>{sub}</p>
      </motion.div>
    </NavLink>
  );
}

/* ── Skill progress bar ─────────────────────────────── */
function SkillBar({ name, value, color, delay }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(value), 400 + delay); return () => clearTimeout(t); }, [value, delay]);
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{name}</span>
        <span className="text-xs font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
        <div className="h-1.5 rounded-full"
          style={{ width: `${w}%`, background: color, transition: "width 1.3s cubic-bezier(0.4,0,0.2,1)" }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   DASHBOARD PAGE
═══════════════════════════════════════════════════════ */
const STATS = [
  { title: "Resume Score",      value: 85,   suffix: "%",  color: "#7C3AED", change: "+5%",      positive: true,  delay: 0    },
  { title: "Company Readiness", value: 78,   suffix: "%",  color: "#06B6D4", change: "+8%",      positive: true,  delay: 0.07 },
  { title: "Skill Match",       value: 72,   suffix: "%",  color: "#22C55E", change: "+3 skills",positive: true,  delay: 0.14 },
  { title: "Interview Score",   value: 68,   suffix: "%",  color: "#F59E0B", change: "+12%",     positive: true,  delay: 0.21 },
];

const SKILLS = [
  { name: "Python",  value: 88, color: "#7C3AED" },
  { name: "React",   value: 82, color: "#06B6D4" },
  { name: "SQL",     value: 74, color: "#22C55E" },
  { name: "Docker",  value: 45, color: "#F59E0B" },
  { name: "AWS",     value: 28, color: "#EF4444" },
];

const ACTIVITIES = [
  { emoji: "📄", label: "Resume uploaded",                sub: "resume_final.pdf",             time: "2m ago",   color: "#7C3AED" },
  { emoji: "🤖", label: "AI Analysis completed",          sub: "ATS Score: 89%",               time: "3h ago",   color: "#06B6D4" },
  { emoji: "🏢", label: "Google company viewed",          sub: "Software Engineer role",       time: "Yesterday",color: "#22C55E" },
  { emoji: "🎤", label: "Mock Interview completed",       sub: "Grade B — Amazon SDE I",       time: "2 days ago",color: "#F59E0B" },
  { emoji: "📚", label: "Docker basics completed",        sub: "Week 3 roadmap",               time: "3 days ago",color: "#EC4899" },
];

const QUICK_ACTIONS = [
  { emoji: "📄", label: "Analyze Resume",   sub: "Upload & score",       to: "/resume",          color: "#7C3AED" },
  { emoji: "✍️", label: "AI Builder",       sub: "Create resume",        to: "/ai-resume-builder",color: "#EC4899" },
  { emoji: "🏢", label: "Browse Jobs",      sub: "Explore companies",    to: "/companies",        color: "#06B6D4" },
  { emoji: "🎤", label: "Mock Interview",   sub: "Practice now",         to: "/mock-interview",   color: "#F97316" },
  { emoji: "📚", label: "Start Learning",   sub: "Your roadmap",         to: "/learning",         color: "#22C55E" },
  { emoji: "📊", label: "View Analytics",   sub: "Track progress",       to: "/analytics",        color: "#F59E0B" },
];

const AI_SUGGESTIONS = [
  { icon: "💡", text: "Add AWS experience to your resume — Google & Amazon prioritize cloud skills.", color: "#7C3AED" },
  { icon: "🎯", text: "Solve 3 LeetCode medium problems today to maintain your DSA streak.", color: "#06B6D4" },
  { icon: "⚡", text: "Your Resume Score can reach 92% by adding quantified project impacts.", color: "#22C55E" },
  { icon: "🔑", text: "Missing keywords for Microsoft: Azure, TypeScript, Microservices.", color: "#F59E0B" },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />
      <main className="ml-64 flex-1 p-6 min-w-0">
        <Navbar />

        {/* ── Welcome banner ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl p-6 mb-7 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(109,40,217,0.12) 50%, rgba(6,182,212,0.06) 100%)",
            border: "1px solid rgba(124,58,237,0.28)",
          }}
        >
          {/* Orbs */}
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle,#7C3AED,transparent)" }} />
          <div className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: "linear-gradient(90deg,transparent,rgba(124,58,237,0.6),rgba(6,182,212,0.4),transparent)" }} />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.30)", color: "#A78BFA" }}>
                  ✨ AI Career Platform
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                Welcome back, <span className="gradient-text">Meghana! 👋</span>
              </h2>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Resume score improved by{" "}
                <span style={{ color: "var(--color-green-text)", fontWeight: 600 }}>+5%</span>{" "}
                this week. You're <strong style={{ color: "#A78BFA" }}>82%</strong> placement ready.
              </p>
              <div className="flex flex-wrap gap-4 mt-3">
                {[
                  { label: "Resume Score", value: "85%", color: "#A78BFA" },
                  { label: "Skills Matched", value: "18/25", color: "#4ADE80" },
                  { label: "Interviews Done", value: "12", color: "#FCD34D" },
                  { label: "Learning Streak", value: "7d 🔥", color: "#F97316" },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-1.5">
                    <span className="text-base font-black" style={{ color: s.color }}>{s.value}</span>
                    <span className="text-xs" style={{ color: "var(--text-faint)" }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <NavLink to="/resume">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)", boxShadow: "0 8px 20px rgba(124,58,237,0.38)" }}>
                  🚀 Start Analysis
                </motion.button>
              </NavLink>
              <NavLink to="/ai-resume-builder">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)", color: "var(--text-secondary)" }}>
                  ✍️ Build Resume
                </motion.button>
              </NavLink>
            </div>
          </div>
        </motion.div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">
          {STATS.map((s) => (
            <StatCard key={s.title} {...s}
              icon={
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              }
            />
          ))}
        </div>

        {/* ── Main content grid ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">

          {/* Left 2/3: Quick Actions + Activity */}
          <div className="xl:col-span-2 space-y-5">

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
              className="theme-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>Quick Actions</h3>
                <span className="text-xs px-2.5 py-1 rounded-lg font-medium"
                  style={{ background: "rgba(124,58,237,0.10)", color: "#A78BFA" }}>
                  6 shortcuts
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {QUICK_ACTIONS.map(a => <QuickAction key={a.label} {...a} />)}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.33 }}
              className="theme-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>Recent Activity</h3>
                <span className="text-xs px-2.5 py-1 rounded-lg font-medium"
                  style={{ background: "rgba(124,58,237,0.10)", color: "#A78BFA" }}>
                  This Week
                </span>
              </div>
              {ACTIVITIES.map((a, i) => (
                <ActivityItem key={i} {...a} delay={0.35 + i * 0.06} />
              ))}
            </motion.div>

          </div>

          {/* Right 1/3: AI Suggestions + Skill Snapshot */}
          <div className="space-y-5">

            {/* AI Suggestions */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.30 }}
              className="rounded-2xl p-5"
              style={{
                background: "linear-gradient(135deg,rgba(124,58,237,0.13),rgba(109,40,217,0.08))",
                border: "1px solid rgba(124,58,237,0.24)",
              }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-base">✨</span>
                <h3 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>AI Suggestions</h3>
              </div>
              <div className="space-y-3">
                {AI_SUGGESTIONS.map((s, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.07 }}
                    className="flex items-start gap-2.5 p-3 rounded-xl"
                    style={{ background: `${s.color}0a`, border: `1px solid ${s.color}20` }}>
                    <span className="text-base flex-shrink-0">{s.icon}</span>
                    <span className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{s.text}</span>
                  </motion.div>
                ))}
              </div>
              <NavLink to="/analysis">
                <button className="mt-4 w-full py-2 rounded-xl text-xs font-semibold text-white hover:opacity-85 transition-opacity"
                  style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)" }}>
                  View Full AI Report →
                </button>
              </NavLink>
            </motion.div>

            {/* Skill snapshot */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.36 }}
              className="theme-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>Skill Snapshot</h3>
                <NavLink to="/analytics" className="text-xs font-semibold hover:opacity-75 transition-opacity"
                  style={{ color: "#A78BFA" }}>
                  See All →
                </NavLink>
              </div>
              <div className="space-y-3.5">
                {SKILLS.map((s, i) => (
                  <SkillBar key={s.name} {...s} delay={i * 80} />
                ))}
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── Placement Readiness ring row ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}
          className="theme-card rounded-2xl p-5"
          style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.10),rgba(109,40,217,0.07))" }}>
          <div className="flex items-center gap-2 mb-5">
            <h3 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>Placement Readiness</h3>
            <span className="text-xs px-2.5 py-1 rounded-lg font-medium"
              style={{ background: "rgba(124,58,237,0.12)", color: "#A78BFA" }}>Overall 82%</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: "Technical Skills", value: 85, color: "#7C3AED" },
              { label: "Communication",    value: 70, color: "#06B6D4" },
              { label: "Problem Solving",  value: 90, color: "#22C55E" },
              { label: "DSA Proficiency",  value: 65, color: "#F59E0B" },
            ].map(item => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <div className="relative">
                  <ProgressRing value={item.value} size={88} stroke={7} color={item.color} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-black" style={{ color: "var(--text-primary)" }}>{item.value}%</span>
                  </div>
                </div>
                <p className="text-xs font-medium text-center" style={{ color: "var(--text-muted)" }}>{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </main>
    </div>
  );
}
