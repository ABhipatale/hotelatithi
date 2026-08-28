import { Plus } from "lucide-react";

import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { FAQS } from "../data/faqData";

/**
 * Built on native <details>/<summary>: keyboard accessible, works without
 * JavaScript, and the plain markup is exactly what search engines index
 * alongside the FAQPage structured data.
 */
export default function Faq() {
  return (
    <section id="faq" className="section-pad relative overflow-hidden bg-cream">
      <div className="shell relative">
        <SectionHeading
          kicker="FAQ"
          title="वारंवार विचारले जाणारे प्रश्न"
          subtitle="तुमच्या मनातले प्रश्न — थोडक्यात उत्तरं."
        />

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {FAQS.map((item, index) => (
            <Reveal key={item.id} delay={index * 60} y={20}>
              <details className="group overflow-hidden rounded-2xl border border-sand-2 bg-white/80 transition-colors duration-300 open:border-saffron open:bg-white hover:border-gold">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-marathi text-lg leading-snug text-ink sm:text-xl">
                    {item.q}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-saffron text-ink transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-vermillion group-open:text-white"
                  >
                    <Plus className="size-4" />
                  </span>
                </summary>
                <p className="mx-5 mb-5 border-t border-sand-2 pt-4 text-[0.95rem] leading-[1.85] text-ink/75 sm:mx-6 sm:mb-6">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
