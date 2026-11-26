import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { getServices } from "@/lib/content/services";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "Product engineering, AI systems, and delivery capabilities from Dimensity Labs.",
  path: "/services",
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <Container className="py-16">
      <h1 className="text-3xl font-medium text-foreground">Services</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Route and content scaffolding only — service page design comes later.
      </p>
      <ul className="mt-10 space-y-4">
        {services.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className="text-lg text-foreground hover:text-muted-foreground"
            >
              {service.title}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
