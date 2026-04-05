# Footer Landmark — Spec

## Goal

Add a `<footer>` landmark to the docs app for semantic HTML and accessibility compliance (DS_CONSTRAINTS line 209).

## Scope

Docs app only (`apps/docs/`). Not a `packages/web` component.

## Design Decisions

| Decision | Resolution |
|----------|-----------|
| Placement | Sibling to `<main>` in `DocsShell`, not nested inside `<main>` |
| Pages | All pages (lives in `DocsShell`) |
| Desktop layout | Respects sidebar offset: `lg:ml-[var(--docs-sidebar-w)]` |
| Content | `KISA Design System · © {year} KISA · Built from scratch by @retz8` |
| @retz8 | Links to `https://github.com/retz8`, styled with `text-link` |
| Year | Dynamic via `new Date().getFullYear()` |
| Typography | `type-caption text-muted-foreground` |
| Spacing | `py-8`, no top border |
| Alignment | Left-aligned |

## Files to Modify

- `apps/docs/components/DocsShell.tsx` — add `<Footer />` as sibling to `<main>`
- `apps/docs/components/Footer.tsx` — new component (docs-app-only)

## DS Constraints to Observe

- Semantic `<footer>` element (DS_CONSTRAINTS: Landmark Regions)
- `type-caption` for text (semantic typography classes)
- `text-muted-foreground` / `text-link` for colors (semantic color tokens)
- Sidebar offset via CSS variable (layout consistency)
- `py-8` from Tailwind spacing scale (no arbitrary values)
