import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  FaFileAlt,
  FaChartLine,
  FaCheckCircle,
  FaBuilding,
} from "react-icons/fa";

function Analysis() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
         <main className="ml-72 flex-1 p-8">
        <Navbar />

        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            AI Resume Analysis
          </h1>

          <p className="text-gray-500 mt-2">
            Analyze your resume, compare it with your target company, and receive AI-powered career recommendations.
          </p>
        </div>

        {/* Resume Status */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 flex flex-col md:flex-row justify-between items-center">

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Resume Status
            </h2>

            <p className="text-green-600 font-medium mt-2">
              ✅ Resume Uploaded Successfully
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <h2 className="text-xl font-semibold text-gray-800">
              Selected Company
            </h2>

            <p className="text-indigo-600 font-bold mt-2">
              Google
            </p>
          </div>

        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* Resume Score */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500">
                  Resume Score
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  89%
                </h2>
              </div>

              <FaFileAlt className="text-4xl text-indigo-600" />

            </div>
          </div>

          {/* ATS Score */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500">
                  ATS Score
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  91%
                </h2>
              </div>

              <FaChartLine className="text-4xl text-green-600" />

            </div>
          </div>

          {/* Readiness */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500">
                  Interview Readiness
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  82%
                </h2>
              </div>

              <FaCheckCircle className="text-4xl text-yellow-500" />

            </div>
          </div>

          {/* Company */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500">
                  Target Company
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  Google
                </h2>
              </div>

              <FaBuilding className="text-4xl text-red-500" />

            </div>
          </div>

        </div>

        {/* Resume Strength */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Resume Strength
            </h2>

            <span className="font-bold text-indigo-600">
              89%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4">

            <div
              className="bg-indigo-600 h-4 rounded-full"
              style={{ width: "89%" }}
            ></div>

          </div>

          <p className="text-gray-500 mt-4">
            Your resume has a strong structure and good technical skills.
            Adding industry-level projects and cloud technologies will further improve your profile.
          </p>

        </div>

      </main>
    </div>
  );
}

export default Analysis;