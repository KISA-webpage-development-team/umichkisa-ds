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
| 1 | major | ds-violation | both | `ColorSwatch` uses `text-[11px]` and `text-[10px]` — arbitrary sizes below the DS `type-caption` (12px) floor. Should use `type-caption font-mono` for token/value text. |
| 2 | major | ds-violation | both | `ColorSwatchGrid` uses `sm:grid-cols-3` — the `sm:` breakpoint is prohibited. Only default, `md:`, and `lg:` tiers are allowed. Replace with `md:grid-cols-3`. |
| 3 | major | content | both | Blockquote and first body paragraph are redundant — both say "raw colors, don't reference directly, they feed semantic tokens." Remove one or differentiate their purpose. |
| 4 | minor | styling | both | `ColorSwatch` uses `rounded-xl` — KISA design language standard is `rounded-md` (compact, shadcn-like). |
| 5 | minor | layout | desktop | Michigan Brand grid: 5 items in a 4-col grid → orphan swatch on second row. Consider reordering or adjusting column count. |
| 6 | minor | styling | both | Token names use `break-all` causing mid-word breaks (e.g., `--primitive-michigan-bl` / `ue`). Worse on mobile at 2-col (~160px cards). Consider `break-words` or smaller font with no break. |
| 7 | minor | ds-violation | both | Blockquote uses `border-l-[3px]` — arbitrary value. Use `border-l-2` or `border-l-4` from Tailwind's built-in scale. |

**Notes:**
- `ColorSwatch` and `ColorSwatchGrid` are shared docs components — fixes here will cascade to `/foundation/colors/tokens` and `/foundation/colors/overview` pages.
- `ColorSwatch` uses inline `style={}` for static token references (e.g., `style={{ color: "var(--color-foreground)" }}`) instead of Tailwind classes (`text-foreground`). Dynamic tokens for swatch backgrounds justify inline styles, but static ones could be Tailwind classes. Low priority.
- Mobile review was code-based (browser viewport couldn't be reduced below ~1920px CSS width through the DevTunnel). At 375px, the 2-col grid produces ~160px cards, exacerbating findings #1 and #6.

