/* ═══════════════════════════════════════════════════════════════
   Learning.jsx  — Fully dynamic Learning page
   Fetches: GET /learning  (falls back gracefully when offline)
   Sections:
     1. Welcome Card
     2. Recommended Skills
     3. Learning Roadmap Timeline
     4. Skill Progress
     5. Daily Challenge
     6. Recommended Resources
     7. AI Suggestions
═══════════════════════════════════════════════════════════════ */
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar  from "../components/Navbar";
import { useLearning } from "../hooks/useLearning";
import {
  FaGraduationCap, FaLaptopCode, FaBookOpen, FaLightbulb,
  FaFire, FaCheckCircle, FaClock, FaExternalLinkAlt,
  FaYoutube, FaBook, FaCode, FaSyncAlt, FaRocket,
  FaBrain, FaChartLine, FaCalendarAlt, FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────── */
const DIFFICULTY_STYLE = {
  Easy:   { color: "#34d399", bg: "rgba(16,185,129,0.10)",  border: "rgba(16,185,129,0.25)"  },
  Medium: { color: "#fbbf24", bg: "rgba(245,158,11,0.10)",  border: "rgba(245,158,11,0.25)"  },
  Hard:   { color: "#f87171", bg: "rgba(239,68,68,0.10)",   border: "rgba(239,68,68,0.25)"   },
};

const ROADMAP_STATUS = {
  completed:   { color: "#34d399", bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.30)",  label: "Done"        },
  in_progress: { color: "#818cf8", bg: "rgba(99,102,241,0.15)",  border: "rgba(99,102,241,0.35)",  label: "In Progress" },
  upcoming:    { color: "#64748b", bg: "rgba(100,116,139,0.08)", border: "rgba(100,116,139,0.20)", label: "Upcoming"    },
};

/* ─────────────────────────────────────────────────────────────
   SKELETON — reusable shimmer block
───────────────────────────────────────────────────────────── */
function Skeleton({ className = "", style = {} }) {
  return (
    <div
      className={`shimmer rounded-xl ${className}`}
      style={{ background: "var(--border-subtle)", ...style }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION HEADER — reusable
───────────────────────────────────────────────────────────── */
function SectionHeader({ icon: Icon, color, title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}18`, color }}
        >
          <Icon style={{ fontSize: "14px" }} />
        </div>
        <div>
          <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ANIMATED PROGRESS BAR
───────────────────────────────────────────────────────────── */
function AnimatedBar({ value, color, height = "h-2", delay = 0 }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(value), 300 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return (
    <div className={`w-full ${height} rounded-full overflow-hidden`}
      style={{ background: "var(--border-subtle)" }}>
      <div
        className={`${height} rounded-full`}
        style={{
          width: `${w}%`,
          background: color,
          transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION 1 — Welcome Card
───────────────────────────────────────────────────────────── */
function WelcomeCard({ overallProgress, usingFallback, onRefresh, loading }) {
  const [barW, setBarW] = useState(0);
  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => setBarW(overallProgress), 400);
      return () => clearTimeout(t);
    }
  }, [overallProgress, loading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl p-6 mb-6 overflow-hidden"
      style={{
        background: "linear-gradient(135deg,rgba(99,102,241,0.16),rgba(139,92,246,0.10),rgba(6,182,212,0.06))",
        border: "1px solid var(--border-strong)",
      }}
    >
      {/* Bg orbs */}
      <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle,#6366f1,transparent)" }} />
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.55),rgba(139,92,246,0.55),transparent)" }} />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <HiSparkles style={{ color: "var(--color-yellow-text)", fontSize: "13px" }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
              Personalised Learning Path
            </span>
            {usingFallback && (
              <span className="text-[10px] px-2 py-0.5 rounded-lg font-medium"
                style={{ background: "rgba(245,158,11,0.12)", color: "var(--color-yellow-text)", border: "1px solid rgba(245,158,11,0.25)" }}>
                Offline Mode
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
            Welcome Back, <span className="gradient-text">Meghana! 👋</span>
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            You're{" "}
            <span style={{ color: "var(--color-indigo-text)", fontWeight: 600 }}>
              {overallProgress}%
            </span>{" "}
            through your learning roadmap. Keep the momentum going!
          </p>

          {/* Overall progress bar */}
          <div className="mt-4 max-w-sm">
            <div className="flex justify-between mb-1.5">
              <span className="text-xs" style={{ color: "var(--text-faint)" }}>Overall Progress</span>
              <span className="text-xs font-bold" style={{ color: "var(--color-indigo-text)" }}>{overallProgress}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
              <div className="h-2.5 rounded-full"
                style={{
                  width: `${barW}%`,
                  background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
                  transition: "width 1.4s cubic-bezier(0.4,0,0.2,1)",
                }} />
            </div>
          </div>
        </div>

        {/* Right — quick stats */}
        <div className="flex gap-3 flex-shrink-0">
          {[
            { label: "Week",     value: "3",   color: "#818cf8" },
            { label: "Streak",   value: "7d",  color: "#fbbf24" },
            { label: "Courses",  value: "4",   color: "#34d399" },
          ].map((s) => (
            <div key={s.label}
              className="flex flex-col items-center justify-center w-16 h-16 rounded-xl"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)" }}>
              <span className="text-lg font-black" style={{ color: s.color }}>{s.value}</span>
              <span className="text-[10px] font-medium mt-0.5" style={{ color: "var(--text-faint)" }}>{s.label}</span>
            </div>
          ))}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="w-10 h-10 rounded-xl flex items-center justify-center self-start mt-1 hover:opacity-80 transition-opacity disabled:opacity-40"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-default)", color: "var(--text-faint)" }}
            title="Refresh learning data"
          >
            <FaSyncAlt style={{ fontSize: "11px" }} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Welcome skeleton ── */
function WelcomeSkeleton() {
  return (
    <div className="theme-card rounded-2xl p-6 mb-6 space-y-4">
      <div className="flex gap-3"><Skeleton className="h-4 w-32" /><Skeleton className="h-4 w-20" /></div>
      <Skeleton className="h-7 w-64" />
      <Skeleton className="h-4 w-80" />
      <Skeleton className="h-2.5 w-64 rounded-full" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION 2 — Recommended Skills
───────────────────────────────────────────────────────────── */
const SKILL_COLORS = [
  "#818cf8","#34d399","#fbbf24","#f87171",
  "#22d3ee","#a78bfa","#fb923c","#e879f9",
];

function RecommendedSkills({ skills }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="theme-card rounded-2xl p-5"
    >
      <SectionHeader
        icon={FaRocket}
        color="#6366f1"
        title="Recommended Skills"
        subtitle="Focus on these to improve your placement readiness"
      />
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => {
          const color = SKILL_COLORS[i % SKILL_COLORS.length];
          return (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold cursor-default
                         transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: `${color}15`,
                border:     `1px solid ${color}35`,
                color,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: color, boxShadow: `0 0 6px ${color}88` }} />
              {skill}
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
}

function RecommendedSkillsSkeleton() {
  return (
    <div className="theme-card rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-3"><Skeleton className="w-9 h-9 rounded-xl" /><Skeleton className="h-4 w-40" /></div>
      <div className="flex flex-wrap gap-2">
        {[80,100,70,90,75,110,85].map((w, i) => (
          <Skeleton key={i} className="h-9 rounded-xl" style={{ width: w }} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION 3 — Learning Roadmap Timeline
───────────────────────────────────────────────────────────── */
function RoadmapTimeline({ roadmap }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 }}
      className="theme-card rounded-2xl p-5"
    >
      <SectionHeader
        icon={FaCalendarAlt}
        color="#8b5cf6"
        title="Learning Roadmap"
        subtitle="Your week-by-week study plan"
      />

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 rounded-full"
          style={{ background: "var(--border-default)" }} />

        <div className="space-y-1 pl-10">
          {roadmap.map((item, i) => {
            const st     = ROADMAP_STATUS[item.status] || ROADMAP_STATUS.upcoming;
            const isOpen = expanded === i;
            return (
              <motion.div
                key={item.week}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.14 + i * 0.05 }}
              >
                {/* Week dot on the line */}
                <div
                  className="absolute flex items-center justify-center rounded-full border-2 text-[9px] font-black"
                  style={{
                    left: 0,
                    top: `${i * 60 + 8}px`,
                    width: 32,
                    height: 32,
                    background:  st.bg,
                    borderColor: st.border,
                    color:       st.color,
                  }}
                >
                  {item.status === "completed" ? "✓" : `W${item.week}`}
                </div>

                {/* Card */}
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="w-full text-left mb-2 p-3 rounded-xl transition-all duration-200"
                  style={{
                    background: isOpen ? st.bg : "var(--bg-surface)",
                    border:     `1px solid ${isOpen ? st.border : "var(--border-default)"}`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                        Week {item.week}: {item.title}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg"
                        style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}` }}>
                        {st.label}
                      </span>
                    </div>
                    <span className="text-xs" style={{ color: "var(--text-faint)" }}>
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </div>

                  <AnimatePresence>
                    {isOpen && item.description && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs mt-2 overflow-hidden"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {item.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function RoadmapSkeleton() {
  return (
    <div className="theme-card rounded-2xl p-5 space-y-3">
      <div className="flex items-center gap-3"><Skeleton className="w-9 h-9 rounded-xl" /><Skeleton className="h-4 w-44" /></div>
      {[1,2,3,4,5].map((i) => <Skeleton key={i} className="h-12 rounded-xl" />)}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION 4 — Skill Progress
───────────────────────────────────────────────────────────── */
function SkillProgress({ skills }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="theme-card rounded-2xl p-5"
    >
      <SectionHeader
        icon={FaChartLine}
        color="#34d399"
        title="Skill Progress"
        subtitle="Your proficiency across key technologies"
      />
      <div className="space-y-4">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.17 + i * 0.06 }}
          >
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: skill.color }} />
                <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                  {skill.name}
                </span>
              </div>
              <span className="text-xs font-bold" style={{ color: skill.color }}>
                {skill.progress}%
              </span>
            </div>
            <AnimatedBar value={skill.progress} color={skill.color} delay={i * 80} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function SkillProgressSkeleton() {
  return (
    <div className="theme-card rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-3"><Skeleton className="w-9 h-9 rounded-xl" /><Skeleton className="h-4 w-36" /></div>
      {[1,2,3,4,5,6].map((i) => (
        <div key={i} className="space-y-1.5">
          <div className="flex justify-between"><Skeleton className="h-3 w-24" /><Skeleton className="h-3 w-8" /></div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION 5 — Daily Challenge
───────────────────────────────────────────────────────────── */
function DailyChallenge({ challenge }) {
  const [showHint, setShowHint] = useState(false);
  const ds = DIFFICULTY_STYLE[challenge.difficulty] || DIFFICULTY_STYLE.Medium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18 }}
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg,rgba(99,102,241,0.14),rgba(139,92,246,0.09))",
        border: "1px solid var(--border-strong)",
      }}
    >
      {/* Bg glow */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 blur-2xl pointer-events-none"
        style={{ background: "radial-gradient(circle,#6366f1,transparent)" }} />
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.5),transparent)" }} />

      <div className="relative z-10">
        <SectionHeader
          icon={FaFire}
          color="#f87171"
          title="Daily Challenge"
          subtitle="New challenge every day — keep your streak alive!"
          action={
            <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg"
              style={{ background: "rgba(251,191,36,0.12)", color: "var(--color-yellow-text)", border: "1px solid rgba(251,191,36,0.25)" }}>
              🔥 7 day streak
            </div>
          }
        />

        {/* Title row */}
        <div className="flex flex-wrap items-start gap-3 mb-3">
          <h3 className="text-base font-bold flex-1 min-w-0" style={{ color: "var(--text-primary)" }}>
            {challenge.title}
          </h3>
          <div className="flex gap-2 flex-shrink-0">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg"
              style={{ background: ds.bg, color: ds.color, border: `1px solid ${ds.border}` }}>
              {challenge.difficulty}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg tag-indigo">
              {challenge.topic}
            </span>
          </div>
        </div>

        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          {challenge.description}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-faint)" }}>
            <FaClock style={{ fontSize: "10px" }} />
            {challenge.timeLimit}
          </div>
        </div>

        {/* Hint toggle */}
        <div className="mb-4">
          <button
            onClick={() => setShowHint((v) => !v)}
            className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
            style={{
              background: showHint ? "rgba(251,191,36,0.12)" : "var(--bg-card)",
              border:     "1px solid var(--border-default)",
              color:      showHint ? "var(--color-yellow-text)" : "var(--text-faint)",
            }}
          >
            <FaLightbulb style={{ fontSize: "10px" }} />
            {showHint ? "Hide Hint" : "Show Hint"}
          </button>
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2 px-3 py-2.5 rounded-xl text-xs leading-relaxed"
                  style={{
                    background: "rgba(251,191,36,0.08)",
                    border: "1px solid rgba(251,191,36,0.22)",
                    color: "var(--text-muted)",
                  }}>
                  💡 {challenge.hint}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <a
          href={challenge.practiceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-85 transition-opacity"
          style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 4px 14px rgba(99,102,241,0.30)" }}
        >
          <FaCode style={{ fontSize: "11px" }} />
          Solve Challenge
          <FaExternalLinkAlt style={{ fontSize: "9px" }} />
        </a>
      </div>
    </motion.div>
  );
}

