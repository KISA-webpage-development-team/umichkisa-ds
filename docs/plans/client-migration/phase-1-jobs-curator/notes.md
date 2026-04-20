# Phase 1 — jobs-curator — Notes

## DS fixes during this phase

- DS FIX: Bundle `@radix-ui/*` transitive deps into `dist/index.js` via tsup `noExternal` — fixes webpack `Module not found` when client consumes DS through pnpm-symlinked install (commit 92e3a48). Surfaced by Lane 1.1; blocked `next build` on dev before Lane 1.1 touched any code.
- DS FIX: ToggleGroup gained `'multiple'` variant (discriminated union on `type`, `role="group"` + `aria-pressed`, arrow-key focus-only, roving tabindex) for Lane 1.4 internshipTypes multi-select. Additive patch — `'single'` mode unchanged. (commit 102d7a5)
