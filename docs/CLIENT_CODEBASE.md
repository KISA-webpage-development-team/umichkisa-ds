# Client Codebase Notes

Structured reference for the `../KISA-website/client` repo, captured for the upcoming DS migration. Mirrors `CODEBASE.md` (which documents this DS repo) but from the **consumer** side.

Read this at the start of any client-migration session so you know the target's shape before touching it. Update when the client changes or when new blind spots are discovered.

Related:
- `CODEBASE.md` — DS component inventory (the source side)
- `DS_CONSTRAINTS.md` — DS usage rules to enforce in client code
- `_client_migration_notes.md` — append-only log of DS API breaking changes relevant to the client swap

---

## Quick facts

| Thing | Value |
|---|---|
| Framework | Next.js 14 App Router |
| React | 18.3.1 |
| TypeScript | ^5.9.3 (also contains `.jsx` / `.js` files) |
| Styling | **Tailwind v3.x** (classic `tailwind.config.js`, `hsl(var(--*))` pattern) |
| Forms | `react-hook-form 7.50.1` installed but **not currently used** — all forms are ad-hoc state |
| Data layer | `axios` + `swr` (SWR used as a cache-aware axios wrapper, not for its reactivity features) |
| Auth | `next-auth 4.24.11` |
| Deploy | Vercel, auto-deploy on `git push main` |
| Local dev | `npm run dev-local` against local Flask backend on `:8000` (no local DB write access) |
| Env | VSCode tunnel (devtunnels), no local dev machine at unit |
| Tests | None |
| Verification | `npx tsc --noEmit` + `npm run lint` |
| CLAUDE.md | Enforces task-type → folder-location rules; forbids `git push` without explicit permission |

---

## The five apps (one repo, one domain)

All apps live under `umichkisa.com` in the single `client/` repo. They are **logically separate products** that share infrastructure (auth, layout shell, shared UI). Splitting into separate repos with a shared core package is a **long-term future possibility**, deferred.

| # | App | Route | Audience | Viewport | Status |
|---|---|---|---|---|---|
| 1 | **kisa-web** | `/` | UMich Korean students | Desktop-first, responsive | Active, partially refactored |
| 2 | **jobs-curator** | `/jobs` | Job seekers | Responsive | Active, self-contained |
| 3 | **pocha-userfacing** | `/pocha` | End customers ordering drinks/food | **Mobile-only** (uses `OnlyMobileView` gate) | Active |
| 4 | **pocha-dashboard** | `/pocha/dashboard` | Pocha admins watching live orders | Desktop + tablet (mobile technically works but no admin opens it on phone) | Active |
| 5 | **pocha-manage** | `/pocha/manage` | Pocha admins editing menus/settings | Desktop + tablet | Active — originally authored by another KISA dev team member (not Jioh) |

### Notes per app

**kisa-web** — the original app. Covers the boards (announcement / buyandsell / housing / job-announcement / sponsor), info pages, about pages, home + sponsor landing, user signup/signin, user profile. The oldest code and the most debt lives here.

**jobs-curator** — tacked on after the fact. Physically lives at `src/features/jobs-curator/` with a non-standard feature shape (has its own `claude-tasks/`, `JOBS-CURATOR.md`, `layout/`, `constant.ts`, `utils/`, `types/` on top of the usual `components / contexts / hooks / data`). Logically separate from kisa-web but co-located because buying a second repo/domain wasn't worth it.

**pocha-userfacing** — mobile ordering flow. Sub-surfaces: `home`, `menu`, `cart`, `pay` (Stripe), `history`, `pay-success`. Real-time order updates via `socket.io-client`. Gated with a mobile-only overlay — desktop visitors are told to use a phone.

**pocha-dashboard** — live-order watcher for admins. UI is sized for desktop + tablet. No explicit tablet-only gate needed: admins never open it on mobile, so we accept "looks bad on mobile" as a non-issue.

**pocha-manage** — menu/settings management for admins. Authored by another dev on the team. Lives at `src/app/pocha/manage/` + `src/features/pocha/components/manage/`.

---

## `src/` layout (enforced by client CLAUDE.md)

Rules are mandatory. Violating them is considered a bug.

```
src/
├── apis/[entity]/          → ONLY place API calls may live. Axios + SWR.
├── app/                    → Next.js App Router routes. Thin; delegates to features.
├── assets/                 → Fonts (SejongHospital)
├── components/
│   ├── layout/             → Shared header/footer/nav
│   └── ui/                 → Shared UI primitives (the fragmented zoo — see below)
├── constants/env.ts        → ONLY place `process.env` may be read
├── deprecated-components/  → Debt pile. To be killed during migration.
├── features/[name]/        → Feature-scoped: components/ contexts/ hooks/ data/
├── lib/[lib-name]/         → ONLY place third-party libs may be imported. Wrappers only.
├── middleware.ts           → Next middleware
├── types/                  → Shared TS types. Feature-local types stay in-feature.
└── utils/                  → fonts/ formats/ styles/
```

