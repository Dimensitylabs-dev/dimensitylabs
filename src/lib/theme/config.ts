import type { ThemeOption, ThemePreference } from "@/lib/theme/types";

export const themeConfig = {
  /** localStorage key — single persistence location for the app. */
  storageKey: "dl-theme",
  /** First-time visitors follow the OS preference. */
  defaultTheme: "system" as ThemePreference,
  /** Apply theme via `class="dark"` on <html> for Tailwind compatibility. */
  attribute: "class" as const,
  enableSystem: true,
} as const;

export const themeOptions: ThemeOption[] = [
  {
    value: "light",
    label: "Light",
    description: "Floral white surfaces with smoky-black typography",
  },
  {
    value: "dark",
    label: "Dark",
    description: "Smoky-black surfaces with bone typography",
  },
  {
    value: "system",
    label: "System",
    description: "Follow the operating system appearance",
  },
];