function DailyChallengeSkeleton() {
  return (
    <div className="theme-card rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-3"><Skeleton className="w-9 h-9 rounded-xl" /><Skeleton className="h-4 w-36" /></div>
      <Skeleton className="h-5 w-56" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-9 w-36 rounded-xl" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION 6 — Recommended Resources
───────────────────────────────────────────────────────────── */
function ResourceCard({ resource, index }) {
  const [bookmarked, setBookmarked] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.06 }}
      className="rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5"
      style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl leading-none">{resource.icon || "📚"}</span>
          <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            {resource.title}
          </h3>
        </div>
        <button
          onClick={() => setBookmarked((v) => !v)}
          className="flex-shrink-0 transition-colors"
          style={{ color: bookmarked ? "var(--color-yellow-text)" : "var(--text-faint)" }}
        >
          {bookmarked ? <FaBookmark style={{ fontSize: "12px" }} /> : <FaRegBookmark style={{ fontSize: "12px" }} />}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {resource.youtube && (
          <a href={resource.youtube} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-opacity hover:opacity-75"
            style={{ background: "rgba(239,68,68,0.10)", color: "var(--color-red-text)", border: "1px solid rgba(239,68,68,0.22)" }}>
            <FaYoutube style={{ fontSize: "11px" }} />YouTube
          </a>
        )}
        {resource.documentation && (
          <a href={resource.documentation} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-opacity hover:opacity-75"
            style={{ background: "rgba(99,102,241,0.10)", color: "var(--color-indigo-text)", border: "1px solid rgba(99,102,241,0.22)" }}>
            <FaBook style={{ fontSize: "10px" }} />Docs
          </a>
        )}
        {resource.practice && (
          <a href={resource.practice} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-opacity hover:opacity-75"
            style={{ background: "rgba(16,185,129,0.10)", color: "var(--color-green-text)", border: "1px solid rgba(16,185,129,0.22)" }}>
            <FaCode style={{ fontSize: "10px" }} />Practice
          </a>
        )}
      </div>
    </motion.div>
  );
}