### Task-type → location rules (from client `CLAUDE.md`)

| Task type | Where | Invoke |
|---|---|---|
| New feature | `src/features/[name]/` | brainstorming, vercel-react-best-practices, frontend-design, ui-ux-pro-max |
| Modify feature | `src/features/[name]/` | vercel-react-best-practices (+ design skills if UI) |
| Bug fix | In-place in affected feature/component | systematic-debugging (+ design skills if UI) |
| Refactor | Within existing folder boundaries — no cross-layer moves | — |
| Shared UI | `src/components/` only, never in a feature | frontend-design, ui-ux-pro-max, vercel-react-best-practices |
| API | `src/apis/[entity]/` only | — |
| Third-party lib | `src/lib/[lib-name]/` only | — |
| Env var | `src/constants/env.ts` only | — |
| Shared type | `src/types/` | — |

After **every** edit: `npx tsc --noEmit && npm run lint`.

---

## UI stack fragmentation (the core migration problem)

The client ships **four overlapping third-party UI libraries** plus several custom component piles inside `src/components/ui/`:

### Third-party UI deps

| Package | Purpose | Migration target |
|---|---|---|
| `@nextui-org/react` | Component library + Tailwind plugin | **Remove** — DS replaces all used parts; plugin must be unwired from `tailwind.config.js` |
| `@heroui/react` | NextUI rebrand (essentially the same lib) | **Remove** — redundant with NextUI, DS replaces |
| `@headlessui/react` | Unstyled primitives | **Remove where DS has an equivalent**; keep only if a niche primitive has no DS counterpart |
| `@radix-ui/*` (accordion, dialog, dropdown-menu, popover, slot) | Unstyled primitives | **Keep as transitive via DS** — the client shouldn't import Radix directly once shadcn/ is removed |
| `tailwindcss-animate` | Animation utilities | **Remove** — collides with DS v4 setup; DS ships its own keyframes |
| `framer-motion` | Motion | **Keep** — needed for aceternity navbar-menu and feature animations; usage should shrink |
| `lucide-react` | Icon registry | **Remove direct imports** — DS `<Icon>` wraps it |
| `react-icons` | Icon registry | **Remove direct imports** — DS `<Icon>` replaces the 19 named react-icons components the DS side already migrated |
| `react-day-picker` | Calendar primitive | **Remove direct imports** — DS `Calendar`/`DatePicker` already wraps this |
| `react-hook-form` | Form state | **Keep** — DS `@umichkisa-ds/form` peer-depends on it; becomes the primary form layer |
| `react-quill` | Rich text editor | **Keep** — no DS equivalent; used by bulletin-board post editor |
| `embla-carousel-react`, `react-multi-carousel` | Carousels | **Keep, consolidate to one** — no DS Carousel |
| `@fullcalendar/*` | Event calendar | **Keep** — DS has no event calendar; distinct from DS `Calendar` (date picker) |
| `quill` | Underlying quill engine for react-quill | Keep (transitive) |

### `src/components/ui/` subtrees

| Subfolder | Contents | DS replacement |
|---|---|---|
| `shadcn/` | accordion, badge, button, calendar, card, date-picker, dialog, dropdown-menu, popover | **1:1 DS replacement exists for every file.** Delete folder during migration. |
| `button/` | `CustomButton`, `CustomImageButton`, `CustomLinkButton`, `styles.css`, `types.ts` | DS `Button` + `IconButton` + `LinkButton` (note: `IconButton` now string-name only; see `_client_migration_notes.md`) |
| `form/` | `CustomFormItem`, `CustomInput`, `CustomLabel`, `styles.css` | DS `FormItem` + `Input` + `Label` (breaking: `FormItem` API redesign — slot-based) |
| `feedback/` | `LoadingSpinner`, `NotFound`, `NotAuthorized`, `NotLogin`, `UnexpectedError`, `OnlyMobileView`, `UnderConstruction` | DS `LoadingSpinner` + `StatusView` (variant-based, collapses the four `Not*` components) + `OnlyMobileView` |
| `icon/` | ~28 custom SVG icon components incl. Pocha-specific (`PochaCartIcon`, `PochaTrashIcon`, etc.) | DS `Icon` with 47-icon registry; **Pocha-specific icons must be audited** — some may need to stay as local SVGs if they aren't generic-enough to upstream |
| `aceternity/` | `navbar-menu.jsx` (framer-motion heavy) | **No DS equivalent.** Keep as-is or redesign during header rework. |
| `toggle/` | (unread — likely `CustomToggleBar`) | DS `ToggleGroup` (see breaking-change notes in `_client_migration_notes.md`) |
| `divider/` | Horizontal/Vertical dividers | DS `Divider` (unified; `color` prop removed) |
| `error-boundary/` | Error boundary wrapper | Keep local — React error boundaries are app-level infra, not DS scope |

