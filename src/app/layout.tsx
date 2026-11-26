import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { fontMono, fontSans } from "@/lib/fonts";
import { organizationJsonLd } from "@/lib/seo/json-ld";
import { rootMetadata } from "@/lib/seo/metadata";

import "@/styles/theme-tokens.css";
import "./globals.css";

export const metadata = rootMetadata;

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = organizationJsonLd();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
