import { VanteRibbon } from "@/components/showcase/vante-ribbon";

/**
 * Homepage project showcase — exact Vante Video Ribbon experience.
 * Standalone reference: /showcase/vante-ribbon.html
 */
export function FeaturedWork() {
  return (
    <section
      id="work"
      aria-label="Selected work"
      className="relative w-full min-h-svh"
    >
      <VanteRibbon />
    </section>
  );
}
