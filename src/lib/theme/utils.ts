import type { ThemePreference } from "@/lib/theme/types";

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

/** Map a preference + system setting to the document appearance. */
export function resolveTheme(
  preference: ThemePreference,
  systemPrefersDark: boolean,
): "light" | "dark" {
  if (preference === "system") {
    return systemPrefersDark ? "dark" : "light";
  }
  return preference;
}
