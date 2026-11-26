import Link from "next/link";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { primaryNav } from "@/lib/constants/navigation";
import { siteConfig } from "@/lib/constants/site";

/** Shared primary navigation shell. Interactive mobile nav stays a client island later. */
export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-5">
        <Link
          href="/"
          className="font-medium tracking-tight text-foreground transition-colors"
        >
          {siteConfig.name}
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <nav aria-label="Primary" className="hidden sm:block">
            <ul className="flex items-center gap-6">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle size="sm" />
        </div>
      </div>
    </header>
  );
}
