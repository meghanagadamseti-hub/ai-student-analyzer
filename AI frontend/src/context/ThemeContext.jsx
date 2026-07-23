import { createContext, useContext, useEffect, useState, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────
   ThemeContext
   Manages:  "dark" | "light" | "system"
   Resolves: which data-theme value to apply  ("dark" | "light")
   Persists: localStorage key "ais-theme"
───────────────────────────────────────────────────────────── */

const ThemeContext = createContext(null);

const STORAGE_KEY = "ais-theme";

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(preference) {
  return preference === "system" ? getSystemTheme() : preference;
}

export function ThemeProvider({ children }) {
  // "dark" | "light" | "system"
  const [preference, setPreference] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || "dark";
  });

  // The actual applied theme ("dark" | "light")
  const [resolved, setResolved] = useState(() =>
    resolveTheme(localStorage.getItem(STORAGE_KEY) || "dark")
  );

  /* Apply data-theme to <html> and persist */
  const applyTheme = useCallback((pref) => {
    const theme = resolveTheme(pref);
    document.documentElement.setAttribute("data-theme", theme);
    setResolved(theme);
  }, []);

  /* On preference change */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, preference);
    applyTheme(preference);
  }, [preference, applyTheme]);

  /* Listen for OS theme changes when "system" is selected */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (preference === "system") applyTheme("system");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [preference, applyTheme]);

  /* Hydrate on first mount */
  useEffect(() => {
    applyTheme(preference);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = useCallback((pref) => {
    setPreference(pref);
  }, []);

  return (
    <ThemeContext.Provider value={{ preference, resolved, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
