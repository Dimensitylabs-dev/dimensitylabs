"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

import { themeConfig } from "@/lib/theme/config";

type ThemeProviderProps = {
  children: ReactNode;
};

/**
 * Single application-wide theme provider.
 * Do not nest additional theme providers elsewhere.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={themeConfig.attribute}
      defaultTheme={themeConfig.defaultTheme}
      enableSystem={themeConfig.enableSystem}
      storageKey={themeConfig.storageKey}
      disableTransitionOnChange

    >
      {children}
    </NextThemesProvider>
  );
}
