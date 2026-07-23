import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaListAlt } from "react-icons/fa";

const skills = [
  "DSA","React","Node.js","Python","SQL","Git",
  "Docker","AWS","OOP","DBMS","Operating System","Computer Networks",
];

function RequiredSkills() {
  const [barWidth, setBarWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setBarWidth(72), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="theme-card rounded-2xl p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(6,182,212,0.12)", color: "var(--color-cyan-text)" }}>
          <FaListAlt className="text-sm" />
        </div>
        <div>
          <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>Required Skills</h2>
          <p className="text-xs" style={{ color: "var(--text-faint)" }}>Google · Software Engineer</p>
        </div>
      </div>

      {/* Skill match bar */}
      <div className="rounded-xl p-4 my-5"
        style={{ background: "rgba(99,102,241,0.07)", border: "1px solid var(--border-default)" }}>
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Skill Match</span>
          <span className="text-xl font-bold" style={{ color: "var(--color-indigo-text)" }}>72%</span>
        </div>
        <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
          <div className="h-2.5 rounded-full"
            style={{
              width: `${barWidth}%`,
              background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
              transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
            }} />
        </div>
        <p className="text-xs mt-2" style={{ color: "var(--text-faint)" }}>You match 9 of 12 required skills</p>
      </div>

      {/* Skills */}
      <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-faint)" }}>
        All Required Skills
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            className="tag-indigo"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default RequiredSkills;
