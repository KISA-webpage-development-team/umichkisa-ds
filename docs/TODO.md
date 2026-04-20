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
- [ ] Phase 1: jobs-curator (subphases added at kickoff)
- [ ] Phase 2: pocha-manage (subphases added at kickoff)
- [ ] Phase 3: pocha-dashboard (subphases added at kickoff)
- [ ] Phase 4: pocha-userfacing (subphases added at kickoff)
- [ ] Phase 5: kisa-web (subphases added at kickoff)
