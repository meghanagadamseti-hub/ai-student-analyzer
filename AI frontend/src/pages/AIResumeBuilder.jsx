/**
 * AIResumeBuilder.jsx
 * Full-featured AI Resume Builder page.
 *
 * Sections:
 *   1. Template Gallery  — 8 template cards
 *   2. Resume Editor     — split-screen form + live preview
 *   3. AI Assistant Panel — floating assistant with company optimisation
 *
 * No backend wiring needed — all state is local.
 * When backend /resume-coach is called for optimise, it uses the
 * same API already implemented in services/ai_resume_coach.py.
 */
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar  from "../components/Navbar";

const API = "http://127.0.0.1:5000";

/* ── Template definitions ─────────────────────────────────── */
const TEMPLATES = [
  {
    id: "ats-pro",
    name: "ATS Professional",
    badge: "Most Popular",
    badgeColor: "#7C3AED",
    desc: "Clean, ATS-optimised layout trusted by top companies.",
    tags: ["ATS-Friendly", "Clean", "2-Column"],
    accent: "#7C3AED",
    preview: { bg: "#1E293B", header: "#7C3AED" },
  },
  {
    id: "modern",
    name: "Modern",
    badge: "Trending",
    badgeColor: "#06B6D4",
    desc: "Bold typography with a modern sidebar design.",
    tags: ["Sidebar", "Bold", "Colourful"],
    accent: "#06B6D4",
    preview: { bg: "#0F172A", header: "#06B6D4" },
  },
  {
    id: "minimal",
    name: "Minimal",
    badge: null,
    badgeColor: null,
    desc: "Single-column minimal layout — zero distractions.",
    tags: ["1-Column", "Clean", "Simple"],
    accent: "#94A3B8",
    preview: { bg: "#1E293B", header: "#94A3B8" },
  },
  {
    id: "developer",
    name: "Developer",
    badge: "New",
    badgeColor: "#22C55E",
    desc: "Code-inspired design with GitHub-style skill bars.",
    tags: ["Tech", "GitHub", "Skills"],
    accent: "#22C55E",
    preview: { bg: "#0F172A", header: "#22C55E" },
  },
  {
    id: "corporate",
    name: "Corporate",
    badge: null,
    badgeColor: null,
    desc: "Traditional corporate layout for enterprise roles.",
    tags: ["Enterprise", "Formal"],
    accent: "#3B82F6",
    preview: { bg: "#1E293B", header: "#3B82F6" },
  },
  {
    id: "student",
    name: "Student",
    badge: "Free",
    badgeColor: "#F59E0B",
    desc: "Perfect for freshers with strong education emphasis.",
    tags: ["Fresher", "Education", "Internship"],
    accent: "#F59E0B",
    preview: { bg: "#1E293B", header: "#F59E0B" },
  },
  {
    id: "creative",
    name: "Creative",
    badge: null,
    badgeColor: null,
    desc: "Eye-catching design for design and marketing roles.",
    tags: ["Creative", "Colourful", "Portfolio"],
    accent: "#EC4899",
    preview: { bg: "#0F172A", header: "#EC4899" },
  },
  {
    id: "data-scientist",
    name: "Data Scientist",
    badge: "AI Ready",
    badgeColor: "#A78BFA",
    desc: "Highlights ML skills, publications, and datasets.",
    tags: ["ML/AI", "Research", "Publications"],
    accent: "#A78BFA",
    preview: { bg: "#0F172A", header: "#A78BFA" },
  },
];

