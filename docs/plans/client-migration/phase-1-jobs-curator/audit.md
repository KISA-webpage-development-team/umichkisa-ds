# Phase 1 — jobs-curator (Audit)

**Type:** Vertical feature phase (per HARNESS), subphased into lanes for parallel execution.
**Charter:** Migrate the `jobs-curator` app (`/jobs`) from client's pre-DS code into DS-tokenized, DS-componentized, idiomatic implementation. Replace the TagList's 4-modal filter subsystem with inline DS primitives. Hoist country selection from "filter" to "view switcher" with dedicated KR/US modes.
**Scope principle:** Medium polish + one targeted redesign (TagList filter UX → inline `ToggleGroup` + `DateRangePicker`, zero modals). No structural furniture-rearranging beyond that. Brand identity and page composition signature (static info block + dynamic filter/grid) preserved.

---

## Scope Snapshot

### Source files (client)

```
src/app/(main)/jobs/
├── layout.tsx                              [REACHABLE]
├── page.tsx                                [REACHABLE]
└── error.tsx                               [REACHABLE]

src/features/jobs-curator/
├── JOBS-CURATOR.md                         (docs, not touched)
├── constant.ts
├── types/
│   ├── jobs.ts                             Job, JobListQueryParams, JobCategory, EmploymentType, InternshipType, SupportedCountry
│   └── infoContents.ts
├── contexts/
│   └── JobsCuratorContext.tsx
├── hooks/
│   ├── useInfiniteJobs.ts                  pagination + error state
│   ├── useJobsQueryParams.ts               context → query params
│   ├── useKisaJobs.ts                      client-side kisa-jobs filter
│   └── useFormattedJobs.ts
├── data/
│   ├── kisaJobs.ts                         client-side data source (pre-pended to API results)
│   └── infoContents.tsx
├── utils/{date,getDefaultDateRange,formatTagToLabel}.ts
└── components/
    ├── JobCategoryDropdown.tsx
    ├── InfiniteScroll.tsx
    ├── NotificationText.tsx
    ├── JobApplicationInfoContents/
    │   ├── index.tsx                       static info (non-peak-season fallback)
    │   ├── InfoAccordion.tsx
    │   └── AccordionTabs.tsx
    ├── JobPostingGrid/
    │   ├── index.tsx
    │   ├── JobPostingCard.tsx
    │   └── USAFallbackContent.tsx          → extract out to page-level
    └── TagList/
        ├── index.tsx
        ├── TagButton.tsx
        ├── DateInputField.tsx
        ├── CountryDropdown.tsx             → removed from TagList, replaced by page-level CountryToggle
        ├── DateRangeDetailModal.tsx        → DELETED (replaced by DS DateRangePicker)
        ├── EmploymentTypeDetailModal.tsx   → DELETED (replaced by DS ToggleGroup)
        └── TagDetailModal.tsx              → DELETED (no modals in new TagList)

src/apis/jobs/
└── queries.ts                              getJobs, getJobsByNextUrl

src/mocks/handlers/                         (to be created in lane 1.1)
└── jobs.ts                                 NEW — list + next-url MSW handlers

src/components/ui/ (legacy, jobs scope only)
├── button/CustomButton                     → DS Button
├── feedback/LoadingSpinner                 → DS LoadingSpinner
├── feedback/UnexpectedError                → DS StatusView
└── error-boundary/ErrorBoundary            → stays client-local (app-level pattern)
```

### Target structure (post-migration)

```
src/app/(main)/jobs/
├── layout.tsx
├── page.tsx                                thin — composes info block + CountryToggle + conditional (KR grid | US fallback)
└── error.tsx

src/features/jobs-curator/
├── components/
│   ├── CountryToggle.tsx                   NEW — KR/US page-level view switcher
│   ├── USAFallbackContent.tsx              hoisted from JobPostingGrid/ to feature root
│   ├── JobCategoryDropdown.tsx
│   ├── InfiniteScroll.tsx
│   ├── NotificationText.tsx
│   ├── JobApplicationInfoContents/         retokenized, DS Accordion + Tabs
│   ├── JobPostingGrid/                     KR-only path; drops USA fallback branch
│   │   ├── index.tsx
│   │   └── JobPostingCard.tsx
│   └── TagList/
│       ├── index.tsx                       inline segmented + dropdowns, no modals
│       └── (4 modal files deleted)
├── hooks/                                  retokenized, context grows `country`
├── contexts/JobsCuratorContext.tsx         adds `country` + `setCountry`
└── utils/

src/mocks/handlers/jobs.ts                  MSW handlers for /jobs/ endpoints
```

