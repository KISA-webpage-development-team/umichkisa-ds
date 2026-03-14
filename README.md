# umichkisa-ds

KISA Design System — monorepo for tokens, components, and documentation.

## Structure

```
umichkisa-ds/
├── packages/
│   └── web/        # @umichkisa-ds/web — component and token library
└── apps/
    └── docs/       # @umichkisa-ds/docs — documentation site (designsystem.umichkisa.com)
```

## Prerequisites

- [pnpm](https://pnpm.io) v10+
- [Node.js](https://nodejs.org) v18+

## Setup

```bash
pnpm install
```

## Scripts

Run from the monorepo root:

| Script | Description |
|--------|-------------|
| `pnpm build` | Build all packages (web → docs) |
| `pnpm dev` | Watch mode for all packages |
| `pnpm test` | Run all tests |
| `pnpm typecheck` | TypeScript check across all packages |

Run for a specific package:

```bash
pnpm --filter @umichkisa-ds/web build
pnpm --filter @umichkisa-ds/docs dev
```

## Release (`packages/web`)

1. `pnpm --filter @umichkisa-ds/web build`
2. `git add packages/web/dist/`
3. `git tag vX.X.X`
4. `git push && git push --tags`
5. In client: bump tag in `package.json`, run `npm install`

## Docs Site (`apps/docs`)

Deployed to `designsystem.umichkisa.com` via Vercel.
Content lives in `apps/docs/content/` as MDX files.
