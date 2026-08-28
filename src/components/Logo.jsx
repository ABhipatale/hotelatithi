import badge from "../assets/logo/atithi-badge.png";
import { SITE } from "../data/siteData";

/**
 * The circular हॉटेल अतिथी mark plus an optional text lockup.
 * The supplied artwork is used as-is — only cropped to its circle so it sits
 * cleanly on light and dark surfaces alike.
 */
export default function Logo({
  size = "md",
  withText = true,
  tone = "dark",
  className = "",
}) {
  const mark = {
    sm: "size-10",
    md: "size-12 sm:size-14",
    lg: "size-16 sm:size-[4.5rem]",
  }[size];

  const nameSize = {
    sm: "text-base",
    md: "text-lg sm:text-xl",
    lg: "text-2xl",
  }[size];

  const light = tone === "light";

  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <img
        src={badge}
        alt={`${SITE.nameMr} logo`}
        width="112"
        height="112"
        className={`${mark} shrink-0 rounded-full object-cover ring-2 ${
          light ? "ring-cream/25" : "ring-ink/10"
        }`}
      />
      {withText && (
        <span className="flex min-w-0 flex-col leading-none">
          <span
            className={`font-mr-ui font-bold tracking-[-0.01em] ${nameSize} ${
              light ? "text-cream" : "text-ink"
            }`}
          >
            {SITE.nameMr}
          </span>
          <span
            className={`mt-1.5 whitespace-nowrap font-mr-ui text-[0.7rem] ${
              light ? "text-saffron" : "text-vermillion"
            }`}
          >
            {SITE.tagline}
          </span>
        </span>
      )}
    </span>
  );
}
