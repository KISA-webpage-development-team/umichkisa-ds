# TODO

## Post-Migration

- [ ] Add consumer app example section to home page (`/`) — showcase the client app using DS components (after client app migration to `@umichkisa-ds/web`)
- [ ] Refactor custom icons to import from `packages/web/src/components/icon/svg/` instead of duplicating SVG path data inline. Affects `GithubIcon`, `LinkedinIcon`, `InstagramIcon`, `InstagramBrandIcon`. Options: SVGR build plugin, tsup `text` loader + `dangerouslySetInnerHTML`, or extract path data to shared `.ts` constants. Pick based on React prop ergonomics vs. build infra cost.

## Client Migration

- [x] Phase -1.0: Add cold-session protocol to CLAUDE.md + rename CODEBASE.md → DS_CODEBASE.md
- [x] Phase -1.1: Update DS_CODEBASE.md with consumer quick-reference section
- [x] Phase -1.2: Write `docs/DS_CLIENT_USAGE.md`
- [x] Phase -1.3: Create `ds-client-review` agent + `ds-client-constrained-execution` skill
- [x] Phase -1.4: Create `ds-fix-during-migration` skill + `ds-phase-end-bump` skill
- [x] Phase -1.5: Create client linking script (`link-ds.sh` + `unlink-ds.sh`)
- [x] Phase -1.6: Scaffold client-migration folder + TODO/MEMORY updates
- [x] Phase -1.7: Lock deferred decisions + draft Phase 0 audit/plan
- [x] Phase 0: Globals (Tailwind v4 + DS install + MSW + test framework + tunnel settings)
- [x] Phase 0.5: Shared layout (Header/Footer/MobileMenu)
- [x] Phase 1: jobs-curator — complete (all subphases merged to dev; DS @ 1.0.8)
- [x] Phase 1.1: MSW handlers for jobs API
- [x] Phase 1.2: JobApplicationInfoContents
- [x] Phase 1.3: JobCategoryDropdown
- [x] Phase 1.4: TagList redesign (inline segmented + DateRangePicker)
- [x] Phase 1.5: JobPostingGrid + JobPostingCard + InfiniteScroll + NotificationText
- [x] Phase 1.6: USAFallbackContent extract + migrate (client#85 merged)
- [x] Phase 1.7: CountryToggle — folded into TagList (client#85 merged)
- [x] Phase 1.8: Hooks/context cleanup (client#84 merged)
- [x] Phase 1.9: Legacy ui swap (jobs scope — dev f666745)
- [x] Phase 1.10: Page shell (error.tsx StatusView swap — dev e9aa87d; composition already correct after 1.7)
- [x] Phase 1.11: Verify + end-bump (no end-bump needed — all DS fixes mid-phase-shipped; DS @ 1.0.8, client pinned)
- [x] Phase 2: pocha-manage — complete (all subphases merged to dev; DS web @ 1.0.17, DS form @ 1.0.1)
- [x] Phase 2.0: Admin gate restoration (interactive) — dev 8715c1e
- [x] Phase 2.1: MSW pocha CRUD handlers (TDD, autonomous) — dev ed6e147
- [x] Phase 2.2: MSW menu CRUD handlers (TDD, autonomous) — dev 7ac2843
- [x] Phase 2.3: MSW admin handler + authContext toggle extension (TDD, interactive) — dev e32a59a
- [x] Phase 2.3b: useAdmin mock-mode short-circuit + middleware bypass + pocha provider wrap (hotfix) — dev 68f72f1
- [x] Phase 2.4: DS FileUpload component (TDD, interactive, mid-phase patch bump) — DS #9, #10 merged; client pinned 20f71ad
- [x] Phase 2.5: PreviousPochaList → SWR (autonomous) — dev 625819e (#106)
- [x] Phase 2.6: PreviousPochaSummary — folded into 2.7 per grill 2026-04-24
- [x] Phase 2.7: PreviousPochaList + Summary redesign + menu-detail Dialog + page reorder (autonomous) — dev 2739a2b (#112)
- [x] Phase 2.8: PochaManagePageHeader redesign (autonomous) — dev 4a94ba6 (#107) + hotfix 7f15153
- [x] Phase 2.9: PochaSummary redesign (autonomous) — dev fce777f (#108) + hotfix 986480c
- [x] Phase 2.10: PochaInfoFields → @umichkisa-ds/form (autonomous) — dev e75366e (#109)
- [x] Phase 2.11: PochaForm orchestration — toast + cross-field validation + usePocha refetch (interactive) — dev 6c137cd
- [x] Phase 2.11b: PochaForm full UX review — manual walkthrough + iterative fixes (interactive) — dev 45abd01 (Mode D direct push, closed #114)
- [x] Phase 2.12: PochaMenuFields redesign (autonomous) — dev 576aefd (#110)
- [x] Phase 2.13: PochaMenuItemList redesign — delete Dialog (autonomous) — dev 94c9c9a (#111)
- [x] Phase 2.14: PochaMenuItemForm modal shell → DS Dialog (autonomous) — dev b659629 (#113)
- [x] Phase 2.15: PochaMenuItemForm fields → @umichkisa-ds/form (autonomous) — dev 9129c03 (Mode D direct push)
- [x] Phase 2.16: PochaMenuItemForm FileUpload integration (interactive) — dev a68a691 (Mode D worktree, smoke deferred)
- [x] Phase 2.17: Page shell + legacy ui swap (interactive, Mode D direct push) — dev 827eb87 + 55db7c1; DS @ 1.0.17 (StatusView `fullScreen` prop, fixed inset-0)
- [x] Phase 2.19: Audit-after redesign pass (interactive, Mode D direct push) — dev f530fd1; reverted-then-reinstated P4 via DS form 1.0.1 useFormContext re-export; menus-reset fix bundled
- [x] Phase 2.18: Verify + end-bump (interactive) — DS build/typecheck green; client build + tests (70 pass / 3 skip) green; no end-bump needed (all DS fixes mid-phase shipped: web 1.0.10–1.0.17, form 1.0.1)
- [x] Phase 3: pocha-dashboard — kickoff done (audit.md written 2026-04-26)
- [x] Phase 3.1: MSW dashboard handlers (combined: orders/closed/status/stock/simulate-spawn) (TDD, Mode D direct-push) — dev 2b4cc02 (closed #116; PR #131 opened in error then closed)
- [x] Phase 3.2: Phase 3 pure utils (stats + batch-promote + history analytics) (TDD, Mode D direct-push) — dev 374d9a7 (closed #117)
- [x] Phase 3.3: WS disable in mock + Simulate button in MockAuthToggle (interactive)
- [x] Phase 3.4: Page shell — DS Tabs + persistent Stats strip (Mode D direct-push) — dev 8f6c3cd (closed #119)
- [x] Phase 3.5: OrderItemCard redesign — typography, single-tap promote, drop @nextui Spinner (autonomous + Mode C revision) — dev (#132 merged, closed #120)
- [ ] Phase 3.6: Food/Drink grids redesign — DS Badge for status, drop STATUS_COLORS (autonomous)
- [ ] Phase 3.7: Orders tab batch-select mode (선택 모드 + smart breakdown + Dialog gate + fan-out) (interactive)
- [ ] Phase 3.8: Stock tab full redesign — DS Table inline edit + per-row ✕ Dialog + filter chips (interactive)
- [ ] Phase 3.9: History tab redesign — DS Table + ToggleGroup + Dialog with B-lite analytics (autonomous)
- [ ] Phase 3.10: Page shell legacy ui sweep + error.tsx (autonomous)
- [ ] Phase 3.11: Audit-after redesign pass (interactive)
- [ ] Phase 3.12: Verify + end-bump (interactive)
- [ ] Phase 4: pocha-userfacing (subphases added at kickoff)
- [ ] Phase 5: kisa-web (subphases added at kickoff)
