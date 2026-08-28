import { ZoomIn } from "lucide-react";

import SectionHeading from "./ui/SectionHeading";
import SmartImage from "./ui/SmartImage";
import Reveal from "./ui/Reveal";
import Lightbox from "./ui/Lightbox";
import { useLightbox } from "../hooks/useLightbox";
import { GALLERY_ITEMS } from "../data/galleryData";

const SPAN = {
  normal: "",
  tall: "row-span-2",
  wide: "sm:col-span-2",
};

export default function Gallery() {
  const viewer = useLightbox(GALLERY_ITEMS.length);

  return (
    <section id="gallery" className="section-pad relative overflow-hidden bg-cream-2">
      <div className="shell relative">
        <SectionHeading
          kicker="Gallery"
          title="आमची झलक"
          subtitle="आमचं हॉटेल, आमचं स्वयंपाकघर आणि आमच्या पाहुण्यांचे आनंदाचे क्षण."
        />

        <ul className="mt-12 grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:grid-cols-3 sm:gap-4 lg:auto-rows-[215px] lg:grid-cols-4">
          {GALLERY_ITEMS.map((item, itemIndex) => (
            <Reveal
              as="li"
              key={item.id}
              delay={(itemIndex % 4) * 70}
              y={22}
              className={`${SPAN[item.span]} h-full`}
            >
              <button
                type="button"
                onClick={() => viewer.open(itemIndex)}
                aria-label={`मोठं करून पहा: ${item.captionMr}`}
                className="group relative h-full w-full overflow-hidden rounded-2xl border border-sand-2 transition-colors duration-500 hover:border-amber"
              >
                <SmartImage
                  src={item.image}
                  alt={item.alt}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[1100ms] ease-out group-hover:scale-[1.14]"
                />

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 veil-ink opacity-75 transition-opacity duration-500 group-hover:opacity-95"
                />

                <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 text-left sm:p-4">
                  <span className="translate-y-2 font-mr-ui text-sm leading-snug text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:text-base">
                    {item.captionMr}
                  </span>
                  <span className="grid size-8 shrink-0 scale-75 place-items-center rounded-full bg-saffron text-ink opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 sm:size-9">
                    <ZoomIn className="size-4" aria-hidden="true" />
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <Lightbox
        items={GALLERY_ITEMS}
        controls={viewer}
        ratio="16 / 10"
        label="Gallery image viewer"
      />
    </section>
  );
}
