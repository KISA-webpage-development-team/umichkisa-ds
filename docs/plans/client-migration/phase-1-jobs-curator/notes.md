# Phase 1 — jobs-curator — Notes

## DS fixes during this phase

- DS FIX: Bundle `@radix-ui/*` transitive deps into `dist/index.js` via tsup `noExternal` — fixes webpack `Module not found` when client consumes DS through pnpm-symlinked install (commit 92e3a48). Surfaced by Lane 1.1; blocked `next build` on dev before Lane 1.1 touched any code.
