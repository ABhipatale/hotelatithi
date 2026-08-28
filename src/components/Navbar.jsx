import { useEffect, useRef, useState } from "react";
import { CalendarDays, Menu as MenuIcon, Phone, X } from "lucide-react";

import Logo from "./Logo";
import TopBar from "./TopBar";
import Button from "./ui/Button";
import { NAV_LINKS, SITE } from "../data/siteData";
import { useActiveSection } from "../hooks/useActiveSection";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { useFocusTrap } from "../hooks/useFocusTrap";

const SECTION_IDS = NAV_LINKS.map((link) => link.id);
const CLOSE_MS = 300;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const timer = useRef(null);
  const drawer = useRef(null);
  const active = useActiveSection(SECTION_IDS);

  useLockBodyScroll(open);
  useFocusTrap(drawer, open && !closing);

  const closeDrawer = () => {
    setClosing(true);
    timer.current = setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, CLOSE_MS);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (event) => {
      if (event.matches) {
        setOpen(false);
        setClosing(false);
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => event.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ${
          solid
            ? "bg-cream/95 pb-2 pt-2 shadow-[0_10px_34px_-16px_rgba(16,14,12,0.35)] backdrop-blur-lg"
            : "bg-transparent pb-3 lg:pb-4"
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 h-[3px] rule-gold transition-opacity duration-500 ${
            solid ? "opacity-100" : "opacity-0"
          }`}
        />

        <TopBar collapsed={solid} />

        <nav
          className="shell flex items-center justify-between gap-4"
          aria-label="Main navigation"
        >
          <a
            href="#home"
            className="shrink-0"
            aria-label={`${SITE.nameMr} — ${SITE.taglineEn}`}
          >
            <Logo
              size="sm"
              withText={false}
              tone={solid ? "dark" : "light"}
              className="sm:hidden"
            />
            <Logo size="md" tone={solid ? "dark" : "light"} className="hidden sm:flex" />
          </a>

          {/* The active state is an underline rather than a filled pill: it
              reads identically on the transparent hero and on the solid cream
              bar, and it stops competing with the booking CTA for attention. */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative block px-3.5 py-2 font-mr-ui text-[0.92rem] font-semibold transition-colors duration-300 xl:px-4 ${
                      solid
                        ? isActive
                          ? "text-vermillion"
                          : "text-ink/70 hover:text-vermillion"
                        : isActive
                          ? "text-saffron"
                          : "text-cream/80 hover:text-cream"
                    }`}
                  >
                    {link.labelMr}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3.5 -bottom-0.5 h-[2.5px] origin-left rounded-full transition-transform duration-500 ease-out xl:inset-x-4 ${
                        solid ? "bg-vermillion" : "bg-saffron"
                      } ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={SITE.phoneHref}
              className={`hidden items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300 md:inline-flex ${
                solid
                  ? "border-ink/12 text-ink hover:border-vermillion hover:text-vermillion"
                  : "border-cream/30 text-cream hover:border-cream hover:bg-cream/10"
              }`}
            >
              <Phone className="size-4" />
              <span className="hidden xl:inline">{SITE.phone}</span>
              <span className="xl:hidden">Call</span>
            </a>

            {/* Phones get the dial button instead of the booking pill — the
                booking CTA is the first thing inside the drawer, and two pills
                plus a burger cannot sit on a 360px bar without crowding. */}
            <a
              href={SITE.phoneHref}
              aria-label={`Call ${SITE.nameEn} on ${SITE.phone}`}
              className={`grid size-11 place-items-center rounded-full border transition-colors duration-300 md:hidden ${
                solid
                  ? "border-ink/10 bg-sand text-ink"
                  : "border-cream/30 bg-cream/10 text-cream backdrop-blur-md"
              }`}
            >
              <Phone className="size-5" />
            </a>

            {/* Visibility rides the wrapper: Tailwind emits `.hidden` before
                `.inline-flex`, so `hidden` on the Button itself would lose. */}
            <span className="hidden sm:inline-flex">
              <Button as="a" href="#reservation" size="sm" variant="amber">
                <CalendarDays className="size-4" />
                टेबल बुक करा
              </Button>
            </span>

            <button
              type="button"
              onClick={() => (open ? closeDrawer() : setOpen(true))}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`grid size-11 place-items-center rounded-full border transition-colors duration-300 lg:hidden ${
                solid
                  ? "border-ink/10 bg-sand text-ink"
                  : "border-cream/30 bg-cream/10 text-cream backdrop-blur-md"
              }`}
            >
              {open ? <X className="size-5" /> : <MenuIcon className="size-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* ---------------- mobile drawer ---------------- */}
      {open && (
        <>
          <div
            onClick={closeDrawer}
            aria-hidden="true"
            className={`fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm lg:hidden ${
              closing ? "animate-fade-out" : "animate-fade-in"
            }`}
          />

          <div
            id="mobile-menu"
            ref={drawer}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            className={`fixed inset-x-0 top-0 z-45 max-h-[92dvh] overflow-y-auto rounded-b-[2rem] bg-cream pb-8 pt-24 shadow-lift outline-none lg:hidden ${
              closing ? "animate-slide-up-out" : "animate-slide-down"
            }`}
          >
            <div className="shell">
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = active === link.id;
                  return (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        onClick={closeDrawer}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex items-center justify-between gap-4 rounded-2xl px-4 py-3.5 transition-colors ${
                          isActive
                            ? "bg-saffron/25 text-vermillion"
                            : "text-ink hover:bg-sand"
                        }`}
                      >
                        <span className="font-marathi text-xl">{link.labelMr}</span>
                        <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-ink/55">
                          {link.labelEn}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 grid gap-3">
                <Button
                  as="a"
                  href="#reservation"
                  onClick={closeDrawer}
                  variant="amber"
                  size="lg"
                >
                  <CalendarDays className="size-5" />
                  टेबल बुक करा
                </Button>
                <Button as="a" href={SITE.phoneHref} variant="outlineInk" size="lg">
                  <Phone className="size-5" />
                  {SITE.phone}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
