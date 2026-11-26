/** User-selected preference persisted in storage. */
export type ThemePreference = "light" | "dark" | "system";

/** Resolved appearance applied to the document. */
export type ResolvedTheme = "light" | "dark";

export type ThemeOption = {
  value: ThemePreference;
  label: string;
  description: string;
};