---

## API Surface (for MSW lane 1.1)

Only two endpoints:

1. `GET /jobs/?category=&tags[]=&startDate=&endDate=&offset=&limit=500`
   - Response: `{ jobs: Job[], next: string | null, total?, hasMore? }`
2. `GET {nextUrl}` — cursor passthrough where `nextUrl` is the `next` field from the previous response (e.g. `/api/v2/jobs/?offset=500&limit=500`).

**MSW handler decisions:**
- Page size ignored from client; handler uses mock-only page size of **10** so a ~30-fixture dataset exercises pagination across ~3 pages.
- Fixtures: ~30 synthetic `source: "wanted-api"` jobs spanning categories, tags (`fulltime`/`intern`/`convertible`/`experiential`/`global`), and date ranges.
- States supported: happy, empty (`jobs: []`), error (500 response for ErrorBoundary verification).
- KISA jobs (`data/kisaJobs.ts`) remain client-side pre-pended — **not** moved to MSW.

---

## Country Semantics (architectural decision)

`CountryDropdown` was conceptually a filter but behaviorally a view switcher:
- **한국 (KR):** shows API-backed filtered grid (wanted-api data + client-side kisaJobs).
- **미국 (US):** shows `USAFallbackContent` (link card → external LinkedIn). No filters, no grid.

Phase 1 formalizes this:
- New `CountryToggle` component at page level, above the dynamic section.
- In US mode, TagList + JobCategoryDropdown + JobPostingGrid are **hidden** (only USAFallbackContent renders).
- `country` lives in `JobsCuratorContext` (updated in lane 1.8).
- `JobListQueryParams` stays without `country` — not a server param.

---

## Per-Lane Audit

### 1.1 — MSW handlers for jobs API

- **Scope:** `[MECHANICAL]`
- **TDD:** `[NO-TDD]`
- **Interactive:** autonomous
- **Wave:** 0 (solo blocker — all downstream lanes need mocks to verify visually)
- **Files created:** `src/mocks/handlers/jobs.ts`, `src/mocks/fixtures/jobs.ts`
- **Files modified:** `src/mocks/handlers/index.ts` (register), possibly `src/mocks/handlers.ts`
- **Key decisions:** mock page size = 10, ~30 fixtures, happy/empty/error states.

### 1.2 — JobApplicationInfoContents

- **Scope:** `[POLISH]`
- **TDD:** `[NO-TDD]`
- **Interactive:** autonomous
- **Wave:** 1
- **Swap:** raw Accordion/Tabs implementation → DS `Accordion` + DS `Tabs`.
- **Files:** `features/jobs-curator/components/JobApplicationInfoContents/{index,InfoAccordion,AccordionTabs}.tsx`
- **Risk:** verify DS Accordion + Tabs compose (Tabs inside Accordion panels).

### 1.3 — JobCategoryDropdown

- **Scope:** `[POLISH]`
- **TDD:** `[NO-TDD]`
- **Interactive:** autonomous
- **Wave:** 1
- **Swap:** current dropdown impl → DS `Dropdown`. (DS `Select` is form-oriented; `Dropdown` is the right primitive for this UI menu. If `Dropdown` reads ugly at ~20 options, fall back to `Select`.)
- **Files:** `features/jobs-curator/components/JobCategoryDropdown.tsx`
- **Risk:** ~20 options may stress dropdown menu height — verify scroll behavior; fall back to `Select` only if visual polish fails.

### 1.4 — TagList redesign

