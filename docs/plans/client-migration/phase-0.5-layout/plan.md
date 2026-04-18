# Phase 0.5 — Shared Layout (Plan)

> Lanes from this plan become GitHub issues executed per `docs/plans/client-migration/AUTONOMOUS_PROTOCOL.md`. Implementation only below — labels, bailout triggers, budgets, and non-goals live on the issues.

**Scope:** Migrate `Header`, `Footer`, `MobileMenu*` from client's pre-DS code into DS-tokenized, DS-componentized, idiomatic App Router layout. Source of truth: `./audit.md`.

---

## Wave / Dependency Structure

```
Wave 1:  0.5.1  (route groups — blocks everything visual)
         │
Wave 2:  0.5.2   ‖   0.5.3   ‖   0.5.4a
         DS icon     auth infra   cleanup/renames
         │
Wave 2.5: 0.5.2.bump  (mid-phase pre-consume bump for Footer's instagram-brand; needs-interactive per AUTONOMOUS_PROTOCOL.md §14c)
         │
Wave 3:  0.5.4b  ‖  0.5.4d  ‖  0.5.4e  ‖  0.5.4f  ‖  0.5.5
         NavMenu    LoginBtn    UserInfo    MobileBtn   Footer
         │
Wave 4:  0.5.4c  (Header.tsx — needs 0.5.3 + 0.5.4b merged)
         │
Wave 5:  0.5.6  (verify + phase end-bump + merge to dev)
```

**Dependency edges** (→ means "must merge before"):

- `0.5.1 → 0.5.4a, 0.5.4b, 0.5.4c, 0.5.4d, 0.5.4e, 0.5.4f, 0.5.5`
- `0.5.4a → 0.5.4b, 0.5.4c, 0.5.4d, 0.5.4e, 0.5.4f` (rename targets must exist)
- `0.5.3 → 0.5.4c, 0.5.4d` (auth context consumed)
- `0.5.4b → 0.5.4c` (Header imports retokenized NavMenu)
- `0.5.2 → 0.5.2.bump → 0.5.5` (Footer uses `instagram-brand` icon; mid-phase bump publishes DS so client CI can install the new icon before lane 0.5.5 lands — per `AUTONOMOUS_PROTOCOL.md` §14c)
- `all → 0.5.6`

---

## Label Disposition (6-Rule Gate)

Applied per `AUTONOMOUS_PROTOCOL.md` §4. Drives `autonomous-ready` vs `needs-interactive` at issue creation.

| Lane | Tag | Disposition | Rationale |
|---|---|---|---|
| 0.5.1 | [POLISH][NO-TDD] | `autonomous-ready` | Directory moves + pathname-check drop; scope concrete, no auth logic |
| 0.5.2 | [MECHANICAL][NO-TDD] | `autonomous-ready` | DS icon additions; isolated to DS repo |
| 0.5.2.bump | [MECHANICAL][NO-TDD] | `needs-interactive` | Touches publish (`ds-phase-end-bump` skill, mid-phase invocation); hard-denied for autonomous per §9 |
| 0.5.3 | [REDESIGN][NO-TDD] | `needs-interactive` | Rule 1 fails (REDESIGN); new auth pipeline |
| 0.5.4a | [MECHANICAL][NO-TDD] | `autonomous-ready` | File ops + import rewrites |
| 0.5.4b | [POLISH][NO-TDD] | `autonomous-ready` | Pure retokenize; framer drop |
| 0.5.4c | [POLISH][NO-TDD] | `needs-interactive` | Consumes auth hook from 0.5.3; first integration point — review live |
| 0.5.4d | [POLISH][TDD] | `autonomous-ready` | Test cases pre-specified; consumes (not designs) auth |
| 0.5.4e | [REDESIGN][NO-TDD] | `needs-interactive` | Rule 1 fails (REDESIGN) |
| 0.5.4f | [MECHANICAL][NO-TDD] | `autonomous-ready` | CSS-only animation swap |
| 0.5.5 | [POLISH][NO-TDD] | `autonomous-ready` | Retokenize + copy swap |
| 0.5.6 | [MECHANICAL][NO-TDD] | `needs-interactive` | Touches publish (ds-phase-end-bump); final merge |

---

## Lane 0.5.1 — Route group restructure

**Repo:** `KISA-website-client`

### Files

