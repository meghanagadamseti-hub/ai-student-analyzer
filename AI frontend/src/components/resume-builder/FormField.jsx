const inputId = (label) =>
  `field-${label.toLowerCase().replace(/\s+/g, "-")}`;

export default function FormField({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  id: idProp,
}) {
  const id = idProp ?? inputId(label);

  return (
    <div>
      <label
        htmlFor={id}
        className="text-[11px] font-semibold uppercase tracking-wider block mb-1.5"
        style={{ color: "var(--text-faint)" }}
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="input-dark resize-none text-sm w-full"
          style={{ lineHeight: "1.6" }}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="input-dark text-sm w-full"
        />
      )}
    </div>
  );
}
