/**
 * FloatingAICoach.jsx
 *
 * A global floating action button — like WhatsApp's Meta AI icon.
 * Fixed bottom-right on every page. Clicking navigates to /ai-coach.
 * Tooltip on hover. Pulse ring animation. z-index 9999.
 */
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingAICoach() {
  const [hovered, setHovered] = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  // Hide on the AI Coach page itself — no point showing it there
  if (location.pathname === "/ai-coach") return null;

  return (
    <div
      style={{
        position:   "fixed",
        bottom:     "24px",
        right:      "24px",
        zIndex:     9999,
        display:    "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap:        "10px",
        pointerEvents: "none",   // let tooltip be non-interactive
      }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{   opacity: 0, y: 6, scale: 0.92 }}
            transition={{ duration: 0.18 }}
            style={{
              pointerEvents:   "none",
              background:      "linear-gradient(135deg,#7C3AED,#6D28D9)",
              color:           "#fff",
              fontSize:        "12px",
              fontWeight:      700,
              padding:         "6px 14px",
              borderRadius:    "20px",
              whiteSpace:      "nowrap",
              boxShadow:       "0 4px 18px rgba(124,58,237,0.45)",
              letterSpacing:   "0.02em",
              userSelect:      "none",
            }}
          >
            ✨ AI Career Coach
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse ring */}
      <div style={{ position: "relative", pointerEvents: "auto" }}>
        <motion.div
          aria-hidden="true"
          style={{
            position:     "absolute",
            inset:        "-6px",
            borderRadius: "50%",
            background:   "rgba(124,58,237,0.30)",
            zIndex:       0,
          }}
          animate={{
            scale:   [1, 1.35, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2.2,
            repeat:   Infinity,
            ease:     "easeInOut",
          }}
        />

        {/* Main button */}
        <motion.button
          onClick={() => navigate("/ai-coach")}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={()    => setHovered(true)}
          onBlur={()     => setHovered(false)}
          whileHover={{ scale: 1.12 }}
          whileTap={{   scale: 0.93 }}
          aria-label="Open AI Career Coach"
          title="AI Career Coach"
          style={{
            position:     "relative",
            zIndex:       1,
            width:        "58px",
            height:       "58px",
            borderRadius: "50%",
            border:       "none",
            cursor:       "pointer",
            display:      "flex",
            alignItems:   "center",
            justifyContent: "center",
            background:   "linear-gradient(135deg,#7C3AED,#4F46E5)",
            boxShadow:    hovered
              ? "0 8px 32px rgba(124,58,237,0.70), 0 0 0 3px rgba(124,58,237,0.30)"
              : "0 6px 24px rgba(124,58,237,0.55)",
            transition:   "box-shadow 0.2s ease",
            outline:      "none",
          }}
        >
          {/* Brain / sparkle SVG icon */}
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Simple stylised brain outline */}
            <path
              d="M12 3C9.24 3 7 5.24 7 8c0 1.1.36 2.12.97 2.94C6.79 11.55 6 12.69 6 14
                 c0 1.86 1.28 3.41 3 3.87V19a1 1 0 001 1h4a1 1 0 001-1v-1.13
                 c1.72-.46 3-2.01 3-3.87 0-1.31-.79-2.45-1.97-3.06C17.64 10.12 18 9.1
                 18 8c0-2.76-2.24-5-6-5z"
              fill="white"
              opacity="0.95"
            />
            {/* Stars / sparkles */}
            <circle cx="9"  cy="8"  r="1" fill="rgba(124,58,237,0.9)" />
            <circle cx="15" cy="8"  r="1" fill="rgba(124,58,237,0.9)" />
            <circle cx="12" cy="11" r="1" fill="rgba(124,58,237,0.9)" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}
