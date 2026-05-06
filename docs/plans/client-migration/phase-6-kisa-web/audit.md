# Phase 6 — kisa-web (Audit)

**Type:** Feature migration phase (per HARNESS), subphased into many lanes for wave-based parallel execution.
**Charter:** Migrate the **official KISA website surface** — everything under `src/app/(main)/*` in the client repo, **excluding** `/jobs` (already shipped in Phase 1) and `/game-night-rsvp` (out of scope, slated for removal). 47 page surfaces total across 8 route clusters: home, about, boards, everykisa, info, posts, signin/signup, users.
**Scope principle:** This is **redesign + migration**, not mechanical preservation. Brand identity (navy + maize + Korean display type + page structure + signature moves) is preserved; everything else is fair game. Per `feedback_migration_is_redesign`. Several lanes are explicit `[REDESIGN]` lanes (home, about subpages, boards/everykisa template, info template, signin, signup); others are `[POLISH]` migrations.

---

## Scope Snapshot

### Source files (client) — `src/app/(main)/`

```
(main)/
├── layout.tsx                    [PHASE 0.5 — DS Container, Header/Footer/NavMenu already migrated]
├── Providers.tsx                 [PHASE 0.5 — already migrated]
├── page.tsx                      [REACHABLE]  Root home page (flagship redesign)
│
├── about/                        6 static pages, all different shapes
│   ├── layout.tsx
│   ├── kisa/page.js              About KISA (intro)
│   ├── members/page.js           학생회 조직도 (org chart)
│   ├── events/page.js            활동 소개 (activities)
│   ├── rule/page.js              회칙 (governance)
│   ├── credits/page.tsx          개발팀 소개 (dev team)
│   └── sponsor/page.tsx          스폰서
│
├── boards/                       5 boards + layout
│   ├── layout.tsx
│   ├── announcement/page.tsx     [admin-post-only, comments DISABLED]
│   ├── buyandsell/page.tsx
│   ├── housing/page.tsx
│   ├── job-announcement/page.tsx
│   └── sponsor/page.tsx
│
├── everykisa/                    4 boards + layout — same shape as /boards but anonymous-allowed
│   ├── layout.tsx
│   ├── academic/page.tsx
│   ├── career/page.tsx
│   ├── community/page.tsx
│   └── concern/page.tsx
│
├── info/                         23 pages: 1 checklist + 5 templated categories
│   ├── layout.tsx
│   ├── checklist/page.js         처음 와서 할 일 (accordion-based)
│   ├── campus/page.js + detail/{central,north}/page.js              (3)
│   ├── housing/page.js + detail/{on-campus,off-campus}/page.js      (3)
│   ├── restaurants/page.js + detail/{asian,dessert,fine-dining,
│   │                                  hamburger-pizza,korean,
│   │                                  korean-market,others}/page.js (8)
│   ├── sports/page.js + detail/{facility,misc-sports}/page.js       (3)
│   └── travel/page.js + detail/{ann-arbor,detroit,nearby}/page.js   (4)
│
├── posts/                        4 CRUD surfaces
│   ├── layout.tsx
│   ├── [postid]/page.tsx + layout.tsx          Post detail + comments + like
│   ├── create/[boardType]/page.tsx             Create form
│   ├── update/[postid]/page.tsx                Update form (shared schema with create)
│   └── delete/[board]/[postid]/page.tsx        Delete confirm + redirect
│
├── signin/page.tsx               Auth entry (small, ~560B)
│
├── signup/                       Auth registration
│   ├── page.js                   Main signup form (~8KB, heaviest auth surface)
│   └── [name]/page.js            Step-2 (~547B)
│
└── users/                        Profile
    ├── layout.tsx
    ├── [email]/page.tsx          Profile view
    └── edit/[email]/page.tsx     Profile edit form
```

### Source files — `src/apis/` (data layer)

