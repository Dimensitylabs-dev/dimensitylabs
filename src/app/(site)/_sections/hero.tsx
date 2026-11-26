import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="flex min-h-svh w-full items-center"
    >
      <Container className="w-full py-16 sm:py-24">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Dimensity Labs
        </p>
        <h1
          id="home-hero-heading"
          className="mt-4 max-w-3xl text-4xl font-medium tracking-tight text-foreground sm:text-5xl"
        >
          Technology and AI product engineering for global teams.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Architecture placeholder — hero visuals and motion land in a later
          phase.
        </p>
      </Container>
    </section>
  );
}
