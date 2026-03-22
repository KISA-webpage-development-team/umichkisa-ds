# Docs App Token Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix the docs app so all Tailwind utility classes from DS tokens (`text-foreground`, `bg-surface`, `font-sejong-bold`, etc.) generate correctly, and ensure docs components contain no DS constraint violations.

**Architecture:** Add a `./theme.css` source export to the DS package so consumer apps can `@import` it into their Tailwind-processed CSS and get full utility generation. The docs app then imports this instead of maintaining a manual `@theme` block. Three files change in lockstep (package.json, globals.css, layout.tsx), followed by targeted component fixes.

**Tech Stack:** Tailwind CSS v4 (CSS-first config), Next.js 15 App Router, pnpm monorepo, tsup for DS build

---

## Background: Why Utilities Weren't Generating

`dist/styles.css` is fully compiled Tailwind output — no `@theme` blocks survive the build. The docs app's Tailwind build never saw a `@theme` block, so it never generated utilities like `.text-foreground`. The existing partial `@theme inline` block in `globals.css` was an incomplete workaround (only 10 of 30+ tokens).

The fix: expose `src/styles/index.css` (which contains the `@theme inline` blocks) as a named package export. Consumer apps import this file into their own Tailwind pipeline; Tailwind processes it and generates all utilities.

---

## Task 1: Add `./theme.css` Source Export to DS Package

**Files:**
- Modify: `packages/web/package.json`

### Step 1: Add the `./theme.css` export entry

In `packages/web/package.json`, add `"./theme.css"` to the `exports` field and add `"src"` to `files`:

**Current `exports`:**
```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js",
    "require": "./dist/index.cjs"
  },
  "./dist/styles.css": "./dist/styles.css"
},
"files": [
  "dist"
],
```

**After:**
```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js",
    "require": "./dist/index.cjs"
  },
  "./dist/styles.css": "./dist/styles.css",
  "./theme.css": "./src/styles/index.css"
},
"files": [
  "dist",
  "src/styles"
],
```

### Step 2: Verify the export resolves in the monorepo

Run:
```bash
node -e "require.resolve('@umichkisa-ds/web/theme.css')"
```
Expected: prints a path ending in `packages/web/src/styles/index.css` (no error).

If this fails, run `pnpm install` first (workspace symlinks may need refreshing).

### Step 3: Verify DS package still builds

Run:
```bash
pnpm --filter @umichkisa-ds/web build
```
Expected: exits 0, no errors.

### Step 4: Commit

```bash
git add packages/web/package.json
git commit -m "feat(pkg): expose ./theme.css source export for consumer Tailwind"
```

---

## Task 2: Restructure `globals.css` and Remove Redundant JS Import

**Files:**
- Modify: `apps/docs/app/globals.css`
- Modify: `apps/docs/app/layout.tsx`

These two files change together. Do not commit them separately — a partial state would either break builds or leave dead code.

### Step 1: Replace the manual `@theme` block in `globals.css`

Open `apps/docs/app/globals.css`. The file currently has:

```css
@import "tailwindcss";

/* ── Content Sources ───── */
@source "../app/**/*.{tsx,ts,mdx,md}";
@source "../components/**/*.{tsx,ts}";
@source "../content/**/*.{md,mdx}";

/* ── DS Token → Tailwind Utility Mapping ─── */
/*
 * ... stale comment block about partial @theme ...
 */
@theme inline {
  --color-brand-primary:  var(--color-brand-primary);
  /* ... 9 more tokens ... */
}

/* ── Layout Variables ──── */
:root {
  --font-pretendard: 'Pretendard Variable', system-ui, sans-serif;
  --docs-header-h:  80px;
  /* ... z-index vars ... */
}

/* ── Base ── */
@layer base { ... }
```

Replace it with:

```css
@import "tailwindcss";
@import "@umichkisa-ds/web/theme.css";

/* ── Content Sources ──────────────────────────────────────────────── */
/*
 * Explicit @source directives are required in this pnpm monorepo because
 * Tailwind v4's auto-detection resolves to the workspace root rather than
 * this package, causing zero utilities to be generated.
 */
@source "../app/**/*.{tsx,ts,mdx,md}";
@source "../components/**/*.{tsx,ts}";
@source "../content/**/*.{md,mdx}";

/* ── Docs-App Layout Variables ───────────────────────────────────── */
/*
 * These are docs-specific layout constants, not DS tokens.
 * Used in calc() inside arbitrary Tailwind values, e.g.
 * min-h-[calc(100vh-var(--docs-header-h))].
 */
:root {
  --docs-header-h:  80px;
  --docs-sidebar-w: 240px;

  /* z-index scale — never use values outside this set */
  --docs-z-sticky:   10;
  --docs-z-backdrop: 20;
  --docs-z-sidebar:  30;
  /* 40: reserved */
  --docs-z-header:   50;
  --docs-z-skip:    100;
}

/* ── Base ──────────────────────────────────────────────────────────── */
@layer base {
  *, *::before, *::after { box-sizing: border-box; }

  body {
    margin: 0;
    background: var(--color-surface);
    color: var(--color-foreground);
    font-family: var(--font-pretendard), system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  a { text-decoration: none; color: inherit; }
}
```

