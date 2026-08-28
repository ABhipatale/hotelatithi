import { useEffect, useState } from "react";

/**
 * Fires once when the element first enters the viewport. Replaces the
 * framer-motion equivalent so the stats strip costs no animation runtime.
 */
export function useInView(ref, { amount = 0.3, once = true } = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: amount }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, amount, once]);

  return inView;
}
