import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Container } from "@/components/ui/container";
import { getInsightBySlug, getInsights } from "@/lib/content/insights";
import { createPageMetadata } from "@/lib/seo/metadata";

type InsightPageProps = PageProps<"/insights/[slug]">;

export async function generateStaticParams() {
  const articles = await getInsights();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getInsightBySlug(slug);

  if (!article) {
    return createPageMetadata({
      title: "Article not found",
      description: "The requested article could not be found.",
      path: `/insights/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: article.title,
    description: article.summary,
    path: `/insights/${article.slug}`,
  });
}

function InsightFallback() {
  return (
    <Container className="py-16">
      <div className="h-3 w-24 rounded bg-muted" />
      <div className="mt-3 h-9 max-w-md rounded bg-muted" />
      <div className="mt-4 h-4 max-w-2xl rounded bg-muted" />
    </Container>
  );
}

async function InsightContent({
  params,
}: {
  params: InsightPageProps["params"];
}) {
  const { slug } = await params;
  const article = await getInsightBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <Container className="py-16">
      <p className="text-sm text-muted-foreground">{article.publishedAt}</p>
      <h1 className="mt-3 text-3xl font-medium text-foreground">
        {article.title}
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">{article.description}</p>
    </Container>
  );
}

export default function InsightPage({ params }: InsightPageProps) {
  return (
    <Suspense fallback={<InsightFallback />}>
      <InsightContent params={params} />
    </Suspense>
  );
}