```
src/apis/
├── boards/        queries.ts, swrHooks.ts                    [no MSW handlers yet]
├── posts/         queries.ts, mutations.ts, swrHooks.ts      [no MSW handlers yet]
├── comments/      queries.ts, mutations.ts                   [no MSW handlers yet]
├── likes/         queries.ts, mutations.ts                   [no MSW handlers yet]
└── users/         queries.ts, swrHooks.ts                    [MSW handlers EXIST — Phase 5 era]

src/mocks/handlers/
├── auth.ts        [EXISTS]
├── users.ts       [EXISTS]
├── jobs.ts        [EXISTS — Phase 1]
└── pocha.ts       [EXISTS — Phase 2]
```

**Gap:** boards, posts, comments, likes have **zero** MSW coverage. Lane 6.5 splits handler creation into 4 parallel autonomous lanes (per `feedback_msw_full_crud` — full CRUD enumeration is a planning gate).

### Touched but not redesigned

```
(main)/layout.tsx                Phase 0.5 already DS-fied; do not touch
(main)/Providers.tsx             Phase 0.5 already DS-fied; do not touch
components/layout/header/*       Phase 0.5 already DS-fied; do not touch
components/layout/footer/*       Phase 0.5 already DS-fied; do not touch
```

### Out of scope

- **`/jobs`** — already shipped Phase 1 (jobs-curator).
- **`/game-night-rsvp`** — slated for removal; do not migrate. Removal handled outside this phase.
- **Admin surfaces (`/admin/*`)** — Phase 5.
- **Pocha surfaces (`/(pocha)/*`)** — Phases 2–4.
- **API route handlers (`src/app/api/*`)** — backend code, not in DS migration scope.

---

## Decisions Locked (grill output)

| Q | Decision | Rationale |
|---|---|---|
| Q1 | **Hybrid carving axis** — route family for natural clusters, but split big ones (info, boards/everykisa) into sub-lanes by category | Routing axis maps cleanly to user-facing pages; per-category split keeps each lane to a single session. Over-split rather than under-split. |
| Q2 | **Boards/everykisa cluster: template-first with reference + parallel fan-out** — Lane 6 builds shared template AND migrates `/boards/announcement` (the constraint-heavy reference: admin-post-only + comments-disabled); Lane 7 fans out remaining 8 list views in parallel | Proves capability-flag template against hardest case first; fan-out becomes pure autonomous burst. Avoids duplicating template-design across `/boards` and `/everykisa`. |
| Q3 | **About cluster: 3 lanes** — `kisa+events` (identity + activities) / `members+credits` (people pages — user pairing) / `rule+sponsor` (governance + funding). NOT 6 per-page lanes (excessive for static); NOT 1 sweep (too much context-switching) | 3 lanes give 2 pages per session, room to do redesign justice without bloating phase. User explicitly paired members+credits: "the UI is different but kind of same page that presents members (whole vs dev team)." |
| Q4 | **Info cluster: template-first + fan-out** — Lane 13a builds template + migrates `/info/campus` (smallest non-trivial reference, 3 pages); Lane 13b fans out housing (3) / restaurants (8) / sports (3) / travel (4) in parallel. `/info/checklist` is a separate lane (Lane 12) due to accordion-driven shape | Mirrors locked Lane 6 strategy. User: "I think it's possible that each info page might have different format on demand in the future" was the original justification for current code duplication; "but actually...I don't think so" — refactor to template + data is now greenlit. |
| Q5 | **Posts cluster: 2 lanes** — Lane 8 = `/posts/[postid]` detail + `/posts/delete` (delete is just confirm-then-redirect); Lane 9 = create + update (shared form schema, mode-driven) | Splitting too fine fragments form schema work. User confirmed: "I know that create and update share the same form but different mode." |
| Q6 | **Users cluster: 1 lane** — view + edit together | User: "they share some same UI." Splitting buys nothing for 2 pages. |
| Q7 | **Auth cluster: split** — Lane 10 Signin (560B, small) / Lane 11 Signup (8KB form + tiny `[name]` step) | Signup is form-heavy enough to deserve its own redesign session; signin is small enough to ship fast independently. Same design language but no shared code. |
| Q8 | **Foundation lane DROPPED** — Phase 0.5 already migrated `(main)/layout.tsx`, Providers, Header, Footer, NavMenu, Mobile menu. Phase 6 starts at the page level | User catch: existing `Header.tsx` (153 LOC) + `NavMenu.tsx` (210 LOC) are the post-Phase-0.5 DS code, not legacy. `/jobs` already proves the shell works. |
| Q9 | **MSW handler lane split into 4 autonomous-eligible lanes** (5a/b/c/d), not one interactive lane | User: "covering too many api endpoints. we can do it parallel sessions. better to split into several autonomous-possible lanes than just keeping it as a single interactive needed lane." API surface naturally splits by `apis/{boards,posts,comments,likes}` folder. |
| Q10 | **Home page is its own dedicated lane with grill at execution time** — flagship surface, biggest visual decision in phase | User: "home page is the 'first' customer facing page, which is very very important." Grill happens at Mode D pickup, not at audit time. |
| Q11 | **Boards/everykisa shared template uses capability flags** for: (a) anonymous post/comment allowed (everykisa = yes, boards = no), (b) comments enabled (boards/announcement = no, others = yes), (c) admin-post-only (boards/announcement = yes, others = no). Capability config lives per-route, template consumes flags | Rule discovery; user confirmed all three flags during grill. Three flags × per-route config = 9 configs total. |

