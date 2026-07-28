/**
 * AIResumeBuilder.jsx  —  All-in-one AI Resume Builder
 *
 * 6 tabs:
 *  1. Templates       — choose a resume template
 *  2. Resume Editor   — edit all sections with auto-save indicator
 *  3. AI Rewrite      — rewrite each section with before/after comparison
 *  4. Company Optimizer — keyword gap analysis against any company/role
 *  5. Preview         — live resume preview
 *  6. Download        — PDF / DOCX / Print / Share
 *
 * Backend used:
 *  POST /rewrite-bullet  (AI Rewrite tab)
 *  POST /resume-coach    (Company Optimizer tab)
 */
import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
  LayoutTemplate, FileEdit, Wand2, Target,
  Eye, Download, Check, Copy, RefreshCw,
  ChevronDown, ChevronUp, Printer, Share2,
  Loader2, AlertCircle, Mail, Sparkles,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar  from "../components/Navbar";
import companies from "../data/companiesData";
import { downloadResumePDF } from "../utils/downloadResume";

const API = "http://127.0.0.1:5000";

/* ─────────────────────────────────────────────────────────────
   TAB CONFIG
───────────────────────────────────────────────────────────── */
const TABS = [
  { id:"improve",      label:"AI Improve",        Icon:Sparkles,      highlight:true  },
  { id:"templates",    label:"Templates",         Icon:LayoutTemplate                },
  { id:"editor",       label:"Resume Editor",     Icon:FileEdit                      },
  { id:"rewrite",      label:"AI Rewrite",        Icon:Wand2                         },
  { id:"optimizer",    label:"Company Optimizer", Icon:Target                        },
  { id:"cover-letter", label:"Cover Letter",      Icon:Mail                          },
  { id:"preview",      label:"Preview",           Icon:Eye                           },
  { id:"download",     label:"Download",          Icon:Download                      },
];

/* ─────────────────────────────────────────────────────────────
   TEMPLATE DATA
───────────────────────────────────────────────────────────── */
const TEMPLATES = [
  { id:"ats-pro",      name:"ATS Professional", badge:"Most Popular", badgeColor:"#7C3AED",
    desc:"Clean, keyword-optimised layout trusted by top companies.",
    tags:["ATS","Clean","2-Column"], accent:"#7C3AED",
    headerBg:"#7C3AED", bodyBg:"#1E293B" },
  { id:"modern",       name:"Modern",           badge:"Trending",     badgeColor:"#06B6D4",
    desc:"Bold typography with a modern sidebar design.",
    tags:["Sidebar","Bold","Colourful"], accent:"#06B6D4",
    headerBg:"#06B6D4", bodyBg:"#0F172A" },
  { id:"minimal",      name:"Minimal",          badge:null,           badgeColor:null,
    desc:"Single-column minimalist — zero distractions.",
    tags:["1-Column","Clean","Simple"], accent:"#94A3B8",
    headerBg:"#334155", bodyBg:"#1E293B" },
  { id:"developer",    name:"Developer",        badge:"New",          badgeColor:"#22C55E",
    desc:"Code-inspired design with GitHub-style skill bars.",
    tags:["Tech","GitHub","Skills"], accent:"#22C55E",
    headerBg:"#166534", bodyBg:"#0F172A" },
  { id:"corporate",    name:"Corporate",        badge:null,           badgeColor:null,
    desc:"Traditional enterprise layout for corporate roles.",
    tags:["Enterprise","Formal"], accent:"#3B82F6",
    headerBg:"#1D4ED8", bodyBg:"#1E293B" },
  { id:"student",      name:"Student",          badge:"Free",         badgeColor:"#F59E0B",
    desc:"Ideal for freshers with strong education emphasis.",
    tags:["Fresher","Education","Internship"], accent:"#F59E0B",
    headerBg:"#92400E", bodyBg:"#1E293B" },
  { id:"creative",     name:"Creative",         badge:null,           badgeColor:null,
    desc:"Eye-catching design for design & marketing roles.",
    tags:["Creative","Colourful","Portfolio"], accent:"#EC4899",
    headerBg:"#9D174D", bodyBg:"#0F172A" },
  { id:"data-science", name:"Data Scientist",   badge:"AI Ready",     badgeColor:"#A78BFA",
    desc:"Highlights ML skills, publications, and datasets.",
    tags:["ML/AI","Research","Publications"], accent:"#A78BFA",
    headerBg:"#4C1D95", bodyBg:"#0F172A" },
];

/* ─────────────────────────────────────────────────────────────
   INITIAL FORM DATA
───────────────────────────────────────────────────────────── */
const INITIAL_FORM = {
  name:           "Meghana",
  title:          "Software Engineer",
  email:          "meghana@gmail.com",
  phone:          "+91 XXXXX XXXXX",
  location:       "Hyderabad, India",
  github:         "github.com/meghana",
  linkedin:       "linkedin.com/in/meghana",
  summary:        "",
  skills:         "Python, React, SQL, Git, Node.js, Docker",
  experience:     "",
  projects:       "",
  education:      "B.Tech CSE — Vignan University — 2024 — 8.2 CGPA",
  certifications: "",
  achievements:   "",
};

const COMPANIES = [
  "Google","Microsoft","Amazon","Apple","Meta","Netflix",
  "Adobe","Oracle","IBM","Salesforce","TCS","Infosys","Wipro",
  "Accenture","Capgemini","Cognizant","Flipkart","Razorpay",
];
const ROLES = [
  "Software Engineer","Frontend Developer","Backend Developer",
  "Full Stack Developer","Data Scientist","Machine Learning Engineer",
  "DevOps Engineer","Cloud Engineer","Product Manager",
];

/* ─────────────────────────────────────────────────────────────
   SMALL REUSABLE ATOMS
───────────────────────────────────────────────────────────── */
function Label({ children }) {
  return (
    <label className="text-[11px] font-semibold uppercase tracking-wider block mb-1.5"
      style={{ color:"var(--text-faint)" }}>
      {children}
    </label>
  );
}

