import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import ResumeUpload from "../components/ResumeUpload";
import CompanySelection from "../components/CompanySelection";
import ResumeAnalysis from "../components/ResumeAnalysis";
import RequiredSkills from "../components/RequiredSkills";
import { useState } from "react";
function Resume() {
  const [resumeData, setResumeData] = useState(null);
 console.log("Resume Page State:", resumeData);
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="ml-72 flex-1 p-8">
        <Navbar />

        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Resume Management
          </h1>

          <p className="text-gray-500 mt-2">
            Upload your resume and get AI-powered feedback.
          </p>
        </div>

        {/* Upload Resume + Company Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ResumeUpload setResumeData={setResumeData} />
          <CompanySelection />
        </div>

        {/* AI Resume Analysis + Required Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <ResumeAnalysis resumeData={resumeData} />
           <RequiredSkills />
        </div>
      </main>
    </div>
  );
}

export default Resume;