Key changes:
- Added `@import "@umichkisa-ds/web/theme.css"` on line 2
- Removed the stale `/* ── DS Token → Tailwind Utility Mapping */` comment block
- Removed the incomplete `@theme inline { ... }` block
- Removed `--font-pretendard` from `:root` (now comes from the DS theme import)
- Kept all `@source` directives, layout variables, and `@layer base` unchanged

### Step 2: Remove the JS dist import from `layout.tsx`

Open `apps/docs/app/layout.tsx`. Remove line 4:

```tsx
import '@umichkisa-ds/web/dist/styles.css'  // ← delete this line
```

Leave everything else in layout.tsx unchanged. The `@import "@umichkisa-ds/web/theme.css"` in globals.css now handles all CSS loading — the dist import is redundant and was causing double-loading.

### Step 3: Verify the docs app builds

Run:
```bash
pnpm --filter @umichkisa-ds/docs build
```
Expected: exits 0, no errors.

### Step 4: Verify TypeScript is clean

Run:
```bash
pnpm typecheck
```
Expected: exits 0, no errors.

### Step 5: Commit

```bash
git add apps/docs/app/globals.css apps/docs/app/layout.tsx
git commit -m "fix(docs): replace partial @theme block with DS theme.css import"
```

---

## Task 3: Fix Token Violations in Docs Components

**Files:**
- Modify: `apps/docs/components/DocsShell.tsx`
- Modify: `apps/docs/components/Header.tsx`
- Modify: `apps/docs/components/Sidebar.tsx`

These are the three components with token violations where exact DS tokens exist.

### Step 1: Fix `DocsShell.tsx` — `text-white` on skip link

**File:** `apps/docs/components/DocsShell.tsx`, line 18

`text-white` is not a DS token. The skip link sits on `bg-brand-primary` (Michigan navy), and `--color-brand-foreground` is Michigan maize — the correct text color for content on brand-primary backgrounds.

Change:
```tsx
className="absolute left-[-9999px] top-4 bg-brand-primary text-white px-4 py-2 rounded-md text-sm font-bold z-[var(--docs-z-skip)] focus:left-4"
```
To:
```tsx
className="absolute left-[-9999px] top-4 bg-brand-primary text-brand-foreground px-4 py-2 rounded-md text-sm font-bold z-[var(--docs-z-skip)] focus:left-4"
```

### Step 2: Fix `Header.tsx` — primitive tokens on version badge

**File:** `apps/docs/components/Header.tsx`, line 97

`bg-michigan-maize` and `text-michigan-blue` reference primitive tokens directly (bypassing the semantic layer). Also, after Task 2 removes the old `@theme inline` block from globals.css, these utilities will no longer be generated — so this fix is **required** for the build to work.

The semantic equivalents:
- `bg-michigan-maize` → `bg-brand-accent` (`--color-brand-accent` = michigan maize)
- `text-michigan-blue` → `text-brand-primary` (`--color-brand-primary` = michigan navy)

Change:
```tsx
<span className="bg-michigan-maize text-michigan-blue font-sejong-bold
  text-xs tracking-wide px-2.5 py-1
  rounded-full whitespace-nowrap">
```
To:
```tsx
<span className="bg-brand-accent text-brand-primary font-sejong-bold
  text-xs tracking-wide px-2.5 py-1
  rounded-full whitespace-nowrap">
```

### Step 3: Fix `Sidebar.tsx` — `bg-black/35` on backdrop

**File:** `apps/docs/components/Sidebar.tsx`, line 83

`bg-black/35` is a raw color. The DS defines `--color-overlay: oklch(0% 0 0 / .4)` for this use case.

Change:
```tsx
className={`fixed inset-0 bg-black/35 z-[var(--docs-z-backdrop)] ...`}
```
To:
```tsx
className={`fixed inset-0 bg-overlay z-[var(--docs-z-backdrop)] ...`}
```

