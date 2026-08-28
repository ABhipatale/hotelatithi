import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Quote, Star } from "lucide-react";

import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { TESTIMONIALS } from "../data/testimonialsData";

const AUTOPLAY_MS = 6500;

/** Autoplay is opt-out for everyone and off by default under reduced motion. */
function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  const [hovered, setHovered] = useState(false);

  const paginate = useCallback((step) => {
    setIndex(
      (current) => (current + step + TESTIMONIALS.length) % TESTIMONIALS.length
    );
  }, []);

  useEffect(() => {
    if (!playing || hovered) return;
    const timer = setInterval(() => paginate(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [playing, hovered, paginate, index]);

  /** Stepping manually should stop the carousel moving under the reader. */
  const goTo = (nextIndex) => {
    setPlaying(false);
    setIndex(nextIndex);
  };
  const step = (delta) => {
    setPlaying(false);
    paginate(delta);
  };

  const active = TESTIMONIALS[index];

  return (
    <section id="reviews" className="section-pad relative overflow-hidden bg-cream">
      <div className="shell relative">
        <SectionHeading
          kicker="Reviews"
          title="आमचे ग्राहक काय म्हणतात?"
          subtitle="आमच्या पाहुण्यांचे शब्द हीच आमची खरी कमाई."
        />

        <Reveal delay={140}>
          <div
            className="relative mx-auto mt-12 max-w-3xl"
            role="group"
            aria-roledescription="carousel"
            aria-label="ग्राहकांचे अभिप्राय"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocusCapture={() => setHovered(true)}
            onBlurCapture={() => setHovered(false)}
          >
            <div className="relative overflow-hidden rounded-3xl border border-sand-2 bg-white px-6 py-11 shadow-soft sm:px-12 sm:py-14">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 rule-gold" />
              <Quote
                aria-hidden="true"
                className="absolute -left-3 top-4 size-24 text-vermillion/[0.06] sm:size-32"
              />

              {/* The quote swaps in place, so it has to announce itself —
                  silently replaced text is invisible to a screen reader. */}
              <div
                className="relative min-h-[16rem] sm:min-h-[13.5rem]"
                aria-live="polite"
                aria-atomic="true"
              >
                <blockquote key={active.id} className="animate-fade-in text-center">
                  <p className="sr-only">
                    अभिप्राय {index + 1} / {TESTIMONIALS.length}
                  </p>

                  <div
                    className="flex justify-center gap-1"
                    role="img"
                    aria-label={`${active.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        aria-hidden="true"
                        className={`size-5 ${
                          starIndex < active.rating
                            ? "fill-saffron text-gold"
                            : "fill-sand text-sand-2"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="mt-6 font-marathi text-xl leading-[1.85] text-ink sm:text-2xl">
                    “{active.quoteMr}”
                  </p>

                  <footer className="mt-8 flex items-center justify-center gap-3">
                    <span
                      aria-hidden="true"
                      className="grid size-12 place-items-center rounded-full bg-vermillion font-marathi text-xl text-white shadow-ember"
                    >
                      {active.name.trim().slice(0, 1)}
                    </span>
                    <span className="text-left">
                      <cite className="block font-marathi text-lg not-italic text-ink">
                        {active.name}
                      </cite>
                      <span className="font-mr-ui text-sm text-ink/70">
                        {active.roleMr}
                      </span>
                    </span>
                  </footer>
                </blockquote>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4 sm:gap-5">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="मागील अभिप्राय"
                className="grid size-11 place-items-center rounded-full border-2 border-sand-2 bg-white text-ink transition-[background-color,border-color,color] duration-300 hover:border-vermillion hover:bg-vermillion hover:text-white"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((item, dotIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(dotIndex)}
                    aria-label={`अभिप्राय ${dotIndex + 1}`}
                    aria-current={dotIndex === index ? "true" : undefined}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      dotIndex === index
                        ? "w-7 bg-vermillion"
                        : "w-2 bg-sand-2 hover:bg-gold"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => step(1)}
                aria-label="पुढील अभिप्राय"
                className="grid size-11 place-items-center rounded-full border-2 border-sand-2 bg-white text-ink transition-[background-color,border-color,color] duration-300 hover:border-vermillion hover:bg-vermillion hover:text-white"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>

              {/* Hover-to-pause is not reachable by touch or by keyboard, so
                  the control is on the page rather than implied. */}
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                aria-pressed={!playing}
                aria-label={playing ? "स्वयंचलित बदल थांबवा" : "स्वयंचलित बदल सुरू करा"}
                className="grid size-11 place-items-center rounded-full border-2 border-sand-2 bg-white text-ink/70 transition-[background-color,border-color,color] duration-300 hover:border-vermillion hover:text-vermillion"
              >
                {playing ? (
                  <Pause className="size-4" aria-hidden="true" />
                ) : (
                  <Play className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
