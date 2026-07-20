import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  FaUserCircle,
  FaGraduationCap,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFileAlt,
  FaCode,
  FaBriefcase,
  FaMedal,
  FaEdit,
} from "react-icons/fa";

function Profile() {
  const skills = [
    "Java",
    "Python",
    "React",
    "JavaScript",
    "SQL",
    "Git",
    "HTML",
    "CSS",
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

       <main className="ml-72 flex-1 p-8">
        <Navbar />

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-8">

          <div className="flex flex-col md:flex-row items-center gap-8">

            <FaUserCircle className="text-[140px] text-indigo-600" />

            <div className="flex-1">

              <h1 className="text-4xl font-bold text-gray-800">
                Meghana
              </h1>

              <p className="text-gray-500 mt-2">
                AI Interview Candidate
              </p>

              <div className="grid md:grid-cols-2 gap-5 mt-8">

                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-indigo-600" />
                  <span>meghana@gmail.com</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaPhone className="text-green-600" />
                  <span>+91 XXXXX XXXXX</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaGraduationCap className="text-blue-600" />
                  <span>Vignan University</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-red-500" />
                  <span>Andhra Pradesh</span>
                </div>

              </div>

            </div>

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2">
              <FaEdit />
              Edit Profile
            </button>

          </div>

        </div>

        {/* Resume & Career */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-5">
              <FaFileAlt className="text-indigo-600" />
              Resume Details
            </h2>

            <div className="space-y-4">

              <p><strong>Resume Score:</strong> 89%</p>
              <p><strong>ATS Score:</strong> 91%</p>
              <p><strong>Resume Status:</strong> Uploaded</p>
              <p><strong>Last Updated:</strong> 17 July 2026</p>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-5">
              <FaBriefcase className="text-green-600" />
              Career Goal
            </h2>

            <div className="space-y-4">

              <p><strong>Target Role:</strong> Software Engineer</p>
              <p><strong>Preferred Company:</strong> Google</p>
              <p><strong>Experience:</strong> Fresher</p>
              <p><strong>Placement Readiness:</strong> 82%</p>

            </div>

          </div>

        </div>

        {/* Skills */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
            <FaCode className="text-yellow-500" />
            Technical Skills
          </h2>

          <div className="flex flex-wrap gap-4">

            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-indigo-100 text-indigo-700 px-5 py-2 rounded-full font-medium"
              >
                {skill}
              </span>
            ))}

          </div>

        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
            <FaMedal className="text-orange-500" />
            Achievements
          </h2>

          <ul className="list-disc ml-6 space-y-3">

            <li>Completed React Projects</li>
            <li>Resume Score Above 85%</li>
            <li>Completed AI Resume Analysis</li>
            <li>Started Placement Preparation Journey</li>

          </ul>

        </div>

      </main>
    </div>
  );
}

export default Profile;