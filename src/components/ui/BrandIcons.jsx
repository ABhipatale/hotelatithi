/**
 * Lucide dropped third-party brand marks, so the social glyphs live here as
 * plain inline SVG (they inherit currentColor like any other icon).
 */
export function InstagramIcon({ className = "size-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className = "size-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M14.1 22v-8.2h2.8l.42-3.2h-3.22V8.53c0-.93.26-1.56 1.6-1.56h1.7V4.1A22.7 22.7 0 0 0 14.9 4c-2.47 0-4.16 1.5-4.16 4.26v2.34H8v3.2h2.74V22h3.36Z" />
    </svg>
  );
}

export function WhatsappIcon({ className = "size-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.02 2C6.6 2 2.2 6.4 2.2 11.82c0 1.9.53 3.68 1.46 5.2L2 22.5l5.62-1.6a9.77 9.77 0 0 0 4.4 1.05h.01c5.42 0 9.82-4.4 9.82-9.82S17.44 2 12.02 2Zm0 17.94h-.01a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.06.87.82-3-.2-.31a8.13 8.13 0 1 1 6.88 3.75Zm4.46-6.08c-.24-.12-1.44-.71-1.67-.79-.22-.08-.38-.12-.55.12s-.63.79-.77.95c-.14.16-.28.18-.52.06a6.66 6.66 0 0 1-1.96-1.21 7.4 7.4 0 0 1-1.36-1.69c-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.85 2.03c0 1.2.87 2.36.99 2.52.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}
