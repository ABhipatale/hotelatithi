import Icon from "./Icon";

/**
 * The little saffron dome that carries every feature icon — a quiet echo of
 * the mandir arch used on the photography. Services, Why-Choose-Us, Contact
 * and the promise cards all drew this by hand; they now share one definition,
 * so the hover behaviour can never drift between sections.
 *
 * Pass `name` to pull from the lucide registry, or `glyph` for a component
 * that is not in it (the brand marks, for instance).
 */
const SIZE = {
  sm: { box: "size-11", glyph: "size-5" },
  md: { box: "size-12 sm:size-14", glyph: "size-6 sm:size-7" },
  lg: { box: "size-14 sm:size-16", glyph: "size-6 sm:size-7" },
};

const TONE = {
  // reacts to hover on the nearest `group`
  sun: "bg-saffron text-ink group-hover:bg-vermillion group-hover:text-cream",
  ember: "grad-tile text-white shadow-[0_10px_26px_-10px_rgba(200,16,46,0.7)]",
};

export default function IconTile({
  name,
  glyph: Glyph,
  size = "md",
  tone = "sun",
  className = "",
}) {
  const { box, glyph } = SIZE[size] ?? SIZE.md;

  return (
    <span
      className={`grid shrink-0 place-items-center rounded-t-full rounded-b-lg transition-colors duration-500 ${box} ${
        TONE[tone] ?? TONE.sun
      } ${className}`}
    >
      {Glyph ? (
        <Glyph className={glyph} aria-hidden="true" />
      ) : (
        <Icon name={name} className={glyph} />
      )}
    </span>
  );
}
