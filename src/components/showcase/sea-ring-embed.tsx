"use client";

/**
 * Exact Sea Ring portfolio experience (Noa Ellsworth reference).
 * Kept for standalone viewing at /showcase/sea-ring.html — not used on the homepage.
 */
export function SeaRingEmbed() {
  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-[#0A0E11]">
      <iframe
        src="/showcase/sea-ring.html"
        title="Selected work — 3D project ring"
        className="absolute inset-0 h-full w-full border-0"
        allow="autoplay; fullscreen"
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
