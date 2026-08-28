/**
 * Gold rule with a diamond centre — the divider that recurs under every
 * section title. `tone` flips it for dark and light grounds.
 */
export default function Ornament({ className = "", tone = "dark" }) {
  const line =
    tone === "light"
      ? "from-transparent via-saffron/70 to-transparent"
      : "from-transparent via-gold to-transparent";
  const pip = tone === "light" ? "bg-saffron" : "bg-vermillion";
  const ring = tone === "light" ? "border-saffron/80" : "border-gold";

  return (
    <div className={`flex items-center gap-2 ${className}`} aria-hidden="true">
      <span className={`h-px w-10 origin-right animate-draw-rule bg-gradient-to-r sm:w-16 ${line}`} />
      <span className={`size-1.5 rotate-45 ${pip}`} />
      <span className={`size-2.5 rotate-45 border ${ring}`} />
      <span className={`size-1.5 rotate-45 ${pip}`} />
      <span className={`h-px w-10 origin-left animate-draw-rule bg-gradient-to-r sm:w-16 ${line}`} />
    </div>
  );
}
