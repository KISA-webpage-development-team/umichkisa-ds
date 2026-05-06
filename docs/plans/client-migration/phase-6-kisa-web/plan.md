# Phase 6 — kisa-web (Plan)

> Lanes from this plan become GitHub issues executed per `docs/plans/client-migration/AUTONOMOUS_PROTOCOL.md`. Source of truth: `./audit.md`.
>
> **UI fidelity is handled by `pastiche`, not by this plan.** Lane specs describe the artifact, the user goal, the data the page consumes, the states/branches that must exist, the logic gates, and edge cases. They intentionally do **not** prescribe DS atom names, exact variants, layout composition, spacing, or typography utilities. Pastiche resolves those choices against the DS repo's `pastiche/{FACT,KNOWLEDGE,WISDOM}.md`.
>
> **This is REDESIGN, not preservation.** Per `feedback_migration_is_redesign`. Pastiche is **explicitly authorized to ignore the existing UI code** for any [REDESIGN] lane and reach for whatever DS surface fits the page's goal best. Brand identity (navy + maize + Korean display type + signature page structure) is preserved; everything else is fair game. Existing `.js` files are replaced by `.tsx` files in every migrated lane (no mixed extensions remain post-phase).

**Scope:** Migrate the **official KISA website surface** — every page under `src/app/(main)/*` in the client repo, **excluding** `/jobs` (Phase 1) and `/game-night-rsvp` (out of scope, slated for removal). 47 page surfaces across 8 route clusters: home, about, boards, everykisa, info, posts, signin/signup, users. Phase 0.5 already migrated `(main)/layout.tsx`, `Providers.tsx`, Header, Footer, NavMenu, mobile menu — Phase 6 starts at the page level and **does not touch** those.

---

## Wave / Dependency Structure

```
WAVE 1 — kick-off (12 lanes parallel, no deps)
  6.2   About — kisa + events                         (interactive)
  6.3   About — members + credits                     (interactive)
  6.4   About — rule + sponsor                        (interactive)
  6.5a  MSW — boards/everykisa handlers + fixtures    (autonomous, TDD)
  6.5b  MSW — posts CRUD handlers + fixtures          (autonomous, TDD)
  6.5c  MSW — comments CRUD handlers + fixtures       (autonomous, TDD)
  6.5d  MSW — likes handlers + fixtures               (autonomous, TDD)
  6.10  Signin redesign                               (interactive)
  6.11  Signup redesign + signup MSW handlers         (interactive)
  6.12  Users (view + edit)                           (interactive)
  6.13  Info — checklist                              (interactive)
  6.14  Info template + /info/campus reference        (interactive)

WAVE 2 — unblocked by Wave 1
  6.1   Home redesign                                 (interactive)        blocked-by: 6.5a
  6.6   Boards/everykisa template + announcement ref  (interactive)        blocked-by: 6.5a
  6.8   Post detail + delete                          (interactive)        blocked-by: 6.5b, 6.5c, 6.5d
  6.9   Post create/update form                       (interactive)        blocked-by: 6.5b
  6.15  Info fan-out (housing, restaurants, sports, travel — 4 sub-lanes, autonomous)  blocked-by: 6.14

WAVE 3 — unblocked by Wave 2
  6.7   Boards/everykisa fan-out                                            blocked-by: 6.6
        (8 sub-lanes parallel, autonomous)
        — buyandsell, housing, job-announcement, sponsor (boards)
        — academic, career, community, concern (everykisa)

WAVE 4 — close-out (serial)
  6.16  Audit-after + page metadata sweep             (interactive)         blocked-by: every Wave 1–3 lane
  6.17  Verify + end-bump                             (interactive)         blocked-by: 6.16
```

**Critical path:** 6.5a → 6.6 → 6.7 → 6.16 → 6.17 ≈ 5 serial lanes.

**Throughput:**
- Wave 1: **12 lanes** in parallel (7 interactive, 4 autonomous + 1 MSW spread).
- Wave 2: 5 main lanes + 4 info sub-lanes = **9 effective lanes** (biggest fan-out shifts to Wave 2).
- Wave 3: **8 sub-lanes** (boards/everykisa list-view fan-out).
- Wave 4: **2 lanes**.

**Dependency rationale:**
- `6.5a → 6.1`: home page renders a Boards Preview / summary component that consumes `apis/boards`; mock-mode rendering requires the boards handlers.
- `6.5a → 6.6`: boards template needs the boards/everykisa GET handlers in mock mode to render.
- `6.5b/c/d → 6.8`: post-detail page reads post + comments + like-count + per-user like-state.
- `6.5b → 6.9`: post create/update form posts to `/posts/` and `/posts/:postid/`.
- `6.6 → 6.7`: fan-out sub-lanes consume the template; no template = no fan-out.
- `6.14 → 6.15`: info fan-out consumes the info template extracted in 6.14.
- `* → 6.16`: audit-after walks every surface in the phase.
- `6.16 → 6.17`: verify is last.

---

## Label Disposition (6-Rule Gate)

Applied per `AUTONOMOUS_PROTOCOL.md` §6. Rule 1 (no REDESIGN) is the dominant gate — every redesign lane fails rule 1 and routes to `needs-interactive`. MSW lanes pass all six and route to `autonomous-ready`. Fan-out POLISH lanes pass rule 1 because the template (which carries the design decisions) is locked upstream.

| Lane | Tag | Disposition | Rationale |
|---|---|---|---|
| 6.1  | [REDESIGN][NO-TDD] | `needs-interactive` | Flagship page; biggest design grill of the phase per audit Q10 |
| 6.2  | [REDESIGN][NO-TDD] | `needs-interactive` | REDESIGN — per-page treatment of two unrelated layouts |
| 6.3  | [REDESIGN][NO-TDD] | `needs-interactive` | REDESIGN — year-picker UX needs DS Select grill (NextUI rip-out) |
| 6.4  | [REDESIGN][NO-TDD] | `needs-interactive` | REDESIGN — long static legal copy + sponsor grid both need typography decisions |
| 6.5a | [MECHANICAL][TDD]  | `autonomous-ready` | Pure handler authoring against documented endpoint shapes; no design |
| 6.5b | [MECHANICAL][TDD]  | `autonomous-ready` | Pure handler authoring (CRUD); no design |
| 6.5c | [MECHANICAL][TDD]  | `autonomous-ready` | Pure handler authoring (CRUD + nested thread); no design |
| 6.5d | [MECHANICAL][TDD]  | `autonomous-ready` | Pure handler authoring (toggle + counts); no design |
| 6.6  | [REDESIGN][NO-TDD] | `needs-interactive` | REDESIGN — capability-flag template design + announcement reference; locks public API consumed by 6.7 |
| 6.7  | [POLISH][NO-TDD]   | `autonomous-ready` (per sub-lane) | Pure config wiring against the locked template; no design decisions |
| 6.8  | [REDESIGN][NO-TDD] | `needs-interactive` | REDESIGN — comment thread, like toggle optimistic UX, anon flag rendering need live grill |
| 6.9  | [REDESIGN][NO-TDD] | `needs-interactive` | REDESIGN — shared form schema across create/update modes; capability-aware fields |
| 6.10 | [REDESIGN][NO-TDD] | `needs-interactive` | REDESIGN — auth landing redesign; small surface but design-driven |
| 6.11 | [REDESIGN][NO-TDD] | `needs-interactive` | REDESIGN — heaviest form (~260 LoC) + native dialog/alert rip-out + step-2 success page; preservation contract grill |
| 6.12 | [REDESIGN][NO-TDD] | `needs-interactive` | REDESIGN — view+edit shared UI surface; profile composition decisions |
| 6.13 | [REDESIGN][NO-TDD] | `needs-interactive` | REDESIGN — accordion-driven page; DS Accordion gap likely |
| 6.14 | [REDESIGN][NO-TDD] | `needs-interactive` | REDESIGN — info template public API locks 6.15 fan-out; design grill required |
| 6.15 | [POLISH][NO-TDD]   | `autonomous-ready` (per sub-lane) | Data extraction + template-config wiring; no design decisions |
| 6.16 | n/a                | `needs-interactive` | Phase-wide visual walkthrough + metadata authoring |
| 6.17 | n/a                | `needs-interactive` | Touches publish (`ds-phase-end-bump` if DS fixes accumulated); final verify |

**Effective totals (after sub-lane resolution — 6.7 ×8, 6.15 ×4):** ~16 autonomous-ready / ~13 needs-interactive across ~29 effective lanes.

---

## Cross-Lane Conventions

These apply to every lane and are not repeated per lane:

- **No mixed extensions** — every migrated `.js` file is replaced by `.tsx`. The old `.js` is deleted in the same commit; do not leave both.
- **No `(main)/layout.tsx`, `Providers.tsx`, Header/Footer/NavMenu touches** — Phase 0.5 owns those.
- **Korean copy is content, not design** — pastiche may rewrite copy if redesign demands it, but each lane lists existing copy as the **starting baseline** (engineer locks final copy in lane).
- **Fonts** — drop all `sejongHospitalBold` / `sejongHospitalLight` `.className` usage in migrated pages; use DS `type-*` tokens only per `feedback_only_type_tokens`. Raise a DS gap mid-phase via `ds-fix-during-migration` if the right token is missing — do not use arbitrary `text-[Xrem]` or `!text-*` overrides.
- **NextUI** — every NextUI import (`@nextui-org/react`) gets ripped out and replaced with the matching DS atom. If the DS atom is missing, file `ds-fix-during-migration`.
- **Native browser dialogs** — every `window.confirm` / `window.alert` is replaced by a DS Dialog/Toast equivalent. Raise DS gap if missing.
- **Auth gating** — pages that already gate on `getServerSession` / `getSession` keep their gate logic; only the rendered fallback components (`<NotLogin>`, `<NotAuthorized>`) get the DS treatment.
- **MSW gate verification** — every lane that consumes a mocked endpoint smokes both `NEXT_PUBLIC_API_MOCKING=enabled` (mock) and `disabled` (real-API placeholder) per HARNESS Mock-mode protocol. Real-API smoke is deferred to pre-`dev → main` ship per Phase 4.9 precedent (`ship-migration-to-prod`).
- **Mode D direct-push** — every needs-interactive lane runs Mode D: worktree off `dev`, merge into `dev` and push directly, no PR. Autonomous-ready lanes run via the cron routine and ship as PRs.
- **Pastiche brief boilerplate** — every REDESIGN lane invokes pastiche with: (a) the lane spec, (b) explicit license to ignore existing UI code in `src/app/(main)/...` and `src/features/...` for that surface, (c) brand identity guardrails (navy + maize + Korean type), (d) the locked logic spec from the lane.

---

## Lane 6.1 — Home redesign

**Repo:** `KISA-website-client` · **Mode:** `needs-interactive` (Mode D) · **Scope:** [REDESIGN] · execution skill: `pastiche` (preceded by `grill-me`)

**Blocked by:** Lane 6.5a (boards/everykisa MSW handlers) — the home page renders a Boards Preview / summary that consumes `apis/boards`; mock-mode rendering requires the handlers.

### Files

- Replace: `src/app/(main)/page.tsx` — root home page
- Pastiche may add/replace components under `src/features/home-sponsor/` or a new `src/features/home/` namespace — composition is pastiche's call

### Scope (descriptive)

`/` is the **first surface every visitor lands on** and is, per audit Q10, the most important page in the phase. The current page (~22 LoC) is a flat vertical stack of five feature components: `HomeCarousel`, `BoardsSummary`, `SponsorCarousel`, `SchoolCalendar`, `QuickLinks`. Each currently lives under `src/features/home-sponsor/components/`.

#### Functional content the redesigned home must surface

The redesign decides composition, hierarchy, and visual treatment freely, but the following content surfaces **must** exist somewhere on the page:

- **Hero / brand statement** — KISA's identity (Korean students at UMich) communicated visibly above the fold. Current code has no explicit hero — the carousel sits at top.
- **Featured/sponsor visual rotation** — replaces today's `HomeCarousel` (image rotator).
- **Boards summary** — a quick read of recent activity across the bulletin boards (today's `BoardsSummary` reads from `apis/boards`; pastiche decides whether it's a strip, a card list, or a tabbed peek).
- **Sponsor showcase** — replaces today's `SponsorCarousel`. Sponsor data lives at `src/features/home-sponsor/data/sponsorData.ts`; reuse it.
- **School calendar peek** — replaces today's `SchoolCalendar`. Surface today/this-week academic events.
- **Quick links** — replaces today's `QuickLinks`. Routes the visitor to the rest of the site.

Pastiche is free to merge, split, drop, or re-order these surfaces — but the user-visible information set above is preserved.

#### Logic spec

- **Rendering** — root page may stay an RSC; data sources that require client-side fetching live in their own client components per current pattern.
- **Boards summary data** — pulls from `getBoardAnnouncements(boardType)` per board type. Confirm at impl whether this is server-fetched once (SSR) or per-section (SWR).
- **Sponsor data** — static, from `sponsorData.ts`. No fetch.
- **School calendar data** — currently static client component; preserve its data source.
- **Auth visibility** — public page, no gate. Logged-in / logged-out states may show different CTAs in the hero (pastiche grill).
- **Mobile** — KISA brand site is responsive (per Phase 0.5 layout). Home redesign must work at 1280px **and** 375px.

