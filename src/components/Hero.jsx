import { ArrowRight, ChevronDown, Clock, MapPin } from "lucide-react";

import Button from "./ui/Button";
import Marquee from "./ui/Marquee";
import Reveal from "./ui/Reveal";
import HeroSlideshow from "./HeroSlideshow";
import badge from "../assets/logo/atithi-badge.png";
import { IMAGES } from "../data/images";
import { SITE } from "../data/siteData";
import { useParallax } from "../hooks/useParallax";
import { useMagnetic } from "../hooks/useMagnetic";

/** Five backdrops that rotate behind the hero, one every six seconds. */
const SLIDES = [
  { src: IMAGES.heroCurryBrass, position: "object-[50%_55%]" },
  { src: IMAGES.heroPaneerSpread, position: "object-[50%_50%]" },
  { src: IMAGES.dishTandooriSizzler, position: "object-[50%_42%]" },
  { src: IMAGES.thaliSolkadhi, position: "object-[50%_45%]" },
  // The hall mid-service — the only slide that shows the place rather than a
  // plate, and the only one that is the hotel's own photograph.
  { src: IMAGES.hallGuestsNight, position: "object-[50%_55%]" },
];

const TICKER = [
  "जत्रा धनगरी थाळी",
  "जत्रा धनगरी हंडी",
  "मटण हंडी",
  "मटण मसालेदारी",
  "खिमा पाव",
  "व्हेज थाळी",
  "पिठलं भाकरी",
  "कांदा भजी",
];

/**
 * Centred hero over full-bleed food photography.
 *
 * The dish carries the frame and the type sits on top of it, so the hierarchy
 * is: appetite first, name second, action third. Everything that is not one of
 * those three now sits in a single meta row beneath the buttons — the stack
 * used to be seven separate blocks, which read as a list rather than a poster.
 */
export default function Hero() {
  const backdrop = useParallax(0.1, { max: 90 });
  const cta = useMagnetic(0.2);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-maroon-2"
    >
      {/* ---------------- rotating backdrop ---------------- */}
      <div ref={backdrop} className="absolute -inset-y-24 inset-x-0 -z-20 will-change-transform">
        <HeroSlideshow slides={SLIDES} />
      </div>

      {/* Legibility stack, in the order it is painted:
          1. a maroon veil that carries the nav and the foot of the frame
          2. a centred radial scrim that holds the type itself
          3. a fine amber dot screen for texture
          4. a foot that melts into the cream section below */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 veil-hero-warm" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 veil-center" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 dot-screen opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 fade-to-cream"
      />

      {/* ---------------- centred content ---------------- */}
      <div className="relative flex flex-1 items-center justify-center px-5 pb-24 pt-32 text-center lg:pt-36">
        <div className="w-full max-w-3xl">
          <Reveal variant="scale" scale={0.82} delay={60}>
            <img
              src={badge}
              alt=""
              aria-hidden="true"
              className="mx-auto size-[4.5rem] rounded-full shadow-[0_18px_44px_-14px_rgba(0,0,0,0.75)] ring-2 ring-amber/40 sm:size-[5.25rem]"
            />
          </Reveal>

          {/* The brand line sits inside the H1 on purpose. It is the only place
              the name and the town appear in body text, and it is the first
              thing a stranger to Karad needs. It carries the Roman spelling
              too — plenty of locals search and read in Roman script, and
              nothing else on the page is written that way. */}
          <h1>
            <Reveal as="span" variant="up" delay={140} y={14} className="block">
              <span className="mt-6 block font-mr-ui text-sm font-semibold tracking-wide text-amber sm:text-base">
                हॉटेल अतिथी · Hotel Atithi, Karad
              </span>
            </Reveal>{" "}
            <Reveal as="span" variant="clip" delay={200} className="block">
              <span className="mt-2 block font-marathi text-[clamp(2.4rem,7.4vw,4.75rem)] leading-[1.28] text-cream drop-shadow-[0_3px_18px_rgba(0,0,0,0.55)]">
                अस्सल गावरान चवीची{" "}
                <span className="mt-1 block text-saffron">जत्रा धनगरी थाळी</span>
              </span>
            </Reveal>
          </h1>

          <Reveal variant="up" delay={360}>
            <p className="mx-auto mt-6 max-w-xl font-mr-ui text-base leading-relaxed text-cream/90 sm:text-lg">
              {SITE.tagline} — एकदा चव घेतली की पुन्हा पुन्हा याल.
            </p>
          </Reveal>

          <Reveal variant="up" delay={420}>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <span ref={cta} className="inline-flex will-change-transform">
                <Button
                  as="a"
                  href="#reservation"
                  variant="amber"
                  size="lg"
                  className="shine w-full sm:w-auto"
                >
                  टेबल बुक करा
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
              </span>
              <Button as="a" href="#menu" variant="outlineLight" size="lg">
                मेनू पहा
              </Button>
            </div>
          </Reveal>

          {/* One meta row instead of a location pill above the headline and a
              timing note below the buttons — same three facts, a third of the
              vertical weight. */}
          <Reveal variant="up" delay={500}>
            <ul className="mx-auto mt-9 flex max-w-xl flex-wrap items-center justify-center gap-x-5 gap-y-2.5 font-mr-ui text-[0.85rem] text-cream/85 sm:gap-x-7 sm:text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0 text-amber" />
                कराड · जि. सातारा
              </li>
              <li aria-hidden="true" className="hidden h-3.5 w-px bg-cream/25 sm:block" />
              <li className="flex items-center gap-2">
                <Clock className="size-4 shrink-0 text-amber" />
                ऑर्डरनंतर ३० मिनिटांत ताजं जेवण
              </li>
              <li aria-hidden="true" className="hidden h-3.5 w-px bg-cream/25 sm:block" />
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="size-2.5 rounded-full bg-saffron" />
                व्हेज आणि नॉनव्हेज
              </li>
            </ul>
          </Reveal>
        </div>

        <a
          href="#signature"
          aria-label="Scroll to specials"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full p-2 text-cream/70 transition-colors hover:text-amber lg:block"
        >
          <ChevronDown className="size-7 animate-bounce" />
        </a>
      </div>

      {/* ---------------- ticker ---------------- */}
      <div className="relative z-10 border-t border-amber/25 bg-saffron">
        <Marquee
          items={TICKER}
          speed="44s"
          className="edge-fade-x py-3"
          itemClassName="font-marathi text-base text-ink sm:text-lg"
        />
      </div>
    </section>
  );
}
