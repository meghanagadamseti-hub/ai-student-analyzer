/**
 * AICoverLetter.jsx — AI Cover Letter Generator
 * Select company, role, tone → AI generates a tailored cover letter.
 * Backend: POST /resume-coach for company context (reuses existing service).
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar  from "../components/Navbar";

const COMPANIES = [
  "Google","Microsoft","Amazon","Apple","Netflix","Meta","Adobe","Oracle",
  "IBM","Salesforce","Flipkart","Swiggy","Zomato","TCS","Infosys","Wipro",
  "Accenture","Capgemini","Cognizant","Razorpay","CRED","Freshworks",
];
const ROLES = [
  "Software Engineer","Frontend Developer","Backend Developer",
  "Full Stack Developer","Data Scientist","Machine Learning Engineer",
  "DevOps Engineer","Product Manager","QA Engineer",
];
const TONES = [
  { value:"professional", label:"Professional",  emoji:"💼", desc:"Formal, confident, enterprise-ready" },
  { value:"enthusiastic", label:"Enthusiastic",  emoji:"🔥", desc:"Energetic, passionate, startup-ready" },
  { value:"concise",      label:"Concise",       emoji:"⚡", desc:"Brief, punchy, no fluff" },
  { value:"storytelling", label:"Story-driven",  emoji:"📖", desc:"Narrative-style, memorable" },
];

/* ── Generate cover letter (rule-based, LLM-ready) ──────── */
function generateCoverLetter({ company, role, tone, name, skills, experience }) {
  const skillList = skills || "Python, React, SQL";
  const expLine   = experience === "Fresher"
    ? "As a recent graduate eager to begin my professional journey"
    : `With ${experience} of hands-on industry experience`;

  const openers = {
    professional:  `I am writing to express my strong interest in the ${role} position at ${company}.`,
    enthusiastic:  `I am thrilled to apply for the ${role} role at ${company} — a company I deeply admire!`,
    concise:       `${name} — applying for ${role} at ${company}. Here's why I'm the right fit:`,
    storytelling:  `Every great product starts with a great engineer. That's the story I want to write at ${company}.`,
  };

  const middles = {
    professional: `${expLine}, I bring proficiency in ${skillList} and a track record of building reliable, scalable systems. My approach combines technical rigour with clear communication.`,
    enthusiastic: `${expLine}, I have built projects using ${skillList} and I am obsessed with crafting products that users love. ${company}'s mission resonates deeply with me.`,
    concise:      `Skills: ${skillList}. ${expLine}. I ship clean code, work well in teams, and learn fast. That's the summary.`,
    storytelling: `It started with a side project — a small ${skillList.split(",")[0]?.trim()} app that taught me more than any course. ${expLine}, I've grown into an engineer who can design, build, and deploy production-ready systems.`,
  };

  const companyLines = {
    google:      `I am particularly drawn to Google's culture of data-driven engineering and large-scale problem solving. I have studied your system design principles and practised DSA consistently to prepare.`,
    amazon:      `Amazon's Leadership Principles — especially Customer Obsession and Ownership — align closely with how I approach every project. I believe in measuring impact and taking responsibility for outcomes.`,
    microsoft:   `Microsoft's growth mindset culture and commitment to inclusive technology deeply resonates with me. I am eager to contribute to your Azure and enterprise product ecosystem.`,
    meta:        `The opportunity to build for billions of users at Meta is incredibly exciting. I've studied how Meta approaches scalability and I bring strong React and distributed systems experience.`,
    netflix:     `Netflix's culture of Freedom and Responsibility attracts me — I thrive in high-ownership environments where engineering excellence sets the standard.`,
    default:     `${company}'s reputation for engineering excellence and innovation is what draws me to this opportunity. I am confident my skills align well with your team's needs.`,
  };

  const companyCtx = companyLines[company.toLowerCase()] || companyLines.default;

  const closings = {
    professional: `I would welcome the opportunity to discuss how I can contribute to ${company}'s engineering team. Thank you for your time and consideration.`,
    enthusiastic: `I'd love to chat about how I can bring energy and skills to your team. Let's build something great together at ${company}!`,
    concise:      `Available for a call anytime. Looking forward to contributing to ${company}.`,
    storytelling: `I want to write the next chapter of that story at ${company}. I'd love to show you what I can build.`,
  };

  return `Dear ${company} Hiring Team,

${openers[tone] || openers.professional}

${middles[tone] || middles.professional}

${companyCtx}

${closings[tone] || closings.professional}

Sincerely,
${name}`;
}

