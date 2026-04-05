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

