import { Container } from "@/components/ui/container";

export function Intro() {
  return (
    <section
      aria-labelledby="home-intro-heading"
      className="flex min-h-svh w-full items-center"
    >
      <Container className="w-full py-16">
        <h2
          id="home-intro-heading"
          className="text-2xl font-medium text-foreground"
        >
          A short introduction
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Dimensity Labs is a technology and AI product engineering studio.
          Section content is intentionally minimal in this architecture phase.
        </p>
      </Container>
    </section>
  );
}