- Create: `src/app/(main)/layout.tsx` (renders `<Header /> {children} <Footer />`, hosts session prop wiring)
- Create: `src/app/(pocha)/` (directory only)
- Move: `src/app/about` → `src/app/(main)/about`
- Move: `src/app/boards` → `src/app/(main)/boards`
- Move: `src/app/everykisa` → `src/app/(main)/everykisa`
- Move: `src/app/game-night-rsvp` → `src/app/(main)/game-night-rsvp`
- Move: `src/app/info` → `src/app/(main)/info`
- Move: `src/app/jobs` → `src/app/(main)/jobs`
- Move: `src/app/page.tsx` → `src/app/(main)/page.tsx`
- Move: `src/app/posts` → `src/app/(main)/posts`
- Move: `src/app/signin` → `src/app/(main)/signin`
- Move: `src/app/signup` → `src/app/(main)/signup`
- Move: `src/app/users` → `src/app/(main)/users`
- Move: `src/app/pocha` → `src/app/(pocha)/pocha`
- Stays at root: `api/`, `layout.tsx` (bare: html/body + providers), `template.tsx`, `globals.css`, `home.css`, `favicon.ico`
- Modify: `src/app/layout.tsx` — strip Footer import; leave providers + html/body shell only
- Modify: `src/components/layout/header/Header.jsx` — drop `if (pathname.startsWith("/pocha")) return null`
- Modify: `src/components/layout/footer/Footer.jsx` — drop same pathname check

### Tasks

- [ ] Create `src/app/(main)/layout.tsx` with Header+children+Footer; mirror session prop wiring from current root `template.tsx` consumption
- [ ] Move all 11 listed directories/files into `(main)` via `git mv` (preserves history)
- [ ] Move `pocha` into `(pocha)/pocha` via `git mv`
- [ ] Strip Footer import and Footer render from root `src/app/layout.tsx`
- [ ] Remove pathname-sniffing early returns from `Header.jsx` and `Footer.jsx`
- [ ] Run `npm run build` and `npm run typecheck` — both pass
- [ ] Manual: visit `/`, `/jobs`, `/posts`, `/pocha` in dev — non-pocha shows Header+Footer; pocha does not

### Acceptance criteria

- [ ] All routes resolve under new group paths (no 404s for moved routes)
- [ ] Root `layout.tsx` no longer imports or renders `Header`/`Footer`
- [ ] `(main)/layout.tsx` renders Header+Footer for all non-pocha routes
- [ ] `(pocha)/pocha` routes render without Header/Footer
- [ ] No `pathname.startsWith("/pocha")` in Header/Footer
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes

---

## Lane 0.5.2 — DS Instagram icons

**Repo:** `umichkisa-ds`

### Files

- Create: `packages/web/src/components/icon/custom/InstagramIcon.tsx` (monochrome, `fill="currentColor"`)
- Create: `packages/web/src/components/icon/custom/InstagramBrandIcon.tsx` (official gradient)
- Modify: `packages/web/src/components/icon/registry.ts` — add `"instagram"` and `"instagram-brand"` entries
- Append: `docs/plans/client-migration/ds-fixes-log.md` — log both additions

### Tasks

- [ ] Lift SVG source from `../KISA-website/client/src/deprecated-components/shared/InstagramLinkIcon.jsx` (mono) and use official Instagram brand SVG for gradient
- [ ] Create `InstagramIcon.tsx` matching existing custom-icon pattern (ref: `GithubIcon.tsx`, `LinkedinIcon.tsx`)
- [ ] Create `InstagramBrandIcon.tsx` with inline gradient definition
- [ ] Wire both into `registry.ts` under keys `"instagram"` and `"instagram-brand"`
- [ ] Run `pnpm --filter @umichkisa-ds/web build` — passes
- [ ] Append entry to `ds-fixes-log.md` with date + lane ref

### Acceptance criteria

- [ ] `<Icon name="instagram" />` renders monochrome SVG using `currentColor`
- [ ] `<Icon name="instagram-brand" />` renders official gradient variant
- [ ] Registry entries follow existing custom-icon pattern (no divergence)
- [ ] `pnpm build` passes
- [ ] `ds-fixes-log.md` has both entries

---

## Lane 0.5.2.bump — Mid-phase DS publish (pre-consume for Footer)

