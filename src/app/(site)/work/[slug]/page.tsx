import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Container } from "@/components/ui/container";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/content/work";
import { createPageMetadata } from "@/lib/seo/metadata";

type WorkPageProps = PageProps<"/work/[slug]">;

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) {
    return createPageMetadata({
      title: "Case study not found",
      description: "The requested case study could not be found.",
      path: `/work/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: study.title,
    description: study.summary,
    path: `/work/${study.slug}`,
  });
}

function CaseStudyFallback() {
  return (
    <section className="flex min-h-svh w-full items-center">
      <Container className="w-full py-16">
        <div className="h-4 w-28 rounded bg-muted" />
        <div className="mt-8 h-3 w-40 rounded bg-muted" />
        <div className="mt-4 h-10 max-w-md rounded bg-muted" />
        <div className="mt-6 h-4 max-w-2xl rounded bg-muted" />
        <div className="mt-3 h-4 max-w-xl rounded bg-muted" />
        <div className="mt-10 aspect-video w-full rounded-xl bg-muted" />
      </Container>
    </section>
  );
}

async function CaseStudyContent({
  params,
}: {
  params: WorkPageProps["params"];
}) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <section className="flex min-h-svh w-full items-start sm:items-center">
      <Container className="w-full py-10 sm:py-16">
        <Link
          href="/#work"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to work
        </Link>
        <p className="mt-6 text-xs uppercase tracking-[0.16em] text-muted-foreground sm:mt-8 sm:text-sm">
          {study.category} · {study.client}
        </p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
          {study.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {study.summary}
        </p>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:mt-4 sm:text-base">
          {study.description}
        </p>
        {study.video ? (
          <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card sm:mt-10">
            <video
              className="aspect-video w-full object-cover"
              src={study.video}
              muted
              loop
              playsInline
              autoPlay
              controls
            />
          </div>
        ) : null}
      </Container>
    </section>
  );
}

export default function CaseStudyPage({ params }: WorkPageProps) {
  return (
    <Suspense fallback={<CaseStudyFallback />}>
      <CaseStudyContent params={params} />
    </Suspense>
  );
}
