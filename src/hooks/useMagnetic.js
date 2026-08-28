import { useEffect, useRef } from "react";

/**
 * Gives a button a slight pull toward the cursor and lets go on leave.
 * Pointer-only and disabled under reduced motion, so touch and keyboard
 * users are unaffected.
 */
export function useMagnetic(strength = 0.28) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let target = { x: 0, y: 0 };

    const apply = () => {
      frame = 0;
      node.style.transform = `translate3d(${target.x.toFixed(2)}px, ${target.y.toFixed(2)}px, 0)`;
    };

    const onMove = (event) => {
      const rect = node.getBoundingClientRect();
      target = {
        x: (event.clientX - (rect.left + rect.width / 2)) * strength,
        y: (event.clientY - (rect.top + rect.height / 2)) * strength,
      };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      target = { x: 0, y: 0 };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [strength]);

  return ref;
}
