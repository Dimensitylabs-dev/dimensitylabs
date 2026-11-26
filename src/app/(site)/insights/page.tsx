import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { getInsights } from "@/lib/content/insights";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Insights",
  description: "Perspectives on product engineering and applied AI.",
  path: "/insights",
});

export default async function InsightsPage() {
  const articles = await getInsights();

  return (
    <Container className="py-16">
      <h1 className="text-3xl font-medium text-foreground">Insights</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Editorial index scaffolding — article layouts come later.
      </p>
      <ul className="mt-10 space-y-4">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/insights/${article.slug}`}
              className="text-lg text-foreground hover:text-muted-foreground"
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
