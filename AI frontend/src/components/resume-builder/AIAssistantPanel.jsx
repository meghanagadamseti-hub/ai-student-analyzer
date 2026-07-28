import { motion, AnimatePresence } from "framer-motion";
import { AI_FEATURES, COMPANIES_LIST } from "./constants";
import AISuggestionItem from "./AISuggestionItem";

export default function AIAssistantPanel({
  aiCompany,
  setAiCompany,
  aiPanelOpen,
  setAiPanelOpen,
  aiLoading,
  aiSuggestions,
  activeFeature,
  selectedTemplateName,
  onRunAI,
  onApply,
  onClear,
}) {
  const panelId = "ai-assistant-panel";

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-2xl p-4 sm:p-5"
      style={{
        background: "linear-gradient(135deg,rgba(124,58,237,0.12),rgba(109,40,217,0.08))",
        border: "1px solid rgba(124,58,237,0.28)",
      }}
      aria-labelledby="ai-assistant-heading"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#7C3AED,#6D28D9)" }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 20 20" fill="white" className="w-4 h-4">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div>
            <h2 id="ai-assistant-heading" className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
              AI Assistant
            </h2>
            <p className="text-xs" style={{ color: "var(--text-faint)" }}>
              Company-specific suggestions
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="ai-company-select" className="sr-only">
              Target company for AI suggestions
            </label>
            <select
              id="ai-company-select"
              value={aiCompany}
              onChange={(e) => setAiCompany(e.target.value)}
              className="select-dark text-xs w-full sm:w-auto"
              style={{ minWidth: "160px", padding: "8px 32px 8px 12px" }}
            >
              {COMPANIES_LIST.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => setAiPanelOpen((v) => !v)}
            aria-expanded={aiPanelOpen}
            aria-controls={panelId}
            className="px-3 py-2 rounded-xl text-xs font-semibold transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ background: "rgba(124,58,237,0.14)", color: "#A78BFA", border: "1px solid rgba(124,58,237,0.28)", outlineColor: "#A78BFA" }}
          >
            {aiPanelOpen ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {aiPanelOpen && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-5">
              {AI_FEATURES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => onRunAI(f.id, f.section)}
                  disabled={aiLoading && activeFeature === f.id}
                  aria-label={`${f.label} for ${aiCompany}`}
                  aria-busy={aiLoading && activeFeature === f.id}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center transition-all hover:scale-[1.03] active:scale-[0.97] disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    background:
                      activeFeature === f.id && !aiLoading
                        ? "rgba(124,58,237,0.18)"
                        : "rgba(124,58,237,0.07)",
                    border: `1px solid ${activeFeature === f.id ? "rgba(124,58,237,0.40)" : "rgba(124,58,237,0.18)"}`,
                    outlineColor: "#A78BFA",
                  }}
                >
                  <span className="text-xl" aria-hidden="true">
                    {f.emoji}
                  </span>
                  <span className="text-[10px] font-semibold leading-tight" style={{ color: "var(--text-muted)" }}>
                    {f.label}
                  </span>
                </button>
              ))}
            </div>

            <div aria-live="polite" aria-atomic="true" className="min-h-[1px]">
              {aiLoading && (
                <div
                  className="flex items-center gap-3 p-4 rounded-xl mb-4"
                  style={{ background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.20)" }}
                  role="status"
                >
                  <div
                    className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin flex-shrink-0"
                    style={{ borderColor: "#7C3AED", borderTopColor: "transparent" }}
                    aria-hidden="true"
                  />
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    AI is generating {aiCompany}-specific suggestions…
                  </p>
                </div>
              )}

              {!aiLoading && aiSuggestions.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
                      AI Generated for {aiCompany}
                    </p>
                    <button
                      type="button"
                      onClick={onClear}
                      className="text-[11px] hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
                      style={{ color: "var(--text-faint)", outlineColor: "#A78BFA" }}
                    >
                      Clear
                    </button>
                  </div>
                  {aiSuggestions.map((s, i) => (
                    <AISuggestionItem
                      key={`${s.text}-${i}`}
                      text={s.text}
                      onApply={(t) => onApply(t, s.section)}
                    />
                  ))}
                </motion.div>
              )}

              {!aiLoading && aiSuggestions.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <span className="text-3xl mb-2" aria-hidden="true">
                    🤖
                  </span>
                  <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                    Select a feature above to get AI suggestions
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--text-faint)" }}>
                    Tailored specifically for {aiCompany} · {selectedTemplateName} template
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
