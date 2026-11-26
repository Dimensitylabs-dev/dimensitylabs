import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Learn about Dimensity Labs — a technology and AI product engineering studio.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="py-16">
      <h1 className="text-3xl font-medium text-foreground">About</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        About page scaffolding. Studio story and team content arrive later.
      </p>
    </Container>
  );
}
