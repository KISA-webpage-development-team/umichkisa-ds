# Phase 1 — jobs-curator — Notes

## DS fixes during this phase

- DS FIX: Bundle `@radix-ui/*` transitive deps into `dist/index.js` via tsup `noExternal` — fixes webpack `Module not found` when client consumes DS through pnpm-symlinked install (commit 92e3a48). Surfaced by Lane 1.1; blocked `next build` on dev before Lane 1.1 touched any code.
- DS FIX: ToggleGroup gained `'multiple'` variant (discriminated union on `type`, `role="group"` + `aria-pressed`, arrow-key focus-only, roving tabindex) for Lane 1.4 internshipTypes multi-select. Additive patch — `'single'` mode unchanged. (commit 102d7a5)
- DS FIX: ToggleGroup now spreads `HTMLAttributes<HTMLDivElement>` (minus `role`/`onChange`) onto its outer `<div>` so consumers can pass `aria-label`/`aria-labelledby`/`id`. Needed for Lane 1.4 TagList to label employment + internship groups via DS `Label` + `htmlFor`/`aria-labelledby` pattern. Additive — no API break.
- DS FIX: AccordionTrigger default typography bumped `type-body !font-semibold` (16px) → `type-h3` (18px mobile / 20px desktop Pretendard 600). Trigger was reading smaller than Sejong Hospital Bold content sub-headings due to font-metric mismatch — inverted hierarchy. Also dropped the `!important` override (type-h3 has weight 600 baked in). Surfaced during client#80 Lane 1.2 review. (commit a3e547e)
