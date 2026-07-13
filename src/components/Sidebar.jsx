import {
  FaHome,
  FaChartBar,
  FaUserGraduate,
  FaClipboardCheck,
  FaChartLine,
  FaFileAlt,
  FaBell,
  FaCog,
  FaRobot,
} from "react-icons/fa";

function Sidebar() {
  const menuItems = [
    { icon: <FaHome />, title: "Dashboard", active: true },
    { icon: <FaChartBar />, title: "Analytics" },
    { icon: <FaUserGraduate />, title: "Students" },
    { icon: <FaClipboardCheck />, title: "Attendance" },
    { icon: <FaChartLine />, title: "Performance" },
    { icon: <FaFileAlt />, title: "Reports" },
    { icon: <FaBell />, title: "Alerts" },
    { icon: <FaCog />, title: "Settings" },
  ];

  return (
    <aside className="w-72 min-h-screen bg-[#071A3D] text-white flex flex-col justify-between p-6">

      {/* Logo */}
      <div>
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-wide">
            AI Student
          </h1>

          <p className="text-indigo-300 mt-1">
            Performance Analyzer
          </p>
        </div>

        {/* Menu */}
        <nav className="space-y-3">

          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 text-left
              ${
                item.active
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg"
                  : "hover:bg-[#132B58]"
              }`}
            >
              <span className="text-xl">{item.icon}</span>

              <span className="font-medium text-lg">
                {item.title}
              </span>
            </button>
          ))}

        </nav>
      </div>

      {/* AI Card */}

      <div className="bg-[#132B58] rounded-2xl p-5">

        <div className="flex items-center gap-3 mb-4">

          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">

            <FaRobot />

          </div>

          <div>
            <h3 className="font-semibold">
              AI Insight
            </h3>

            <p className="text-xs text-gray-300">
              Recommendation
            </p>

          </div>

        </div>

        <p className="text-sm leading-6 text-gray-300">
          Mathematics performance dropped by 12%.
          AI recommends additional practice and quizzes.
        </p>

        <button className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition">
          View Suggestions
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;