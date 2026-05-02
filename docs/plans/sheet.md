# Sheet — implementation plan

This component is implemented as **Lane 4.0** of the Phase 4 client migration. The full plan (locked decisions, files, tasks, acceptance criteria, bailout triggers) lives in:

→ [`docs/plans/client-migration/phase-4-pocha-userfacing/plan.md`](./client-migration/phase-4-pocha-userfacing/plan.md) §"Lane 4.0 — DS Sheet (bottom-sheet variant)"

## Phase split (per `new-component-workflow` skill)

- **Phase 1** — Component implementation: `packages/web/src/components/overlay/Sheet.tsx` + `index.ts` export + `vaul` dep + pastiche updates (FACT regen, KNOWLEDGE, WISDOM)
- **Phase 2** — Docs page: `apps/docs/app/components/sheet/page.tsx` + `Sidebar.tsx` `COMPONENT_ITEMS` entry

Both phases execute via the `pastiche` skill against the locked Lane 4.0 decisions as overlay.
