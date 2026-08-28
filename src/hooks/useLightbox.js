import { useCallback, useEffect, useRef, useState } from "react";

const CLOSE_MS = 220;

/**
 * Open/close and paging state for <Lightbox>. Lives here rather than beside
 * the component so that file exports a component and nothing else — which is
 * what Fast Refresh needs to swap it cleanly.
 */
export function useLightbox(count) {
  const [index, setIndex] = useState(null);
  const [closing, setClosing] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const open = useCallback((i) => setIndex(i), []);

  const close = useCallback(() => {
    setClosing(true);
    timer.current = setTimeout(() => {
      setIndex(null);
      setClosing(false);
    }, CLOSE_MS);
  }, []);

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + count) % count),
    [count]
  );

  return { index, isOpen: index !== null, closing, open, close, next, prev };
}
