import { motion } from "framer-motion";

export default function TemplateCard({
  tpl,
  selected,
  onSelect,
  onFavourite,
  isFav,
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18 }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        border: selected
          ? `2px solid ${tpl.accent}`
          : "1px solid var(--border-default)",
        boxShadow: selected ? `0 0 0 3px ${tpl.accent}28` : "none",
      }}
      aria-current={selected ? "true" : undefined}
    >
      {/* Mini preview */}
      <div
        className="relative h-32 sm:h-36 flex flex-col gap-1.5 p-3"
        style={{ background: tpl.preview.bg }}
        aria-hidden="true"
      >
        <div
          className="h-6 rounded-lg w-3/4"
          style={{ background: tpl.preview.header, opacity: 0.9 }}
        />
        {[100, 80, 90, 70, 85].map((w, i) => (
          <div
            key={i}
            className="h-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.12)", width: `${w}%` }}
          />
        ))}
        {tpl.badge && (
          <span
            className="absolute top-2.5 right-2.5 text-[9px] font-bold px-2 py-0.5 rounded-md text-white"
            style={{ background: tpl.badgeColor }}
          >
            {tpl.badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => onFavourite(tpl.id)}
          aria-label={isFav ? `Remove ${tpl.name} from favourites` : `Add ${tpl.name} to favourites`}
          aria-pressed={isFav}
          className="absolute bottom-2.5 right-2.5 w-6 h-6 rounded-lg flex items-center justify-center transition-all hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            background: isFav ? `${tpl.accent}30` : "rgba(255,255,255,0.08)",
            color: isFav ? tpl.accent : "#94A3B8",
            outlineColor: tpl.accent,
          }}
        >
          <svg viewBox="0 0 20 20" fill={isFav ? "currentColor" : "none"} stroke="currentColor" className="w-3 h-3" aria-hidden="true">
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="p-3" style={{ background: "var(--bg-elevated)" }}>
        <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
          {tpl.name}
        </p>
        <p className="text-[11px] mb-2 line-clamp-2 sm:line-clamp-1" style={{ color: "var(--text-faint)" }}>
          {tpl.desc}
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {tpl.tags.map((t) => (
            <span
              key={t}
              className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
              style={{ background: `${tpl.accent}18`, color: tpl.accent }}
            >
              {t}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onSelect(tpl.id)}
          aria-pressed={selected}
          className="w-full py-1.5 rounded-xl text-[11px] font-bold text-white transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            background: selected ? tpl.accent : `${tpl.accent}30`,
            color: selected ? "#fff" : tpl.accent,
            outlineColor: tpl.accent,
          }}
        >
          {selected ? "✓ Selected" : "Use Template"}
        </button>
      </div>
    </motion.article>
  );
}
