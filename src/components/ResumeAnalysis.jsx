import {
  FaCheckCircle,
  FaLightbulb,
} from "react-icons/fa";

function ResumeAnalysis() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">
        🤖 AI Resume Analysis
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Resume Score</span>
          <span className="font-bold text-indigo-600">85%</span>
        </div>

        <div className="flex justify-between">
          <span>ATS Friendly</span>

          <span className="text-green-600 flex items-center gap-2">
            <FaCheckCircle />
            Yes
          </span>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Skills Found</h3>

          <div className="flex flex-wrap gap-2">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">React</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">Python</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">SQL</span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">Git</span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Missing Skills</h3>

          <div className="flex flex-wrap gap-2">
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">Docker</span>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">AWS</span>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">System Design</span>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-xl p-4 flex gap-3">
          <FaLightbulb className="text-indigo-600 mt-1" />

          <p className="text-gray-700">
            Add Docker and AWS projects to improve your chances of getting shortlisted.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResumeAnalysis;