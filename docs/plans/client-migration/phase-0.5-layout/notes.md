# Phase 0.5 — Shared Layout (Notes)

Strict append-only. Breadcrumbs for decisions, blockers, and DS fixes discovered during execution.

## Autonomous routine — 2026-04-17

- Lane 0.5.1 (#47, client PR #57): bailed out with `needs-decision` — template.tsx currently renders Header+session, conflicts with plan's `(main)/layout.tsx` hosting Header/Footer. WIP commit contains only the unambiguous directory moves (74 renames).
- Lane 0.5.2 (#1, DS): Instagram icons added — `instagram` (mono, currentColor) + `instagram-brand` (official gradient, React.useId for gradient IDs). Registry updated, `ds-fixes-log.md` appended, `pnpm --filter @umichkisa-ds/web typecheck && build` green.
