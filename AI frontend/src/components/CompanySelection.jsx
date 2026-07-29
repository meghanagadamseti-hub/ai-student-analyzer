import { useState } from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import useCompanyRoles from "../hooks/useCompanyRoles";

const API = "http://127.0.0.1:5000";

function CompanySelection({ resumeData, setResumeData, setAnalysisComplete, setIsAnalyzing }) {
  /* ── Dynamic company + role data from shared hook ── */
  const {
    companyList,
    roleList,
    company,
    setCompany,
    role,
    setRole,
    loadingCompanies,
    loadingRoles,
  } = useCompanyRoles();

  /* ── form state ── */
  const [experience,     setExperience]     = useState("Fresher");
  const [localAnalyzing, setLocalAnalyzing] = useState(false);
  const [analysisError,  setAnalysisError]  = useState(null);

  /* ── Analyze ── */
  const analyzeResume = async () => {
    if (!resumeData?.uploaded) {
      alert("Please upload your resume first.");
      return;
    }
    if (!company || !role) {
      alert("Please select a company and role.");
      return;
    }

    setAnalysisError(null);
    setAnalysisComplete(false);
    setIsAnalyzing(true);
    setLocalAnalyzing(true);

    const payload = { company, role, experience };
    console.log("[analyze] Request payload:", payload);

    try {
      const response = await fetch(`${API}/analyze`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        console.error("[analyze] Error response:", err);
        setAnalysisError({
          message:         err.error || `Server error ${response.status}`,
          available_roles: err.available_roles || [],
        });
        return;
      }

      const data = await response.json();
      console.log("[analyze] Success response:", data);
      setResumeData({ ...data, uploaded: true });
      setAnalysisComplete(true);
    } catch (error) {
      console.error("[analyze] Network error:", error);
      setAnalysisError({
        message: error.message || "Could not connect to backend.",
        available_roles: [],
      });
    } finally {
      setIsAnalyzing(false);
      setLocalAnalyzing(false);
    }
  };

  /* ── render ── */
  return (
    <div className="theme-card rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(139,92,246,0.12)", color: "var(--accent-secondary)" }}>
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

        {/* Target Company */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider block mb-2"
            style={{ color: "var(--text-faint)" }}>
            Target Company
          </label>
          <div className="relative">
            <select
              value={company}
              onChange={(e) => { setCompany(e.target.value); setAnalysisError(null); }}
              disabled={loadingCompanies}
              className="select-dark"
            >
              {loadingCompanies
                ? <option>Loading companies…</option>
                : companyList.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))
              }
            </select>
            {loadingCompanies && (
              <FaSpinner className="animate-spin absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--color-indigo-text)", fontSize: "12px" }} />
            )}
          </div>
        </div>

        {/* Job Role */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider block mb-2"
            style={{ color: "var(--text-faint)" }}>
            Job Role
          </label>
          <div className="relative">
            <select
              value={role}
              onChange={(e) => { setRole(e.target.value); setAnalysisError(null); }}
              disabled={loadingRoles}
              className="select-dark"
            >
              {loadingRoles
                ? <option>Loading roles…</option>
                : roleList.length === 0
                  ? <option value="">No roles available</option>
                  : roleList.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))
              }
            </select>
            {loadingRoles && (
              <FaSpinner className="animate-spin absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--color-indigo-text)", fontSize: "12px" }} />
            )}
          </div>
        </div>

        {/* Experience */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider block mb-2"
            style={{ color: "var(--text-faint)" }}>
            Experience Level
          </label>
          <select value={experience} onChange={(e) => setExperience(e.target.value)}
            className="select-dark">
            <option>Fresher</option>
            <option>0-1 Years</option>
            <option>1-3 Years</option>
            <option>3-5 Years</option>
          </select>
        </div>

        {/* Info chip */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
          style={{ background: "rgba(99,102,241,0.07)", border: "1px solid var(--border-default)" }}>
          <HiSparkles style={{ color: "var(--color-indigo-text)" }} />
          <span style={{ color: "var(--text-muted)" }}>
            Analyzing against{" "}
            <strong style={{ color: "var(--color-indigo-text)" }}>{company || "—"}</strong>
            {" · "}
            <strong style={{ color: "var(--color-indigo-text)" }}>{role || "—"}</strong>
          </span>
        </div>

        {/* Analysis error */}
        {analysisError && (
          <div className="rounded-xl px-4 py-3 text-xs space-y-1"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)" }}>
            <div className="flex items-center gap-2 font-semibold" style={{ color: "#f87171" }}>
              <FaExclamationTriangle />
              <span>{analysisError.message}</span>
            </div>
            {analysisError.available_roles?.length > 0 && (
              <div style={{ color: "var(--text-muted)" }}>
                <span className="font-medium">Available roles: </span>
                {analysisError.available_roles.join(", ")}
              </div>
            )}
          </div>
        )}

        {/* Analyze button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={analyzeResume}
          disabled={localAnalyzing || loadingCompanies || loadingRoles || !company || !role}
          className="w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
        >
          {localAnalyzing
            ? <><FaSpinner className="animate-spin" />Analyzing Resume…</>
            : <><HiSparkles />Analyze Resume</>
          }
        </motion.button>

      </div>
    </div>
  );
}

export default CompanySelection;
