# umichkisa-ds — KISA Design System

Standalone component and token library for `umichkisa.com`.

## Reference

The consuming client repo is at `../KISA-website/client/`.
When building or migrating components, read existing implementations at:
`../KISA-website/client/src/components/ui/`

This is the authoritative source of current props, styles, and usage patterns.

## Build

- `npm run build` — compile to dist/
- `npm run dev` — watch mode
- `npm run test` — run tests
- `npm run typecheck` — TypeScript check

## Release

1. `npm run build`
2. `git add dist/`
3. `git tag vX.X.X`
4. `git push && git push --tags`
5. In client: bump tag in package.json, run `npm install`

## Architecture

Tokens: Tailwind v4 CSS-first `@theme {}` with OKLCH colors, three-tier model (primitives -> semantic -> component).
Components: CVA variants, Radix UI for overlays only.
Build: tsup outputs ESM + CJS + types + CSS bundle.
