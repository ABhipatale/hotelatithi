import { useMemo, useState } from "react";
import { Download, FileText, Search } from "lucide-react";

import Reveal from "./ui/Reveal";
import { MENU_NOTES, MENU_PDF_UPDATED, MENU_SECTIONS } from "../data/fullMenuData";

const MENU_PDF = "/menu-card-hotel-atithi.pdf";

const FILTERS = [
  { id: "all", labelMr: "संपूर्ण मेनू" },
  { id: "veg", labelMr: "फक्त व्हेज" },
  { id: "nonveg", labelMr: "फक्त नॉनव्हेज" },
];

/** The green disc / maroon triangle Indian menus print beside every section. */
function PlateMark({ veg }) {
  return (
    <span
      className={`grid size-5 shrink-0 place-items-center rounded-[3px] bg-white ${
        veg ? "mark-veg" : "mark-nonveg"
      }`}
    >
      {veg ? (
        <span aria-hidden="true" className="size-2 rounded-full bg-current" />
      ) : (
        <span
          aria-hidden="true"
          className="size-0 border-x-[4px] border-b-[7px] border-x-transparent"
          style={{ borderBottomColor: "currentColor" }}
        />
      )}
      <span className="sr-only">{veg ? "शाकाहारी" : "मांसाहारी"}</span>
    </span>
  );
}

/**
 * The hotel's full printed price list, section by section.
 *
 * Every dish on the card is here — the photo grid above shows the twelve we
 * hold a photograph of, and a guest who wants to know what the mutton handi
 * costs should not have to open a PDF to find out.
 *
 * A leader line joins each dish to its price. That is how the printed card
 * reads, and it is the reason a price list stays scannable once it runs past
 * a hundred rows.
 */
export default function PriceList() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const sections = useMemo(() => {
    const term = query.trim().toLowerCase();
    return MENU_SECTIONS.filter(
      (s) => filter === "all" || (filter === "veg" ? s.veg : !s.veg)
    )
      .map((s) => ({
        ...s,
        items: term
          ? s.items.filter(
              (i) =>
                i.mr.toLowerCase().includes(term) || i.en.toLowerCase().includes(term)
            )
          : s.items,
      }))
      .filter((s) => s.items.length > 0);
  }, [filter, query]);

  const count = sections.reduce((n, s) => n + s.items.length, 0);

  return (
    <div className="mt-16">
      <Reveal>
        <div className="text-center">
          <h3 className="font-marathi text-2xl text-ink sm:text-3xl">
            आमचं संपूर्ण दरपत्रक
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-ink/70">
            मेनू कार्डवरचे सर्व पदार्थ आणि दर — {MENU_PDF_UPDATED} मधील अद्ययावत कार्डाप्रमाणे.
          </p>
        </div>
      </Reveal>

      {/* ---------------- controls ---------------- */}
      <Reveal delay={80}>
        <div className="mt-8 flex flex-col items-center gap-4">
          <div
            role="group"
            aria-label="मेनू गाळणी"
            className="flex flex-wrap justify-center gap-2"
          >
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`rounded-full border px-5 py-2.5 font-mr-ui text-[0.95rem] transition-[background-color,border-color,color,box-shadow,transform] duration-300 ${
                  filter === f.id
                    ? "border-vermillion bg-vermillion text-white shadow-[0_12px_26px_-14px_rgba(200,16,46,0.8)]"
                    : "border-sand-2 bg-white text-ink/75 hover:-translate-y-0.5 hover:border-amber hover:text-ink"
                }`}
              >
                {f.labelMr}
              </button>
            ))}
          </div>

          <label className="relative w-full max-w-sm">
            <span className="sr-only">पदार्थ शोधा</span>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-ink/45"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="पदार्थ शोधा — उदा. हंडी, paneer"
              className="w-full rounded-full border-2 border-sand-2 bg-white py-3 pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-ink/50 focus:border-vermillion"
            />
          </label>

          <p aria-live="polite" className="font-mr-ui text-sm text-ink/65">
            {count > 0 ? `${count} पदार्थ` : "या शोधाशी जुळणारा पदार्थ नाही"}
          </p>
        </div>
      </Reveal>

      {/* ---------------- the list ---------------- */}
      {count > 0 && (
        <div className="mt-10 gap-x-10 lg:columns-2">
          {sections.map((section, index) => (
            <Reveal
              as="section"
              key={section.id}
              delay={(index % 2) * 70}
              y={20}
              aria-labelledby={`sec-${section.id}`}
              className="mb-9 break-inside-avoid rounded-3xl border border-sand-2 bg-white p-5 shadow-soft sm:p-7"
            >
              <h4
                id={`sec-${section.id}`}
                className="flex items-center gap-2.5 border-b border-sand-2 pb-3 font-marathi text-xl text-ink"
              >
                <PlateMark veg={section.veg} />
                {section.titleMr}
                <span className="ml-auto text-[0.62rem] font-bold uppercase tracking-[0.18em] text-amber-deep">
                  {section.titleEn}
                </span>
              </h4>

              <ul className="mt-4 space-y-3">
                {section.items.map((item) => (
                  <li key={`${section.id}-${item.en}`}>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mr-ui text-[0.98rem] text-ink">
                        {item.mr}
                      </span>
                      {/* the leader line the printed card uses */}
                      <span
                        aria-hidden="true"
                        className="min-w-4 flex-1 translate-y-[-0.2em] border-b border-dotted border-ink/25"
                      />
                      <span className="shrink-0 font-display text-[1.05rem] tabular-nums text-vermillion">
                        ₹{item.price}
                        {item.half && (
                          <span className="text-ink/70"> / {item.half}</span>
                        )}
                      </span>
                    </div>

                    <p className="text-[0.68rem] uppercase tracking-[0.14em] text-ink/70">
                      {item.en}
                      {item.half && <span className="normal-case"> · फुल / हाफ</span>}
                    </p>

                    {item.note && (
                      <p className="mt-1 font-mr-ui text-[0.8rem] leading-relaxed text-ink/72">
                        {item.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      )}

      {/* ---------------- notes + download ---------------- */}
      <Reveal delay={100}>
        <div className="mt-10 flex flex-col items-center gap-6 rounded-3xl border border-sand-2 bg-white/75 px-6 py-8 text-center">
          <ul className="space-y-1.5 font-mr-ui text-sm text-ink/75">
            {MENU_NOTES.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>

          <a
            href={MENU_PDF}
            download="Hotel-Atithi-Karad-Menu-Card.pdf"
            className="group/btn inline-flex items-center gap-2.5 rounded-full grad-ember px-7 py-3.5 text-base font-semibold text-white shadow-[0_18px_40px_-14px_rgba(200,16,46,0.65)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_46px_-14px_rgba(200,16,46,0.75)]"
          >
            <FileText className="size-5" aria-hidden="true" />
            संपूर्ण मेनू कार्ड डाउनलोड करा
            <Download className="size-4 transition-transform duration-300 group-hover/btn:translate-y-0.5" />
          </a>

          <p className="text-xs text-ink/70">PDF · 12 पाने · {MENU_PDF_UPDATED}</p>
        </div>
      </Reveal>
    </div>
  );
}
