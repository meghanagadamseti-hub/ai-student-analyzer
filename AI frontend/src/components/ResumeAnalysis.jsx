import {
  FaCheckCircle,
  FaLightbulb,
} from "react-icons/fa";

function ResumeAnalysis({ resumeData }) {

  console.log("ResumeAnalysis Data:", resumeData);

  // ATS Score
  const score = resumeData?.ats?.overall_score || 0;

  // Skills
  const matchedSkills = resumeData?.matched_skills || [];
  const missingSkills = resumeData?.missing_skills || [];

  // Placement Level
  const level =
    score >= 85
      ? "Excellent Candidate"
      : score >= 70
      ? "Strong Candidate"
      : score >= 55
      ? "Average Candidate"
      : "Needs Improvement";

  // Suggestions
  const improvements = [];

  if (missingSkills.includes("React"))
    improvements.push("Learn React.js");

  if (missingSkills.includes("Docker"))
    improvements.push("Learn Docker");

  if (missingSkills.includes("SQL"))
    improvements.push("Practice SQL");

  if (missingSkills.includes("AWS"))
    improvements.push("Learn AWS Cloud");

  if (missingSkills.includes("Git"))
    improvements.push("Practice Git & GitHub");

  if (improvements.length === 0)
    improvements.push("Great Resume! Keep improving your projects.");

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-2xl font-bold mb-6">
        🤖 AI Resume Analysis
      </h2>

      <div className="space-y-5">

        {/* Resume Score */}
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">
            ATS Resume Score
          </span>

          <span className="text-2xl font-bold text-indigo-600">
            {score}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">

          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full"
            style={{ width: `${score}%` }}
          ></div>

        </div>

        {/* Placement Level */}
        <div className="flex justify-between items-center">

          <span className="font-medium text-gray-700">
            Placement Level
          </span>

          <span className="flex items-center gap-2 text-green-600 font-semibold">
            <FaCheckCircle />
            {level}
          </span>

        </div>

        {/* Skills Found */}
        <div>

          <h3 className="font-semibold mb-3">
            Skills Found
          </h3>

          <div className="flex flex-wrap gap-2">

            {matchedSkills.length ? (
              matchedSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-500">
                No matching skills found.
              </p>
            )}

          </div>

        </div>

        {/* Missing Skills */}
        <div>

          <h3 className="font-semibold mb-3">
            Missing Skills
          </h3>

          <div className="flex flex-wrap gap-2">

            {missingSkills.length ? (
              missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-red-100 text-red-600 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-green-600">
                🎉 No missing skills found.
              </p>
            )}

          </div>

        </div>

        {/* Suggestions */}
        <div className="bg-indigo-50 rounded-xl p-4">

          <div className="flex gap-3">

            <FaLightbulb className="text-indigo-600 mt-1" />

            <div>

              <h4 className="font-semibold mb-2">
                AI Suggestions
              </h4>

              <ul className="list-disc ml-5 text-gray-700 space-y-1">

                {improvements.map((item, index) => (
                  <li key={index}>
                    {item}
                  </li>
                ))}

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ResumeAnalysis;