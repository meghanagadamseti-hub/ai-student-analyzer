import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Welcome from "../components/Welcome";
import StatCard from "../components/StatCard";

import {
  FaFileAlt,
  FaBriefcase,
  FaCode,
  FaCheckCircle,
} from "react-icons/fa";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="ml-72 flex-1 p-8">
        <Navbar />

        <Welcome />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

          <StatCard
            title="Resume Score"
            value="85%"
            icon={<FaFileAlt />}
            change="+5%"
            positive={true}
            color="#4F46E5"
          />

          <StatCard
            title="Company Readiness"
            value="78%"
            icon={<FaBriefcase />}
            change="+8%"
            positive={true}
            color="#10B981"
          />

          <StatCard
            title="Skills Matched"
            value="18/25"
            icon={<FaCode />}
            change="+3 Skills"
            positive={true}
            color="#F59E0B"
          />

          <StatCard
            title="Pending Skills"
            value="7"
            icon={<FaCheckCircle />}
            change="-2 Skills"
            positive={false}
            color="#EF4444"
          />

        </div>

      </main>
    </div>
  );
}

export default Dashboard;