/**
 * AICoach.jsx — AI Career Coach Chat
 * Conversational chat interface. Messages sent to POST /resume-coach
 * context, with rule-based responses (LLM-ready).
 */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar  from "../components/Navbar";

const QUICK_PROMPTS = [
  "How do I improve my ATS score?",
  "What skills does Google look for in a Software Engineer?",
  "How should I prepare for Amazon's Leadership Principles?",
  "Rewrite my project bullet points",
  "What certifications should I get for cloud roles?",
  "How do I negotiate salary as a fresher?",
  "What should my resume summary say?",
  "Which companies are best for freshers?",
];

/* ── Rule-based response engine (swap body for LLM call) ── */
function getAIResponse(userMsg) {
  const msg = userMsg.toLowerCase();

  if (msg.includes("ats"))
    return `**Improving Your ATS Score**\n\n1. **Use exact keywords** from the job description — don't paraphrase\n2. **Standard section headings**: Experience, Education, Skills, Projects\n3. **Quantify everything**: "Improved performance by 40%" beats "Improved performance"\n4. **No tables/columns** — ATS parsers struggle with them\n5. **Add your GitHub/LinkedIn** — many ATS systems scan for online presence\n\nYour current score can reach **90%+** by adding missing skills as project keywords.`;

  if (msg.includes("google"))
    return `**Google Interview Preparation**\n\n🔑 **What Google Looks For:**\n- Strong **DSA fundamentals** — practice LeetCode Medium/Hard daily\n- **System Design** depth — read "Designing Data-Intensive Applications"\n- **Googleyness** — intellectual humility, collaboration, impact-driven thinking\n- **Open-source contributions** — highly valued\n\n📋 **Resume Tips for Google:**\n- Highlight scalable systems you've built\n- Add measurable impact: "Served 1M+ requests/day"\n- Include any competitive programming achievements\n\n⏱ **Timeline**: 2-3 months of focused prep is ideal.`;

  if (msg.includes("amazon") || msg.includes("leadership principle"))
    return `**Amazon Leadership Principles (LPs)**\n\nAmazon evaluates every candidate against their 16 LPs. The most commonly tested:\n\n1. **Customer Obsession** — always start with the customer's need\n2. **Ownership** — act beyond your job description, own outcomes\n3. **Bias for Action** — calculated risks > endless deliberation\n4. **Dive Deep** — data and details matter\n5. **Deliver Results** — focus on measurable outcomes\n\n📝 **STAR Format is mandatory:**\n- **S**ituation → **T**ask → **A**ction → **R**esult\n- Every behavioural answer needs a quantified Result\n\n💡 Prepare 2-3 stories per LP. Amazon interviewers will probe deeply.`;

  if (msg.includes("salary") || msg.includes("negotiat"))
    return `**Salary Negotiation as a Fresher**\n\n1. **Research first**: Check Glassdoor, LinkedIn Salary, AmbitionBox for the role\n2. **Don't anchor first**: Let them make the initial offer\n3. **Negotiate the full package**: Base + Variable + Stock (ESOPs) + Joining Bonus\n4. **Use competing offers**: Even one other offer gives you leverage\n5. **Be specific**: "Based on my research, ₹8-10 LPA is fair for this role" works better than "I want more"\n\n📊 **Fresher market rates (2025):**\n- Product companies: ₹15-35 LPA\n- Service companies: ₹3.5-8 LPA\n- Startups: ₹8-20 LPA + ESOPs`;

  if (msg.includes("summary") || msg.includes("professional summary"))
    return `**Writing a Strong Resume Summary**\n\nFormula: **[Role] + [Top 2-3 Skills] + [Years/Level] + [What you want to achieve]**\n\n✅ **Good Example:**\n*"Motivated Software Engineer skilled in React, Python and SQL, seeking to build scalable user-centric applications at a product-based company. Delivered 3 full-stack projects with 95%+ uptime."*\n\n❌ **Avoid:**\n- "Hard-working team player"\n- Generic statements without specifics\n- Objectives written in first person ("I am looking for...")\n\n💡 **Tailor it per company** — mention the company name and one value that aligns with their culture.`;

  if (msg.includes("cert") || msg.includes("certif"))
    return `**Top Certifications for Placement (2025)**\n\n☁️ **Cloud:**\n- AWS Cloud Practitioner (entry level, ₹0 to start)\n- Google Cloud Associate Cloud Engineer\n- Azure Fundamentals (AZ-900)\n\n🐍 **Programming:**\n- Python for Everybody (Coursera — free to audit)\n- Meta Front-End Developer Certificate\n\n📊 **Data:**\n- Google Data Analytics (Coursera)\n- IBM Data Science Professional\n\n🔒 **DevOps:**\n- Docker Certified Associate\n- Kubernetes (CKAD)\n\n💡 **Priority order for freshers**: AWS CCP → Python → Google Analytics → Azure`;

  if (msg.includes("fresher") || msg.includes("fresh graduate") || msg.includes("company for fresh"))
    return `**Best Companies for Freshers (2025)**\n\n🏆 **Product Companies (High Package):**\n- Google, Microsoft, Amazon: ₹18-35 LPA (very competitive)\n- Adobe, Salesforce, Oracle: ₹14-24 LPA\n- Flipkart, Swiggy, Razorpay: ₹12-22 LPA\n\n⚙️ **Service Companies (Easier Entry):**\n- TCS NQT, Infosys InfyTQ: ₹3.5-6 LPA (high volume hiring)\n- Accenture, Wipro, Cognizant: ₹4-8 LPA\n\n🚀 **Startups (Best Learning):**\n- Freshworks, BrowserStack, Postman: ₹10-20 LPA\n- CRED, Groww, PhonePe: ₹15-28 LPA\n\n💡 **Strategy**: Apply to all tiers. Use service company offers as backup while preparing for product companies.`;

  if (msg.includes("skill") || msg.includes("learn") || msg.includes("roadmap"))
    return `**2025 Software Engineering Skills Roadmap**\n\n**Core (everyone must have):**\n→ DSA + Problem Solving (LeetCode)\n→ One language deeply (Java or Python)\n→ SQL + Databases\n→ Git + GitHub\n→ REST APIs\n\n**Differentiate yourself:**\n→ Docker + Basic Kubernetes\n→ One cloud platform (AWS free tier)\n→ React or Spring Boot\n→ System Design basics\n\n**For AI/ML roles:**\n→ Python + Pandas + NumPy\n→ Scikit-learn + PyTorch basics\n→ SQL + Spark\n\n⏱ **Timeline for full stack**: 6 months with 4 hours/day`;

  // Default
  return `I understand you're asking about **"${userMsg}"**.\n\nAs your AI Career Coach, I can help you with:\n\n- 📄 **Resume advice** — ATS optimisation, bullet rewrites\n- 🏢 **Company prep** — Google, Amazon, Microsoft, TCS, Infosys\n- 🎤 **Interview prep** — DSA, system design, behavioural\n- 📊 **Skill gaps** — what to learn and in what order\n- 💼 **Career strategy** — which companies to target\n\nCould you be more specific? For example: *"How do I prepare for Google?"* or *"What skills should I learn for backend roles?"*`;
}

