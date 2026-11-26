<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Dimensity Labs — permanent UI rules

Every new UI component and page must be theme-aware by default and must use the centralized global theme system. Never implement an independent theme mechanism.

- Semantic tokens live in `src/app/globals.css` (`background`, `foreground`, `muted-foreground`, `border`, …).
- Single provider: `src/components/theme/theme-provider.tsx` (root layout only).
- Client API: `@/hooks/use-theme`.
- Toggle UI: `@/components/theme/theme-toggle`.
- Full guide: `docs/design-system/THEMING.md`.
