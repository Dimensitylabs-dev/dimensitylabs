# Dimensity Labs — Theme System

Centralized light / dark / system theme architecture for the entire website.

Every new UI component and page must be theme-aware by default and must use the centralized global theme system. Never implement an independent theme mechanism.

## Architecture

```text
src/
  components/theme/
    theme-provider.tsx     # Single NextThemes provider (root only)
    theme-toggle.tsx       # Reusable Light / Dark / System control
  hooks/
    use-theme.ts           # Centralized client API
  lib/theme/
    config.ts              # storage key, defaults, option labels
    types.ts               # ThemePreference, ResolvedTheme
    utils.ts               # helpers
    index.ts               # public barrel
  styles/
    theme-tokens.css       # :root + html.dark semantic CSS variables
  app/
    globals.css            # Tailwind + @theme token mapping
    layout.tsx             # ThemeProvider + suppressHydrationWarning
```

`theme-tokens.css` is imported separately from the Tailwind entry so Turbopack does not strip the `html.dark` variable map.

Dependency: `next-themes` (single engine). Do not add a second theme library or custom localStorage theme scripts in components.

## How it works

1. `ThemeProvider` wraps the app once in `src/app/layout.tsx`.
2. Preference (`light` | `dark` | `system`) is persisted under `dl-theme`.
3. `next-themes` applies `class="dark"` on `<html>` when the resolved theme is dark.
4. CSS semantic variables on `:root` / `.dark` drive all UI colors.
5. Tailwind utilities (`bg-background`, `text-foreground`, …) read those variables via `@theme inline`.

First-time visitors default to **system**. Explicit choices persist across refresh.

## Theme provider usage

Already wired in the root layout:

```tsx
<html lang="en" suppressHydrationWarning>
  <body className="bg-background text-foreground">
    <ThemeProvider>{children}</ThemeProvider>
  </body>
</html>
```

Do **not** nest another provider in route layouts or pages.

## Accessing the active theme

Client components only:

```tsx
"use client";

import { useTheme } from "@/hooks/use-theme";

export function Example() {
  const { theme, resolvedTheme, setTheme, mounted } = useTheme();
  // theme → preference (light | dark | system)
  // resolvedTheme → applied appearance (light | dark)
}
```

Server Components should not read theme state. Style them with semantic tokens so they inherit whatever the document theme is.

## Theme toggle

```tsx
import { ThemeToggle } from "@/components/theme/theme-toggle";

<ThemeToggle />
<ThemeToggle size="sm" />
```

`ThemeToggle` wraps Magic UI `AnimatedThemeToggler` (View Transitions reveal) and stays controlled through `useTheme()` / `next-themes`. Default transition duration is **900ms** for a smoother reveal.

Use this component in nav, footer, settings, or mobile drawers. Do not fork its logic or call `localStorage` for theme.
## Semantic tokens

Prefer these Tailwind classes (backed by CSS variables):

| Token | Typical use |
| --- | --- |
| `background` / `foreground` | Page canvas and body text |
| `surface` / `surface-secondary` | Section bands, subtle panels |
| `card` / `card-foreground` | Elevated containers |
| `primary` / `primary-foreground` | Primary actions |
| `secondary` / `secondary-foreground` | Secondary actions |
| `muted` / `muted-foreground` | Quiet surfaces and supporting copy |
| `accent` / `accent-foreground` | Emphasis / brand accent (olive family) |
| `border` / `input` / `ring` | Borders, fields, focus rings |

Brand primitives (`smoky-black`, `olive`, `bone`, `floral-white`) remain available for rare, justified cases — not for general UI chrome.

### Light

Floral White canvas, Smoky Black type, Bone / Olive supporting surfaces.

### Dark

Smoky Black canvas, Bone / Floral White type, lifted dark surfaces, Olive as a restrained accent.

## Building theme-aware components

```tsx
export function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-card p-6 text-card-foreground shadow-soft">
      {children}
    </div>
  );
}
```

Rules:

1. Use semantic tokens for backgrounds, text, borders, and rings.
2. Never add local theme state or `localStorage` theme reads.
3. Never hardcode `#11120D` / `#FFFBF4` in component classes without a documented exception.
4. Keep interactive islands small; leave layouts/pages as Server Components.
5. Ensure contrast for both resolved themes.

## Adding new colors safely

1. Add the raw value near the brand primitives in `globals.css` if it is a brand extension.
2. Map it into **both** `:root` and `.dark` semantic roles (or extend an existing role).
3. Expose it in `@theme inline` as `--color-*`.
4. Document the token in this file.
5. Prefer remapping an existing semantic token over inventing a one-off utility.

## Testing checklist

- [ ] Light mode: canvas is floral white, type is smoky black
- [ ] Dark mode: canvas is smoky black, type is bone/floral white
- [ ] System mode: follows OS; changes when OS preference changes
- [ ] Refresh preserves the selected preference
- [ ] No flash of incorrect theme on first paint
- [ ] No React hydration mismatch warnings
- [ ] Header and footer toggles stay in sync
- [ ] Routes under `(site)` inherit theme without per-page logic

## Common mistakes

- Creating a second provider or storage key
- Using `bg-floral-white` / `text-smoky-black` for app chrome
- Toggling theme by manually setting classes inside a page
- Reading `localStorage` outside `useTheme` / `next-themes`
- Converting the root layout into a Client Component
- Assuming Server Components can call `useTheme`

## Documented exception

`FinalCta` (landing smoke card) is an intentional always-dark media showcase. Its palette is scoped under `.dl-cta` and must not be wired to global semantic tokens without a deliberate redesign.
