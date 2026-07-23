import { useState, useRef, useEffect, useId } from "react";
import { FaSearch, FaSignOutAlt, FaBell } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

/* ── Theme option definitions ── */
const THEME_OPTIONS = [
  {
    value: "dark",
    label: "Dark Mode",
    color: "#818cf8",
    icon: () => (
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
      </svg>
    ),
  },
  {
    value: "light",
    label: "Light Mode",
    color: "#f59e0b",
    icon: () => (
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1"  x2="12" y2="3"  />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
  },
  {
    value: "system",
    label: "System Default",
    color: "#34d399",
    icon: () => (
      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

/* Moon icon used in the trigger button */
function MoonIcon({ color = "currentColor" }) {
  return (
    <svg className="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 24 24"
      fill={color}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  );
}

/* Sun icon */
function SunIcon({ color = "currentColor" }) {
  return (
    <svg className="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1"  x2="12" y2="3"  />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function Navbar() {
  const navigate = useNavigate();
  const { preference, resolved, setTheme } = useTheme();
  const isLight = resolved === "light";

  const [dropdownOpen, setDropdownOpen]   = useState(false);
  const [iconAnimating, setIconAnimating] = useState(false);
  const dropdownRef = useRef(null);
  const btnRef      = useRef(null);
  const menuId      = useId();

  /* Close on outside click */
  useEffect(() => {
    function onDown(e) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        btnRef.current && !btnRef.current.contains(e.target)
      ) setDropdownOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  /* Keyboard nav */
  useEffect(() => {
    if (!dropdownOpen) return;
    function onKey(e) {
      if (e.key === "Escape") { setDropdownOpen(false); btnRef.current?.focus(); }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const items = dropdownRef.current?.querySelectorAll("[role='menuitemradio']");
        if (!items?.length) return;
        const idx  = Array.from(items).indexOf(document.activeElement);
        const next = e.key === "ArrowDown" ? (idx + 1) % items.length : (idx - 1 + items.length) % items.length;
        items[next].focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [dropdownOpen]);

  const handleThemeSelect = (value) => {
    if (value !== preference) {
      setTheme(value);
      setIconAnimating(true);
      setTimeout(() => setIconAnimating(false), 450);
    }
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    try { await signOut(auth); navigate("/"); }
    catch (err) { console.error("Logout Error:", err); }
  };

  /* ── Light-mode navbar styling to match screenshot ── */
  const navBg     = isLight ? "#ffffff"                        : "rgba(15,23,42,0.85)";
  const navBorder = isLight ? "#e8ecf0"                        : "rgba(99,102,241,0.15)";
  const navShadow = isLight ? "0 1px 0 #e8ecf0, 0 2px 8px rgba(0,0,0,0.06)" : "none";

  const searchBg     = isLight ? "#f5f7fa"       : "rgba(30,41,59,0.60)";
  const searchBorder = isLight ? "#e2e8f0"        : "rgba(99,102,241,0.20)";
  const searchColor  = isLight ? "#0f172a"        : "#e2e8f0";
  const searchPH     = isLight ? "#94a3b8"        : "#64748b";

  /* appearance button */
  const appBtnBg     = isLight ? "transparent"   : "var(--bg-hover)";
  const appBtnBorder = isLight ? "#e2e8f0"        : "var(--border-default)";
  const appBtnColor  = isLight ? "#374151"        : "var(--text-muted)";
  const appIconColor = isLight ? "#374151"        : undefined; // undefined = use CSS var

  /* avatar */
  const avatarBg = "linear-gradient(135deg, #7c3aed, #6366f1)";

  /* logout */
  const logoutBg     = isLight ? "rgba(239,68,68,0.08)"  : "rgba(239,68,68,0.10)";
  const logoutBorder = isLight ? "rgba(239,68,68,0.20)"  : "rgba(239,68,68,0.22)";
  const logoutColor  = isLight ? "#dc2626"                : "#f87171";

  const activeOpt = THEME_OPTIONS.find((o) => o.value === preference);

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-5 py-2.5 mb-6 rounded-2xl"
      style={{
        background:             navBg,
        backdropFilter:         isLight ? "none" : "blur(16px)",
        WebkitBackdropFilter:   isLight ? "none" : "blur(16px)",
        border:                 `1px solid ${navBorder}`,
        boxShadow:              navShadow,
      }}
    >
      {/* Search */}
      <div className="relative w-64">
        <FaSearch
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs pointer-events-none"
          style={{ color: searchPH }}
        />
        <input
          type="text"
          placeholder="Search companies, skills..."
          className="w-full pl-9 pr-4 py-2 rounded-xl text-sm outline-none"
          style={{
            background: searchBg,
            border:     `1px solid ${searchBorder}`,
            color:      searchColor,
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#6366f1";
            e.target.style.boxShadow   = "0 0 0 3px rgba(99,102,241,0.12)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = searchBorder;
            e.target.style.boxShadow   = "none";
          }}
        />
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2.5">

        {/* Appearance button — matches screenshot: moon icon + "Appearance" text */}
        <div className="relative">
          <button
            ref={btnRef}
            aria-label="Change appearance"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            aria-controls={menuId}
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium"
            style={{
              background: appBtnBg,
              border:     `1px solid ${appBtnBorder}`,
              color:      appBtnColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#6366f1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = appBtnBorder;
            }}
          >
            {/* Always show moon/sun matching screenshot */}
            {resolved === "dark"
              ? <MoonIcon color={appIconColor || "#818cf8"} />
              : <SunIcon  color={appIconColor || "#f59e0b"} />
            }
            <span className="hidden sm:inline">Appearance</span>
            <svg
              className="w-3 h-3"
              style={{
                color: isLight ? "#9ca3af" : "var(--text-faint)",
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                ref={dropdownRef}
                id={menuId}
                role="menu"
                aria-label="Theme options"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit={{    opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-52 rounded-2xl overflow-hidden z-50 py-1.5"
                style={{
                  top:       "100%",
                  background: isLight ? "#ffffff" : "var(--bg-card-solid)",
                  border:    `1px solid ${isLight ? "#e2e8f0" : "var(--border-default)"}`,
                  boxShadow: isLight
                    ? "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)"
                    : "0 16px 48px rgba(0,0,0,0.25)",
                }}
              >
                <div
                  className="px-4 py-2 text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: isLight ? "#9ca3af" : "var(--text-faint)" }}
                >
                  Appearance
                </div>
                <div className="mx-3 mb-1.5 h-px" style={{ background: isLight ? "#f1f5f9" : "var(--border-default)" }} />

                {THEME_OPTIONS.map((opt) => {
                  const isActive = preference === opt.value;
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.value}
                      role="menuitemradio"
                      aria-checked={isActive}
                      tabIndex={0}
                      onClick={() => handleThemeSelect(opt.value)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-left outline-none"
                      style={{
                        background: isActive
                          ? (isLight ? "rgba(99,102,241,0.08)" : "var(--bg-hover)")
                          : "transparent",
                        color: isActive
                          ? opt.color
                          : (isLight ? "#374151" : "var(--text-muted)"),
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.background = isLight ? "#f9fafb" : "var(--bg-hover)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <span
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: isActive ? `${opt.color}18` : (isLight ? "#f3f4f6" : "var(--border-subtle)"),
                          color:      isActive ? opt.color : (isLight ? "#6b7280" : "var(--text-faint)"),
                        }}
                      >
                        <Icon />
                      </span>
                      <span className="flex-1">{opt.label}</span>
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: `${opt.color}18`, color: opt.color }}
                        >
                          <svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="none"
                            stroke="currentColor" strokeWidth="3"
                            strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </motion.span>
                      )}
                    </button>
                  );
                })}

                <div className="mx-3 mt-1.5 mb-1 h-px" style={{ background: isLight ? "#f1f5f9" : "var(--border-default)" }} />
                <p className="px-4 py-1.5 text-[10px]" style={{ color: isLight ? "#9ca3af" : "var(--text-faint)" }}>
                  Saved automatically
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User — avatar circle + name stack, matches screenshot */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ background: avatarBg }}
          >
            M
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold leading-tight" style={{ color: isLight ? "#0f172a" : "var(--text-primary)" }}>
              Meghana
            </p>
            <p className="text-[11px] leading-tight" style={{ color: isLight ? "#6b7280" : "var(--text-faint)" }}>
              AI Interview Candidate
            </p>
          </div>
        </div>

        {/* Logout — red pill, matches screenshot */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold"
          style={{
            background: logoutBg,
            border:     `1px solid ${logoutBorder}`,
            color:      logoutColor,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.80"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1";    }}
        >
          <FaSignOutAlt style={{ fontSize: "12px" }} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
