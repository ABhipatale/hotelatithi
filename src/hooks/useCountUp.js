import { useEffect, useState } from "react";

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Animates 0 → target once `start` flips true (i.e. when the stats strip
 * scrolls into view). Respects prefers-reduced-motion by jumping to the value.
 */
export function useCountUp(target, start, { duration = 1900, decimals = 0 } = {}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // Reduced motion still resolves through rAF — it just lands on the final
    // value in a single frame instead of counting up.
    const span = reduceMotion ? 0 : duration;

    let frame;
    const began = performance.now();

    const tick = (now) => {
      const progress = span === 0 ? 1 : Math.min((now - began) / span, 1);
      const next = target * easeOutExpo(progress);
      setValue(Number(next.toFixed(decimals)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start, duration, decimals]);

  return value;
}
