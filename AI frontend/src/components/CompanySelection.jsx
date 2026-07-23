import { useState } from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaSpinner } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

function CompanySelection({ resumeData, setResumeData, setAnalysisComplete }) {
  const [company,    setCompany]    = useState("Google");
  const [role,       setRole]       = useState("Software Engineer");
  const [experience, setExperience] = useState("Fresher");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeResume = async () => {
    if (!resumeData?.uploaded) { alert("Please upload your resume first."); return; }
    setIsAnalyzing(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ company, role, experience }),
      });
      const data = await response.json();
      console.log(data);
      setResumeData(data);
      setAnalysisComplete(true);
    } catch (error) {
      console.error(error);
      alert("Analysis failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="theme-card rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(139,92,246,0.12)", color: "var(--accent-secondary)" }}
        >
          <FaBuilding className="text-sm" />
        </div>
        <div>
          <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
            Company Assessment
          </h2>
          <p className="text-xs" style={{ color: "var(--text-faint)" }}>
            Select target company &amp; role
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Company */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider block mb-2"
            style={{ color: "var(--text-faint)" }}>
            Target Company
          </label>
          <select value={company} onChange={(e) => setCompany(e.target.value)} className="select-dark">
            <option>Google</option><option>Microsoft</option><option>Amazon</option>
            <option>Meta</option><option>Netflix</option><option>Adobe</option>
            <option>TCS</option><option>Infosys</option>
          </select>
        </div>

        {/* Role */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider block mb-2"
            style={{ color: "var(--text-faint)" }}>
            Job Role
          </label>
          <input
            type="text" value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input-dark"
            placeholder="e.g. Software Engineer"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider block mb-2"
            style={{ color: "var(--text-faint)" }}>
            Experience Level
          </label>
          <select value={experience} onChange={(e) => setExperience(e.target.value)} className="select-dark">
            <option>Fresher</option><option>0-1 Years</option>
            <option>1-3 Years</option><option>3-5 Years</option>
          </select>
        </div>

        {/* Info chip */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
          style={{
            background: "rgba(99,102,241,0.07)",
            border:     "1px solid var(--border-default)",
          }}
        >
          <HiSparkles style={{ color: "var(--color-indigo-text)" }} />
          <span style={{ color: "var(--text-muted)" }}>
            Analyzing against{" "}
            <strong style={{ color: "var(--color-indigo-text)" }}>{company}</strong>{" · "}
            <strong style={{ color: "var(--color-indigo-text)" }}>{role}</strong>
          </span>
        </div>

        {/* Analyze button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={analyzeResume}
          disabled={isAnalyzing}
          className="w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
        >
          {isAnalyzing
            ? <><FaSpinner className="animate-spin" />Analyzing Resume...</>
            : <><HiSparkles />Analyze Resume</>
          }
        </motion.button>
      </div>
    </div>
  );
}

export default CompanySelection;
