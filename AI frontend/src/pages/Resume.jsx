import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ResumeUpload from "../components/ResumeUpload";
import CompanySelection from "../components/CompanySelection";
import ResumeAnalysis from "../components/ResumeAnalysis";
import RequiredSkills from "../components/RequiredSkills";
import ResumeCoachCard from "../components/ResumeCoachCard";

/* ── Skeleton shimmer block ── */
function SkeletonCard({ rows = 5 }) {
  return (
    <div className="theme-card rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl shimmer" style={{ background: "var(--border-subtle)" }} />
        <div className="h-4 rounded-xl shimmer w-40" style={{ background: "var(--border-subtle)" }} />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-3 rounded-xl shimmer"
          style={{ background: "var(--border-subtle)", width: i % 2 === 0 ? "100%" : "70%" }} />
      ))}
    </div>
  );
}

function Resume() {
  const [resumeData,       setResumeData]       = useState(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [isAnalyzing,      setIsAnalyzing]      = useState(false);

  console.log("Resume Page State:", resumeData);

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />
      <main className="ml-64 flex-1 p-6 min-w-0">
        <Navbar />

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-7">
          <h1 className="text-3xl font-bold" style={{ color: "var(--text-primary)" }}>
            Resume Management
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-faint)" }}>
            Upload your resume and get AI-powered feedback instantly.
          </p>
        </motion.div>

        {/* Upload + Company selector */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResumeUpload
            setResumeData={setResumeData}
            setAnalysisComplete={setAnalysisComplete}
          />
          <CompanySelection
            resumeData={resumeData}
            setResumeData={setResumeData}
            setAnalysisComplete={setAnalysisComplete}
            setIsAnalyzing={setIsAnalyzing}
          />
        </div>

        {/* ── Results area ── */}

        {/* Loading skeleton while analysis is running */}
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"
          >
            <SkeletonCard rows={6} />
            <SkeletonCard rows={5} />
          </motion.div>
        )}

        {/* Results — only shown after a completed analysis */}
        {analysisComplete && !isAnalyzing && (
          <motion.div
            key={`${resumeData?.company}-${resumeData?.role}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Two-column: ResumeAnalysis + RequiredSkills */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <ResumeAnalysis resumeData={resumeData} />
              <RequiredSkills resumeData={resumeData} />
            </div>

            {/* Full-width AI Coach card below */}
            <div className="mt-6">
              <ResumeCoachCard resumeData={resumeData} />
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default Resume;
