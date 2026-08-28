import { ArrowRight } from "lucide-react";

import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import IconTile from "./ui/IconTile";
import SectionHeading from "./ui/SectionHeading";
import { FEATURES } from "../data/servicesData";

/**
 * The brand's colour moment: a full-bleed field of the logo's yellow, the
 * Sanskrit line the hotel is named for set in the logo's brush red, and four
 * promises on deep maroon cards.
 *
 * It sits on saffron rather than maroon because the section above it is now a
 * dark poster — three dark bands running from the hero down to About left the
 * page nowhere to breathe. Red on yellow is also simply what the mark does.
 */
export default function Statement() {
  return (
    <section
      aria-labelledby="statement-title"
      className="relative overflow-hidden bg-saffron pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 grad-ember" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 motif-gold opacity-5"
      />

      <div className="shell relative pt-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          {/* ---------------- statement ---------------- */}
          <div className="text-center lg:text-left">
            <SectionHeading
              id="statement-title"
              kicker="Our Promise"
              title="अतिथी देवो भव"
              align="responsive"
              titleClassName="text-vermillion"
            />

            <Reveal delay={180}>
              <p className="mx-auto mt-6 max-w-lg text-base leading-[1.9] text-ink/80 sm:text-lg lg:mx-0">
                आमच्या नावातच आमचं तत्त्व आहे — दारात येणारा प्रत्येक पाहुणा हा
                देवासमान. म्हणूनच रोजचं ताजं गावरान मटण, अस्सल मसाला आणि
                मनापासून वाढलेलं ताट — हीच आमची ओळख.
              </p>
            </Reveal>

            <Reveal delay={230}>
              <div className="mt-8 flex justify-center lg:justify-start">
                <Button as="a" href="#about" variant="ink" size="lg">
                  आमची गोष्ट वाचा
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </Reveal>
          </div>

          {/* ---------------- promise cards ---------------- */}
          <ul className="grid grid-cols-2 gap-3.5 sm:gap-5">
            {FEATURES.map((feature, index) => (
              <Reveal
                as="li"
                key={feature.id}
                delay={index * 90}
                y={34}
                className="group"
              >
                <article className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-maroon-card p-5 text-cream shadow-[0_18px_38px_-18px_rgba(38,0,0,0.75)] transition-[transform,box-shadow] duration-500 hover:-translate-y-2 hover:shadow-[0_26px_48px_-18px_rgba(38,0,0,0.9)] sm:p-6">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-amber/25 blur-2xl transition-transform duration-700 group-hover:scale-150"
                  />

                  <IconTile name={feature.icon} tone="ember" size="md" className="relative" />

                  <h3 className="relative mt-4 font-marathi text-lg leading-snug sm:text-xl">
                    {feature.titleMr}
                  </h3>
                  <p className="relative mt-1.5 text-sm leading-relaxed text-cream/80">
                    {feature.descMr}
                  </p>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
