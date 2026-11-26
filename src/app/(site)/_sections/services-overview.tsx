import Link from "next/link";

import { Container } from "@/components/ui/container";
import { getServices } from "@/lib/content/services";

export async function ServicesOverview() {
  const services = await getServices();

  return (
    <section
      aria-labelledby="home-services-heading"
      className="flex min-h-svh w-full items-center"
    >
      <Container className="w-full py-16">
        <h2
          id="home-services-heading"
          className="text-2xl font-medium text-foreground"
        >
          Core services
        </h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="block text-lg text-foreground transition-colors hover:text-muted-foreground"
              >
                {service.title}
              </Link>
              <p className="mt-2 text-sm text-muted-foreground">
                {service.summary}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
