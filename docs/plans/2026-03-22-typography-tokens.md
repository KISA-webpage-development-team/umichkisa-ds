# Typography Token Gaps Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Close three typography gaps in `packages/web`: define font-family tokens (G1), add `letter-spacing` to heading classes (G4), and add responsive scaling to Display/H1/H2/H3 (G3).

**Architecture:** All changes live in two files — `packages/web/src/tokens/semantic.css` (new font token declarations) and `packages/web/src/styles/index.css` (updated `@theme inline` block + updated `type-*` classes). The docs app `globals.css` has redundant font entries in its `@theme inline` that become dead weight after Task 1 — those are cleaned up as part of Task 1.

**Tech Stack:** CSS custom properties, Tailwind v4 `@theme inline`, `@layer ds-components`, standard `@media (min-width)` breakpoints.

---

## Background

The consuming app is responsible for loading the actual font files (via `next/font/local` or CDN). The package's job is to define the CSS variable names with sensible fallback stacks so that:
- `var(--font-sejong-bold)` resolves to the system sans-serif if the consumer hasn't loaded the font yet
- Consumers who do load the font just override the variable in their own CSS

Breakpoints (from the layout system, Tailwind v4 defaults):
- Mobile default: no `@media` query
- Tablet `md:` → `@media (min-width: 768px)`
- Desktop `lg:` → `@media (min-width: 1024px)`

Tracking values from `scale.mdx`:
- `tracking-tight` = `letter-spacing: -0.025em` → `type-display`, `type-h1` only
- All other classes → no `letter-spacing` (browser default = 0)

---

## Task 1: Define Font Tokens in `packages/web`

**Files:**
- Modify: `packages/web/src/tokens/semantic.css`
- Modify: `packages/web/src/styles/index.css`
- Modify: `apps/docs/app/globals.css` (cleanup only)

### Step 1: Add font family variables to `semantic.css`

Append a new section at the end of `packages/web/src/tokens/semantic.css`, inside the existing `:root {}` block, after the `/* Icon sizes */` block:

```css
  /* Typography — Font families */
  --font-sejong-bold:  'SejongHospital', system-ui, -apple-system, sans-serif;
  --font-sejong-light: 'SejongHospital', system-ui, -apple-system, sans-serif;
  --font-pretendard:   'Pretendard Variable', 'Apple SD Gothic Neo', 'Noto Sans KR', system-ui, -apple-system, sans-serif;
  --font-geist-mono:   'Geist Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace;
```

The consuming app overrides these variables after loading the real font files (e.g., `--font-pretendard: 'Pretendard Variable', system-ui, sans-serif` in its own `:root`).

### Step 2: Add font tokens to the `@theme inline` block in `styles/index.css`

In `packages/web/src/styles/index.css`, add a new group at the end of the existing `@theme inline` block (after the `/* Overlay */` group):

```css
  /* Font families */
  --font-sejong-bold:  var(--font-sejong-bold);
  --font-sejong-light: var(--font-sejong-light);
  --font-pretendard:   var(--font-pretendard);
  --font-geist-mono:   var(--font-geist-mono);
```

This makes `font-sejong-bold`, `font-pretendard`, etc. available as Tailwind `font-*` utilities.

### Step 3: Remove redundant font entries from `apps/docs/app/globals.css`

The docs `globals.css` `@theme inline` block (lines 43–46) registers the same four font variables. Since the package now exports them, these are redundant. Remove these four lines from `globals.css`:

```css
  /* DELETE these four lines: */
  --font-sejong-bold:     var(--font-sejong-bold);
  --font-sejong-light:    var(--font-sejong-light);
  --font-pretendard:      var(--font-pretendard);
  --font-geist-mono:      var(--font-geist-mono);
```

The `:root` block below (line 55) that defines `--font-pretendard: 'Pretendard Variable', ...` stays — that is the consumer-level override, not a Tailwind registration. Keep it.

### Step 4: Run build and verify

```bash
pnpm build
pnpm typecheck
```

Expected: no errors. The dist CSS should now include the four `--font-*` variable declarations in its `:root` output.

### Step 5: Commit

```bash
git add packages/web/src/tokens/semantic.css packages/web/src/styles/index.css apps/docs/app/globals.css
git commit -m "feat(tokens): define font-family tokens in packages/web (G1)"
```

