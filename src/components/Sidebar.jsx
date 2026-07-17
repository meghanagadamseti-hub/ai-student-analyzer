import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaFileAlt,
  FaBuilding,
  FaRobot,
  FaMicrophone,
  FaBookOpen,
  FaChartBar,
  FaCog,
  FaUser,
} from "react-icons/fa";

function Sidebar() {
  const menuItems = [
  {
    icon: <FaHome />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <FaFileAlt />,
    title: "Resume",
    path: "/resume",
  },
  {
    icon: <FaBuilding />,
    title: "Companies",
    path: "/companies",
  },
  {
    icon: <FaRobot />,
    title: "AI Analysis",
    path: "/analysis",
  },
  {
    icon: <FaMicrophone />,
    title: "Mock Interview",
    path: "/mock-interview",
  },
  {
    icon: <FaBookOpen />,
    title: "Learning",
    path: "/learning",
  },
  {
    icon: <FaChartBar />,
    title: "Analytics",
    path: "/analytics",
  },
  {
    icon: <FaCog />,
    title: "Settings",
    path: "/settings",
  },
  {
    icon: <FaUser />,
    title: "Profile",
    path: "/profile",
  },
];
  return (
    <aside className="fixed left-0 top-0 w-72 h-screen bg-[#071A3D] text-white flex flex-col justify-between p-6 shadow-xl">
      {/* Logo */}
      <div>
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-wide">
            AI Interview
          </h1>

          <p className="text-indigo-300 mt-1">
            Career Coach
          </p>
        </div>

        {/* Menu */}
        <nav className="space-y-3">
  {menuItems.map((item) => (
    <NavLink
      key={item.title}
      to={item.path}
      className={({ isActive }) =>
        `w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 text-left ${
          isActive
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg"
            : "hover:bg-[#132B58] hover:translate-x-1"
        }`
      }
    >
      <span className="text-xl">{item.icon}</span>

      <span className="font-medium text-lg">
        {item.title}
      </span>
    </NavLink>
  ))}
</nav>
      </div>

      {/* AI Career Tip */}
      <div className="bg-[#132B58] rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
            <FaRobot />
          </div>

          <div>
            <h3 className="font-semibold">
              AI Career Tip
            </h3>

            <p className="text-xs text-gray-300">
              Today's Recommendation
            </p>
          </div>
        </div>

        <p className="text-sm leading-6 text-gray-300">
          Improve your resume by adding projects with React, Docker, and AWS.
          Completing a mock interview today can increase your interview readiness.
        </p>

        <button className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition">
          View Recommendations
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;