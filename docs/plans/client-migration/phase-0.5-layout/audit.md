# Phase 0.5 — Shared Layout (Audit)

**Type:** Singleton phase (per HARNESS), but subphased into lanes for parallel execution.
**Charter:** Migrate `Header`, `Footer`, `MobileMenu*` from client's pre-DS code into DS-tokenized, DS-componentized, idiomatic App Router layout.
**Scope principle:** This is **redesign + migration**, not mechanical preservation. Brand identity (navy + maize + Korean display type + signature mega-menu treatment) is preserved; code-level patterns are redesigned against DS primitives.

---

## Scope Snapshot

### Source files (client)

```
src/components/layout/header/
├── Header.jsx                    [REACHABLE]
├── HeaderTitleBlock.jsx          [REACHABLE]
├── LoginButton.jsx               [REACHABLE]
├── Menu.jsx                      [DEAD]
├── MobileMenu.jsx                [DEAD]
├── MobileMenuButton.jsx          [REACHABLE]
├── MobileMenuCloseButton.jsx     [DEAD]
├── MobileMenuList.jsx            [DEAD]
├── UserInfo.jsx                  [REACHABLE]
├── WebLogo.jsx                   [REACHABLE]
├── WebTitle.jsx                  [DEAD]  (commented out in Header.jsx, no other callers)
├── header.module.css             [DEAD]  (zero references)
└── navigationMenu.js             [REACHABLE]  (data)

src/components/layout/footer/
└── Footer.jsx                    [REACHABLE]

src/components/ui/aceternity/
└── navbar-menu.jsx               [REACHABLE]  (imported by Header)

src/features/jobs-curator/layout/
└── HeaderTitle.tsx               [DEAD]  (isJobsCurator flag never set)

src/app/
├── layout.tsx                    [REACHABLE]  (imports Footer)
├── template.tsx                  [REACHABLE]  (imports Header, provides session)
└── pocha/layout.tsx              [REACHABLE]  (pocha-specific)
```

### Target structure (post-migration)

```
src/components/layout/
├── header/
│   ├── Header.tsx                ← main
│   ├── HeaderTitle.tsx           ← merged: HeaderTitleBlock + WebLogo + WebTitle
│   ├── NavMenu.tsx               ← retokenized ex-aceternity (all primitives inlined)
│   ├── MobileMenuButton.tsx
│   ├── LoginButton.tsx
│   ├── UserInfo.tsx              ← simplified to Avatar-only
│   └── navigationMenu.ts         ← data (.js → .ts)
└── footer/
    └── Footer.tsx

src/app/
├── layout.tsx                    ← bare root: html/body + providers only
├── (main)/
│   ├── layout.tsx                ← renders Header + {children} + Footer
│   └── (all non-pocha top-level routes)
├── (pocha)/
│   └── pocha/                    ← all existing pocha/** (no Header/Footer)
├── api/                          ← stays at root (non-visual)
└── .well-known/                  ← stays at root (special)

src/mocks/
├── handlers.ts                   (existing from Phase 0)
├── browser.ts                    (existing)
├── MSWProvider.tsx               (existing, extended to wrap authContext)
└── authContext.tsx               ← NEW: dev mock session provider + toggle widget
```

---

## Per-Lane Audit

### 0.5.1 — Route group restructure
**Tag:** `[POLISH]` `[NO-TDD]`
**Files:** whole `src/app/**` tree (directory moves), `Header.jsx`, `Footer.jsx` (drop pathname check)

Move ~10 top-level route directories into `src/app/(main)/`. Move `src/app/pocha` into `src/app/(pocha)/pocha`. Bare root `layout.tsx`. New `(main)/layout.tsx` hosts Header/Footer. Header/Footer drop the `if (pathname.startsWith("/pocha")) return null` runtime check.

**Dead code:** none deleted here (deletes happen in 0.5.4a).

---

