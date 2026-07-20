import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  FaUser,
  FaBell,
  FaLock,
  FaPalette,
  FaBriefcase,
  FaSave,
} from "react-icons/fa";

function Settings() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

       <main className="ml-72 flex-1 p-8">
        <Navbar />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Settings
          </h1>
          <p className="text-gray-500 mt-2">
            Customize your AI Interview Career Coach experience.
          </p>
        </div>

        {/* Profile Settings */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <FaUser className="text-indigo-600 text-2xl" />
            <h2 className="text-2xl font-semibold">Profile</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <input
              className="border rounded-xl p-3"
              placeholder="Full Name"
              value="Meghana"
              readOnly
            />

            <input
              className="border rounded-xl p-3"
              placeholder="Email"
              value="meghana@gmail.com"
              readOnly
            />

            <input
              className="border rounded-xl p-3"
              placeholder="University"
              value="Vignan University"
              readOnly
            />

            <input
              className="border rounded-xl p-3"
              placeholder="Branch"
              value="Computer Science"
              readOnly
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <FaBell className="text-yellow-500 text-2xl" />
            <h2 className="text-2xl font-semibold">Notifications</h2>
          </div>

          <div className="space-y-4">

            <label className="flex justify-between items-center">
              <span>Resume Analysis Updates</span>
              <input type="checkbox" defaultChecked />
            </label>

            <label className="flex justify-between items-center">
              <span>Learning Reminders</span>
              <input type="checkbox" defaultChecked />
            </label>

            <label className="flex justify-between items-center">
              <span>Mock Interview Reminders</span>
              <input type="checkbox" defaultChecked />
            </label>

            <label className="flex justify-between items-center">
              <span>Company Updates</span>
              <input type="checkbox" />
            </label>

          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <FaPalette className="text-pink-500 text-2xl" />
            <h2 className="text-2xl font-semibold">Appearance</h2>
          </div>

          <select className="w-full border rounded-xl p-3">
            <option>Light Mode</option>
            <option>Dark Mode</option>
            <option>System Default</option>
          </select>
        </div>

        {/* Career Preferences */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <FaBriefcase className="text-green-600 text-2xl" />
            <h2 className="text-2xl font-semibold">
              Career Preferences
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <select className="border rounded-xl p-3">
              <option>Software Engineer</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack Developer</option>
              <option>Data Analyst</option>
              <option>AI Engineer</option>
            </select>

            <select className="border rounded-xl p-3">
              <option>Product Based</option>
              <option>Service Based</option>
              <option>Startup</option>
            </select>

            <select className="border rounded-xl p-3">
              <option>Bangalore</option>
              <option>Hyderabad</option>
              <option>Pune</option>
              <option>Chennai</option>
              <option>Remote</option>
            </select>

            <select className="border rounded-xl p-3">
              <option>Fresher</option>
              <option>Internship</option>
            </select>

          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <FaLock className="text-red-500 text-2xl" />
            <h2 className="text-2xl font-semibold">Security</h2>
          </div>

          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition">
            Change Password
          </button>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl shadow-lg hover:opacity-90 transition">
            <FaSave />
            Save Settings
          </button>
        </div>

      </main>
    </div>
  );
}

export default Settings;