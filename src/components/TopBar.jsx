import { Clock, MapPin, Phone } from "lucide-react";

import { SITE } from "../data/siteData";

/**
 * Thin utility strip above the navbar: the two things a hungry visitor checks
 * first — are you open, and where are you.
 */
export default function TopBar({ collapsed = false }) {
  return (
    <div
      className={`hidden overflow-hidden bg-ink-3 text-cream/70 transition-[height,opacity] duration-500 md:block ${
        collapsed ? "h-0 opacity-0" : "h-10 opacity-100"
      }`}
    >
      <div className="shell flex h-10 items-center justify-between gap-6 text-[0.78rem]">
        <p className="flex items-center gap-2">
          <Clock className="size-3.5 shrink-0 text-amber" />
          <span className="font-mr-ui">
            {SITE.hours.time} · {SITE.hours.daysMr}
          </span>
        </p>

        <div className="flex items-center gap-5">
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-2 tabular-nums transition-colors hover:text-amber"
          >
            <Phone className="size-3.5 shrink-0 text-amber" />
            {SITE.phone}
          </a>
          <span aria-hidden="true" className="h-3.5 w-px bg-cream/20" />
          <p className="flex items-center gap-2">
            <MapPin className="size-3.5 shrink-0 text-amber" />
            <span className="font-mr-ui">{SITE.address.line2}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