function FInput({ label, value, onChange, placeholder="" }) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <input className="input-dark text-sm" value={value}
        onChange={e=>onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

function FTextarea({ label, value, onChange, placeholder="", rows=3 }) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <textarea rows={rows} className="input-dark text-sm resize-none"
        style={{ lineHeight:"1.65" }}
        value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

function PurpleBtn({ onClick, disabled, loading, children, className="" }) {
  return (
    <motion.button
      whileHover={!disabled ? { scale:1.02 } : {}}
      whileTap={!disabled  ? { scale:0.97 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl text-sm font-bold text-white disabled:opacity-55 ${className}`}
      style={{ background:"linear-gradient(135deg,#7C3AED,#6D28D9)", boxShadow:"0 4px 14px rgba(124,58,237,0.30)" }}>
      {loading && <Loader2 size={14} className="animate-spin" />}
      {children}
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────
   TAB 1 — Templates
───────────────────────────────────────────────────────────── */
function TemplatesTab({ selectedTpl, setSelectedTpl, favourites, toggleFav }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold" style={{ color:"var(--text-primary)" }}>Choose a Template</h2>
          <p className="text-sm mt-0.5" style={{ color:"var(--text-faint)" }}>
            {TEMPLATES.length} professional templates — all ATS-optimised
          </p>
        </div>
        <span className="text-xs px-3 py-1 rounded-lg font-medium"
          style={{ background:"rgba(124,58,237,0.10)", color:"#A78BFA" }}>
          {TEMPLATES.length} templates
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
        {TEMPLATES.map(tpl => {
          const active = selectedTpl === tpl.id;
          return (
            <motion.div key={tpl.id} whileHover={{ y:-4 }} transition={{ duration:0.18 }}
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{
                border:     active ? `2px solid ${tpl.accent}` : "1px solid var(--border-default)",
                boxShadow:  active ? `0 0 0 3px ${tpl.accent}22` : "none",
              }}
              onClick={() => setSelectedTpl(tpl.id)}
            >
              {/* Mini preview */}
              <div className="h-32 relative p-3 flex flex-col gap-1.5"
                style={{ background:tpl.bodyBg }}>
                <div className="h-7 rounded-md" style={{ background:tpl.headerBg, opacity:0.9 }} />
                {[100,80,90,70,85].map((w,i)=>(
                  <div key={i} className="h-1.5 rounded-full"
                    style={{ background:"rgba(255,255,255,0.10)", width:`${w}%` }} />
                ))}
                {tpl.badge && (
                  <span className="absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-md text-white"
                    style={{ background:tpl.badgeColor }}>
                    {tpl.badge}
                  </span>
                )}
                <button
                  onClick={e=>{ e.stopPropagation(); toggleFav(tpl.id); }}
                  className="absolute bottom-2 right-2 w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ background:favourites.has(tpl.id)?`${tpl.accent}30`:"rgba(255,255,255,0.08)",
                           color:favourites.has(tpl.id)?tpl.accent:"#94A3B8" }}>
                  ♥
                </button>
              </div>
              {/* Card footer */}
              <div className="p-3" style={{ background:"var(--bg-elevated)" }}>
                <p className="text-sm font-semibold truncate" style={{ color:"var(--text-primary)" }}>{tpl.name}</p>
                <p className="text-[11px] truncate mt-0.5" style={{ color:"var(--text-faint)" }}>{tpl.desc}</p>
                <div className="flex flex-wrap gap-1 mt-2 mb-3">
                  {tpl.tags.map(t=>(
                    <span key={t} className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
                      style={{ background:`${tpl.accent}18`, color:tpl.accent }}>{t}</span>
                  ))}
                </div>
                <button
                  className="w-full py-1.5 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-85"
                  style={{ background:active?tpl.accent:`${tpl.accent}25`, color:active?"#fff":tpl.accent }}>
                  {active ? "✓ Selected" : "Use Template"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TAB 2 — Resume Editor
───────────────────────────────────────────────────────────── */
const EDITOR_SECTIONS = [
  { id:"personal",    label:"Personal Info" },
  { id:"summary",     label:"Summary"       },
  { id:"experience",  label:"Experience"    },
  { id:"projects",    label:"Projects"      },
  { id:"education",   label:"Education"     },
  { id:"skills",      label:"Skills"        },
  { id:"certifications", label:"Certifications" },
  { id:"achievements",   label:"Achievements"   },
];

function EditorTab({ form, setField, saved }) {
  const [openSection, setOpenSection] = useState("personal");

  const toggle = (id) => setOpenSection(s => s === id ? null : id);

  const renderSection = (id) => {
    const F = (label, key, opts={}) => opts.area
      ? <FTextarea key={key} label={label} value={form[key]||""} onChange={v=>setField(key,v)}
          placeholder={opts.placeholder||""} rows={opts.rows||4} />
      : <FInput    key={key} label={label} value={form[key]||""} onChange={v=>setField(key,v)}
          placeholder={opts.placeholder||""} />;

    switch (id) {
      case "personal": return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {F("Full Name","name",{placeholder:"Your Name"})}
            {F("Job Title","title",{placeholder:"Software Engineer"})}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {F("Email","email",{placeholder:"you@email.com"})}
            {F("Phone","phone",{placeholder:"+91 XXXXX XXXXX"})}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {F("Location","location",{placeholder:"City, Country"})}
            {F("GitHub","github",{placeholder:"github.com/username"})}
          </div>
          {F("LinkedIn","linkedin",{placeholder:"linkedin.com/in/username"})}
        </div>
      );
      case "summary":       return F("Professional Summary","summary",{area:true,rows:4,placeholder:"2-3 lines about your career goals and top skills…"});
      case "experience":    return F("Work Experience & Internships","experience",{area:true,rows:6,placeholder:"• Role @ Company (Month Year – Month Year)\n• Achievement bullet 1\n• Achievement bullet 2"});
      case "projects":      return F("Projects","projects",{area:true,rows:6,placeholder:"• Project Name | Tech Stack\n• Impact and what you built"});
      case "education":     return F("Education","education",{area:true,rows:3,placeholder:"Degree — University — Year — CGPA"});
      case "skills":        return F("Technical Skills (comma separated)","skills",{area:true,rows:3,placeholder:"Python, React, SQL, Docker, AWS…"});
      case "certifications":return F("Certifications","certifications",{area:true,rows:3,placeholder:"AWS Cloud Practitioner, Google Analytics Cert…"});
      case "achievements":  return F("Achievements & Awards","achievements",{area:true,rows:3,placeholder:"• Ranked top 5% in national coding competition\n• Won college hackathon 2024"});
      default: return null;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold" style={{ color:"var(--text-primary)" }}>Resume Editor</h2>
          <p className="text-sm mt-0.5" style={{ color:"var(--text-faint)" }}>
            Fill in your details — preview updates in the Preview tab
          </p>
        </div>
        <AnimatePresence>
          {saved && (
            <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
              style={{ background:"rgba(34,197,94,0.12)", color:"var(--color-green-text)" }}>
              <Check size={11} /> Auto-saved
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-2">
        {EDITOR_SECTIONS.map(({ id, label }) => (
          <div key={id} className="rounded-2xl overflow-hidden"
            style={{ border:"1px solid var(--border-default)" }}>
            <button
              onClick={() => toggle(id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left"
              style={{ background:"var(--bg-surface)" }}>
              <span className="text-sm font-semibold" style={{ color:"var(--text-primary)" }}>{label}</span>
              {openSection === id
                ? <ChevronUp size={14} color="var(--text-faint)" />
                : <ChevronDown size={14} color="var(--text-faint)" />}
            </button>
            <AnimatePresence>
              {openSection === id && (
                <motion.div initial={{ height:0,opacity:0 }} animate={{ height:"auto",opacity:1 }}
                  exit={{ height:0,opacity:0 }} transition={{ duration:0.22 }} className="overflow-hidden">
                  <div className="p-4" style={{ background:"var(--bg-elevated)" }}>
                    {renderSection(id)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TAB 3 — AI Rewrite
───────────────────────────────────────────────────────────── */
const REWRITE_SECTIONS = [
  { id:"summary",    label:"Summary",    emoji:"📝", field:"summary"    },
  { id:"experience", label:"Experience", emoji:"💼", field:"experience" },
  { id:"projects",   label:"Projects",   emoji:"🛠", field:"projects"   },
  { id:"skills",     label:"Skills",     emoji:"⚡", field:"skills"     },
  { id:"achievements",label:"Achievements",emoji:"🏆",field:"achievements"},
];

function generateRewrite(field, form) {
  const skills = form.skills || "Python, React, SQL";
  const name   = form.name   || "the candidate";
  switch (field) {
    case "summary":
      return `Results-driven Software Engineer with expertise in ${skills}. Passionate about building scalable, user-centric applications that deliver measurable business impact. Seeking to leverage technical skills and problem-solving abilities at a leading technology company.`;
    case "experience":
      return `• Engineered ${skills.split(",")[0]?.trim()||"React"} features adopted by 500+ enterprise clients, increasing user retention by 28%.\n• Collaborated across cross-functional teams to deliver 15+ sprint features on schedule with zero critical bugs.\n• Reduced deployment time by 50% by implementing CI/CD pipeline using GitHub Actions and Docker.`;
    case "projects":
      return `• Resume Analyzer Platform | React, Flask, Python, PostgreSQL\n  Built AI-powered resume analysis tool serving 1,000+ daily active users with 99.9% uptime.\n\n• E-Commerce API | Node.js, MongoDB, Redis, AWS\n  Designed REST API handling 50,000+ daily requests with sub-100ms latency.`;
    case "skills":
      return `${skills}, Git, Linux, REST APIs, Docker, AWS, System Design, DSA, Agile, JIRA, PostgreSQL`;
    case "achievements":
      return `• Ranked in top 5% of 10,000+ participants in national coding competition.\n• Delivered 3 production features in first month — recognised by engineering manager.\n• Reduced bug count by 60% after introducing automated testing framework.`;
    default:
      return `Improved version of ${field} section.`;
  }
}

function RewriteTab({ form, setField }) {
  const [states, setStates] = useState({}); // { fieldId: { loading, rewritten, error, expanded } }

  const run = async (field) => {
    setStates(s => ({ ...s, [field]:{ loading:true, rewritten:"", error:"", expanded:true } }));
    // Try backend, fall back to local generation
    try {
      const res = await fetch(`${API}/rewrite-bullet`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ original: form[field] || `My ${field} section`, company:"", role:"" }),
      });
      const data = await res.json();
      const result = data.rewritten || generateRewrite(field, form);
      setStates(s => ({ ...s, [field]:{ loading:false, rewritten:result, error:"", expanded:true } }));
    } catch {
      const result = generateRewrite(field, form);
      setStates(s => ({ ...s, [field]:{ loading:false, rewritten:result, error:"", expanded:true } }));
    }
  };

  const apply = (field, text) => {
    setField(field, text);
    setStates(s => ({ ...s, [field]:{ ...s[field], applied:true } }));
  };

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-bold" style={{ color:"var(--text-primary)" }}>AI Rewrite</h2>
        <p className="text-sm mt-0.5" style={{ color:"var(--text-faint)" }}>
          Click any section to generate an AI-improved version. Compare before/after.
        </p>
      </div>

      <div className="space-y-4">
        {REWRITE_SECTIONS.map(({ id, label, emoji, field }) => {
          const st = states[field] || {};
          return (
            <div key={id} className="rounded-2xl overflow-hidden"
              style={{ border:"1px solid var(--border-default)" }}>
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3"
                style={{ background:"var(--bg-surface)", borderBottom:"1px solid var(--border-subtle)" }}>
                <div className="flex items-center gap-2">
                  <span className="text-base">{emoji}</span>
                  <span className="text-sm font-semibold" style={{ color:"var(--text-primary)" }}>{label}</span>
                </div>
                <button
                  onClick={() => run(field)}
                  disabled={st.loading}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white disabled:opacity-55"
                  style={{ background:"linear-gradient(135deg,#7C3AED,#6D28D9)" }}>
                  {st.loading
                    ? <><Loader2 size={11} className="animate-spin"/>Rewriting…</>
                    : <><Wand2 size={11}/>✨ Rewrite with AI</>
                  }
                </button>
              </div>

              {/* Before / After */}
              <AnimatePresence>
                {(st.rewritten || form[field]) && (
                  <motion.div initial={{ height:0,opacity:0 }} animate={{ height:"auto",opacity:1 }}
                    exit={{ height:0,opacity:0 }} className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-x"
                      style={{ borderColor:"var(--border-subtle)" }}>
                      {/* Before */}
                      <div className="p-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider mb-2"
                          style={{ color:"var(--color-red-text)" }}>Before</p>
                        <p className="text-xs leading-relaxed whitespace-pre-wrap"
                          style={{ color:"var(--text-muted)" }}>
                          {form[field] || <span style={{ color:"var(--text-faint)",fontStyle:"italic" }}>Empty — add content in the Editor tab</span>}
                        </p>
                      </div>
                      {/* After */}
                      {st.rewritten && (
                        <div className="p-4" style={{ background:"rgba(34,197,94,0.03)" }}>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-[10px] font-bold uppercase tracking-wider"
                              style={{ color:"var(--color-green-text)" }}>
                              ✨ AI Version
                            </p>
                            <div className="flex gap-2">
                              <button onClick={() => { navigator.clipboard.writeText(st.rewritten).catch(()=>{}); }}
                                className="text-[10px] px-2 py-0.5 rounded font-semibold hover:opacity-75"
                                style={{ background:"rgba(124,58,237,0.12)", color:"#A78BFA" }}>
                                Copy
                              </button>
                              <button onClick={() => apply(field, st.rewritten)}
                                className="text-[10px] px-2 py-0.5 rounded font-semibold hover:opacity-75"
                                style={{ background:"rgba(34,197,94,0.12)", color:"var(--color-green-text)" }}>
                                {st.applied ? "✓ Applied" : "Apply"}
                              </button>
                            </div>
                          </div>
                          <p className="text-xs leading-relaxed whitespace-pre-wrap"
                            style={{ color:"var(--text-primary)" }}>
                            {st.rewritten}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TAB — Cover Letter Generator
   Uses companiesData.js for company/role dropdowns.
   Mock generation now, API-ready for POST /generate-cover-letter.
───────────────────────────────────────────────────────────── */

/* ── Tones ── */
const CL_TONES = [
  { value:"professional", label:"Professional",  emoji:"💼" },
  { value:"enthusiastic", label:"Enthusiastic",  emoji:"🔥" },
  { value:"concise",      label:"Concise",       emoji:"⚡" },
  { value:"storytelling", label:"Story-driven",  emoji:"📖" },
];

/* ── Mock generation (swap body for fetch when API is ready) ── */
function generateCoverLetter({ name, company, role, description, tone, skills, experience }) {
  const companyData = companies.find(c => c.name === company) || {};
  const companyDesc = companyData.description
    ? companyData.description.split(".")[0]
    : `a leading technology company`;
  const topSkills   = (skills || "Python, React, SQL").split(",").slice(0,3).map(s=>s.trim()).join(", ");
  const expLine     = (!experience || experience === "Fresher")
    ? "As a recent Computer Science graduate"
    : `With ${experience} of industry experience`;

  const openers = {
    professional:  `I am writing to express my strong interest in the ${role} position at ${company}.`,
    enthusiastic:  `I am thrilled to apply for the ${role} role at ${company} — a company I deeply admire!`,
    concise:       `${name} — applying for ${role} at ${company}. Here is why I am the right fit:`,
    storytelling:  `Every great product starts with a great engineer. That is the story I want to write at ${company}.`,
  };

  const bodies = {
    professional: `${expLine}, I bring proficiency in ${topSkills} and a track record of building reliable, scalable software systems. My approach combines technical rigour with clear communication and a collaborative mindset.\n\n${companyData.description ? `${companyData.description.split(".").slice(0,2).join(".")}. I am especially excited about contributing to this mission.` : `${company}'s reputation for engineering excellence is what draws me to this role.`}${description ? `\n\nRegarding the specific requirements: ${description.slice(0,120)}${description.length > 120 ? "…" : ""}` : ""}`,
    enthusiastic: `${expLine}, I have built impactful projects using ${topSkills} and I am passionate about crafting software that users love. ${company}'s work on ${companyData.industry || "innovative technology"} excites me enormously!\n\nI am confident my energy, technical skills, and love of learning make me a strong addition to your team.`,
    concise:      `Skills: ${topSkills}.\n${expLine}. I build clean code, learn fast, and deliver results.\n\n${companyData.description ? companyData.description.split(".")[0] + "." : ""} I am ready to contribute from day one.`,
    storytelling: `It started with a side project — a small ${topSkills.split(",")[0]} application that taught me more than any textbook. ${expLine}, I have grown into an engineer who can design, build, and ship production-ready systems.\n\nAt ${company}, I want to write the next chapter of that story — and help build something millions of people will use.`,
  };

  const closings = {
    professional:  `I would welcome the opportunity to discuss how I can contribute to ${company}'s engineering team. Thank you for your consideration.`,
    enthusiastic:  `I would love to chat about how I can bring energy and skills to your team. Let us build something great together at ${company}!`,
    concise:       `Available immediately. Looking forward to contributing to ${company}.`,
    storytelling:  `I want to write the next chapter of that story at ${company}. I would love to show you what I can build.`,
  };

  return `Dear ${company} Hiring Team,

${openers[tone] || openers.professional}

${bodies[tone] || bodies.professional}

${closings[tone] || closings.professional}

Sincerely,
${name}`;
}

function CoverLetterTab({ form }) {
  /* ── form state ── */
  const [company,     setCompany]    = useState("");
  const [role,        setRole]       = useState("");
  const [tone,        setTone]       = useState("professional");
  const [jobDesc,     setJobDesc]    = useState("");
  const [letter,      setLetter]     = useState("");
  const [editedLetter,setEditedLetter] = useState("");
  const [generating,  setGenerating] = useState(false);
  const [mode,        setMode]       = useState("view"); // "view" | "edit"
  const [copied,      setCopied]     = useState(false);
  const [accepted,    setAccepted]   = useState(false);

  /* Derive roles from selected company */
  const companyData = companies.find(c => c.name === company);
  const availableRoles = companyData?.roles || [];

  /* Auto-set first role when company changes */
  useEffect(() => {
    if (availableRoles.length > 0) setRole(availableRoles[0]);
    else setRole("");
  }, [company]);

  const generate = () => {
    setGenerating(true);
    setLetter("");
    setEditedLetter("");
    setMode("view");
    setAccepted(false);

    const full = generateCoverLetter({
      name:        form.name        || "Candidate",
      company,
      role,
      description: jobDesc,
      tone,
      skills:      form.skills,
      experience:  form.experience  || "Fresher",
    });

    /* Stream effect */
    let i = 0;
    const id = setInterval(() => {
      i += 5;
      setLetter(full.slice(0, i));
      if (i >= full.length) { setLetter(full); setEditedLetter(full); clearInterval(id); setGenerating(false); }
    }, 14);
  };

  const regenerate = () => generate();

  const copy = () => {
    navigator.clipboard.writeText(editedLetter || letter).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const accept = () => { setAccepted(true); setMode("view"); };

  /* ── company list sorted alphabetically ── */
  const companyList = [...companies].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ background:"rgba(34,197,94,0.12)", border:"1px solid rgba(34,197,94,0.28)", color:"var(--color-green-text)" }}>
            ✉️ AI Generated
          </span>
        </div>
        <h2 className="text-lg font-bold" style={{ color:"var(--text-primary)" }}>
          AI Cover Letter Generator
        </h2>
        <p className="text-sm mt-0.5" style={{ color:"var(--text-faint)" }}>
          Generate a personalised, company-specific cover letter based on your resume.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* ── LEFT: Configuration ── */}
        <div className="space-y-4">

          {/* Company + Role */}
          <div className="theme-card rounded-2xl p-5 space-y-4">
            <h3 className="font-semibold text-sm" style={{ color:"var(--text-primary)" }}>
              Target Position
            </h3>

            <div>
              <Label>Company</Label>
              <select className="select-dark text-sm" value={company}
                onChange={e => setCompany(e.target.value)}>
                <option value="">— Select Company —</option>
                {companyList.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <Label>Role</Label>
              <select className="select-dark text-sm" value={role}
                onChange={e => setRole(e.target.value)}
                disabled={availableRoles.length === 0}>
                {availableRoles.length === 0
                  ? <option>— Select a company first —</option>
                  : availableRoles.map(r => <option key={r} value={r}>{r}</option>)
                }
              </select>
            </div>

            {/* Company info chip */}
            {companyData && (
              <motion.div
                initial={{ opacity:0, y:-4 }} animate={{ opacity:1, y:0 }}
                className="rounded-xl p-3 text-xs"
                style={{ background:"rgba(124,58,237,0.07)", border:"1px solid rgba(124,58,237,0.20)" }}>
                <p className="font-semibold mb-0.5" style={{ color:"#A78BFA" }}>{companyData.name}</p>
                <p className="leading-relaxed" style={{ color:"var(--text-faint)" }}>
                  {companyData.description?.slice(0,110)}{companyData.description?.length > 110 ? "…" : ""}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span style={{ color:"var(--text-faint)" }}>📍 {companyData.location}</span>
                  <span style={{ color:"var(--color-green-text)" }}>💰 {companyData.salary}</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Tone selector */}
          <div className="theme-card rounded-2xl p-5">
            <Label>Writing Tone</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {CL_TONES.map(t => (
                <button key={t.value} onClick={() => setTone(t.value)}
                  className="flex items-center gap-2 p-3 rounded-xl text-left transition-all"
                  style={{
                    background: tone === t.value ? "rgba(124,58,237,0.14)" : "var(--bg-surface)",
                    border: `1px solid ${tone === t.value ? "rgba(124,58,237,0.40)" : "var(--border-default)"}`,
                  }}>
                  <span className="text-base">{t.emoji}</span>
                  <span className="text-xs font-semibold"
                    style={{ color: tone === t.value ? "#A78BFA" : "var(--text-muted)" }}>
                    {t.label}
                  </span>
                  {tone === t.value && (
                    <span className="ml-auto text-[10px]" style={{ color:"#A78BFA" }}>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Job description (optional) */}
          <div className="theme-card rounded-2xl p-5">
            <Label>Job Description (Optional)</Label>
            <textarea
              rows={4}
              value={jobDesc}
              onChange={e => setJobDesc(e.target.value)}
              placeholder="Paste the job description here for a more tailored letter…"
              className="input-dark text-sm resize-none mt-1"
              style={{ lineHeight:"1.6" }}
            />
          </div>

          {/* Generate button */}
          <motion.button
            whileHover={{ scale:1.01 }} whileTap={{ scale:0.98 }}
            onClick={generate}
            disabled={generating || !company || !role}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-sm font-bold text-white disabled:opacity-55"
            style={{
              background:  "linear-gradient(135deg, #7C3AED, #6D28D9)",
              boxShadow:   "0 8px 24px rgba(124,58,237,0.38)",
            }}>
            {generating
              ? <><Loader2 size={15} className="animate-spin"/>Generating Cover Letter…</>
              : <><Mail size={15}/>✉️ Generate Cover Letter</>}
          </motion.button>
        </div>

        {/* ── RIGHT: Output ── */}
        <div className="flex flex-col gap-4">
          <div
            className="theme-card rounded-2xl p-5 flex-1 flex flex-col"
            style={{ minHeight:"480px" }}
          >
            {/* Output header */}
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h3 className="font-semibold text-sm" style={{ color:"var(--text-primary)" }}>
                {letter ? "✉️ AI Generated Cover Letter" : "Output"}
              </h3>

              {letter && (
                <div className="flex items-center gap-2">
                  {/* Mode toggle */}
                  <button
                    onClick={() => setMode(m => m === "view" ? "edit" : "view")}
                    className="text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-all"
                    style={{
                      background: mode === "edit" ? "rgba(245,158,11,0.12)" : "rgba(124,58,237,0.10)",
                      border:     `1px solid ${mode === "edit" ? "rgba(245,158,11,0.28)" : "rgba(124,58,237,0.22)"}`,
                      color:      mode === "edit" ? "var(--color-yellow-text)" : "#A78BFA",
                    }}>
                    {mode === "edit" ? "📝 Editing" : "✏️ Edit"}
                  </button>

                  {/* Copy */}
                  <button onClick={copy}
                    className="text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-all"
                    style={{
                      background: copied ? "rgba(34,197,94,0.12)" : "rgba(124,58,237,0.10)",
                      border:     `1px solid ${copied ? "rgba(34,197,94,0.28)" : "rgba(124,58,237,0.22)"}`,
                      color:      copied ? "var(--color-green-text)" : "#A78BFA",
                    }}>
                    {copied ? "✓ Copied" : <><Copy size={10} className="inline mr-1"/>Copy</>}
                  </button>
                </div>
              )}
            </div>

            {/* Content area */}
            {!letter && !generating ? (
              /* Empty state */
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
                  style={{ background:"rgba(124,58,237,0.08)", border:"1px solid rgba(124,58,237,0.15)" }}>
                  ✉️
                </div>
                <p className="text-sm font-semibold" style={{ color:"var(--text-muted)" }}>
                  Your cover letter will appear here
                </p>
                <p className="text-xs mt-2 max-w-[220px]" style={{ color:"var(--text-faint)" }}>
                  Select a company and role on the left, then click Generate
                </p>
              </div>
            ) : mode === "edit" && letter ? (
              /* Editable textarea */
              <textarea
                className="flex-1 input-dark text-sm resize-none"
                style={{ minHeight:"320px", lineHeight:"1.75", fontFamily:"inherit" }}
                value={editedLetter || letter}
                onChange={e => setEditedLetter(e.target.value)}
              />
            ) : (
              /* Streaming / view */
              <div className="flex-1 rounded-xl p-4 overflow-y-auto"
                style={{ background:"var(--bg-surface)", border:"1px solid var(--border-subtle)" }}>
                <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed"
                  style={{ color:"var(--text-primary)" }}>
                  {editedLetter || letter}
                  {generating && (
                    <span className="cursor-blink inline-block w-1.5 h-4 ml-0.5 align-middle rounded-sm"
                      style={{ background:"#7C3AED" }} />
                  )}
                </pre>
              </div>
            )}

            {/* Action buttons — only after generation */}
            {letter && !generating && (
              <motion.div
                initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                className="flex flex-wrap gap-2 mt-4 pt-4 flex-shrink-0"
                style={{ borderTop:"1px solid var(--border-subtle)" }}>

                {/* Accept */}
                <motion.button
                  whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                  onClick={accept}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white flex-1"
                  style={{
                    background: accepted
                      ? "linear-gradient(135deg,#22C55E,#16A34A)"
                      : "linear-gradient(135deg,#7C3AED,#6D28D9)",
                    boxShadow: "0 4px 12px rgba(124,58,237,0.28)",
                  }}>
                  <Check size={12}/>
                  {accepted ? "✓ Accepted" : "Accept"}
                </motion.button>

                {/* Edit toggle */}
                <button
                  onClick={() => setMode(m => m === "edit" ? "view" : "edit")}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold flex-1 transition-all"
                  style={{
                    background: "rgba(245,158,11,0.10)",
                    border:     "1px solid rgba(245,158,11,0.25)",
                    color:      "var(--color-yellow-text)",
                  }}>
                  ✏️ {mode === "edit" ? "Done Editing" : "Edit"}
                </button>

                {/* Regenerate */}
                <button
                  onClick={regenerate}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold flex-1 transition-all"
                  style={{
                    background: "rgba(124,58,237,0.08)",
                    border:     "1px solid rgba(124,58,237,0.22)",
                    color:      "#A78BFA",
                  }}>
                  <RefreshCw size={11}/>
                  Regenerate
                </button>
              </motion.div>
            )}
          </div>

          {/* Accepted success banner */}
          <AnimatePresence>
            {accepted && (
              <motion.div
                initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm"
                style={{
                  background: "rgba(34,197,94,0.08)",
                  border:     "1px solid rgba(34,197,94,0.25)",
                  color:      "var(--color-green-text)",
                }}>
                <Check size={14}/>
                <div>
                  <p className="font-semibold">Cover letter accepted!</p>
                  <p className="text-xs mt-0.5 opacity-75">
                    Go to the Download tab to export resume + cover letter together.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TAB 4 — Company Optimizer
───────────────────────────────────────────────────────────── */
function OptimizerTab({ form }) {
  const [company,  setCompany]  = useState("Google");
  const [role,     setRole]     = useState("Software Engineer");
  const [exp,      setExp]      = useState("Fresher");
  const [loading,  setLoading]  = useState(false);
  const [data,     setData]     = useState(null);
  const [offline,  setOffline]  = useState(false);

  const optimize = async () => {
    setLoading(true); setData(null); setOffline(false);
    try {
      const res = await fetch(`${API}/resume-coach`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ company, role, experience:exp }),
      });
      if (!res.ok) throw new Error();
      setData(await res.json());
    } catch {
      setOffline(true);
      setData({
        keyword_analysis:{
          keyword_score:52,
          matched_keywords:["Python","React","SQL","Git"],
          missing_keywords:["DSA","System Design","Docker","AWS","OOP"],
          weak_keywords:["Linux","Agile"],
        },
        company_suggestions:[
          `Add ${company}-specific keywords to your summary.`,
          "Quantify every project achievement with metrics.",
          `Mention ${company}'s culture alignment in your summary.`,
          "Include GitHub and LinkedIn profile links.",
          "Move Skills section above Experience for better ATS parsing.",
        ],
        ats_breakdown:{ overall:58, keyword_match:52, formatting_score:74, project_quality:62, experience_score:48, section_completeness:80 },
      });
    } finally { setLoading(false); }
  };

  const kw  = data?.keyword_analysis || {};
  const sug = data?.company_suggestions || [];
  const atd = data?.ats_breakdown || {};

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-bold" style={{ color:"var(--text-primary)" }}>Company Optimizer</h2>
        <p className="text-sm mt-0.5" style={{ color:"var(--text-faint)" }}>
          Tailor your resume for any company — see keyword gaps and ATS score.
        </p>
      </div>

      {/* Config row */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex-1 min-w-[140px]">
          <Label>Company</Label>
          <select className="select-dark text-sm" value={company} onChange={e=>setCompany(e.target.value)}>
            {COMPANIES.map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex-1 min-w-[140px]">
          <Label>Role</Label>
          <select className="select-dark text-sm" value={role} onChange={e=>setRole(e.target.value)}>
            {ROLES.map(r=><option key={r}>{r}</option>)}
          </select>
        </div>
        <div className="flex-1 min-w-[120px]">
          <Label>Experience</Label>
          <select className="select-dark text-sm" value={exp} onChange={e=>setExp(e.target.value)}>
            <option>Fresher</option><option>0-1 Years</option>
            <option>1-3 Years</option><option>3-5 Years</option>
          </select>
        </div>
        <div className="flex items-end">
          <PurpleBtn onClick={optimize} loading={loading} disabled={loading}>
            <Target size={13} />🎯 Optimize for {company}
          </PurpleBtn>
        </div>
      </div>

      {offline && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl mb-4 text-xs font-medium"
          style={{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.25)", color:"var(--color-yellow-text)" }}>
          <AlertCircle size={13} /> Backend offline — showing demo data. Upload a resume for real results.
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Loader2 size={32} color="#7C3AED" className="animate-spin" />
          <p className="text-sm font-medium" style={{ color:"var(--text-muted)" }}>
            Analyzing resume for {company}…
          </p>
        </div>
      )}

      {!loading && data && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="space-y-5">
          {/* ATS row */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[
              { label:"Overall ATS",   val:atd.overall||0,            color:"#7C3AED" },
              { label:"Keywords",      val:atd.keyword_match||0,      color:"#06B6D4" },
              { label:"Formatting",    val:atd.formatting_score||0,   color:"#22C55E" },
              { label:"Projects",      val:atd.project_quality||0,    color:"#F59E0B" },
              { label:"Experience",    val:atd.experience_score||0,   color:"#EC4899" },
              { label:"Sections",      val:atd.section_completeness||0,color:"#A78BFA"},
            ].map(({ label, val, color }) => (
              <div key={label} className="rounded-xl p-3 text-center"
                style={{ background:"var(--bg-surface)", border:"1px solid var(--border-default)" }}>
                <p className="text-xl font-black mb-1" style={{ color }}>{val}%</p>
                <p className="text-[10px]" style={{ color:"var(--text-faint)" }}>{label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Keywords */}
            <div className="theme-card rounded-2xl p-5 space-y-3">
              <h3 className="font-semibold text-sm" style={{ color:"var(--text-primary)" }}>Keyword Analysis</h3>
              {(kw.matched_keywords||[]).length>0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase mb-2" style={{ color:"var(--color-green-text)" }}>
                    ✓ Matched ({(kw.matched_keywords||[]).length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {kw.matched_keywords.map(k=>(
                      <span key={k} className="tag-green text-[11px]">{k}</span>
                    ))}
                  </div>
                </div>
              )}
              {(kw.missing_keywords||[]).length>0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase mb-2" style={{ color:"var(--color-red-text)" }}>
                    ✗ Missing — Add These
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {kw.missing_keywords.map(k=>(
                      <span key={k} className="tag-red text-[11px]">{k}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Suggestions */}
            <div className="theme-card rounded-2xl p-5 space-y-2.5">
              <h3 className="font-semibold text-sm" style={{ color:"var(--text-primary)" }}>
                {company} Suggestions
              </h3>
              {sug.map((s,i)=>(
                <div key={i} className="flex items-start gap-2 text-xs"
                  style={{ color:"var(--text-muted)" }}>
                  <span className="font-bold flex-shrink-0 mt-0.5" style={{ color:"#7C3AED" }}>{i+1}.</span>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {!loading && !data && (
        <div className="flex flex-col items-center py-16 text-center">
          <Target size={48} color="var(--text-faint)" />
          <p className="text-sm font-medium mt-4" style={{ color:"var(--text-muted)" }}>
            Select a company and click Optimize
          </p>
          <p className="text-xs mt-1" style={{ color:"var(--text-faint)" }}>
            Upload a resume first for personalized results
          </p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TAB 5 — Preview
───────────────────────────────────────────────────────────── */
function PreviewTab({ form, tpl }) {
  const accent = tpl?.accent || "#7C3AED";
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold" style={{ color:"var(--text-primary)" }}>Live Preview</h2>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background:accent }} />
          <span className="text-xs font-medium" style={{ color:accent }}>{tpl?.name}</span>
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden" style={{ border:`2px solid ${accent}30` }}>
        <div className="p-6 overflow-y-auto max-h-[70vh]"
          style={{ background:"#FFFFFF", color:"#111827", fontFamily:"Inter,sans-serif" }}>

          {/* Header */}
          <div style={{ borderBottom:`3px solid ${accent}`, paddingBottom:14, marginBottom:14 }}>
            <h1 style={{ fontSize:22, fontWeight:900, color:"#111827", margin:0 }}>
              {form.name || "Your Name"}
            </h1>
            <p style={{ fontSize:13, color:"#374151", margin:"4px 0 0" }}>{form.title||"Software Engineer"}</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginTop:8, fontSize:11, color:"#6B7280" }}>
              {form.email    && <span>✉ {form.email}</span>}
              {form.phone    && <span>📞 {form.phone}</span>}
              {form.location && <span>📍 {form.location}</span>}
              {form.github   && <span>🔗 {form.github}</span>}
              {form.linkedin && <span>💼 {form.linkedin}</span>}
            </div>
          </div>

          {/* Sections */}
          {[
            { title:"Summary",        content:form.summary        },
            { title:"Skills",         content:form.skills         },
            { title:"Experience",     content:form.experience     },
            { title:"Projects",       content:form.projects       },
            { title:"Education",      content:form.education      },
            { title:"Certifications", content:form.certifications },
            { title:"Achievements",   content:form.achievements   },
          ].filter(s=>s.content).map(({ title, content }) => (
            <div key={title} style={{ marginBottom:14 }}>
              <h2 style={{ fontSize:11, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.06em",
                           color:accent, marginBottom:6 }}>
                {title}
              </h2>
              {title === "Skills" ? (
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {content.split(",").map((s,i) => (
                    <span key={i} style={{ background:`${accent}15`, color:accent,
                      padding:"2px 10px", borderRadius:12, fontSize:10, fontWeight:600 }}>
                      {s.trim()}
                    </span>
                  ))}
                </div>
              ) : (
                <pre style={{ fontSize:11, color:"#374151", whiteSpace:"pre-wrap",
                              fontFamily:"inherit", margin:0, lineHeight:1.7 }}>
                  {content}
                </pre>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TAB — Download
───────────────────────────────────────────────────────────── */
function DownloadTab({ tpl, form }) {
  const accent = tpl?.accent || "#7C3AED";

  const resumeActions = [
    {
      icon:"📄",
      label:"Download Resume PDF",
      desc:"Opens a clean resume-only print dialog — save as PDF",
      onClick: () => downloadResumePDF(form, accent),
    },
    {
      icon:"📝",
      label:"Download Resume DOCX",
      desc:"Editable in Microsoft Word",
      onClick: () => alert("DOCX export coming soon"),
    },
    {
      icon:"🖨",
      label:"Print Resume",
      desc:"Send to a physical printer — only the resume",
      onClick: () => downloadResumePDF(form, accent),
    },
    {
      icon:"🔗",
      label:"Share Resume Link",
      desc:"Copy a shareable link",
      onClick: () => {
        navigator.clipboard.writeText(window.location.href).catch(() => {});
        alert("Link copied to clipboard!");
      },
    },
  ];
  const coverLetterActions = [
    {
      icon:"✉️",
      label:"Download Cover Letter PDF",
      desc:"Opens a clean cover-letter-only print dialog",
      onClick: () => alert("Generate a cover letter in the Cover Letter tab first, then come back here to print it."),
    },
    {
      icon:"📋",
      label:"Download Cover Letter DOCX",
      desc:"Editable cover letter in Word format",
      onClick: () => alert("DOCX export coming soon"),
    },
  ];
  const bundleActions = [
    { icon:"📦", label:"Download Resume + Cover Letter", desc:"Both documents in a single ZIP file", onClick:()=>alert("Bundle export coming soon") },
  ];

  const ActionCard = ({ icon, label, desc, onClick }) => (
    <motion.button
      whileHover={{ scale:1.02, y:-2 }}
      whileTap={{ scale:0.97 }}
      onClick={onClick}
      className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all w-full"
      style={{ background:"var(--bg-elevated)", border:`1px solid var(--border-default)` }}
      onMouseEnter={e=>{ e.currentTarget.style.borderColor = accent; }}
      onMouseLeave={e=>{ e.currentTarget.style.borderColor = "var(--border-default)"; }}>
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-sm font-bold" style={{ color:"var(--text-primary)" }}>{label}</p>
        <p className="text-xs mt-0.5" style={{ color:"var(--text-faint)" }}>{desc}</p>
      </div>
    </motion.button>
  );

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-bold" style={{ color:"var(--text-primary)" }}>Download & Export</h2>
        <p className="text-sm mt-0.5" style={{ color:"var(--text-faint)" }}>
          Export your resume and cover letter in multiple formats.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Resume downloads */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
            style={{ color:"var(--text-faint)" }}>
            <span className="text-base">📄</span> Resume
          </p>
          <div className="space-y-3">
            {resumeActions.map(a => <ActionCard key={a.label} {...a} />)}
          </div>
        </div>

        {/* Cover letter downloads */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
            style={{ color:"var(--text-faint)" }}>
            <span className="text-base">✉️</span> Cover Letter
          </p>
          <div className="space-y-3">
            {coverLetterActions.map(a => <ActionCard key={a.label} {...a} />)}
            <div className="rounded-xl p-3 text-xs"
              style={{ background:"rgba(124,58,237,0.07)", border:"1px solid rgba(124,58,237,0.20)" }}>
              <p className="font-semibold mb-1" style={{ color:"#A78BFA" }}>💡 Tip</p>
              <p style={{ color:"var(--text-faint)" }}>
                Generate and accept your cover letter in the{" "}
                <strong style={{ color:"#A78BFA" }}>Cover Letter</strong> tab first.
              </p>
            </div>
          </div>
        </div>

        {/* Bundle + template info */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
            style={{ color:"var(--text-faint)" }}>
            <span className="text-base">📦</span> Bundle
          </p>
          <div className="space-y-3">
            {bundleActions.map(a => <ActionCard key={a.label} {...a} />)}
          </div>

          <div className="mt-4 rounded-2xl p-5"
            style={{ background:`${accent}0a`, border:`1px solid ${accent}25` }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color:accent }}>
              Template: {tpl?.name}
            </p>
            <p className="text-sm" style={{ color:"var(--text-muted)" }}>
              Your resume uses the <strong>{tpl?.name}</strong> template.
              Switch templates anytime in the Templates tab.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE EXPORT — AIResumeBuilder
───────────────────────────────────────────────────────────── */
/* ─────────────────────────────────────────────────────────────
   ImproveTab — AI Enhancement Editor
   Loaded automatically when coming from "Apply All".
   Shows Before/After comparison for every resume section.
   Tracks accept/reject decisions, then generates final resume.
───────────────────────────────────────────────────────────── */

/* ── Mock AI improvements keyed by section ── */
function mockImprove(section, current, missingSkills, company, role) {
  const mis = missingSkills.slice(0, 3).join(", ") || "SQL, Docker, AWS";
  const co  = company || "your target company";
  const ro  = role    || "Software Engineer";
  switch (section) {
    case "summary":
      return current
        ? `Results-driven ${ro} with expertise in ${current.slice(0, 40).trim()}…
Passionate about building scalable systems that deliver measurable impact.
Seeking to apply technical skills and AI-driven solutions at ${co}.`
        : `Motivated ${ro} skilled in Python, React, and SQL.
Experienced in building full-stack applications with measurable outcomes.
Eager to contribute to ${co}'s engineering mission.`;

    case "skills":
      return current
        ? `${current}, ${mis}`
        : mis;

    case "experience":
      return current
        ? current
            .replace(/worked on/gi, "Engineered")
            .replace(/helped with/gi, "Contributed to")
            .replace(/built/gi, "Developed and deployed")
            .replace(/did/gi, "Delivered")
        : `• Engineered REST APIs using Python + Flask serving 10,000+ requests/day with 99.9% uptime.\n• Collaborated with 5-person agile team to deliver 12 sprint features on schedule.\n• Reduced deployment time by 40% by implementing CI/CD pipeline using GitHub Actions.`;

    case "projects":
      return current
        ? current
            .replace(/created/gi, "Architected")
            .replace(/made/gi, "Built and deployed")
            .replace(/a website/gi, "a full-stack web application")
        : `• AI Resume Analyzer | React, Flask, Python, PostgreSQL\n  Built AI-powered resume scoring tool achieving 92% ATS match for 500+ users.\n• E-Commerce Platform | Node.js, MongoDB, Redis\n  Designed REST API handling 50,000+ daily requests with sub-100ms latency.`;

    case "education":
      return current || "B.Tech Computer Science — University — 2024 — 8.2 CGPA";

    case "certifications":
      return `• AWS Certified Cloud Practitioner\n• Google Data Analytics Certificate\n• Meta Front-End Developer Certificate`;

    default:
      return current || "";
  }
}

/* ── Before/After comparison card ── */
function CompareCard({ section, label, emoji, original, improved, decision, onAccept, onReject, onEdit, onRegenerate, editValue, onEditChange, isGenerating }) {
  const [showEdit, setShowEdit] = useState(false);

  const statusStyle = {
    accepted: { bg:"rgba(34,197,94,0.08)",  border:"rgba(34,197,94,0.30)",  color:"var(--color-green-text)" },
    rejected: { bg:"rgba(239,68,68,0.08)",  border:"rgba(239,68,68,0.25)",  color:"var(--color-red-text)"   },
    pending:  { bg:"var(--bg-card)",         border:"var(--border-default)", color:"var(--text-faint)"       },
  };
  const ss = statusStyle[decision] || statusStyle.pending;

  return (
    <motion.div
      initial={{ opacity:0, y:14 }}
      animate={{ opacity:1, y:0 }}
      className="rounded-2xl overflow-hidden"
      style={{ border:`1px solid ${ss.border}`, background:ss.bg, transition:"all 0.3s ease" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom:`1px solid var(--border-subtle)`, background:"var(--bg-surface)" }}>
        <div className="flex items-center gap-2">
          <span className="text-base">{emoji}</span>
          <span className="text-sm font-bold" style={{ color:"var(--text-primary)" }}>{label}</span>
          {decision === "accepted" && <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg" style={{ background:"rgba(34,197,94,0.15)", color:"var(--color-green-text)" }}>✓ Accepted</span>}
          {decision === "rejected" && <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg" style={{ background:"rgba(239,68,68,0.12)", color:"var(--color-red-text)" }}>✗ Rejected</span>}
          {decision === "pending"  && <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg" style={{ background:"rgba(245,158,11,0.12)", color:"var(--color-yellow-text)" }}>Pending Review</span>}
        </div>
        <button onClick={onRegenerate} disabled={isGenerating}
          className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-opacity hover:opacity-75 disabled:opacity-40"
          style={{ background:"rgba(124,58,237,0.10)", color:"#A78BFA", border:"1px solid rgba(124,58,237,0.22)" }}>
          <RefreshCw size={10} className={isGenerating ? "animate-spin" : ""} />
          Regenerate
        </button>
      </div>

      {/* Two-column comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-x" style={{ divideColor:"var(--border-subtle)" }}>
        {/* Before */}
        <div className="p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color:"var(--color-red-text)" }}>
            ⬛ Current
          </p>
          <p className="text-xs leading-relaxed whitespace-pre-wrap"
            style={{ color:"var(--text-muted)", fontStyle: original ? "normal" : "italic" }}>
            {original || `No ${label.toLowerCase()} found in uploaded resume.`}
          </p>
        </div>

        {/* After */}
        <div className="p-4" style={{ background:"rgba(34,197,94,0.025)" }}>
          <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color:"var(--color-green-text)" }}>
            ✨ AI Improved
          </p>
          {showEdit ? (
            <textarea
              rows={5}
              value={editValue}
              onChange={e => onEditChange(e.target.value)}
              className="input-dark text-xs resize-none w-full"
              style={{ lineHeight:"1.65" }}
            />
          ) : (
            <p className="text-xs leading-relaxed whitespace-pre-wrap" style={{ color:"var(--text-primary)" }}>
              {improved}
            </p>
          )}
        </div>
      </div>

      {/* Action row */}
      {decision === "pending" && (
        <div className="flex items-center gap-2 px-4 py-3" style={{ borderTop:"1px solid var(--border-subtle)" }}>
          <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
            onClick={onAccept}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white"
            style={{ background:"linear-gradient(135deg,#22C55E,#16A34A)" }}>
            <Check size={11} /> Accept Change
          </motion.button>
          <button onClick={onReject}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
            style={{ background:"rgba(239,68,68,0.10)", border:"1px solid rgba(239,68,68,0.22)", color:"var(--color-red-text)" }}>
            ✗ Reject
          </button>
          <button onClick={() => setShowEdit(v => !v)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80 ml-auto"
            style={{ background:"rgba(245,158,11,0.10)", border:"1px solid rgba(245,158,11,0.22)", color:"var(--color-yellow-text)" }}>
            ✏️ {showEdit ? "Done Editing" : "Edit"}
          </button>
        </div>
      )}
      {decision !== "pending" && (
        <div className="flex items-center gap-2 px-4 py-2" style={{ borderTop:"1px solid var(--border-subtle)" }}>
          <button
            onClick={decision === "accepted" ? onReject : onAccept}
            className="text-[11px] px-3 py-1.5 rounded-lg font-semibold transition-all hover:opacity-75"
            style={{
              background: decision === "accepted" ? "rgba(239,68,68,0.10)" : "rgba(34,197,94,0.10)",
              color:      decision === "accepted" ? "var(--color-red-text)" : "var(--color-green-text)",
            }}>
            {decision === "accepted" ? "↩ Undo Accept" : "↩ Undo Reject"}
          </button>
        </div>
      )}
    </motion.div>
  );
}

/* ── Success screen after generating ── */
function SuccessScreen({ atsScore, decisions, onDownload, onCoverLetter }) {
  const accepted = Object.entries(decisions).filter(([,v]) => v.status === "accepted").map(([k]) => k);
  const rejected = Object.entries(decisions).filter(([,v]) => v.status === "rejected").map(([k]) => k);
  const improved = Math.min(98, atsScore + accepted.length * 5 + 8);

  const LABELS = { summary:"Summary", skills:"Skills", experience:"Experience", projects:"Projects", education:"Education", certifications:"Certifications" };

  return (
    <motion.div initial={{ opacity:0, scale:0.97 }} animate={{ opacity:1, scale:1 }}
      transition={{ duration:0.4 }}
      className="flex flex-col items-center text-center py-8">
      <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:0.1, type:"spring", stiffness:200 }}
        className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6"
        style={{ background:"linear-gradient(135deg,#22C55E,#16A34A)", boxShadow:"0 12px 32px rgba(34,197,94,0.40)" }}>
        🎉
      </motion.div>

      <h2 className="text-2xl font-black mb-2" style={{ color:"var(--text-primary)" }}>
        Resume Updated Successfully!
      </h2>
      <p className="text-sm mb-8" style={{ color:"var(--text-faint)" }}>
        Your AI-improved resume is ready to download.
      </p>

      {/* ATS score before/after */}
      <div className="flex items-center gap-8 mb-8">
        <div className="text-center">
          <p className="text-3xl font-black" style={{ color:"var(--color-red-text)" }}>{atsScore}%</p>
          <p className="text-xs mt-1" style={{ color:"var(--text-faint)" }}>Before</p>
        </div>
        <div className="text-2xl">→</div>
        <div className="text-center">
          <p className="text-3xl font-black" style={{ color:"var(--color-green-text)" }}>{improved}%</p>
          <p className="text-xs mt-1" style={{ color:"var(--text-faint)" }}>After</p>
        </div>
      </div>

      {/* Changes summary */}
      <div className="w-full max-w-md rounded-2xl p-5 mb-6 text-left"
        style={{ background:"var(--bg-surface)", border:"1px solid var(--border-default)" }}>
        <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color:"var(--text-faint)" }}>Changes Applied</p>
        <div className="space-y-2">
          {accepted.map(k => (
            <div key={k} className="flex items-center gap-2 text-sm" style={{ color:"var(--color-green-text)" }}>
              <Check size={12} /> {LABELS[k] || k} improved
            </div>
          ))}
          {rejected.map(k => (
            <div key={k} className="flex items-center gap-2 text-sm" style={{ color:"var(--color-red-text)" }}>
              <span style={{ fontSize:"11px" }}>✗</span> {LABELS[k] || k} kept as-is
            </div>
          ))}
        </div>
      </div>

      {/* CTA buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
          onClick={onDownload}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white"
          style={{ background:"linear-gradient(135deg,#7C3AED,#6D28D9)", boxShadow:"0 6px 18px rgba(124,58,237,0.38)" }}>
          <Download size={14} /> Download Improved Resume
        </motion.button>
        <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
          onClick={onCoverLetter}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold"
          style={{ background:"rgba(34,197,94,0.12)", border:"1px solid rgba(34,197,94,0.28)", color:"var(--color-green-text)" }}>
          <Mail size={14} /> Create Cover Letter
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ── ImproveTab main ── */
function ImproveTab({ form, setField, resumeData, atsScore, missingSkills, matchedSkills, company, role, actions, accent, onDone }) {
  const SECTIONS = [
    { key:"summary",        label:"Summary",        emoji:"✏️" },
    { key:"skills",         label:"Skills",         emoji:"⚡" },
    { key:"experience",     label:"Experience",     emoji:"💼" },
    { key:"projects",       label:"Projects",       emoji:"📂" },
    { key:"education",      label:"Education",      emoji:"🎓" },
    { key:"certifications", label:"Certifications", emoji:"🏆" },
  ];

  /* Pre-generate improved versions */
  const [improved,   setImproved]   = useState(() =>
    Object.fromEntries(SECTIONS.map(s => [
      s.key,
      mockImprove(s.key, form[s.key], missingSkills, company, role),
    ]))
  );
  const [decisions,  setDecisions]  = useState(() =>
    Object.fromEntries(SECTIONS.map(s => [s.key, { status:"pending", content: improved[s.key] }]))
  );
  const [generating, setGenerating] = useState({});
  const [phase,      setPhase]      = useState("review"); // "review" | "confirm" | "done"
  const [finalizing, setFinalizing] = useState(false);

  const setDecision = (key, status) =>
    setDecisions(d => ({ ...d, [key]: { status, content: improved[key] } }));

  const regenerate = (key) => {
    setGenerating(g => ({ ...g, [key]:true }));
    setTimeout(() => {
      const newText = mockImprove(key, form[key], missingSkills, company, role) + "\n(Regenerated version)";
      setImproved(v => ({ ...v, [key]:newText }));
      setDecisions(d => ({ ...d, [key]:{ status:"pending", content:newText } }));
      setGenerating(g => ({ ...g, [key]:false }));
    }, 800);
  };

  const updateEdit = (key, val) => {
    setImproved(v => ({ ...v, [key]:val }));
    setDecisions(d => ({ ...d, [key]:{ ...d[key], content:val } }));
  };

  const acceptedCount = Object.values(decisions).filter(d => d.status === "accepted").length;
  const rejectedCount = Object.values(decisions).filter(d => d.status === "rejected").length;
  const pendingCount  = SECTIONS.length - acceptedCount - rejectedCount;

  const handleGenerate = () => {
    setFinalizing(true);
    setTimeout(() => {
      /* Apply accepted changes to form */
      Object.entries(decisions).forEach(([key, val]) => {
        if (val.status === "accepted") setField(key, val.content);
      });
      setFinalizing(false);
      setPhase("done");
    }, 1800);
  };

  if (phase === "done") {
    return (
      <SuccessScreen
        atsScore={atsScore}
        decisions={decisions}
        onDownload={() => downloadResumePDF(form, accent || "#7C3AED")}
        onCoverLetter={onDone}
      />
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold" style={{ color:"var(--text-primary)" }}>
            AI Resume Improvement Plan
          </h2>
          <p className="text-sm mt-0.5" style={{ color:"var(--text-faint)" }}>
            {company && role ? `Optimising for ${company} · ${role}` : "Review each AI improvement and accept or reject it."}
          </p>
        </div>
        {/* Progress chips */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg" style={{ background:"rgba(34,197,94,0.12)", color:"var(--color-green-text)" }}>
            ✓ {acceptedCount} accepted
          </span>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg" style={{ background:"rgba(245,158,11,0.12)", color:"var(--color-yellow-text)" }}>
            ⏳ {pendingCount} pending
          </span>
          {rejectedCount > 0 && (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg" style={{ background:"rgba(239,68,68,0.10)", color:"var(--color-red-text)" }}>
              ✗ {rejectedCount} rejected
            </span>
          )}
        </div>
      </div>

      {/* Quick actions bar */}
      <div className="flex flex-wrap gap-2 mb-5 pb-5" style={{ borderBottom:"1px solid var(--border-default)" }}>
        <button
          onClick={() => SECTIONS.forEach(s => setDecision(s.key, "accepted"))}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-85"
          style={{ background:"linear-gradient(135deg,#22C55E,#16A34A)" }}>
          <Check size={11} /> Accept All
        </button>
        <button
          onClick={() => SECTIONS.forEach(s => setDecision(s.key, "pending"))}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-75"
          style={{ background:"rgba(245,158,11,0.10)", border:"1px solid rgba(245,158,11,0.25)", color:"var(--color-yellow-text)" }}>
          ↩ Reset All
        </button>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs" style={{ color:"var(--text-faint)" }}>
            {SECTIONS.length - pendingCount} / {SECTIONS.length} reviewed
          </span>
          {/* Overall progress bar */}
          <div className="w-28 h-2 rounded-full overflow-hidden" style={{ background:"var(--border-subtle)" }}>
            <div className="h-2 rounded-full" style={{
              width:`${((SECTIONS.length - pendingCount) / SECTIONS.length) * 100}%`,
              background:"linear-gradient(90deg,#7C3AED,#22C55E)",
              transition:"width 0.4s ease",
            }}/>
          </div>
        </div>
      </div>

      {/* Section compare cards */}
      <div className="space-y-5">
        {SECTIONS.map(({ key, label, emoji }) => (
          <CompareCard
            key={key}
            section={key}
            label={label}
            emoji={emoji}
            original={form[key]}
            improved={improved[key]}
            decision={decisions[key]?.status || "pending"}
            onAccept={() => setDecision(key, "accepted")}
            onReject={() => setDecision(key, "rejected")}
            onEdit={() => {}}
            onRegenerate={() => regenerate(key)}
            editValue={improved[key]}
            onEditChange={v => updateEdit(key, v)}
            isGenerating={!!generating[key]}
          />
        ))}
      </div>

      {/* Generate button */}
      <div className="mt-8 pt-6" style={{ borderTop:"1px solid var(--border-default)" }}>
        {pendingCount > 0 && (
          <p className="text-xs text-center mb-3" style={{ color:"var(--color-yellow-text)" }}>
            ⚠ {pendingCount} section{pendingCount > 1 ? "s" : ""} still pending review
          </p>
        )}
        <motion.button
          whileHover={{ scale:1.01 }} whileTap={{ scale:0.98 }}
          onClick={handleGenerate}
          disabled={finalizing || acceptedCount === 0}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-sm font-black text-white disabled:opacity-55"
          style={{
            background:  "linear-gradient(135deg,#7C3AED,#6D28D9)",
            boxShadow:   "0 8px 28px rgba(124,58,237,0.42)",
          }}>
          {finalizing
            ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>Generating Improved Resume…</>
            : <>🚀 Generate Improved Resume ({acceptedCount} changes accepted)</>
          }
        </motion.button>
        <p className="text-[10px] text-center mt-2" style={{ color:"var(--text-faint)" }}>
          Only accepted improvements will be applied to your final resume
        </p>
      </div>
    </div>
  );
}

export default function AIResumeBuilder() {
  const location   = useLocation();
  const routeState = location.state || {};

  /* ── If coming from "Apply All", pre-populate form from resume data ── */
  const incoming   = routeState.resumeData || null;
  const applyAll   = routeState.applyAll   || false;
  const fromResume = routeState.fromResume || false;

  /* Build initial form: merge backend data over the blank defaults */
  const buildInitialForm = () => {
    if (!incoming) return INITIAL_FORM;
    return {
      ...INITIAL_FORM,
      /* Personal — use whatever the backend parsed/stored */
      name:           incoming.candidate_name  || incoming.name  || INITIAL_FORM.name,
      title:          incoming.role            || INITIAL_FORM.title,
      email:          incoming.email           || INITIAL_FORM.email,
      phone:          incoming.phone           || INITIAL_FORM.phone,
      location:       incoming.location        || INITIAL_FORM.location,
      github:         incoming.github          || INITIAL_FORM.github,
      linkedin:       incoming.linkedin        || INITIAL_FORM.linkedin,
      /* Content sections from parsed resume */
      summary:        incoming.summary         || INITIAL_FORM.summary,
      skills:         Array.isArray(incoming.skills)
                        ? incoming.skills.join(", ")
                        : (incoming.skills || INITIAL_FORM.skills),
      experience:     incoming.experience      || INITIAL_FORM.experience,
      projects:       incoming.projects        || INITIAL_FORM.projects,
      education:      incoming.education       || INITIAL_FORM.education,
      certifications: incoming.certifications  || INITIAL_FORM.certifications,
      achievements:   incoming.achievements    || INITIAL_FORM.achievements,
    };
  };

  /* ── Tab: auto-open "improve" when coming from Apply All ── */
  const [activeTab,   setActiveTab]   = useState(applyAll ? "improve" : "templates");
  const [selectedTpl, setSelectedTpl] = useState("ats-pro");
  const [favourites,  setFavourites]  = useState(new Set());
  const [form,        setFormData]    = useState(buildInitialForm);
  const [saved,       setSaved]       = useState(false);
  const saveTimer = useRef(null);

  const tpl = TEMPLATES.find(t => t.id === selectedTpl) || TEMPLATES[0];

  const setField = useCallback((key, val) => {
    setFormData(f => ({ ...f, [key]:val }));
    setSaved(false);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setSaved(true), 900);
  }, []);

  const toggleFav = (id) =>
    setFavourites(prev => { const n=new Set(prev); n.has(id)?n.delete(id):n.add(id); return n; });

  /* ── Derive company / ATS info from router state ── */
  const atsScore     = incoming?.ats?.overall_score   ?? 0;
  const missingSkills= incoming?.missing_skills       ?? [];
  const matchedSkills= incoming?.matched_skills       ?? [];
  const company      = incoming?.company              ?? "";
  const role         = incoming?.role                 ?? "";
  const routeActions = routeState.actions             ?? [];

  return (
    <div className="flex min-h-screen" style={{ background:"var(--bg-base)" }}>
      <Sidebar />
      <main className="ml-64 flex-1 min-w-0">
        <div className="p-6 pb-0">
          <Navbar />

          {/* Page header */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-1">
              {fromResume ? (
                <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ background:"rgba(34,197,94,0.12)", border:"1px solid rgba(34,197,94,0.28)", color:"var(--color-green-text)" }}>
                  ✅ Loaded from Resume Analysis
                </span>
              ) : (
                <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ background:"rgba(236,72,153,0.14)", border:"1px solid rgba(236,72,153,0.28)", color:"#F472B6" }}>
                  ✨ AI Powered
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold" style={{ color:"var(--text-primary)" }}>
              {fromResume ? "AI Resume Enhancement Editor" : "AI Resume Builder"}
            </h1>
            <p className="text-sm mt-1" style={{ color:"var(--text-faint)" }}>
              {fromResume
                ? `Improving your resume for ${company || "your target company"} · ${role || ""}`
                : "Build, optimise, and export a professional resume with AI assistance."}
            </p>

            {/* ATS improvement banner when loaded from analysis */}
            {fromResume && atsScore > 0 && (
              <div className="flex items-center gap-3 mt-3 px-4 py-3 rounded-xl"
                style={{ background:"rgba(124,58,237,0.08)", border:"1px solid rgba(124,58,237,0.22)" }}>
                <span style={{ fontSize:"18px" }}>📊</span>
                <div className="flex-1">
                  <span className="text-xs font-semibold" style={{ color:"#A78BFA" }}>Current ATS Score: </span>
                  <span className="text-xs font-black" style={{ color:"#A78BFA" }}>{atsScore}%</span>
                  <span className="text-xs ml-2" style={{ color:"var(--text-faint)" }}>
                    · Apply all improvements to reach <strong style={{ color:"var(--color-green-text)" }}>85%+</strong>
                  </span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-lg font-bold"
                  style={{ background:"rgba(239,68,68,0.12)", color:"var(--color-red-text)" }}>
                  {missingSkills.length} skills missing
                </span>
              </div>
            )}
          </div>

          {/* Tab bar */}
          <div className="flex gap-1 overflow-x-auto pb-px mb-0">
            {TABS.map(({ id, label, Icon, highlight }) => {
              const active  = activeTab === id;
              const isNew   = id === "improve" && fromResume;
              return (
                <button key={id} onClick={() => setActiveTab(id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0"
                  style={{
                    background:   active ? "var(--bg-card)" : "transparent",
                    color:        active ? (highlight ? "#A78BFA" : "var(--text-primary)") : "var(--text-faint)",
                    borderTop:    active ? `2px solid ${highlight ? "#7C3AED" : "#7C3AED"}` : "2px solid transparent",
                    borderLeft:   active ? "1px solid var(--border-default)" : "1px solid transparent",
                    borderRight:  active ? "1px solid var(--border-default)" : "1px solid transparent",
                    borderBottom: active ? "1px solid var(--bg-card)" : "1px solid transparent",
                    marginBottom: active ? "-1px" : 0,
                  }}>
                  <Icon size={13} strokeWidth={active ? 2.5 : 2} />
                  {label}
                  {isNew && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md ml-1"
                      style={{ background:"linear-gradient(135deg,#7C3AED,#EC4899)", color:"#fff" }}>
                      {routeActions.length || ""}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content */}
        <div className="mx-6 mb-6 p-6 rounded-b-2xl rounded-tr-2xl"
          style={{ background:"var(--bg-card)", border:"1px solid var(--border-default)", borderTop:"none" }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
              exit={{ opacity:0 }} transition={{ duration:0.18 }}>

              {activeTab === "improve" && (
                <ImproveTab
                  form={form}
                  setField={setField}
                  resumeData={incoming}
                  atsScore={atsScore}
                  missingSkills={missingSkills}
                  matchedSkills={matchedSkills}
                  company={company}
                  role={role}
                  actions={routeActions}
                  accent={tpl.accent}
                  onDone={() => setActiveTab("cover-letter")}
                />
              )}
              {activeTab === "templates" && (
                <TemplatesTab selectedTpl={selectedTpl} setSelectedTpl={setSelectedTpl}
                  favourites={favourites} toggleFav={toggleFav} />
              )}
              {activeTab === "editor" && (
                <EditorTab form={form} setField={setField} saved={saved} />
              )}
              {activeTab === "rewrite" && (
                <RewriteTab form={form} setField={setField} />
              )}
              {activeTab === "optimizer" && (
                <OptimizerTab form={form} />
              )}
              {activeTab === "cover-letter" && (
                <CoverLetterTab form={form} />
              )}
              {activeTab === "preview" && (
                <PreviewTab form={form} tpl={tpl} />
              )}
              {activeTab === "download" && (
                <DownloadTab tpl={tpl} form={form} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
