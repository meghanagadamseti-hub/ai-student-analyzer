import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FaUser, FaBell, FaLock, FaPalette, FaBriefcase, FaSave, FaShieldAlt } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

function SectionHeader({ icon: Icon, color, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
        style={{ background: `${color}1a`, color }}>
        <Icon className="text-sm" />
      </div>
      <div>
        <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>{title}</h2>
        {subtitle && <p className="text-xs" style={{ color: "var(--text-faint)" }}>{subtitle}</p>}
      </div>
    </div>
  );
}

function Toggle({ label, defaultChecked = false }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{label}</span>
      <button onClick={() => setOn(!on)}
        className="relative w-10 h-5 rounded-full flex-shrink-0"
        style={{ background: on ? "#7C3AED" : "var(--border-default)", transition: "background 0.3s ease" }}>
        <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
          style={{ left: on ? "calc(100% - 18px)" : "2px", transition: "left 0.3s ease" }} />
      </button>
    </div>
  );
}

function Settings() {
  const { preference, setTheme } = useTheme();

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />
      <main className="ml-64 flex-1 p-6 min-w-0">
        <Navbar />

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-7">
          <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>Settings</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-faint)" }}>Manage your account, preferences, notifications and security.</p>
        </motion.div>

        <div className="space-y-5">

          {/* Profile */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}
            className="theme-card rounded-2xl p-6">
            <SectionHeader icon={FaUser} color="#7C3AED" title="Account Information" subtitle="Your personal information" />
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Full Name</label>
                <input className="input-dark w-full" placeholder="Full Name"  defaultValue="Meghana"          readOnly />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Email</label>
                <input className="input-dark w-full" placeholder="Email"      defaultValue="meghana@gmail.com" readOnly />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>University</label>
                <input className="input-dark w-full" placeholder="University" defaultValue="Vignan University" readOnly />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Department</label>
                <input className="input-dark w-full" placeholder="Department" defaultValue="Computer Science"  readOnly />
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
            className="theme-card rounded-2xl p-6">
            <SectionHeader icon={FaBell} color="#f59e0b" title="Notifications" subtitle="Control what you receive" />
            <div className="rounded-xl px-4 divide-y" style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
              <Toggle label="Resume Analysis Updates"  defaultChecked={true}  />
              <Toggle label="Learning Reminders"       defaultChecked={true}  />
              <Toggle label="Mock Interview Reminders" defaultChecked={true}  />
              <Toggle label="Company Updates"          defaultChecked={false} />
            </div>
          </motion.div>

          {/* Appearance */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.17 }}
            className="theme-card rounded-2xl p-6">
            <SectionHeader icon={FaPalette} color="#f472b6" title="Appearance" subtitle="Theme preference" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Theme</label>
                <select
                  className="select-dark w-full"
                  value={preference}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="dark">🌙 Dark Mode</option>
                  <option value="light">☀️ Light Mode</option>
                  <option value="system">💻 System Default</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Career Preferences */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
            className="theme-card rounded-2xl p-6">
            <SectionHeader icon={FaBriefcase} color="#10b981" title="Career Preferences" subtitle="Target role & location" />
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Target Role</label>
                <select className="select-dark w-full">
                  <option>Software Engineer</option><option>Frontend Developer</option>
                  <option>Backend Developer</option><option>Full Stack Developer</option>
                  <option>Data Analyst</option><option>AI Engineer</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Company Type</label>
                <select className="select-dark w-full">
                  <option>Product Based</option><option>Service Based</option><option>Startup</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Preferred Location</label>
                <select className="select-dark w-full">
                  <option>Bangalore</option><option>Hyderabad</option><option>Pune</option>
                  <option>Chennai</option><option>Remote</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>Experience</label>
                <select className="select-dark w-full">
                  <option>Fresher</option><option>Internship</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Security */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.27 }}
            className="theme-card rounded-2xl p-6">
            <SectionHeader icon={FaShieldAlt} color="#ef4444" title="Security" subtitle="Password & account protection" />
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-85 transition-opacity"
                style={{ background: "rgba(99,102,241,0.10)", border: "1px solid var(--border-input)", color: "var(--color-indigo-text)" }}>
                <FaLock className="text-xs" />Change Password
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-85 transition-opacity"
                style={{ background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.22)", color: "var(--color-green-text)" }}>
                <FaShieldAlt className="text-xs" />Enable 2FA
              </button>
            </div>
          </motion.div>

          {/* Save */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
            className="flex justify-end pb-4">
            <button className="flex items-center gap-2.5 px-7 py-3 rounded-xl text-sm font-semibold text-white hover:opacity-85 hover:-translate-y-0.5 transition-all"
              style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)", boxShadow: "0 8px 20px rgba(99,102,241,0.30)" }}>
              <FaSave className="text-xs" />Save Settings
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default Settings;