---

## Task 2: Update `type-*` Classes — Tracking + Responsive Scaling

**Files:**
- Modify: `packages/web/src/styles/index.css`

This task rewrites the `type-display`, `type-h1`, `type-h2`, and `type-h3` class bodies inside `@layer ds-components`. The other four classes (`type-body`, `type-body-sm`, `type-label`, `type-caption`) are untouched — they are fixed-size and need no tracking.

### Step 1: Replace the four heading class definitions

Replace the current `type-display`, `type-h1`, `type-h2`, `type-h3` blocks with the following. Keep them inside `@layer ds-components`:

```css
  .type-display {
    font-family: var(--font-sejong-bold);
    font-size: 2rem;           /* mobile */
    line-height: 1.25;
    letter-spacing: -0.025em;  /* tracking-tight */
  }

  @media (min-width: 768px) {
    .type-display { font-size: 2.5rem; }
  }

  @media (min-width: 1024px) {
    .type-display { font-size: 3rem; }
  }

  .type-h1 {
    font-family: var(--font-sejong-bold);
    font-size: 1.75rem;        /* mobile */
    line-height: 1.25;
    letter-spacing: -0.025em;  /* tracking-tight */
  }

  @media (min-width: 768px) {
    .type-h1 { font-size: 2rem; }
  }

  @media (min-width: 1024px) {
    .type-h1 { font-size: 2.25rem; }
  }

  .type-h2 {
    font-family: var(--font-pretendard);
    font-size: 1.25rem;        /* mobile */
    font-weight: 600;
    line-height: 1.375;
  }

  @media (min-width: 768px) {
    .type-h2 { font-size: 1.375rem; }
  }

  @media (min-width: 1024px) {
    .type-h2 { font-size: 1.5rem; }
  }

  .type-h3 {
    font-family: var(--font-pretendard);
    font-size: 1.125rem;       /* mobile */
    font-weight: 600;
    line-height: 1.375;
  }

  @media (min-width: 768px) {
    .type-h3 { font-size: 1.25rem; }
  }

  /* type-h3 desktop stays at 1.25rem — no lg: override needed */
```

Note: `type-h2` and `type-h3` have no `letter-spacing` — `tracking-normal` is the browser default (0). Do not add a `letter-spacing: 0` declaration; omission is correct.

### Step 2: Run build and verify

```bash
pnpm build
pnpm typecheck
```

Expected: no errors.

Manual verification: open the docs site (`pnpm dev` from repo root, visit `http://localhost:3000/foundation/typography/scale`) and resize the browser. Display and heading sizes should change at 768px and 1024px.

### Step 3: Update the stale note in `scale.mdx`

`apps/docs/content/foundation/typography/scale.mdx` line 53 says: *"Tracking is not yet implemented in CSS and is flagged for Step 0."*

Replace that note with:

```
> **Note:** The Tailwind column shows the equivalent Tailwind v4 font-size token for developer reference. The actual values are implemented as responsive `@media` overrides inside the `type-*` class definitions — these are not Tailwind utilities.
```

### Step 4: Run build again

```bash
pnpm build
```

Expected: no errors.

### Step 5: Commit

```bash
git add packages/web/src/styles/index.css apps/docs/content/foundation/typography/scale.mdx
git commit -m "feat(tokens): add tracking and responsive scaling to type-* heading classes (G3, G4)"
```

---

## Acceptance Criteria

- [ ] `semantic.css` declares `--font-sejong-bold`, `--font-sejong-light`, `--font-pretendard`, `--font-geist-mono`
- [ ] `styles/index.css` `@theme inline` block includes all four font variables
- [ ] `apps/docs/app/globals.css` no longer re-registers font variables in its `@theme inline`
- [ ] `type-display` and `type-h1` have `letter-spacing: -0.025em`
- [ ] `type-display`, `type-h1`, `type-h2`, `type-h3` have correct mobile-first font-size with `@media` overrides at 768px and 1024px
- [ ] `type-body`, `type-body-sm`, `type-label`, `type-caption` are unchanged
- [ ] `scale.mdx` stale note removed
- [ ] `pnpm build` passes
- [ ] `pnpm typecheck` passes
