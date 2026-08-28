import { useEffect, useRef, useState } from "react";

/**
 * Cross-fading hero backdrop.
 *
 * Each slide keeps its own slow zoom so the frame is never static, and the
 * fade is opacity-only — no layout work — which keeps it off the main thread.
 * Under prefers-reduced-motion it settles on the first slide and stops.
 *
 * The first image is eager + high priority because it is the LCP element; the
 * rest load lazily so the rotation costs nothing up front.
 */
const INTERVAL_MS = 6000;

export default function HeroSlideshow({ slides }) {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const tick = () => setIndex((i) => (i + 1) % slides.length);
    timer.current = setInterval(tick, INTERVAL_MS);

    // pause while the tab is hidden so we don't burn frames in the background
    const onVisibility = () => {
      clearInterval(timer.current);
      if (!document.hidden) timer.current = setInterval(tick, INTERVAL_MS);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearInterval(timer.current);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [slides.length]);

  return (
    <div className="absolute inset-0 -z-20" aria-hidden="true">
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt=""
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "low"}
          decoding={i === 0 ? "sync" : "async"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-in-out ${
            slide.position ?? "object-center"
          } ${i === index ? "animate-slow-zoom opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
}
