import { NavLink } from "react-router-dom";
import {
  FaHome, FaFileAlt, FaBuilding, FaRobot,
  FaMicrophone, FaBookOpen, FaChartBar, FaCog, FaUser, FaBrain,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const menuItems = [
  { icon: FaHome,       title: "Dashboard",     path: "/dashboard"      },
  { icon: FaFileAlt,    title: "Resume",         path: "/resume"         },
  { icon: FaBuilding,   title: "Companies",      path: "/companies"      },
  { icon: FaRobot,      title: "AI Analysis",    path: "/analysis"       },
  { icon: FaMicrophone, title: "Mock Interview", path: "/mock-interview" },
  { icon: FaBookOpen,   title: "Learning",       path: "/learning"       },
  { icon: FaChartBar,   title: "Analytics",      path: "/analytics"      },
  { icon: FaCog,        title: "Settings",       path: "/settings"       },
  { icon: FaUser,       title: "Profile",        path: "/profile"        },
];

/* ─────────────────────────────────────────────────────────────
   LIGHT MODE  → dark navy sidebar matching the screenshot style
   DARK  MODE  → existing dark glass sidebar
───────────────────────────────────────────────────────────── */
const LIGHT = {
  /* sidebar shell */
  bg:            "#1e2140",          // dark navy (matches screenshot)
  border:        "rgba(255,255,255,0.06)",
  shadow:        "4px 0 24px rgba(0,0,0,0.18)",

  /* logo */
  logoTitle:     "#ffffff",
  logoSub:       "rgba(180,170,255,0.80)",   // soft lilac

  /* divider */
  divider:       "rgba(255,255,255,0.08)",

  /* nav items — inactive */
  itemText:      "rgba(255,255,255,0.70)",
  itemIcon:      "rgba(255,255,255,0.55)",
  itemHoverBg:   "rgba(255,255,255,0.06)",
  itemHoverText: "#ffffff",

  /* nav items — active  (solid purple fill, like screenshot) */
  activeBg:      "linear-gradient(135deg, #7c3aed, #6d28d9)",   // vivid purple
  activeText:    "#ffffff",
  activeIcon:    "#ffffff",
  activeShadow:  "0 4px 14px rgba(109,40,217,0.45)",

  /* tip card */
  tipBg:         "rgba(255,255,255,0.06)",
  tipBorder:     "rgba(255,255,255,0.10)",
  tipText:       "rgba(255,255,255,0.65)",
  tipTitle:      "#ffffff",
  tipSub:        "rgba(180,170,255,0.60)",
};

const DARK = {
  bg:            "rgba(10, 15, 30, 0.97)",
  border:        "rgba(99,102,241,0.15)",
  shadow:        "none",
  logoTitle:     "#f1f5f9",
  logoSub:       "#818cf8",
  divider:       "rgba(99,102,241,0.15)",
  itemText:      "#94a3b8",
  itemIcon:      "#64748b",
  itemHoverBg:   "rgba(99,102,241,0.08)",
  itemHoverText: "#e2e8f0",
  activeBg:      "linear-gradient(135deg, rgba(99,102,241,0.30), rgba(139,92,246,0.30))",
  activeText:    "#f1f5f9",
  activeIcon:    "#818cf8",
  activeShadow:  "0 2px 12px rgba(99,102,241,0.20)",
  tipBg:         "linear-gradient(135deg,rgba(99,102,241,0.12),rgba(139,92,246,0.10))",
  tipBorder:     "rgba(99,102,241,0.28)",
  tipText:       "#94a3b8",
  tipTitle:      "#f1f5f9",
  tipSub:        "#64748b",
};

function Sidebar() {
  const { resolved } = useTheme();
  const T = resolved === "light" ? LIGHT : DARK;

  return (
    <aside
      className="fixed left-0 top-0 w-64 h-screen flex flex-col justify-between z-40 overflow-hidden"
      style={{
        background:           T.bg,
        backdropFilter:       "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRight:          `1px solid ${T.border}`,
        boxShadow:            T.shadow,
      }}
    >
      <div className="flex flex-col h-full">

        {/* ── Logo ── */}
        <div className="px-5 pt-6 pb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}
            >
              <FaBrain className="text-white" style={{ fontSize: "15px" }} />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight tracking-wide" style={{ color: T.logoTitle }}>
                AI Interview
              </h1>
              <p className="text-[11px] font-medium mt-0.5" style={{ color: T.logoSub }}>
                Career Coach
              </p>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mx-5 mb-3 h-px flex-shrink-0" style={{ background: T.divider }} />

        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto px-3 space-y-0.5 pb-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.title}
                to={item.path}
                className="block"
              >
                {({ isActive }) => (
                  <div
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 group"
                    style={{
                      background:  isActive ? T.activeBg : "transparent",
                      boxShadow:   isActive ? T.activeShadow : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = T.itemHoverBg;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    {/* Icon */}
                    <span
                      className="flex-shrink-0 w-5 flex items-center justify-center"
                      style={{
                        color:     isActive ? T.activeIcon : T.itemIcon,
                        fontSize:  "14px",
                      }}
                    >
                      <Icon />
                    </span>

                    {/* Label */}
                    <span
                      className="text-sm font-medium"
                      style={{
                        color: isActive ? T.activeText : T.itemText,
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* ── AI Career Tip ── */}
        <div
          className="mx-3 mb-5 rounded-2xl p-4 flex-shrink-0"
          style={{
            background: T.tipBg,
            border:     `1px solid ${T.tipBorder}`,
          }}
        >
          <div className="flex items-center gap-2.5 mb-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}
            >
              <FaRobot className="text-white" style={{ fontSize: "12px" }} />
            </div>
            <div>
              <p className="text-xs font-semibold leading-tight" style={{ color: T.tipTitle }}>
                AI Career Tip
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: T.tipSub }}>
                Today's Recommendation
              </p>
            </div>
          </div>

          <p className="text-[11px] leading-[1.6]" style={{ color: T.tipText }}>
            Add React, Docker &amp; AWS projects to your resume. A mock interview today
            can boost your readiness by 15%.
          </p>

          <NavLink to="/learning">
            <button
              className="mt-3 w-full py-2 rounded-xl text-[11px] font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)" }}
            >
              View Recommendations
            </button>
          </NavLink>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
