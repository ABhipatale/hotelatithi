/**
 * The small Latin eyebrow riding a hairline that opens every section.
 * Was hand-copied into four components; this is now the one definition.
 */
export default function Kicker({
  children,
  tone = "dark",
  centered = false,
  className = "",
}) {
  const rule = <span aria-hidden="true" className="h-px w-7 bg-current opacity-50" />;

  return (
    <span
      className={`inline-flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.34em] ${
        tone === "light" ? "text-saffron" : "text-vermillion"
      } ${className}`}
    >
      {rule}
      {children}
      {centered && rule}
    </span>
  );
}
