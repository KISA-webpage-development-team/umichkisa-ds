# Phase 1 — jobs-curator (Plan)

> Lanes from this plan become GitHub issues executed per `docs/plans/client-migration/AUTONOMOUS_PROTOCOL.md`. Issues are filed in the **client repo** (`KISA-webpage-development-team/KISA-website-client`) since all lanes produce client-repo PRs. Implementation only below — labels, bailout triggers, budgets, and non-goals live on the issues.

**Scope:** Migrate `jobs-curator` (`/jobs`) from pre-DS client code into DS-tokenized, DS-componentized, idiomatic implementation. One targeted redesign (TagList → inline segmented + DateRangePicker, zero modals) and one new component (CountryToggle as page-level KR/US switcher). Source of truth: `./audit.md`.

---

## Wave / Dependency Structure

```
Wave 0:  1.1   (MSW handlers — solo blocker for visual verification)
         │
Wave 1:  1.2  ‖  1.3  ‖  1.4  ‖  1.5  ‖  1.6  ‖  1.8
         InfoContents  Dropdown  TagList  Grid+Card  USAFallback  Hooks/Context
         │
Wave 2:  1.7  ‖  1.9
         CountryToggle    Legacy ui swap
         (blocked-by 1.8)  (blocked-by 1.2–1.8)
         │
Wave 3:  1.10  (Page shell — blocked-by all above)
         │
Wave 4:  1.11  (Verify + end-bump)
```

**Dependency edges** (→ means "must merge before"):

- `1.1 → 1.2, 1.3, 1.4, 1.5, 1.6, 1.8` (visual verify needs MSW; even non-visual lanes import nothing new without it)
- `1.8 → 1.7` (CountryToggle reads `JobsCuratorContext.country`, added by 1.8)
- `1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8 → 1.9` (legacy ui swap touches same component files — must follow component lanes to avoid merge conflicts)
- `1.9 → 1.10` (page shell composes the migrated components after legacy ui is gone)
- `1.10 → 1.11` (verify last, end-bump even later)

No DS additions required this phase — no mid-phase bump lane.

---

## Label Disposition (6-Rule Gate)

Applied per `AUTONOMOUS_PROTOCOL.md` §4. Drives `autonomous-ready` vs `needs-interactive` at issue creation.

| Lane | Tag | Disposition | Rationale |
|---|---|---|---|
| 1.1 | [MECHANICAL][NO-TDD] | `autonomous-ready` | New MSW handler files; concrete fixture spec; no app code touched |
| 1.2 | [POLISH][NO-TDD] | `autonomous-ready` | DS Accordion + Tabs swap; bailout trigger if compose fails |
| 1.3 | [POLISH][NO-TDD] | `autonomous-ready` | DS Dropdown swap; bailout trigger if ~20 options breaks UX |
| 1.4 | [REDESIGN][TDD] | `needs-interactive` | Rule 1 fails (REDESIGN); user drives filter UX |
| 1.5 | [POLISH][NO-TDD] | `autonomous-ready` | DS Card + Badge + Grid retokenize; sentinel pattern stays local |
| 1.6 | [POLISH][NO-TDD] | `autonomous-ready` | File move + retokenize; concrete |
| 1.7 | [REDESIGN][NO-TDD] | `needs-interactive` | Rule 1 fails (new component, REDESIGN) |
| 1.8 | [MECHANICAL][TDD] | `autonomous-ready` | Tests pre-specified below; pure logic |
| 1.9 | [MECHANICAL][NO-TDD] | `autonomous-ready` | Scoped import swap (jobs-curator + app/(main)/jobs only) |
| 1.10 | [POLISH][NO-TDD] | `needs-interactive` | Integration moment — live review of all wiring |
| 1.11 | n/a | `needs-interactive` | Touches publish (`ds-phase-end-bump` if any DS fixes); final verify |

---

## Lane 1.1 — MSW handlers for jobs API

**Repo:** `KISA-website-client`

### Files

