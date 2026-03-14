# Design: KISA Design System Docs Site Infrastructure

**Date**: 2026-03-14
**Author**: Jioh In
**Status**: Approved

## Goal

Set up the infrastructure for a professional, public-facing design system documentation site at `designsystem.umichkisa.com`, modeled after LINE Design System. This session covers infrastructure only — content, visual design, and per-component pages are future tasks.

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Repo structure | Monorepo (pnpm workspaces + turborepo) | Single PR covers DS + docs, always in sync, self-documenting pipeline |
| Docs framework | Next.js 15 App Router | React-native, static export, official Vercel support |
| MDX | `@next/mdx` (official) | No runtime overhead, Vercel-first |
| Syntax highlighting | Shiki | Best quality output |
| Deployment | Vercel, `designsystem.umichkisa.com` | Org already on Vercel |
| Audience | Internal + public | Professional showcase + team reference |

## Repository Structure

```
umichkisa-ds/                     ← monorepo root
├── packages/
│   └── web/                      ← current repo contents (moved here)
│       ├── src/
│       ├── dist/
│       ├── package.json          (@umichkisa-ds/web)
│       ├── tsup.config.ts
│       └── ...
├── apps/
│   └── docs/                     ← new Next.js App Router site
│       ├── app/
│       │   ├── layout.tsx        (root layout: sidebar + topbar shell)
│       │   ├── page.tsx          (landing — TODO: design later)
│       │   ├── foundation/
│       │   │   ├── colors/page.tsx
│       │   │   ├── iconography/page.tsx
│       │   │   ├── typography/page.tsx
│       │   │   └── layout/page.tsx
│       │   └── components/
│       │       └── [slug]/page.tsx  (dynamic, renders MDX)
│       ├── components/           (docs-specific UI: sidebar, topbar, mdx-components)
│       ├── content/              (MDX source files)
│       │   ├── foundation/
│       │   └── components/
│       └── package.json          (@umichkisa-ds/docs)
├── turbo.json
├── pnpm-workspace.yaml
└── package.json                  (root — dev tooling only)
```

## Site Structure

### Foundation
- `/foundation/colors` — token swatches (primitives + semantic)
- `/foundation/iconography` — full icon grid
- `/foundation/typography` — font scale, weights
- `/foundation/layout` — spacing scale, radius

### Components
- `/components/[slug]` — one page per component, populated incrementally

## MDX Pipeline

- MDX files live in `content/`
- `@next/mdx` processes them at build time
- Custom MDX components defined in `mdx-components.tsx` (code blocks via Shiki, component previews, props tables)
- `apps/docs` imports `@umichkisa-ds/web` as a workspace dependency — components render live in MDX

## Turborepo Pipeline

```json
{
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**", ".next/**"] },
    "dev": { "cache": false, "persistent": true },
    "typecheck": { "dependsOn": ["^build"] }
  }
}
```

`docs` build depends on `web` build — turborepo handles order automatically.

## Out of Scope (This Session)

- Visual design / styling of the docs site
- Landing page content
- Any component or foundation MDX content
- Props tables, variant showcases, do/don't guidelines
- Custom sidebar design polish

## Success Criteria

- [ ] Monorepo structure in place (pnpm workspaces + turborepo)
- [ ] `packages/web` builds successfully (`pnpm --filter @umichkisa-ds/web build`)
- [ ] `apps/docs` Next.js app runs locally (`pnpm --filter @umichkisa-ds/docs dev`)
- [ ] `@next/mdx` pipeline works — at least one MDX page renders
- [ ] `apps/docs` imports and renders a component from `@umichkisa-ds/web`
- [ ] Placeholder pages exist for all foundation routes
- [ ] `vercel.json` configured for monorepo deployment
- [ ] `turbo dev` spins up both packages together
