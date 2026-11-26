import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Container className="py-24">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            404
          </p>
          <h1 className="mt-4 text-3xl font-medium text-foreground">
            Page not found
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block text-sm font-medium text-foreground underline underline-offset-4"
          >
            Back to home
          </Link>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