### 0.5.2 — DS icon addition: Instagram (custom SVG, 2 variants)
**Tag:** `[MECHANICAL]` `[NO-TDD]`
**Files (DS repo):**
- `packages/web/src/components/icon/custom/InstagramIcon.tsx` (NEW, monochrome, `fill="currentColor"`)
- `packages/web/src/components/icon/custom/InstagramBrandIcon.tsx` (NEW, official gradient)
- `packages/web/src/components/icon/registry.ts` (add `"instagram"` and `"instagram-brand"`)

Not in lucide-react. Follow the existing custom-icon pattern (matches `"github"` → `GithubIcon`, `"linkedin"` → `LinkedinIcon`).

SVG source: lift from `KISA-website/client/src/deprecated-components/shared/InstagramLinkIcon.jsx` or use official Instagram brand SVG for the `-brand` variant.

Execute via `ds-fix-during-migration` skill. Log to `docs/plans/client-migration/ds-fixes-log.md`. Bump DS `web` package version at end of Phase 0.5 per `ds-phase-end-bump`.

**No Facebook icon needed** — Footer swaps Facebook → email icon (DS `mail` already in registry).

---

### 0.5.3 — Hybrid auth infrastructure
**Tag:** `[REDESIGN]` `[NO-TDD]` (infra only; LoginButton [TDD] lives in 0.5.4d)
**Files (client):**
- `src/mocks/authContext.tsx` (NEW) — React Context provider + dev-only floating toggle widget. Gated by `NEXT_PUBLIC_MOCK_API === "1"`.
- `src/mocks/MSWProvider.tsx` — extended to wrap `<AuthContextProvider>` when mock mode.
- `src/app/template.tsx` — if mock mode, bypass `getServerSession` and inject a dummy session from context.

**Behavior:** In prod, real next-auth session flows through `template.tsx` → Header prop (unchanged). In Vercel `dev` preview (`NEXT_PUBLIC_MOCK_API=1`), a floating toggle widget lets reviewer flip "logged in ↔ logged out" to verify both Header states without real Google OAuth round-trip.

No visual Header changes in this lane — Header is still old `.jsx`. Just the pipeline underneath.

---

### 0.5.4a — Header folder cleanup & renames
**Tag:** `[MECHANICAL]` `[NO-TDD]`
**Files:**
- Delete: `Menu.jsx`, `MobileMenu.jsx`, `MobileMenuList.jsx`, `MobileMenuCloseButton.jsx`, `WebTitle.jsx`, `header.module.css`, `features/jobs-curator/layout/HeaderTitle.tsx`, whole `components/ui/aceternity/` directory (after navbar-menu is moved)
- Rename + retype: `aceternity/navbar-menu.jsx` → `components/layout/header/NavMenu.tsx` (move file, same content, `.jsx → .tsx` retype only — retokenization happens in 0.5.4b)
- Merge: `HeaderTitleBlock.jsx` + `WebLogo.jsx` + `WebTitle.jsx` content → single `components/layout/header/HeaderTitle.tsx` (only `HeaderTitleBlock` + `WebLogo` content survives; `WebTitle` was commented-out dead code)
- Update imports in `Header.jsx` to point at new paths
- Delete dead `isJobsCurator` state + `JobsCuratorHeaderTitle` import in `Header.jsx`

No retokenization here. Pure file ops so downstream lanes have a clean starting structure.

---

### 0.5.4b — NavMenu retokenize + framer-motion drop
**Tag:** `[POLISH]` `[NO-TDD]`
**File:** `src/components/layout/header/NavMenu.tsx`

Replace every `michigan-blue`, `michigan-maize` hardcoded class with DS tokens (`bg-brand-primary`, `border-brand-accent`, `hover:text-brand-accent`, etc.). Drop `shadow-inner` (fights the maize border). Retain signature look: navy-on-navy submenu, 2xl radius, maize border, backdrop-blur.

