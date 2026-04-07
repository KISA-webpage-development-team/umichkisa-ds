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

## /foundation/typography/scale

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | major | ds-violation | both | 2 raw HTML `<table>` elements (scale reference + responsive behavior) — migrate to DS `Table` component with `TableMobileList`/`TableMobileItem` for mobile list view. |
| 2 | major | ds-violation | both | 4 raw `<blockquote>` elements (Note, Display vs H1, Body SM vs Label, Avoid breakpoints) — replace with DS `<Alert>` component. First 3 → `variant="info"`, last → `variant="warning"`. |
| 3 | major | ds-violation | both | 8 type specimen labels use raw `text-xs` instead of semantic `type-caption` class. |
| 4 | minor | styling | both | Inconsistent spacing — `space-y-8` (32px), `px-8 py-10`, `my-8`, `my-6`, `my-4` don't follow the three-tier vertical spacing system. Normalize to section (`gap-6`), component (`gap-4`), element (`gap-2`) tiers. Specimen container padding → `p-6`. |
| 5 | minor | content | both | Note blockquote (about `@media` overrides in `type-*` classes) and Responsive Behavior closing paragraph ("Responsive scaling is baked into the `type-*` class definitions") convey the same point. Consolidate — keep the closing paragraph, fold Tailwind-column clarification into a brief inline note or table heading. |

**Dropped findings:**
- 7-column table overflow on mobile: redundant with #1 — DS Table component handles mobile via list view
- Display/H1 weight column shows "—": intentional — Font column already shows `font-sejong-bold`, implying Bold

**Notes:**
- Desktop scroll screenshots rendered blank due to VSCode tunnel rendering limitations. Below-fold content reviewed via source code + accessibility tree.
- Mobile top viewport confirmed working (responsive typography scaling correctly). Table overflow (576px vs 520px viewport) handled by `overflow-x: auto` wrapper, will be replaced by DS Table mobile list view.

## /foundation/typography/usage

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | major | ds-violation | both | DoDont examples (lines 75-76, 81-82, 99, 103) use raw Tailwind utilities (`text-4xl font-sejong-bold leading-tight`, `text-base font-pretendard font-normal leading-relaxed`) instead of `type-*` semantic classes. Contradicts the page's own first rule and DS_CONSTRAINTS. Update Do examples to use semantic classes (`type-display tracking-tight`, `type-h2`, `type-body`). |
| 2 | minor | ds-violation | both | Links bullet list (lines 160-181) uses manual `&bull;` + flex layout instead of standard list styling (`list-disc pl-5 space-y-2`). |
| 3 | major | ux | both | State typography (disabled, error, helper text), Links, and Truncation sections are prose-only — no visual examples. Add inline previews for error messages (`type-caption text-error`), helper text (`type-caption text-muted-foreground`), and links (rendered link with color + underline). |
| 4 | minor | content | both | "Disabled text" section references "(gray-400)" — raw primitive name. Remove parenthetical; `text-disabled-foreground` is sufficient. |
| B1 | minor | styling | both | (Bonus — cross-page) Alert component `<pre>` children overflow at `md:grid-cols-2` widths inside DoDont. Add `[&_pre]:overflow-x-auto` to Alert's children div (line 65 of `Alert.tsx`). |

**Dropped findings:**
- `my-8` on `<hr>` and `mt-8` on `<h2>`: established pattern across all reviewed pages, not a violation
- Inconsistent section spacing rhythm: intentional two-tier rhythm (hr = major break, mt-8 = subsection)

**Notes:**
- Desktop scroll screenshots rendered blank due to VSCode tunnel rendering limitations. Below-fold content reviewed via source code + accessibility tree + DOM position analysis.
- Mobile viewport could not be resized below 885px through DevTunnel. Mobile review was code-based — DoDont grid correctly stacks to single column, no overflow detected via JS measurement.
- Colors/usage page DoDont pattern (using `<pre><code>` for CSS snippets inside Alert) was referenced as the model for how DoDont examples should look.

