import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Welcome from "../components/Welcome";
import StatCard from "../components/StatCard";
import {
  FaFileAlt, FaBriefcase, FaCode, FaCheckCircle,
  FaRobot, FaChartLine, FaTrophy,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export function PageLayout({ children }) {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />
      <main className="ml-64 flex-1 p-6 min-w-0">{children}</main>
    </div>
  );
}

const recentActivities = [
  { icon: FaFileAlt,    color: "#6366f1", label: "Resume uploaded",                time: "2 hours ago" },
  { icon: FaRobot,      color: "#8b5cf6", label: "AI Analysis completed",          time: "3 hours ago" },
  { icon: FaChartLine,  color: "#06b6d4", label: "ATS Score improved to 91%",      time: "Yesterday"   },
  { icon: FaBriefcase,  color: "#10b981", label: "Google company profile viewed",  time: "2 days ago"  },
];

function Dashboard() {
  return (
    <PageLayout>
      <Navbar />
      <Welcome />

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <StatCard title="Resume Score"      value="85%"   icon={<FaFileAlt />}    change="+5%"      positive={true}  color="#6366f1" />
        <StatCard title="Company Readiness" value="78%"   icon={<FaBriefcase />}  change="+8%"      positive={true}  color="#10b981" />
        <StatCard title="Skills Matched"    value="18/25" icon={<FaCode />}       change="+3 Skills" positive={true}  color="#f59e0b" />
        <StatCard title="Pending Skills"    value="7"     icon={<FaCheckCircle />}change="-2 Skills" positive={false} color="#ef4444" />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Recent Activity */}
        <div className="xl:col-span-2 theme-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
              Recent Activity
            </h3>
            <span className="text-xs px-2.5 py-1 rounded-lg font-medium"
              style={{ background: "rgba(99,102,241,0.10)", color: "var(--color-indigo-text)" }}>
              This Week
            </span>
          </div>
          <div className="space-y-4">
            {recentActivities.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${a.color}1a`, color: a.color }}>
                    <Icon className="text-sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "var(--text-secondary)" }}>{a.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{a.time}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: a.color }} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Readiness card */}
        <div className="theme-card rounded-2xl p-6 flex flex-col"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))",
          }}>
          <div className="flex items-center gap-2 mb-4">
            <FaTrophy style={{ color: "var(--color-yellow-text)" }} />
            <h3 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
              Placement Readiness
            </h3>
          </div>

          {/* Circular gauge */}
          <div className="flex items-center justify-center my-4">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border-default)" strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="url(#rdGrad)" strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 50 * 0.82} ${2 * Math.PI * 50}`}
                  strokeLinecap="round" />
                <defs>
                  <linearGradient id="rdGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>82%</span>
                <span className="text-xs" style={{ color: "var(--text-faint)" }}>Ready</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 mt-2">
            {[
              { label: "Technical Skills", v: 85, color: "#6366f1" },
              { label: "Communication",    v: 70, color: "#8b5cf6" },
              { label: "Problem Solving",  v: 90, color: "#06b6d4" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>{item.label}</span>
                  <span className="text-xs font-semibold" style={{ color: item.color }}>{item.v}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ background: "var(--border-subtle)" }}>
                  <div className="h-1.5 rounded-full progress-bar"
                    style={{ width: `${item.v}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>

          <NavLink to="/mock-interview" className="mt-5 block">
            <button className="w-full py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-85 transition-opacity"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              Start Mock Interview
            </button>
          </NavLink>
        </div>
      </div>
    </PageLayout>
  );
}

export default Dashboard;
