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
- [x] Phase 2: pocha-manage (kickoff — audit.md written, subphases expanded)
- [x] Phase 2.0: Admin gate restoration (interactive) — dev 8715c1e
- [x] Phase 2.1: MSW pocha CRUD handlers (TDD, autonomous) — dev ed6e147
- [x] Phase 2.2: MSW menu CRUD handlers (TDD, autonomous) — dev 7ac2843
- [x] Phase 2.3: MSW admin handler + authContext toggle extension (TDD, interactive) — dev e32a59a
- [x] Phase 2.3b: useAdmin mock-mode short-circuit + middleware bypass + pocha provider wrap (hotfix) — dev 68f72f1
- [ ] Phase 2.4: DS FileUpload component (TDD, interactive, mid-phase patch bump)
- [ ] Phase 2.5: PreviousPochaList → SWR (autonomous)
- [ ] Phase 2.6: PreviousPochaSummary — fix N+1 + redesign (interactive)
- [ ] Phase 2.7: PreviousPochaList redesign (autonomous)
- [ ] Phase 2.8: PochaManagePageHeader redesign (autonomous)
- [ ] Phase 2.9: PochaSummary redesign (autonomous)
- [ ] Phase 2.10: PochaInfoFields → @umichkisa-ds/form (autonomous)
- [ ] Phase 2.11: PochaForm orchestration — toast + SWR mutate (interactive)
- [ ] Phase 2.12: PochaMenuFields redesign (autonomous)
- [ ] Phase 2.13: PochaMenuItemList redesign — delete Dialog (autonomous)
- [ ] Phase 2.14: PochaMenuItemForm modal shell → DS Dialog (autonomous)
- [ ] Phase 2.15: PochaMenuItemForm fields → @umichkisa-ds/form (autonomous)
- [ ] Phase 2.16: PochaMenuItemForm FileUpload integration (interactive)
- [ ] Phase 2.17: Page shell + legacy ui swap (autonomous)
- [ ] Phase 2.19: Audit-after redesign pass (interactive)
- [ ] Phase 2.18: Verify + end-bump (interactive)
- [ ] Phase 3: pocha-dashboard (subphases added at kickoff)
- [ ] Phase 4: pocha-userfacing (subphases added at kickoff)
- [ ] Phase 5: kisa-web (subphases added at kickoff)