function ResourcesSkeleton() {
  return (
    <div className="theme-card rounded-2xl p-5 space-y-3">
      <div className="flex items-center gap-3"><Skeleton className="w-9 h-9 rounded-xl" /><Skeleton className="h-4 w-48" /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} className="rounded-xl p-4 space-y-2" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}>
            <div className="flex items-center gap-2"><Skeleton className="w-6 h-6 rounded" /><Skeleton className="h-4 w-24" /></div>
            <div className="flex gap-2"><Skeleton className="h-7 w-20 rounded-lg" /><Skeleton className="h-7 w-16 rounded-lg" /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION 7 — AI Suggestions
───────────────────────────────────────────────────────────── */
function AiSuggestions({ suggestions }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="theme-card rounded-2xl p-5"
    >
      <SectionHeader
        icon={FaBrain}
        color="#8b5cf6"
        title="AI Suggestions"
        subtitle="Personalised guidance based on your progress"
      />
      <div className="space-y-2.5">
        {suggestions.map((tip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.27 + i * 0.06 }}
            className="flex items-start gap-3 p-3.5 rounded-xl"
            style={{ background: "rgba(99,102,241,0.06)", border: "1px solid var(--border-default)" }}
          >
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
              style={{ background: "rgba(139,92,246,0.18)", color: "#a78bfa" }}>
              {i + 1}
            </span>
            <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{tip}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function AiSuggestionsSkeleton() {
  return (
    <div className="theme-card rounded-2xl p-5 space-y-3">
      <div className="flex items-center gap-3"><Skeleton className="w-9 h-9 rounded-xl" /><Skeleton className="h-4 w-40" /></div>
      {[1,2,3,4,5].map((i) => (
        <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl"
          style={{ background: "var(--bg-surface)" }}>
          <Skeleton className="w-5 h-5 rounded-full flex-shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1.5"><Skeleton className="h-3 w-full" /><Skeleton className="h-3 w-4/5" /></div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ERROR BANNER
───────────────────────────────────────────────────────────── */
function ErrorBanner({ error, onRefresh }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl mb-5 text-sm"
      style={{
        background: "rgba(245,158,11,0.08)",
        border: "1px solid rgba(245,158,11,0.25)",
        color: "var(--color-yellow-text)",
      }}
    >
      <span className="flex-shrink-0">⚠️</span>
      <span className="flex-1">
        Backend offline — showing cached data.{" "}
        <span className="opacity-70 text-xs">{error}</span>
      </span>
      <button
        onClick={onRefresh}
        className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg hover:opacity-80 transition-opacity"
        style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" }}
      >
        <FaSyncAlt style={{ fontSize: "9px" }} />Retry
      </button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Learning  — PAGE EXPORT
   Orchestrates all 7 sections with loading / error states.
═══════════════════════════════════════════════════════════════ */
export default function Learning() {
  const { data, loading, error, usingFallback, refresh } = useLearning();

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />

      <main className="ml-64 flex-1 p-6 min-w-0">
        <Navbar />

        {/* ── Page heading ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-1">
            <HiSparkles style={{ color: "var(--color-indigo-text)", fontSize: "14px" }} />
            <span className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-indigo-text)" }}>
              AI-Powered
            </span>
          </div>
          <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Learning Roadmap
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-faint)" }}>
            Personalised learning to accelerate your placement preparation.
          </p>
        </motion.div>

        {/* ── Error / offline banner ── */}
        {error && !loading && (
          <ErrorBanner error={error} onRefresh={refresh} />
        )}

        {/* ═══════ SECTION 1 — Welcome Card ═══════ */}
        {loading ? (
          <WelcomeSkeleton />
        ) : (
          <WelcomeCard
            overallProgress={data.overallProgress}
            usingFallback={usingFallback}
            onRefresh={refresh}
            loading={loading}
          />
        )}

        {/* ═══════ SECTION 2 — Recommended Skills ═══════ */}
        <div className="mb-5">
          {loading ? (
            <RecommendedSkillsSkeleton />
          ) : (
            <RecommendedSkills skills={data.recommendedSkills} />
          )}
        </div>

        {/* ═══════ SECTIONS 3 + 4 — Roadmap & Skill Progress (side by side on xl) ═══════ */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-5 mb-5">

          {/* Roadmap timeline — wider column */}
          <div className="xl:col-span-3">
            {loading ? (
              <RoadmapSkeleton />
            ) : (
              <RoadmapTimeline roadmap={data.roadmap} />
            )}
          </div>

          {/* Skill progress bars */}
          <div className="xl:col-span-2">
            {loading ? (
              <SkillProgressSkeleton />
            ) : (
              <SkillProgress skills={data.skillProgress} />
            )}
          </div>
        </div>

        {/* ═══════ SECTION 5 — Daily Challenge ═══════ */}
        <div className="mb-5">
          {loading ? (
            <DailyChallengeSkeleton />
          ) : (
            <DailyChallenge challenge={data.dailyChallenge} />
          )}
        </div>

        {/* ═══════ SECTION 6 — Recommended Resources ═══════ */}
        <div className="mb-5">
          {loading ? (
            <ResourcesSkeleton />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="theme-card rounded-2xl p-5"
            >
              <SectionHeader
                icon={FaBookOpen}
                color="#22d3ee"
                title="Recommended Resources"
                subtitle="Curated YouTube, documentation, and practice links per skill"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {data.resources.map((resource, i) => (
                  <ResourceCard key={resource.title} resource={resource} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* ═══════ SECTION 7 — AI Suggestions ═══════ */}
        <div className="mb-6">
          {loading ? (
            <AiSuggestionsSkeleton />
          ) : (
            <AiSuggestions suggestions={data.aiSuggestions} />
          )}
        </div>

      </main>
    </div>
  );
}
