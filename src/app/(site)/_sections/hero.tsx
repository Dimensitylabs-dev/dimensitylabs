import { Container } from "@/components/ui/container";

export function Hero() {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="flex min-h-svh w-full items-center"
    >
      <Container className="w-full py-12 sm:py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
          Dimensity Labs
        </p>
        <h1
          id="home-hero-heading"
          className="mt-3 max-w-3xl text-[1.85rem] font-medium leading-tight tracking-tight text-foreground sm:mt-4 sm:text-5xl sm:leading-none"
        >
          Technology and AI product engineering for global teams.
        </h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground sm:mt-6 sm:text-lg">
          Architecture placeholder — hero visuals and motion land in a later
          phase.
        </p>
      </Container>
    </section>
  );
}
