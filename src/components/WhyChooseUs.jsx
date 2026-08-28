import SectionHeading from "./ui/SectionHeading";
import SmartImage from "./ui/SmartImage";
import IconTile from "./ui/IconTile";
import SurfaceCard from "./ui/SurfaceCard";
import Reveal from "./ui/Reveal";
import { REASONS } from "../data/servicesData";
import { IMAGES } from "../data/images";

export default function WhyChooseUs() {
  return (
    <section className="section-pad relative overflow-hidden bg-cream">
      <div className="shell relative">
        <SectionHeading
          kicker="Why Choose Us"
          title="आम्हाला का निवडाल?"
          subtitle="मसाला घरचाच, हंडी ऑर्डरनंतरच — म्हणूनच पाहुणे पुन्हा पुन्हा येतात."
        />

        <div className="mt-14 grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* ---------------- arch image ---------------- */}
          <Reveal x={-24} y={0} className="order-2 lg:order-1">
            <figure className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="arch border border-sand-2 bg-white p-2.5 shadow-soft">
                <SmartImage
                  src={IMAGES.kandaBhajiPlates}
                  alt="Freshly fried kanda bhaji plated at Hotel Atithi"
                  className="arch"
                  ratio="3 / 4"
                />
              </div>

              {/* The caption used to hang below the frame on its own, which
                  left it stranded in the gap between sections. Tucked onto the
                  photograph it reads as part of the picture. */}
              <figcaption className="absolute inset-x-4 bottom-4">
                <div className="rounded-2xl bg-ink/90 px-5 py-4 text-center shadow-lift backdrop-blur-sm">
                  <p className="font-marathi text-lg leading-tight text-saffron">
                    “अन्न हे पूर्णब्रह्म”
                  </p>
                  <p className="mt-1.5 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-cream/80">
                    Cooked fresh · Served with respect
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>

          {/* ---------------- reasons ---------------- */}
          <ol className="order-1 space-y-4 lg:order-2">
            {REASONS.map((reason, index) => (
              <Reveal as="li" key={reason.id} delay={index * 100}>
                <SurfaceCard className="flex gap-4 p-5 sm:gap-6 sm:p-7">
                  <IconTile name={reason.icon} size="md" />

                  <div className="min-w-0 pr-10 sm:pr-14">
                    <h3 className="font-marathi text-lg text-ink sm:text-xl">
                      {reason.titleMr}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/75 sm:text-[0.95rem]">
                      {reason.descMr}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="absolute right-5 top-4 font-display text-4xl leading-none text-ink/[0.07] transition-colors duration-500 group-hover:text-vermillion/20 sm:text-5xl"
                  >
                    0{index + 1}
                  </span>
                </SurfaceCard>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
