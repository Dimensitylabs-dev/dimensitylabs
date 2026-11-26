# Project Showcase — Vante Video Ribbon

The homepage **Selected work** section uses the exact Vante “Craft in Motion” scroll ribbon.

## Files

| File | Role |
| --- | --- |
| `src/components/showcase/vante-ribbon.tsx` | Markup + script boot |
| `src/components/showcase/vante-ribbon.css` | Reference styles (scoped under `.vante-ribbon`) |
| `public/showcase/vante-ribbon.js` | Verbatim three.js ribbon logic |
| `public/showcase/vante-ribbon.html` | Standalone exact page |
| `src/app/(site)/_sections/featured-work.tsx` | Section entry |

## Behavior

- One scroll progress number `p` (smoothed) drives headline, ribbon, and grid
- Ribbon slides on a fixed Catmull-Rom rail; cards then land in a 3×2 grid
- Eight remote videos via `THREE.VideoTexture`
- Section-relative scroll so the ribbon works mid-page (not only at document top)

## Standalone

Open `/showcase/vante-ribbon.html` for the isolated full-page version.

## Note

Sea Ring (`/showcase/sea-ring.html`) remains available but is no longer mounted on the homepage.
