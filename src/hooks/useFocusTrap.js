import { useEffect } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Keeps Tab inside an open overlay and hands focus back to whatever opened it.
 *
 * Without this a keyboard user tabs straight out of the lightbox or the mobile
 * drawer and into the page behind — which is still scroll-locked, so there is
 * no way back. `ref` should point at the overlay root and that root needs
 * `tabIndex={-1}` so focus has somewhere to land when it holds no controls.
 */
export function useFocusTrap(ref, active) {
  useEffect(() => {
    const node = ref.current;
    if (!active || !node) return;

    const opener = document.activeElement;
    const focusable = () =>
      [...node.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);

    // next frame, because the overlay may still be animating in
    const frame = requestAnimationFrame(() => (focusable()[0] ?? node).focus());

    const onKey = (event) => {
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;

      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    node.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      node.removeEventListener("keydown", onKey);
      if (opener instanceof HTMLElement && document.contains(opener)) opener.focus();
    };
  }, [ref, active]);
}
