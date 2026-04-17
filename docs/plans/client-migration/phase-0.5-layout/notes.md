# Phase 0.5 — Shared Layout (Notes)

Strict append-only. Breadcrumbs for decisions, blockers, and DS fixes discovered during execution.

## Autonomous routine — 2026-04-17

- Lane 0.5.1 (#47, client PR #57): bailed out with `needs-decision` — template.tsx currently renders Header+session, conflicts with plan's `(main)/layout.tsx` hosting Header/Footer. WIP commit contains only the unambiguous directory moves (74 renames).
- Lane 0.5.2 (#1, DS): Instagram icons added — `instagram` (mono, currentColor) + `instagram-brand` (official gradient, React.useId for gradient IDs). Registry updated, `ds-fixes-log.md` appended, `pnpm --filter @umichkisa-ds/web typecheck && build` green.
- Lane 0.5.2.bonus (#3, DS): exported `iconNames` from DS web package; docs `/components/icon` now iterates the registry via a client subcomponent (`IconRegistryGrid`) — server-side iteration fails because the DS bundle ships with a `"use client"` banner, which turns every named export into a Next.js client reference when imported into a server component. Surfaced during PR #2 review.
- Protocol amendment 2026-04-17: added post-merge label cleanup rule (§2, §8) — `ready-for-review` / `needs-revision` / `needs-decision` / `routine-errored` must be stripped at merge time. Surfaced because PR #2 was merged with a stale `ready-for-review` label still attached.
