import { Container } from "@/components/ui/container";

export function WhyDimensity() {
  return (
    <section
      aria-labelledby="home-why-heading"
      className="flex min-h-svh w-full items-center"
    >
      <Container className="w-full py-16">
        <h2
          id="home-why-heading"
          className="text-2xl font-medium text-foreground"
        >
          Why Dimensity Labs
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Placeholder rationale section. Messaging and supporting points will be
          implemented in a later design phase.
        </p>
      </Container>
    </section>
  );
}
