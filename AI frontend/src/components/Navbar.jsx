import { useState, useRef, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useTheme } from "../context/ThemeContext";

/* ── Inline SVG helpers ──────────────────────────────────────── */
const SearchIcon  = () => <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>;
const BellIcon    = () => <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>;
const MoonIcon    = () => <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" /></svg>;
const SunIcon     = () => <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const MonitorIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
const ChevronIcon = ({ open }) => <svg className="w-3 h-3" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;
const LogoutIcon  = () => <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/></svg>;
const CheckIcon   = () => <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

/* ── Theme options ─────────────────────────────────────────── */
const THEME_OPTIONS = [
  { value: "dark",   label: "Dark Mode",      color: "#A78BFA", Icon: MoonIcon    },
  { value: "light",  label: "Light Mode",     color: "#FCD34D", Icon: SunIcon     },
  { value: "system", label: "System Default", color: "#4ADE80", Icon: MonitorIcon },
];

/* ── Sample notifications ──────────────────────────────────── */
const NOTIFICATIONS = [
  { id: 1, icon: "🎯", title: "ATS Score Improved",   body: "Your resume score jumped to 89%",          time: "2m ago",  unread: true  },
  { id: 2, icon: "🏢", title: "New Company Added",     body: "Razorpay is now in the platform",           time: "1h ago",  unread: true  },
  { id: 3, icon: "📚", title: "Learning Reminder",     body: "You haven't studied today — keep streak!",  time: "3h ago",  unread: false },
  { id: 4, icon: "✅", title: "Mock Interview Done",    body: "Grade B — review your feedback",            time: "Yesterday",unread: false },
];