/* ── Mini template preview card ──────────────────────────── */
function TemplateCard({ tpl, selected, onSelect, onFavourite, isFav }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18 }}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        border: selected
          ? `2px solid ${tpl.accent}`
          : "1px solid var(--border-default)",
        boxShadow: selected ? `0 0 0 3px ${tpl.accent}28` : "none",
      }}
      onClick={() => onSelect(tpl.id)}
    >
      {/* Mini preview */}
      <div className="relative h-36 flex flex-col gap-1.5 p-3"
        style={{ background: tpl.preview.bg }}>
        {/* Header bar */}
        <div className="h-6 rounded-lg w-3/4" style={{ background: tpl.preview.header, opacity: 0.9 }} />
        {/* Content lines */}
        {[100, 80, 90, 70, 85].map((w, i) => (
          <div key={i} className="h-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.12)", width: `${w}%` }} />
        ))}
        {/* Badge */}
        {tpl.badge && (
          <span className="absolute top-2.5 right-2.5 text-[9px] font-bold px-2 py-0.5 rounded-md text-white"
            style={{ background: tpl.badgeColor }}>
            {tpl.badge}
          </span>
        )}
        {/* Favourite */}
        <button
          onClick={e => { e.stopPropagation(); onFavourite(tpl.id); }}
          className="absolute bottom-2.5 right-2.5 w-6 h-6 rounded-lg flex items-center justify-center transition-all hover:scale-110"
          style={{ background: isFav ? `${tpl.accent}30` : "rgba(255,255,255,0.08)", color: isFav ? tpl.accent : "#94A3B8" }}
        >
          <svg viewBox="0 0 20 20" fill={isFav ? "currentColor" : "none"} stroke="currentColor" className="w-3 h-3">
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="p-3" style={{ background: "var(--bg-elevated)" }}>
        <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>{tpl.name}</p>
        <p className="text-[11px] mb-2 line-clamp-1" style={{ color: "var(--text-faint)" }}>{tpl.desc}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {tpl.tags.map(t => (
            <span key={t} className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
              style={{ background: `${tpl.accent}18`, color: tpl.accent }}>{t}</span>
          ))}
        </div>
        <button
          onClick={e => { e.stopPropagation(); onSelect(tpl.id); }}
          className="w-full py-1.5 rounded-xl text-[11px] font-bold text-white transition-opacity hover:opacity-85"
          style={{ background: selected ? tpl.accent : `${tpl.accent}30`, color: selected ? "#fff" : tpl.accent }}
        >
          {selected ? "✓ Selected" : "Use Template"}
        </button>
      </div>
    </motion.div>
  );
}

/* ── Editable field ──────────────────────────────────────── */
function Field({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div>
      <label className="text-[11px] font-semibold uppercase tracking-wider block mb-1.5"
        style={{ color: "var(--text-faint)" }}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          rows={3}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="input-dark resize-none text-sm"
          style={{ lineHeight: "1.6" }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="input-dark text-sm"
        />
      )}
    </div>
  );
}

/* ── AI Suggestion card ──────────────────────────────────── */
function AISuggestionItem({ text, onApply, onCopy }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="p-3 rounded-xl text-xs leading-relaxed"
      style={{ background: "rgba(124,58,237,0.07)", border: "1px solid var(--border-default)" }}>
      <p className="mb-2" style={{ color: "var(--text-muted)" }}>{text}</p>
      <div className="flex gap-2">
        <button onClick={handleCopy}
          className="px-2.5 py-1 rounded-lg font-semibold transition-opacity hover:opacity-75"
          style={{ background: "rgba(124,58,237,0.12)", color: "#A78BFA", fontSize: "10px" }}>
          {copied ? "✓ Copied" : "Copy"}
        </button>
        <button onClick={() => onApply(text)}
          className="px-2.5 py-1 rounded-lg font-semibold transition-opacity hover:opacity-75"
          style={{ background: "rgba(34,197,94,0.12)", color: "var(--color-green-text)", fontSize: "10px" }}>
          Apply
        </button>
      </div>
    </div>
  );
}