- Create: `src/mocks/handlers/jobs.ts`
- Create: `src/mocks/fixtures/jobs.ts`
- Modify: `src/mocks/handlers/index.ts` — register the new handler

### Tasks

- [ ] Author ~30 synthetic `Job` fixtures in `fixtures/jobs.ts` (typed against `src/features/jobs-curator/types/jobs.ts`):
  - All have `source: "wanted-api"`
  - Spread across categories (use values from `features/jobs-curator/constant.ts`)
  - Spread across tags: `fulltime`, `intern` × `convertible`/`experiential`/`global`
  - `applicationStartDate` / `applicationDeadline` spanning ~6 months around today
- [ ] In `handlers/jobs.ts`, register two MSW handlers:
  - `GET /jobs/?...` — read query params (`category`, `tags[]`, `startDate`, `endDate`, `offset`, `limit`); apply filters server-side; respond `{ jobs, next, total, hasMore }` with **mock page size = 10** (override the client's `limit=500`)
  - `GET *` cursor passthrough for `next` URLs (`/api/v2/jobs/?offset=N&limit=10`) so `getJobsByNextUrl` works
- [ ] Support three states triggered by query/header conventions:
  - **Happy** — default
  - **Empty** — when query yields no matches → `{ jobs: [], next: null, ... }`
  - **Error** — when `?_mockState=error` is set → `HttpResponse.json(null, { status: 500 })`
- [ ] Register the new handler in `src/mocks/handlers/index.ts`
- [ ] `npm run build` + `npm run typecheck` pass

### Acceptance criteria

- [ ] Handler files compile and `index.ts` exports them
- [ ] Manual smoke (in dev with `NEXT_PUBLIC_MOCK_API=1`): `/jobs` page loads with 10 results on first page; scroll triggers next-page request that returns 10 more; pagination terminates after ~3 pages
- [ ] `npm run typecheck` passes
- [ ] No DS client constraint violations
- [ ] No app code under `src/app/`, `src/features/`, `src/components/` touched

### Non-goals

- Moving `data/kisaJobs.ts` to MSW (intentionally stays client-side)
- Mocking other endpoints (only `/jobs/`)

### Bailout triggers

- Existing `src/mocks/handlers/index.ts` registration pattern unclear → `needs-decision`
- `JobListQueryParams` shape ambiguity vs API → `needs-decision`

---

## Lane 1.2 — JobApplicationInfoContents

**Repo:** `KISA-website-client`

### Files

- Modify: `src/features/jobs-curator/components/JobApplicationInfoContents/index.tsx`
- Modify: `src/features/jobs-curator/components/JobApplicationInfoContents/InfoAccordion.tsx`
- Modify: `src/features/jobs-curator/components/JobApplicationInfoContents/AccordionTabs.tsx`

### Tasks

- [ ] Replace any custom accordion implementation with DS `Accordion` + `AccordionItem` / `AccordionTrigger` / `AccordionContent` (per `DS_CLIENT_USAGE.md`)
- [ ] Replace any custom tabs with DS `Tabs` + `TabsList` + `TabsTrigger` + `TabsContent`
- [ ] Verify `Tabs` composes correctly inside `AccordionContent` (this is the audit's flagged risk)
- [ ] Retokenize colors/spacing/typography → DS tokens (no raw hex, no arbitrary spacing)
- [ ] `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` passes

### Acceptance criteria

- [ ] No raw `<details>`, custom accordion, or custom tabs primitives remain
- [ ] Visual: accordion expands/collapses; tabs inside expanded panel switch correctly
- [ ] `npm run typecheck` passes
- [ ] No DS client constraint violations

### Non-goals

- Changing the info content text itself
- Restructuring panel/tab layout

### Bailout triggers

- DS `Tabs` cannot be nested inside `AccordionContent` (animation, focus, or layout breakage) → `needs-decision`

---

## Lane 1.3 — JobCategoryDropdown

**Repo:** `KISA-website-client`

### Files

- Modify: `src/features/jobs-curator/components/JobCategoryDropdown.tsx`

### Tasks

- [ ] Replace current dropdown impl with DS `Dropdown` (`DropdownMenu` + `DropdownMenuTrigger` + `DropdownMenuContent` + `DropdownMenuItem`)
  - **Decision locked:** use `Dropdown`, not `Select`. `Select` is form-oriented; this is a UI menu.
- [ ] Wire selected category → `JobsCuratorContext.category` (or whatever current setter is)
- [ ] Trigger displays current selection label; menu lists all categories from `features/jobs-curator/constant.ts`
- [ ] Retokenize trigger button styling per DS tokens; respect existing keyboard a11y from DS primitive
- [ ] `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` passes

### Acceptance criteria

- [ ] No legacy dropdown impl remains
- [ ] All ~20 categories selectable; menu scrolls cleanly if it exceeds viewport
- [ ] Selecting a category updates the active filter (manual smoke against MSW)
- [ ] `npm run typecheck` passes

### Bailout triggers

- ~20 options in `Dropdown` produces broken menu height / scroll → fall back to DS `Select`; if `Select` also breaks → `needs-decision`
- Context API for category mutation is unclear → `needs-decision`

---

## Lane 1.4 — TagList redesign

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (REDESIGN — user drives final filter UX)

### Files

- Modify: `src/features/jobs-curator/components/TagList/index.tsx`
- Delete: `src/features/jobs-curator/components/TagList/TagButton.tsx`
- Delete: `src/features/jobs-curator/components/TagList/DateInputField.tsx`
- Delete: `src/features/jobs-curator/components/TagList/CountryDropdown.tsx`
- Delete: `src/features/jobs-curator/components/TagList/TagDetailModal.tsx`
- Delete: `src/features/jobs-curator/components/TagList/DateRangeDetailModal.tsx`
- Delete: `src/features/jobs-curator/components/TagList/EmploymentTypeDetailModal.tsx`
- Test: `src/features/jobs-curator/components/TagList/__tests__/TagList.test.tsx` (TDD)

### Tasks (interactive — driven in live Mode D session)

- [ ] Sketch new TagList layout: inline `ToggleGroup` (employment) + conditional inline `ToggleGroup` (internshipTypes when `intern` active) + DS `DateRangePicker`
- [ ] **Country dropdown is removed entirely** from TagList — country lives on `CountryToggle` (lane 1.7) at page level
- [ ] TDD: write tests for filter state assembly first:
  - Employment selection writes correct tags
  - Selecting `intern` reveals internshipTypes group; selecting `fulltime` hides it + clears internshipTypes tags
  - DateRangePicker selection writes `startDate`/`endDate` to context in expected shape
- [ ] Implement using DS primitives only; no modals; retokenize
- [ ] Delete all 6 listed files
- [ ] Verify no dangling imports (typecheck enforces)
- [ ] `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` passes

### Acceptance criteria

- [ ] Zero modal files remain in `TagList/`
- [ ] All TDD tests green
- [ ] Visual diff acceptable on Vercel `dev` preview (live review)
- [ ] `npm run typecheck` passes

### Non-goals

- Adding new filter dimensions (location, salary)
- Touching country selection (delegated to lane 1.7)

---

## Lane 1.5 — JobPostingGrid + JobPostingCard + InfiniteScroll + NotificationText

**Repo:** `KISA-website-client`

### Files

- Modify: `src/features/jobs-curator/components/JobPostingGrid/index.tsx`
- Modify: `src/features/jobs-curator/components/JobPostingGrid/JobPostingCard.tsx`
- Modify: `src/features/jobs-curator/components/InfiniteScroll.tsx`
- Modify: `src/features/jobs-curator/components/NotificationText.tsx`
- Delete: `src/features/jobs-curator/components/JobPostingGrid/USAFallbackContent.tsx` (this lane removes the import; the file itself is moved/replaced in lane 1.6)

### Tasks

- [ ] `JobPostingGrid/index.tsx`: drop the country branch entirely — KR-only render path. Remove import of `USAFallbackContent`.
- [ ] Grid layout → DS `Grid` if it covers the breakpoints; else tokenized CSS grid using `--space-*` tokens.
- [ ] `JobPostingCard.tsx`: rebuild on DS `Card` + `CardHeader` + `CardContent` + `CardFooter` (as appropriate); replace tag chips with DS `Badge` (variants per tag type).
- [ ] `InfiniteScroll.tsx`: keep the `IntersectionObserver` sentinel pattern local; retokenize any styling.
- [ ] `NotificationText.tsx`: retokenize; if it's a status surface, prefer DS `StatusView` only if it fits cleanly — else just retokenize the existing element.
- [ ] `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` passes

### Acceptance criteria

- [ ] Grid renders responsive layout matching pre-DS breakpoints
- [ ] Cards visually consistent with DS `Card` defaults; no padding overrides
- [ ] No reference to `USAFallbackContent` in this directory
- [ ] Manual smoke: grid populated against MSW handler, infinite scroll triggers next page

### Non-goals

- Implementing US fallback (lane 1.6 owns it)
- Touching `TagList` or `JobCategoryDropdown`

### Bailout triggers

- DS `Grid` doesn't support the existing breakpoint layout → fall back to tokenized CSS grid (acceptable, no bailout)
- `Card` defaults visually break the existing card density → `needs-decision`

---

## Lane 1.6 — USAFallbackContent extract + migrate

**Repo:** `KISA-website-client`

### Files

- Create: `src/features/jobs-curator/components/USAFallbackContent.tsx`
- Delete: `src/features/jobs-curator/components/JobPostingGrid/USAFallbackContent.tsx` (if not already deleted by lane 1.5)

### Tasks

- [ ] `git mv` (or copy + delete preserving content) the existing `JobPostingGrid/USAFallbackContent.tsx` to `components/USAFallbackContent.tsx`
- [ ] Retokenize all colors/spacing/typography → DS tokens
- [ ] Replace any legacy button/link primitive with DS `LinkButton` (preferred for the external LinkedIn link) or `Button` + `<a>` depending on existing pattern
- [ ] No consumer wiring in this lane (page shell wires it in lane 1.10)
- [ ] `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` passes

### Acceptance criteria

- [ ] File lives at new path; old path deleted
- [ ] Component renders standalone (verified by importing in a quick test page if needed)
- [ ] Uses DS `LinkButton` / `Button` — no legacy `CustomButton`
- [ ] No DS client constraint violations

### Non-goals

- Wiring into `page.tsx` (lane 1.10)
- Changing the LinkedIn URL or copy

---

## Lane 1.7 — CountryToggle (new component)

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (REDESIGN, blocked-by 1.8)

### Files

- Create: `src/features/jobs-curator/components/CountryToggle.tsx`

### Tasks

- [ ] Build `CountryToggle` as a segmented KR/US switcher using DS `ToggleGroup` (single selection)
- [ ] Reads `country` from `JobsCuratorContext`; writes via `setCountry` (both added in lane 1.8)
- [ ] Default to KR if context value is unset
- [ ] Label options in Korean: "한국" / "미국" (match audit copy)
- [ ] Tokenized styling only — no inline colors / arbitrary spacing
- [ ] `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` passes

### Acceptance criteria

- [ ] Toggling switches `JobsCuratorContext.country`
- [ ] Visual: matches DS `ToggleGroup` defaults; no overrides
- [ ] Component is exported from `features/jobs-curator/components/` (not wired into page yet)

### Depends on

- **Lane 1.8 must merge first** — `JobsCuratorContext.country` + `setCountry` must exist. Strict `blocked-by:<1.8 issue #>` edge.

### Non-goals

- Wiring into `page.tsx` (lane 1.10)
- Hiding the grid in US mode (lane 1.10's job)

---

## Lane 1.8 — Hooks/context cleanup

**Repo:** `KISA-website-client`

### Files

- Modify: `src/features/jobs-curator/contexts/JobsCuratorContext.tsx`
- Modify: `src/features/jobs-curator/hooks/useInfiniteJobs.ts`
- Modify: `src/features/jobs-curator/hooks/useJobsQueryParams.ts`
- Modify: `src/features/jobs-curator/hooks/useKisaJobs.ts`
- Modify: `src/features/jobs-curator/hooks/useFormattedJobs.ts`
- Modify: `src/features/jobs-curator/utils/date.ts`
- Modify: `src/features/jobs-curator/utils/getDefaultDateRange.ts`
- Test: `src/features/jobs-curator/__tests__/utils-date.test.ts`
- Test: `src/features/jobs-curator/__tests__/utils-getDefaultDateRange.test.ts`
- Test: `src/features/jobs-curator/__tests__/useJobsQueryParams.test.ts`
- Test: `src/features/jobs-curator/__tests__/useKisaJobs.test.ts`

### Tasks (TDD)

- [ ] **Tests first.** Write failing tests for each util/hook below, run, confirm fail, then implement to green.

#### Pre-specified test cases (per AUTONOMOUS_PROTOCOL §4 rule 4)

- [ ] `utils/date.ts`:
  - Round-trip: `toApiDateString(parseFromApi(s)) === s` for `"2026-04-20"`, `"2026-12-31"`, `"2027-01-01"`
  - Year-boundary: parsing `"2026-12-31"` then formatting back yields the same string (no off-by-one TZ drift)
- [ ] `utils/getDefaultDateRange.ts`:
  - Returns `[today, today + N days]` per current contract — assert exact `N` matches the existing implementation (if N is configured by constant, snapshot it; if hardcoded, hardcode in test)
- [ ] `useJobsQueryParams` (or wherever the cascade lives):
  - Selecting `employment="intern"` causes the assembled `tags` array to include the active internshipTypes
  - Selecting `employment="fulltime"` empties internshipTypes from the assembled `tags` array
  - Switching from `intern` → `fulltime` clears any previously-set internshipTypes
- [ ] `useKisaJobs`:
  - Filters `data/kisaJobs.ts` by category match (case-sensitive against constant)
  - Filters by date range overlap (job's `applicationStartDate ≤ endDate` AND `applicationDeadline ≥ startDate`)
  - Returns empty array when no KISA jobs match

#### Context change

- [ ] Add `country: SupportedCountry` (default `"KR"`) and `setCountry` to `JobsCuratorContext`
- [ ] Type from `features/jobs-curator/types/jobs.ts` (`SupportedCountry`)
- [ ] No consumers wired here — lanes 1.7 (read+write) and 1.10 (page-level conditional) consume

#### Retokenize

- [ ] Any string colors / arbitrary spacing in hook-rendered fragments (if any) → DS tokens

### Acceptance criteria

- [ ] All listed tests pass
- [ ] `JobsCuratorContext` exports updated TypeScript surface (`country`, `setCountry`)
- [ ] `npm run typecheck` passes
- [ ] No regression in existing filter behavior (manual smoke against MSW)

### Bailout triggers

- An existing util/hook signature differs materially from what tests expect → `needs-decision` (test spec needs updating, not the impl)
- `SupportedCountry` type missing in `types/jobs.ts` → `needs-decision`

---

## Lane 1.9 — Legacy ui swap (jobs scope only)

**Repo:** `KISA-website-client`

### Files

- Modify: any file under `src/features/jobs-curator/**` or `src/app/(main)/jobs/**` that imports legacy ui — exact list to be enumerated by the agent via grep at execution time
- Read-only reference: `src/components/ui/button/CustomButton.tsx`, `src/components/ui/feedback/LoadingSpinner.tsx`, `src/components/ui/feedback/UnexpectedError.tsx` (do NOT modify these — other phases own them)

### Tasks

- [ ] `grep -r "CustomButton\|LoadingSpinner\|UnexpectedError" src/features/jobs-curator src/app/\(main\)/jobs` to enumerate import sites
- [ ] For each match, swap import + usage:
  - `CustomButton` → DS `Button` (variants/sizes mapped per `DS_CLIENT_USAGE.md`)
  - Legacy `LoadingSpinner` → DS `LoadingSpinner`
  - `UnexpectedError` → DS `StatusView` (with appropriate `variant` / `title` / `description` preset)
- [ ] **Do NOT touch** `ErrorBoundary` — stays client-local (audit explicitly preserves this)
- [ ] **Do NOT touch** legacy ui sites in `pocha-*`, `kisa-web`, or other apps — out of scope
- [ ] `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` passes

### Acceptance criteria

- [ ] Zero imports of `CustomButton`, legacy `LoadingSpinner`, or `UnexpectedError` remain inside jobs-curator + `app/(main)/jobs`
- [ ] No edits outside the jobs scope
- [ ] `npm run typecheck` passes

### Non-goals

- Deleting the legacy ui source files (other phases consume them)
- Touching `ErrorBoundary`

### Bailout triggers

- A legacy `UnexpectedError` usage doesn't fit any DS `StatusView` preset cleanly → `needs-decision`
- Import-site grep finds matches outside the scope (suggesting refactor opportunity) → leave alone, do not bail

---

## Lane 1.10 — Page shell

**Repo:** `KISA-website-client`
**Mode:** `needs-interactive` (integration moment)

### Files

- Modify: `src/app/(main)/jobs/page.tsx`
- Modify: `src/app/(main)/jobs/layout.tsx` (only if needed — likely untouched)
- Modify: `src/app/(main)/jobs/error.tsx` (only if it consumes legacy ui — coordinate with lane 1.9 if so)

### Tasks (interactive — live wiring + smoke)

- [ ] Compose `page.tsx`:
  - `<JobApplicationInfoContents />` (static, always shown)
  - `<CountryToggle />` (page-level switcher)
  - Conditional on `JobsCuratorContext.country`:
    - `KR` → `<JobCategoryDropdown />` + `<TagList />` + `<JobPostingGrid />`
    - `US` → `<USAFallbackContent />` (and only this — no filters, no grid)
- [ ] Verify all imports point to migrated components from prior lanes
- [ ] Smoke (live, with MSW + `dev` preview):
  - KR mode: filters work, grid populates, infinite scroll, error state via `_mockState=error`, empty state
  - US mode: shows fallback only; toggling back to KR restores filters/grid
- [ ] `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` passes

### Acceptance criteria

- [ ] All wave 0–2 components rendered as specified
- [ ] Both country modes visually verified
- [ ] No legacy imports remain in `app/(main)/jobs/**`
- [ ] Vercel `dev` preview accepted

### Depends on

- All of 1.1–1.9 merged

---

## Lane 1.11 — Verify + end-bump

**Repo:** `umichkisa-ds` (publish lives here)
**Mode:** `needs-interactive`

### Tasks

- [ ] Full Vercel `dev`-branch preview walkthrough: KR + US modes, all filter combos, pagination, error path, empty state
- [ ] `pnpm build` + `pnpm typecheck` in DS repo
- [ ] `npm run build` + `npm run typecheck` in client repo
- [ ] Check `docs/plans/client-migration/ds-fixes-log.md` for Phase 1 entries
  - If any entries: invoke `ds-phase-end-bump` skill → bump DS `@umichkisa-ds/web` patch/minor (per memory: icon-only changes = patch), tag, publish, update client pin
  - If no entries (expected): skip bump
- [ ] Tick `Phase 1` in `docs/TODO.md`
- [ ] Append phase summary line to `notes.md`

### Acceptance criteria

- [ ] All builds + typechecks green across both repos
- [ ] `dev` preview verified by user
- [ ] TODO.md tick committed

---

## Notes

- Per `feedback_migration_is_redesign`: the only redesign in this phase is the TagList filter UX (lane 1.4) and the new CountryToggle (lane 1.7). All other lanes preserve behavior + retokenize.
- Per `feedback_no_worktree_interactive`: lanes 1.4, 1.7, 1.10, 1.11 (Mode D interactive) branch in-place in main client clone, no worktree.
- Per `feedback_parallel_wave_pickup`: at cold-session pickup of Wave 1, present full lane menu and wait for user pick.