function Navbar() {
  const navigate = useNavigate();
  const { preference, resolved, setTheme } = useTheme();
  const isLight = resolved === "light";

  const [themeOpen, setThemeOpen]     = useState(false);
  const [notifOpen, setNotifOpen]     = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [unread, setUnread]           = useState(NOTIFICATIONS.filter(n => n.unread).length);

  const themeRef   = useRef(null);
  const notifRef   = useRef(null);
  const profileRef = useRef(null);
  const themeId    = useId();
  const notifId    = useId();
  const profileId  = useId();

  /* ── Close all dropdowns on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (!themeRef.current?.contains(e.target))   setThemeOpen(false);
      if (!notifRef.current?.contains(e.target))   setNotifOpen(false);
      if (!profileRef.current?.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── Escape closes dropdowns ── */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") { setThemeOpen(false); setNotifOpen(false); setProfileOpen(false); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleLogout = async () => {
    try { await signOut(auth); navigate("/"); }
    catch (err) { console.error("Logout:", err); }
  };

  const handleTheme = (v) => { setTheme(v); setThemeOpen(false); };
  const markAllRead = () => setUnread(0);

  /* ── Dynamic nav styles ── */
  const navBg     = isLight ? "#ffffff" : "rgba(17,24,39,0.88)";
  const navBorder = isLight ? "#E2E8F0" : "rgba(124,58,237,0.18)";
  const navShadow = isLight ? "0 1px 0 #E2E8F0, 0 2px 12px rgba(0,0,0,0.06)" : "0 1px 0 rgba(124,58,237,0.12)";
  const searchBg  = isLight ? "#F8FAFC"  : "rgba(30,41,59,0.60)";
  const inputBorderColor = isLight ? "#E2E8F0" : "rgba(124,58,237,0.22)";

  /* ── Dropdown shared styles ── */
  const dropdownStyle = {
    background:  isLight ? "#ffffff" : "#111827",
    border:      `1px solid ${isLight ? "#E2E8F0" : "rgba(124,58,237,0.22)"}`,
    boxShadow:   isLight ? "0 8px 32px rgba(0,0,0,0.12)" : "0 16px 48px rgba(0,0,0,0.40)",
  };

  const IconBtn = ({ onClick, children, label, ref: _r }) => (
    <button
      onClick={onClick}
      aria-label={label}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
      style={{ color: "var(--text-muted)", border: `1px solid ${navBorder}`, background: "transparent" }}
      onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-hover)"; e.currentTarget.style.borderColor = "var(--accent-primary)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = navBorder; }}
    >
      {children}
    </button>
  );

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-5 py-3 mb-6 rounded-2xl"
      style={{ background: navBg, backdropFilter: isLight ? "none" : "blur(20px)", WebkitBackdropFilter: isLight ? "none" : "blur(20px)", border: `1px solid ${navBorder}`, boxShadow: navShadow }}
    >
      {/* ── Search ── */}
      <div className="relative w-64">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-faint)" }}>
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search companies, skills..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
          style={{ background: searchBg, border: `1px solid ${inputBorderColor}`, color: "var(--text-primary)" }}
          onFocus={e => { e.target.style.borderColor = "#7C3AED"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.14)"; }}
          onBlur={e  => { e.target.style.borderColor = inputBorderColor; e.target.style.boxShadow = "none"; }}
        />
      </div>

      {/* ── Right Controls ── */}
      <div className="flex items-center gap-2">

        {/* ── Appearance ── */}
        <div ref={themeRef} className="relative">
          <button
            id={themeId}
            aria-haspopup="true"
            aria-expanded={themeOpen}
            onClick={() => { setThemeOpen(v => !v); setNotifOpen(false); setProfileOpen(false); }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200"
            style={{ color: "var(--text-muted)", border: `1px solid ${navBorder}`, background: "transparent" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#7C3AED"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = navBorder; }}
          >
            <span style={{ color: resolved === "dark" ? "#A78BFA" : "#FCD34D" }}>
              {resolved === "dark" ? <MoonIcon /> : <SunIcon />}
            </span>
            <span className="hidden sm:inline text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
              Appearance
            </span>
            <ChevronIcon open={themeOpen} />
          </button>

          <AnimatePresence>
            {themeOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit={{    opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.16 }}
                className="absolute right-0 mt-2 w-52 rounded-2xl overflow-hidden z-50 py-1.5"
                style={{ top: "100%", ...dropdownStyle }}
              >
                <p className="px-4 pt-2 pb-1.5 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
                  Appearance
                </p>
                <div className="mx-3 mb-1 h-px" style={{ background: "var(--border-default)" }} />
                {THEME_OPTIONS.map(({ value, label, color, Icon }) => {
                  const active = preference === value;
                  return (
                    <button
                      key={value}
                      role="menuitemradio"
                      aria-checked={active}
                      onClick={() => handleTheme(value)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-left outline-none"
                      style={{ background: active ? `${color}14` : "transparent", color: active ? color : "var(--text-muted)" }}
                      onMouseEnter={e => { if (!active) e.currentTarget.style.background = "var(--bg-hover)"; }}
                      onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
                    >
                      <span className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: active ? `${color}22` : "var(--border-subtle)", color: active ? color : "var(--text-faint)" }}>
                        <Icon />
                      </span>
                      <span className="flex-1">{label}</span>
                      {active && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                          className="w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ background: `${color}22`, color }}>
                          <CheckIcon />
                        </motion.span>
                      )}
                    </button>
                  );
                })}
                <div className="mx-3 mt-1 mb-1 h-px" style={{ background: "var(--border-default)" }} />
                <p className="px-4 py-1.5 text-[10px]" style={{ color: "var(--text-faint)" }}>Saved automatically</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Notifications ── */}
        <div ref={notifRef} className="relative">
          <button
            id={notifId}
            aria-label="Notifications"
            onClick={() => { setNotifOpen(v => !v); setThemeOpen(false); setProfileOpen(false); }}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{ color: "var(--text-muted)", border: `1px solid ${navBorder}`, background: "transparent" }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-hover)"; e.currentTarget.style.borderColor = "#7C3AED"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = navBorder; }}
          >
            <BellIcon />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899)" }}>
                {unread}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit={{    opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.16 }}
                className="absolute right-0 mt-2 w-80 rounded-2xl overflow-hidden z-50"
                style={{ top: "100%", ...dropdownStyle }}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid var(--border-default)` }}>
                  <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    Notifications
                    {unread > 0 && (
                      <span className="ml-2 px-1.5 py-0.5 rounded-md text-[10px] font-bold"
                        style={{ background: "rgba(124,58,237,0.15)", color: "#A78BFA" }}>
                        {unread} new
                      </span>
                    )}
                  </h3>
                  {unread > 0 && (
                    <button onClick={markAllRead}
                      className="text-[11px] font-semibold hover:opacity-70 transition-opacity"
                      style={{ color: "#A78BFA" }}>
                      Mark all read
                    </button>
                  )}
                </div>

                {/* List */}
                <div className="divide-y" style={{ borderColor: "var(--border-subtle)" }}>
                  {NOTIFICATIONS.map((n) => (
                    <div key={n.id}
                      className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors duration-150"
                      style={{ background: n.unread ? "rgba(124,58,237,0.04)" : "transparent" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-hover)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = n.unread ? "rgba(124,58,237,0.04)" : "transparent"; }}
                    >
                      <span className="text-xl leading-none flex-shrink-0 mt-0.5">{n.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate" style={{ color: "var(--text-primary)" }}>{n.title}</p>
                        <p className="text-xs mt-0.5 truncate" style={{ color: "var(--text-faint)" }}>{n.body}</p>
                        <p className="text-[10px] mt-1" style={{ color: "var(--text-faint)" }}>{n.time}</p>
                      </div>
                      {n.unread && (
                        <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                          style={{ background: "#7C3AED" }} />
                      )}
                    </div>
                  ))}
                </div>

                <div className="px-4 py-2.5" style={{ borderTop: `1px solid var(--border-default)` }}>
                  <button className="w-full text-xs font-semibold py-2 rounded-xl transition-colors duration-150 hover:opacity-75"
                    style={{ color: "#A78BFA" }}>
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Profile ── */}
        <div ref={profileRef} className="relative">
          <button
            id={profileId}
            aria-haspopup="true"
            aria-expanded={profileOpen}
            onClick={() => { setProfileOpen(v => !v); setThemeOpen(false); setNotifOpen(false); }}
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl transition-all duration-200"
            style={{ border: `1px solid ${navBorder}`, background: "transparent" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#7C3AED"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = navBorder; }}
          >
            {/* Avatar */}
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)" }}>
              M
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold leading-tight" style={{ color: "var(--text-primary)" }}>Meghana</p>
              <p className="text-[10px] leading-tight" style={{ color: "var(--text-faint)" }}>AI Candidate</p>
            </div>
            <ChevronIcon open={profileOpen} />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit={{    opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.16 }}
                className="absolute right-0 mt-2 w-56 rounded-2xl overflow-hidden z-50 py-1.5"
                style={{ top: "100%", ...dropdownStyle }}
              >
                {/* Profile header */}
                <div className="px-4 py-3" style={{ borderBottom: `1px solid var(--border-default)` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)" }}>
                      M
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Meghana</p>
                      <p className="text-xs" style={{ color: "var(--text-faint)" }}>meghana@gmail.com</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#22C55E" }} />
                    <span className="text-[10px] font-medium" style={{ color: "var(--color-green-text)" }}>Active · AI Candidate</span>
                  </div>
                </div>

                {/* Menu items */}
                {[
                  { label: "View Profile",  path: "/profile",  emoji: "👤" },
                  { label: "Settings",      path: "/settings", emoji: "⚙️" },
                  { label: "Analytics",     path: "/analytics",emoji: "📊" },
                ].map(({ label, path, emoji }) => (
                  <button key={label}
                    onClick={() => { navigate(path); setProfileOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-left"
                    style={{ color: "var(--text-muted)", background: "transparent" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-hover)"; e.currentTarget.style.color = "var(--text-primary)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-muted)"; }}
                  >
                    <span className="text-base">{emoji}</span>
                    {label}
                  </button>
                ))}

                <div className="mx-3 my-1 h-px" style={{ background: "var(--border-default)" }} />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-left"
                  style={{ color: "var(--color-red-text)", background: "transparent" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  <LogoutIcon />
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
}

export default Navbar;