---

## Deprecated-components debt

`src/deprecated-components/{shared,ui}/` is a mix of `.jsx` and `.tsx` files. Killing it is a stated migration goal.

**Current import sites** (20 files across):

- Layout: `components/layout/header/*`, `components/layout/footer/Footer.jsx`
- kisa-web features: `bulletin-board/board/BoardTableRow.tsx`, `bulletin-board/board/PostSearchBar.jsx`, `home-sponsor/HomePostView.jsx`, `home-sponsor/SponsorCarousel.tsx`, `info-page/CheckListItem.jsx`, `users/signup/RequiredFields.jsx`, `users/signup/OptionalFields.jsx`
- Pocha (admin-facing): `pocha/components/manage/PochaInfoFields.tsx`, `pocha/components/manage/PochaMenuFields.tsx`, `pocha/components/manage/PochaMenuItemForm.tsx`
- App routes: `app/signup/page.js`
- Internal (deprecated importing deprecated): `deprecated-components/ui/carousel.tsx`, `deprecated-components/shared/InstagramLinkIcon.jsx`, `deprecated-components/shared/ErrorDisplay.jsx`, `deprecated-components/shared/FacebookLinkIcon.jsx`

The client CLAUDE.md already flags `bulletin-board/board`, `home-sponsor`, `info-page`, `users/signup` as "partially refactored and still rely on deprecated-components." Those four overlap exactly with the import sites above. Plus: **Header/Footer layout**, **pocha-manage**, and **app/signup page** are also still on the old primitives.

Coextensive: killing `deprecated-components/` = migrating those features to DS.

Detailed per-component migration plan deferred until we enter the actual migration work.

---

## Tailwind v3 → v4 collision surface

**Decision (already made with user, 2026-04-11): Tailwind v4 upgrade is Phase 0 — a hard prerequisite before any component migration begins.** Rationale: DS ships a CSS-first `@theme {}` setup, and the client's existing `tailwind.config.js` cannot coexist with it cleanly. The existing setup must be *replaced*, not layered under.

### What gets removed in Phase 0

- `tailwind.config.js` (entire file)
- `components.json` (shadcn config — irrelevant once shadcn/ folder is deleted)
- NextUI plugin (`nextui()`) from Tailwind plugins array
- `tailwindcss-animate` plugin
- Custom `addVariablesForColors` plugin
- Client-defined color tokens: `michigan-blue`, `michigan-light-blue`, `michigan-maize`, `michigan-dark-maize`, `michigan-darker-maize` (values are identical to DS brand tokens)
- `hsl(var(--background))`-style CSS variable pattern
- Client `borderRadius` overrides using `var(--radius)`
- Any `@tailwindcss-animate` keyframes still referenced

### What replaces it

- DS pre-built CSS imported once at the app root (or the DS source CSS if the client also goes v4)
- DS `@theme inline` exposes semantic tokens as Tailwind utilities (`bg-brand-primary`, `text-foreground`, etc.)
- DS OKLCH color tokens replace `hsl(...)` client tokens
- DS ships its own fonts; `next/font/local` for SejongHospital in client `app/layout.tsx` stays (it overrides the DS `:root` via `<html class>` specificity — same pattern the DS docs app uses)

### Known token-name collisions

| Client token | DS token | Resolution |
|---|---|---|
| `bg-primary` (`#00274C` navy) | `bg-brand-primary` | Rewrite call sites to DS name |
| `bg-secondary` (`#FFCB05` maize) | `bg-brand-accent` (or `bg-brand-foreground`) | Rewrite call sites |
| `text-foreground`, `bg-background` (hsl-var) | `text-foreground`, `bg-surface` (OKLCH) | Names partially match — verify each call site; silent visual drift possible |
| `bg-card`, `bg-popover`, `bg-muted`, `bg-accent`, `bg-destructive` (hsl-var) | DS semantic equivalents | Mechanical rewrite |
| `bg-michigan-blue`, etc. | `bg-brand-primary` etc. | Global find-and-replace |

---

## Form layer state

- `react-hook-form` is in `package.json` but **no forms in the codebase use it**.
- All current forms manage state with local `useState` + manual handlers + custom validation.
- This means **form migration is a logic rewrite**, not a mechanical component swap:
  1. Introduce `useForm` from `@umichkisa-ds/form`
  2. Rewrite submit/validation logic (zod or RHF-native resolvers — choice deferred)
  3. Swap to DS `Form.Input` / `Form.Select` / `Form.Checkbox` / etc. compound components
  4. Delete old `CustomInput` / `CustomFormItem` / `CustomLabel` usage
