# umichkisa-ds

KISA Design System — monorepo for tokens, components, and documentation.

## Structure

```
umichkisa-ds/
├── packages/
│   ├── web/        # @umichkisa-ds/web — component and token library
│   └── form/       # @umichkisa-ds/form — form DX layer (hooks + compound components)
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
pnpm --filter @umichkisa-ds/form build
pnpm --filter @umichkisa-ds/docs dev
```

## Packages

### `@umichkisa-ds/web`

Component and token library — buttons, inputs, overlays, layout primitives, feedback components, and the full design token system.

```bash
npm install @umichkisa-ds/web
```

### `@umichkisa-ds/form`

Form DX layer connecting [react-hook-form](https://react-hook-form.com) to `@umichkisa-ds/web` components. Provides a `Form` compound component (`Form.Input`, `Form.Select`, `Form.Button`, etc.) and hooks (`useForm`, `useFormField`, `useFormStatus`).

```bash
npm install @umichkisa-ds/form react-hook-form
```

Peer dependencies: `react`, `react-dom`, `react-hook-form`, `@umichkisa-ds/web`

## Release (`packages/web`)

1. `pnpm --filter @umichkisa-ds/web build`
2. `git add packages/web/dist/`
3. `git tag vX.X.X`
4. `git push && git push --tags`
5. In client: bump tag in `package.json`, run `npm install`

## Docs Site (`apps/docs`)

Deployed to `designsystem.umichkisa.com` via Vercel.
Covers Foundation (colors, typography, layout, iconography), Components, and Forms documentation with live interactive examples.
