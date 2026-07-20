import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  FaBookOpen,
  FaGraduationCap,
  FaLaptopCode,
  FaCertificate,
  FaCheckCircle,
} from "react-icons/fa";

function Learning() {
  const skills = [
    { name: "HTML & CSS", progress: 100 },
    { name: "JavaScript", progress: 90 },
    { name: "React", progress: 80 },
    { name: "Git & GitHub", progress: 75 },
    { name: "SQL", progress: 70 },
    { name: "Docker", progress: 30 },
    { name: "AWS", progress: 20 },
    { name: "System Design", progress: 10 },
  ];

  const courses = [
    "React - Complete Guide",
    "Docker for Beginners",
    "AWS Cloud Practitioner",
    "System Design Basics",
  ];

  const certifications = [
    "AWS Certified Cloud Practitioner",
    "Google Associate Cloud Engineer",
    "Meta Front-End Developer",
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

       <main className="ml-72 flex-1 p-8">
        <Navbar />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Learning Roadmap
          </h1>

          <p className="text-gray-500 mt-2">
            Personalized learning recommendations to improve your placement readiness.
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FaGraduationCap className="text-indigo-600" />
              Overall Learning Progress
            </h2>

            <span className="text-2xl font-bold text-indigo-600">
              68%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-indigo-600 h-4 rounded-full"
              style={{ width: "68%" }}
            ></div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <FaLaptopCode className="text-green-600" />
            Skill Roadmap
          </h2>

          <div className="space-y-5">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span>{skill.name}</span>
                  <span>{skill.progress}%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Courses & Certifications */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Courses */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <FaBookOpen className="text-blue-600" />
              Recommended Courses
            </h2>

            <div className="space-y-4">
              {courses.map((course) => (
                <div
                  key={course}
                  className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl"
                >
                  <FaCheckCircle className="text-blue-600" />
                  {course}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <FaCertificate className="text-yellow-500" />
              Recommended Certifications
            </h2>

            <div className="space-y-4">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-3 p-4 bg-yellow-50 rounded-xl"
                >
                  <FaCertificate className="text-yellow-500" />
                  {cert}
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Learning;