export default function AICoverLetter() {
  const [company,    setCompany]    = useState("Google");
  const [role,       setRole]       = useState("Software Engineer");
  const [tone,       setTone]       = useState("professional");
  const [name,       setName]       = useState("Meghana");
  const [skills,     setSkills]     = useState("Python, React, SQL, Git, Docker");
  const [experience, setExperience] = useState("Fresher");
  const [letter,     setLetter]     = useState("");
  const [generating, setGenerating] = useState(false);
  const [copied,     setCopied]     = useState(false);

  const generate = () => {
    setGenerating(true);
    setLetter("");
    // Simulate streaming effect
    const full = generateCoverLetter({ company, role, tone, name, skills, experience });
    let i = 0;
    const interval = setInterval(() => {
      i += 6;
      setLetter(full.slice(0, i));
      if (i >= full.length) { setLetter(full); clearInterval(interval); setGenerating(false); }
    }, 18);
  };

  const copy = () => {
    navigator.clipboard.writeText(letter).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />
      <main className="ml-64 flex-1 p-6 min-w-0">
        <Navbar />

        {/* Header */}
        <motion.div initial={{ opacity:0,y:-10 }} animate={{ opacity:1,y:0 }} className="mb-7">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
              style={{ background:"rgba(6,182,212,0.14)", border:"1px solid rgba(6,182,212,0.28)", color:"#22D3EE" }}>
              📝 AI Generated
            </span>
          </div>
          <h1 className="text-3xl font-bold" style={{ color:"var(--text-primary)" }}>AI Cover Letter Generator</h1>
          <p className="text-sm mt-1" style={{ color:"var(--text-faint)" }}>
            Generate a company-specific, role-tailored cover letter in seconds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* LEFT — configuration */}
          <div className="space-y-5">

            {/* Basic info */}
            <motion.div initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.08 }}
              className="theme-card rounded-2xl p-5 space-y-4">
              <h2 className="font-semibold text-sm" style={{ color:"var(--text-primary)" }}>Your Details</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider block mb-1.5" style={{ color:"var(--text-faint)" }}>Your Name</label>
                  <input className="input-dark text-sm" value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name" />
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider block mb-1.5" style={{ color:"var(--text-faint)" }}>Experience</label>
                  <select className="select-dark text-sm" value={experience} onChange={e=>setExperience(e.target.value)}>
                    <option>Fresher</option><option>0-1 Years</option>
                    <option>1-3 Years</option><option>3-5 Years</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider block mb-1.5" style={{ color:"var(--text-faint)" }}>Top Skills</label>
                <input className="input-dark text-sm" value={skills} onChange={e=>setSkills(e.target.value)} placeholder="Python, React, SQL..." />
              </div>
            </motion.div>

            {/* Target job */}
            <motion.div initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.12 }}
              className="theme-card rounded-2xl p-5 space-y-4">
              <h2 className="font-semibold text-sm" style={{ color:"var(--text-primary)" }}>Target Position</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider block mb-1.5" style={{ color:"var(--text-faint)" }}>Company</label>
                  <select className="select-dark text-sm" value={company} onChange={e=>setCompany(e.target.value)}>
                    {COMPANIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider block mb-1.5" style={{ color:"var(--text-faint)" }}>Role</label>
                  <select className="select-dark text-sm" value={role} onChange={e=>setRole(e.target.value)}>
                    {ROLES.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Tone picker */}
            <motion.div initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.16 }}
              className="theme-card rounded-2xl p-5">
              <h2 className="font-semibold text-sm mb-3" style={{ color:"var(--text-primary)" }}>Writing Tone</h2>
              <div className="grid grid-cols-2 gap-2">
                {TONES.map(t => (
                  <button key={t.value} onClick={() => setTone(t.value)}
                    className="flex items-start gap-2.5 p-3 rounded-xl text-left transition-all"
                    style={{
                      background: tone === t.value ? "rgba(124,58,237,0.14)" : "var(--bg-surface)",
                      border: `1px solid ${tone === t.value ? "rgba(124,58,237,0.40)" : "var(--border-default)"}`,
                    }}>
                    <span className="text-lg flex-shrink-0">{t.emoji}</span>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: tone === t.value ? "#A78BFA" : "var(--text-primary)" }}>
                        {t.label}
                      </p>
                      <p className="text-[10px] mt-0.5" style={{ color:"var(--text-faint)" }}>{t.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
              whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
              onClick={generate}
              disabled={generating}
              className="w-full py-4 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-3 disabled:opacity-60"
              style={{ background:"linear-gradient(135deg,#7C3AED,#6D28D9)", boxShadow:"0 8px 24px rgba(124,58,237,0.38)" }}>
              {generating
                ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>Generating…</>
                : <>📝 Generate Cover Letter</>
              }
            </motion.button>
          </div>

          {/* RIGHT — output */}
          <motion.div initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.18 }}
            className="theme-card rounded-2xl p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-sm" style={{ color:"var(--text-primary)" }}>
                Generated Cover Letter
              </h2>
              {letter && (
                <button onClick={copy}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                  style={{
                    background: copied ? "rgba(34,197,94,0.14)" : "rgba(124,58,237,0.12)",
                    color: copied ? "var(--color-green-text)" : "#A78BFA",
                  }}>
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </button>
              )}
            </div>

            <div className="flex-1 rounded-xl p-4 min-h-[400px]"
              style={{ background:"var(--bg-surface)", border:"1px solid var(--border-subtle)" }}>
              {letter ? (
                <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed"
                  style={{ color:"var(--text-primary)" }}>
                  {letter}
                  {generating && <span className="cursor-blink inline-block w-1.5 h-4 ml-0.5 align-middle rounded-sm" style={{ background:"#7C3AED" }} />}
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <span className="text-5xl mb-4">📄</span>
                  <p className="text-sm font-medium" style={{ color:"var(--text-muted)" }}>
                    Your cover letter will appear here
                  </p>
                  <p className="text-xs mt-1" style={{ color:"var(--text-faint)" }}>
                    Configure settings on the left and click Generate
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
