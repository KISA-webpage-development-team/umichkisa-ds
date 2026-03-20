# umichkisa-ds — KISA Design System

## IMPORTANT — Read First

**At the start of every session, you MUST read `docs/PLAN.md` before doing anything else.**
It contains the current task list and component roadmap. Most work in this repo follows that plan.
Also read `docs/NOTES.md` for a codebase map to avoid redundant exploration.

Monorepo: `packages/web` (component library) + `apps/docs` (documentation site).

## Reference

The consuming client repo is at `../KISA-website/client/`.
When building or migrating components, read existing implementations at:
`../KISA-website/client/src/components/ui/`

## Build

Run from monorepo root (pnpm required):

- `pnpm build` — build all packages
- `pnpm dev` — watch mode
- `pnpm test` — run tests
- `pnpm typecheck` — TypeScript check

Or target a package: `pnpm --filter @umichkisa-ds/web build`

## Release (`packages/web`)

1. `pnpm --filter @umichkisa-ds/web build`
2. `git add packages/web/dist/`
3. `git tag vX.X.X`
4. `git push && git push --tags`
5. In client: bump tag in package.json, run `npm install`

## Architecture

Tokens: Tailwind v4 CSS-first `@theme {}` with OKLCH colors, three-tier model (primitives → semantic → component).
Components: CVA variants, Radix UI for overlays only.
Build: tsup outputs ESM + CJS + types + CSS bundle.
Docs: Next.js 15 App Router, `@next/mdx`, Shiki. Content in `apps/docs/content/`.
