import { Geist, Geist_Mono, Inter } from "next/font/google";

/**
 * Central typography entrypoint.
 * Replace Geist with brand fonts when final typefaces are selected.
 * Load only required weights/styles.
 */
export const fontSans = Geist({
  variable: "--font-dl-sans",
  subsets: ["latin"],
});

export const fontMono = Geist_Mono({
  variable: "--font-dl-mono",
  subsets: ["latin"],
});

/** Variable Inter for the landing CTA composition. */
export const fontCta = Inter({
  variable: "--font-cta",
  subsets: ["latin"],
  display: "swap",
});