- Scope of form-touching surfaces (rough):
  - kisa-web: user signup (`users/signup` required + optional fields), post-create-edit editor wrapper, comment editor, board search
  - jobs-curator: job filters (needs audit)
  - pocha-manage: `PochaInfoFields`, `PochaMenuFields`, `PochaMenuItemForm`
  - pocha-userfacing: payment forms (Stripe Elements — DS doesn't touch these)

---

## Migration harness constraints

These shape *how* the migration runs, independent of *what* it changes.

1. **Dev environment is a VSCode tunnel.** User runs Claude from a military-unit computer room through a devtunnel to their M1 Pro at home. No native local dev. Browser verification uses the tunnel URL, not `localhost`. Migration tooling and scripts must not assume a native shell.

2. **`npm run dev-local` against a local Flask backend at `:8000`.** The user runs the backend but **has no write access to the local DB**. Migrating form-submission and mutation flows against a read-only DB is risky — the forms will submit and the DB will reject, so we can't tell if the submit flow works end-to-end.

3. **Mock APIs may be a prerequisite.** For surfaces that depend on write paths (user signup, post create/edit, pocha-manage CRUD, pocha-userfacing ordering), we probably need a mock layer so migration can proceed without blocking on backend access. Design deferred — options on the table: MSW (Mock Service Worker), stub at the `apis/[entity]/` layer, or run a local mock backend server. **This is an open decision.**

4. **No test suite.** Zero tests in `client/tests/`. Regression coverage is 100% manual. Migration plan must include per-feature visual verification checkpoints. **Testing strategy for the migration is deferred but mandatory to resolve before executing.**

5. **Vercel auto-deploys `main`.** Any push to `main` goes live. Migration must land in feature branches and merge only after visual verification. The `finishing-a-development-branch` skill applies.

6. **Claude session opens at `umichkisa-ds/` as primary working directory** (not at `client/`). Why: DS-specific skills (`ds-constrained-execution`, `ds-review`, `new-component-workflow`), DS memory, DS CLAUDE.md, and DS `CODEBASE.md` + `DS_CONSTRAINTS.md` are all scoped to this repo. `client/` is added as an additional working directory, so Claude can Read/Edit client files by absolute path without a separate session.

---

## Known DS gaps exposed by client migration

Capture here so we remember to close them before (or during) Phase 0 and 1.

- **`OnlyMobileView` / tablet gate**: Not a gap. Pocha dashboard is desktop+tablet, and admins never open it on mobile, so no tablet-only gate is needed. Current behavior (UI just doesn't fit mobile, no gate) is acceptable.
- **Carousel**: DS has no Carousel component. Client has two (`embla-carousel-react`, `react-multi-carousel`). Likely staying out of DS scope for now.
- **Rich text editor**: DS has no editor. `react-quill` stays local.
- **Event calendar**: DS `Calendar` is a date picker only. `@fullcalendar/*` stays local.
- **Pocha icons**: DS icon registry is generic; Pocha-specific icons (e.g. `PochaCartIcon`, `PochaTrashIcon`) need an audit — either upstream generic versions to DS or keep as local SVGs in the feature.
- **Aceternity navbar-menu**: decorative framer-motion component with no DS analog. Decision deferred: redesign on top of DS primitives, or keep as-is.

---

## Deferred decisions (revisit during migration planning)

1. **Mock API strategy** — MSW vs. `apis/` stubbing vs. local mock server.
2. **Testing strategy** — visual regression approach (Playwright? manual checklist? Storybook snapshots?).
3. **Form validation strategy** — zod + RHF resolver, or RHF-native rules.
4. **Carousel consolidation** — pick one of the two carousel libs and remove the other.
5. **Pocha icon audit** — which icons upstream to DS, which stay local.
6. **Migration phase ordering beyond Phase 0** — which of the five apps goes first, whether we do horizontal slices (all layouts first, then all forms, then …) or vertical slices (one app at a time).
7. **Long-term repo split** — separate each of the five apps into its own repo with a shared core package. Long-term, deferred, not on the migration critical path.

---

## Blind spots still in my head (needs resolution as migration starts)

- I haven't read the `jobs-curator` feature in depth. Its non-standard shape (`claude-tasks/`, `JOBS-CURATOR.md`, own `layout/`, `types/`) suggests it has conventions the other features don't. Audit before touching.
- I haven't read the `pocha/contexts/` + `pocha/hooks/` to understand the Socket.io + ordering state machine.
- I don't know which `@nextui-org` / `@heroui` / `@headlessui` usage sites are genuinely load-bearing vs. accidental. 19 import sites across `framer-motion` / `react-hook-form` / those three UI libs combined, per `grep` — a per-site audit is part of migration planning.
- The `toggle/` subfolder under `components/ui/` was unread during exploration.
- Exact shape of `constants/env.ts` — unread. Matters if DS or mocks introduce new env vars.
