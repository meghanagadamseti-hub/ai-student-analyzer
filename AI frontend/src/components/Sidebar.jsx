import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

/* ── Icon colour map per nav item ── */
const NAV_ITEMS = [
  {
    path: "/dashboard",
    title: "Dashboard",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.14)",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    ),
  },
  {
    path: "/resume",
    title: "Resume",
    color: "#06B6D4",
    bg: "rgba(6,182,212,0.14)",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    path: "/ai-resume-builder",
    title: "AI Resume Builder",
    color: "#EC4899",
    bg: "rgba(236,72,153,0.14)",
    isNew: true,
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
      </svg>
    ),
  },
  {
    path: "/companies",
    title: "Companies",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.14)",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    path: "/analysis",
    title: "AI Analysis",
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.14)",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    path: "/mock-interview",
    title: "Mock Interview",
    color: "#F97316",
    bg: "rgba(249,115,22,0.14)",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    path: "/learning",
    title: "Learning",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.14)",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
      </svg>
    ),
  },
  {
    path: "/analytics",
    title: "Analytics",
    color: "#06B6D4",
    bg: "rgba(6,182,212,0.14)",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
      </svg>
    ),
  },
  {
    path: "/settings",
    title: "Settings",
    color: "#94A3B8",
    bg: "rgba(148,163,184,0.12)",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    path: "/profile",
    title: "Profile",
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.14)",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    ),
  },
];

/* ── DARK theme tokens ── */
const DARK = {
  bg:           "#111827",
  border:       "rgba(124,58,237,0.18)",
  shadow:       "none",
  logoTitle:    "#F8FAFC",
  logoSub:      "#A78BFA",
  divider:      "rgba(124,58,237,0.15)",
  itemText:     "#94A3B8",
  itemHoverBg:  "rgba(124,58,237,0.08)",
  activeText:   "#F8FAFC",
  activeShadow: "0 3px 14px rgba(124,58,237,0.28)",
  tipBg:        "linear-gradient(135deg,rgba(124,58,237,0.12),rgba(109,40,217,0.09))",
  tipBorder:    "rgba(124,58,237,0.28)",
  tipText:      "#94A3B8",
  tipTitle:     "#F8FAFC",
  tipSub:       "#4B5563",
};

/* ── LIGHT theme tokens (sidebar stays dark) ── */
const LIGHT = {
  bg:           "#1E1B4B",
  border:       "rgba(167,139,250,0.20)",
  shadow:       "4px 0 32px rgba(0,0,0,0.22)",
  logoTitle:    "#FFFFFF",
  logoSub:      "rgba(196,181,253,0.85)",
  divider:      "rgba(167,139,250,0.20)",
  itemText:     "rgba(196,181,253,0.80)",
  itemHoverBg:  "rgba(255,255,255,0.08)",
  activeText:   "#FFFFFF",
  activeShadow: "0 4px 16px rgba(124,58,237,0.42)",
  tipBg:        "rgba(255,255,255,0.07)",
  tipBorder:    "rgba(167,139,250,0.28)",
  tipText:      "rgba(196,181,253,0.75)",
  tipTitle:     "#FFFFFF",
  tipSub:       "rgba(167,139,250,0.55)",
};

export default function Sidebar() {
  const { resolved } = useTheme();
  const T = resolved === "light" ? LIGHT : DARK;

  return (
    <aside
      className="fixed left-0 top-0 w-64 h-screen flex flex-col z-40 overflow-hidden"
      style={{
        background:           T.bg,
        backdropFilter:       "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRight:          `1px solid ${T.border}`,
        boxShadow:            T.shadow,
      }}
    >
      {/* ── Logo ── */}
      <div className="px-5 pt-6 pb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 pulse-glow"
            style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
          >
            <svg viewBox="0 0 20 20" fill="white" className="w-5 h-5">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight tracking-wide" style={{ color: T.logoTitle }}>
              AI Career
            </h1>
            <p className="text-[11px] font-medium mt-0.5" style={{ color: T.logoSub }}>
              Platform
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 mb-2 h-px flex-shrink-0" style={{ background: T.divider }} />

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-1 space-y-0.5 pb-2">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.path} to={item.path} className="block">
            {({ isActive }) => (
              <div
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 relative"
                style={{
                  background:  isActive
                    ? `linear-gradient(135deg, ${item.color}28, ${item.color}18)`
                    : "transparent",
                  border: isActive
                    ? `1px solid ${item.color}40`
                    : "1px solid transparent",
                  boxShadow: isActive ? T.activeShadow : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = T.itemHoverBg;
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = "transparent";
                }}
              >
                {/* Coloured icon box */}
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{
                    background: isActive ? item.bg : "rgba(255,255,255,0.05)",
                    color:      isActive ? item.color : T.itemText,
                  }}
                >
                  {item.icon}
                </span>

                {/* Label */}
                <span
                  className="text-sm font-medium flex-1 truncate"
                  style={{ color: isActive ? T.activeText : T.itemText }}
                >
                  {item.title}
                </span>

                {/* NEW badge */}
                {item.isNew && (
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg,#EC4899,#7C3AED)",
                      color: "#fff",
                    }}
                  >
                    New
                  </span>
                )}

                {/* Active left accent bar */}
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r"
                    style={{ background: item.color }}
                  />
                )}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Divider */}
      <div className="mx-4 mb-3 h-px flex-shrink-0" style={{ background: T.divider }} />

      {/* ── AI Tip card ── */}
      <div
        className="mx-3 mb-5 rounded-2xl p-4 flex-shrink-0"
        style={{ background: T.tipBg, border: `1px solid ${T.tipBorder}` }}
      >
        <div className="flex items-center gap-2.5 mb-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
          >
            <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
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
          Add React, Docker &amp; AWS projects. A mock interview today boosts readiness by 15%.
        </p>

        <NavLink to="/learning">
          <button
            className="mt-3 w-full py-2 rounded-xl text-[11px] font-semibold text-white hover:opacity-88 transition-opacity"
            style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
          >
            View Recommendations
          </button>
        </NavLink>
      </div>
    </aside>
  );
}
