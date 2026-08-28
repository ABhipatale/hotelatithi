import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";

import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import IconTile from "./ui/IconTile";
import SurfaceCard from "./ui/SurfaceCard";
import { InstagramIcon, FacebookIcon, WhatsappIcon } from "./ui/BrandIcons";
import SmartImage from "./ui/SmartImage";
import { IMAGES } from "../data/images";
import { SITE } from "../data/siteData";

const SOCIALS = [
  { href: SITE.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: SITE.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: SITE.social.whatsapp, label: "WhatsApp", Icon: WhatsappIcon },
];

function InfoCard({ icon, title, children, delay = 0 }) {
  return (
    <Reveal as="li" delay={delay} className="h-full">
      <SurfaceCard className="flex gap-4 p-5">
        <IconTile glyph={icon} size="sm" />
        <div className="min-w-0">
          <h3 className="font-marathi text-lg text-ink">{title}</h3>
          <div className="mt-1 text-sm leading-relaxed text-ink/75">{children}</div>
        </div>
      </SurfaceCard>
    </Reveal>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-sand">
      <div className="shell relative">
        <SectionHeading
          kicker="Contact"
          title="आमच्यापर्यंत कसे पोहोचाल?"
          subtitle="भेटायला या, फोन करा किंवा थेट व्हॉट्सअ‍ॅपवर संदेश पाठवा."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          {/* ---------------- details ---------------- */}
          <div className="flex flex-col">
            <Reveal>
              {/* the hotel's own signboard — name, promise and number */}
              <div className="overflow-hidden rounded-3xl border border-sand-2 bg-white p-2 shadow-soft">
                <SmartImage
                  src={IMAGES.signboard}
                  alt={`${SITE.nameMr} signboard — ${SITE.tagline}`}
                  className="rounded-2xl"
                  ratio="4 / 3"
                />
              </div>
            </Reveal>

            {/* Four facts in a single tall column left the map beside it
                looking half-empty; two-up keeps both sides the same weight. */}
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              <InfoCard icon={MapPin} title="पत्ता" delay={60}>
                <address className="not-italic">
                  {SITE.address.line1}
                  <br />
                  {SITE.address.line2}
                  <br />
                  {SITE.address.line3}
                </address>
              </InfoCard>

              <InfoCard icon={Phone} title="फोन" delay={120}>
                <a
                  href={SITE.phoneHref}
                  className="font-semibold text-ink transition-colors hover:text-vermillion"
                >
                  {SITE.phone}
                </a>
                <p className="mt-0.5 text-xs text-ink/70">पार्सल आणि बुकिंगसाठी</p>
              </InfoCard>

              {SITE.email && (
                <InfoCard icon={Mail} title="ईमेल" delay={180}>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="break-all font-semibold text-ink transition-colors hover:text-vermillion"
                  >
                    {SITE.email}
                  </a>
                </InfoCard>
              )}

              <InfoCard icon={Clock} title="वेळ" delay={240}>
                <p className="font-semibold text-ink">{SITE.hours.daysMr}</p>
                <p>{SITE.hours.time}</p>
              </InfoCard>
            </ul>

            <Reveal delay={300}>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-sand-2 bg-white/75 px-5 py-4">
                <p className="font-mr-ui text-sm text-ink/75">
                  इंस्टाग्रामवर{" "}
                  <a
                    href={SITE.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-vermillion hover:underline"
                  >
                    {SITE.social.instagramHandle}
                  </a>
                </p>
                <ul className="flex gap-2">
                  {SOCIALS.map(({ href, label, Icon: Glyph }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="grid size-10 place-items-center rounded-full border border-sand-2 bg-white text-ink transition-[transform,background-color,border-color,color] duration-300 hover:-translate-y-1 hover:border-vermillion hover:bg-vermillion hover:text-white"
                      >
                        <Glyph className="size-5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* ---------------- map ---------------- */}
          <Reveal delay={120} x={24} y={0}>
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-sand-2 bg-white shadow-soft">
              <div className="relative min-h-96 flex-1 bg-sand">
                <iframe
                  title={`${SITE.nameEn} location map`}
                  src={SITE.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>

              <div className="flex flex-col items-start justify-between gap-4 border-t border-sand-2 p-5 sm:flex-row sm:items-center">
                <div>
                  <p className="font-marathi text-lg text-ink">आम्ही इथे आहोत</p>
                  <p className="text-sm text-ink/72">{SITE.mapQuery}</p>
                </div>
                <Button
                  as="a"
                  href={SITE.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  className="shrink-0"
                >
                  <Navigation className="size-4" />
                  Get Directions
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