**Repo:** `umichkisa-ds` (+ `KISA-website-client` for repin)

Invoked per `AUTONOMOUS_PROTOCOL.md` §14c. Runs interactively after lane 0.5.2 merges and before lane 0.5.5 runs, so the Footer's `<Icon name="instagram-brand" />` reference resolves against an installed DS version that actually has the icon.

### Files

- Modify: `packages/web/package.json` — bump `version` patch (e.g., `1.0.0 → 1.0.1`)
- Append: `docs/plans/client-migration/ds-fixes-log.md` — mid-phase bump entry with lane reference
- Modify (client repo): `KISA-website-client/package.json` — pin `"@umichkisa-ds/web"` to the new version
- Modify (client repo): `KISA-website-client/package-lock.json` — lockfile sync via `npm install`

### Tasks

- [ ] Confirm lane 0.5.2 is merged to DS `main` and `packages/web/src/components/icon/registry.ts` has both `"instagram"` and `"instagram-brand"` entries
- [ ] Bump `packages/web/package.json` version → next patch (no minor/major — mid-phase bumps are patch-only)
- [ ] Append entry to `docs/plans/client-migration/ds-fixes-log.md` marked `mid-phase` with lane reference
- [ ] Commit DS changes: `chore(web): bump to <version> for phase 0.5 mid-phase pre-consume (lane 0.5.5)`
- [ ] `git tag web-v<version>`
- [ ] `git push` + `git push --tags` → GitHub Actions publishes to npm
- [ ] Wait for the publish workflow to succeed (verify on npm / GitHub Actions)
- [ ] In `KISA-website-client`: update `package.json` `"@umichkisa-ds/web"` pin to `<version>`
- [ ] Run `npm install` (no-arg, lockfile sync only) → verify only `@umichkisa-ds/web` entries changed
- [ ] Commit client on a short-lived branch: `chore(deps): bump @umichkisa-ds/web to <version> (mid-phase pre-consume for lane 0.5.5)`
- [ ] Open PR against client `dev`; merge once CI is green

### Acceptance criteria

- [ ] DS `packages/web/package.json` version is the new patch
- [ ] `web-v<version>` tag exists on DS `main` and has been published to npm
- [ ] `ds-fixes-log.md` has a `mid-phase` entry for this bump
- [ ] Client `package.json` pins `"@umichkisa-ds/web": "<version>"` (exact, no caret)
- [ ] Client `package-lock.json` diff is limited to `@umichkisa-ds/web` (and any peer deps it pulled in); no unrelated churn
- [ ] Any open client PR that consumes the new icon (e.g., lane 0.5.5) turns CI green after rebasing onto the bumped `dev`

### Non-goals

- Minor / major DS version bumps (reserve for phase end)
- Bundling other DS fixes into this bump (those land at phase end; mid-phase bumps are pre-consume only)
- Modifying DS component APIs

---

## Lane 0.5.3 — Hybrid auth infrastructure

**Repo:** `KISA-website-client`

### Files

- Create: `src/mocks/authContext.tsx` — React Context provider + dev-only floating toggle widget. Gated by `NEXT_PUBLIC_MOCK_API === "1"`
- Modify: `src/mocks/MSWProvider.tsx` — wrap children with `<AuthContextProvider>` when `NEXT_PUBLIC_MOCK_API === "1"`
- Modify: `src/app/template.tsx` — if mock mode, bypass `getServerSession` and inject a dummy session from context

### Tasks

- [ ] Define mock session shape matching next-auth `Session` type (user: {name, email, image})
- [ ] Implement `AuthContextProvider` with `isAuthenticated` state + `toggle()` action
- [ ] Implement floating toggle widget (fixed bottom-right, `z-50`, mock-mode-only visibility)
- [ ] Implement `useMockAuth()` hook returning `{ session, isAuthenticated, toggle }`
- [ ] Extend `MSWProvider` to wrap with `AuthContextProvider` conditionally
- [ ] Update `template.tsx` to branch on env var: mock-mode reads from context, prod-mode continues `getServerSession`
- [ ] Verify in Vercel `dev` preview: toggle flips between logged-in/out states

### Acceptance criteria

- [ ] Prod build: `NEXT_PUBLIC_MOCK_API` unset → `getServerSession` flow unchanged
- [ ] Dev build: `NEXT_PUBLIC_MOCK_API=1` → floating toggle visible, flips session state
- [ ] Header (old `.jsx`) still renders without visual regression
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes

