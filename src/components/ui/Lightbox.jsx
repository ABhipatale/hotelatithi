import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";

import SmartImage from "./SmartImage";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { useFocusTrap } from "../../hooks/useFocusTrap";

export default function Lightbox({
  items,
  controls,
  fit = "cover",
  ratio,
  label = "Image viewer",
  fullSizeLabel = "पूर्ण आकारात पहा",
}) {
  const { index, isOpen, closing, close, next, prev } = controls;
  const dialog = useRef(null);
  const touchX = useRef(null);

  useLockBodyScroll(isOpen);
  useFocusTrap(dialog, isOpen && !closing);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, next, prev]);

  if (!isOpen) return null;

  const active = items[index];

  const onTouchStart = (event) => {
    touchX.current = event.changedTouches[0].clientX;
  };
  const onTouchEnd = (event) => {
    if (touchX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchX.current;
    if (delta < -60) next();
    if (delta > 60) prev();
    touchX.current = null;
  };

  return (
    <div
      ref={dialog}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={close}
      className={`fixed inset-0 z-60 flex flex-col bg-ink/95 outline-none backdrop-blur-md ${
        closing ? "animate-fade-out" : "animate-fade-in"
      }`}
    >
      <div className="flex items-center justify-between gap-4 p-4 sm:p-6">
        <p
          aria-live="polite"
          className="rounded-full border border-cream/15 bg-cream/5 px-4 py-1.5 text-sm font-semibold tabular-nums text-cream/85"
        >
          {index + 1} / {items.length}
        </p>
        <button
          type="button"
          onClick={close}
          aria-label="बंद करा"
          className="grid size-11 place-items-center rounded-full border border-cream/15 bg-cream/5 text-cream transition-colors hover:bg-vermillion"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-6 sm:px-6"
        onClick={(event) => event.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {items.length > 1 && (
          <button
            type="button"
            onClick={prev}
            aria-label="मागील"
            className="absolute left-2 z-10 grid size-11 place-items-center rounded-full border border-cream/15 bg-cream/5 text-cream transition-colors hover:bg-vermillion sm:left-6 sm:size-14"
          >
            <ChevronLeft className="size-6" aria-hidden="true" />
          </button>
        )}

        <figure
          key={active.id}
          className="flex max-h-full w-full max-w-4xl animate-zoom-in flex-col items-center"
        >
          <SmartImage
            src={active.image}
            alt={active.alt ?? active.captionMr}
            className={`max-h-[66vh] w-full rounded-2xl ${
              fit === "contain" ? "" : "border border-sand-2"
            }`}
            fit={fit}
            surface={fit === "contain" ? "bg-ink-3" : "bg-sand"}
            ratio={ratio}
            priority
          />

          <figcaption className="mt-5 text-center">
            <p className="font-marathi text-lg text-cream sm:text-xl">
              {active.captionMr}
            </p>

            {fit === "contain" ? (
              // A price list has to be readable, and 66vh of a phone screen is
              // not enough for one. This hands over the original file.
              <a
                href={active.image}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-saffron/50 px-4 py-2 text-sm font-semibold text-saffron transition-colors hover:bg-saffron hover:text-ink"
              >
                {fullSizeLabel}
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            ) : (
              <p className="mt-1 font-mr-ui text-sm text-saffron/80">हॉटेल अतिथी</p>
            )}
          </figcaption>
        </figure>

        {items.length > 1 && (
          <button
            type="button"
            onClick={next}
            aria-label="पुढील"
            className="absolute right-2 z-10 grid size-11 place-items-center rounded-full border border-cream/15 bg-cream/5 text-cream transition-colors hover:bg-vermillion sm:right-6 sm:size-14"
          >
            <ChevronRight className="size-6" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