### Step 4: Verify no `text-white`, `bg-black`, `bg-white`, `michigan-maize`, `michigan-blue` remain in components

Run:
```bash
grep -rn "text-white\|bg-black\|bg-white\|michigan-maize\|michigan-blue" apps/docs/components/
```
Expected: no output (zero matches).

### Step 5: Build and typecheck

Run:
```bash
pnpm --filter @umichkisa-ds/docs build && pnpm typecheck
```
Expected: both exit 0.

### Step 6: Commit

```bash
git add apps/docs/components/DocsShell.tsx apps/docs/components/Header.tsx apps/docs/components/Sidebar.tsx
git commit -m "fix(docs): replace primitive/raw color tokens with semantic DS tokens"
```

---

## Task 4: Audit Remaining Components — Document DS Gaps

**Files:**
- Modify: `apps/docs/components/Callout.tsx`
- Modify: `apps/docs/components/DoDont.tsx`
- Modify: `apps/docs/components/ContrastTable.tsx`

Three components use hardcoded oklch values in inline `style` props for feedback UI. The DS only defines two levels per feedback color (`--color-*` and `--color-*-subtle`). These components need 3-4 levels (subtle bg, medium border, accent, dark label text). **This is a DS gap, not a component defect.**

The required change is not to rewrite the components, but to add comments marking each raw value as a known DS gap, so future sessions can resolve them when the DS adds mid-shade feedback tokens.

### Step 1: Add DS gap comments to `Callout.tsx`

At the top of the `configs` object (above `info:`), add:

```tsx
/*
 * DS GAP: Callout uses 4 shades per feedback type (bg, border, accent, labelColor).
 * The DS currently defines only --color-*-subtle (bg) and --color-* (main/accent).
 * Mid-shade border and dark label colors have no DS token yet.
 * When the DS adds --color-*-border and --color-*-foreground tokens, migrate here.
 * Tracked: docs-token-alignment spec § G5
 */
```

Also: line 65 has `text-white` on the icon badge (white text on a feedback accent color). This is a DS gap — there is no `--color-*-on-accent` token. Add an inline comment:

```tsx
<span
  className="flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white" // DS GAP: no on-accent foreground token; white is intentional here
  style={{ backgroundColor: c.accent }}
  aria-hidden="true"
>
```

### Step 2: Add DS gap comments to `DoDont.tsx`

Above the `Do` component's `style` block, add:

```tsx
{/* DS GAP: Do/Dont use 3 shades of success/error (subtle bg, border, dark label).
    DS defines --color-success-subtle and --color-success only.
    Migrate when DS adds --color-success-foreground and --color-error-foreground.
    Tracked: docs-token-alignment spec § G5 */}
```

Also: both `Do` and `Dont` use `color: "oklch(25% 0.01 264)"` for body text — this value is `--color-foreground` (`oklch(17% .016 264)` is gray-900, close enough). Replace with the token:

In `Do`, line 36:
```tsx
<div className="space-y-1.5 text-sm" style={{ color: "oklch(25% 0.01 264)" }}>
```
Change to:
```tsx
<div className="space-y-1.5 text-sm" style={{ color: "var(--color-foreground)" }}>
```

In `Dont`, line 69 (same pattern):
```tsx
<div className="space-y-1.5 text-sm" style={{ color: "oklch(25% 0.01 264)" }}>
```
Change to:
```tsx
<div className="space-y-1.5 text-sm" style={{ color: "var(--color-foreground)" }}>
```

### Step 3: Add DS gap comments to `ContrastTable.tsx`

The `PassBadge` component uses raw oklch for the AA (green) and large-only (yellow) badges. The `intentional-fail` badge already uses DS tokens correctly. Add a comment above `PassBadge`:

```tsx
/*
 * DS GAP: AA and "large only" badges need success/warning mid-shades.
 * DS defines --color-success-subtle + --color-success, and --color-warning-subtle + --color-warning.
 * The border and text colors here require darker variants not yet in the DS.
 * Migrate when DS adds --color-success-foreground and --color-warning-foreground.
 * Tracked: docs-token-alignment spec § G5
 */
```

Also: `ColorDot` line 74 uses `rgba(0,0,0,0.12)` for the dark-swatch border — replace with `var(--color-border-strong)` which is the darkest border token:

```tsx
border: isLight
  ? "1.5px solid var(--color-border-strong)"
  : "1.5px solid var(--color-border-strong)",
```

Wait — for dark swatches a visible border is needed on top of the dark background. `--color-border-strong` is `oklch(87% .006 264)` (light gray), which won't be visible on dark swatches. Use a subtle dark overlay instead — this case has no DS token. Add comment:

