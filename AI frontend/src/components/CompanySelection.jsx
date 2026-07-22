import { useState } from "react";

function CompanySelection({
  resumeData,
  setResumeData,
  setAnalysisComplete,
}) {
  const [company, setCompany] = useState("Google");
  const [role, setRole] = useState("Software Engineer");
  const [experience, setExperience] = useState("Fresher");

  const analyzeResume = async () => {
    // Check whether a resume has been uploaded
    if (!resumeData?.uploaded) {
      alert("Please upload your resume first.");
      return;
    }

    try {
      // TEMPORARY
      // We'll replace this with /analyze in the next step.
      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company,
          role,
          experience,
        }),
      });

      const data = await response.json();

      console.log(data);

      setResumeData(data);

      setAnalysisComplete(true);
    } catch (error) {
      console.error(error);
      alert("Analysis failed.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-5">
        🏢 Company Assessment
      </h2>

      <div className="space-y-5">
        {/* Company */}
        <div>
          <label className="block text-gray-600 mb-2">
            Company
          </label>

          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
          >
            <option>Google</option>
            <option>Microsoft</option>
            <option>Amazon</option>
            <option>Meta</option>
            <option>Netflix</option>
            <option>Adobe</option>
            <option>TCS</option>
            <option>Infosys</option>
          </select>
        </div>

        {/* Job Role */}
        <div>
          <label className="block text-gray-600 mb-2">
            Job Role
          </label>

          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-gray-600 mb-2">
            Experience
          </label>

          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          >
            <option>Fresher</option>
            <option>0-1 Years</option>
            <option>1-3 Years</option>
            <option>3-5 Years</option>
          </select>
        </div>

        <button
          onClick={analyzeResume}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:opacity-90 transition"
        >
          Analyze Resume
        </button>
      </div>
    </div>
  );
}

export default CompanySelection;