### Pastiche brief

This is the flagship redesign. Run `grill-me` first to lock: hero copy + bilingual treatment, signature visual moves (e.g., a hero animation, a maize accent moment), section order, mobile collapse strategy, sponsor showcase format, calendar peek format, CTA strategy for logged-in vs anonymous visitors. The current 5-section stack is **not** the design baseline — pastiche may completely re-compose. Brand identity (navy + maize + Korean display type) is the only fixed input.

### Tasks

- [ ] Worktree off `origin/dev`
- [ ] Run `grill-me` skill on the home redesign — produce a lockfile of decisions before pastiche
- [ ] Invoke `pastiche` skill with the locked grill output as overlay
- [ ] Triage `// pastiche-unresolved-doubt:` markers (block before merge)
- [ ] Triage `## Follow-ups`
- [ ] Verify boards summary, sponsor showcase, calendar all render in mock mode at desktop + mobile
- [ ] `npm run typecheck` + `npm run build` (client) pass
- [ ] Suggest `vercel-react-best-practices` + `review-ui-on-browser` post-pastiche
- [ ] Mode D ship: confirm with user, merge to dev, push direct, run `wrapping-up-lane` after user confirms feature works

### Acceptance criteria

- [ ] `/` renders the redesigned home at 1280px **and** 375px
- [ ] All six functional surfaces (hero, featured rotation, boards summary, sponsor showcase, calendar peek, quick links) are present
- [ ] Logged-in vs logged-out hero CTAs behave per locked grill spec
- [ ] No `sejongHospitalBold/Light` font className usage remains
- [ ] No NextUI imports
- [ ] No pastiche-unresolved-doubt markers remain
- [ ] `npm run typecheck` + `npm run build` pass

### Non-goals

- Touching `(main)/layout.tsx` / Header / Footer (Phase 0.5)
- Changing sponsor data shape or sponsorData.ts schema
- Adding new admin/CMS for home content (out of phase)

### Bailout triggers

- Grill produces a hero design that requires a DS atom that does not exist (e.g., a marquee animation primitive) → file `ds-fix-during-migration` mid-phase before pastiche
- Pastiche cannot resolve mobile collapse for the boards summary cleanly → `needs-decision`

### Budget

~3–4 hours including grill (flagship). If pastiche output exceeds 1000 LoC, self-review before merge.

---

## Lane 6.2 — About: kisa + events

**Repo:** `KISA-website-client` · **Mode:** `needs-interactive` (Mode D) · **Scope:** [REDESIGN] · execution skill: `pastiche`

### Files

- Replace: `src/app/(main)/about/kisa/page.js` → `page.tsx`
- Replace: `src/app/(main)/about/events/page.js` → `page.tsx`
- Pastiche may refactor anything under `src/features/about-page/` for these two pages

### Scope (descriptive)

Two static pages, each with a different shape — handled in one lane because both are "about KISA" identity surfaces.

#### `/about/kisa` — KISA introduction

Currently composes `<KisaAll>` (full-bleed navy band with imagery) + `<AboutMainText>` (intro copy block). The page is short — a single hero band followed by a paragraph or two.

- **Content surfaces:** brand hero (the navy band today), introduction copy describing what KISA is and what it does. Greeting/inquiry CTA optional.
- **Data:** all static; lives in `src/features/about-page/components/AboutMainText.tsx` and `KisaAll.tsx`.
- **Auth:** public, no gate.

#### `/about/events` — KISA activities introduction

Currently composes `<InfoTitle title="활동 소개">` + a vertical stack of `<EventSection>` cards driven by `eventsPageData` (`src/features/about-page/data/eventsPageData.ts`). Each event in the data file has `id` and event content — read the data file at impl to confirm exact shape.

- **Content surfaces:** page title (활동 소개), one section per event with name + description + imagery.
- **Data:** static, from `eventsPageData.ts`. **Schema unchanged** — pastiche redesigns presentation only.
- **Auth:** public, no gate.

### Logic spec

- Both pages are static RSCs; no client interactivity required by spec.
- Both ship Next.js `metadata` (`title`, `description`) — current `/about/kisa` has metadata, current `/about/events` does not. The new `/about/events` must add metadata.
- Rip out all `sejongHospitalBold/Light` font className usage — DS `type-*` tokens only.

### Pastiche brief

Pastiche is **explicitly authorized to discard** the current `KisaAll` + `AboutMainText` + `InfoTitle` + `EventSection` composition. The events `eventsPageData` schema is the only fixed input — re-render its records however reads best. Brand-identity hero treatment from the home page redesign (Lane 6.1) may be a useful reference if 6.1 has merged first; if not, pastiche makes its own decision.

### Tasks

- [ ] Worktree off `origin/dev`
- [ ] Read `eventsPageData.ts` to lock the exact data schema
- [ ] Invoke `pastiche` skill with both pages in the lane spec (one session, two surfaces)
- [ ] Add `metadata` block to new `/about/events/page.tsx`
- [ ] Triage `// pastiche-unresolved-doubt:` and follow-ups
- [ ] `npm run typecheck` + `npm run build` pass
- [ ] Suggest `review-ui-on-browser` post-pastiche
- [ ] Mode D ship after user confirmation

### Acceptance criteria

- [ ] `/about/kisa` and `/about/events` both render at desktop + mobile
- [ ] `/about/events` consumes `eventsPageData` records 1:1 — no records dropped, schema unchanged
- [ ] Both pages ship Next.js `metadata`
- [ ] Old `.js` files deleted; no `sejongHospital*` className usage; no NextUI imports
- [ ] `npm run typecheck` + `npm run build` pass

### Non-goals

