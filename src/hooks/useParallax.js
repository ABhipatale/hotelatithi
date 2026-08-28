import { useEffect, useRef } from "react";

/**
 * Cheap, jank-free parallax: one passive scroll listener, one rAF per frame,
 * and a direct transform write. Disabled under prefers-reduced-motion.
 */
export function useParallax(factor = 0.12, { max = 140 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const apply = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      // progress of the element through the viewport, roughly -1 → 1
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) /
        window.innerHeight;
      const offset = Math.max(-max, Math.min(max, progress * factor * 100));
      node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [factor, max]);

  return ref;
}
