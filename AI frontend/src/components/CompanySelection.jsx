import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaSpinner } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const API = "http://127.0.0.1:5000";

function CompanySelection({ resumeData, setResumeData, setAnalysisComplete }) {
  /* ── dropdown data from /companies ── */
  const [companyList, setCompanyList] = useState([]);   // [{ name, roles, ... }]
  const [roleList,    setRoleList]    = useState([]);   // ["Software Engineer", ...]
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [loadingRoles,     setLoadingRoles]     = useState(false);

  /* ── form state ── */
  const [company,    setCompany]    = useState("");
  const [role,       setRole]       = useState("");
  const [experience, setExperience] = useState("Fresher");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  /* ── 1. Fetch company list on mount ── */
  useEffect(() => {
    setLoadingCompanies(true);
    fetch(`${API}/companies`)
      .then((r) => r.json())
      .then((data) => {
        // data is an array of company meta objects
        setCompanyList(Array.isArray(data) ? data : []);
        if (data.length > 0) {
          setCompany(data[0].name);          // pre-select first company
        }
      })
      .catch(() => {
        // backend offline — fallback so the UI is still usable
        const fallback = [
          "Google","Microsoft","Amazon","Meta","Netflix",
          "Adobe","TCS","Infosys","Wipro","Accenture",
          "Cognizant","IBM","Oracle","Salesforce","NVIDIA",
        ].map((n) => ({ name: n, roles: ["Software Engineer"] }));
        setCompanyList(fallback);
        setCompany(fallback[0].name);
      })
      .finally(() => setLoadingCompanies(false));
  }, []);

  /* ── 2. Fetch roles whenever company changes ── */
  useEffect(() => {
    if (!company) return;

    // check if roles are already embedded in companyList
    const cached = companyList.find((c) => c.name === company);
    if (cached?.roles?.length) {
      setRoleList(cached.roles);
      setRole(cached.roles[0]);
      return;
    }

    // otherwise hit the per-company endpoint
    setLoadingRoles(true);
    fetch(`${API}/companies/${encodeURIComponent(company)}/roles`)
      .then((r) => r.json())
      .then((data) => {
        const roles = Array.isArray(data.roles) ? data.roles : ["Software Engineer"];
        setRoleList(roles);
        setRole(roles[0]);
      })
      .catch(() => {
        setRoleList(["Software Engineer"]);
        setRole("Software Engineer");
      })
      .finally(() => setLoadingRoles(false));
  }, [company]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── 3. Analyze (unchanged logic) ── */
  const analyzeResume = async () => {
    if (!resumeData?.uploaded) { alert("Please upload your resume first."); return; }
    setIsAnalyzing(true);
    try {
      const response = await fetch(`${API}/analyze`, {
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

  /* ── render ── */
  return (
    <div className="theme-card rounded-2xl p-6">
      {/* Header — unchanged */}
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

        {/* ── Target Company dropdown ── */}
        <div>
          <label
            className="text-xs font-semibold uppercase tracking-wider block mb-2"
            style={{ color: "var(--text-faint)" }}
          >
            Target Company
          </label>
          <div className="relative">
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              disabled={loadingCompanies}
              className="select-dark"
            >
              {loadingCompanies ? (
                <option>Loading companies…</option>
              ) : (
                companyList.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))
              )}
            </select>

            {/* Spinner overlay while fetching */}
            {loadingCompanies && (
              <FaSpinner
                className="animate-spin absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--color-indigo-text)", fontSize: "12px" }}
              />
            )}
          </div>
        </div>

        {/* ── Job Role dropdown (was free-text input) ── */}
        <div>
          <label
            className="text-xs font-semibold uppercase tracking-wider block mb-2"
            style={{ color: "var(--text-faint)" }}
          >
            Job Role
          </label>
          <div className="relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loadingRoles || roleList.length === 0}
              className="select-dark"
            >
              {loadingRoles ? (
                <option>Loading roles…</option>
              ) : roleList.length === 0 ? (
                <option>Select a company first</option>
              ) : (
                roleList.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))
              )}
            </select>

            {loadingRoles && (
              <FaSpinner
                className="animate-spin absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--color-indigo-text)", fontSize: "12px" }}
              />
            )}
          </div>
        </div>

        {/* ── Experience — unchanged ── */}
        <div>
          <label
            className="text-xs font-semibold uppercase tracking-wider block mb-2"
            style={{ color: "var(--text-faint)" }}
          >
            Experience Level
          </label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="select-dark"
          >
            <option>Fresher</option>
            <option>0-1 Years</option>
            <option>1-3 Years</option>
            <option>3-5 Years</option>
          </select>
        </div>

        {/* ── Info chip — unchanged ── */}
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
            <strong style={{ color: "var(--color-indigo-text)" }}>{company || "—"}</strong>
            {" · "}
            <strong style={{ color: "var(--color-indigo-text)" }}>{role || "—"}</strong>
          </span>
        </div>

        {/* ── Analyze button — unchanged ── */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={analyzeResume}
          disabled={isAnalyzing || loadingCompanies || !company || !role}
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
