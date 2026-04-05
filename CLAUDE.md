# umichkisa-ds — KISA Design System

## CRITICAL RULE

**NEVER execute a plan or spec unless the user explicitly says to.**

Reading a spec is allowed. Reporting what the next task is is allowed. But writing code, editing files, running commands, or invoking execution skills (e.g., `superpowers:executing-plans`, `superpowers:subagent-driven-development`) requires an explicit "go ahead" or "execute" instruction from the user. "Pick up the next task" or "what's the next task?" is NOT permission to execute — it is a question to answer.

---

## Session Protocol

### Startup
1. Read `docs/TODO.md` — find the first unchecked `- [ ]` item
2. If the user specifies a task in their first message, work on that instead
3. If the task links to a spec (`docs/specs/X.md`), read it
4. If no spec exists, dedicate this session to writing the spec — do not execute the task
5. For any task that modifies `.tsx` files, also read `docs/DS_CONSTRAINTS.md`
6. Read `docs/CODEBASE.md` only if the spec instructs it

### Natural Breakpoints
At every natural breakpoint (spec complete, phase complete, or context ≥ 70%), stop and present:
> Breakpoint reached. How would you like to proceed?
> (a) Continue in this session
> (b) Clear context — start a fresh session with clean slate
> (c) Save and stop — come back later

Wait for the user's choice. Do not proceed automatically.

### Session End
Before marking any task done in `docs/TODO.md`:
1. Run `pnpm build` and `pnpm typecheck` — both must pass
2. Update `docs/CODEBASE.md` status tables to reflect completed work
3. Check off the item in `docs/TODO.md`

---

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

Or target a package:
```bash
pnpm --filter @umichkisa-ds/web build
pnpm --filter @umichkisa-ds/form build
```

## Packages

- **`packages/web`** (`@umichkisa-ds/web`) — Component and token library. Peer deps: `react`, `react-dom`.
- **`packages/form`** (`@umichkisa-ds/form`) — Form DX layer wrapping react-hook-form with DS components. Peer deps: `react`, `react-dom`, `react-hook-form`, `@umichkisa-ds/web`.

## Release

### `packages/web`
1. `pnpm --filter @umichkisa-ds/web build`
2. `git add packages/web/dist/`
3. `git tag vX.X.X`
4. `git push && git push --tags`
5. In client: bump tag in package.json, run `npm install`

### `packages/form`
1. `pnpm --filter @umichkisa-ds/form build`
2. `git add packages/form/dist/`
3. `git tag form-vX.X.X`
4. `git push && git push --tags`
5. In client: bump tag in package.json, run `npm install`

## Architecture

Tokens: Tailwind v4 CSS-first `@theme {}` with OKLCH colors, three-tier model (primitives → semantic → component).
Components: CVA variants, Radix UI for overlays only.
Form: `@umichkisa-ds/form` wraps react-hook-form — `Form` compound component (`Form.Input`, `Form.Select`, etc.) + hooks (`useForm`, `useFormField`, `useFormStatus`).
Build: tsup outputs ESM + CJS + types (both packages). `packages/web` also bundles CSS.
Docs: Next.js 15 App Router, inline TSX pages. Three top-level sections: Foundation, Components, Forms.
