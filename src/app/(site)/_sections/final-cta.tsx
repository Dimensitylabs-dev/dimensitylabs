import { fontCta } from "@/lib/fonts";

import { FinalCtaPanel } from "./final-cta-panel";

import "./final-cta.css";

/** Landing closing CTA — smoke card, waitlist, and section footer. */
export function FinalCta() {
  return (
    <section
      aria-labelledby="home-cta-heading"
      className={`dl-cta flex min-h-svh w-full items-center ${fontCta.variable}`}
    >
      <FinalCtaPanel />
    </section>
  );
}