## /foundation/typography/fonts

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | major | ds-violation | both | Raw hex colors (`#00274c`, `#ffcb05`, `#e8f0f7`) in SejongHospital specimen card. Replace with semantic tokens: `bg-brand-primary`, `text-brand-foreground`, `text-brand-foreground opacity-50`. Also remove `opacity-70` non-DS pattern. |
| 2 | major | ds-violation | both | Both specimen cards use raw `<div>` with manual `rounded-xl border border-border overflow-hidden`. Wrap in DS `Card` + `CardContent`/`CardFooter`. Raw Tailwind typography inside specimens stays (font demo, not type scale — add code comment). |
| 3 | minor | ds-violation | both | Specimen footer labels use `text-xs text-muted-foreground font-mono` — replace `text-xs` with `type-caption`. |
| 4 | major | ds-violation | both | Raw `<blockquote>` with `border-l-[3px] border-brand-accent` (arbitrary value + prohibited left border accent). Replace with DS `<Alert>` component. |
| 5 | major | ds-violation | both | 3 raw HTML `<table>` elements (SejongHospital weights, Pretendard weights, Geist Mono weight) — migrate to DS `Table` + `TableMobileList`/`TableMobileItem` with `hidden md:block` / `block md:hidden` toggle. |
| 6 | minor | content | both | Redundant sentence "If you are unsure, use Bold." — same guidance already conveyed in preceding text. Remove. |
| 7 | minor | content | both | Pretendard specimen shows only Latin text despite page claiming "supports Korean and Latin with equal fidelity." Add Korean line (e.g. "미시간 대학교 한인학생회"). |
| 8 | minor | responsive | both | SejongHospital specimen `text-5xl` may overflow at 375px. Add responsive sizing: `text-3xl md:text-5xl`. Same for subtitle line. |

