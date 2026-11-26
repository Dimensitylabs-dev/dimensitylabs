import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Container } from "@/components/ui/container";
import { getServiceBySlug, getServices } from "@/lib/content/services";
import { createPageMetadata } from "@/lib/seo/metadata";

type ServicePageProps = PageProps<"/services/[slug]">;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return createPageMetadata({
      title: "Service not found",
      description: "The requested service could not be found.",
      path: `/services/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

function ServiceFallback() {
  return (
    <Container className="py-16">
      <div className="h-9 max-w-sm rounded bg-muted" />
      <div className="mt-4 h-4 max-w-2xl rounded bg-muted" />
      <div className="mt-2 h-4 max-w-xl rounded bg-muted" />
    </Container>
  );
}

async function ServiceContent({
  params,
}: {
  params: ServicePageProps["params"];
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <Container className="py-16">
      <h1 className="text-3xl font-medium text-foreground">{service.title}</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">{service.description}</p>
    </Container>
  );
}

export default function ServicePage({ params }: ServicePageProps) {
  return (
    <Suspense fallback={<ServiceFallback />}>
      <ServiceContent params={params} />
    </Suspense>
  );
}