---

## Lane 0.5.4a — Header folder cleanup & renames

**Repo:** `KISA-website-client`

### Files

- Delete: `src/components/layout/header/Menu.jsx`
- Delete: `src/components/layout/header/MobileMenu.jsx`
- Delete: `src/components/layout/header/MobileMenuList.jsx`
- Delete: `src/components/layout/header/MobileMenuCloseButton.jsx`
- Delete: `src/components/layout/header/WebTitle.jsx`
- Delete: `src/components/layout/header/header.module.css`
- Delete: `src/features/jobs-curator/layout/HeaderTitle.tsx`
- Delete: `src/components/ui/aceternity/` (entire directory, after navbar-menu moved)
- Rename: `src/components/ui/aceternity/navbar-menu.jsx` → `src/components/layout/header/NavMenu.tsx` (file move + `.jsx → .tsx` retype only; no content changes)
- Merge: `HeaderTitleBlock.jsx` + `WebLogo.jsx` content → new `src/components/layout/header/HeaderTitle.tsx` (single file; `WebTitle` content is dead, don't include)
- Delete: `src/components/layout/header/HeaderTitleBlock.jsx`
- Delete: `src/components/layout/header/WebLogo.jsx`
- Modify: `src/components/layout/header/Header.jsx` — update imports to new paths; remove `isJobsCurator` state + `JobsCuratorHeaderTitle` import

### Tasks

- [ ] `git mv` navbar-menu into new NavMenu.tsx path; retype `.jsx → .tsx` (no content diff)
- [ ] Create `HeaderTitle.tsx` merging HeaderTitleBlock + WebLogo content
- [ ] Delete all 8 dead files listed above
- [ ] Delete `components/ui/aceternity/` directory once navbar-menu is moved
- [ ] Update Header.jsx imports to new paths
- [ ] Strip `isJobsCurator` state, setter, conditional, and `JobsCuratorHeaderTitle` import from Header.jsx
- [ ] Run `npm run typecheck` — passes
- [ ] Run `npm run build` — passes

### Acceptance criteria

- [ ] Zero references to deleted files across codebase (`grep` clean for `Menu`, `MobileMenuList`, `WebTitle`, `HeaderTitleBlock`, `WebLogo`, `aceternity`, `JobsCuratorHeaderTitle`)
- [ ] `HeaderTitle.tsx` renders equivalent to prior `HeaderTitleBlock`
- [ ] `NavMenu.tsx` identical content to prior `navbar-menu.jsx` (retokenize happens in 0.5.4b)
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] Site renders identically to pre-lane state in dev

---

## Lane 0.5.4b — NavMenu retokenize + framer-motion drop

**Repo:** `KISA-website-client`

### Files

- Modify: `src/components/layout/header/NavMenu.tsx`

### Tasks

- [ ] Replace every `michigan-blue` class occurrence with `bg-brand-primary` / `text-brand-primary` / `border-brand-primary` as contextually correct
- [ ] Replace every `michigan-maize` class with `border-brand-accent` / `text-brand-accent` / `bg-brand-accent`
- [ ] Replace hover color classes with `hover:text-brand-accent` equivalents
- [ ] Drop `shadow-inner` (fights maize border)
- [ ] Remove `framer-motion` imports and `motion.*` wrappers
- [ ] Replace submenu entrance animation (was `motion.div` spring) with `animate-in fade-in-0 zoom-in-95 duration-200`
- [ ] Replace any remaining Latin-text classes with DS `type-*` classes
- [ ] Preserve signature look: navy-on-navy submenu, `rounded-2xl`, maize border, `backdrop-blur`
- [ ] Run `npm run typecheck` — passes
- [ ] Manual: mega-menu submenu opens/closes smoothly; mobile accordion still expands

### Acceptance criteria

- [ ] Zero `michigan-blue` / `michigan-maize` raw class occurrences in file
- [ ] Zero `framer-motion` imports
- [ ] Submenu animation uses CSS-only `animate-in` utilities
- [ ] Visual parity: navy+maize treatment preserved
- [ ] `npm run typecheck` passes

---

## Lane 0.5.4c — Header.tsx retokenize + auth wiring

**Repo:** `KISA-website-client`

### Files