**Dropped findings:**
- `opacity-70` on specimen text: merged into #1 (semantic token migration)
- `h3 mb-2` tight spacing: correct element-tier (8px) spacing per DS spacing system
- Specimen `px-8` fixed padding: resolved by Card migration (#2) — Card provides its own padding
- Mobile viewport could not be visually tested (browser viewport stuck at 1920px through DevTunnel). Mobile issues identified via source code review.

## /foundation/layout/overview

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | major | ds-violation | both | Links missing `hover:text-brand-primary` hover color — DS requires hover state to change to brand-primary |
| 2 | major | content | both | Usage link says "coming once components are built" — Container and Grid already exist. Update description. |
| 3 | minor | content | both | Redundant closing paragraph ("These are implementation requirements...") — restates what the section already conveys. Remove. |
| B1 | major | ds-violation | n/a | **Bonus (cross-cutting):** DS link rule currently mandates `underline` by default. Change to `hover:underline` in DS_CONSTRAINTS.md and typography/usage page. |

**Dropped findings:**
- Link missing default `underline`: reversed — DS rule changed to `hover:underline` (see B1)
- Code example uses `class=` instead of `className=`: intentional HTML snippet, not React-specific

## /foundation/layout/spacing

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | critical | content | both | Incorrect inset values. Page documents default inset as `px-4`/`px-10`/`px-16` (16/40/64px), but the actual `Container` component uses `px-4`/`md:px-6`/`lg:px-8` (16/24/32px). Affects Default Inset diagrams (lines 40-52), Page Shell code example (line 187), and Full-Bleed code example (lines 242-247). Update docs to match Container implementation. |
| 2 | major | content | both | Stale Container reference. Line 225 says "The Container component will encode this pattern once built — until then, use this class string directly." Container already exists (imported on line 1). Update text and replace raw utility code example with `<Container>` usage. |
| 3 | major | ds-violation | both | Raw colors in diagrams. 12+ instances of raw Tailwind colors (`text-gray-400`, `text-gray-700`, `border-gray-200`, `bg-gray-50`, `bg-gray-100`, `bg-[#ffcb05]/40`, `bg-[#ffcb05]/20`) in Default Inset, Max-width, and Column Gutter diagrams (lines 45-49, 72-80, 108-115). Map to semantic tokens; use `bg-brand-accent/40` with code comment for illustration opacity. |
| 4 | major | ds-violation | both | 4 raw `<blockquote>` elements with `border-l-[3px]` arbitrary value (lines 24-28, 173-177, 228-232, 253-257). Replace with `<Alert variant="info">`. |
| 5 | major | ds-violation | both | `text-xs` below typography floor. Diagram labels (lines 45, 80, 108) use `text-xs` (10px) — below DS minimum `type-caption` (12px). Replace with `type-caption font-mono`. |
| 6 | major | ds-violation | both | Raw HTML `<table>` for Vertical Spacing (lines 134-163). Migrate to DS `Table` compound component + `TableMobileList`/`TableMobileItem` for mobile. |
| 7 | minor | ds-violation | both | Manual `<span>•</span>` bullet list (lines 191-220). Replace with standard `list-disc pl-5`. |
| 8 | minor | content | both | Redundant paragraph. Max-width closing text (line 85) is nearly identical to Page Shell opener (line 183). Remove from Max-width. |

**Dropped findings:**
- `my-8` on `<hr>` and `mt-8` on `<h2>`: established pattern across all reviewed pages
- Desktop viewport stuck at 958px CSS width through DevTunnel — unable to test at true 1280px

**Notes:**
- Desktop scroll screenshots rendered blank due to VSCode tunnel rendering limitations. Below-fold content reviewed via source code + rendered text extraction.
- The docs page predates the Container component — it was written with planned values that were later revised during implementation. The Container is the source of truth.

## /foundation/layout/breakpoints

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | major | content | both | Paragraph after breakpoint table says "md: and lg: are then used to ensure the layout holds at smaller sizes" — factually backwards. In Tailwind's mobile-first system, md:/lg: apply at *larger* viewports. Rewrite to distinguish design-first thinking (desktop is the priority) from mobile-first coding (default = mobile, prefixes layer on for larger screens). |

**Dropped findings:**
- No subheadings (h2/h3): page is intentionally short and opinionated — continuous prose is appropriate at this length

**Notes:**
- Page is simple (single H1, one table, 6 paragraphs). No DS constraint violations, no styling/layout/responsive issues.
- Desktop and mobile viewports both reviewed visually via Chrome automation.

## /foundation/layout/usage

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | major | content + ds-violation | both | Page is a stale "coming soon" stub claiming `Container`/`Grid` are unimplemented, but both are shipped — the page itself wraps content in `<Container size="md" as="article">`. Full rewrite into a thin foundation-level orientation page: (1) philosophy paragraph — layout is component-driven, never hand-roll responsive class strings; (2) decision tree linking to `/components/container`, `/components/grid`, `/foundation/layout/spacing`, with raw Tailwind grid utilities called out as the asymmetric-layout escape hatch; (3) anti-patterns inside `<Alert variant="warning">` — don't nest Containers, don't hand-roll the page shell, don't scale vertical gaps across breakpoints, don't use `sm:`/`xl:`/`2xl:` breakpoints. Use `<InlineCode>` for all inline code. Match the orientation/philosophy tone of `/foundation/colors/usage` and `/foundation/typography/usage`. |

**Notes:**
- The single rewrite finding subsumes three separate issues that surfaced in the initial review pass: raw `<blockquote>` callout (should have been `<Alert>`), raw `<code className="...">` inline-code styling repeated 3× (should have been `<InlineCode>`), and redundant body paragraphs that all said "layout rules → components." All three disappear naturally when the page is rewritten.
- No "See also" card row at the end — sibling foundation usage pages don't have one, cross-references are inline in the prose.
- Desktop (1280px) and mobile (375px) renders are visually identical — no responsive issues. The page is so short that it doesn't fill the viewport at either width.

## /foundation/iconography/overview

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | minor | ds-violation | both | Remove `font-semibold text-foreground` from 4× `<strong>` tags (lines 17, 31, 35, 45). DS forbids weight utilities for emphasis — `<strong>` alone is the correct pattern, and `text-foreground` is inherited. |
| 2 | minor | ds-violation | both | Remove redundant `font-sejong-bold tracking-tight` from `<h1>` (line 7). Verified `type-h1` already sets `font-family: var(--font-sejong-bold)` and `letter-spacing: -0.025em` in `packages/web/src/styles/index.css:169-174`. |
| 3 | minor | content | both | Condense the two intro paragraphs into one — both reinforce "consistency matters / mixing libraries breaks the visual language." |

**Dropped findings:**
- "Page is a stub, lacks section orientation map" — covered by future Docs App Enhancement (prev/next nav).
- "Three layers as `<p>` tags, not a list" — paragraphs are acceptable; semantic `<dl>` not worth the change.
- "Raw `<hr>` instead of `Divider` component" — global issue across all 14 foundation pages, promoted to a new TODO item.
- "`<Icon>` paragraph reproduces /usage and /library content" — with the orientation map dropped, this paragraph now serves as the de-facto orientation content.

**Notes:** Mobile review skipped — Chrome window minimum width prevented resize below ~1264px. Page content is text-only with no responsive surface area beyond global navbar/sidebar shared across all pages.

## /foundation/iconography/sizes

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | major | content | both | Page renders zero icons; readers cannot compare sizes visually. Migrate the Scale `<table>` to the DS `Table` compound component and add a leading "Preview" column rendering `<Icon>` at each row's size. |
| 2 | major | content | both | "Pairing Icons with Text" table has no visual examples. Mirror Fix #1: migrate to DS `Table` and add a "Preview" column with real `flex items-center gap-2` icon-with-text pairings at each text level. |
| 3 | major | content / ds-violation | both | "Pairing Icons with Text" table teaches raw Tailwind text utilities (`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`) instead of DS `type-*` classes. Rewrite the "Text style" column to use `type-caption`, `type-body-sm`, `type-body`, `type-h3`, `type-h2`. Combined with Fix #2 in one edit. |
| 4 | minor | styling | both | `<code>` chip inside H2 ("Default is `md`") shrinks the word mid-heading via `type-caption` and breaks the heading line with the chip background. Rename the heading to "The Default Size" and drop the inline chip. |
| 5 | minor | content | both | "Default is md" paragraph 1 restates the Scale table's `md` row ("buttons, nav items"). Tighten paragraph 1 to drop the restated examples; keep paragraph 2 (the rule) unchanged. |

**Deferred findings (not in fix plan):**
- 33 raw `<code>` elements with repeated chip classlist — covered by existing global `<InlineCode>` migration TODO.
- All five `<h2>` elements lack `id` attributes — covered by existing global heading-id TODO.
- `<hr my-8>` immediately followed by `<h2 mt-8>` produces ~64px doubled section gap. Verified site-wide pattern: 13 foundation pages use the `my-8 border-0 border-t border-border` divider and 14 use `type-h2 mt-8 mb-4`. Promoted to a new global Docs App Enhancement TODO: *"Normalize section spacing across foundation pages — drop `mt-8` from H2s following `<hr my-8>`."*

**Notes:**
- Desktop (1280px) review only. Page is text + tables wrapped in `overflow-x-auto`, no responsive components beyond global navbar/sidebar. Mobile renders are visually equivalent for finding purposes.
- Browser scroll/screenshot was unreliable for this session (window scroll API + tab-context lag); review relied on full page-source read, JS DOM introspection (`querySelectorAll` for `h2`, `code` counts), and one clean top-of-page screenshot (`ss_17262a3om`). Findings were verified against source rather than screenshots beyond the visible top section.

## /foundation/iconography/library

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | minor | ds-violation | both | `<strong className="font-semibold text-foreground">` redundantly applies weight + color utilities on top of `<strong>` (8 instances across "Why Lucide" and "What We Don't Use" sections). Drop `font-semibold text-foreground`; keep semantic `<strong>`. If bold doesn't render due to `type-body` weight override, add `!font-semibold`. |
| 2 | minor | ds-violation | both | H1 redundantly composes `font-sejong-bold tracking-tight` on top of `type-h1` (line 8). Verify `type-h1` bakes these in (it should), then drop both. |
| 3 | minor | ds-violation | both | `lucide.dev` link missing `hover:text-brand-primary` (line 45). DS rule requires hover color change in addition to underline. |
| 4 | minor | styling | both | "What We Don't Use" section uses three plain paragraphs with `<strong>` lead-ins. Convert to `DoDont` "don't" list — these are forbidden patterns and deserve a visual treatment matching their semantic weight. |
| 5 | minor | content | both | "Naming Convention" closing paragraph (lines 76-82) repeats the opening (lines 62-70). Only the "don't translate to camelCase/PascalCase" warning is new. Merge that warning into the opening paragraph or place as a single line after the CodeBlock; drop the closing paragraph. |
| 6 | major | content | both | Rewrite "Custom Icons" section. New policy: do **not** instruct devs to inline custom SVGs themselves. Instead, when an icon isn't in Lucide, contact the design system project owner, who registers it in the `<Icon>` system the same way as the existing `github` and `linkedin` brand icons. Devs always consume custom icons via `<Icon name="..." />`. The visual-language spec list (`viewBox="0 0 24 24"`, `stroke-width="2"`, etc.) stays — but reframed as "criteria the DS owner uses when registering," not "what you write inline." |

**Notes:**
- Finding #6 contradicts the current `docs/DS_CONSTRAINTS.md` rule under "Custom Icons" that says "use an inline SVG directly in the component." DS_CONSTRAINTS will need a follow-up update — flagged in the fix plan but not executed in this fix.
- Mobile review skipped — page is text-only with no responsive surface area beyond global chrome shared across all pages.
- Screenshot tool was unreliable this session (stale frame capture); review relied on full page source, DOM accessibility tree read, and one clean top-of-page screenshot.

## /foundation/iconography/usage

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | major | content | both | Props table belongs on `/components/icon`, not on a foundation/usage page. Remove the table and the "Props:" label. Follow-up TODO added to populate `/components/icon` with a Props table during Batch 8. |
| 2 | major | content | both | Three sections all repeat "wrap interactive icons in a button" (§"Icons Are Never Interactive", §"Icon-Only Interactive Elements", and the "Wrapping interactive icons" Do/Don't). Merge the two prose sections into one new §"Wrapping for Interaction" covering: SVGs aren't interactive, wrapper provides touch target, icon-only needs `aria-label` + Tooltip, don't double-up `label` prop. Keep the Do/Don't. |
| 3 | minor | content | both | "Color" prose section and "Icon color" Do/Don't say the same thing with the same example. Drop the "Icon color" Do/Don't; keep the prose. |
| 4 | minor | content | both | "Icons Are Never Interactive" heading is misleading (resolved by #2 — new heading is "Wrapping for Interaction"). |
| 5 | minor | content | both | First two sentences ("`<Icon>` is the only way to render an icon… never import Lucide directly") duplicate the Overview page. Drop both. |
| 6 | minor | ds-violation | both | Raw `<table>` instead of DS `Table` component. Resolved by #1 (table removed). |
| 7 | minor | styling | both | `<strong className="font-semibold text-foreground">Props:</strong>` used as a section label. Resolved by #1 (label removed). |

**Notes:**
- Raw `<code className="... type-caption font-mono ...">`, raw `<hr>`, and the H2 `mt-8`-after-`hr-my-8` doubled gap are NOT flagged here — all have global migration tasks under § Docs App Enhancements.
- Mobile review uncovered two CodeBlock component bugs (language label misalignment + hover-only copy button unreachable on touch). Filed as a separate item in § Docs App Enhancements; not part of this fix plan.

## /foundation/iconography/accessibility

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | major | content | both | Consolidate **Decision Rule** and **Quick Reference** into a single table with Scenario / Approach / Markup columns. Remove the Quick Reference section heading; keep "When in doubt, ask…" as framing prose above the unified table. Eliminates ~40 lines of duplicated content. |
| 2 | minor | content | both | Typo (page.tsx:15): add space — `conveys "delete"` instead of `conveys"delete"`. |
| 3 | major | ds-violation | both | Replace the (now single, post-#1) raw `<table>` with the DS `Table` component. |
| 4 | minor | content | both | Trim Touch Targets opening sentence — drop the "12px to 32px" pixel range; the immediate next sentence already makes the 44×44 point. |

**Notes:**
- Raw `<code className="... type-caption font-mono ...">` (~20 instances) and raw `<hr>` (7 instances) are NOT flagged — both have global migration tasks under § Docs App Enhancements (TODO lines 179, 180).
- ✅/❌ emoji markers in code-comment examples are an established convention in the iconography section (also used in `sizes` and `usage` pages and preserved in the `usage` fix plan). Not flagged.
- Visual desktop+mobile passes were not run due to a browser screenshot capture issue (only the top-of-page desktop screenshot rendered correctly; subsequent screenshots after scroll returned blank). Review is source-based and covers DS constraints + content. Layout/responsive issues, if any, are not captured here.

## /components/badge

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | major | content | both | "Variant Gallery" h2 section duplicates the "Variants" example above (same 7 badges, no added info). Delete the entire section. |
| 2 | major | ds-violation | both | API Reference uses a hand-rolled `<table>` instead of the DS `Table` component. Migrate to `Table`/`TableHeader`/`TableBody`/`TableRow`/`TableHead`/`TableCell` (size="sm"). |
| 3 | minor | content | both | "Sizes" section description ("Two sizes aligned to the spacing grid") gives no guidance on when to pick sm vs md. Rewrite with usage guidance. |
| 4 | minor | ds-violation | both | H1 redundantly composes `font-sejong-bold tracking-tight`. `type-h1` already encodes both. Remove the dead utilities. |
| 5 | minor | ds-violation | both | "With icon" example pairs default Badge (`md`, `type-body-sm` text) with `<Icon size="xs">` (12px). Per icon sizing rules, body-sm text should use `sm` (16px). Update the example code string and the rendered preview. |

**Notes:**
- Review was source-based plus a single 1264px desktop screenshot. The chrome MCP screenshot tool returned blank images after scroll, so visual scrolling/mobile passes were not captured.
- Dropped during grill-me: separate "raw grid" finding for Variant Gallery (covered by #1); H3 mt-6/mt-8 inconsistency (matches existing convention used in tabs/grid pages); missing Accessibility section (not warranted for a static label component); raw inline `<code>` migration (already tracked in global TODO as `<InlineCode>` component).

## /components/button

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | major | ds-violation | both | `<h1>` redundantly composes `font-sejong-bold tracking-tight`. `type-h1` already includes both. Drop the redundant utilities — keep `type-h1 mb-4 text-foreground`. |
| 2 | major | ds-violation | both | Variant description `<ul>` has `type-body-sm` without an explicit color token. Add `text-foreground` (DS rule: every `type-*` must be paired with a color token). |
| 3 | major | responsive | mobile | Variants, Disabled, and Sizes demo rows use `flex items-center gap-4` with 3–4 buttons → overflow at 375px. Add `flex-wrap` to all three. |
| 4 | minor | content | both | Intro paragraph mentions "built-in `gap-2` alignment for icon + text pairings" and the With-icon section repeats the same fact. Drop the mention from the intro; keep it where it's actionable. |

**Notes:**
- Review was source-based plus a single 1264px desktop screenshot. The chrome MCP screenshot tool returned blank/offset images after scroll, and the window could not be resized below ~1264px, so visual scrolling/mobile passes were not captured.
- Dropped during grill-me: first h3 `mt-6` vs subsequent `mt-8` (established docs rhythm — saved to memory); missing focus/a11y notes (handled by component, not docs concern); raw inline `<code>` migration (cross-cutting `<InlineCode>` TODO); raw `<table>` in API Reference (cross-cutting Table migration TODO); `mt-8` on first h2 (cross-cutting section spacing TODO).

## /components/icon-button

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | major | ds-violation | both | H1 composes raw `font-sejong-bold tracking-tight` on top of `type-h1`. `type-*` is the single source of truth for font + tracking; other component pages (badge) use only `type-h1 mb-4 text-foreground`. Strip the raw classes. |
| 2 | major | ds-violation | both | API Reference uses a raw `<table>` with manual `border-collapse border border-border` etc. Migrate to DS `<Table size="sm">` + `TableHeader`/`TableBody`/`TableRow`/`TableHead`/`TableCell` to match the badge page. |
| 3 | major | content | both | No Tooltip example. DS_CONSTRAINTS: "Prefer wrapping icon-only buttons in a `<Tooltip>`. The tooltip content must match the `aria-label` exactly." Add a "With Tooltip" example section (live preview + code) after Disabled. |
| 4 | minor | content | both | Header description "Wraps `Button` internally, inheriting all variant styles and focus behavior" leaks implementation detail. Reword to "Shares Button's variants, sizes, and focus behavior." |
| 5 | minor | content | both | Default body restates the defaults already shown in the props table. Shorten to "The simplest usage — `icon` and `aria-label` are the only required props." |
| 6 | major | content | both | Page lacks an Accessibility section despite covering an inherently a11y-sensitive component. Add a new `<h2>` Accessibility section (after Disabled, before API Reference) consolidating: (a) `aria-label` must describe the action, not the icon ("Edit profile" not "Edit"); (b) Tooltip text must match `aria-label` exactly; (c) Touch target rationale — all sizes meet 44×44 via the `::after` pseudo-element, even when the visible button is 32px. Use a DS `Alert` (info) for the key rules + plain prose for the touch-target note. |

**Notes:**
- Review was source-based. The chrome `resize_window` tool was not applying to the actual viewport this session (innerWidth stuck at 1920), so per-viewport (1280 / 375) capture was not possible. Findings are derived from the page source, the `IconButton` and `Button` implementations, DS_CONSTRAINTS, and a comparison against the badge page.
- Verified (not findings): Sizes 32 / 40 / 48 match `IconButton.tsx` (`p-2`/`p-2.5`/`p-3` + icon `sm`/`md`/`lg`); default `variant="secondary"` matches source; Button does not support `asChild`, so omitting it from the API table is correct; IconButton intentionally provides its own size prop instead of forwarding Button's, so omitting Button's `size` from the API table is correct.

## /components/link-button

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | major | ds-violation / responsive | both | API Reference uses a raw `<table>` with hardcoded utility classes. Migrate to DS `Table` family (`hidden md:block`) + `TableMobileList` (`block md:hidden`) mirroring the button page 1:1. Mobile users currently get a horizontally-scrolling table with no mobile-list fallback, violating the "API tables need desktop + mobile list" rule. |
| 2 | minor | styling | desktop | Variants, Sizes, and Disabled demos use raw `flex items-center gap-4` wrappers. Wrap all three demos in DS `Grid` to match the button page (commit `c9d1dc9`) for consistent demo button widths. |
| 3 | minor | content | both | Disabled preview JSX (lines 210–213) omits `href` while the displayed `disabledCode` block shows `href="#"`. Add `href="#"` to the rendered JSX so the live preview matches the code shown to readers. |

**Dropped findings:**
- Raw `<code>` chip repetitions (~25×): deferred to the existing TODO item to introduce `<InlineCode>` and migrate all docs pages in one sweep.
- "When to use" `<ul>`/`<li>` pattern: only link-button and container have a "When to use" section — no established alternate pattern to align with.

**Notes:**
- Review was largely source-based. Devtunnel + Chrome screenshot capture was unstable this session (Page.captureScreenshot returned blank frames after the first viewport), so per-viewport visual confirmation at 1280 / 375 was limited. Findings are derived from the page source, comparison against the recently-migrated button and icon-button pages, and `DS_CONSTRAINTS.md`.

## /components/icon

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | major | ds-violation | both | API Reference uses raw `<table>` instead of DS `Table` component, and is missing the mobile `TableMobileList` companion. Migrate to `Table` (hidden md:block) + `TableMobileList` (block md:hidden) per `/components/button` and `/components/icon-button` precedent. |
| 2 | major | ds-violation | both | "Inside a button" example uses an inline raw `<button>` with arbitrary values (`outline-[var(--color-focus-ring)]`, `shadow-[0_0_0_4px_var(--color-brand-primary)]`, `min-w-[44px]`, `min-h-[44px]`) and a hand-rolled focus pattern. DS_CONSTRAINTS bans arbitrary values. Replace with the DS `IconButton` component, which already encodes the dual-ring focus and 44×44 touch target. |
| 3 | major | ds-violation | both | Available Icons grid uses a raw `<div className="grid grid-cols-...">` with raw tile `<div>`s (`rounded-lg`, `bg-surface-subtle`, hand-spaced). Replace with DS `Grid` + `Card` components, matching the `ColorSwatch` precedent. Default Card styling (`bg-surface`, `rounded-md`); only `items-center` layout override. |

**Notes:**
- Finding #4 (Props table TODO line 184) dropped after grill-me — the page's existing 4-row API Reference covers all props on `<Icon>` (`name`, `size`, `label`, `className`). TODO line 184 should be checked off as already-satisfied as part of this fix.
- Inline `<code>` chip repetitions: deferred to TODO line 179 (`<InlineCode>` component sweep).
- Source-only review. Pass B (visual UI/UX at 1280/375) was skipped due to Chrome session instability (rogue tabs, blank renders, frozen renderer). Recommend a visual spot-check after fixes land.

## /components/avatar

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | major | ds-violation | both | API Reference uses a raw `<table>` with hardcoded utility classes. Migrate to DS `Table` family (`hidden md:block`) + `TableMobileList` (`block md:hidden`) mirroring the icon-button page 1:1. |
| 2 | minor | content | both | "All props are optional." is misleading — `name` is functionally important (alt text + initials fallback). Reword to note `name` is strongly recommended. |

**Dropped findings:**
- Raw `<code>` chip repetitions: deferred to the existing TODO item for `<InlineCode>` component sweep.
- Table body cell `type-*` inconsistency: subsumed by Finding #1 (DS Table cells handle their own typography).
- Sizes prose vs. props table: not actually duplicate — prose describes use cases, table describes pixel values.
- `nameKor`/`nameEng` line: KISA-internal context is appropriate for this DS; line stays.

**Notes:**
- Source-based review. Per-viewport screenshot capture skipped per user instruction.

## /components/skeleton

| # | Severity | Type | Viewport | Finding | Screenshot |
|---|----------|------|----------|---------|------------|
| 1 | major | ds-violation | both | API Reference uses raw `<table>` instead of DS `Table` (`hidden md:block`) + `TableMobileList` (`block md:hidden`). Also missing `…rest` row even though intro says component extends native `<div>` attributes. | — |
| 2 | minor | styling | both | Second intro paragraph (aria-busy guidance) is rendered as muted `type-body-sm` body copy. Convert to DS `Alert` (info variant) per recurring blockquote→Alert pattern. | — |
| 3 | minor | styling | both | `<h1>` composes `type-h1 font-sejong-bold tracking-tight`, but `type-h1` already encodes `font-sejong-bold` and `letter-spacing: -0.025em`. Remove the redundant utilities. | — |

**Notes:**
- Source-based review. Browser screenshot/resize tooling was unstable mid-session; findings derived from full source read + one verified desktop screenshot at scrollY=0.
- Dropped during grill-me: sidebar nav gap (sidebar already correct per user); raw `<code>` → `InlineCode` migration (handled by global TODO).
- Redundancy check: "controls dimensions via className/utilities" appears in intro, example caption, and API table — mild but contextually justified, no action.

## /components/loading-spinner

| # | Severity | Type | Viewport | Finding |
|---|----------|------|----------|---------|
| 1 | major | ds-violation | both | API Reference uses raw `<table>` instead of DS `Table` (`hidden md:block`) + `TableMobileList` (`block md:hidden`). |
| 2 | minor | content | both | Header para 3 (LoadingSpinner-vs-Skeleton distinction) duplicates Usage Guidelines bullets 1+2. Drop the header paragraph. |
| 3 | minor | ux | both | Full-screen overlay demo: `bg-surface` overlay sits over `bg-surface` content, so the overlay reads as a plain spinner card. Put "page content behind" wrapper on `bg-surface-subtle` so the white overlay reads as covering something. |
| 4 | minor | styling | both | Convert the two `type-body-sm text-muted-foreground` sub-paragraphs in the header into two separate DS `Alert` (info variant) — matches recurring sub-para→Alert pattern (cf. Skeleton review #2). |
| 5 | minor | content | both | Sizes intent (sm=inline / md=section / lg=full-page) is duplicated in the Sizes section paragraph AND Usage Guidelines bullet 3. Drop the Usage Guidelines bullet. |

**Notes:**
- Source-based review. Browser screenshot tooling returned blank frames after scroll; findings derived from full source read + one verified desktop screenshot at scrollY=0.
- Dropped during grill-me: Sizes example wrapper missing `w-full` (intentional grouped layout, not a full-width demo).
