import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes, FaExternalLinkAlt, FaMapMarkerAlt, FaUsers,
  FaCalendarAlt, FaGlobe, FaLaptopCode, FaHeart,
  FaStar, FaLightbulb, FaCheckCircle, FaQuestionCircle,
  FaRocket, FaMoneyBillWave, FaBriefcase,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

/* ── Colour map per company type ── */
const TYPE_COLOR = {
  Product: { bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.30)", text: "var(--color-indigo-text)" },
  Service: { bg: "rgba(6,182,212,0.12)",  border: "rgba(6,182,212,0.30)",  text: "var(--color-cyan-text)"   },
  Startup: { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.30)", text: "var(--color-yellow-text)" },
};

/* ── Reusable section wrapper ── */
function Section({ icon: Icon, color, title, children }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}18`, color }}>
          <Icon style={{ fontSize: "12px" }} />
        </div>
        <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

/* ── Star rating display ── */
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map((s) => (
        <FaStar key={s} style={{
          fontSize: "12px",
          color: s <= Math.round(rating) ? "#fbbf24" : "var(--border-default)",
        }} />
      ))}
      <span className="text-sm font-bold ml-1" style={{ color: "#fbbf24" }}>{rating}</span>
    </div>
  );
}

function CompanyDetailsModal({ company, onClose }) {
  const overlayRef = useRef(null);
  const tc = TYPE_COLOR[company.type] || TYPE_COLOR.Product;

  /* Close on Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  /* Close on backdrop click */
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <AnimatePresence>
      {/* ── Backdrop ── */}
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleOverlayClick}
        className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4"
        style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
      >
        {/* ── Modal panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{    opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.28, ease: [0.22,1,0.36,1] }}
          className="relative w-full max-w-3xl rounded-3xl overflow-hidden"
          style={{
            background:  "var(--bg-card-solid)",
            border:      "1px solid var(--border-default)",
            boxShadow:   "0 32px 80px rgba(0,0,0,0.40)",
          }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={`${company.name} details`}
        >
          {/* ── Top gradient bar ── */}
          <div className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)" }} />

          {/* ── Hero header ── */}
          <div className="relative px-7 pt-8 pb-6"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.05))",
              borderBottom: "1px solid var(--border-default)",
            }}>
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:opacity-80"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)", color: "var(--text-faint)" }}
            >
              <FaTimes style={{ fontSize: "12px" }} />
            </button>

            <div className="flex items-start gap-5">
              {/* Logo */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden p-1.5"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}>
                <img src={company.logo} alt={company.name}
                  className="w-full h-full object-contain"
                  onError={(e) => { e.target.style.display = "none"; }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                    {company.name}
                  </h2>
                  {/* Type badge */}
                  <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold"
                    style={{ background: tc.bg, border: `1px solid ${tc.border}`, color: tc.text }}>
                    {company.type}
                  </span>
                </div>

                <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>{company.industry}</p>

                {/* Quick-facts row */}
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: FaCalendarAlt, val: `Est. ${company.founded}`,  color: "#818cf8" },
                    { icon: FaMapMarkerAlt,val: company.hq,                 color: "#f87171" },
                    { icon: FaUsers,       val: company.employees,          color: "#34d399" },
                    { icon: FaLaptopCode,  val: company.workMode,           color: "#fbbf24" },
                  ].map((f) => {
                    const Icon = f.icon;
                    return (
                      <div key={f.val} className="flex items-center gap-1.5 text-xs"
                        style={{ color: "var(--text-muted)" }}>
                        <Icon style={{ fontSize: "10px", color: f.color }} />
                        {f.val}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Rating + salary */}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: "var(--text-faint)" }}>Rating</span>
                <StarRating rating={company.rating} />
              </div>
              <div className="flex items-center gap-2 text-xs">
                <FaMoneyBillWave style={{ color: "var(--color-green-text)", fontSize: "11px" }} />
                <span style={{ color: "var(--color-green-text)", fontWeight: 600 }}>{company.salary}</span>
              </div>
            </div>
          </div>

          {/* ── Scrollable body ── */}
          <div className="overflow-y-auto px-7 py-6" style={{ maxHeight: "65vh" }}>

            {/* About */}
            <Section icon={FaGlobe} color="#818cf8" title="About the Company">
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {company.description}
              </p>
            </Section>

            {/* Popular Roles */}
            <Section icon={FaBriefcase} color="#34d399" title="Popular Job Roles">
              <div className="flex flex-wrap gap-2">
                {company.roles.map((r) => (
                  <span key={r} className="tag-green text-xs">{r}</span>
                ))}
              </div>
            </Section>

            {/* Technical Skills */}
            <Section icon={FaLaptopCode} color="#22d3ee" title="Required Technical Skills">
              <div className="flex flex-wrap gap-2">
                {company.techSkills.map((s) => (
                  <span key={s} className="tag-indigo text-xs">{s}</span>
                ))}
              </div>
            </Section>

            {/* Soft Skills */}
            <Section icon={FaHeart} color="#f472b6" title="Required Soft Skills">
              <div className="flex flex-wrap gap-2">
                {company.softSkills.map((s) => (
                  <span key={s} className="tag-yellow text-xs">{s}</span>
                ))}
              </div>
            </Section>

            {/* Eligibility */}
            <Section icon={FaCheckCircle} color="#34d399" title="Eligibility Criteria">
              <div className="rounded-xl p-4 text-sm" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)", color: "var(--text-muted)" }}>
                {company.eligibility}
              </div>
            </Section>

            {/* Hiring Process */}
            <Section icon={FaRocket} color="#6366f1" title="Hiring Process">
              <div className="rounded-xl p-4 text-sm" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)", color: "var(--text-muted)" }}>
                {company.hiringProcess}
              </div>
            </Section>

            {/* Interview Rounds */}
            <Section icon={FaStar} color="#fbbf24" title="Interview Rounds">
              <div className="space-y-2">
                {company.interviewRounds.map((round, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                      style={{ background: "rgba(99,102,241,0.15)", color: "var(--color-indigo-text)" }}>
                      {i + 1}
                    </span>
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{round}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* FAQs */}
            <Section icon={FaQuestionCircle} color="#a78bfa" title="Frequently Asked Interview Questions">
              <div className="space-y-2">
                {company.faqs.map((q, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ background: "rgba(99,102,241,0.06)", border: "1px solid var(--border-default)" }}>
                    <span className="text-xs font-bold flex-shrink-0 mt-0.5" style={{ color: "var(--color-indigo-text)" }}>
                      Q{i + 1}.
                    </span>
                    <span className="text-sm" style={{ color: "var(--text-muted)" }}>{q}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Preparation Tips */}
            <Section icon={FaLightbulb} color="#fbbf24" title="Preparation Tips">
              <div className="space-y-2">
                {company.prepTips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "#fbbf24" }} />
                    <span className="text-sm" style={{ color: "var(--text-muted)" }}>{tip}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Benefits */}
            <Section icon={FaHeart} color="#34d399" title="Benefits & Perks">
              <div className="flex flex-wrap gap-2">
                {company.benefits.map((b) => (
                  <span key={b} className="tag-green text-xs">{b}</span>
                ))}
              </div>
            </Section>

            {/* Culture + Career Growth */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="rounded-xl p-4" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-faint)" }}>Culture</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{company.culture}</p>
              </div>
              <div className="rounded-xl p-4" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)" }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-faint)" }}>Career Growth</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{company.careerGrowth}</p>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={company.careers} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white hover:opacity-85 transition-opacity"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                <FaRocket style={{ fontSize: "12px" }} />Apply / Visit Careers
              </a>
              <a href={company.website} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold hover:opacity-85 transition-opacity"
                style={{ background: "var(--bg-surface)", border: "1px solid var(--border-default)", color: "var(--text-muted)" }}>
                <FaExternalLinkAlt style={{ fontSize: "11px" }} />Official Website
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default CompanyDetailsModal;
