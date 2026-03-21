# umichkisa-ds — KISA Design System

## Session Protocol

### Startup
1. Read `docs/TODO.md` — find the first unchecked `- [ ]` item
2. If the user specifies a task in their first message, work on that instead
3. If the task links to a spec (`docs/specs/X.md`), read it
4. If no spec exists, dedicate this session to writing the spec — do not execute the task
5. For component sessions, also read `docs/DS_CONSTRAINTS.md`
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

**Parallel worktree sessions (component phase only):** Steps 2 and 3 happen on `main` after the worktree is merged — not during the session. Each session is user-assigned ("work on Button") — do not auto-pick. See `docs/specs/component.md` for worktree setup.

### Context ≥ 70%
Present the breakpoint options above. Do not append session state automatically.

### Appending Session State
Only append session state to the current spec file under `## Last Session` when:
- A breakpoint is reached AND the user chooses option (b) clear context, OR
- The user explicitly requests it

Format:
```
## Last Session [date]
Task: [step or component name]
Done: [1-2 lines]
Last file: [path]
Next action: [exact next step]
Blockers: [none / description]
```

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
