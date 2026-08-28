import Reveal from "./Reveal";
import Ornament from "./Ornament";
import Kicker from "./Kicker";

/**
 * Editorial section header: a small Latin kicker riding a rule, a large
 * Marathi headline, the gold ornament, then an optional standfirst.
 *
 * `align` covers the three arrangements the page actually uses. "responsive"
 * is the asymmetric-section case — centred while the layout is stacked, flush
 * left once the two columns split. About and Our Promise each drew their own
 * copy of these four elements before this existed, which is how their type
 * scales drifted apart.
 *
 * `tone="light"` is required on any dark ground: the default ink headline is
 * invisible on ink.
 */
const ALIGN = {
  center: { header: "mx-auto max-w-2xl text-center", row: "justify-center", cap: true },
  left: { header: "max-w-2xl", row: "", cap: false },
  responsive: {
    header: "mx-auto max-w-2xl text-center lg:mx-0 lg:text-left",
    row: "justify-center lg:justify-start",
    cap: false,
  },
};

export default function SectionHeading({
  id,
  kicker,
  title,
  subtitle,
  align = "center",
  tone = "dark",
  className = "",
  titleClassName = "",
  children,
}) {
  const layout = ALIGN[align] ?? ALIGN.center;
  const light = tone === "light";

  return (
    <header className={`${layout.header} ${className}`}>
      {kicker && (
        <Reveal delay={40} className={`flex ${layout.row}`}>
          <Kicker tone={tone} centered={layout.cap}>
            {kicker}
          </Kicker>
        </Reveal>
      )}

      <Reveal delay={90}>
        <h2
          id={id}
          className={`mt-4 font-marathi text-[2rem] leading-[1.22] sm:text-[2.6rem] lg:text-[3.1rem] ${
            light ? "text-cream" : "text-ink"
          } ${titleClassName}`}
        >
          {title}
        </h2>
      </Reveal>

      <Reveal delay={140} className={`flex ${layout.row}`}>
        <Ornament tone={light ? "light" : "dark"} className="mt-5" />
      </Reveal>

      {subtitle && (
        <Reveal delay={190}>
          <p
            className={`mt-5 text-base leading-relaxed sm:text-lg ${
              light ? "text-cream/80" : "text-ink/75"
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}

      {children}
    </header>
  );
}
