import { useEffect, useState } from "react";

/**
 * Tracks which section is currently framed in the viewport so the navbar can
 * show an active indicator. Uses a top-biased root margin so a section counts
 * as "active" once it sits under the sticky navbar.
 */
export function useActiveSection(ids, { offset = 96 } = {}) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: `-${offset}px 0px -55% 0px`,
        threshold: [0.05, 0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids, offset]);

  return active;
}
