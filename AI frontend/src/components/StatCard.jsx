import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { motion } from "framer-motion";

export default function StatCard({ title, value, icon, change, positive = true, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative rounded-2xl p-6 overflow-hidden card-hover cursor-default theme-card"
    >
      {/* top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${color}66, transparent)` }}
      />
      {/* faint bg orb */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 blur-2xl pointer-events-none"
        style={{ background: color }}
      />

      <div className="relative z-10 flex justify-between items-start">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider mb-2"
            style={{ color: "var(--text-faint)" }}>
            {title}
          </p>
          <h2 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            {value}
          </h2>
        </div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: `${color}1a`, border: `1px solid ${color}33`, color }}
        >
          {icon}
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-2 mt-4">
        <div
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold"
          style={{
            background: positive ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)",
            color:      positive ? "var(--color-green-text)" : "var(--color-red-text)",
          }}
        >
          {positive
            ? <FaArrowUp   className="text-[10px]" />
            : <FaArrowDown className="text-[10px]" />
          }
          {change}
        </div>
        <span className="text-xs" style={{ color: "var(--text-faint)" }}>
          vs last month
        </span>
      </div>
    </motion.div>
  );
}
