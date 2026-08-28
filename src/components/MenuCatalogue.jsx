import { BookOpen, Expand } from "lucide-react";

import SmartImage from "./ui/SmartImage";
import Reveal from "./ui/Reveal";
import Ornament from "./ui/Ornament";
import Lightbox from "./ui/Lightbox";
import { useLightbox } from "../hooks/useLightbox";
import { MENU_CARDS } from "../data/menuData";

/**
 * The hotel's own printed menu cards, published as a catalogue.
 *
 * These used to be five thumbnails linking straight at the .webp files, which
 * dropped the reader out of the site onto a bare image with the asset path in
 * the address bar. They are now shelved on a dark panel — the price list is
 * the one place on the page where the *paper* is the point — and open in the
 * viewer, which keeps a dense price list uncropped and offers the full-size
 * file for anyone who needs to zoom.
 */
export default function MenuCatalogue() {
  const viewer = useLightbox(MENU_CARDS.length);

  // The viewer speaks in `captionMr`/`alt`; the menu data calls it `labelMr`.
  const items = MENU_CARDS.map((card) => ({
    ...card,
    captionMr: card.labelMr,
    alt: `${card.labelMr} — हॉटेल अतिथी मेनू कार्ड`,
  }));

  return (
    <>
      <Reveal delay={120}>
        <section
          aria-labelledby="menu-catalogue-title"
          className="relative mt-16 overflow-hidden rounded-[2rem] bg-maroon px-5 py-10 shadow-lift sm:px-9 sm:py-12"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 motif-dark opacity-[0.06]"
          />
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 grad-ember" />

          <header className="relative text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber/35 bg-ink/25 px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-amber">
              <BookOpen className="size-3.5" aria-hidden="true" />
              Price List
            </span>

            <h3
              id="menu-catalogue-title"
              className="mt-4 font-marathi text-2xl text-cream sm:text-3xl"
            >
              आमचं संपूर्ण दरपत्रक
            </h3>

            <Ornament tone="light" className="mt-4 justify-center" />

            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/80">
              हॉटेलमधलं मेनू कार्ड जसंच्या तसं — वाचण्यासाठी कार्डवर टॅप करा.
            </p>
          </header>

          {/* Each card is framed in cream so it reads as a printed page sitting
              on the panel rather than as a cropped photograph. */}
          <ul className="relative mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {items.map((card, index) => (
              <Reveal as="li" key={card.id} delay={index * 70} y={22} className="h-full">
                <button
                  type="button"
                  onClick={() => viewer.open(index)}
                  aria-label={`${card.labelMr} — मोठं करून पहा`}
                  className="group flex h-full w-full flex-col overflow-hidden rounded-2xl bg-cream p-2 text-left shadow-[0_16px_34px_-18px_rgba(0,0,0,0.8)] transition-[transform,box-shadow] duration-500 hover:-translate-y-2 hover:shadow-[0_24px_44px_-16px_rgba(0,0,0,0.9)]"
                >
                  <span className="relative block overflow-hidden rounded-xl">
                    <SmartImage
                      src={card.image}
                      alt={card.alt}
                      ratio="3 / 4"
                      imgClassName="transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* page number, the way a booklet is foliated */}
                    <span
                      aria-hidden="true"
                      className="absolute left-2 top-2 grid size-7 place-items-center rounded-full bg-vermillion text-xs font-bold text-white shadow-ember"
                    >
                      {index + 1}
                    </span>

                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 grid place-items-center bg-ink/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      <span className="grid size-10 place-items-center rounded-full bg-saffron text-ink">
                        <Expand className="size-4" />
                      </span>
                    </span>
                  </span>

                  <span className="mt-2 block px-1 pb-1 text-center font-mr-ui text-xs leading-snug text-ink/75">
                    {card.labelMr}
                  </span>
                </button>
              </Reveal>
            ))}
          </ul>
        </section>
      </Reveal>

      <Lightbox
        items={items}
        controls={viewer}
        fit="contain"
        ratio="3 / 4"
        label="मेनू कार्ड"
      />
    </>
  );
}
