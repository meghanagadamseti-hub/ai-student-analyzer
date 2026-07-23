import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  FaGraduationCap, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaFileAlt, FaCode, FaBriefcase, FaMedal, FaEdit,
  FaLinkedin, FaGithub, FaTrophy,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const skills = ["Java","Python","React","JavaScript","SQL","Git","HTML","CSS"];

const achievements = [
  { icon: FaFileAlt,  color: "#6366f1", label: "Completed React Projects"              },
  { icon: FaTrophy,   color: "#f59e0b", label: "Resume Score Above 85%"                },
  { icon: HiSparkles, color: "#10b981", label: "Completed AI Resume Analysis"          },
  { icon: FaMedal,    color: "#ef4444", label: "Started Placement Preparation Journey" },
];

const infoItems = [
  { icon: FaEnvelope,      color: "#6366f1", label: "meghana@gmail.com" },
  { icon: FaPhone,         color: "#10b981", label: "+91 XXXXX XXXXX"   },
  { icon: FaGraduationCap, color: "#06b6d4", label: "Vignan University"  },
  { icon: FaMapMarkerAlt,  color: "#ef4444", label: "Andhra Pradesh"    },
];

function Profile() {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />
      <main className="ml-64 flex-1 p-6 min-w-0">
        <Navbar />

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="relative theme-card rounded-2xl p-7 mb-6 overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.14), rgba(139,92,246,0.08))" }}>
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #6366f1, transparent)" }} />
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-7">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-bold text-white"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 0 30px rgba(99,102,241,0.35)" }}>
                M
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                style={{ background: "#34d399", borderColor: "var(--bg-base)" }} />
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>Meghana</h1>
                <span className="tag-indigo self-center">AI Candidate</span>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-faint)" }}>
                Computer Science · Vignan University · Fresher
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {infoItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-2 px-3 py-2 rounded-xl"
                      style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}>
                      <Icon style={{ color: item.color, fontSize: "11px", flexShrink: 0 }} />
                      <span className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-shrink-0">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-85 transition-opacity"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                <FaEdit className="text-xs" />Edit Profile
              </button>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold hover:opacity-85 transition-opacity"
                  style={{ background: "rgba(99,102,241,0.10)", border: "1px solid var(--border-input)", color: "var(--color-indigo-text)" }}>
                  <FaLinkedin />LinkedIn
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold hover:opacity-85 transition-opacity"
                  style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)", color: "var(--text-muted)" }}>
                  <FaGithub />GitHub
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Body grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

          {/* Resume & Career */}
          <div className="space-y-5">
            {[
              {
                icon: FaFileAlt, color: "#6366f1", title: "Resume Details",
                rows: [
                  { k: "Resume Score", v: "89%",           c: "var(--color-indigo-text)" },
                  { k: "ATS Score",    v: "91%",           c: "var(--color-green-text)"  },
                  { k: "Status",       v: "Uploaded",      c: "var(--color-yellow-text)" },
                  { k: "Last Updated", v: "17 July 2026",  c: "var(--text-muted)"        },
                ],
              },
              {
                icon: FaBriefcase, color: "#10b981", title: "Career Goal",
                rows: [
                  { k: "Target Role",         v: "Software Engineer" },
                  { k: "Preferred Company",   v: "Google"            },
                  { k: "Experience",          v: "Fresher"           },
                  { k: "Placement Readiness", v: "82%"               },
                ],
              },
            ].map((section, si) => {
              const Icon = section.icon;
              return (
                <motion.div key={section.title}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + si * 0.06 }}
                  className="theme-card rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon style={{ color: section.color }} />
                    <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>{section.title}</h2>
                  </div>
                  <div className="space-y-3">
                    {section.rows.map((r) => (
                      <div key={r.k} className="flex justify-between items-center">
                        <span className="text-xs" style={{ color: "var(--text-faint)" }}>{r.k}</span>
                        <span className="text-xs font-bold" style={{ color: r.c || "var(--text-secondary)" }}>{r.v}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Skills */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="theme-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-5">
              <FaCode style={{ color: "var(--color-yellow-text)" }} />
              <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>Technical Skills</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => <span key={s} className="tag-indigo cursor-default hover:opacity-80 transition-opacity">{s}</span>)}
            </div>
            <div className="mt-6 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
                Proficiency Overview
              </h3>
              {[
                { name: "Frontend",  v: 85, color: "#6366f1" },
                { name: "Backend",   v: 65, color: "#10b981" },
                { name: "Database",  v: 70, color: "#06b6d4" },
                { name: "DevOps",    v: 25, color: "#f59e0b" },
              ].map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{s.name}</span>
                    <span className="text-xs font-bold" style={{ color: s.color }}>{s.v}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
                    <div className="h-1.5 rounded-full progress-bar" style={{ width: `${s.v}%`, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="theme-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-5">
              <FaMedal style={{ color: "#fb923c" }} />
              <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>Achievements</h2>
            </div>
            <div className="space-y-3">
              {achievements.map((a, i) => {
                const Icon = a.icon;
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.06 }}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: `${a.color}0d`, border: `1px solid ${a.color}20` }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${a.color}15`, color: a.color }}>
                      <Icon className="text-sm" />
                    </div>
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{a.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
