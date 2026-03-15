# Follow-up Session: Typography Implementation

## Context

The typography documentation has been written at:
`apps/docs/content/foundation/typography.mdx`

It is connected to:
`apps/docs/app/foundation/typography/page.tsx`

All prose, tables, and visual components in the MDX are complete. This follow-up
session is specifically about implementing the font loading, token definitions,
and utility classes that make the documentation actually render correctly.

---

## Decisions Made (Do Not Revisit)

- **Rule of Two**: SejongHospital (Display + H1) + Pretendard (H2 and below)
- **Geist Mono**: docs-only, not used in client app
- **Font token names**: `font-pretendard`, `font-geist-mono` (joining existing `font-sejong-bold`, `font-sejong-light`)
- **Type utility naming**: `type-` prefix, short heading names (`type-h1`, not `type-heading-1`)
- **Type scale**: Uses Tailwind's built-in size utilities — no custom `--font-size-*` tokens

---

## What Needs to Be Implemented

### 1. Load Pretendard in the docs app

**File:** `apps/docs/app/layout.tsx`

Pretendard is not on Google Fonts. Two options:

**Option A — Self-hosted (recommended for production):**
- Download Pretendard Variable font from: https://github.com/orioncactus/pretendard/releases
- Place files in `apps/docs/app/fonts/`
- Load via `next/font/local`:

```tsx
const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '100 900',
})
```

- Add `pretendard.variable` to `<html>` className alongside existing sejong variables.

**Option B — CDN (quick start):**
- Add to `<head>` in layout: `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />`
- Then declare the CSS variable manually in globals.css:
```css
:root { --font-pretendard: 'Pretendard Variable', system-ui, sans-serif; }
```

---

### 2. Load Geist Mono in the docs app

**File:** `apps/docs/app/layout.tsx`

Vercel publishes the `geist` npm package which includes Next.js-ready font loading.

Install: `pnpm --filter docs add geist`

Then in layout.tsx:
```tsx
import { GeistMono } from 'geist/font/mono'
```

Add `GeistMono.variable` to `<html>` className. The variable name is `--font-geist-mono`.

---

### 3. Register font utilities in Tailwind theme

**File:** `apps/docs/app/globals.css`

Add to the existing `@theme inline` block (alongside `--font-sejong-bold` and `--font-sejong-light`):

```css
@theme inline {
  /* existing entries ... */
  --font-pretendard:  var(--font-pretendard);
  --font-geist-mono:  var(--font-geist-mono);
}
```

This generates `font-pretendard` and `font-geist-mono` as Tailwind utility classes.

---

### 4. Define `type-*` utility classes

**File:** `packages/web/src/styles/index.css`

Add inside `@layer ds-components`:

```css
@layer ds-components {
  /* ... existing .ds-spinner ... */

  .type-display {
    font-family: var(--font-sejong-bold);
    font-size: 3rem;        /* text-5xl */
    line-height: 1.25;      /* leading-tight */
  }

  .type-h1 {
    font-family: var(--font-sejong-bold);
    font-size: 2.25rem;     /* text-4xl */
    line-height: 1.25;      /* leading-tight */
  }

  .type-h2 {
    font-family: var(--font-pretendard);
    font-size: 1.5rem;      /* text-2xl */
    font-weight: 600;       /* font-semibold */
    line-height: 1.375;     /* leading-snug */
  }

  .type-h3 {
    font-family: var(--font-pretendard);
    font-size: 1.25rem;     /* text-xl */
    font-weight: 600;       /* font-semibold */
    line-height: 1.375;     /* leading-snug */
  }

  .type-body {
    font-family: var(--font-pretendard);
    font-size: 1rem;        /* text-base */
    font-weight: 400;       /* font-normal */
    line-height: 1.625;     /* leading-relaxed */
  }

  .type-body-sm {
    font-family: var(--font-pretendard);
    font-size: 0.875rem;    /* text-sm */
    font-weight: 400;       /* font-normal */
    line-height: 1.5;       /* leading-normal */
  }

  .type-label {
    font-family: var(--font-pretendard);
    font-size: 0.875rem;    /* text-sm */
    font-weight: 500;       /* font-medium */
    line-height: 1.5;       /* leading-normal */
  }

  .type-caption {
    font-family: var(--font-pretendard);
    font-size: 0.75rem;     /* text-xs */
    font-weight: 400;       /* font-normal */
    line-height: 1.5;       /* leading-normal */
  }
}
```

**Important:** `var(--font-pretendard)` references the CSS variable injected by
Next.js `localFont()` or the CDN approach above. This only resolves correctly when
the variable is present on `<html>`.

---

### 5. Remove redundant font-size tokens from semantic.css

**File:** `packages/web/src/tokens/semantic.css`

The following tokens are now redundant — Tailwind's built-in scale replaces them.
Before deleting, grep the codebase to confirm nothing references them directly:

```
--font-size-xs
--font-size-sm
--font-size-base
--font-size-lg
--font-size-xl
--font-size-2xl
--font-size-4xl
```

Search command:
```bash
grep -r "font-size-" packages/web/src/components/
```

If nothing references them, delete the entire Typography block from semantic.css.

---

### 6. Set Pretendard as the default body font (docs)

**File:** `apps/docs/app/globals.css`

In the `@layer base` block, add font-family to body:

```css
@layer base {
  body {
    font-family: var(--font-pretendard), system-ui, sans-serif;
    /* existing styles ... */
  }
}
```

This ensures all un-classed text in the docs falls back to Pretendard rather
than the browser default.

---

## Files to Touch — Summary

| File | Change |
|---|---|
| `apps/docs/app/layout.tsx` | Load Pretendard + Geist Mono via next/font |
| `apps/docs/app/globals.css` | Add font vars to @theme inline; set body font-family |
| `packages/web/src/styles/index.css` | Add type-* utility classes to ds-components layer |
| `packages/web/src/tokens/semantic.css` | Remove --font-size-* tokens (after grep check) |

---

## After Implementation

Run the docs dev server and verify:
- `font-pretendard` renders Pretendard (check Network tab for font load)
- `font-geist-mono` renders in code blocks
- `type-display` through `type-caption` render at correct sizes in the typography page
- The type scale specimen on `/foundation/typography` looks correct
- The DoDont font boundary example shows a visible difference between the Do and Don't

Then rebuild the design system package:
```bash
pnpm --filter @umichkisa-ds/web build
```