---

## Subphase Enumeration

| # | Title | Single responsibility | TDD | Mode | Scope |
|---|---|---|:---:|---|---|
| 6.1 | **Home redesign** | Root `(main)/page.tsx` — flagship redesign; brand identity preserved; grill-me at execution | no | interactive | [REDESIGN] |
| 6.2 | **About — kisa + events** | Migrate `/about/kisa` + `/about/events` to DS; per-page redesign treatment; no shared template (each page has its own shape) | no | autonomous | [REDESIGN] |
| 6.3 | **About — members + credits** | Migrate `/about/members` (org chart) + `/about/credits` (dev team) — both "people presentation" pages | no | autonomous | [REDESIGN] |
| 6.4 | **About — rule + sponsor** | Migrate `/about/rule` (회칙) + `/about/sponsor` to DS | no | autonomous | [REDESIGN] |
| 6.5a | **MSW — boards/everykisa handlers + fixtures** | List/detail GETs for boards (5 boards) and everykisa (4 boards). Verify everykisa endpoint shape — possibly category filter on shared boards endpoint | yes | autonomous | [MECHANICAL] |
| 6.5b | **MSW — posts CRUD handlers + fixtures** | GET (single + list-by-board), POST (create), PUT (update), DELETE (delete) on `/api/posts` (or equivalent). Fixture covers all 9 board types | yes | autonomous | [MECHANICAL] |
| 6.5c | **MSW — comments CRUD handlers + fixtures** | GET/POST/PUT/DELETE on comments. Anonymous comment flag MUST be honored in fixtures + handlers (everykisa uses it; boards does not) | yes | autonomous | [MECHANICAL] |
| 6.5d | **MSW — likes handlers + fixtures** | Toggle like/unlike on a post; like-count GET. Smallest of the four | yes | autonomous | [MECHANICAL] |
| 6.6 | **Boards/everykisa shared template + `/boards/announcement` reference** | Build templated list view consuming `apis/boards`; capability flags (anon, comments, admin-post-only); migrate `/boards/announcement` as reference (constraint-heavy: admin-post + no comments) | no | interactive | [REDESIGN] |
| 6.7 | **Boards/everykisa fan-out** (8 sub-lanes, parallel) | Migrate remaining 8 list views to template: buyandsell, housing, job-announcement, sponsor (boards, 4) + academic, career, community, concern (everykisa, 4). Each sub-lane = 1 page + capability config | no | autonomous (per sub-lane) | [POLISH] |
| 6.8 | **Post detail + delete** | `/posts/[postid]` view (post body + comments + like) + `/posts/delete/[board]/[postid]` (confirm-then-redirect). Logic-heavy lane: comment thread, like toggle optimistic update, anon flag rendering, admin-only-delete check | no | interactive | [REDESIGN] |
| 6.9 | **Post create/update form** | `/posts/create/[boardType]` + `/posts/update/[postid]` — shared form schema, mode-driven (`mode: "create" \| "update"`). Form schema covers title, body, board-type-aware fields, anon flag (everykisa only), admin-only enforcement (boards/announcement create) | no | interactive | [REDESIGN] |
| 6.10 | **Signin** | `/signin/page.tsx` redesign + DS migration. MSW auth handlers exist. Auth flow: existing OAuth/email entry, careful logic refinement | no | interactive | [REDESIGN] |
| 6.11 | **Signup** | `/signup/page.js` (8KB form) + `/signup/[name]/page.js` (step-2). Heaviest form in auth cluster. Field validation, email confirmation flow, careful logic preservation | no | interactive | [REDESIGN] |
| 6.12 | **Users — view + edit** | `/users/[email]` (profile view) + `/users/edit/[email]` (profile edit form). Shared UI between view and edit. MSW user handlers exist | no | autonomous | [REDESIGN] |
| 6.13 | **Info — checklist** | `/info/checklist` — accordion-based 처음 와서 할 일 page. Standalone (does not share shape with other info pages) | no | autonomous | [REDESIGN] |
| 6.14 | **Info template + `/info/campus` reference** | Build shared info template (overview + detail-list shape); extract page data into data files; migrate `/info/campus` (3 pages) as reference | no | interactive | [REDESIGN] |
| 6.15 | **Info fan-out** (4 sub-lanes, parallel) | Migrate remaining 4 categories to template: housing (3), restaurants (8), sports (3), travel (4). Each sub-lane = data extraction + visual verify | no | autonomous (per sub-lane) | [POLISH] |
| 6.16 | **Audit-after redesign + page metadata sweep** | Walkthrough all 47 surfaces at desktop + mobile; verify visual consistency across template-driven lanes (boards/everykisa, info); add/update Next.js metadata (`title`, `description`, `openGraph`) per route; fix drift caught in walkthrough | no | interactive | — |
| 6.17 | **Verify + end-bump** | `pnpm build` + `pnpm typecheck` (DS + client); MSW gate verification; optional DS bump if mid-phase fixes accumulated; tick phase entry | no | interactive | — |

