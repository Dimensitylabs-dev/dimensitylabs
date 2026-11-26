"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import type { ResolvedTheme, ThemePreference } from "@/lib/theme/types";
import { isThemePreference } from "@/lib/theme/utils";

type UseThemeResult = {
  /** Persisted preference: light | dark | system */
  theme: ThemePreference | undefined;
  /** Effective appearance after resolving system preference */
  resolvedTheme: ResolvedTheme | undefined;
  setTheme: (theme: ThemePreference) => void;
  themes: ThemePreference[];
  systemTheme: ResolvedTheme | undefined;
  /** False until the client has hydrated — avoid toggle UI mismatch. */
  mounted: boolean;
};

const emptySubscribe = () => () => {};

/**
 * Centralized theme API for client components.
 * All theme reads/writes must go through this hook (or ThemeToggle).
 */
export function useTheme(): UseThemeResult {
  const { theme, resolvedTheme, setTheme, themes, systemTheme } =
    useNextTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  return {
    theme: isThemePreference(theme) ? theme : undefined,
    resolvedTheme:
      resolvedTheme === "light" || resolvedTheme === "dark"
        ? resolvedTheme
        : undefined,
    setTheme: (next) => setTheme(next),
    themes: themes.filter(isThemePreference),
    systemTheme:
      systemTheme === "light" || systemTheme === "dark"
        ? systemTheme
        : undefined,
    mounted,
  };
}
