import { useEffect, useRef } from "react";

/**
 * Scroll reveal with no animation runtime: one shared IntersectionObserver
 * flips a class and CSS does the rest. Keeps the bundle small and the main
 * thread free while scrolling.
 *
 * `variant` picks the entrance — "up" (lift), "clip" (wipe), "scale" (grow)
 * or "blur" (focus in).
 */
let observer = null;

function getObserver() {
  if (observer || typeof window === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );
  return observer;
}

export default function Reveal({
  as: Tag = "div",
  variant = "up",
  children,
  className = "",
  delay = 0,
  y = 26,
  x = 0,
  scale = 0.9,
  style,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = getObserver();
    if (!io) {
      node.classList.add("revealed");
      return;
    }
    io.observe(node);
    return () => io.unobserve(node);
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={className}
      style={{
        "--rd": `${delay}ms`,
        "--ry": `${y}px`,
        "--rx": `${x}px`,
        "--rs": scale,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