- **Scope:** `[REDESIGN]` — the one redesign of the phase.
- **TDD:** `[TDD]`
- **Interactive:** interactive (user drives design finalization)
- **Wave:** 1
- **Direction:** zero modals. Inline segmented controls + date picker.
  - Employment type (`fulltime` / `intern`) → DS `ToggleGroup`
  - Internship type (`convertible` / `experiential` / `global`, shown when `intern` active) → DS `ToggleGroup`
  - Date range → DS `DateRangePicker`
- **Files touched:** `features/jobs-curator/components/TagList/index.tsx`
- **Files deleted:** `TagButton.tsx`, `DateInputField.tsx`, `CountryDropdown.tsx`, `TagDetailModal.tsx`, `DateRangeDetailModal.tsx`, `EmploymentTypeDetailModal.tsx`
- **TDD rationale:** filter state is complex (employment → internshipTypes cascade, date formatting, tag array assembly).

### 1.5 — JobPostingGrid + JobPostingCard + InfiniteScroll + NotificationText

- **Scope:** `[POLISH]`
- **TDD:** `[NO-TDD]`
- **Interactive:** autonomous
- **Wave:** 1 (bundled — card always ships with its grid)
- **Swap:** manual grid layout → DS `Grid` or tokenized CSS grid; JobPostingCard → DS `Card` + `Badge`; InfiniteScroll sentinel pattern stays local.
- **Files:** `features/jobs-curator/components/JobPostingGrid/{index,JobPostingCard}.tsx`, `features/jobs-curator/components/InfiniteScroll.tsx`, `features/jobs-curator/components/NotificationText.tsx`
- **Note:** USAFallbackContent branch removed from grid — US mode won't render this component at all.

### 1.6 — USAFallbackContent extract + migrate

- **Scope:** `[POLISH]`
- **TDD:** `[NO-TDD]`
- **Interactive:** autonomous
- **Wave:** 1
- **Move:** `JobPostingGrid/USAFallbackContent.tsx` → `features/jobs-curator/components/USAFallbackContent.tsx`
- **Retokenize:** any styling → DS tokens; swap legacy button/link primitives → DS `LinkButton` or `Button`.

### 1.7 — CountryToggle (new component)

- **Scope:** `[REDESIGN]` (new component, small)
- **TDD:** `[NO-TDD]`
- **Interactive:** autonomous
- **Wave:** 2 (after 1.8 ships `country` to context)
- **Create:** `features/jobs-curator/components/CountryToggle.tsx`
- **Behavior:** segmented KR/US switcher (DS `ToggleGroup`), writes to `JobsCuratorContext.country`. Default KR.
- **Depends on:** lane 1.8 must merge first — `JobsCuratorContext.country` + `setCountry` must exist before this lane consumes them. Strict `blocked-by:1.8` edge.

### 1.8 — Hooks/context cleanup

- **Scope:** `[MECHANICAL]`
- **TDD:** `[TDD]`
- **Interactive:** autonomous
- **Wave:** 1
- **Files:** `contexts/JobsCuratorContext.tsx`, `hooks/{useInfiniteJobs,useJobsQueryParams,useKisaJobs,useFormattedJobs}.ts`
- **Changes:**
  - `JobsCuratorContext` gains `country: SupportedCountry` + `setCountry`.
  - Retokenize any inline styles/strings.
  - Typecheck + test existing filter math (date range, tag cascade, kisaJobs filter).
- **TDD rationale:** pure logic, easy to unit-test, guards against regressions during retokenize.

### 1.9 — Legacy ui swap (jobs scope only)

- **Scope:** `[MECHANICAL]`
- **TDD:** `[NO-TDD]`
- **Interactive:** autonomous
- **Wave:** 2 (after lanes 1.2–1.8, since those touch the same component files)
- **Swaps (within `features/jobs-curator/**` + `app/(main)/jobs/**` only):**
  - `CustomButton` → DS `Button`
  - `LoadingSpinner` (legacy) → DS `LoadingSpinner`
  - `UnexpectedError` → DS `StatusView` (with appropriate preset)
  - `ErrorBoundary` stays in client (app-level React pattern, not a DS primitive)
