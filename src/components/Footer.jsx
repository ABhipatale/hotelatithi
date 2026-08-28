import { ArrowUp, MapPin, Phone, Smartphone } from "lucide-react";

import Logo from "./Logo";
import Marquee from "./ui/Marquee";
import { InstagramIcon, FacebookIcon, WhatsappIcon } from "./ui/BrandIcons";
import { DEVELOPER, SITE } from "../data/siteData";

const QUICK_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "menu", label: "Menu" },
  { id: "gallery", label: "Gallery" },
  { id: "signature", label: "Specials" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

const FOOTER_SERVICES = [
  "Family Room",
  "Garden Seating",
  "Indoor Hall",
  "Free Parking",
  "Takeaway",
];

const SOCIALS = [
  { href: SITE.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: SITE.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: SITE.social.whatsapp, label: "WhatsApp", Icon: WhatsappIcon },
];

const TICKER = [SITE.tagline, "जत्रा धनगरी थाळी", "|| अतिथी देवो भव ||", "फॅमिली गार्डन रेस्टॉरंट"];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-maroon-2 text-cream">
      {/* ticker cap */}
      <div className="relative border-b border-cream/10 grad-ember">
        <Marquee
          items={TICKER}
          speed="46s"
          className="py-3"
          itemClassName="font-mr-ui text-base text-cream sm:text-lg"
        />
      </div>

      <div className="shell relative pb-8 pt-14 lg:pb-10 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.1fr] lg:gap-8">
          {/* brand */}
          <div>
            <Logo size="lg" tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/75">
              {SITE.intro}
            </p>

            <div className="mt-6 flex gap-2">
              {SOCIALS.map(({ href, label, Icon: Glyph }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-cream/15 bg-cream/5 text-cream/80 transition-all duration-300 hover:-translate-y-1 hover:border-saffron hover:bg-saffron hover:text-ink"
                >
                  <Glyph className="size-[1.15rem]" />
                </a>
              ))}
            </div>
          </div>

          {/* quick links */}
          <nav aria-label="Quick links">
            <h3 className="font-marathi text-lg text-saffron">महत्त्वाच्या लिंक्स</h3>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="group inline-flex items-baseline gap-2 text-sm text-cream/75 transition-colors hover:text-cream"
                  >
                    <span className="h-px w-3 bg-vermillion transition-all duration-300 group-hover:w-5" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* services */}
          <nav aria-label="Services">
            <h3 className="font-marathi text-lg text-saffron">आमच्या सेवा</h3>
            <ul className="mt-5 space-y-3">
              {FOOTER_SERVICES.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="group inline-flex items-baseline gap-2 text-sm text-cream/75 transition-colors hover:text-cream"
                  >
                    <span className="h-px w-3 bg-vermillion transition-all duration-300 group-hover:w-5" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div>
            <h3 className="font-marathi text-lg text-saffron">संपर्क</h3>
            <ul className="mt-5 space-y-4 text-sm text-cream/75">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-vermillion" />
                <address className="not-italic leading-relaxed">
                  {SITE.address.line1}
                  <br />
                  {SITE.address.line2}
                  <br />
                  {SITE.address.line3}
                </address>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-vermillion" />
                <a href={SITE.phoneHref} className="hover:text-cream">
                  {SITE.phone}
                </a>
              </li>
            </ul>

            <p className="mt-5 rounded-xl border border-cream/10 bg-cream/5 px-4 py-3 text-xs leading-relaxed text-cream/75">
              <span className="block font-semibold text-cream/80">{SITE.hours.daysEn}</span>
              {SITE.hours.time}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-7 sm:flex-row">
          <p className="text-center text-xs text-cream/70 sm:text-left">
            © {new Date().getFullYear()} Hotel Atithi. All Rights Reserved.
          </p>

          <p className="font-mr-ui text-sm text-saffron/80">{SITE.tagline}</p>

          <a
            href="#home"
            aria-label="Back to top"
            className="group inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-2 text-xs font-semibold text-cream/78 transition-all duration-300 hover:border-saffron hover:text-saffron"
          >
            Back to top
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Build credit — a tight full-width band pinned to the very bottom, not
          a row inside the padded column above, which left a deep empty gap
          beneath it. The studio name carries the link, so the bare URL was one
          redundant item in an already small strip. */}
      <div className="relative border-t border-cream/10">
        <div className="shell flex flex-wrap items-center justify-center gap-x-4 gap-y-1 py-3 text-center text-xs text-cream/70">
          <p>
            Designed &amp; developed by{" "}
            <a
              href={DEVELOPER.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cream/85 underline-offset-2 transition-colors hover:text-saffron hover:underline"
            >
              {DEVELOPER.name}
            </a>
          </p>

          <span aria-hidden="true" className="h-3 w-px bg-cream/20" />

          <a
            href={DEVELOPER.phoneHref}
            className="inline-flex items-center gap-1.5 tabular-nums transition-colors hover:text-saffron"
          >
            <Smartphone className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="sr-only">Call {DEVELOPER.name} on </span>
            {DEVELOPER.phone}
          </a>
        </div>
      </div>
    </footer>
  );
}
