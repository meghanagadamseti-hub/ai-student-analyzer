import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  LayoutDashboard, FileText, Wand2,
  Building2, ScanSearch, Mic, BookOpen, BarChart3,
  User, Settings, Sparkles,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Navigation items — simplified per spec
   AI Rewriter and AI Optimize removed from sidebar
   (integrated into AIResumeBuilder tabs instead)
───────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { path:"/dashboard",         title:"Dashboard",         color:"#7C3AED", Icon:LayoutDashboard },
  { path:"/resume",            title:"Resume",            color:"#06B6D4", Icon:FileText        },
  { path:"/ai-resume-builder", title:"AI Resume Builder", color:"#EC4899", Icon:Wand2, isNew:true },
  { path:"/companies",         title:"Companies",         color:"#22C55E", Icon:Building2      },
  { path:"/analysis",          title:"AI Analysis",       color:"#A78BFA", Icon:ScanSearch     },
  { path:"/mock-interview",    title:"Mock Interview",    color:"#F97316", Icon:Mic            },
  { path:"/learning",          title:"Learning",          color:"#F59E0B", Icon:BookOpen       },
  { path:"/analytics",         title:"Analytics",         color:"#06B6D4", Icon:BarChart3      },
  { path:"/profile",           title:"Profile",           color:"#7C3AED", Icon:User           },
  { path:"/settings",          title:"Settings",          color:"#94A3B8", Icon:Settings       },
];

/* ─────────────────────────────────────────────────────────────
   Theme tokens — sidebar stays dark even in light mode
───────────────────────────────────────────────────────────── */
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
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 pulse-glow"
            style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)" }}
          >
            <Sparkles size={16} color="white" />
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
        {NAV_ITEMS.map((item) => {
          const Icon = item.Icon;
          return (
            <NavLink key={item.path} to={item.path} className="block">
              {({ isActive }) => (
                <div
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 relative group"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg,${item.color}28,${item.color}18)`
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
                      background: isActive ? `${item.color}20` : "rgba(255,255,255,0.05)",
                      color:      isActive ? item.color : T.itemText,
                    }}
                  >
                    <Icon size={14} strokeWidth={isActive ? 2.5 : 2} />
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

                  {/* Active accent bar */}
                  {isActive && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r"
                      style={{ background: item.color }}
                    />
                  )}
                </div>
              )}
            </NavLink>
          );
        })}
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
            style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)" }}
          >
            <Sparkles size={14} color="white" />
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
            style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)" }}
          >
            View Recommendations
          </button>
        </NavLink>
      </div>
    </aside>
  );
}
