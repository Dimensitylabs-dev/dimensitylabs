import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description: "Start a conversation with Dimensity Labs.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-medium text-foreground">Contact</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Contact route scaffolding. Form UI and Server Action wiring come in a
        later phase — see <code>actions.ts</code> in this folder.
      </p>
    </Container>
  );
}
