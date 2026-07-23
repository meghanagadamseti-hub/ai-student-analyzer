import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ResumeUpload from "../components/ResumeUpload";
import CompanySelection from "../components/CompanySelection";
import ResumeAnalysis from "../components/ResumeAnalysis";
import RequiredSkills from "../components/RequiredSkills";

function Resume() {
  const [resumeData, setResumeData]           = useState(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResumeUpload setResumeData={setResumeData} setAnalysisComplete={setAnalysisComplete} />
          <CompanySelection resumeData={resumeData} setResumeData={setResumeData} setAnalysisComplete={setAnalysisComplete} />
        </div>

        {analysisComplete && (
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <ResumeAnalysis resumeData={resumeData} />
            <RequiredSkills resumeData={resumeData} />
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default Resume;
