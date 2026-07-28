import { motion } from "framer-motion";
import { TEMPLATES } from "./constants";
import TemplateCard from "./TemplateCard";

export default function TemplateGallery({
  selectedTpl,
  onSelect,
  favourites,
  onFavourite,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="theme-card rounded-2xl p-4 sm:p-5 mb-6"
      aria-labelledby="template-gallery-heading"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2
          id="template-gallery-heading"
          className="font-semibold text-base"
          style={{ color: "var(--text-primary)" }}
        >
          Choose a Template
        </h2>
        <span
          className="text-xs px-2.5 py-1 rounded-lg font-medium self-start"
          style={{ background: "rgba(124,58,237,0.10)", color: "#A78BFA" }}
        >
          {TEMPLATES.length} templates
        </span>
      </div>

      <div
        role="radiogroup"
        aria-label="Resume template options"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
      >
        {TEMPLATES.map((t) => (
          <TemplateCard
            key={t.id}
            tpl={t}
            selected={selectedTpl === t.id}
            onSelect={onSelect}
            onFavourite={onFavourite}
            isFav={favourites.has(t.id)}
          />
        ))}
      </div>
    </motion.section>
  );
}
