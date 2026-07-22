import {
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
    FaMoon,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate("/");
  } catch (error) {
    console.error("Logout Error:", error);
  }
};
  return (
<header className="sticky top-0 z-50 bg-white rounded-xl shadow-md px-5 py-3 mb-6 flex items-center justify-between">      {/* Search Box */}
      <div className="relative w-80">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
placeholder="Search companies, skills..."
className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
       <div className="flex items-center gap-2 cursor-pointer hover:text-indigo-600 transition">
  <FaMoon size={20} />
  <span className="font-medium">
    Appearance
         </span>
          </div>

        <div className="flex items-center gap-3">
          <FaUserCircle size={38} className="text-indigo-600" />

          <div>
            <p className="font-semibold text-gray-800">
              Meghana
            </p>

            <p className="text-sm text-gray-500">
              AI Interview Candidate
            </p>
          </div>
        </div>

        <button
  onClick={handleLogout}
  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl shadow-md transition"
>
  <FaSignOutAlt />
  Logout
</button>

      </div>
    </header>
  );
}

export default Navbar;