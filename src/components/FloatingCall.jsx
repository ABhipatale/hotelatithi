import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

import { WhatsappIcon } from "./ui/BrandIcons";
import { SITE } from "../data/siteData";

/**
 * Regions that already put a phone number and a primary CTA on screen.
 *
 * "site-footer" is an id rather than a `footer` tag lookup: the testimonial and
 * owner quotes each carry their own <footer> for the attribution, which is
 * correct HTML, so querySelector("footer") matched a 65px quote credit near the
 * top of the page instead of the real one.
 */
const REDUNDANT_SECTIONS = ["reservation", "contact", "site-footer"];

/**
 * Persistent call / WhatsApp affordance. Most guests land here on a phone, so
 * the fastest path to a booking stays one thumb-tap away at all times.
 *
 * Two controls, not three: back-to-top used to live here as well, but the
 * navbar is fixed and its logo already returns to the top, and three stacked
 * circles is most of a thumb's reach on a 360px screen.
 */
export default function FloatingCall() {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [nearCta, setNearCta] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolledPastHero(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Step aside for the booking form and contact card — otherwise the pill can
  // land on top of the "Book My Table" button at tablet widths.
  useEffect(() => {
    const sections = REDUNDANT_SECTIONS.map((id) => document.getElementById(id)).filter(
      Boolean
    );
    if (!sections.length) return;

    const seen = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) seen.add(entry.target);
          else seen.delete(entry.target);
        });
        setNearCta(seen.size > 0);
      },
      { rootMargin: "-25% 0px -20% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const visible = scrolledPastHero && !nearCta;

  return (
    <div
      className={`fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 transition-all duration-300 sm:bottom-7 sm:right-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <a
        href={SITE.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Hotel Atithi on WhatsApp"
        tabIndex={visible ? 0 : -1}
        aria-hidden={visible ? undefined : "true"}
        className="grid size-12 place-items-center rounded-full bg-whatsapp text-white shadow-lift transition-transform duration-300 hover:scale-110 sm:size-14"
      >
        <WhatsappIcon className="size-6 sm:size-7" />
      </a>

      {/* Phones get a compact dial button so it never sits on top of content;
          wider screens have room for the full number. */}
      <a
        href={SITE.phoneHref}
        aria-label={`Call Hotel Atithi on ${SITE.phone}`}
        tabIndex={visible ? 0 : -1}
        aria-hidden={visible ? undefined : "true"}
        className="relative flex items-center gap-3 rounded-full bg-vermillion p-1.5 text-white shadow-ember transition-transform duration-300 hover:scale-[1.03] sm:py-2.5 sm:pl-2.5 sm:pr-5"
      >
        <span
          aria-hidden="true"
          className="absolute left-1.5 grid size-11 place-items-center sm:left-2.5"
        >
          <span className="absolute size-11 animate-ripple rounded-full bg-vermillion" />
        </span>

        <span className="relative grid size-11 shrink-0 place-items-center rounded-full bg-cream text-vermillion">
          <Phone className="size-5" aria-hidden="true" />
        </span>

        <span className="relative hidden leading-tight sm:block">
          <span className="block text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/90">
            Call Now
          </span>
          <span className="block text-sm font-bold tabular-nums">{SITE.phone}</span>
        </span>
      </a>
    </div>
  );
}