- Rename: `src/components/layout/header/Header.jsx` → `src/components/layout/header/Header.tsx`
- Modify: the new `Header.tsx` — retokenize + auth hook wiring

### Tasks

- [ ] `git mv` Header.jsx → Header.tsx; add types for props (session, etc.)
- [ ] Retokenize color classes: `michigan-blue` → `bg-brand-primary`, `michigan-maize` → `text-brand-accent`, etc.
- [ ] Drop `motion.div` fade-in wrapper around mobile right-side; replace with `<div className="animate-in fade-in-0 duration-300">`
- [ ] Remove `framer-motion` imports
- [ ] Replace direct `session` prop consumption with `useMockAuth()` hook (from 0.5.3); hook returns real or mock session per env
- [ ] Confirm pathname check is already removed (done in 0.5.1) — no-op verify
- [ ] Apply chevron rotate-180 pattern to any remaining toggle arrows
- [ ] Replace Latin-text classes with DS `type-*` classes
- [ ] Run `npm run typecheck` — passes
- [ ] Manual: header renders in both mock-mode toggle states and prod mode

### Acceptance criteria

- [ ] File is `.tsx` with full TypeScript types on props
- [ ] Zero `michigan-*` raw classes
- [ ] Zero `framer-motion` imports
- [ ] `useMockAuth()` consumed (not raw `session` prop)
- [ ] Mobile right-side fade-in animates via CSS
- [ ] Visual parity with prior header
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes

---

## Lane 0.5.4d — LoginButton migration

**Repo:** `KISA-website-client`

### Files

- Rename: `src/components/layout/header/LoginButton.jsx` → `src/components/layout/header/LoginButton.tsx`
- Create: `src/components/layout/header/__tests__/LoginButton.test.tsx`

### Tasks

- [ ] Write failing tests first:
  - `it("renders 로그인 when not authenticated")`
  - `it("renders 로그아웃 when authenticated")`
  - `it("calls mock toggle in mock mode")`
  - `it.skip("calls signIn in real mode")` (skipped — no OAuth round-trip in dev env)
  - `it.skip("calls signOut in real mode")` (skipped — same reason)
- [ ] Run tests; verify first three fail, skipped are reported as skipped
- [ ] Rename `.jsx → .tsx`; define props `{ isAuthenticated: boolean; size?: "md" | "sm" }`
- [ ] Implement with DS `<Button variant="secondary" size={size}>`
- [ ] Label: `"로그인"` (unauth) / `"로그아웃"` (auth)
- [ ] Branch on `NEXT_PUBLIC_MOCK_API === "1"`:
  - Real: `signIn("google", { callbackUrl: "/" })` / `signOut()`
  - Mock: call `useMockAuth().toggle()`
- [ ] Wrap export in `React.memo`
- [ ] Drop `shadow-lg` class and `heebo.className` font override
- [ ] Run tests; first three pass, two skipped
- [ ] Run `npm run typecheck` — passes

### Acceptance criteria

- [ ] Props match `{ isAuthenticated, size? }` (no full session prop)
- [ ] 3 tests pass; 2 tests skipped and documented in the test file header comment
- [ ] Real-mode branch calls `signIn`/`signOut`; mock-mode branch calls context toggle
- [ ] `React.memo` wraps export
- [ ] No raw `shadow-lg` on the button, no Heebo font override
- [ ] `npm run typecheck` passes

---

## Lane 0.5.4e — UserInfo redesign

**Repo:** `KISA-website-client`

### Files

- Rename: `src/components/layout/header/UserInfo.jsx` → `src/components/layout/header/UserInfo.tsx`

### Tasks

