function PreviewSection({ title, accent, children }) {
  if (!children) return null;
  return (
    <div className="mb-3">
      <h2
        className="text-[11px] font-black uppercase tracking-wider mb-1"
        style={{ color: accent }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function ResumePreview({ data, tplAccent }) {
  const skills = data.skills
    ? data.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div
      className="rounded-xl p-4 sm:p-5 text-[10px] leading-relaxed font-sans h-full overflow-y-auto"
      style={{ background: "#FFFFFF", color: "#111827", minHeight: "min(540px, 70vh)" }}
      aria-label="Resume preview"
      role="document"
    >
      <div className="pb-3 mb-3" style={{ borderBottom: `2px solid ${tplAccent}` }}>
        <h1 className="text-base sm:text-lg font-black" style={{ color: "#111827" }}>
          {data.name || "Your Name"}
        </h1>
        <p className="text-[11px] mt-0.5" style={{ color: "#374151" }}>
          {data.title || "Software Engineer"}
        </p>
        <ul className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 text-[9px] list-none p-0 m-0" style={{ color: "#6B7280" }}>
          {data.email && <li>✉ {data.email}</li>}
          {data.phone && <li>📞 {data.phone}</li>}
          {data.location && <li>📍 {data.location}</li>}
          {data.github && <li>🔗 {data.github}</li>}
          {data.linkedin && <li>💼 {data.linkedin}</li>}
        </ul>
      </div>

      <PreviewSection title="Summary" accent={tplAccent}>
        {data.summary && <p style={{ color: "#374151" }}>{data.summary}</p>}
      </PreviewSection>

      <PreviewSection title="Skills" accent={tplAccent}>
        {skills.length > 0 && (
          <ul className="flex flex-wrap gap-1 list-none p-0 m-0">
            {skills.map((s) => (
              <li
                key={s}
                className="px-1.5 py-0.5 rounded text-[9px] font-semibold"
                style={{ background: `${tplAccent}15`, color: tplAccent }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </PreviewSection>

      <PreviewSection title="Experience" accent={tplAccent}>
        {data.experience && (
          <p style={{ color: "#374151", whiteSpace: "pre-wrap" }}>{data.experience}</p>
        )}
      </PreviewSection>

      <PreviewSection title="Projects" accent={tplAccent}>
        {data.projects && (
          <p style={{ color: "#374151", whiteSpace: "pre-wrap" }}>{data.projects}</p>
        )}
      </PreviewSection>

      <PreviewSection title="Education" accent={tplAccent}>
        {data.education && <p style={{ color: "#374151" }}>{data.education}</p>}
      </PreviewSection>

      <PreviewSection title="Certifications" accent={tplAccent}>
        {data.certifications && (
          <p style={{ color: "#374151", whiteSpace: "pre-wrap" }}>{data.certifications}</p>
        )}
      </PreviewSection>
    </div>
  );
}