- **Out of scope:** same swaps in pocha-* or kisa-web — those happen in their own phases.

### 1.10 — Page shell

- **Scope:** `[POLISH]`
- **TDD:** `[NO-TDD]`
- **Interactive:** interactive (integration moment — live review)
- **Wave:** 3
- **Compose:** `page.tsx` wires CountryToggle + conditional render:
  - KR → `<JobCategoryDropdown />`, `<TagList />`, `<JobPostingGrid />`
  - US → `<USAFallbackContent />`
- **Verify:** MSW-backed happy path, empty state, error state, both country modes.
- **Depends on:** all prior lanes merged.

### 1.11 — Verify + end-bump

- **Scope:** n/a
- **TDD:** n/a
- **Interactive:** interactive
- **Wave:** 4
- **Actions:**
  - Full Vercel `dev`-branch preview walkthrough (KR + US modes, filter combos, pagination, error paths).
  - `pnpm build` + `pnpm typecheck` across DS and client repos.
  - `ds-phase-end-bump` if `ds-fixes-log.md` accumulated entries (not anticipated this phase).
  - Tick Phase 1 in TODO.md.

---

## Wave Layout

```
Wave 0 (solo blocker):     1.1  MSW handlers

Wave 1 (parallel):         1.2  JobApplicationInfoContents        (autonomous)
                           1.3  JobCategoryDropdown               (autonomous)
                           1.4  TagList redesign                  (interactive, user drives)
                           1.5  JobPostingGrid + Card + scroll    (autonomous)
                           1.6  USAFallbackContent migrate        (autonomous)
                           1.8  Hooks/context cleanup             (autonomous)

Wave 2:                    1.7  CountryToggle new                 (autonomous, blocked-by:1.8)
                           1.9  Legacy ui swap                    (autonomous)

Wave 3 (interactive):      1.10 Page shell                        (interactive)

Wave 4 (interactive):      1.11 Verify + end-bump                 (interactive)
```

---

## Phase-wide Risks / Notes

| Risk / Note | Resolution |
|---|---|
| DS inventory completeness | ✅ Confirmed — all anticipated needs covered (Accordion, Tabs, Select, Dropdown, ToggleGroup, DateRangePicker, Dialog, Popover, Button, IconButton, LinkButton, LoadingSpinner, StatusView, Card, Badge, Input, Grid). No DS gaps anticipated. |
| Accordion + Tabs composition | Verify during lane 1.2 — Tabs nested inside Accordion panels in `JobApplicationInfoContents`. |
| JobCategoryDropdown scale (~20 options) | Verify during lane 1.3 — DS Select preferred; switch to Dropdown if UX breaks. |
| MSW as Wave 0 blocker | Strict ordering — lanes 1.2–1.8 visual verification depends on MSW handlers shipping first. |
| Country state shared across lanes | `JobsCuratorContext.country` added in lane 1.8, consumed in 1.7 (CountryToggle) and 1.10 (page shell). Coordinate via the context file being touched in 1.8. |
| `data/kisaJobs.ts` not moved to MSW | Intentional — KISA jobs are a client-side data source, not an API. Stays as-is. |
| TagList modal file deletion | Lane 1.4 deletes 5 files; ensure no dead imports linger. Typecheck enforces. |
| `ErrorBoundary` + `error.tsx` split | Lane 1.9 preserves client-local ErrorBoundary. Next.js `error.tsx` (route-level) stays untouched. |
| Legacy ui scope creep | Lane 1.9 **only** touches usages inside `features/jobs-curator/**` + `app/(main)/jobs/**`. Other apps migrate legacy ui in their own phases. |

---

## Out of Scope

- `/boards/job-announcement` route — different feature (bulletin), not part of jobs-curator.
- Legacy ui swap outside jobs scope (CustomButton/LoadingSpinner/UnexpectedError usages in other apps).
- Server-side `country` parameter in `JobListQueryParams` (not needed — country is a view switcher).
- Moving `data/kisaJobs.ts` to MSW (client-side data source by design).
- Adding richer filter dimensions not currently present (company search, location, salary band).