- [ ] Replace `<Image fill />` + name label JSX with `<Avatar size="sm" src={image} name={name} />`
- [ ] Drop the responsive `hidden lg:block` name text entirely (simplification, per locked decision #5)
- [ ] Drop `sejongHospitalBold.className` font override
- [ ] Preserve `<Link href={`/users/${email}`}>` wrapper
- [ ] Define props `{ email: string; name: string; image: string }` (individual fields, not full session)
- [ ] Wrap export in `React.memo`
- [ ] Run `npm run typecheck` — passes
- [ ] Manual: avatar renders in all three fallback states (image / initials / user-icon)

### Acceptance criteria

- [ ] No `<Image>` import; uses DS `<Avatar>`
- [ ] No name text rendered alongside avatar
- [ ] Props are `{ email, name, image }`, not full session
- [ ] Link target preserved: `/users/${email}`
- [ ] `React.memo` wraps export
- [ ] `npm run typecheck` passes

---

## Lane 0.5.4f — MobileMenuButton migration

**Repo:** `KISA-website-client`

### Files

- Rename: `src/components/layout/header/MobileMenuButton.jsx` → `src/components/layout/header/MobileMenuButton.tsx`

### Tasks

- [ ] `git mv` `.jsx → .tsx`
- [ ] Drop `framer-motion` imports
- [ ] Replace `BurgerMenuIcon` with `<Icon name="menu" />`
- [ ] Replace `CancelIcon` with `<Icon name="x" />`
- [ ] Animation: render both icons absolute-positioned, cross-fade via `transition-opacity` + conditional `opacity-0`/`opacity-100`; OR single icon with `transition-transform` + `rotate-90` when `isOpen`. Pick at implementation time.
- [ ] Type props explicitly
- [ ] Run `npm run typecheck` — passes

### Acceptance criteria

- [ ] Zero `framer-motion` imports
- [ ] Uses DS `<Icon>` primitive (no raw SVG imports)
- [ ] Open/close toggles smoothly via CSS-only transition
- [ ] `npm run typecheck` passes

---

## Lane 0.5.5 — Footer redesign

**Repo:** `KISA-website-client`

### Files

- Rename: `src/components/layout/footer/Footer.jsx` → `src/components/layout/footer/Footer.tsx`

### Tasks

- [ ] `git mv` `.jsx → .tsx`; add types
- [ ] Replace "UMICH KISA" wordmark home link with copyright text: `© 2026 University of Michigan Korean International Students Association`
- [ ] Replace Facebook icon + link with `<Icon name="mail" />` linked via `<a href="mailto:umichkisa@gmail.com">`
- [ ] Replace existing Instagram icon with `<Icon name="instagram-brand" />` (colored variant; depends on 0.5.2)
- [ ] Drop `sejongHospitalLight.className` font override
- [ ] Apply `type-caption` to the copyright line
- [ ] Retokenize any remaining `michigan-*` classes to DS tokens
- [ ] Confirm pathname check already removed (0.5.1)
- [ ] Run `npm run typecheck` — passes
- [ ] Manual: footer renders with new copyright + Instagram + mail icons; no internal nav

### Acceptance criteria

- [ ] No wordmark home link; copyright text present
- [ ] Facebook replaced with mail icon + mailto
- [ ] Instagram uses `instagram-brand` DS icon
- [ ] Zero `michigan-*` raw classes
- [ ] No font-family overrides; `type-caption` applied
- [ ] `npm run typecheck` passes

---

## Lane 0.5.6 — Verification + phase end-bump + merge

**Repo:** `KISA-website-client` (+ `umichkisa-ds` for bump)

### Files

- None (verification + release)

### Tasks

- [ ] Run `pnpm --filter @umichkisa-ds/web build` in DS repo — passes
- [ ] Run `npm run build` in client — passes
- [ ] Run `npm run typecheck` in client — passes
- [ ] Vercel `dev` preview sanity check:
  - [ ] Toggle auth state (mock widget); header logged-in and logged-out variants render
  - [ ] Mega-menu submenu renders with navy+maize theming
  - [ ] Mobile accordion expand/collapse works
  - [ ] `/pocha/*` routes render without Header/Footer
  - [ ] Non-pocha routes render with Header/Footer
- [ ] Confirm `ds-fixes-log.md` has `instagram` + `instagram-brand` entries for this phase
- [ ] Invoke `ds-phase-end-bump` skill → bump DS `web` package version, tag, publish
- [ ] Update `KISA-website/client/package.json` to new DS version
- [ ] `npm install` in client — lockfile updates cleanly
- [ ] Commit client version bump
- [ ] Merge all lane PRs back to `dev` via `finishing-a-development-branch`
- [ ] Tick Phase 0.5 in `docs/TODO.md`

### Acceptance criteria

- [ ] All builds and typechecks green across both repos
- [ ] Vercel preview smoke test passes all listed scenarios
- [ ] DS `web` package published with new version tag
- [ ] Client pinned to new DS version
- [ ] Phase 0.5 ticked in `docs/TODO.md`
