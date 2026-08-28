import { ArrowRight } from "lucide-react";

import SectionHeading from "./ui/SectionHeading";
import SmartImage from "./ui/SmartImage";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import OrderButton from "./ui/OrderButton";
import { SIGNATURES } from "../data/signatureData";

/**
 * The three plates the hotel is known for, staged as jatra handbills.
 *
 * The logo is a round saffron badge with the figure sitting on it inside a
 * ring. These cards borrow that composition wholesale — a plate on a saffron
 * disc, a double gold ring around it, a hairline struck just outside it — so
 * the section reads as the same piece of artwork as the mark above it rather
 * than as three generic photo cards.
 *
 * The ground is maroon rather than cream: this sits directly under the hero,
 * and cream-on-cream gave the page no break at all at the point where it most
 * needs one.
 */
export default function Signature() {
  return (
    <section
      id="signature"
      className="relative overflow-hidden bg-maroon pb-20 pt-20 sm:pb-24 sm:pt-24 lg:pb-28 lg:pt-28"
    >
      {/* poster ground: a faint lattice and a warm bloom behind the middle */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 motif-dark opacity-[0.06]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[46rem] max-w-full -translate-x-1/2 rounded-full bg-amber/10 blur-3xl"
      />
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 grad-ember" />

      <div className="shell relative">
        <SectionHeading
          kicker="Signature Specials"
          title="आमची खासियत"
          subtitle="“कमी कालावधीत प्रसिद्ध झालेली थाळी” — आमच्या टेबलवरच्या कार्डावरचे शब्द, आणि पाहुण्यांची पहिली मागणी."
          tone="light"
        />

        {/* The top margin clears the medallions, which ride out of the card
            tops along with their halos; the middle card lifts on wide screens so
            the three sit on a gentle arc rather than a hard line. */}
        <ul className="mx-auto mt-28 grid max-w-md gap-20 sm:gap-16 lg:max-w-none lg:grid-cols-3 lg:gap-7">
          {SIGNATURES.map((dish, index) => (
            <Reveal
              as="li"
              key={dish.id}
              variant="up"
              delay={index * 130}
              y={40}
              className={`group h-full ${index === 1 ? "lg:-translate-y-8" : ""}`}
            >
              <article className="relative flex h-full flex-col items-center rounded-[2rem] border border-amber/25 bg-maroon-card/70 px-6 pb-8 text-center backdrop-blur-sm transition-[border-color,background-color] duration-500 hover:border-amber/60 hover:bg-maroon-card sm:px-7">
                {/* ---------------- medallion ---------------- */}
                <div className="relative -mt-16 mb-6">
                  {/* Ambient halo. This reads as light falling behind the
                      plate rather than as a graphic — the radiating burst it
                      replaces looked like a cartoon sun. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/20 blur-2xl transition-[transform,background-color] duration-700 group-hover:scale-110 group-hover:bg-amber/30 sm:size-60"
                  />

                  {/* Outer gold ring → maroon gap → saffron disc, exactly the
                      way the badge is built.

                      These are plain blocks, NOT a centring grid: under
                      `place-items-center` the track is sized by its content, so
                      `size-full` fell back to the photograph's own aspect ratio
                      and the "circle" came out an oval for every portrait
                      source — tall enough to sit on the tag below it. */}
                  <div className="relative size-40 rounded-full bg-gradient-to-br from-gold via-amber to-vermillion p-[3px] shadow-[0_0_0_9px_rgba(38,0,0,0.5),0_0_0_10px_rgba(232,169,0,0.32),0_26px_50px_-18px_rgba(0,0,0,0.75)] transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:size-44">
                    <div className="size-full rounded-full bg-maroon p-1.5">
                      <SmartImage
                        src={dish.image}
                        alt={`${dish.nameEn} at Hotel Atithi`}
                        className="size-full rounded-full bg-saffron"
                        fit={dish.fit ?? "cover"}
                        imgClassName={`rounded-full transition-transform duration-[1300ms] ease-out group-hover:scale-110 ${
                          dish.fit === "contain" ? "p-1" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* rank seal, struck into the ring */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-1 top-3 grid size-11 place-items-center rounded-full border-2 border-maroon bg-saffron font-display text-lg font-bold text-vermillion shadow-lg"
                  >
                    0{index + 1}
                  </span>
                </div>

                {/* ---------------- tag ribbon ---------------- */}
                <span className="rounded-full bg-vermillion px-4 py-1.5 font-mr-ui text-xs text-white shadow-ember">
                  {dish.tagMr}
                </span>

                {/* ---------------- copy ---------------- */}
                <h3 className="mt-4 font-marathi text-2xl leading-snug text-cream">
                  {dish.nameMr}
                </h3>
                <p className="mt-1.5 text-[0.66rem] font-bold uppercase tracking-[0.24em] text-amber">
                  {dish.nameEn}
                </p>

                <p className="mx-auto mt-4 max-w-xs flex-1 text-sm leading-[1.85] text-cream/80">
                  {dish.descMr}
                </p>

                {/* ---------------- ticket foot ---------------- */}
                <div className="mt-7 w-full">
                  <span aria-hidden="true" className="block h-px w-full tear opacity-40" />

                  <div className="mt-5 flex items-center justify-between gap-4 text-left">
                    <span className="leading-none">
                      <span className="font-display text-[1.75rem] text-saffron">
                        ₹{dish.price}
                      </span>
                      {dish.priceNote && (
                        <span className="mt-1.5 block font-mr-ui text-[0.7rem] text-cream/65">
                          {dish.priceNote}
                        </span>
                      )}
                    </span>
                    <OrderButton item={dish} variant="sun" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal variant="up" delay={120}>
          <div className="mt-16 flex justify-center lg:mt-14">
            <Button as="a" href="#menu" variant="amber" size="lg" className="shine">
              संपूर्ण मेनू पहा
              <ArrowRight className="size-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
