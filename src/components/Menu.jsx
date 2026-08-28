import { useMemo, useState } from "react";
import { ArrowRight, SearchX } from "lucide-react";

import SectionHeading from "./ui/SectionHeading";
import SmartImage from "./ui/SmartImage";
import Button from "./ui/Button";
import Reveal from "./ui/Reveal";
import OrderButton from "./ui/OrderButton";
import MenuCatalogue from "./MenuCatalogue";
import { MENU_CATEGORIES, MENU_ITEMS } from "../data/menuData";

const PREVIEW_COUNT = 6;

/** The green disc / maroon triangle Indian menus print beside every dish. */
function PlateMark({ veg }) {
  const label = veg ? "शाकाहारी" : "मांसाहारी";
  return (
    <span
      className={`grid size-7 place-items-center rounded-[4px] bg-cream ${
        veg ? "mark-veg" : "mark-nonveg"
      }`}
    >
      {veg ? (
        <span aria-hidden="true" className="size-3 rounded-full bg-current" />
      ) : (
        <span
          aria-hidden="true"
          className="size-0 border-x-[6px] border-b-[10px] border-x-transparent"
          style={{ borderBottomColor: "currentColor" }}
        />
      )}
      <span className="sr-only">{label}</span>
    </span>
  );
}

export default function Menu() {
  const [category, setCategory] = useState("all");
  const [expanded, setExpanded] = useState(false);

  const inCategory = useMemo(() => {
    if (category === "all") return MENU_ITEMS;
    // "व्हेज" spans the whole card rather than one section, so it filters on the
    // plate marker instead of the category.
    if (category === "veg") return MENU_ITEMS.filter((item) => item.veg);
    return MENU_ITEMS.filter((item) => item.category === category);
  }, [category]);

  const visible = expanded ? inCategory : inCategory.slice(0, PREVIEW_COUNT);
  const hidden = inCategory.length - visible.length;

  const handleCategory = (id) => {
    setCategory(id);
    setExpanded(false);
  };

  return (
    <section id="menu" className="section-pad relative overflow-hidden bg-cream-2">
      <div className="shell relative">
        <SectionHeading
          kicker="Our Menu"
          title="आमचे स्पेशल मेनू"
          subtitle="प्रत्येक पदार्थ ऑर्डरनंतरच ताजा बनवला जातो — साधारण ३० मिनिटे लागतात."
        />

        {/* ---------------- filter rail ---------------- */}
        <Reveal delay={140}>
          <div
            role="group"
            aria-label="मेनू श्रेणी"
            className="no-scrollbar -mx-5 mt-11 flex snap-x gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
          >
            {MENU_CATEGORIES.map((item) => {
              const isActive = category === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleCategory(item.id)}
                  aria-pressed={isActive}
                  className={`shrink-0 snap-start rounded-full border px-5 py-2.5 font-mr-ui text-[0.95rem] transition-[background-color,border-color,color,box-shadow,transform] duration-300 ${
                    isActive
                      ? "border-vermillion bg-vermillion text-white shadow-[0_12px_26px_-14px_rgba(200,16,46,0.8)]"
                      : "border-sand-2 bg-white text-ink/75 hover:-translate-y-0.5 hover:border-amber hover:text-ink"
                  }`}
                >
                  {item.labelMr}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Count doubles as the live region: filtering is instant and silent
            otherwise, so a screen reader would get no feedback at all. */}
        <p
          aria-live="polite"
          className="mt-6 text-center font-mr-ui text-sm text-ink/65"
        >
          {inCategory.length > 0
            ? `${visible.length} / ${inCategory.length} पदार्थ दाखवत आहोत`
            : "या श्रेणीत सध्या पदार्थ नाहीत"}
        </p>

        {/* ---------------- dishes ---------------- */}
        {inCategory.length === 0 ? (
          <Reveal>
            <div className="mx-auto mt-8 max-w-md rounded-3xl border border-dashed border-sand-2 bg-white/70 px-6 py-12 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-sand text-ink/50">
                <SearchX className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-marathi text-xl text-ink">
                इथे अजून काही नाही
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                खालचं आमचं संपूर्ण दरपत्रक पहा — हॉटेलमधलं मेनू कार्ड जसंच्या तसं.
              </p>
              <Button
                type="button"
                variant="outlineInk"
                size="sm"
                className="mt-6"
                onClick={() => handleCategory("all")}
              >
                सर्व पदार्थ पहा
              </Button>
            </div>
          </Reveal>
        ) : (
          <ul
            key={category}
            className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
          >
            {visible.map((item, index) => (
              <Reveal
                as="li"
                key={item.id}
                delay={(index % 3) * 90}
                y={34}
                className="group h-full"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-sand-2 bg-white transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-2 hover:border-amber hover:shadow-soft">
                  <div className="relative overflow-hidden">
                    <SmartImage
                      src={item.image}
                      alt={`${item.nameEn} served at Hotel Atithi`}
                      ratio="4 / 3"
                      imgClassName={`transition-transform duration-[1100ms] ease-out group-hover:scale-110 ${
                        item.position ?? ""
                      }`}
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 veil-ink opacity-55 transition-opacity duration-500 group-hover:opacity-80"
                    />

                    {item.badge && (
                      <span className="absolute left-4 top-4 rounded-full bg-vermillion px-3 py-1 font-mr-ui text-xs text-white shadow-ember">
                        {item.badge}
                      </span>
                    )}

                    <span className="absolute right-4 top-4">
                      <PlateMark veg={item.veg} />
                    </span>

                    <span className="absolute bottom-4 left-4 rounded-full bg-saffron px-3.5 py-1.5 text-base font-bold text-ink shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)]">
                      ₹{item.price}
                      {item.full && (
                        <span className="ml-1 text-[0.7rem] font-semibold text-ink/72">
                          / फुल ₹{item.full}
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="font-marathi text-xl leading-tight text-ink">
                      {item.nameMr}
                    </h3>
                    <p className="mt-1 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-amber-deep">
                      {item.nameEn}
                    </p>

                    <p className="mt-3.5 flex-1 text-sm leading-relaxed text-ink/75">
                      {item.descMr}
                    </p>

                    {/* Quiet by default: six saturated gradient bars in one
                        grid drown out the photography they sit under. */}
                    <OrderButton item={item} className="mt-6 w-full" />
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        )}

        {/* The expand control belongs against the grid it expands — parked
            below the printed cards, tapping it pushed new dishes in far above
            wherever the reader was standing. */}
        {inCategory.length > PREVIEW_COUNT && (
          <div className="mt-10 flex justify-center">
            <Button
              type="button"
              variant="outlineInk"
              size="lg"
              aria-expanded={expanded}
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded ? "थोडे कमी दाखवा" : `आणखी ${hidden} पदार्थ पहा`}
              <ArrowRight
                className={`size-5 transition-transform duration-300 ${
                  expanded ? "-rotate-90" : "group-hover/btn:translate-x-1"
                }`}
              />
            </Button>
          </div>
        )}

        {/* the hotel's own printed cards, as a catalogue */}
        <MenuCatalogue />

      </div>
    </section>
  );
}
