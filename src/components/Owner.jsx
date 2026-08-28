import { Quote } from "lucide-react";

import Reveal from "./ui/Reveal";
import Kicker from "./ui/Kicker";
import SmartImage from "./ui/SmartImage";
import badge from "../assets/logo/atithi-badge.png";
import { IMAGES } from "../data/images";
import { OWNER, SITE } from "../data/siteData";

/**
 * The face behind the hotel. Sits at the foot of the About section so the
 * story ends with a person rather than a building.
 *
 * Two panels: a maroon one that says who he is, a cream one that carries what
 * he says. The old single white card left the portrait floating in a large
 * empty field with the quote reading as an afterthought.
 */
export default function Owner() {
  return (
    <div className="shell relative mt-20 lg:mt-28">
      <Reveal variant="up" y={34}>
        <article className="relative grid overflow-hidden rounded-[2rem] bg-white shadow-lift lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
          <span aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-1 rule-gold" />

          {/* ---------------- who ---------------- */}
          <div className="relative flex flex-col items-center overflow-hidden bg-maroon px-6 py-10 text-center sm:px-8 lg:py-12">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 motif-dark opacity-[0.07]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 left-1/2 size-64 -translate-x-1/2 rounded-full bg-amber/15 blur-3xl"
            />

            <div className="relative w-52 sm:w-60">
              {/* One arch, ringed. Nesting a padded arch inside another arch
                  gave the frame two different top curves, which is what left
                  that sliver of stray border along the shoulder. */}
              <SmartImage
                src={IMAGES.ownerPortrait}
                alt={`${OWNER.nameMr} — ${OWNER.roleMr}, ${SITE.nameMr}`}
                className="arch shadow-[0_26px_50px_-18px_rgba(0,0,0,0.8)] ring-4 ring-saffron/45"
                ratio="3 / 4"
              />

              <img
                src={badge}
                alt=""
                aria-hidden="true"
                className="absolute -bottom-4 -right-3 size-16 rounded-full ring-4 ring-maroon sm:size-20"
              />
            </div>

            <Reveal variant="up" delay={120} className="relative mt-10">
              <Kicker tone="light" centered>
                Owner
              </Kicker>
            </Reveal>

            <Reveal variant="clip" delay={170}>
              <h3 className="mt-3 font-marathi text-[1.9rem] leading-tight text-cream sm:text-[2.1rem]">
                {OWNER.nameMr}
              </h3>
            </Reveal>

            <Reveal variant="up" delay={220}>
              <p className="mt-1.5 font-mr-ui text-base text-amber">
                {OWNER.roleMr}, {SITE.nameMr}
              </p>
              <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-cream/60">
                {OWNER.nameEn} · {OWNER.roleEn}
              </p>
            </Reveal>
          </div>

          {/* ---------------- what he says ---------------- */}
          <div className="flex flex-col justify-center px-6 py-10 sm:px-9 lg:px-11 lg:py-12">
            <Reveal variant="up" delay={240}>
              <p className="text-[0.95rem] leading-[1.95] text-ink/75">
                {OWNER.introMr}
              </p>
            </Reveal>

            <Reveal variant="up" delay={300}>
              <blockquote className="relative mt-7 rounded-2xl border-l-4 border-saffron bg-cream/80 p-6 text-left sm:p-7">
                <Quote
                  aria-hidden="true"
                  className="absolute right-4 top-4 size-14 text-vermillion/[0.07] sm:size-16"
                />
                <div className="relative space-y-3.5">
                  {OWNER.quoteMr.map((line) => (
                    <p
                      key={line}
                      className="font-mr-ui text-[1.05rem] leading-[1.9] text-ink/85 sm:text-lg"
                    >
                      {line}
                    </p>
                  ))}
                </div>

                <footer className="relative mt-6 flex items-center gap-3 border-t border-sand-2 pt-5">
                  <span
                    aria-hidden="true"
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-vermillion font-marathi text-lg text-white shadow-ember"
                  >
                    {OWNER.nameMr.trim().slice(0, 1)}
                  </span>
                  <cite className="font-mr-ui text-base not-italic text-ink">
                    — {OWNER.nameMr}
                  </cite>
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </article>
      </Reveal>
    </div>
  );
}