/* ── Message bubble ─────────────────────────────────────── */
function MessageBubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-end gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold"
        style={{
          background: isUser
            ? "linear-gradient(135deg,#7C3AED,#6D28D9)"
            : "linear-gradient(135deg,#06B6D4,#0891B2)",
          color: "#fff",
        }}>
        {isUser ? "M" : "🤖"}
      </div>

      {/* Bubble */}
      <div
        className="max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
        style={{
          background: isUser
            ? "linear-gradient(135deg,rgba(124,58,237,0.22),rgba(109,40,217,0.18))"
            : "var(--bg-elevated)",
          border: isUser
            ? "1px solid rgba(124,58,237,0.35)"
            : "1px solid var(--border-default)",
          color: "var(--text-primary)",
          borderBottomRightRadius: isUser ? "4px" : "16px",
          borderBottomLeftRadius:  isUser ? "16px" : "4px",
        }}
      >
        <pre className="whitespace-pre-wrap font-sans text-sm" style={{ color:"var(--text-primary)" }}>
          {msg.content}
        </pre>
        <p className="text-[10px] mt-2 text-right" style={{ color:"var(--text-faint)" }}>
          {msg.time}
        </p>
      </div>
    </motion.div>
  );
}

export default function AICoach() {
  const [messages,  setMessages]  = useState([{
    id: 1, role: "assistant",
    content: `Hello! I'm your AI Career Coach. 👋\n\nI can help you with:\n- Resume optimisation & ATS tips\n- Company-specific interview prep (Google, Amazon, Microsoft, TCS...)\n- Skill gap analysis & learning roadmap\n- Salary negotiation strategies\n- Cover letter guidance\n\nWhat would you like to work on today?`,
    time: new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}),
  }]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const bottomRef               = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    const time = new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
    setMessages(prev => [...prev, { id: Date.now(), role:"user", content:userText, time }]);
    setInput("");
    setLoading(true);

    // Simulate typing delay
    await new Promise(r => setTimeout(r, 700 + Math.random() * 600));

    const reply = getAIResponse(userText);
    setMessages(prev => [...prev, {
      id: Date.now() + 1, role:"assistant", content:reply,
      time: new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}),
    }]);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen" style={{ background:"var(--bg-base)" }}>
      <Sidebar />
      <main className="ml-64 flex-1 p-6 min-w-0 flex flex-col" style={{ height:"100vh" }}>
        <Navbar />

        {/* Header */}
        <motion.div initial={{ opacity:0,y:-10 }} animate={{ opacity:1,y:0 }} className="mb-5 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background:"linear-gradient(135deg,#06B6D4,#0891B2)" }}>
              🤖
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color:"var(--text-primary)" }}>AI Career Coach</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background:"#22C55E", boxShadow:"0 0 6px #22C55E" }} />
                <span className="text-xs" style={{ color:"var(--color-green-text)" }}>Online · Ready to help</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col flex-1 min-h-0 gap-4">
          {/* Quick prompts */}
          <div className="flex flex-wrap gap-2 flex-shrink-0">
            {QUICK_PROMPTS.map(p => (
              <button key={p} onClick={() => sendMessage(p)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all hover:scale-[1.02]"
                style={{ background:"var(--bg-elevated)", border:"1px solid var(--border-default)", color:"var(--text-muted)" }}>
                {p}
              </button>
            ))}
          </div>

          {/* Chat area */}
          <div className="flex-1 overflow-y-auto rounded-2xl p-5 space-y-5 min-h-0"
            style={{ background:"var(--bg-surface)", border:"1px solid var(--border-default)" }}>
            {messages.map(m => <MessageBubble key={m.id} msg={m} />)}

            {/* Typing indicator */}
            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }}
                  className="flex items-end gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
                    style={{ background:"linear-gradient(135deg,#06B6D4,#0891B2)", color:"#fff" }}>
                    🤖
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-sm"
                    style={{ background:"var(--bg-elevated)", border:"1px solid var(--border-default)" }}>
                    <div className="flex items-center gap-1.5">
                      {[0,1,2].map(i => (
                        <motion.span key={i} className="w-2 h-2 rounded-full"
                          style={{ background:"var(--text-faint)" }}
                          animate={{ y:[0,-6,0] }}
                          transition={{ duration:0.7, repeat:Infinity, delay:i*0.15 }} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex-shrink-0 flex gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Ask your AI Career Coach anything…"
              className="flex-1 input-dark text-sm"
              disabled={loading}
            />
            <motion.button
              whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="px-5 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-50"
              style={{ background:"linear-gradient(135deg,#7C3AED,#6D28D9)", flexShrink:0 }}>
              Send
            </motion.button>
          </div>
        </div>
      </main>
    </div>
  );
}
