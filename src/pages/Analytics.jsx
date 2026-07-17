import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  FaChartLine,
  FaFileAlt,
  FaCode,
  FaMicrophone,
  FaBookOpen,
  FaBullseye,
} from "react-icons/fa";

function Analytics() {
  const stats = [
    {
      title: "Resume Score",
      value: "89%",
      icon: <FaFileAlt className="text-indigo-600 text-3xl" />,
    },
    {
      title: "Skills Mastered",
      value: "18",
      icon: <FaCode className="text-green-600 text-3xl" />,
    },
    {
      title: "Mock Interviews",
      value: "12",
      icon: <FaMicrophone className="text-red-500 text-3xl" />,
    },
    {
      title: "Courses Completed",
      value: "7",
      icon: <FaBookOpen className="text-yellow-500 text-3xl" />,
    },
  ];

  const progress = [
    { skill: "React", value: 90 },
    { skill: "Java", value: 85 },
    { skill: "SQL", value: 80 },
    { skill: "Python", value: 75 },
    { skill: "Docker", value: 40 },
    { skill: "AWS", value: 25 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

       <main className="ml-72 flex-1 p-8">
        <Navbar />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Analytics Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Track your placement preparation, resume improvement, and learning
            progress.
          </p>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {stats.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">{card.title}</p>

                  <h2 className="text-3xl font-bold mt-2">
                    {card.value}
                  </h2>
                </div>

                {card.icon}
              </div>
            </div>
          ))}

        </div>

        {/* Skill Progress */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

          <h2 className="text-2xl font-semibold flex items-center gap-3 mb-6">
            <FaChartLine className="text-indigo-600" />
            Skill Progress
          </h2>

          <div className="space-y-5">

            {progress.map((item) => (
              <div key={item.skill}>
                <div className="flex justify-between mb-2">
                  <span>{item.skill}</span>
                  <span>{item.value}%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-indigo-600 h-3 rounded-full"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Weekly Progress */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">
              Weekly Learning
            </h2>

            <div className="space-y-3">
              <p>Monday - 2 Hours</p>
              <p>Tuesday - 1.5 Hours</p>
              <p>Wednesday - 3 Hours</p>
              <p>Thursday - 2 Hours</p>
              <p>Friday - 2.5 Hours</p>
              <p>Saturday - 4 Hours</p>
              <p>Sunday - 3 Hours</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <FaBullseye className="text-green-600" />
              Weekly Goals
            </h2>

            <ul className="space-y-4 list-disc ml-6">
              <li>Complete React Advanced</li>
              <li>Solve 20 DSA Problems</li>
              <li>Finish Docker Basics</li>
              <li>Attend 2 Mock Interviews</li>
              <li>Improve Resume Score above 90%</li>
            </ul>
          </div>

        </div>

      </main>
    </div>
  );
}

export default Analytics;