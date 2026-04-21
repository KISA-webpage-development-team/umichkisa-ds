# Phase 1 — jobs-curator — Notes

## DS fixes during this phase

- DS FIX: Bundle `@radix-ui/*` transitive deps into `dist/index.js` via tsup `noExternal` — fixes webpack `Module not found` when client consumes DS through pnpm-symlinked install (commit 92e3a48). Surfaced by Lane 1.1; blocked `next build` on dev before Lane 1.1 touched any code.
- DS FIX: ToggleGroup gained `'multiple'` variant (discriminated union on `type`, `role="group"` + `aria-pressed`, arrow-key focus-only, roving tabindex) for Lane 1.4 internshipTypes multi-select. Additive patch — `'single'` mode unchanged. (commit 102d7a5)
- DS FIX: ToggleGroup now spreads `HTMLAttributes<HTMLDivElement>` (minus `role`/`onChange`) onto its outer `<div>` so consumers can pass `aria-label`/`aria-labelledby`/`id`. Needed for Lane 1.4 TagList to label employment + internship groups via DS `Label` + `htmlFor`/`aria-labelledby` pattern. Additive — no API break.
- DS FIX: AccordionTrigger default typography bumped `type-body !font-semibold` (16px) → `type-h3` (18px mobile / 20px desktop Pretendard 600). Trigger was reading smaller than Sejong Hospital Bold content sub-headings due to font-metric mismatch — inverted hierarchy. Also dropped the `!important` override (type-h3 has weight 600 baked in). Surfaced during client#80 Lane 1.2 review. (commit a3e547e)
- DS FIX: DropdownContent default className gained `overscroll-contain`. Prevents scroll chaining from the dropdown to the page when consumers opt into `modal={false}` (no Radix scroll-lock). Surfaced during client#81 Lane 1.3 JobCategoryDropdown review — JobCategoryDropdown uses `modal={false}` to avoid scroll-lock layout wiggle, which then caused dropdown-internal scroll to bubble to the page.

## Phase summary (2026-04-21)

Phase 1 (jobs-curator) complete. All 11 subphases merged to client `dev`. DS at `@umichkisa-ds/web@1.0.8`, client pinned. No end-bump — every DS fix was mid-phase-patched and shipped before its consuming lane landed (1.0.3 → 1.0.4 → 1.0.6 → 1.0.8). Final lanes:
- **1.9** Legacy ui swap (jobs scope): CustomButton/LoadingSpinner/UnexpectedError → DS Button/LoadingSpinner/StatusView in `app/(main)/jobs/{page,error}.tsx`. Also promoted three preexisting `sm:` breakpoints → `md:` flagged during ds-client-review. (dev f666745)
- **1.10** Page shell: composition already correct after Lane 1.7 folded CountryToggle into TagList; only residual work was swapping `NotFound`/`NotLogin` legacy-feedback imports in `error.tsx` to `StatusView` variants. Page-level `<CountryToggle />` line in the original plan is now obsolete. (dev e9aa87d)
- **1.11** Verify + end-bump: DS + client builds + typechecks green; error state smoke-tested locally via temporary forced throw (reverted). No end-bump triggered.
