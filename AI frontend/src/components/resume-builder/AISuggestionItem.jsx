import { useState } from "react";

export default function AISuggestionItem({ text, onApply }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className="p-3 rounded-xl text-xs leading-relaxed"
      style={{ background: "rgba(124,58,237,0.07)", border: "1px solid var(--border-default)" }}
    >
      <p className="mb-2" style={{ color: "var(--text-muted)" }}>
        {text}
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied to clipboard" : "Copy suggestion to clipboard"}
          className="px-2.5 py-1 rounded-lg font-semibold transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ background: "rgba(124,58,237,0.12)", color: "#A78BFA", fontSize: "10px", outlineColor: "#A78BFA" }}
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
        <button
          type="button"
          onClick={() => onApply(text)}
          className="px-2.5 py-1 rounded-lg font-semibold transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ background: "rgba(34,197,94,0.12)", color: "var(--color-green-text)", fontSize: "10px", outlineColor: "var(--color-green-text)" }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