**Count:** 17 lane entries; with fan-out sub-lanes resolved, **~29 effective lanes** (6.7 = 8 sub-lanes, 6.15 = 4 sub-lanes).
**Autonomous/interactive:** ~22 / 7 (effective).
**TDD lanes:** 4 (all MSW lanes 6.5a–d).

---

## Wave Plan

```
WAVE 1 — kick-off (13 lanes parallel, no deps)
├── 6.1   Home                           interactive  [REDESIGN]
├── 6.2   About kisa+events              autonomous   [REDESIGN]
├── 6.3   About members+credits          autonomous   [REDESIGN]
├── 6.4   About rule+sponsor             autonomous   [REDESIGN]
├── 6.5a  MSW boards/everykisa           autonomous   [MECHANICAL] [TDD]
├── 6.5b  MSW posts                      autonomous   [MECHANICAL] [TDD]
├── 6.5c  MSW comments                   autonomous   [MECHANICAL] [TDD]
├── 6.5d  MSW likes                      autonomous   [MECHANICAL] [TDD]
├── 6.10  Signin                         interactive  [REDESIGN]
├── 6.11  Signup                         interactive  [REDESIGN]
├── 6.12  Users (view+edit)              autonomous   [REDESIGN]
├── 6.13  Info checklist                 autonomous   [REDESIGN]
└── 6.14  Info template + campus ref     interactive  [REDESIGN]

WAVE 2 — unblocked by Wave 1
├── 6.6   Boards/everykisa template      interactive  [REDESIGN]    blocks: 6.5a
│         + /boards/announcement ref
├── 6.8   Post detail + delete           interactive  [REDESIGN]    blocks: 6.5b+6.5c+6.5d
├── 6.9   Post create/update form        interactive  [REDESIGN]    blocks: 6.5b
└── 6.15  Info fan-out (4 sub-lanes)     autonomous   [POLISH]      blocks: 6.14
        ├── housing
        ├── restaurants
        ├── sports
        └── travel

WAVE 3 — unblocked by Wave 2
└── 6.7   Boards/everykisa fan-out       autonomous   [POLISH]      blocks: 6.6
        (8 sub-lanes, parallel)
        ├── buyandsell
        ├── housing
        ├── job-announcement
        ├── sponsor (boards)
        ├── academic
        ├── career
        ├── community
        └── concern

WAVE 4 — close-out (serial)
├── 6.16  Audit-after + page metadata    interactive
└── 6.17  Verify + end-bump              interactive
```

