# Docs App UI Review

_Findings from per-page UI reviews. Each section corresponds to one page._

## /foundation/colors/overview

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | minor | ds-violation | both | Opacity utilities (`opacity-60`, `opacity-70`, `opacity-80`) on tier diagram text create non-token colors. Accepted as intentional for one-off illustration — add code comment. |
| 2 | minor | ds-violation | both | Raw `<blockquote>` with `border-l-[3px] border-brand-accent` is a hand-rolled callout. Replace with `<Alert variant="info" title="Why OKLCH?">` from `@umichkisa-ds/web`. |
| 3 | minor | content | both | Last intro paragraph ("If you have never worked with a design system before...") is redundant — the sidebar UI is self-explanatory. Remove it. |

**Dropped findings:**
- `mt-8` on h1: established pattern across all 60 docs pages, not page-specific
- No heading `id` attributes: cross-cutting feature, added to TODO.md
- Inline `<code>` wrapping on mobile: not observed in practice

## /foundation/colors/primitives

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | major | ds-violation | both | `ColorSwatch` uses `text-[11px]` and `text-[10px]` — below DS `type-caption` (12px) floor. Use `type-caption font-mono`. |
| 2 | major | ds-violation | both | `ColorSwatchGrid` uses raw grid div with `sm:grid-cols-3` (prohibited breakpoint). Replace with DS `Grid` component: `columns={{ base: 2, md: 3, lg: 4 }}`. |
| 3 | major | ds-violation | both | `ColorSwatch` uses raw divs with `rounded-xl`. Replace with DS `Card` component with className overrides for the color block layout. |
| 4 | major | content | both | Top blockquote is redundant with body paragraph — remove it. Utility blockquote should be replaced with `<Alert variant="info">`. |
| 5 | minor | styling | both | Token names use `break-all` causing mid-word breaks. Switch to `break-words` — CSS variable names have hyphens as natural break points. |

