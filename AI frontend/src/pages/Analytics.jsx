import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FaChartLine, FaFileAlt, FaCode, FaMicrophone, FaBookOpen, FaBullseye, FaFire } from "react-icons/fa";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, CartesianGrid,
} from "recharts";

const stats = [
  { title: "Resume Score",      value: "89%", icon: FaFileAlt,   color: "#6366f1" },
  { title: "Skills Mastered",   value: "18",  icon: FaCode,      color: "#10b981" },
  { title: "Mock Interviews",   value: "12",  icon: FaMicrophone,color: "#f59e0b" },
  { title: "Courses Completed", value: "7",   icon: FaBookOpen,  color: "#8b5cf6" },
];

const progressSkills = [
  { skill: "React",  value: 90, color: "#818cf8" },
  { skill: "Java",   value: 85, color: "#34d399" },
  { skill: "SQL",    value: 80, color: "#22d3ee" },
  { skill: "Python", value: 75, color: "#fbbf24" },
  { skill: "Docker", value: 40, color: "#a78bfa" },
  { skill: "AWS",    value: 25, color: "#fb923c" },
];

const weeklyData  = [
  { day:"Mon",hours:2},{ day:"Tue",hours:1.5},{ day:"Wed",hours:3},
  { day:"Thu",hours:2},{ day:"Fri",hours:2.5},{ day:"Sat",hours:4},{ day:"Sun",hours:3},
];
const monthlyData = [
  {month:"Mar",score:70},{month:"Apr",score:74},{month:"May",score:79},
  {month:"Jun",score:83},{month:"Jul",score:89},
];
const weeklyGoals = [
  "Complete React Advanced module","Solve 20 DSA Problems",
  "Finish Docker Basics course","Attend 2 Mock Interviews","Improve Resume Score above 90%",
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-3 py-2 text-xs"
      style={{ background: "var(--chart-tooltip-bg)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}>
      <p className="font-semibold">{label}</p>
      <p style={{ color: "var(--color-indigo-text)" }}>{payload[0].name}: <strong>{payload[0].value}</strong></p>
    </div>
  );
}

function ProgressBar({ skill, value, color, index }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(value), 300 + index * 80); return () => clearTimeout(t); }, [value, index]);
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{skill}</span>
        <span className="text-xs font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
        <div className="h-2 rounded-full"
          style={{ width: `${w}%`, background: color, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
      </div>
    </div>
  );
}

function Analytics() {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />
      <main className="ml-64 flex-1 p-6 min-w-0">
        <Navbar />

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-7">
          <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>Analytics Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-faint)" }}>Track placement preparation, resume improvement, and learning progress.</p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.title}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="theme-card rounded-2xl p-5 relative overflow-hidden"
                style={{ borderColor: `${s.color}22` }}>
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${s.color}66, transparent)` }} />
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>{s.title}</p>
                    <h2 className="text-3xl font-bold mt-2" style={{ color: "var(--text-primary)" }}>{s.value}</h2>
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${s.color}1a`, color: s.color }}>
                    <Icon className="text-base" />
                  </div>
                </div>
                <div className="mt-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-semibold"
                  style={{ background: "rgba(16,185,129,0.10)", color: "var(--color-green-text)" }}>
                  ↑ this month
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="theme-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <FaFire style={{ color: "var(--color-red-text)" }} />
              <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>Weekly Learning Hours</h2>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weeklyData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                <XAxis dataKey="day" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,0.06)" }} />
                <Bar dataKey="hours" name="Hours" fill="url(#barGrd)" radius={[6,6,0,0]} />
                <defs>
                  <linearGradient id="barGrd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="theme-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <FaChartLine style={{ color: "var(--color-green-text)" }} />
              <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>Resume Score Trend</h2>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="areaGrd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[60,100]} tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(99,102,241,0.25)" }} />
                <Area type="monotone" dataKey="score" name="Score" stroke="#6366f1" strokeWidth={2}
                  fill="url(#areaGrd)" dot={{ fill: "#6366f1", r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="theme-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <FaChartLine style={{ color: "var(--color-indigo-text)" }} />
              <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>Skill Progress</h2>
            </div>
            <div className="space-y-4">
              {progressSkills.map((item, i) => <ProgressBar key={item.skill} {...item} index={i} />)}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="theme-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <FaBullseye style={{ color: "var(--color-green-text)" }} />
              <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>Weekly Goals</h2>
            </div>
            <div className="space-y-3">
              {weeklyGoals.map((goal, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[9px] font-bold"
                    style={{ background: "rgba(99,102,241,0.15)", color: "var(--color-indigo-text)" }}>
                    {i + 1}
                  </div>
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>{goal}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default Analytics;