**Critical path:** 6.5a → 6.6 → 6.7 → 6.16 → 6.17 ≈ 5 serial lanes. (6.5b/c/d → 6.8/6.9 is shorter and not on critical path if Wave 1 MSW lanes finish concurrently.)

**Throughput shape:**
- Wave 1: **13 lanes** in parallel (4 interactive, 9 autonomous) — biggest fan-out of any phase
- Wave 2: 4 main lanes + 4 info fan-out sub-lanes = **8 effective lanes**
- Wave 3: **8 sub-lanes** (boards/everykisa list view fan-out) — pure autonomous burst
- Wave 4: **2 lanes** — close out

---

## Phase-Wide Risks

1. **MSW handler shape vs real backend.** Lanes 6.5a–d write handlers without seeing backend implementation. If backend response shape diverges from handler shape, post-`dev → main` ship reveals breakage on real Stripe-style smoke. Mitigate: each MSW lane reads `apis/{domain}/queries.ts` + `mutations.ts` carefully, matches the typed response shape; phase 6.17 verify covers MSW gate (mocks-on dev preview vs mocks-off real call) before ship.

2. **Capability-flag template drift.** Boards/everykisa template (Lane 6.6) ships with 3 flags: anon, comments, admin-post-only. If a 4th constraint emerges during fan-out (Lane 6.7), the template needs revision and the already-migrated `/boards/announcement` may need rework. Mitigate: 6.6 audit reads ALL 9 board configs upfront, locks the flag set before template ship.

3. **Anonymous post/comment data flow.** Everykisa allows anonymous posts AND comments; boards does not. Anonymous flag must be honored end-to-end: form (Lane 6.9), MSW handler (6.5b/c), display (Lane 6.7 list, Lane 6.8 detail). Drift here is silent until a real user files a privacy concern. Mitigate: 6.5c/6.5b fixtures include both anon and non-anon records; 6.8 visual review explicitly checks rendering of anon author chip.

4. **Posts CRUD permission enforcement.** `/boards/announcement` is admin-post-only. Lane 6.9 form must check user role on submit; Lane 6.5b POST handler must reject non-admin posts to /announcement. Server-side enforcement is the actual gate — but client-side block prevents wasted submits. Mitigate: form-level disable + handler-level reject, both verified in 6.16 audit.

5. **Info template generality.** Lane 6.14 builds template against `/info/campus` (3 pages). Restaurants (8 pages, more variety in detail content) is the heaviest fan-out target — template may not stretch cleanly. Mitigate: 6.14 grill considers restaurants' detail-page variety upfront; if template looks too narrow, branch into "card-list template" + "detail-card template" subcomponents.

6. **`.js` legacy file conversion.** ~30 of the 47 pages are still `.js` (not `.tsx`). Migration must convert to TSX (per app convention post-Phase 0). Each lane's pastiche pass should ship `.tsx` replacement, deleting the legacy `.js`. Risk: missed conversions leave a mixed extension state. Mitigate: each lane's PR description lists files added + deleted; 6.16 audit greps `(main)/**/page.js` and confirms count = 0 (or only `/game-night-rsvp/page.tsx` which is out-of-scope).