Drop `framer-motion` imports. Replace submenu entrance (`motion.div` with spring physics) with `animate-in fade-in-0 zoom-in-95` utilities. Replace mobile menu height transition (already CSS-friendly via `max-h-[1000px]` trick) — remove any leftover `motion` wrappers.

Rename Latin-text places to use DS `type-*` classes.

---

### 0.5.4c — Header.tsx retokenize + auth wiring
**Tag:** `[POLISH]` `[NO-TDD]`
**File:** `src/components/layout/header/Header.tsx`

Retype `.jsx → .tsx`. Retokenize all color classes. Drop `motion.div` fade-in wrapper around mobile right-side — replace with CSS `animate-in fade-in-0 duration-300`. Drop `framer-motion` import.

Wire mock auth from 0.5.3: replace direct `session` prop consumption with `useMockAuth()` hook that returns real session in prod mode, context session in mock mode. Header receives `session` prop as before; hook is read inside the component.

Remove the pathname check (moved to 0.5.1). Drop `isPocha` branch + early return.

Apply chevron rotate-180 pattern for any remaining toggle arrows (though most live in NavMenu now).

---

### 0.5.4d — LoginButton migration
**Tag:** `[POLISH]` `[TDD]` (real-mode tests `.skip`'d)
**File:** `src/components/layout/header/LoginButton.tsx` + `src/components/layout/header/__tests__/LoginButton.test.tsx` (NEW)

API: `<LoginButton isAuthenticated={boolean} size={"md"|"sm"} />`. Do NOT pass full session. Wrapped in `React.memo`.

Implementation:
- DS `Button variant="secondary" size={size}` (white-ish bg, dark text, works on navy header)
- Drop `shadow-lg` (DS Button has no shadow by design)
- Drop `heebo.className` override (Pretendard is global, Korean labels render from it)
- Label: `"로그인"` (unauth) / `"로그아웃"` (auth)
- Real mode: calls `signIn("google", { callbackUrl: "/" })` / `signOut()`
- Mock mode: dispatches to `authContext` toggle (no real OAuth)
- Branch selector: `NEXT_PUBLIC_MOCK_API === "1"`

Tests:
- `it("renders 로그인 when not authenticated")` — runs
- `it("renders 로그아웃 when authenticated")` — runs
- `it("calls mock toggle in mock mode")` — runs
- `it.skip("calls signIn in real mode")` — written, skipped, unskip when dev env supports Google OAuth round-trip
- `it.skip("calls signOut in real mode")` — same

---

### 0.5.4e — UserInfo redesign
**Tag:** `[REDESIGN]` `[NO-TDD]`
**File:** `src/components/layout/header/UserInfo.tsx`

Replace current `<Link><Image fill/><p>name</p></Link>` pattern with `<Link><Avatar size="sm" src={image} name={name} /></Link>`.

- Use DS `Avatar` (not Next.js `<Image>`) — provides image → initials → user-icon fallbacks
- **Drop the name label entirely** — the responsive `hidden lg:block` text was adding complexity; Avatar alone is sufficient, cleaner, modern
- Drop `sejongHospitalBold.className` — no text, no font override needed
- `<Link href={`/users/${email}`}>` preserved
- Wrap in `React.memo`

Props: `<UserInfo email={string} name={string} image={string} />` — receive individual fields, not full session.

---

### 0.5.4f — MobileMenuButton migration
**Tag:** `[MECHANICAL]` `[NO-TDD]`
**File:** `src/components/layout/header/MobileMenuButton.tsx`

Retype `.jsx → .tsx`. Drop `framer-motion` (rotating icon variants) — replace with CSS `transition-transform` + conditional `rotate-90` class. Swap icons:
- `BurgerMenuIcon` → DS `<Icon name="menu" />`
- `CancelIcon` → DS `<Icon name="x" />`

Or (cleaner): use single icon with CSS transform — render `<Icon name="menu" className={cn("transition-transform duration-300", isOpen && "rotate-90 opacity-0")} />` stacked with a second `<Icon name="x" />` absolute-positioned, cross-fade. Exact animation at implementation time.

---

### 0.5.5 — Footer redesign
**Tag:** `[POLISH]` `[NO-TDD]`
**File:** `src/components/layout/footer/Footer.tsx`

Retype `.jsx → .tsx`. Retokenize classes to DS tokens.

**Content changes (locked from grill):**
- **Replace** the "UMICH KISA" wordmark home link with a copyright text line: `© 2026 University of Michigan Korean International Students Association`
- **Replace** Facebook icon with email icon — DS `<Icon name="mail" />` linked to `mailto:umichkisa@gmail.com`
- Keep Instagram — use DS `<Icon name="instagram-brand" />` (colored variant fits the sparse light-surface footer aesthetic)
- Drop `sejongHospitalLight.className` — Pretendard handles the copyright line; DS `type-caption` class applies

Resulting Footer is simpler: social/contact icons row + copyright line. No internal navigation.

Pathname check already removed in 0.5.1.

---

### 0.5.6 — Shell → DS Container (site-wide)
**Tag:** `[MECHANICAL]` `[NO-TDD]` (pending grill — may flip to `[REDESIGN]` if DS `Container` needs a wider variant)
**Scope:** Swap the manually composed page shell (`mx-auto max-w-screen-2xl px-4 md:px-24 lg:px-32`) for DS `Container` across the client. Surfaced as violation V3 by `ds-client-review` during lane 0.5.4c (PR #66), deferred out of that lane. See [client#67](https://github.com/KISA-webpage-development-team/KISA-website-client/issues/67) for the open spec. **Full spec TBD — will be written at Lane 0.5.6 kickoff via grill-me** (DS-side decision needed first: wider `Container` variant vs. widened default).

---

### 0.5.7 — Verification + merge
**Tag:** `[MECHANICAL]` `[NO-TDD]`
**Scope:** No code changes. Checks:

- `pnpm build` (DS) and `npm run build` (client) both pass
- `npm run typecheck` on client passes
- `pnpm --filter @umichkisa-ds/web build` passes
- Vercel `dev` preview sanity: toggle auth state, verify header logged-in / logged-out, verify mega-menu submenu renders with navy+maize theming, verify mobile accordion expand/collapse, verify `/pocha` routes render without Header/Footer, verify other routes still render with Header/Footer
- `ds-fixes-log.md` has the `instagram` + `instagram-brand` entries → run `ds-phase-end-bump` skill to bump DS `web` package + publish
- Update client `package.json` to new DS version
- Merge back to `dev` via `finishing-a-development-branch`

---

## Subphase / Wave Structure

Phase 0.5 is subphased (meta-override of HARNESS singleton rule — scope balloons too large for a single session). Subphases run in waves; within a wave, lanes are parallel-safe (different file scopes).

```
Wave 1:  0.5.1  (route groups — blocks everything visual)
         │
Wave 2:  0.5.2   ‖   0.5.3   ‖   0.5.4a
         DS icon     auth infra   cleanup/renames
         │
Wave 3:  0.5.4b  ‖  0.5.4d  ‖  0.5.4e  ‖  0.5.4f  ‖  0.5.5
         NavMenu    LoginBtn    UserInfo    MobileBtn   Footer
         │
Wave 4:  0.5.4c  (Header.tsx — needs 0.5.3 + 0.5.4b done)
         │
Wave 5:  0.5.6  (shell → DS Container, site-wide)
         │
Wave 6:  0.5.7  (verify + merge)
```

**Parallel-execution notes:**
- Each lane runs in its own git worktree off `dev`
- Merge order: serialize PR merges back to `dev`; conflicts minimal because file scopes don't overlap
- `package.json` touches: only 0.5.2 (DS dep bump at Phase 0.5 end, not lane-level) and 0.5.3 (potentially MSW/auth deps). Stagger if needed.
- 0.5.4a renames cascade through imports — must finish before Wave 3 lanes edit those files

**Speed estimate:** ~6 sessions if serial, ~4 sessions (wall time) if waves run in parallel. ~33% speedup.

---

## DS Fixes Required (log in `ds-fixes-log.md`)

| # | Fix | Lane | Action |
|---|---|---|---|
| 1 | Add `instagram` custom SVG (monochrome, currentColor) to DS icon registry | 0.5.2 | `ds-fix-during-migration` skill |
| 2 | Add `instagram-brand` custom SVG (official gradient) to DS icon registry | 0.5.2 | `ds-fix-during-migration` skill |

No other DS fixes anticipated for Phase 0.5. `--color-on-brand-primary` token was considered (white-on-navy) but dropped — Avatar + image-loaded state doesn't need it, and explicit `text-white` at usage sites is acceptable for the few header-nav-text spots.

---

## Locked Decisions (from grill session)

| # | Decision | Source |
|---|---|---|
| 1 | Nav primitives: retain aceternity-style mega-menu as client-local; retokenize to DS tokens (no DS NavigationMenu added) | Q1 |
| 2 | Auth: hybrid — next-auth in prod, mock context + dev toggle in `NEXT_PUBLIC_MOCK_API=1` mode | Q2 |
| 3 | Delete dead `isJobsCurator` branch + `JobsCuratorHeaderTitle` file | Q3 |
| 4 | LoginButton wrapper stays; DS Button `variant="secondary"`; `isAuthenticated` prop (not full session); `React.memo`; drop shadow + heebo | Q4 |
| 5 | UserInfo simplified to DS Avatar only (drop name label) | Q5 |
| 6 | Instagram: two custom SVG variants (`instagram` mono + `instagram-brand` gradient). Drop Facebook entirely — swap for email icon. Chevron uses single `chevron-down` with CSS rotate-180. DS Divider vertical replaces VerticalDivider. | Q6 |
| 7 | Route groups: `app/(main)/` + `app/(pocha)/`; Header/Footer drop pathname sniffing | Q7 |
| 8 | Footer: minimal preserved; wordmark replaced by copyright text; Facebook → email icon (`mailto:umichkisa@gmail.com`); Instagram uses colored brand variant | Q8 |
| 9 | Drop framer-motion from header layer entirely; CSS-only animations | Q9 |
| 10 | TDD: LoginButton only (`[TDD]`), real-mode tests `.skip`'d until dev env supports OAuth round-trip | Q10 |
| 11 | Clean file structure: merge 3 title files → 1 `HeaderTitle.tsx`; single `NavMenu.tsx`; delete 8 dead files; drop `aceternity/` directory | Q11 |
| 12 | Fonts: Phase 0 handled — drop all `sejongHospitalBold/Light/heebo` imports, use DS `type-*` classes which bind to the right font family | Q12 |
| 13 | Auth wiring: `src/mocks/authContext.tsx` context + floating dev toggle widget | Q13 |

---

## Notes

- **Parallel-wave pickup protocol:** When a cold session picks up Phase 0.5, check which wave the phase is in (by reading `plan.md` checkboxes and `notes.md` breadcrumbs), present the wave's full lane menu, wait for user to pick which lane this terminal works on. Do NOT auto-select an unchecked lane — parallel terminals may have already claimed it without committing yet.
- **Autonomous execution protocol:** A separate grill (in progress at time of writing) is designing an issue-triggered, routine-based autonomous PR flow for mechanical/polish lanes. When locked, it will inform how lanes in this phase get scheduled, executed, and reviewed. Until then, lanes are picked up interactively per the parallel-wave protocol above.
- **`notes.md`** (strict append-only, per HARNESS) will be created when any lane's execution begins.
- **`plan.md`** (not yet written) will translate this audit into checkboxed tasks. Written next session or after autonomous-protocol grill completes.
