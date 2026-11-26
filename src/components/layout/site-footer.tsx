import Link from "next/link";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { footerNav } from "@/lib/constants/navigation";
import { siteConfig } from "@/lib/constants/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-medium text-foreground">{siteConfig.name}</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
          <div className="mt-5">
            <ThemeToggle size="sm" />
          </div>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
            {footerNav.map((item) => (
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
      </div>
    </footer>
  );
}
