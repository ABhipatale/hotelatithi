import { useState } from "react";

/**
 * Photography primitive: lazy loading, a warm shimmer while the bytes land and
 * a graceful cream fallback if a file ever goes missing — so the page never
 * shows a broken-image icon.
 *
 * Sources are the hotel's own photographs, imported and fingerprinted by Vite,
 * so there is no srcset to build — the files ship at their native size.
 *
 * `fit` and `surface` are real props rather than things you pass through the
 * class strings: Tailwind emits `.object-contain` before `.object-cover` and
 * `.bg-sand` after most other backgrounds, so either one passed as a class
 * would silently lose to the base value. `surface` matters wherever `contain`
 * letterboxes — that ground is visible.
 */
const FIT = {
  cover: "object-cover",
  contain: "object-contain",
};

export default function SmartImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  ratio,
  fit = "cover",
  surface = "bg-sand",
  priority = false,
  children,
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${surface} ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {!loaded && !failed && (
        <div className="absolute inset-0 skeleton" aria-hidden="true" />
      )}

      {failed ? (
        <div className="absolute inset-0 grid place-items-center bg-cream" aria-hidden="true">
          <div className="absolute inset-0 motif opacity-[0.12]" />
          <span className="relative font-marathi text-2xl text-vermillion/70">अतिथी</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full ${FIT[fit] ?? FIT.cover} transition-[opacity,transform] duration-700 ease-out ${
            loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"
          } ${imgClassName}`}
        />
      )}

      {children}
    </div>
  );
}