/* ── Live resume preview ─────────────────────────────────── */
function ResumePreview({ data, tplAccent }) {
  return (
    <div className="rounded-xl p-5 text-[10px] leading-relaxed font-sans h-full overflow-y-auto"
      style={{ background: "#FFFFFF", color: "#111827", minHeight: "540px" }}>
      {/* Header */}
      <div className="pb-3 mb-3" style={{ borderBottom: `2px solid ${tplAccent}` }}>
        <h1 className="text-lg font-black" style={{ color: "#111827" }}>{data.name || "Your Name"}</h1>
        <p className="text-[11px] mt-0.5" style={{ color: "#374151" }}>{data.title || "Software Engineer"}</p>
        <div className="flex flex-wrap gap-3 mt-1.5 text-[9px]" style={{ color: "#6B7280" }}>
          {data.email    && <span>✉ {data.email}</span>}
          {data.phone    && <span>📞 {data.phone}</span>}
          {data.location && <span>📍 {data.location}</span>}
          {data.github   && <span>🔗 {data.github}</span>}
          {data.linkedin && <span>💼 {data.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-3">
          <h2 className="text-[11px] font-black uppercase tracking-wider mb-1" style={{ color: tplAccent }}>Summary</h2>
          <p style={{ color: "#374151" }}>{data.summary}</p>
        </div>
      )}

      {/* Skills */}
      {data.skills && (
        <div className="mb-3">
          <h2 className="text-[11px] font-black uppercase tracking-wider mb-1" style={{ color: tplAccent }}>Skills</h2>
          <div className="flex flex-wrap gap-1">
            {data.skills.split(",").map((s, i) => (
              <span key={i} className="px-1.5 py-0.5 rounded text-[9px] font-semibold"
                style={{ background: `${tplAccent}15`, color: tplAccent }}>
                {s.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience && (
        <div className="mb-3">
          <h2 className="text-[11px] font-black uppercase tracking-wider mb-1" style={{ color: tplAccent }}>Experience</h2>
          <p style={{ color: "#374151", whiteSpace: "pre-wrap" }}>{data.experience}</p>
        </div>
      )}

      {/* Projects */}
      {data.projects && (
        <div className="mb-3">
          <h2 className="text-[11px] font-black uppercase tracking-wider mb-1" style={{ color: tplAccent }}>Projects</h2>
          <p style={{ color: "#374151", whiteSpace: "pre-wrap" }}>{data.projects}</p>
        </div>
      )}

      {/* Education */}
      {data.education && (
        <div className="mb-3">
          <h2 className="text-[11px] font-black uppercase tracking-wider mb-1" style={{ color: tplAccent }}>Education</h2>
          <p style={{ color: "#374151" }}>{data.education}</p>
        </div>
      )}

      {/* Certifications */}
      {data.certifications && (
        <div>
          <h2 className="text-[11px] font-black uppercase tracking-wider mb-1" style={{ color: tplAccent }}>Certifications</h2>
          <p style={{ color: "#374151" }}>{data.certifications}</p>
        </div>
      )}
    </div>
  );
}

/* ── AI assistant features ────────────────────────────────── */
const AI_FEATURES = [
  { id: "summary",      label: "Improve Summary",        emoji: "📝", section: "summary"       },
  { id: "projects",     label: "Rewrite Projects",       emoji: "🛠",  section: "projects"      },
  { id: "experience",   label: "Rewrite Experience",     emoji: "💼", section: "experience"    },
  { id: "skills",       label: "Optimise Skills",        emoji: "⚡", section: "skills"        },
  { id: "grammar",      label: "Grammar Check",          emoji: "✏️", section: "summary"       },
  { id: "ats",          label: "ATS Suggestions",        emoji: "🎯", section: null            },
  { id: "company",      label: "Optimise for Company",   emoji: "🏢", section: null            },
  { id: "achievements", label: "Generate Achievements",  emoji: "🏆", section: "experience"    },
  { id: "certs",        label: "Generate Certifications",emoji: "🎓", section: "certifications"},
  { id: "bullets",      label: "Improve Bullet Points",  emoji: "🔸", section: "experience"    },
];

const COMPANIES_LIST = [
  "Google","Microsoft","Amazon","Apple","Netflix","Meta","Adobe","Oracle",
  "IBM","Salesforce","Flipkart","Swiggy","Zomato","TCS","Infosys","Wipro",
  "Accenture","Capgemini","Cognizant",
];

/* ── AI text generation (rule-based, LLM-ready) ──────────── */
function generateAIContent(featureId, formData, company) {
  const name = formData.name || "the candidate";
  const skills = formData.skills || "Python, React, SQL";
  switch (featureId) {
    case "summary":
      return `Results-driven software engineer with expertise in ${skills}. Passionate about building scalable, user-centric applications that deliver measurable business impact. Seeking to leverage technical skills and problem-solving abilities at ${company || "a leading technology company"}.`;
    case "projects":
      return `• Developed a full-stack web application using React and Flask serving 1,000+ daily active users, improving response time by 40%.\n• Designed and deployed a REST API with JWT authentication handling 10,000+ requests/day with 99.9% uptime.\n• Built an automated data pipeline using Python and SQL, reducing manual processing time by 65%.`;
    case "experience":
      return `• Engineered ${skills.split(",")[0]?.trim() || "React"} features adopted by 500+ enterprise clients, increasing user retention by 28%.\n• Collaborated across cross-functional teams to deliver 15+ sprint features on schedule with zero critical bugs.\n• Reduced deployment time by 50% by implementing CI/CD pipeline using GitHub Actions and Docker.`;
    case "skills":
      return `${skills}, Git, Linux, REST APIs, Docker, AWS, System Design, DSA, Agile, JIRA`;
    case "achievements":
      return `• Ranked in top 5% of 10,000+ participants in national coding competition.\n• Delivered 3 production features in first month — recognised by engineering manager.\n• Reduced bug count by 60% after introducing automated testing framework.\n• Mentored 2 junior developers improving team velocity by 25%.`;
    case "certs":
      return `• AWS Certified Cloud Practitioner\n• Google Data Analytics Professional Certificate\n• Meta Front-End Developer Certificate`;
    case "ats":
      return `Add these ATS keywords for ${company || "top companies"}: System Design, Microservices, CI/CD, REST API, Docker, Kubernetes, Agile, Git. Use action verbs: Engineered, Architected, Optimised, Deployed, Reduced, Improved.`;
    case "company":
      return `For ${company || "this company"}: Emphasise ${company === "Amazon" ? "Leadership Principles, AWS, and measurable ownership" : company === "Google" ? "algorithms, DSA, scalable systems, and open-source contributions" : company === "Microsoft" ? "Azure, teamwork, enterprise experience, and growth mindset" : "relevant technical skills and quantifiable project achievements"}. Add specific metrics to every bullet point.`;
    case "grammar":
      return `Grammar looks good. Consider: Use active voice ("Developed" not "Was responsible for"), start each bullet with a strong verb, keep sentences under 20 words, quantify every impact.`;
    case "bullets":
      return `Weak: "Worked on backend." → Strong: "Engineered high-throughput REST APIs using Flask processing 50,000+ daily requests with sub-100ms latency."\n\nWeak: "Built a website." → Strong: "Developed responsive React web application improving user engagement by 42% and reducing bounce rate by 30%."\n\nWeak: "Helped team." → Strong: "Collaborated with 6-person agile team to deliver 12 sprint features, contributing 800+ lines of reviewed, production-ready code."`;
    default:
      return `AI suggestion for ${featureId}: Add relevant details with quantified outcomes.`;
  }
}

/* ═══════════════════════════════════════════════════════════
   AIResumeBuilder — main page export
═══════════════════════════════════════════════════════════ */
export default function AIResumeBuilder() {
  /* ── Template state ── */
  const [selectedTpl, setSelectedTpl] = useState("ats-pro");
  const [favourites,  setFavourites]  = useState(new Set());

  /* ── Form data ── */
  const [form, setForm] = useState({
    name: "Meghana", title: "Software Engineer",
    email: "meghana@gmail.com", phone: "+91 XXXXX XXXXX",
    location: "Hyderabad, India", github: "github.com/meghana",
    linkedin: "linkedin.com/in/meghana",
    summary: "", skills: "Python, React, SQL, Git, Node.js",
    experience: "", projects: "", education: "B.Tech CSE — Vignan University — 2024",
    certifications: "",
  });

  /* ── Editor tab ── */
  const [editorTab, setEditorTab] = useState("personal");

  /* ── AI Assistant state ── */
  const [aiLoading,     setAiLoading]     = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [aiCompany,     setAiCompany]     = useState("Google");
  const [aiPanelOpen,   setAiPanelOpen]   = useState(true);
  const [activeFeature, setActiveFeature] = useState(null);

  const tpl = TEMPLATES.find(t => t.id === selectedTpl) || TEMPLATES[0];

  const setField = useCallback((key, val) =>
    setForm(f => ({ ...f, [key]: val })), []);

  const applyToForm = (text, section) => {
    if (section && form[section] !== undefined) setField(section, text);
  };

  const runAI = (featureId, section) => {
    setActiveFeature(featureId);
    setAiLoading(true);
    setAiSuggestions([]);
    setTimeout(() => {
      const content = generateAIContent(featureId, form, aiCompany);
      const lines   = content.split("\n").filter(Boolean);
      setAiSuggestions(lines.map(l => ({ text: l, section })));
      setAiLoading(false);
    }, 900);
  };

  const toggleFav = id =>
    setFavourites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />
      <main className="ml-64 flex-1 p-6 min-w-0">
        <Navbar />

        {/* Page header */}
        <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{ background:"rgba(236,72,153,0.14)", border:"1px solid rgba(236,72,153,0.28)", color:"#F472B6" }}>
              ✍️ New Feature
            </span>
          </div>
          <h1 className="text-3xl font-bold" style={{ color:"var(--text-primary)" }}>AI Resume Builder</h1>
          <p className="text-sm mt-1" style={{ color:"var(--text-faint)" }}>
            Choose a template, fill your details, and let AI optimise your resume for any company.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════
            SECTION 1 — Template Gallery
        ══════════════════════════════════════ */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.08 }}
          className="theme-card rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-base" style={{ color:"var(--text-primary)" }}>
              Choose a Template
            </h2>
            <span className="text-xs px-2.5 py-1 rounded-lg font-medium"
              style={{ background:"rgba(124,58,237,0.10)", color:"#A78BFA" }}>
              {TEMPLATES.length} templates
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3">
            {TEMPLATES.map(t => (
              <TemplateCard key={t.id} tpl={t}
                selected={selectedTpl === t.id}
                onSelect={setSelectedTpl}
                onFavourite={toggleFav}
                isFav={favourites.has(t.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════
            SECTION 2 — Split-screen Editor
        ══════════════════════════════════════ */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.14 }}
          className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">

          {/* ── LEFT: Form ── */}
          <div className="theme-card rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-base" style={{ color:"var(--text-primary)" }}>Edit Content</h2>
              <div className="flex gap-1">
                {["personal","skills","experience","projects","education"].map(tab => (
                  <button key={tab} onClick={() => setEditorTab(tab)}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition-all"
                    style={editorTab === tab
                      ? { background:"rgba(124,58,237,0.18)", color:"#A78BFA", border:"1px solid rgba(124,58,237,0.30)" }
                      : { background:"transparent", color:"var(--text-faint)", border:"1px solid transparent" }
                    }>
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {editorTab === "personal" && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Full Name"  value={form.name}     onChange={v=>setField("name",v)}     placeholder="Your Name" />
                  <Field label="Job Title"  value={form.title}    onChange={v=>setField("title",v)}    placeholder="Software Engineer" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Email"    value={form.email}    onChange={v=>setField("email",v)}    placeholder="you@email.com" />
                  <Field label="Phone"    value={form.phone}    onChange={v=>setField("phone",v)}    placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Location" value={form.location} onChange={v=>setField("location",v)} placeholder="City, Country" />
                  <Field label="GitHub"   value={form.github}   onChange={v=>setField("github",v)}   placeholder="github.com/username" />
                </div>
                <Field label="LinkedIn" value={form.linkedin}  onChange={v=>setField("linkedin",v)} placeholder="linkedin.com/in/username" />
                <Field label="Professional Summary" type="textarea"
                  value={form.summary} onChange={v=>setField("summary",v)}
                  placeholder="2-3 lines about your career goals and top skills..." />
              </div>
            )}
            {editorTab === "skills" && (
              <div className="space-y-3">
                <Field label="Technical Skills (comma separated)" type="textarea"
                  value={form.skills} onChange={v=>setField("skills",v)}
                  placeholder="Python, React, SQL, Docker, AWS..." />
                <Field label="Certifications" type="textarea"
                  value={form.certifications} onChange={v=>setField("certifications",v)}
                  placeholder="AWS Cloud Practitioner, Google Analytics Cert..." />
              </div>
            )}
            {editorTab === "experience" && (
              <Field label="Work Experience & Internships" type="textarea"
                value={form.experience} onChange={v=>setField("experience",v)}
                placeholder="• Role @ Company (Month Year – Month Year)&#10;• Achievement bullet 1&#10;• Achievement bullet 2" />
            )}
            {editorTab === "projects" && (
              <Field label="Projects" type="textarea"
                value={form.projects} onChange={v=>setField("projects",v)}
                placeholder="• Project Name | Tech Stack&#10;• What it does and its measurable impact" />
            )}
            {editorTab === "education" && (
              <Field label="Education" type="textarea"
                value={form.education} onChange={v=>setField("education",v)}
                placeholder="Degree — University — Year — CGPA" />
            )}
          </div>

          {/* ── RIGHT: Live Preview ── */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-base" style={{ color:"var(--text-primary)" }}>
                Live Preview
              </h2>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: tpl.accent }} />
                <span className="text-xs font-medium" style={{ color: tpl.accent }}>{tpl.name}</span>
              </div>
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden"
              style={{ border: `2px solid ${tpl.accent}30`, minHeight: "520px" }}>
              <ResumePreview data={form} tplAccent={tpl.accent} />
            </div>
            <button
              className="w-full py-3 rounded-xl text-sm font-bold text-white hover:opacity-85 transition-opacity flex items-center justify-center gap-2"
              style={{ background: `linear-gradient(135deg, ${tpl.accent}, ${tpl.accent}cc)` }}
              onClick={() => window.print()}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download Resume
            </button>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════
            SECTION 3 — AI Assistant Panel
        ══════════════════════════════════════ */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.20 }}
          className="rounded-2xl p-5"
          style={{ background:"linear-gradient(135deg,rgba(124,58,237,0.12),rgba(109,40,217,0.08))",
                   border:"1px solid rgba(124,58,237,0.28)" }}>

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background:"linear-gradient(135deg,#7C3AED,#6D28D9)" }}>
                <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-base" style={{ color:"var(--text-primary)" }}>AI Assistant</h2>
                <p className="text-xs" style={{ color:"var(--text-faint)" }}>Company-specific suggestions</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={aiCompany}
                onChange={e => setAiCompany(e.target.value)}
                className="select-dark text-xs"
                style={{ width:"160px", padding:"8px 32px 8px 12px" }}
              >
                {COMPANIES_LIST.map(c => <option key={c}>{c}</option>)}
              </select>
              <button onClick={() => setAiPanelOpen(v => !v)}
                className="px-3 py-2 rounded-xl text-xs font-semibold transition-opacity hover:opacity-75"
                style={{ background:"rgba(124,58,237,0.14)", color:"#A78BFA", border:"1px solid rgba(124,58,237,0.28)" }}>
                {aiPanelOpen ? "Collapse" : "Expand"}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {aiPanelOpen && (
              <motion.div
                initial={{ height:0, opacity:0 }}
                animate={{ height:"auto", opacity:1 }}
                exit={{ height:0, opacity:0 }}
                transition={{ duration:0.25 }}
                className="overflow-hidden"
              >
                {/* Feature buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5">
                  {AI_FEATURES.map(f => (
                    <button key={f.id}
                      onClick={() => runAI(f.id, f.section)}
                      disabled={aiLoading && activeFeature === f.id}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center transition-all hover:scale-[1.03] active:scale-[0.97] disabled:opacity-50"
                      style={{
                        background: activeFeature === f.id && !aiLoading
                          ? "rgba(124,58,237,0.18)"
                          : "rgba(124,58,237,0.07)",
                        border: `1px solid ${activeFeature === f.id ? "rgba(124,58,237,0.40)" : "rgba(124,58,237,0.18)"}`,
                      }}>
                      <span className="text-xl">{f.emoji}</span>
                      <span className="text-[10px] font-semibold" style={{ color:"var(--text-muted)" }}>
                        {f.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Loading */}
                {aiLoading && (
                  <div className="flex items-center gap-3 p-4 rounded-xl mb-4"
                    style={{ background:"rgba(124,58,237,0.07)", border:"1px solid rgba(124,58,237,0.20)" }}>
                    <div className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin flex-shrink-0"
                      style={{ borderColor:"#7C3AED", borderTopColor:"transparent" }} />
                    <p className="text-sm" style={{ color:"var(--text-muted)" }}>
                      AI is generating {aiCompany}-specific suggestions…
                    </p>
                  </div>
                )}

                {/* Results */}
                {!aiLoading && aiSuggestions.length > 0 && (
                  <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                    className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color:"var(--text-faint)" }}>
                        AI Generated for {aiCompany}
                      </p>
                      <button onClick={() => setAiSuggestions([])}
                        className="text-[11px] hover:opacity-70 transition-opacity"
                        style={{ color:"var(--text-faint)" }}>
                        Clear
                      </button>
                    </div>
                    {aiSuggestions.map((s, i) => (
                      <AISuggestionItem
                        key={i}
                        text={s.text}
                        onApply={t => applyToForm(t, s.section)}
                        onCopy={() => {}}
                      />
                    ))}
                  </motion.div>
                )}

                {/* Empty state */}
                {!aiLoading && aiSuggestions.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <span className="text-3xl mb-2">🤖</span>
                    <p className="text-sm font-medium" style={{ color:"var(--text-muted)" }}>
                      Select a feature above to get AI suggestions
                    </p>
                    <p className="text-xs mt-1" style={{ color:"var(--text-faint)" }}>
                      Tailored specifically for {aiCompany} · {TEMPLATES.find(t=>t.id===selectedTpl)?.name} template
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </main>
    </div>
  );
}
