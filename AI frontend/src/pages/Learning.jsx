import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FaBookOpen, FaGraduationCap, FaLaptopCode, FaCertificate, FaPlay, FaBookmark } from "react-icons/fa";

const skills = [
  { name: "HTML & CSS",    progress: 100, color: "#f87171"  },
  { name: "JavaScript",   progress: 90,  color: "#fbbf24"  },
  { name: "React",        progress: 80,  color: "#818cf8"  },
  { name: "Git & GitHub", progress: 75,  color: "#34d399"  },
  { name: "SQL",          progress: 70,  color: "#22d3ee"  },
  { name: "Docker",       progress: 30,  color: "#a78bfa"  },
  { name: "AWS",          progress: 20,  color: "#fb923c"  },
  { name: "System Design",progress: 10,  color: "#94a3b8"  },
];

const courses = [
  { title: "React — Complete Guide",   duration: "42 hrs", level: "Intermediate", progress: 65, color: "#818cf8" },
  { title: "Docker for Beginners",     duration: "18 hrs", level: "Beginner",     progress: 30, color: "#34d399" },
  { title: "AWS Cloud Practitioner",   duration: "28 hrs", level: "Beginner",     progress: 15, color: "#fbbf24" },
  { title: "System Design Basics",     duration: "22 hrs", level: "Advanced",     progress: 5,  color: "#f87171" },
];

const certifications = [
  { name: "AWS Certified Cloud Practitioner",  org: "Amazon Web Services", color: "#fbbf24" },
  { name: "Google Associate Cloud Engineer",   org: "Google Cloud",        color: "#34d399" },
  { name: "Meta Front-End Developer",          org: "Meta",                color: "#818cf8" },
];

const levelColor = { Beginner: "#34d399", Intermediate: "#818cf8", Advanced: "#f87171" };
const levelBg    = { Beginner: "rgba(16,185,129,0.10)", Intermediate: "rgba(99,102,241,0.10)", Advanced: "rgba(239,68,68,0.10)" };

function SkillBar({ name, progress, color, index }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(progress), 300 + index * 80); return () => clearTimeout(t); }, [progress, index]);
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{name}</span>
        <span className="text-xs font-bold" style={{ color }}>{progress}%</span>
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
        <div className="h-2 rounded-full" style={{ width: `${w}%`, background: color, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
      </div>
    </div>
  );
}

function Learning() {
  const [overallW, setOverallW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setOverallW(68), 400); return () => clearTimeout(t); }, []);

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />
      <main className="ml-64 flex-1 p-6 min-w-0">
        <Navbar />

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-7">
          <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>Learning Roadmap</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-faint)" }}>Personalized learning to improve your placement readiness.</p>
        </motion.div>

        {/* Overall Progress */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="theme-card rounded-2xl p-6 mb-6"
          style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(99,102,241,0.15)", color: "var(--color-indigo-text)" }}>
                <FaGraduationCap />
              </div>
              <div>
                <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>Overall Learning Progress</h2>
                <p className="text-xs" style={{ color: "var(--text-faint)" }}>Keep going — you're almost there!</p>
              </div>
            </div>
            <span className="text-3xl font-bold gradient-text">68%</span>
          </div>
          <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
            <div className="h-3 rounded-full"
              style={{ width: `${overallW}%`, background: "linear-gradient(90deg, #6366f1, #8b5cf6)", transition: "width 1.4s cubic-bezier(0.4,0,0.2,1)" }} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Skill Roadmap */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="xl:col-span-2 theme-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <FaLaptopCode style={{ color: "var(--color-green-text)" }} />
              <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>Skill Roadmap</h2>
            </div>
            <div className="space-y-4">
              {skills.map((s, i) => <SkillBar key={s.name} {...s} index={i} />)}
            </div>
          </motion.div>

          <div className="xl:col-span-3 space-y-5">
            {/* Courses */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="theme-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <FaBookOpen style={{ color: "var(--color-indigo-text)" }} />
                <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>Recommended Courses</h2>
              </div>
              <div className="space-y-3">
                {courses.map((course) => (
                  <div key={course.title} className="rounded-xl p-4"
                    style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>{course.title}</h3>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{course.duration}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg"
                          style={{ background: levelBg[course.level], color: levelColor[course.level] }}>
                          {course.level}
                        </span>
                        <button style={{ color: "var(--text-faint)" }}><FaBookmark className="text-xs" /></button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${course.progress}%`, background: course.color }} />
                      </div>
                      <span className="text-[10px] font-medium flex-shrink-0" style={{ color: "var(--text-faint)" }}>{course.progress}%</span>
                    </div>
                    <button className="mt-3 flex items-center gap-1.5 text-xs font-semibold hover:gap-2 transition-all"
                      style={{ color: course.color }}>
                      <FaPlay className="text-[9px]" />Continue Learning
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="theme-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <FaCertificate style={{ color: "var(--color-yellow-text)" }} />
                <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>Recommended Certifications</h2>
              </div>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.name} className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: `${cert.color}0d`, border: `1px solid ${cert.color}20` }}>
                    <FaCertificate style={{ color: cert.color, fontSize: "13px" }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{cert.name}</p>
                      <p className="text-xs" style={{ color: "var(--text-faint)" }}>{cert.org}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Learning;