```tsx
border: isLight
  ? "1.5px solid var(--color-border-strong)"
  : "1.5px solid rgba(0,0,0,0.12)", // DS GAP: no dark-swatch border token
```

Leave the rgba value as-is (it's fine).

### Step 4: Verify the three components have no new TypeScript errors

Run:
```bash
pnpm typecheck
```
Expected: exits 0.

### Step 5: Commit

```bash
git add apps/docs/components/Callout.tsx apps/docs/components/DoDont.tsx apps/docs/components/ContrastTable.tsx
git commit -m "docs(components): add DS gap comments; fix foreground token in DoDont"
```

---

## Task 5: Final Verification

### Step 1: Full monorepo build

Run:
```bash
pnpm build
```
Expected: exits 0. Both `@umichkisa-ds/web` and `@umichkisa-ds/docs` build cleanly.

### Step 2: Full typecheck

Run:
```bash
pnpm typecheck
```
Expected: exits 0.

### Step 3: Verify all acceptance criteria

Run each grep — all should return zero matches:

```bash
# No incomplete @theme blocks in globals.css
grep -n "@theme" apps/docs/app/globals.css
# Expected: zero matches (the @theme blocks now come from the imported theme.css)

# No dist JS import in layout.tsx
grep -n "dist/styles.css" apps/docs/app/layout.tsx
# Expected: zero matches

# No raw color Tailwind utilities in components
grep -rn "text-white\|bg-black\|bg-white\|michigan-maize\|michigan-blue" apps/docs/components/
# Expected: zero matches

# theme.css export exists in package.json
grep -n "theme.css" packages/web/package.json
# Expected: two matches (one in exports, one in files)
```

### Step 4: Check off the task in TODO.md

Open `docs/TODO.md`. Mark Step 0.5 complete:

```markdown
- [x] Step 0.5 — Docs App Token Alignment (migrate globals.css + docs components to use DS token layer fully; fix font injection gap)
```

### Step 5: Update CODEBASE.md

Open `docs/CODEBASE.md` and update the status table to reflect that Step 0.5 is complete. Mark:
- `apps/docs/app/globals.css` — updated, now imports DS theme.css
- `apps/docs/app/layout.tsx` — dist import removed
- `apps/docs/components/` — audited, violations fixed

### Step 6: Final commit

```bash
git add docs/TODO.md docs/CODEBASE.md
git commit -m "docs(todo): mark Step 0.5 complete — docs token alignment"
```

---

## Acceptance Criteria Checklist

- [ ] `packages/web/package.json` exports `./theme.css` pointing to `./src/styles/index.css`
- [ ] `packages/web/package.json` `files` includes `"src/styles"`
- [ ] `apps/docs/app/globals.css` has `@import "@umichkisa-ds/web/theme.css"` — no manual `@theme` block
- [ ] `apps/docs/app/layout.tsx` has no JS `import '@umichkisa-ds/web/dist/styles.css'`
- [ ] No `text-white`, `bg-black`, `michigan-maize`, `michigan-blue` utilities in `apps/docs/components/`
- [ ] Callout, DoDont, ContrastTable have DS gap comments
- [ ] `DoDont.tsx` body text uses `var(--color-foreground)` instead of raw oklch
- [ ] `pnpm build` passes (full monorepo)
- [ ] `pnpm typecheck` passes
- [ ] `docs/TODO.md` Step 0.5 is checked off
- [ ] `docs/CODEBASE.md` status tables updated

---

## Notes

- **Task 2 and Task 3 are atomic.** Globals.css and layout.tsx must change together. Between removing the `@theme` block and adding the import, the docs app would be in a broken state. Commit them in the same commit.
- **Task 3 fix (Header.tsx) must land before or with Task 2.** The `bg-michigan-maize` and `text-michigan-blue` utilities stop generating after globals.css drops the old `@theme` block. Committing Task 2 without Task 3 will break the header visually. In practice: do Task 3 first, then Task 2+3 together, OR do all three component fixes before committing globals.css.
- **Recommended commit order:** Task 1 → Task 3 (component fixes) → Task 2 (globals+layout) → Task 4 (gap comments) → Task 5 (verify + close).
- SejongHospital preload is already handled by `next/font/local` (defaults to `preload: true`). No manual `<link rel="preload">` needed.
- Pretendard is loaded via CDN `<link>` in layout.tsx — no change needed.
- The `./theme.css` export pattern is the correct setup guide for external consumers (e.g. KISA-website). Document this in a future consumer setup guide.