- Editing `eventsPageData.ts` content (data is the schema's source of truth — content edits are a separate task)
- Adding admin/CMS for editing about copy

### Bailout triggers

- `eventsPageData` schema needs extension (new field) to support pastiche's chosen layout → `needs-decision`

### Budget

~90 min.

---

## Lane 6.3 — About: members + credits

**Repo:** `KISA-website-client` · **Mode:** `needs-interactive` (Mode D) · **Scope:** [REDESIGN] · execution skill: `pastiche`

### Files

- Replace: `src/app/(main)/about/members/page.js` → `page.tsx`
- Replace: `src/app/(main)/about/credits/page.tsx` (already TSX; full rewrite)
- Pastiche may refactor `MemberCard` and the credits card component under `src/features/about-page/`

### Scope (descriptive)

Two pages that **present people** — KISA's leadership cohort and the dev team that built the site. Different audiences (members = whole org, credits = dev team) but the same composition pattern: a year-picker dropdown that swaps the displayed cohort.

#### `/about/members` — 학생회 조직도

- **Content surfaces:** page title (`{year} Board`), year-picker dropdown (currently `25-26` / `24-25` / `23-24`), grid of `MemberCard`s grouped by section (presidents, operations, public_relations).
- **Data:** static, from `src/features/about-page/data/memberPageData.ts` — exports `members_2025`, `members_2024`, `members_2023`, each with `presidents`, `operations`, `public_relations` arrays. Each member has `name`, `major`, `year`, `role`.
- **Interactivity:** year-picker swaps the rendered cohort. Default to most recent year.

#### `/about/credits` — 개발팀 소개

- **Content surfaces:** page title (Credits), one-line tagline (`umichkisa.com` was developed using Next.js + Python Flask), year-picker dropdown, grid of contributor cards. Each contributor card has name, email, role, description, optional GitHub/LinkedIn links, mailto.
- **Data:** static, from `src/features/about-page/data/memberCreditData.ts` — exports `credits_2025`, `credits_2024`, `credits_2023`. Each record: `name`, `email`, `role`, `description`, optional `github`, `linkedin`.
- **Interactivity:** year-picker swaps the rendered cohort. Default to most recent year.

### Logic spec

- **Both pages are client components** (`"use client"`) because of the year-picker `useState`. Acceptable.
- **Year-picker:** currently uses NextUI `<Select>` from `@nextui-org/react`. **Replace with DS Select.** If DS Select is missing, file `ds-fix-during-migration` and bail to `needs-decision` — do not keep NextUI.
- **Default-year logic:** sort year keys descending, pick first. Preserve.
- **Members grouping:** `presidents → operations → public_relations` order is significant (org chart order). Preserve.
- **Credits social icons:** GitHub / LinkedIn / mailto. Existing icons live at `@/components/ui/icon` (`GitIcon`, `LinkedInIcon`, `EmailIcon`). Preserve presence; pastiche may re-style the icon row.
- **mailto link:** `href={\`mailto:${person.email}\`}` — preserve; do not turn into a copy-to-clipboard button without grill-time approval.
- Drop all `sejongHospitalBold/Light` className; DS `type-*` only.

### Pastiche brief

The composition (page title + year-picker + grid of people cards) is correct as a pattern, but the existing card visual (rounded-lg shadow, gray gradient bg) and the year-picker chrome (NextUI bordered radius="full") are pastiche's call to redesign. Pastiche may unify the two pages' card surface (members and credits could share a `PersonCard` or stay separate — pastiche decides).

### Tasks

- [ ] Worktree off `origin/dev`
- [ ] Read `memberPageData.ts` and `memberCreditData.ts` to lock data schemas
- [ ] Invoke `pastiche` skill with both pages
- [ ] Replace NextUI `<Select>` with DS Select (file ds-fix if missing)
- [ ] Triage pastiche markers + follow-ups
- [ ] `npm run typecheck` + `npm run build` pass
- [ ] Suggest `review-ui-on-browser` post-pastiche; verify year-picker swap on both pages
- [ ] Mode D ship after user confirmation

### Acceptance criteria

- [ ] Both pages render at desktop + mobile
- [ ] Year-picker swaps cohort on both pages without page reload; default = most recent year
- [ ] Members rendered in `presidents → operations → public_relations` order
- [ ] Credits cards show GitHub (when present), LinkedIn (when present), and mailto
- [ ] No `@nextui-org/react` imports remain in either file (or in any component the pages render)
- [ ] No `sejongHospital*` className usage remains
- [ ] `npm run typecheck` + `npm run build` pass

### Non-goals

- Editing the data files
- Adding a CMS for member/credits data
- Server-fetching members from a backend (data is static)

### Bailout triggers

- DS lacks a `<Select>` atom that can replace NextUI `<Select>` → `ds-fix-during-migration`, then `needs-decision`
- DS lacks card primitives that pastiche needs for the people grid → `ds-fix-during-migration`

### Budget

~2 hours (two pages + NextUI rip-out).

---

## Lane 6.4 — About: rule + sponsor

**Repo:** `KISA-website-client` · **Mode:** `needs-interactive` (Mode D) · **Scope:** [REDESIGN] · execution skill: `pastiche`

### Files

- Replace: `src/app/(main)/about/rule/page.js` → `page.tsx`
- Replace: `src/app/(main)/about/sponsor/page.tsx` (already TSX; full rewrite)
- Pastiche may refactor `SponsorBanner` under `src/features/about-page/`

### Scope (descriptive)

Two static pages — governance and funding — paired because both are "about KISA's institutional surface."

#### `/about/rule` — 회칙

- **Content surfaces:** page title (회칙), 12 articles (제1조 through 제12조) of Korean legal-style governance text. Each article has a heading (e.g., `제1조 (명칭)`) and body. Currently rendered as one long paragraph block with `<br />`s.
- **Data:** the article text is **inline in the JSX** today. For redesign, pastiche may either keep it inline (acceptable for static legal copy) or extract to a `rulePageData.ts` records file (`{ id, label, body }[]`). Pastiche's call.
- **Auth:** public.
- **No interactivity.**

#### `/about/sponsor` — 스폰서 소개

- **Content surfaces:** page title (스폰서 소개), grid of sponsor banners.
- **Data:** static, from `src/features/home-sponsor/data/sponsorData.ts`. Each sponsor record currently includes a `division` field (Gold / Silver / Bronze) — present but **unused** by the current page (a commented-out tier-grouped layout exists in the source). Pastiche may keep the flat grid or honor `division` to render tiered groups; either is acceptable.
- **Auth:** public.

### Logic spec

- Both static RSCs.
- `/about/rule` ships `metadata` already (currently has it); preserve.
- `/about/sponsor` does not ship `metadata` today — **add it** in the redesign.
- Rip out `sejongHospitalBold/Light` className usage; DS `type-*` only.
- The `groupByDivision` helper currently in `/about/sponsor/page.tsx` is dead (never used). Pastiche either deletes it or wires it up — no half-state.

### Pastiche brief

Rule page is **the highest-density Korean prose** in the phase. Typography choices matter — line height, paragraph spacing, article-heading hierarchy, indentation conventions for legal-style enumeration (가/나/다, 제1항). Pastiche may also restructure each article into a card or accordion item if it improves scanability — design judgment call. Sponsor page is the inverse: image-heavy grid where typography is minimal. Two distinct treatments, one lane.

### Tasks

- [ ] Worktree off `origin/dev`
- [ ] Invoke `pastiche` with both pages
- [ ] Decide rule-page data shape (inline vs extracted records) during pastiche
- [ ] Add `metadata` to new `/about/sponsor/page.tsx`
- [ ] Triage pastiche markers + follow-ups
- [ ] `npm run typecheck` + `npm run build` pass
- [ ] Suggest `review-ui-on-browser` post-pastiche; verify article enumeration legibility on both desktop + mobile
- [ ] Mode D ship after user confirmation

### Acceptance criteria

- [ ] `/about/rule` renders all 12 articles with no missing text vs the current source
- [ ] `/about/sponsor` renders every sponsor in `sponsorData.ts`
- [ ] Both pages ship `metadata`
- [ ] Old `.js` deleted (rule); no `sejongHospital*` className; no dead `groupByDivision` helper
- [ ] `npm run typecheck` + `npm run build` pass

### Non-goals

- Editing rule article text or sponsor data
- Wiring sponsor `division` to a real tier display unless pastiche elects (then it must be complete, not commented out)

### Bailout triggers

- DS lacks an Accordion primitive if pastiche elects to render the rule page as accordion → `ds-fix-during-migration`

### Budget

~2 hours.

---

## Lane 6.5a — MSW: boards/everykisa handlers + fixtures

**Repo:** `KISA-website-client` · **Mode:** `autonomous-ready` (cron routine) · **Scope:** [MECHANICAL][TDD] · execution skill: `executing-plans`

### Files

- New: `src/mocks/handlers/boards.ts`
- New: `src/mocks/fixtures/boards.ts` (or co-locate fixtures inside the handler file — match existing `pocha.ts` / `users.ts` convention; read those before authoring)
- New: `src/mocks/handlers/__tests__/boards.test.ts`
- Modify: `src/mocks/handlers/index.ts` — register `boardsHandlers`

### Endpoint contract

Read at impl: `src/apis/boards/queries.ts` (105 LoC) and `src/apis/boards/swrHooks.ts` (175 LoC) for the **exact** axios call shapes. Tested against the SWR keys.

The 3 endpoints to mock:

| Route | Method | Returns | Used by |
|---|---|---|---|
| `/boards/:boardType/posts/?size={size}&page={page}` | GET | `{ results: SimplePost[] }` (page 0-indexed) | Paginated board listing |
| `/boards/:boardType/announcements/` | GET | `{ results: SimplePost[] }` | Pinned announcements per board |
| `/boards/:boardType/count/` | GET | `{ postCount: number }` | Pagination total |

`SimplePost` shape (verified from `src/types/post.ts`): `postid`, `title`, `created`, `type` (BoardType), `fullname`, `email`, `readCount`, `commentsCount`, `anonymous` (boolean), `likesCount`.

`BoardType` enum (verified from `src/types/board.ts`) has **10 values**, not 9: 5 boards (`announcement`, `buyandsell`, `housing`, `job-announcement`, `sponsor`) + 5 everykisa (`academic`, `career`, `community`, `concern`, **`livingqa`**). The `LivingQA = "livingqa"` value exists in the enum but **no `/everykisa/livingqa` page exists yet** in the route tree. Fixture must cover all 10 board values; the missing route is filed as a Phase-7 follow-up. Current code routes everykisa pages through the same `getBoardAnnouncements(boardType)` call, suggesting one shared endpoint with `boardType` discriminator. **Verify at impl** that everykisa values share the same family.

### Fixture requirements

- At least **20 posts per board type** in the paginated `posts` fixture (covers `size=10` page 0 and page 1 with leftovers). All **10 board types** including `LivingQA` (route may not exist yet but the fixture must accept the discriminator).
- At least **2 announcements per board type** in the `announcements` fixture.
- **Anonymous flag:** every everykisa board fixture has at least one record with `anonymous: true` and at least one with `anonymous: false`. Boards (non-everykisa) all have `anonymous: false`. This honors the everykisa-only anonymity rule.
- Every fixture record includes the `likesCount` field (per `SimplePost` shape).
- Fixture deterministic — same seed produces same records (use a static dataset, not `Math.random()`).
- Reuse fixture posts across lanes 6.5b/c/d where the same `postid` is referenced.

### TDD outline

The lane is `[TDD]`; tests drive the handler. Pattern (mirror `src/mocks/handlers/__tests__/users.test.ts`):

1. Test that GET `/boards/announcement/posts/?size=10&page=0` returns 10 records, all `type: "announcement"`.
2. Test pagination: `?size=10&page=1` returns the next slice.
3. Test announcements endpoint returns the announcements fixture for a given board type.
4. Test count endpoint returns the right number for a given board type.
5. Test everykisa community board returns mixed anonymous/non-anonymous records.

### Tasks

- [ ] Branch off `dev` (`ds-client-migration/phase-6/6.5a-msw-boards`)
- [ ] Read `apis/boards/{queries,swrHooks}.ts` + `types/{post,board}.ts` to lock the request/response shapes
- [ ] Read `mocks/handlers/users.ts` and `pocha.ts` for the project's MSW handler conventions
- [ ] Write failing tests in `__tests__/boards.test.ts` (one per endpoint + one per anon-flag invariant)
- [ ] Run tests: expect FAIL ("handlers undefined")
- [ ] Author fixtures (`fixtures/boards.ts` or inline) — at least 20 posts × 9 board types, anon flags per the requirements above
- [ ] Author handlers (`handlers/boards.ts`) — 3 endpoints
- [ ] Register `boardsHandlers` in `mocks/handlers/index.ts`
- [ ] Run tests: expect PASS
- [ ] `npm run build` + `npm run typecheck` + `npm test` pass
- [ ] Run `ds-client-review` agent on touched files
- [ ] Push branch; PR template per AP §5

### Acceptance criteria

- [ ] 3 endpoints mocked; all `apis/boards/*` calls succeed in mock mode
- [ ] Fixture: ≥20 posts per board type; ≥2 announcements per board type
- [ ] Every everykisa board fixture includes both `anonymous: true` and `anonymous: false` records
- [ ] No board (non-everykisa) fixture record has `anonymous: true`
- [ ] All tests pass; `npm run build` + `npm run typecheck` pass
- [ ] No real-API smoke required this lane (deferred to 6.17 + ship-to-prod)

### Non-goals

- Posts, comments, likes endpoints (other 6.5 lanes)
- Backend integration smoke
- Search / filter endpoints (none exist on the client today)

### Bailout triggers

- `everykisa` endpoint shape diverges from boards (e.g., separate `/everykisa/:category/posts/` route) → expand lane to cover both, document the divergence in the PR
- `BoardType` enum has new values not in the audit list → `needs-decision`

### Budget

~90 min.

---

## Lane 6.5b — MSW: posts CRUD handlers + fixtures

**Repo:** `KISA-website-client` · **Mode:** `autonomous-ready` · **Scope:** [MECHANICAL][TDD]

### Files

- New: `src/mocks/handlers/posts.ts`
- New (or extend `boards.ts` fixture): `src/mocks/fixtures/posts.ts`
- New: `src/mocks/handlers/__tests__/posts.test.ts`
- Modify: `src/mocks/handlers/index.ts`

### Endpoint contract

Read `src/apis/posts/queries.ts` + `mutations.ts` + `swrHooks.ts` at impl. The 5 endpoints:

| Route | Method | Body / Returns | Auth |
|---|---|---|---|
| `/posts/:postid/` | GET | returns full `Post` shape | none (public read) |
| `/posts/` | POST | body: `NewPostBody` (read `types/post.ts`); returns the created Post | Bearer token |
| `/posts/:postid/` | PATCH (note: PATCH, not PUT) | body: `UpdatePostBody`; returns updated Post | Bearer token |
| `/posts/:postid/` | DELETE | returns 200 / 204 on success | Bearer token |
| `/posts/readCount/:postid/` | PATCH | empty body; increments readCount, returns the post | none |

`Post` (verified) extends `SimplePost` with `text` (the body content) and `isAnnouncement: boolean`.

`NewPostBody` (verified): `{ type: BoardType, title, fullname, email, text, isAnnouncement, anonymous, readCount }` — note the body carries author `fullname` + `email` (client-supplied; backend may also derive from token) and an initial `readCount` (typically 0).

`UpdatePostBody` (verified): `{ type, title, text, isAnnouncement }` — note **no `anonymous`** field. Anonymity is set-once at creation time and cannot be toggled by update. The post-update form (Lane 6.9) must hide the anonymous checkbox in `mode: "update"`.

### Fixture requirements

- Reuse / extend the 6.5a posts fixture (same `postid` records). Augment with full-body content for at least **5 posts**, covering:
  - 1 boards/announcement post (admin-authored, `isAnnouncement: true`)
  - 1 everykisa anonymous post (`anonymous: true`)
  - 1 everykisa non-anonymous post
  - 1 boards/buyandsell post (regular user)
  - 1 boards/job-announcement post

- Cross-lane invariant: the postids listed in 6.5c (comments) and 6.5d (likes) fixtures **must exist** in this lane's posts fixture.

### Auth + permission rules

- **Admin-only post creation on `/boards/announcement`:** the POST handler must reject (403) requests where `body.boardType === BoardType.Announcement` if the bearer-token user is not an admin. Mirror `auth.ts`'s `kisa-mock-auth-isadmin` sessionStorage flag for the admin check.
- **Author-only update/delete:** PATCH and DELETE handlers reject (403) if the bearer-token user's email doesn't match the post's `email` (or admin override).
- **Read count:** no auth, no rejection.

### TDD outline

1. GET `/posts/:postid/` returns the full post for a known fixture id; 404 for unknown id.
2. POST `/posts/` with admin token + announcement body → 201, returns the new post; with non-admin token → 403.
3. POST `/posts/` with non-admin token + non-announcement body → 201.
4. PATCH `/posts/:postid/` with author token → 200; with non-author non-admin → 403.
5. DELETE `/posts/:postid/` with author token → 204; with admin token → 204; with neither → 403.
6. PATCH `/posts/readCount/:postid/` increments the fixture's readCount in-memory.

### Tasks

- [ ] Branch off `dev`
- [ ] Read `apis/posts/{queries,mutations,swrHooks}.ts` + `types/post.ts`
- [ ] Read `auth.ts` handler for the admin-flag pattern
- [ ] Write failing tests covering all 6 invariants above
- [ ] Author fixtures (extend boards fixture)
- [ ] Author handlers — 5 endpoints with auth gates
- [ ] Register in `index.ts`
- [ ] Tests pass; `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review` agent
- [ ] Push branch; PR

### Acceptance criteria

- [ ] 5 endpoints mocked
- [ ] Admin-only enforcement for announcement creation
- [ ] Author-only enforcement for update/delete (admin override)
- [ ] readCount increments are observable across fetches in the same session
- [ ] Cross-lane fixture postids align with 6.5c + 6.5d
- [ ] All tests pass

### Non-goals

- Boards listing endpoints (6.5a)
- Real backend integration

### Bailout triggers

- `Post` type has fields the audit didn't catch (e.g., attachments, tags) → expand fixture, document
- Backend-real auth pattern differs from sessionStorage flag (the existing `auth.ts` handler is the source of truth) → `needs-decision`

### Budget

~2 hours.

---

## Lane 6.5c — MSW: comments CRUD handlers + fixtures

**Repo:** `KISA-website-client` · **Mode:** `autonomous-ready` · **Scope:** [MECHANICAL][TDD]

### Files

- New: `src/mocks/handlers/comments.ts`
- New: `src/mocks/fixtures/comments.ts` (or co-locate)
- New: `src/mocks/handlers/__tests__/comments.test.ts`
- Modify: `src/mocks/handlers/index.ts`

### Endpoint contract

Read `src/apis/comments/queries.ts` (144 LoC) + `mutations.ts` (80 LoC) + `types/comment.ts` at impl. The 4 endpoints:

| Route | Method | Body / Returns | Auth |
|---|---|---|---|
| `/comments/:postid/` | GET | returns `Comment[]` — **nested tree** with `childComments` recursive field | none |
| `/comments/:postid/` | POST | body: `NewCommentBody`; returns created comment | Bearer token |
| `/comments/:commentid/` | PUT | body: `UpdateCommentBody`; returns updated | Bearer token |
| `/comments/:commentid/` | DELETE | returns `{ success: true, message }` (or 204) | Bearer token |

`Comment` shape (from existing commented-out mock in `queries.ts`): `commentid`, `postid`, `email`, `fullname`, `text`, `isCommentOfComment`, `parentCommentid`, `created`, `anonymous`, `childComments: Comment[]`.

### Fixture requirements

- Per `feedback_msw_full_crud`: full CRUD enumeration — every operation the UI exercises must be mockable.
- **Nested comment tree** — at least one fixture postid has a 3-level comment tree (root → child → grandchild) to exercise the recursive render.
- **Anonymous flag honored end-to-end** — comments on everykisa-board postids include both `anonymous: true` and `anonymous: false` records; comments on non-everykisa boards must have `anonymous: false` only.
- **Cross-lane:** every `postid` referenced here must exist in 6.5b's posts fixture. Coordinate via shared fixture file or import.

### Auth + permission rules

- Author-only update/delete (mirror posts).
- Anonymous flag on creation: client sends `anonymous: true`; handler echoes back, but **only honors it if the post's board is everykisa**. If a non-everykisa post receives `anonymous: true`, the handler stores `anonymous: false` (silent normalization or 400 — match current backend behavior; default to silent normalization with a comment in the handler).

### TDD outline

1. GET returns nested tree with `childComments` populated.
2. POST creates a comment under a postid; appears in subsequent GET.
3. POST with `anonymous: true` on an everykisa postid → stored as anonymous.
4. POST with `anonymous: true` on a non-everykisa postid → stored as `anonymous: false` (normalized).
5. PUT updates `text` only; preserves children.
6. DELETE removes the comment; verify subsequent GET no longer includes it (or marks as deleted — match backend; if unsure, just remove).

### Tasks

- [ ] Branch off `dev`
- [ ] Read `apis/comments/*` + `types/comment.ts`
- [ ] Failing tests for all 6 invariants
- [ ] Fixture with 3-level nested tree on at least one postid; mixed anon flags on everykisa postids
- [ ] Handlers — 4 endpoints with auth gates and anon-flag normalization
- [ ] Register in `index.ts`
- [ ] Tests pass; `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review`
- [ ] Push branch; PR

### Acceptance criteria

- [ ] 4 endpoints mocked
- [ ] Nested tree rendered via recursive `childComments`
- [ ] Anonymous-flag honoring per board family
- [ ] Cross-lane fixture postids align with 6.5b
- [ ] Tests pass

### Non-goals

- Comment likes (Lane 6.5d covers via likes endpoints)
- Mention/notification side-effects

### Bailout triggers

- Comment tree depth limit unclear → assume unlimited; document
- `Comment` type diverges from the audit's commented-out mock → re-derive from real `types/comment.ts`, document

### Budget

~2 hours.

---

## Lane 6.5d — MSW: likes handlers + fixtures

**Repo:** `KISA-website-client` · **Mode:** `autonomous-ready` · **Scope:** [MECHANICAL][TDD]

### Files

- New: `src/mocks/handlers/likes.ts`
- New: `src/mocks/fixtures/likes.ts`
- New: `src/mocks/handlers/__tests__/likes.test.ts`
- Modify: `src/mocks/handlers/index.ts`

### Endpoint contract

Read `src/apis/likes/queries.ts` + `mutations.ts` + `types/like.ts` at impl. The 5 endpoints:

| Route | Method | Body / Returns | Auth |
|---|---|---|---|
| `/likes/:id/?email={email}&target={post\|comment}` | GET | returns whether user liked the target | Bearer token |
| `/posts/likes/:postid/` | GET | `{ likesCount: number }` | none |
| `/comments/likes/:commentid/` | GET | `{ likesCount: number }` | none |
| `/likes/:id/` | POST | body: `NewLikeBody` (`{ email, target: "post" \| "comment" }`); returns created | Bearer token |
| `/likes/:id/?email={email}&target=...` | DELETE | returns `{ success, message }` | Bearer token |

The `target` discriminator routes a like to either a post (`id` = postid) or a comment (`id` = commentid).

### Fixture requirements

- Likes fixture is a flat list keyed by `(target, id, email)` — represent as either a `Like[]` array or a `Map`. Pick whichever pattern the existing handler convention prefers.
- Cover: at least 3 posts with likes from at least 2 distinct users; at least 2 comments with likes.
- Cross-lane: likes' `postid`s must exist in 6.5b posts fixture; `commentid`s must exist in 6.5c comments fixture.

### TDD outline

1. GET `/likes/:postid/?email=&target=post` returns truthy when the user has liked, falsy otherwise.
2. GET `/posts/likes/:postid/` returns the count.
3. POST `/likes/:postid/` with body `{ email, target: "post" }` adds a like; subsequent GET reflects it; count increments.
4. DELETE removes the like; count decrements.
5. Toggling (POST then DELETE) returns the count to its pre-toggle value.

### Tasks

- [ ] Branch off `dev`
- [ ] Read `apis/likes/*` + `types/like.ts`
- [ ] Failing tests for all 5 invariants
- [ ] Fixture with cross-lane-aligned ids
- [ ] Handlers — 5 endpoints with auth gates
- [ ] Register in `index.ts`
- [ ] Tests pass; `npm run build` + `npm run typecheck` pass
- [ ] `ds-client-review`
- [ ] Push branch; PR

### Acceptance criteria

- [ ] 5 endpoints mocked
- [ ] Toggle invariant holds (count returns to baseline)
- [ ] `target` discriminator correctly routes to post vs comment likes
- [ ] Cross-lane fixture ids align with 6.5b/c
- [ ] Tests pass

### Non-goals

- Like notifications/side-effects
- Bulk-like endpoints (none exist)

### Bailout triggers

- `LikeBody` type has fields the audit didn't catch → expand fixture, document

### Budget

~90 min.

---

## Lane 6.6 — Boards/everykisa template + `/boards/announcement` reference

**Repo:** `KISA-website-client` · **Mode:** `needs-interactive` (Mode D) · **Scope:** [REDESIGN] · execution skill: `pastiche` (preceded by `grill-me` for capability flag set)
**Blocked by:** 6.5a

### Files

- New: `src/features/bulletin-board/components/board/BoardTemplate.tsx` (or naming pastiche prefers; the **shared list-view template**)
- New: `src/features/bulletin-board/config/boardCapabilities.ts` — per-route capability config (9 entries)
- Replace: `src/app/(main)/boards/announcement/page.tsx` — migrate to template as **reference implementation**
- Modify (light): `src/app/(main)/boards/layout.tsx` — confirm `import "./board.css"` removal once template absorbs the CSS rules; `everykisa/layout.tsx` likewise
- Pastiche may refactor `BoardBar`, `BoardClient` as needed, including delete-and-replace

### Scope (descriptive)

The current 9 board pages (5 boards, 4 everykisa) are nearly byte-identical: each is a thin server component that calls `getBoardAnnouncements(boardType)` and renders `<BoardBar>` + `<BoardClient>`. The redesign extracts a **shared, capability-flag-driven template**. `/boards/announcement` is migrated as the **reference**: it's the most constrained surface (admin-post-only + comments-disabled), so if the template handles it, the other 8 fan-out targets fall in line.

#### Capability flags (locked in audit Q11; verify at grill-time)

The template accepts a config per route and renders accordingly:

| Flag | Type | What it controls |
|---|---|---|
| `allowAnonymousPost` | boolean | Whether the "create post" affordance shows an "anonymous?" checkbox (true = everykisa only) |
| `allowAnonymousComment` | boolean | Whether comment composer offers anonymous (true = everykisa only) |
| `commentsEnabled` | boolean | Whether comments render at all on detail pages from this board (false = boards/announcement) |
| `adminPostOnly` | boolean | Whether the "create post" affordance is hidden for non-admin users (true = boards/announcement) |

Per-route config example (the file's full content):

```ts
// boardCapabilities.ts (sketch — pastiche locks final shape)
export const boardCapabilities: Record<BoardType, BoardCapability> = {
  [BoardType.Announcement]:    { allowAnonymousPost: false, allowAnonymousComment: false, commentsEnabled: false, adminPostOnly: true },
  [BoardType.BuyAndSell]:      { allowAnonymousPost: false, allowAnonymousComment: false, commentsEnabled: true,  adminPostOnly: false },
  [BoardType.Housing]:         { allowAnonymousPost: false, allowAnonymousComment: false, commentsEnabled: true,  adminPostOnly: false },
  [BoardType.JobAnnouncement]: { allowAnonymousPost: false, allowAnonymousComment: false, commentsEnabled: true,  adminPostOnly: false },
  [BoardType.Sponsor]:         { allowAnonymousPost: false, allowAnonymousComment: false, commentsEnabled: true,  adminPostOnly: false },
  [BoardType.Academic]:        { allowAnonymousPost: true,  allowAnonymousComment: true,  commentsEnabled: true,  adminPostOnly: false },
  [BoardType.Career]:          { allowAnonymousPost: true,  allowAnonymousComment: true,  commentsEnabled: true,  adminPostOnly: false },
  [BoardType.Community]:       { allowAnonymousPost: true,  allowAnonymousComment: true,  commentsEnabled: true,  adminPostOnly: false },
  [BoardType.Concern]:         { allowAnonymousPost: true,  allowAnonymousComment: true,  commentsEnabled: true,  adminPostOnly: false },
  [BoardType.LivingQA]:        { allowAnonymousPost: true,  allowAnonymousComment: true,  commentsEnabled: true,  adminPostOnly: false },
};
```

(Pastiche may rename fields, but the 4-flag matrix and the per-board values are fixed. `LivingQA` is included for completeness — the enum has it even though no `/everykisa/livingqa` page exists in the route tree today; the capability entry guards future page authoring.)

#### Template inputs (props)

The page-level call site stays a thin RSC; the template is the workhorse:

```tsx
// pages/boards/announcement/page.tsx (sketch)
export default async function AnnouncementPage({ searchParams }) {
  const boardType = BoardType.Announcement;
  const announcements = await getBoardAnnouncements(boardType);
  return <BoardTemplate
    boardType={boardType}
    capability={boardCapabilities[boardType]}
    announcements={announcements}
    size={searchParams.size ? Number(searchParams.size) : 10}
    page={searchParams.page ? Number(searchParams.page) : 1}
  />;
}
```

Pastiche owns the internals of `BoardTemplate` — the page header, search bar, pagination, "create post" CTA gating, table vs cards layout, mobile collapse. The audit's "table" choice is **not** binding; pastiche may pick cards, list rows, or hybrid.

#### What the template surfaces

- Board title + subtitle (some boards have them, some don't — read the existing per-board page sources to enumerate; this is the only route-specific copy beyond `boardType`)
- Search/filter affordance (current `BoardBar` does this; preserve the search-by-title query)
- Announcements section (pinned posts at top — consumes the `announcements` prop)
- Paginated post list (consumes the SWR hooks against the boards endpoints)
- "Create post" CTA — gated by `capability.adminPostOnly` + auth state
- Empty state (board has no posts yet)

#### `/boards/announcement` reference migration

- Current page: 47 LoC; reads `getBoardAnnouncements` (note: the announcement board fetches the announcements **as the main feed**, not as pinned posts on top — verify current code semantics at impl, may need to call `getBoardPosts` instead for the main feed and treat announcements as the whole list).
- Migrated page: ~10 LoC RSC delegating to `BoardTemplate`.
- "Create post" CTA must be hidden for non-admin (template enforces via `adminPostOnly` flag).
- Comments must not render on the detail pages reached from this board (template threads `commentsEnabled: false` to detail-page CTA visibility — actual comment-rendering gate also lives in Lane 6.8).

### Logic spec

- Template must be a **client component** if it owns search/pagination/SWR. The page wrapping it can stay an RSC that prefetches the announcements.
- Search-by-title query in the URL: preserve the current querystring contract (read existing `BoardBar` to confirm).
- Pagination URL contract: `?size={10|20|30}&page={n}` (1-indexed in the URL but 0-indexed in the API call per `getBoardPosts` comment).
- The `import "./board.css"` in `boards/layout.tsx` and `everykisa/layout.tsx` is the legacy stylesheet today. The new template ships its visual rules via DS tokens — **delete `board.css`** in this lane and remove both imports.
- Admin gate for `adminPostOnly`: read `useAdmin` (existing hook) — match Phase 5 admin gate behavior.

### Pastiche brief

This lane defines the visual language for every list view in the phase. 8 fan-out sub-lanes (6.7) inherit it. Grill-me first to lock the capability flag set (rule discovery → has the user noticed a 4th flag we missed?) and the table-vs-card decision. Pastiche **may discard** the existing `BoardBar` + `BoardClient` + `BoardTitle` + `board.css` composition entirely.

### Tasks

- [ ] Worktree off `origin/dev`
- [ ] Run `grill-me` to: (a) lock the capability flag set against all 9 board configs, (b) decide table vs cards vs hybrid, (c) lock the search/filter UX, (d) lock create-post-CTA placement, (e) decide whether announcements feed and main feed are the same on `/boards/announcement`
- [ ] Read `apis/boards/swrHooks.ts` to enumerate the SWR keys the template will use
- [ ] Invoke `pastiche` skill with grill output as overlay
- [ ] Author `boardCapabilities.ts` with all 9 entries
- [ ] Migrate `/boards/announcement/page.tsx` to consume the template
- [ ] Delete `boards/layout.tsx` + `everykisa/layout.tsx` `import "./board.css"` lines; delete `board.css` itself
- [ ] Verify: in mock mode (after 6.5a lands), `/boards/announcement` renders the announcement feed, hides the create-post CTA for non-admin, shows it for admin
- [ ] Triage pastiche markers + follow-ups
- [ ] `npm run typecheck` + `npm run build` pass
- [ ] Suggest `vercel-react-best-practices` + `review-ui-on-browser` post-pastiche
- [ ] Mode D ship after user confirmation

### Acceptance criteria

- [ ] `BoardTemplate` is the single shared list view; the 9 page files consume it
- [ ] `boardCapabilities.ts` has all 9 entries with the exact flag values from the matrix above
- [ ] `/boards/announcement` migrated and behaves correctly: admin sees create-post CTA, non-admin doesn't
- [ ] `board.css` deleted; both layout `import "./board.css"` lines gone
- [ ] Search and pagination URL contracts unchanged
- [ ] No `sejongHospital*` className usage remains
- [ ] `npm run typecheck` + `npm run build` pass

### Non-goals

- The other 8 list views (Lane 6.7)
- Detail page (`/posts/[postid]`) — Lane 6.8 enforces `commentsEnabled` on render
- Create form — Lane 6.9 enforces `adminPostOnly` server-side too

### Bailout triggers

- Grill discovers a 5th capability flag (e.g., post-attachment, image-required) → expand the matrix and document; do not silently extend
- `getBoardAnnouncements` semantics on the announcement board diverge from main-feed semantics (e.g., the board has a separate "regular posts" list) → `needs-decision`
- DS lacks the right list/table/card primitives that pastiche needs → `ds-fix-during-migration`

### Budget

~3 hours including grill (template defines downstream).

### Expected diff summary

~6 files, ~500 LoC added (template) + ~200 LoC removed (board.css + per-page boilerplate dedupe). Net positive but consolidating.

---

## Lane 6.7 — Boards/everykisa fan-out (8 sub-lanes)

**Repo:** `KISA-website-client` · **Mode:** `autonomous-ready` (per sub-lane) · **Scope:** [POLISH] · execution skill: `executing-plans`
**Blocked by:** 6.6

8 sub-lanes, one per remaining list view. Each is a **pure config wiring** task — no design decisions, no template extension. Each sub-lane is its own GitHub issue (label: `lane:6.7-{slug}`).

### Sub-lanes

| ID | Page | BoardType |
|---|---|---|
| 6.7-buyandsell        | `/boards/buyandsell`        | `BoardType.BuyAndSell` |
| 6.7-housing           | `/boards/housing`           | `BoardType.Housing` |
| 6.7-job-announcement  | `/boards/job-announcement`  | `BoardType.JobAnnouncement` |
| 6.7-sponsor-board     | `/boards/sponsor`           | `BoardType.Sponsor` |
| 6.7-academic          | `/everykisa/academic`       | `BoardType.Academic` |
| 6.7-career            | `/everykisa/career`         | `BoardType.Career` |
| 6.7-community         | `/everykisa/community`      | `BoardType.Community` |
| 6.7-concern           | `/everykisa/concern`        | `BoardType.Concern` |

### Per-sub-lane scope (identical pattern)

Each sub-lane:

1. Replaces the existing `page.tsx` with a thin RSC that delegates to `BoardTemplate` (the Lane 6.6 reference is the model).
2. Verifies the page uses the right `boardType` enum and the matching `boardCapabilities` entry.
3. Smokes the page in mock mode at desktop + mobile.
4. **Does not** touch `BoardTemplate`, `boardCapabilities`, or any feature-level component.

### Tasks per sub-lane

- [ ] Branch off `dev` (`ds-client-migration/phase-6/6.7-{slug}`)
- [ ] Replace the page file with the template-delegating version
- [ ] Verify board.css is already gone (Lane 6.6); no per-page CSS imports
- [ ] `npm run typecheck` + `npm run build` pass
- [ ] `ds-client-review` agent
- [ ] Push branch; PR

### Acceptance criteria (per sub-lane)

- [ ] Page file is ≤15 LoC (RSC + delegation)
- [ ] Renders correctly in mock mode at 1280px and 375px
- [ ] No design drift vs the Lane 6.6 reference (audit-after Lane 6.16 catches drift)
- [ ] No `BoardTemplate` or `boardCapabilities` modifications

### Bailout triggers (per sub-lane)

- Page exposes a UI need not covered by `BoardTemplate` (e.g., `/boards/sponsor` wants a tier-grouped view) → bail to `needs-decision`; revisit `BoardTemplate` extension or carve a separate lane
- `BoardTemplate` has a regression discovered by this fan-out → re-grill 6.6, do not patch in the sub-lane

### Budget per sub-lane

~30 min. Total fan-out budget ~4 hours wall-clock if 8-way parallel.

---

## Lane 6.8 — Post detail + delete

**Repo:** `KISA-website-client` · **Mode:** `needs-interactive` (Mode D) · **Scope:** [REDESIGN] · execution skill: `pastiche`
**Blocked by:** 6.5b, 6.5c, 6.5d

### Files

- Replace: `src/app/(main)/posts/[postid]/page.tsx` (the post-view client component)
- Replace: `src/app/(main)/posts/delete/[board]/[postid]/page.tsx` (delete confirm)
- Replace: `src/app/(main)/posts/[postid]/layout.tsx` if needed (verify scope)
- Pastiche may refactor `PostView`, `CommentsView`, `BoardTitle`, `PostDeleteClient` under `src/features/bulletin-board/`

### Scope (descriptive)

#### `/posts/[postid]` — post detail

Logic-heavy lane: post body, nested comments thread, like-toggle (post + per-comment), anon flag rendering, admin-only-delete affordance.

**Content surfaces:**
- Board title (current `<BoardTitle boardType={post.type} size="small" />`) — preserve breadcrumb-style indicator of which board this post lives in.
- Post body: title, author display (name OR "익명" when `anonymous: true`), created timestamp, read count, like count, post body (rich text from the editor), like-toggle action, edit/delete actions (gated).
- Comment thread (when `capability.commentsEnabled`): nested tree, anon-aware author display, per-comment like, reply, edit, delete actions (gated).
- Comment composer (when commentsEnabled + authenticated): text input + submit + (everykisa only) "anonymous" checkbox.

**Capability gating:**
- Read `boardCapabilities[post.type]` (Lane 6.6 deliverable). If `commentsEnabled === false`, do **not** render the comment thread or composer — the section simply doesn't exist on the page.
- Special case from current code: a post titled with `"스터디 그룹 모집"` (study-group prefix) on the announcement board allows comments even when the board doesn't. Preserve via `studyGroupPost` derived flag (current line 49–50 logic).
- Edit affordance: gated to author email match (`session.user.email === post.email`) or admin.
- Delete affordance: gated to author OR admin. Delete navigates to `/posts/delete/[board]/[postid]`.

**State management:**
- Current page is CSR + SWR (`usePost(Number(postid))`). Preserve the rendering method.
- Like-toggle uses optimistic update: click → flip the local liked-state and increment/decrement count immediately, then POST/DELETE; rollback on error.
- Comments use `CommentsProvider` context (existing) with `{ session, isAuthenticated, isEveryKisa, postid, postAuthorEmail }`. Preserve the contract; pastiche may rename or rework the inside.
- Anon comment in everykisa: composer's anonymous checkbox is only visible when `isEveryKisa === true`.

**Edge states:**
- Loading: `LoadingSpinner`-equivalent (from DS feedback surface)
- Error / 404: `NotFound`-equivalent (from DS feedback surface)
- Auth: page itself is public; gated actions (edit, delete, like, comment) require auth — show login CTA inline where the gated affordance would be, or hide entirely (pastiche call).

#### `/posts/delete/[board]/[postid]` — delete confirm

Tiny page (currently 26 LoC). Confirms intent, fires `deletePost` via `PostDeleteClient`, redirects to the appropriate board.

- **Content surface:** confirmation prompt ("게시물을 삭제하시겠습니까?"), confirm button, cancel button.
- **Logic:** on confirm, call `deletePost` mutation with bearer token; on success, navigate to `/boards/{board}` or `/everykisa/{board}` (read existing PostDeleteClient for redirect behavior). Pastiche may inline the existing component or refactor.
- **Auth:** server-side `getServerSession`; if no session, redirect to signin with callbackUrl.
- **Permission:** if user is not author + not admin, show `<NotAuthorized />`. **Verify** in current code whether the page does this gate or whether the API rejects it server-side; if missing on the page, add it (per audit Risk 4).
- **Redesign call:** pastiche decides whether this is a full page or a Dialog overlay. If Dialog, route may stay (with the dialog auto-opening on mount over the source page) or redesign as a non-route action; the URL `/posts/delete/[board]/[postid]` must continue to function so existing inbound links don't break. Pastiche grill-time call.

### Logic spec

- `usePost(postid)` SWR hook → preserve the contract; if pastiche changes hook signatures, update all call sites in the lane.
- `getCommentsByPostid(postid)` GET (Lane 6.5c) drives the comment thread.
- `getLikeByUser(id, { email, target }, token)` + `getPostLikesCount(postid)` (Lane 6.5d) drive the like state.
- `incrementReadCount(postid)` should fire once on mount (current Phase 5-era code has it; verify).
- `CommentsProvider` API: `{ session, isAuthenticated, isEveryKisa, postid, postAuthorEmail }`. Preserve.
- `studyGroupPost` derivation: `post?.postid === 368 || post?.title.startsWith("스터디 그룹 모집")` — preserve until backend ships a real "isStudyGroup" flag.
- `canComment = !post?.isAnnouncement && !isAnnouncementBoard(post?.type)` — preserve; combined with `studyGroupPost` overrides `commentsEnabled` for the study-group exception.
- `isEveryKisaBoard(post?.type)` and `isAnnouncementBoard(post?.type)` utility functions live in `@/utils/formats/boardType` — preserve.

### Pastiche brief

This is the most logic-dense REDESIGN lane. The redesign decisions: post-body header layout (title/meta/actions), comment thread visual (indentation, threading lines, action positions), like-toggle micro-interaction, anonymous-author chip treatment, admin-action surfacing (separate from author actions vs combined). Pastiche may discard the current `PostView` + `CommentsView` + `BoardTitle` composition entirely. The delete confirm page may become a Dialog (open on `/posts/delete/...` route) or stay a page — pastiche call.

### Tasks

- [ ] Worktree off `origin/dev`
- [ ] Run `grill-me` for: post-detail layout, comment thread visual, like-toggle interaction, delete-confirm page-vs-dialog decision, anon chip treatment
- [ ] Invoke `pastiche` skill with grill output
- [ ] Verify `commentsEnabled` capability gate honored (read `boardCapabilities` from Lane 6.6)
- [ ] Verify study-group exception still routes to comments
- [ ] Verify like-toggle optimistic update + rollback path
- [ ] Verify delete-confirm permission gate (author OR admin)
- [ ] Triage pastiche markers + follow-ups
- [ ] `npm run typecheck` + `npm run build` pass
- [ ] Suggest `vercel-react-best-practices` + `toss-frontend-fundamentals` (logic-heavy lane) post-pastiche
- [ ] Mode D ship after user confirmation

### Acceptance criteria

- [ ] `/posts/[postid]` renders post body + (gated) comments + (gated) like-toggle
- [ ] `commentsEnabled === false` boards (announcement) hide comments entirely
- [ ] Study-group post (`postid === 368` or title-prefix) shows comments even on announcement board
- [ ] Anonymous-flag rendering: everykisa post with `anonymous: true` shows "익명" instead of name
- [ ] Like-toggle optimistic update visible within 1 frame; rollback restores prior state on POST/DELETE error
- [ ] Edit affordance hidden when not author and not admin
- [ ] Delete navigates to `/posts/delete/[board]/[postid]`
- [ ] `/posts/delete/...` confirm gates on author OR admin; on confirm, calls `deletePost` and redirects to the source board
- [ ] Loading and 404 states render
- [ ] No `sejongHospital*` className; no NextUI; no native `confirm`/`alert`
- [ ] `npm run typecheck` + `npm run build` pass

### Non-goals

- Post create/update form (Lane 6.9)
- Backend integration (mocks via 6.5b/c/d)
- Notifications on like/comment

### Bailout triggers

- Capability flag set insufficient for detail-page gating (e.g., a 5th flag emerges) → bail to Lane 6.6 re-grill
- DS lacks comment-thread primitives that pastiche needs → `ds-fix-during-migration`
- Optimistic-update pattern requires a hook the codebase doesn't have → carve a tiny `useOptimisticToggle` and document it (don't reach for an external lib without grill approval)

### Budget

~3 hours.

---

## Lane 6.9 — Post create/update form

**Repo:** `KISA-website-client` · **Mode:** `needs-interactive` (Mode D) · **Scope:** [REDESIGN] · execution skill: `pastiche`
**Blocked by:** 6.5b

### Files

- Replace: `src/app/(main)/posts/create/[boardType]/page.tsx`
- Replace: `src/app/(main)/posts/update/[postid]/page.tsx`
- Pastiche may refactor `PostEditor` under `src/features/bulletin-board/components/post-create-edit/` — including a full schema redesign

### Scope (descriptive)

Two pages, one form. Create and update share the same `PostEditor` component with a `mode: "create" | "update"` discriminator (per audit Q5). Both pages currently `dynamic(() => import(PostEditor), { ssr: false })` because the editor depends on `document` (rich-text editor's browser dependency).

#### Form fields

Read `types/post.ts` `NewPostBody` and `UpdatePostBody` at impl. Expected fields based on the existing implementation:

- **Title** (required, ≤200 chars roughly)
- **Body** (rich text — current editor unspecified in audit; verify at impl whether it's TinyMCE, Tiptap, or another lib)
- **Anonymous flag** (boolean) — visible only on everykisa boards (`capability.allowAnonymousPost === true`) and only in `mode: "create"`. `UpdatePostBody` does not carry `anonymous`; hide the checkbox entirely in update mode (anonymity is set-once at creation).
- **Image attachments** (existing editor probably supports — verify)
- **Board type** is route-driven (create) or post-driven (update)

#### Mode-driven behavior

- `mode: "create"`:
  - Initial values: empty.
  - Submit: POST `/posts/` with `NewPostBody`. On success, navigate to `/posts/{newPostid}`.
  - Title prefix for the page chrome: `<BoardTitle boardType={boardType} />`.
- `mode: "update"`:
  - Initial values: fetch existing post via `getPost(postid)` (or SWR `usePost`); fill the form.
  - `searchParams.board_type` carries the source board (current code reads it). If absent, render `존재하지 않는 페이지입니다`. Preserve the early return.
  - Submit: PATCH `/posts/{postid}` with `UpdatePostBody`. On success, navigate to `/posts/{postid}`.

#### Capability + permission rules

- **`capability.adminPostOnly === true` (boards/announcement):** the create page enforces an admin gate at server-side render. Non-admin sees `<NotAuthorized />`. Preserve current behavior; if missing, add it. (Backend handler in Lane 6.5b also rejects.)
- **`capability.allowAnonymousPost === true` (everykisa):** the form shows the anonymous checkbox; otherwise hidden.
- **Auth required:** both pages require session. `getServerSession` on create; verify update has equivalent.

### Logic spec

- **Form library:** per HARNESS Form validation decision, use `@umichkisa-ds/form` (RHF + DS field components). No zod. Verify whether `@umichkisa-ds/form` exposes the field types needed (text, textarea, rich-text, file upload, checkbox); if missing, file `ds-fix-during-migration`.
- **Rich text editor:** current implementation depends on `document`. Whichever library is used, keep `dynamic(...,{ ssr: false })` or its equivalent. Pastiche may swap libraries if a DS-blessed editor exists; otherwise preserve.
- **Submit-button-disabled-while-submitting** invariant + error toast on failure.
- **Required-field validation** before submit; surface inline.
- **Back/cancel:** click should not lose work without confirmation if dirty. Use a DS Dialog (no `window.confirm`).
- **Rip native dialogs** — current `window.confirm`/`window.alert` (none in this lane today, but signup uses them) are not allowed.

### Pastiche brief

The form is logic-heavy but visually familiar. Pastiche may discard the current `PostEditor` composition. The required outputs are: a working create flow that posts to `/posts/`, a working update flow that PATCHes `/posts/:postid/`, and a single shared form schema. If `@umichkisa-ds/form` covers all field types, use it; otherwise raise the DS gap.

### Tasks

- [ ] Worktree off `origin/dev`
- [ ] Run `grill-me` for: rich-text editor decision (preserve current vs swap), form-schema field list, validation rules, dirty-state cancel UX, anon checkbox positioning
- [ ] Read `types/post.ts` `NewPostBody`/`UpdatePostBody` to lock the body shapes
- [ ] Read existing `PostEditor.tsx` to enumerate the current field list as the **preservation-floor baseline** (the redesign cannot drop a field without explicit grill-time approval)
- [ ] Invoke `pastiche` with grill output
- [ ] Verify capability gate (`adminPostOnly`) on create page renders `<NotAuthorized />` for non-admin
- [ ] Verify anon checkbox visibility per `allowAnonymousPost`
- [ ] Verify update mode prefills correctly and PATCHes
- [ ] Smoke the create→view→update→view→delete flow end-to-end in mock mode
- [ ] Triage pastiche markers + follow-ups
- [ ] `npm run typecheck` + `npm run build` pass
- [ ] Suggest `vercel-react-best-practices` + `toss-frontend-fundamentals` post-pastiche
- [ ] Mode D ship after user confirmation

### Acceptance criteria

- [ ] Create flow posts to `/posts/`; success navigates to `/posts/{newPostid}`
- [ ] Update flow PATCHes `/posts/:postid/`; success navigates to `/posts/{postid}`
- [ ] Anon checkbox visible only on everykisa boards
- [ ] Admin gate enforced on `/boards/announcement` create
- [ ] Required fields validated client-side
- [ ] Dirty-state cancel uses DS Dialog (no `window.confirm`)
- [ ] No NextUI; no `sejongHospital*`; no native dialogs
- [ ] `npm run typecheck` + `npm run build` pass

### Non-goals

- Backend integration smoke (mocks)
- Image upload pipeline beyond what current editor supports
- Comment composer (Lane 6.8)

### Bailout triggers

- `@umichkisa-ds/form` lacks rich-text or file-upload field types → `ds-fix-during-migration`, then `needs-decision` if the gap is structural
- Current rich-text editor lib has no DS-friendly successor and pastiche pushes for swap → bail to `needs-decision`, do not swap silently

### Budget

~3 hours.

---

## Lane 6.10 — Signin

**Repo:** `KISA-website-client` · **Mode:** `needs-interactive` (Mode D) · **Scope:** [REDESIGN] · execution skill: `pastiche`

### Files

- Replace: `src/app/(main)/signin/page.tsx`
- Pastiche may refactor `<NotLogin>` (verified location: `src/components/ui/feedback/NotLogin.tsx` — the entire `feedback` module is a **local component set**, not DS, comprising `LoadingSpinner`, `NotAuthorized`, `NotFound`, `NotLogin`, `OnlyMobileView`, `UnderConstruction`, `UnexpectedError`). Phase 0 did not migrate it. Pastiche may either re-style `NotLogin` in place or rebuild on top of DS atoms; if rebuilding, file `ds-fix-during-migration` if DS lacks needed primitives.

### Scope (descriptive)

`/signin` is the auth landing — a small surface (current page is 20 LoC) that shows a UMich-email-only message and the OAuth sign-in CTA via `<NotLogin callbackUrl={callbackUrl || "/"} />`.

**Content surfaces:**
- Brand-presented header (KISA identity)
- Eligibility message ("Please sign in with your UMich Google email. Using an external email may restrict access to our services.") — copy may evolve in pastiche grill
- Sign-in CTA (Google OAuth → next-auth `signIn()`)
- Sign-up redirect for new users
- `callbackUrl` query param honored on sign-in success (current behavior; preserve)

### Logic spec

- `"use client"` page that reads `searchParams.callbackUrl` and passes to the sign-in CTA.
- `signIn()` invocation comes from `next-auth/react`; do not rebuild the OAuth handshake.
- After sign-in, next-auth handles the callback URL automatically when passed.
- If user is already authenticated, redirect to `callbackUrl || "/"` — current code does **not** do this; verify with grill whether to add it.

### Pastiche brief

Small surface, but it's the first impression for any new user. Pastiche may rebuild the page from scratch. The OAuth sign-in CTA's behavior (calls `signIn()`) is fixed; everything else is open.

### Tasks

- [ ] Worktree off `origin/dev`
- [ ] Run `grill-me` (small grill: copy, brand presentation, sign-up link visibility, already-authed redirect decision)
- [ ] Invoke `pastiche`
- [ ] Verify `callbackUrl` flows through to the OAuth handshake
- [ ] Triage pastiche markers + follow-ups
- [ ] `npm run typecheck` + `npm run build` pass
- [ ] Suggest `review-ui-on-browser` post-pastiche
- [ ] Mode D ship after user confirmation

### Acceptance criteria

- [ ] `/signin` renders at desktop + mobile
- [ ] `signIn()` triggers next-auth Google OAuth handshake
- [ ] `callbackUrl` preserved through sign-in
- [ ] Sign-up link surfaced
- [ ] No `sejongHospital*`; no NextUI
- [ ] `npm run typecheck` + `npm run build` pass

### Non-goals

- next-auth provider config changes
- Email/password auth (KISA is OAuth only)

### Bailout triggers

- `<NotLogin>` is a local component (not DS) and has style drift Phase 0 didn't catch → file `ds-fix-during-migration` to migrate the feedback module

### Budget

~60 min.

---

## Lane 6.11 — Signup

**Repo:** `KISA-website-client` · **Mode:** `needs-interactive` (Mode D) · **Scope:** [REDESIGN] · execution skill: `pastiche` (preceded by `grill-me`)

### Files

- Replace: `src/app/(main)/signup/page.js` → `page.tsx`
- Replace: `src/app/(main)/signup/[name]/page.js` → `page.tsx`
- New: `src/mocks/handlers/signup.ts` (signup-related auth endpoints — see "MSW additions" below)
- Modify: `src/mocks/handlers/index.ts` — register signup handlers
- Pastiche may rebuild `RequiredFields`, `OptionalFields`, `TermConditions` under `src/features/users/components/signup/`

### Scope (descriptive)

Signup is the **heaviest form in the auth cluster** — current `signup/page.js` is ~260 LoC of state mgmt + axios calls. Step-2 (`/signup/[name]`) is a tiny welcome page.

#### `/signup` — main signup form

**Required fields:**
- `name` (한글 이름, text)
- `email` (UMich-required, must end in `@umich.edu`)
- `major` (text)
- `bornDate` (date input; client splits to year/month/day on submit)
- `gradYear` (4-digit number)

**Optional fields:**
- `linkedIn` (URL)

**Terms:**
- 개인정보 수집 약관 — must scroll to bottom + checkbox
- 웹사이트 이용 약관 — must scroll to bottom + checkbox

**Form validity:**
- Disabled until: name length > 0, email is `@umich.edu`, major non-empty, bornDate length === 10, gradYear length === 4, both terms checked.

**Submit flow:**
1. `window.confirm("한 번 생성된 로그인 정보 수정은 어렵습니다...")` → **must redesign as DS Dialog**.
2. GET `/auth/userExists/${email}` to check if user exists. Current behavior:
   - 200 → user exists, alert via `window.alert("이미 가입된 이메일입니다.")` and `window.location.href = "/"`. **Redesign as DS Toast/Dialog + Next router.**
   - non-200 (catch branch) → user does not exist, proceed to signup.
3. POST `/auth/signup/` with the userData object. On 201, `router.push(\`/signup/${name}\`)`. On error, alert "회원가입에 실패했습니다." → DS Toast.

#### `/signup/[name]` — step-2 welcome

Tiny success page (~20 LoC). Decodes the name URL param, displays "{name}님 환영합니다!", and a "로그인" button that calls `signIn()` from next-auth.

#### MSW additions (folded into this lane)

The audit's MSW lanes (6.5a–d) **do not cover the signup auth endpoints**. Signup uses two endpoints not handled by the existing `auth.ts` handler (which only mocks `/auth/isAdmin/:email`):

| Route | Method | Behavior |
|---|---|---|
| `/auth/userExists/:email` | GET | 200 if exists in fixture, 404 (or 401) otherwise |
| `/auth/signup/` | POST | 201 with the new user fixture appended (idempotent for testing) |

Co-locate handlers with `auth.ts` (or new `signup.ts` — match convention); add fixture covering both branches (`already-exists@umich.edu` returns 200; new emails return 404).

### Logic spec

- **Email constraint:** must end with `@umich.edu`. Surface inline error with the existing `errorState: "error"` pattern (or DS field-error equivalent).
- **bornDate parsing on submit:** preserve the YYYY-MM-DD split → `bornYear`, `bornMonth`, `bornDate` integer fields in the submitted payload.
- **gradYear:** 4-digit string → number on submit.
- **All native dialogs replaced with DS surfaces:**
  - `window.confirm` → DS Dialog (modal, async resolve true/false)
  - `window.alert` → DS Toast (or Dialog if intent is "blocking")
- **Term checkboxes scroll-gated:** the existing `TermConditions` component requires user to scroll to bottom of the term text before the checkbox unlocks. Preserve UX (scroll-gating is a real consent signal).
- **Sign-up success → step-2 navigation:** preserve `router.push(\`/signup/${name}\`)` (URL-encode the name).
- **Step-2 sign-in CTA:** on click, `signIn()` from `next-auth/react`. Preserve.

### Pastiche brief

The form is highly logic-bound but visually conventional. Pastiche owns: page hero / progress indicator (multi-step?), field grouping, term-conditions presentation (modal vs inline scroll-box), submit button placement, error-summary surface. Pastiche may **discard** `RequiredFields` / `OptionalFields` / `TermConditions` composition and rebuild against `@umichkisa-ds/form`. The MSW handler authoring is mechanical — happens after pastiche or in parallel.

### Tasks

- [ ] Worktree off `origin/dev`
- [ ] Run `grill-me` for: form layout, multi-step vs single-page, term-conditions UX, error-summary placement, `bornDate` UX (date picker vs text), already-exists flow UX (toast vs dialog vs page)
- [ ] Snapshot the current 5 required fields + 1 optional field + 2 terms in the lane PR description as the **preservation contract**
- [ ] Read `types/user.ts` (or wherever signup body type lives) to lock the POST body shape
- [ ] Author MSW handlers for `/auth/userExists/:email` + `/auth/signup/` — fixture covers both branches
- [ ] Invoke `pastiche` with grill output + `@umichkisa-ds/form` overlay
- [ ] Replace `window.confirm` / `window.alert` with DS Dialog/Toast
- [ ] Verify scroll-gated term checkboxes still work
- [ ] Smoke the signup flow end-to-end in mock mode (existing email → toast; new email → 201 → step-2)
- [ ] Smoke step-2 → click 로그인 → next-auth signIn flow
- [ ] Triage pastiche markers + follow-ups
- [ ] `npm run typecheck` + `npm run build` pass
- [ ] Suggest `vercel-react-best-practices` + `toss-frontend-fundamentals` post-pastiche
- [ ] Mode D ship after user confirmation

### Acceptance criteria

- [ ] All 5 required + 1 optional + 2 term-condition gates from current form preserved (or explicitly retired during grill with the user's note in lane PR)
- [ ] Email validation enforces `@umich.edu`
- [ ] bornDate splits to year/month/day on submit
- [ ] No `window.confirm` or `window.alert` calls in the new files
- [ ] `/auth/userExists/:email` returns 200 for existing fixture user, 404 for new
- [ ] `/auth/signup/` returns 201 + appends to fixture
- [ ] Step-2 page renders, "로그인" button triggers next-auth `signIn()`
- [ ] Old `.js` files deleted; both pages are `.tsx`
- [ ] No `sejongHospital*`; no NextUI
- [ ] `npm run typecheck` + `npm run build` pass

### Non-goals

- Email verification flow (out of scope; current site doesn't have one)
- Profile completion after step-2
- Real backend POST integration (mocks)

### Bailout triggers

- `@umichkisa-ds/form` cannot represent the scroll-gated term-condition pattern → carve a `ScrollGatedConsent` local component, document, do not block on DS gap
- bornDate UX requires a date picker DS atom that doesn't exist → file `ds-fix-during-migration`

### Budget

~3 hours.

---

## Lane 6.12 — Users (view + edit)

**Repo:** `KISA-website-client` · **Mode:** `needs-interactive` (Mode D) · **Scope:** [REDESIGN] · execution skill: `pastiche`

### Files

- Replace: `src/app/(main)/users/[email]/page.tsx`
- Replace: `src/app/(main)/users/edit/[email]/page.tsx`
- Pastiche may refactor `UserProfile`, `UserBoard`, `UserEditClient` under `src/features/users/components/`

### Scope (descriptive)

#### `/users/[email]` — profile view

**Content surfaces:**
- User profile card: image, fullname, major, gradYear, role/affiliation, bio (if exists)
- User board: posts authored + comments authored, with toggle between the two views

**Auth gates:**
- Layout-level: `getSession` server-side. If no session, render `<NotLogin>`.
- Business: only KISA admins (email contains `KISA_EMAIL` constant) may view profiles where the URL email contains `KISA_EMAIL`. If failed, render `<NotAuthorized>`. Preserve current logic verbatim (lines 41–45 of current source).
- Otherwise, render `<UserProfile>` + `<UserBoard>`.

#### `/users/edit/[email]` — profile edit

**Content surfaces:**
- Editable form mirroring the profile view's fields (name, major, gradYear, linkedin, image upload).

**Auth gates:**
- Layout-level: `getSession` → if no session, `<NotLogin>`.
- Business: only the user themselves can edit (`session.user.email === decodedEmail`). Otherwise, `<NotAuthorized>`. Preserve.

**Submit flow:**
- Reads existing `UserEditClient` (in features) — verify the current PUT/PATCH endpoint shape against `apis/users/*`. Existing MSW handlers at `mocks/handlers/users.ts` cover this surface (Phase 5 era).

### Logic spec

- Email param is URL-encoded; both pages decode via `decodeURIComponent`. Preserve.
- `KISA_EMAIL` constant from `@/constants/email`. Preserve.
- Profile view's posts/comments toggle: today owned by `<UserBoard>`. The toggle is local UI state; preserve. Uses existing `apis/users/swrHooks.ts` (Phase 5).
- Edit submit: PATCH or PUT against the user endpoint (verify in `apis/users/mutations.ts`). On success, redirect to `/users/[email]`.

### Pastiche brief

Two pages, shared visual language. Pastiche may re-do the profile card composition, the posts/comments toggle, and the edit-form layout. The `<UserProfile>`+`<UserBoard>` split (view) and `<UserEditClient>` (edit) are present as starting points but not binding.

### Tasks

- [ ] Worktree off `origin/dev`
- [ ] Read `apis/users/{queries,mutations,swrHooks}.ts` to lock the profile data shape and edit endpoint
- [ ] Read existing `mocks/handlers/users.ts` to confirm PUT/PATCH mock behavior
- [ ] Run light `grill-me` (profile card composition, edit form decisions)
- [ ] Invoke `pastiche`
- [ ] Verify auth + business gates render the correct fallback (`NotLogin`, `NotAuthorized`)
- [ ] Verify edit submit → success → redirect to view
- [ ] Triage pastiche markers + follow-ups
- [ ] `npm run typecheck` + `npm run build` pass
- [ ] Suggest `review-ui-on-browser` post-pastiche
- [ ] Mode D ship after user confirmation

### Acceptance criteria

- [ ] View page renders profile + posts/comments toggle
- [ ] Edit page renders form with current values prefilled
- [ ] Auth + business gates correct (KISA-email rule + own-email rule)
- [ ] Edit submit triggers user mutation; redirects to view on success
- [ ] No `sejongHospital*`; no NextUI; no native dialogs
- [ ] `npm run typecheck` + `npm run build` pass

### Non-goals

- Image upload backend (existing pipeline)
- Notifications, follow, friend graph (out of scope)

### Bailout triggers

- KISA-email business rule was tightened/loosened post-Phase-5 audit → bail to `needs-decision`
- DS lacks profile-card or avatar-upload primitives → `ds-fix-during-migration`

### Budget

~2 hours.

---

## Lane 6.13 — Info: checklist

**Repo:** `KISA-website-client` · **Mode:** `needs-interactive` (Mode D) · **Scope:** [REDESIGN] · execution skill: `pastiche`

### Files

- Replace: `src/app/(main)/info/checklist/page.js` → `page.tsx`
- Pastiche may refactor `InfoTitle`, `CheckList` under `src/features/info-page/components/`

### Scope (descriptive)

`/info/checklist` is **처음 와서 할 일** — a guided checklist for new students. Standalone shape (does **not** share with the rest of `/info/*` — those are info-template surfaces).

**Content surfaces:**
- Page title (Things to Do)
- Intro block (Korean welcome copy + caveats about year-to-year variance)
- `[Checklist]` section heading
- Accordion-driven checklist items (current `<CheckList>` component owns)

### Logic spec

- The page itself is static; the `<CheckList>` component owns interactivity (expand/collapse, optional "I did this" check state). Verify at impl whether the component persists check state (sessionStorage/localStorage) — current behavior unspecified in audit.
- Read existing `<CheckList>` source to enumerate items + nesting before pastiche.
- Page ships `metadata` (already does).

### Pastiche brief

The checklist itself is accordion-driven. Verify whether DS has an `Accordion` primitive — if missing, file `ds-fix-during-migration` (audit Open Item flagged this). Pastiche may rebuild `<CheckList>` from scratch on top of DS Accordion + Checkbox.

### Tasks

- [ ] Worktree off `origin/dev`
- [ ] Read `<CheckList>` component to enumerate the checklist data and check-state behavior
- [ ] Verify DS exports `Accordion` (and `Checkbox` if not already known); file `ds-fix-during-migration` if missing
- [ ] Light grill: persistence of check state (sessionStorage vs ephemeral), intro copy retention
- [ ] Invoke `pastiche`
- [ ] Triage pastiche markers + follow-ups
- [ ] `npm run typecheck` + `npm run build` pass
- [ ] Suggest `review-ui-on-browser` post-pastiche
- [ ] Mode D ship after user confirmation

### Acceptance criteria

- [ ] Page renders intro + accordion checklist at desktop + mobile
- [ ] Accordion expand/collapse works
- [ ] Check-state behavior matches the locked grill decision (persist or ephemeral)
- [ ] Old `.js` deleted; no `sejongHospital*`
- [ ] `npm run typecheck` + `npm run build` pass

### Non-goals

- Changing the checklist content
- Per-user backend persistence

### Bailout triggers

- DS lacks Accordion → `ds-fix-during-migration`; if structural, `needs-decision`

### Budget

~90 min.

---

## Lane 6.14 — Info template + `/info/campus` reference

**Repo:** `KISA-website-client` · **Mode:** `needs-interactive` (Mode D) · **Scope:** [REDESIGN] · execution skill: `pastiche` (preceded by `grill-me`)

### Files

- New: `src/features/info-page/components/InfoOverviewTemplate.tsx` (the overview page shape — names pastiche's call)
- New: `src/features/info-page/components/InfoDetailTemplate.tsx` (the detail page shape)
- New: `src/features/info-page/data/campusInfoData.ts` (extracted data records for the campus category — schema must accommodate housing's dual-section variant)
- Replace: `src/app/(main)/info/campus/page.js` → `page.tsx` (consumes `InfoOverviewTemplate`)
- Replace: `src/app/(main)/info/campus/detail/central/page.js` → `page.tsx`
- Replace: `src/app/(main)/info/campus/detail/north/page.js` → `page.tsx`
- Pastiche may delete or rebuild `InfoTitle`, `SectionTitle`, `SectionGrid`, `SectionIntro`, `DetailThumbnail`, `DetailTitle`, `DetailDescription`, `DetailPageTitle` under `src/features/info-page/`

### Scope (descriptive)

The 5 `/info/{category}` overview pages (campus, housing, restaurants, sports, travel) all consume `infoPageData` records and render `InfoTitle` + `sections.map(SectionTitle/SectionIntro/SectionGrid)`. The detail pages all render `DetailThumbnail` + `DetailTitle` + `DetailDescription` per record.

The redesign extracts:
1. **`InfoOverviewTemplate`** — shared overview page shape, consumed by all 5 overview pages.
2. **`InfoDetailTemplate`** — shared detail page shape, consumed by all detail pages.

`/info/campus` is the **reference** because it's the smallest non-trivial example (overview + 2 detail pages: central, north).

#### Data shape (locked schema, pastiche owns presentation)

```ts
type InfoCategory = {
  infoType: "campus" | "housing" | "restaurants" | "sports" | "travel";
  infoTitle: string;            // hero title
  pageMetadata: { title: string; description: string };
  sections: InfoSection[];
};

type InfoSection = {
  sectionName: string;          // slug-style, links into details
  sectionText: string;          // human-readable header
  sectionIntro?: string;        // optional intro paragraph
  contentList: InfoSectionItem[];
};

type InfoSectionItem = { id: string; title: string; subtitle?: string; thumbnailKey: string; detailHref?: string; };

type InfoDetailPage = {
  infoType: InfoCategory["infoType"];
  detailKey: string;            // e.g., "central", "off-campus"
  pageTitle?: string;
  records: InfoDetailRecord[];
};

type InfoDetailRecord = { id: string; title: string; desc: string; thumbnailKey: string; };
```

(Pastiche may rename fields or add as needed, but the dimensional shape — overview categories with sections containing items, detail pages with records — must be preserved so 6.15 fan-out can wire each category in.)

#### Housing dual-section variant

Per audit Risk 5 (and confirmed in code): `/info/housing/page.js` renders **two** top-level sections (On-Campus + Off-Campus), each with its own subsections. The template must handle this either by:
- Allowing top-level "groups" (one level above `sections`) — rename to `groups: { groupTitle: string; sections: InfoSection[] }[]` in the schema, OR
- Rendering two `InfoOverviewTemplate` instances on the housing page, OR
- Letting the page assemble its own composition while still consuming sub-templates.

Pastiche grill picks one approach; whichever is chosen must keep 6.15 fan-out a one-shot data wiring per category (no per-category template tweaks).

### Logic spec

- Overview pages are RSCs consuming static data files; no client interactivity required.
- Detail pages are RSCs consuming static data files.
- Page `metadata` is per-category; lives in the data file; the page reads + exports it.
- Detail pages currently read sibling data files (e.g., `campusCentralData`, `campusNorthData`). Either consolidate into one `campusInfoData.ts` keyed by `detailKey` OR keep one data file per detail page — pastiche's call.
- Rip `sejongHospitalBold/Light`, drop `info.css` if the template absorbs the rules.

### Pastiche brief

This template defines the visual language for **22 pages** across 5 fan-out categories (housing 3, restaurants 8, sports 3, travel 4 — campus is the reference, 3 pages). Grill-me first to lock: overview page hero treatment, section card layout, thumbnail aspect ratios, detail page layout (vertical stack vs grid), housing dual-section approach. Pastiche may discard the existing `InfoTitle`/`SectionTitle`/`SectionGrid`/`SectionIntro`/`DetailThumbnail`/`DetailTitle`/`DetailDescription` composition entirely.

### Tasks

- [ ] Worktree off `origin/dev`
- [ ] Read all 5 overview pages + housing's variant + 2 campus detail pages
- [ ] Read existing `infoPageData.ts` and `detailPageData.ts` to enumerate the records the template must absorb
- [ ] Run `grill-me` to lock template public API + housing strategy + thumbnail key system
- [ ] Invoke `pastiche` with grill output
- [ ] Author `InfoOverviewTemplate`, `InfoDetailTemplate`
- [ ] Author `campusInfoData.ts`
- [ ] Migrate `/info/campus/page.tsx`, `/info/campus/detail/central/page.tsx`, `/info/campus/detail/north/page.tsx` to consume the template
- [ ] Delete `info.css` if absorbed (or document why retained)
- [ ] Verify the housing variant strategy works on paper (will be confirmed in 6.15 housing sub-lane)
- [ ] Triage pastiche markers + follow-ups
- [ ] `npm run typecheck` + `npm run build` pass
- [ ] Suggest `vercel-react-best-practices` + `review-ui-on-browser` post-pastiche
- [ ] Mode D ship after user confirmation

### Acceptance criteria

- [ ] `InfoOverviewTemplate` and `InfoDetailTemplate` exist and are consumed by the 3 campus pages
- [ ] `campusInfoData.ts` is the single data source for `/info/campus` + its 2 detail pages
- [ ] Housing dual-section strategy locked (documented in template's JSDoc)
- [ ] Page `metadata` for `/info/campus` preserved
- [ ] Old `.js` files deleted; no `sejongHospital*`; no NextUI
- [ ] `npm run typecheck` + `npm run build` pass

### Non-goals

- Migrating the other 4 categories (Lane 6.15)
- The checklist page (Lane 6.13)
- Editing detail content

### Bailout triggers

- Housing variant cannot be expressed without an additional template seam → bail to `needs-decision`; expand schema (`groups` level) before merging
- Restaurants' 8 detail pages have content variety the template can't absorb → bail to grill, branch into "card-list template" + "detail-card template" subcomponents per audit Risk 5
- DS lacks the right card / thumbnail primitives → `ds-fix-during-migration`

### Budget

~3 hours including grill.

---

## Lane 6.15 — Info fan-out (4 sub-lanes)

**Repo:** `KISA-website-client` · **Mode:** `autonomous-ready` (per sub-lane) · **Scope:** [POLISH] · execution skill: `executing-plans`
**Blocked by:** 6.14

4 sub-lanes, one per remaining info category. Each is **data extraction + template wiring** — no design decisions.

### Sub-lanes

| ID | Category | Pages |
|---|---|---|
| 6.15-housing      | `/info/housing`     | overview + 2 details (on-campus, off-campus) |
| 6.15-restaurants  | `/info/restaurants` | overview + 7 details (asian, dessert, fine-dining, hamburger-pizza, korean, korean-market, others) |
| 6.15-sports       | `/info/sports`      | overview + 2 details (facility, misc-sports) |
| 6.15-travel       | `/info/travel`      | overview + 3 details (ann-arbor, detroit, nearby) |

### Per-sub-lane scope (identical pattern)

Each sub-lane:

1. Authors `{category}InfoData.ts` per the locked schema from 6.14.
2. Replaces the overview `page.js` with a `page.tsx` that consumes `InfoOverviewTemplate`.
3. Replaces every detail `page.js` with a `page.tsx` that consumes `InfoDetailTemplate`.
4. Migrates the existing data files (`infoPageData.ts`, `detailPageData.ts`) where applicable — or keep them and have the new data file re-export.
5. Smokes overview + every detail in mock mode.

### Per-sub-lane housing override

The housing sub-lane uses the dual-section strategy locked in 6.14. If the strategy was schema-level (`groups`), the data file uses it. If it was page-level (two template instances), the housing overview page assembles its own composition.

### Tasks per sub-lane

- [ ] Branch off `dev` (`ds-client-migration/phase-6/6.15-{category}`)
- [ ] Read existing data + page files for the category
- [ ] Author `{category}InfoData.ts` per schema
- [ ] Replace overview + every detail `page.js` with `page.tsx` consuming the templates
- [ ] Delete the old `.js` files
- [ ] Verify each page in mock mode at desktop + mobile
- [ ] `npm run typecheck` + `npm run build` pass
- [ ] `ds-client-review` agent
- [ ] Push branch; PR

### Acceptance criteria (per sub-lane)

- [ ] Overview page consumes `InfoOverviewTemplate`
- [ ] Every detail page consumes `InfoDetailTemplate`
- [ ] Page `metadata` preserved per route
- [ ] No design drift vs `/info/campus` reference (Lane 6.16 audit catches drift)
- [ ] Old `.js` deleted; no `sejongHospital*`
- [ ] `npm run typecheck` + `npm run build` pass

### Bailout triggers (per sub-lane)

- Category has a record that doesn't fit the locked schema → bail to `needs-decision`; revisit 6.14 template
- Restaurants' 8 detail pages reveal a sub-shape the template can't absorb → bail; branch a sub-template

### Budget per sub-lane

- housing: ~90 min (3 pages + dual-section variant)
- restaurants: ~2 hours (8 details, biggest data file)
- sports: ~60 min (3 pages)
- travel: ~75 min (4 pages)

Total fan-out budget ~6 hours wall-clock if 4-way parallel.

---

## Lane 6.16 — Audit-after redesign + page metadata sweep

**Repo:** `KISA-website-client` · **Mode:** `needs-interactive`
**Blocked by:** every Wave 1–3 lane

### Scope

#### Visual / UX walkthrough

Walk all 47 surfaces at **1280px (desktop)** + **375px (mobile)** using `review-ui-on-browser` skill via Playwright CLI on the devtunnels URL (never localhost). Use the `review-docs-app-ui` style of per-page audit if applicable.

Coverage:
- `/` (home)
- `/about/{kisa,events,members,credits,rule,sponsor}` (6)
- `/boards/{announcement,buyandsell,housing,job-announcement,sponsor}` (5)
- `/everykisa/{academic,career,community,concern}` (4)
- `/info/checklist` (1)
- `/info/{campus,housing,restaurants,sports,travel}` overview (5)
- `/info/{...}/detail/{...}` (20 details)
- `/posts/{create,update,delete}` flows
- `/posts/[postid]` (post detail) — covered with at least 2 fixture postids: 1 boards/announcement, 1 everykisa/community
- `/signin`, `/signup`, `/signup/{name}`
- `/users/{email}`, `/users/edit/{email}`

For each surface, verify:
- Visual consistency with redesigned home (brand identity preserved)
- Boards/everykisa template visual parity across all 9 list views
- Info template visual parity across all 5 overview pages + 22 detail pages
- Mobile collapse behavior at 375px
- No `sejongHospital*` className leakage
- No NextUI imports leakage
- No native `confirm`/`alert` leakage
- All capability-flag gates render correctly (anon chip, comments-disabled, admin-post-only)

Fix on the same branch any drift caught.

#### Page metadata sweep

Every route ships Next.js `metadata`:
- `title`
- `description`
- `openGraph.title`, `openGraph.description`, `openGraph.images` (at least the brand-default image; per-page image where the route warrants — e.g., sponsor)

Add or update missing metadata. Where a parent layout's metadata covers descendants, leverage Next's metadata inheritance.

#### Cleanup sweeps

- `grep` for `(main)/**/page.js` in `src/app` → expect 0 hits (or only `/game-night-rsvp/page.tsx` if removal didn't happen)
- `grep` for `@nextui-org/react` in `src/app/(main)` → expect 0 hits
- `grep` for `sejongHospital(Bold|Light)` in `src/app/(main)` → expect 0 hits
- `grep` for `window\.(confirm|alert)` in `src/app/(main)` → expect 0 hits
- `grep` for `import.*board\.css\|import.*info\.css` → expect 0 hits

### Tasks

- [ ] Spin up dev server (devtunnels URL — never localhost)
- [ ] Run all 5 grep cleanup sweeps; record counts
- [ ] Walkthrough all 47 surfaces at 1280px + 375px; capture findings in `docs/plans/client-migration/phase-6-kisa-web/review-6.16-findings.md`
- [ ] Page metadata sweep: enumerate every route, add/update `metadata` per route
- [ ] Apply fixes; commit + push (Mode D direct push, no PR)

### Acceptance criteria

- [ ] All 5 grep sweeps return 0 hits
- [ ] All 47 surfaces reviewed; findings file checked in
- [ ] No outstanding visual / UX drift
- [ ] Every route ships `metadata` with `title` + `description` (`openGraph` where applicable)
- [ ] `npm run typecheck` + `npm run build` pass

### Non-goals

- Real backend smoke (deferred to ship-to-prod)
- Cross-browser (Chrome only acceptable)
- Performance benchmarking
- Redesigning anything caught — small drift fixes only; large gaps file follow-ups

---

## Lane 6.17 — Verify + end-bump

**Repo:** `KISA-website-client` + `umichkisa-ds` (if any DS fixes accumulated)
**Mode:** `needs-interactive`

### Tasks

- [ ] DS repo: `pnpm build` + `pnpm typecheck` green
- [ ] Client repo: `npm run build` + `npm run typecheck` + `npm test` green
- [ ] MSW gate verification: with `NEXT_PUBLIC_API_MOCKING=enabled`, smoke 5 representative flows: home, board list, post detail, post create, signup. With `NEXT_PUBLIC_API_MOCKING=disabled`, verify the app boots without MSW (real-API smoke deferred per `ship-migration-to-prod`).
- [ ] Manual happy-path smoke: home → boards/community list → click a post → like it → comment on it → return → /info/campus → /info/restaurants → /about/members (year-pick) → /signin → /signup → /users/{me}
- [ ] Check `docs/plans/client-migration/ds-fixes-log.md` for Phase 6 entries
- [ ] If entries exist: invoke `ds-phase-end-bump` skill (always patch per `feedback_ds_bump_semver`)
- [ ] If no entries: skip end-bump, document `"no end-bump needed — all DS fixes mid-phase shipped"` (or `"no DS fixes this phase"`) in TODO entry per Phase 1–5 precedent
- [ ] Tick Phase 6.17 + parent Phase 6 in `docs/TODO.md`

### Acceptance criteria

- [ ] Both repos green
- [ ] DS version pinned correctly in client `package.json` (latest mid-phase patch, or unchanged if no fixes)
- [ ] TODO.md ticks reflect lane completion

### Non-goals

- Phase 7 kickoff
- Real backend integration testing (mocks only here; ship-to-prod handles real-API smoke)

---

## Open items deferred to execution

Carried from `audit.md` and refined here:

- **6.1**: full grill at execution — design references, hero structure, section list, scroll behavior, mobile layout
- **6.2**: read `eventsPageData.ts` to confirm schema does not need extension
- **6.3**: confirm DS Select replaces NextUI cleanly; otherwise file `ds-fix-during-migration`
- **6.4**: pastiche call: rule page inline copy vs extracted records; sponsor page tier-grouping vs flat grid
- **6.5a**: confirm everykisa endpoint shape — single shared `/boards/:boardType/...` family or separate `/everykisa/:category/...` prefix
- **6.5a–d**: each lane reads the typed request/response shapes upfront from `apis/*` + `types/*`
- **6.6**: grill: lock the 4-flag capability set (anon-post, anon-comment, comments-enabled, admin-post-only) against all 9 board configs; lock create-post-CTA placement; lock table-vs-cards
- **6.6**: capability config location — per-route file vs central `boardCapabilities.ts` (planning bias is central)
- **6.7 (fan-out)**: each sub-lane verifies template parity at desktop + mobile in PR description
- **6.8**: confirm `incrementReadCount` fires once on mount; lock optimistic-update rollback path for like-toggle
- **6.9**: form schema lib confirmed `@umichkisa-ds/form` per HARNESS; verify all field types covered before lane start
- **6.11**: snapshot the 5 required + 1 optional + 2 term-condition fields in lane PR description as preservation contract; signup MSW endpoints handled in this lane
- **6.13**: confirm DS Accordion exists; raise as DS gap if missing
- **6.14**: lock template public API + housing dual-section strategy before reference migration; consider both `card-list` and `detail-card` subcomponents per audit Risk 5
- **6.16**: deliverable = walkthrough findings file + metadata sweep table
- **6.17**: real-API smoke deferred to pre-`dev → main` ship per Phase 4.9 precedent (`ship-migration-to-prod`)
- **Out-of-scope cleanup**: `/game-night-rsvp` removal — file as separate Phase 7 candidate in `docs/TODO.md`; do not touch in this phase
- **`BoardType.LivingQA` route**: enum value exists (`"livingqa"`) but no `/everykisa/livingqa/page.tsx` is in the route tree. Phase 6 covers it in fixtures + capability matrix only; authoring the page is a Phase 7 follow-up (uses `BoardTemplate` + the existing `livingqa` capability entry, so it's a 6.7-style fan-out task)
- **Local feedback module migration**: `src/components/ui/feedback/*` (NotLogin, NotAuthorized, NotFound, LoadingSpinner, etc.) is local, not DS. Phase 0 did not migrate it. Each lane uses these in their current form; an upgrade to DS-native feedback surfaces is a Phase 7 candidate

### Follow-up candidates (post-Phase-6)

- **`/jobs` redesign harmonization** — if home / about / boards redesigns establish a new visual language stronger than the Phase-1 jobs surface, file a Phase-7 lane to bring `/jobs` in line
- **`/game-night-rsvp` removal** — out of scope for Phase 6
- **Real-time backend integration** — switching MSW off and validating against staging API; deferred to ship-to-prod
- **Search across boards** — currently per-board; cross-board search is a feature follow-up
- **Notifications on like/comment** — out of scope; backend does not currently emit
