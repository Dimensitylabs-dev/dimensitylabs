import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Terms & Conditions",
  description: "Terms and Conditions for Dimensity Labs.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-medium text-foreground">
        Terms & Conditions
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Legal content placeholder for the architecture phase.
      </p>
    </Container>
  );
}
