import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { getCaseStudies } from "@/lib/content/work";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Work",
  description: "Selected projects and case studies from Dimensity Labs.",
  path: "/work",
});

export default async function WorkPage() {
  const studies = await getCaseStudies();

  return (
    <Container className="py-16">
      <h1 className="text-3xl font-medium text-foreground">Work</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Portfolio index scaffolding — case study presentation comes later.
      </p>
      <ul className="mt-10 space-y-4">
        {studies.map((study) => (
          <li key={study.slug}>
            <Link
              href={`/work/${study.slug}`}
              className="text-lg text-foreground transition-colors hover:text-muted-foreground"
            >
              {study.title}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              {study.category} · {study.summary}
            </p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
