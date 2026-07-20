import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  FaMicrophone,
  FaBuilding,
  FaCode,
  FaClock,
  FaPlayCircle,
  FaCheckCircle,
} from "react-icons/fa";

function MockInterview() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

       <main className="ml-72 flex-1 p-8">
        <Navbar />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            AI Mock Interview
          </h1>

          <p className="text-gray-500 mt-2">
            Practice interviews tailored to your target company and role.
          </p>
        </div>

        {/* Configuration */}
        <div className="bg-white rounded-2xl shadow-md p-8">

          <h2 className="text-2xl font-semibold mb-6">
            Interview Configuration
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Company */}
            <div>
              <label className="font-medium flex items-center gap-2 mb-2">
                <FaBuilding className="text-indigo-600" />
                Company
              </label>

              <select className="w-full border rounded-xl p-3">
                <option>Google</option>
                <option>Microsoft</option>
                <option>Amazon</option>
                <option>Adobe</option>
                <option>TCS</option>
                <option>Infosys</option>
              </select>
            </div>

            {/* Role */}
            <div>
              <label className="font-medium flex items-center gap-2 mb-2">
                <FaCode className="text-green-600" />
                Job Role
              </label>

              <select className="w-full border rounded-xl p-3">
                <option>Software Engineer</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Full Stack Developer</option>
                <option>AI Engineer</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="font-medium mb-2 block">
                Difficulty
              </label>

              <select className="w-full border rounded-xl p-3">
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="font-medium flex items-center gap-2 mb-2">
                <FaClock className="text-red-500" />
                Duration
              </label>

              <select className="w-full border rounded-xl p-3">
                <option>15 Minutes</option>
                <option>30 Minutes</option>
                <option>45 Minutes</option>
              </select>
            </div>

          </div>
        </div>

        {/* Topics */}
        <div className="bg-white rounded-2xl shadow-md p-8 mt-8">

          <h2 className="text-2xl font-semibold mb-6">
            Interview Topics
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {[
              "DSA",
              "OOP",
              "DBMS",
              "Operating System",
              "Computer Networks",
              "SQL",
              "React",
              "Java",
            ].map((topic) => (
              <label
                key={topic}
                className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer hover:bg-indigo-50"
              >
                <input type="checkbox" defaultChecked />
                {topic}
              </label>
            ))}

          </div>
        </div>

        {/* Interview Summary */}
        <div className="bg-white rounded-2xl shadow-md p-8 mt-8">

          <h2 className="text-2xl font-semibold mb-6">
            Interview Summary
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-indigo-50 rounded-xl p-5 text-center">
              <FaCheckCircle className="text-4xl text-indigo-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold">20</h3>
              <p>Total Questions</p>
            </div>

            <div className="bg-green-50 rounded-xl p-5 text-center">
              <FaMicrophone className="text-4xl text-green-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold">Voice Enabled</h3>
              <p>Coming in Phase 3</p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-5 text-center">
              <FaClock className="text-4xl text-yellow-500 mx-auto mb-3" />
              <h3 className="text-xl font-bold">30 Minutes</h3>
              <p>Estimated Time</p>
            </div>

          </div>
        </div>

        {/* Start Button */}
        <div className="mt-10 flex justify-center">

          <button className="flex items-center gap-3 px-10 py-4 rounded-xl text-white text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition">

            <FaPlayCircle />

            Start Mock Interview

          </button>

        </div>

      </main>
    </div>
  );
}

export default MockInterview;