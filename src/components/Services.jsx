import { ArrowRight } from "lucide-react";

import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import IconTile from "./ui/IconTile";
import Button from "./ui/Button";
import { WhatsappIcon } from "./ui/BrandIcons";
import figure from "../assets/logo/atithi-figure.png";
import { SERVICES } from "../data/servicesData";
import { enquiryLink } from "../lib/whatsapp";

export default function Services() {
  return (
    <section id="services" className="section-pad relative overflow-hidden bg-maroon">
      <div className="shell relative">
        <SectionHeading
          kicker="Our Services"
          title="आमच्या सेवा"
          subtitle="रोजच्या जेवणापासून मोठ्या समारंभापर्यंत — सगळं एकाच ठिकाणी."
          tone="light"
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <Reveal as="li" key={service.id} delay={(index % 4) * 80} y={30} className="group h-full">
              <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-cream/10 bg-ink-2 p-6 transition-[transform,border-color] duration-500 hover:-translate-y-2 hover:border-saffron/40">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-saffron/20 blur-2xl transition-transform duration-700 group-hover:scale-150"
                />

                <IconTile name={service.icon} size="lg" className="relative" />

                <h3 className="relative mt-5 font-marathi text-xl text-cream">
                  {service.titleMr}
                </h3>
                <p className="relative mt-1 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-saffron/70">
                  {service.titleEn}
                </p>
                <p className="relative mt-3.5 text-sm leading-relaxed text-cream/75">
                  {service.descMr}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* ---------------- enquiry banner ---------------- */}
        <Reveal delay={140}>
          <div className="relative mt-14 grid items-center gap-8 overflow-hidden rounded-3xl bg-saffron px-6 py-10 sm:px-12 sm:py-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-4">
            <div className="relative text-center lg:text-left">
              <h3 className="font-marathi text-2xl leading-snug text-vermillion sm:text-3xl">
                समारंभासाठी संपूर्ण नियोजन हवंय?
              </h3>
              <p className="mx-auto mt-3 max-w-lg text-base text-ink/75 lg:mx-0">
                हॉल बुकिंग, मेनू आणि सजावट — एका फोनवर सगळं ठरवून घ्या.
              </p>
              {/* Straight to WhatsApp with the topic already written — a hall
                  enquiry is a conversation, and routing it through a booking
                  form first only added a step. */}
              <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
                <Button
                  as="a"
                  href={enquiryLink("समारंभ आणि हॉल बुकिंग")}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ink"
                  size="lg"
                >
                  <WhatsappIcon className="size-5" />
                  आजच चौकशी करा
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
                <Button as="a" href="#contact" variant="outlineInk" size="lg">
                  संपर्क तपशील
                </Button>
              </div>
            </div>

            {/* The figure used to be absolutely positioned and simply vanished
                below lg, leaving the banner lopsided at every other width. */}
            <img
              src={figure}
              alt=""
              aria-hidden="true"
              className="relative mx-auto hidden w-48 self-end lg:block xl:w-56"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
