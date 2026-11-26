import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Dimensity Labs.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-medium text-foreground">Privacy Policy</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Legal content placeholder for the architecture phase.
      </p>
    </Container>
  );
}
