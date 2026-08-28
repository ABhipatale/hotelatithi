import { ArrowRight, BadgeCheck } from "lucide-react";

import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import SmartImage from "./ui/SmartImage";
import SectionHeading from "./ui/SectionHeading";
import { WhatsappIcon } from "./ui/BrandIcons";
import Owner from "./Owner";
import { IMAGES } from "../data/images";
import { SITE } from "../data/siteData";
import { enquiryLink } from "../lib/whatsapp";

const HIGHLIGHTS = [
  "जत्रा धनगरी थाळी स्पेशल",
  "ऑर्डरनंतरच ताजं जेवण",
  "व्हेज आणि नॉनव्हेज दोन्ही",
  "फॅमिली रूम आणि गार्डन बैठक",
];

export default function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden bg-cream">
      <div className="shell relative grid items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        {/* ---------------- copy ---------------- */}
        <div>
          <SectionHeading kicker="About Us" title="आमच्याबद्दल" align="responsive" />

          <Reveal delay={180}>
            <p className="mt-7 text-base leading-[1.95] text-ink/75 sm:text-lg">
              हॉटेल अतिथी हे हायवेलगतचं फॅमिली गार्डन रेस्टॉरंट. जत्रा धनगरी थाळी,
              मटण हंडी आणि गावरान चिकन हंडीसाठी कमी कालावधीतच ओळख मिळाली — आणि
              व्हेज पाहुण्यांसाठीही तितकाच भरगच्च मेनू आहे.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-4 text-base leading-[1.95] text-ink/72">
              प्रत्येक हंडी ऑर्डरनंतरच चढते, मसाला घरचाच — म्हणूनच आमच्या पाटीवर
              लिहिलंय, “गावाकडची माणसं... गावाकडची चव..!”
            </p>
          </Reveal>

          {/* Each promise gets a saffron spine, so the four read as a set of
              credentials rather than as four loose rows of text. */}
          <Reveal delay={270}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {HIGHLIGHTS.map((item) => (
                <li
                  key={item}
                  className="group flex items-center gap-3 overflow-hidden rounded-2xl border border-sand-2 bg-white/70 py-3.5 pl-4 pr-4 text-sm font-medium text-ink/80 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-saffron hover:bg-white"
                >
                  <span
                    aria-hidden="true"
                    className="-my-3.5 -ml-4 mr-1 h-[3.25rem] w-1.5 shrink-0 bg-saffron transition-colors duration-300 group-hover:bg-vermillion"
                  />
                  <BadgeCheck className="size-5 shrink-0 text-vermillion" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:justify-start">
              <Button as="a" href="#services" variant="amber" size="lg">
                आमच्या सेवा पहा
                <ArrowRight className="size-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
              <Button
                as="a"
                href={enquiryLink("जेवण आणि थाळी")}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlineInk"
                size="lg"
              >
                <WhatsappIcon className="size-5" />
                व्हॉट्सअ‍ॅपवर विचारा
              </Button>
            </div>
          </Reveal>
        </div>

        {/* ---------------- collage ---------------- */}
        <div className="relative lg:pb-16">
          <div className="grid grid-cols-5 items-end gap-4 sm:gap-5">
            {/* The arch is the motif that runs through the medallions and the
                photography above; the hero shot of the place earns it. */}
            <Reveal className="col-span-3" y={40}>
              <SmartImage
                src={IMAGES.exteriorFront}
                alt="Front of Hotel Atithi family garden restaurant"
                className="arch-soft shadow-lift ring-4 ring-white"
                ratio="4 / 5"
              />
            </Reveal>

            <div className="col-span-2 space-y-4 sm:space-y-5">
              <Reveal delay={120} y={40}>
                <SmartImage
                  src={IMAGES.gardenSeating}
                  alt="Open-air garden seating at Hotel Atithi"
                  className="rounded-3xl shadow-soft ring-4 ring-white"
                  ratio="4 / 3"
                />
              </Reveal>
              <Reveal delay={210} y={40}>
                <SmartImage
                  src={IMAGES.guestsJevan}
                  alt="Guests enjoying a meal together at Hotel Atithi"
                  className="rounded-3xl shadow-soft ring-4 ring-white"
                  ratio="4 / 3"
                />
              </Reveal>
            </div>
          </div>

          {/* The signboard promise, in the hotel's own colours. It used to be a
              red disc sitting on top of the signboard photograph — covering the
              very words it was quoting. */}
          <Reveal delay={300} y={26} className="mt-6 lg:absolute lg:-bottom-2 lg:left-0 lg:mt-0 lg:max-w-sm">
            <figure className="relative overflow-hidden rounded-2xl bg-saffron px-6 py-5 shadow-lift">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 motif-gold opacity-[0.07]"
              />
              <blockquote className="relative">
                <p className="font-marathi text-lg leading-snug text-vermillion sm:text-xl">
                  “{SITE.tagline}”
                </p>
              </blockquote>
              {/* font-mr-ui, because the tracked-caps treatment used elsewhere
                  is Latin-only: letter-spacing pulls Devanagari matras off
                  their consonants. */}
              <figcaption className="relative mt-2 font-mr-ui text-xs font-semibold text-ink/70">
                आमच्या पाटीवरचे शब्द
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>

      {/* the person behind the hotel */}
      <Owner />
    </section>
  );
}