**Dropped findings:**
- Orphan swatch in Michigan Brand grid (5 items in 4-col): natural consequence of data, not a bug
- `border-l-[3px]` arbitrary value: absorbed into blockquote removal / Alert migration (#4)
- `rounded-xl`: absorbed into Card migration (#3)

**Notes:**
- `ColorSwatch` and `ColorSwatchGrid` are shared docs components — fixes here will cascade to `/foundation/colors/tokens` and `/foundation/colors/overview` pages.
- Mobile review was code-based (browser viewport couldn't be reduced below ~1920px CSS width through the DevTunnel).

## /foundation/colors/tokens

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | major | ds-violation | both | 3 raw `<blockquote>` elements with `border-l-[3px]` (arbitrary value). Replace with `<Alert>` component — "On brand-primary vs brand-accent" and "On info/link" → `<Alert variant="info">`, "Interim neutral states" → `<Alert variant="info">`. |
| 2 | major | accessibility | both | Heading hierarchy skips h2. Page goes h1 → h3 for all 8 section headings (Brand, Surface, Border, Text, Feedback, Interactive, Overlay, Understanding -subtle/-muted). Change h3 → h2. |
| 3 | minor | content | both | Redundant "Note on naming" blockquote in Surface section repeats the "Understanding -subtle and -muted" section directly above it. Remove entirely. |
| 4 | minor | content | both | Focus ring code example comment says "Applied to every interactive element" — inaccurate. Dual-ring pattern applies to buttons/clickable elements only. Form controls use border-color change. Fix comment and add note about the exception. |
| 5 | major | ds-violation | both | 7 raw HTML `<table>` elements should use DS `Table` compound component. Add `TableMobileList`/`TableMobileItem` for mobile with `hidden md:block` / `block md:hidden` toggle. |

**Dropped findings:**
- ColorSwatchGrid `sm:` breakpoint: shared component, separate rework session planned (Grid migration)
- ColorSwatch arbitrary font sizes (`text-[11px]`, `text-[10px]`): shared component, separate rework session
- ColorSwatch `rounded-xl`: shared component, separate rework session
- ColorSwatch inline `style=` for colors: shared component, separate rework session
- Swatch token name truncation: shared component, separate rework session

**Notes:**
- Mobile review was code-based (browser viewport couldn't be reduced below ~1920px CSS width through the DevTunnel).
- Desktop scroll screenshots rendered blank due to VSCode tunnel rendering limitations. Below-fold content was reviewed via source code + rendered text extraction.

## /foundation/colors/usage

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | major | ds-violation | both | 10 raw HTML `<table>` elements — migrate to DS `Table` + `TableMobileList`/`TableMobileItem` with `hidden md:block` / `block md:hidden` toggle. |
| 2 | major | ds-violation | both | Raw `<blockquote>` (line 356) with `border-l-[3px] border-brand-accent` (arbitrary value + prohibited left border accent). Replace with `<Alert variant="info" title="Exception — Small-scale fill indicators">`. |
| 3 | minor | content | both | Missing space on line 27: `says"this is KISA."` → `says "this is KISA."`. |
| 4 | minor | content | both | `--color-brand-primary-mid` list includes "Hyperlinks within body text" — conflicts with DS_CONSTRAINTS which mandates `--color-link` for hyperlinks. Remove the bullet. |
| 5 | major | ds-violation | both | `DoDont.tsx` shared component uses raw divs with `rounded-xl` (should be `rounded-md`), `border-l-4` (prohibited left border accent), and hand-rolled feedback colors. Refactor: `Do` → `<Alert variant="success" title="Do">`, `Dont` → `<Alert variant="error" title="Don't">`. Cascades to all pages using DoDont. |
| 6 | major | ds-violation | both | 108 inline `<code>` elements use `type-caption font-mono` (12px) inside `type-body` (16px) or `type-body-sm` (14px) text — creates visual size stutter. Create `<InlineCode>` docs component (inherits parent font size, adds `font-mono bg-surface-subtle rounded px-1 py-0.5 text-foreground`) and replace all instances on this page. Cross-page migration is a separate TODO item. |

**Dropped findings:**
- Findings #3/#4 from initial review (arbitrary value + left border accent on blockquote): absorbed into #2
- Finding #5-responsive (tables cramped at mobile): absorbed into #1 (TableMobileList migration)
- Redundant Do's and Don'ts section: kept — it's a valid pedagogical pattern (prose teaches, Do/Don't reinforces), not content redundancy

**Notes:**
- Desktop scroll screenshots rendered blank due to VSCode tunnel rendering limitations. Below-fold content was reviewed via source code + accessibility tree + rendered text extraction.
- Mobile review confirmed tables technically fit at 375px (no overflow) but cell content is cramped. DoDont grids correctly stack to single column.
- Finding #5 (DoDont.tsx) is a shared docs component — fix cascades to all pages using it.
- Finding #6 (InlineCode) — component created here, cross-page sweep added as standalone TODO item under "Docs App Enhancements".

## /foundation/colors/accessibility

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | major | ds-violation | both | Legend uses raw OKLCH inline styles (`oklch(35% 0.12 145)`, `oklch(48% 0.14 55)`); ContrastTable uses raw `<table>` instead of DS `Table` component; Legend uses raw `<div>` instead of DS `Card` component. Migrate ContrastTable to DS `Table`/`TableHeader`/`TableBody`/`TableRow`/`TableHead`/`TableCell` + `TableMobileList`/`TableMobileItem` for mobile. Migrate legend to DS `Card` with `PassBadge` components replacing raw colored text. |
| 2 | minor | content | both | Pre-table paragraph (lines 27-29) duplicates the Legend by explaining AA/Large only/By design labels. Remove label explanations from the paragraph — let the Legend card be the single source. |
| 3 | minor | content | both | The 6 "On X:" rationale paragraphs lack a section heading (`h2`). Add heading for scannability and anchor-link support. |
| 4 | minor | content | both | Page references "WCAG AA" as the industry standard but never links to the official W3C documentation. Add link at the first mention only. |

**Dropped findings:**
- Prev/next page navigation: docs-wide enhancement, added to TODO.md
- Legend spacing (`gap-1`, `mb-1`): absorbed into Card migration (#1)
- Mobile layout unverified: absorbed into Table migration (#1) — DS Table with TableMobileList handles mobile by design

**Notes:**
- Desktop scroll screenshots rendered blank due to VSCode tunnel rendering limitations. Below-fold content was reviewed via source code + rendered text extraction.
- Mobile review could not resize viewport below 1920px through DevTunnel. Mobile behavior will be verified after DS Table migration.

## /foundation/typography/overview

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | major | ds-violation | both | Raw HTML `<table>` with manual utility classes (`border-collapse`, `px-4 py-3`, etc.) — migrate to DS `Table` component (`Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`). Already migrated on `colors/tokens`. |
| 2 | minor | content | both | Closing paragraph after the table is redundant — repeats the intro (SejongHospital = brand, Pretendard = everything else, Geist Mono = docs only). The table is self-explanatory. Remove entirely. |

**Dropped findings:**
- `my-8` on `<hr>` and `mt-8` on `<h2>`: established pattern across all reviewed pages
- Mobile viewport could not be visually tested (browser viewport stuck at 1920px through DevTunnel). Code review shows no mobile-specific concerns — page has no custom breakpoints, relies on `DocsLayout` and `type-*` classes.

