import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Careers",
  description: "Join Dimensity Labs and help build products that matter.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-medium text-foreground">Careers</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Careers route scaffolding. Roles and application flow arrive later.
      </p>
    </Container>
  );
}
