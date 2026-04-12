# umichkisa-ds — KISA Design System

## CRITICAL RULE

**NEVER execute a plan or spec unless the user explicitly says to.**

Reading a spec is allowed. Reporting what the next task is is allowed. But writing code, editing files, running commands, or invoking execution skills (e.g., `superpowers:executing-plans`, `superpowers:subagent-driven-development`) requires an explicit "go ahead" or "execute" instruction from the user. "Pick up the next task" or "what's the next task?" is NOT permission to execute — it is a question to answer.

---

## Session Protocol

### Startup
1. Read `docs/TODO.md` — find the first unchecked `- [ ]` item
2. If the user specifies a task in their first message, work on that instead
3. If the next work is a **batch** (multiple tasks grouped together), present **all tasks in the batch** and let the user choose which to work on. Do NOT auto-select the first one.
4. If the task links to a spec (`docs/specs/X.md`), read it
5. If no spec exists, dedicate this session to writing the spec — do not execute the task
6. For any task that modifies `.tsx` files, also read `docs/DS_CONSTRAINTS.md`
7. Always Read `docs/DS_CODEBASE.md` to understand what DS Components are available

### Client Migration Startup (when TODO.md points at a Client Migration entry)

Override the generic startup with this protocol:

1. Read `docs/TODO.md` → find first unchecked entry under "## Client Migration"
2. Read `docs/plans/client-migration/HARNESS_DESIGN.md` → full harness context
3. Derive path from the TODO entry → open `plan.md` → find first unchecked task
4. Read sibling `notes.md` → skim blockers, open DS bugs, decisions
5. If confused about scope → read sibling `audit.md` and/or the phase `overview.md`
6. Read `docs/DS_CODEBASE.md` → know what DS components are available for the implementer
7. Proceed — but do NOT execute without explicit user permission (see Critical Rule)

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
2. Update `docs/DS_CODEBASE.md` status tables to reflect completed work
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

Both packages publish to npm public registry via GitHub Actions on tag push.

### `packages/web`
1. Bump `version` in `packages/web/package.json`
2. `git add packages/web/package.json`
3. `git commit -m "chore(web): bump to vX.X.X"`
4. `git tag web-vX.X.X`
5. `git push && git push --tags`
6. CI builds, typechecks, and publishes to npm

### `packages/form`
1. Bump `version` in `packages/form/package.json`
2. `git add packages/form/package.json`
3. `git commit -m "chore(form): bump to vX.X.X"`
4. `git tag form-vX.X.X`
5. `git push && git push --tags`
6. CI builds, typechecks, and publishes to npm

### In consuming repos
```bash
npm install @umichkisa-ds/web@latest
npm install @umichkisa-ds/form@latest
```

## Architecture

Tokens: Tailwind v4 CSS-first `@theme {}` with OKLCH colors, three-tier model (primitives → semantic → component).
Components: CVA variants, Radix UI for overlays only.
Form: `@umichkisa-ds/form` wraps react-hook-form — `Form` compound component (`Form.Input`, `Form.Select`, etc.) + hooks (`useForm`, `useFormField`, `useFormStatus`).
Build: tsup outputs ESM + CJS + types (both packages). `packages/web` also bundles CSS.
Docs: Next.js 15 App Router, inline TSX pages. Three top-level sections: Foundation, Components, Forms.