7. **Game-night-rsvp lingering.** Out of scope but exists in `(main)/`. Mid-phase someone may try to migrate it accidentally. Mitigate: per-lane scope explicitly excludes `game-night-rsvp/`; 6.16 audit confirms it's untouched (or removed if removal happens during this phase window).

8. **Signup form preservation.** `/signup/page.js` is 8KB — likely the most logic-dense page in the phase outside posts. Field validation, email confirmation, server-side checks. Mitigate: Lane 6.11 grill upfront, snapshot current form fields + validation rules, ensure the redesign preserves every gate.

9. **Wave 1 cross-terminal coordination.** 13 lanes runnable in parallel is the biggest concurrency burst of the migration. Per `feedback_parallel_wave_pickup`, the cron routine should not auto-pick across all 13 — user is the scheduler. Mitigate: plan.md issue list flags Wave 1 lanes with `wave-1` label; menu shown on cold pickup.

10. **`Wave 3` (boards/everykisa fan-out) visual drift across 8 parallel sub-lanes.** 8 sub-lanes ship to dev independently, each touching only their own page. If Wave 1 boards template (Lane 6.6) shipped a not-quite-final visual decision, 8 sub-lanes inherit and amplify the drift. Mitigate: Lane 6.16 audit-after pass is critical — explicitly walks all 9 list views side-by-side at 1280px and 375px.

11. **`/posts/delete` route semantics.** Conventionally a destructive action route (not a "page"). May actually just trigger a `DELETE` then `router.push('/boards/{type}')`. Lane 6.8 audit step 1: read current implementation, confirm whether it has UI or is pure side-effect. If pure side-effect, no DS work needed beyond confirming the redirect target.

12. **About per-page redesign budget.** 3 lanes × 2 pages each = 6 redesigns. User wants per-page treatment. Risk: each lane's session balloons trying to perfect 2 different designs. Mitigate: bias toward "ship and iterate via 6.16 audit" rather than "perfect in lane."

---

## Open Items (carry into plan.md)

- **6.1 (Home)**: Grill at execution time — design references, hero structure, section list, scroll behavior, mobile layout decisions. This is the flagship — biggest grill of the phase.
- **6.5a**: confirm everykisa endpoint shape — is it a separate `/api/everykisa/{category}` route or a category-filtered `/api/boards`? Read `apis/boards/queries.ts` upfront.
- **6.5a–d**: each lane reads `apis/{domain}/*` + `apis/{domain}/swrHooks.ts` to enumerate the EXACT request/response shapes before writing handlers. Per `feedback_msw_full_crud`.
- **6.6**: read all 9 board configs upfront — confirm flag set is exactly 3 (anon, comments, admin-post-only) and not larger. Lock template public API before reference migration.
- **6.6**: capability config location — per-route `config.ts` vs central registry? Decide during 6.6 grill.
- **6.7 (fan-out)**: each sub-lane checks template parity at 1280px + 375px before commit; report screenshots in PR description.
- **6.8**: confirm `/posts/delete` is page or pure side-effect (see Risk 11).
- **6.9**: form schema lib — `@umichkisa-ds/form` per HARNESS Form validation decision; no zod. Confirm RHF `register` rules cover all signup field types (email, password strength, etc.) before Lane 6.11.
- **6.11 (Signup)**: snapshot current 8KB form's field list + validation rules in lane PR description as "preservation contract."
- **6.13 (Info checklist)**: confirm accordion shape — is it DS `Accordion` (does it exist?) or local component? Raise as DS gap if missing.
- **6.14 (Info template)**: lock template public API before reference migration; consider both "card-list" and "detail-card" subcomponents (see Risk 5).
- **6.16**: deliverable = walkthrough of all 47 surfaces at 1280px + 375px with screenshots; metadata sweep = `title`, `description`, `openGraph` per route.
- **6.17**: real-API smoke deferred to pre-`dev → main` ship per Phase 4.9 precedent (see `ship-migration-to-prod` skill).
- **Out-of-scope cleanup**: `/game-night-rsvp` removal — does it happen during Phase 6 window or after? If during, who owns it? If after, document in TODO.md as a Phase 7 candidate.
