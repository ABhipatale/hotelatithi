/**
 * NOTE ON VISIBILITY: `BASE` hardcodes `inline-flex`, and Tailwind emits
 * `.hidden` *before* `.inline-flex`, so passing `className="hidden sm:..."`
 * to a Button does NOT hide it — `.inline-flex` wins on source order. Wrap the
 * button in a span that carries the responsive visibility instead.
 */
const BASE =
  "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-wide transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const VARIANTS = {
  amber:
    "grad-ember text-white shadow-[0_18px_40px_-14px_rgba(200,16,46,0.65)] hover:-translate-y-0.5 hover:shadow-[0_22px_46px_-14px_rgba(200,16,46,0.75)]",
  ember:
    "bg-vermillion text-white shadow-ember hover:bg-vermillion-2 hover:-translate-y-0.5",
  sun: "bg-saffron text-ink shadow-sun hover:bg-saffron-2 hover:-translate-y-0.5",
  ink: "bg-ink text-cream hover:bg-ink-3 hover:-translate-y-0.5",
  outlineInk:
    "border-2 border-vermillion/40 bg-white text-vermillion hover:border-vermillion hover:bg-vermillion hover:text-white hover:-translate-y-0.5 hover:shadow-soft",
  /* Quiet action for inside a card: reads as a control, not as a second
     headline. Six of these in a grid must not out-shout the photography. */
  quiet:
    "border-2 border-vermillion/30 bg-vermillion/10 text-vermillion hover:border-transparent hover:grad-ember hover:text-white hover:shadow-[0_14px_30px_-14px_rgba(200,16,46,0.7)]",
  outlineLight:
    "border-2 border-cream/45 bg-ink/35 text-cream backdrop-blur-md hover:border-saffron hover:bg-saffron hover:text-ink hover:-translate-y-0.5",
};

const SIZES = {
  xs: "px-4 py-2 text-[0.82rem]",
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3 text-sm sm:text-base",
  lg: "px-7 py-3.5 text-base sm:px-9 sm:py-4",
};

export default function Button({
  as = "button",
  variant = "ember",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const Tag = as;
  return (
    <Tag
      className={`${BASE} ${VARIANTS[variant] ?? VARIANTS.ember} ${SIZES[size] ?? SIZES.md} ${className}`}
      {...props}
    >
      <span className="relative flex items-center gap-2">{children}</span>
    </Tag>
  );
}
