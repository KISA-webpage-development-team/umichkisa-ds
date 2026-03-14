# Follow-up Session: Color Guide Visual Components

## Context

The color guide MDX has been written at:
`apps/docs/content/foundation/colors.mdx`

It is connected to:
`apps/docs/app/foundation/colors/page.tsx`

The prose, tables, and all written content are complete. This follow-up session is
specifically about building the missing visual React components and dropping them
into the MDX where placeholders exist.

---

## What Needs to Be Built

### 1. `<ColorSwatch>` component

**Purpose:** Renders a visual color block alongside token metadata.

**Props needed:**
- `token` — the CSS variable name (e.g. `--color-brand-primary`)
- `value` — the OKLCH or hex value (e.g. `oklch(19% 0.061 243)`)
- `hex` — the human-readable hex equivalent (e.g. `#00274c`)
- `label` — short role description (e.g. `Anchor. Structure. Identity.`)

**Visual shape:** A rectangular swatch block (maybe 64px tall, full width of column)
showing the actual color, with token name, value, and label below it.

**Where it's used in MDX:** Section 3 (Primitive Palette) and Section 4 (Semantic
Token Reference). Look for `{/* <ColorSwatch> */}` comments.

---

### 2. `<ColorSwatchGrid>` component

**Purpose:** Wraps multiple `<ColorSwatch>` instances in a responsive grid layout.

**Props needed:**
- `children` — `<ColorSwatch>` items

**Layout:** 2 columns on mobile, 3-4 columns on desktop.

---

### 3. `<ContrastTable>` component

**Purpose:** Shows pre-computed WCAG contrast ratios for key token pairs.

**Props needed:**
- `rows` — array of `{ foreground, background, ratio, passes }` objects

**Columns:** Foreground token | Background token | Contrast ratio | AA pass/fail badge

**Where it's used:** Section 6 (Accessibility). Look for `{/* <ContrastTable> */}`.

---

### 4. `<DoDont>` component

**Purpose:** Side-by-side correct vs incorrect usage examples.

**Props needed:**
- `do` — string or JSX describing the correct approach
- `dont` — string or JSX describing the incorrect approach
- Optionally: `doLabel`, `dontLabel` to override default "Do" / "Don't" headings

**Visual shape:** Two columns. Left column has a green "Do" header, right has a
red "Don't" header. Each column contains a short code snippet or description.

**Where it's used:** Section 7 (Do's and Don'ts). Look for `{/* <DoDont> */}`.

---

### 5. `<Callout>` component

**Purpose:** A highlighted info box for important notes inside the guide.

**Props needed:**
- `type` — `'info' | 'warning' | 'tip'`
- `children` — content

**Where it's used:** Section 2 (Three-Tier Model) for the OKLCH callout, and
scattered throughout for important rules. Look for `{/* <Callout> */}`.

---

## Wiring the MDX Into the Page

`apps/docs/app/foundation/colors/page.tsx` currently renders a bare placeholder.
It needs to import and render the MDX file:

```tsx
import ColorGuide from '@/content/foundation/colors.mdx'

export default function ColorsPage() {
  return <ColorGuide />
}
```

You also need to configure an `mdx-components.tsx` file at the root of `apps/docs/`
if it does not exist, mapping HTML elements to styled versions and registering the
custom components above so they are available inside MDX without explicit imports.

Reference: https://nextjs.org/docs/app/building-your-application/configuring/mdx

---

## Token Values Reference (for building swatches)

All values are from `packages/web/src/tokens/primitives.css` and `semantic.css`.

### Primitive palette
| Name | OKLCH | Hex |
|---|---|---|
| michigan-blue | oklch(19% 0.061 243) | #00274c |
| michigan-blue-mid | oklch(32% 0.09 243) | #00568a |
| michigan-blue-light | oklch(94% 0.018 243) | #e8f0f7 |
| michigan-maize | oklch(83% 0.185 91) | #ffcb05 |
| michigan-maize-light | oklch(93% 0.1 91) | #ffe98a |
| gray-50 | oklch(98% 0.002 264) | ~#fafafa |
| gray-100 | oklch(96% 0.003 264) | ~#f4f4f5 |
| gray-200 | oklch(92% 0.004 264) | ~#e4e4e7 |
| gray-300 | oklch(87% 0.006 264) | ~#d4d4d8 |
| gray-400 | oklch(73% 0.01 264) | ~#a1a1aa |
| gray-500 | oklch(60% 0.012 264) | ~#71717a |
| gray-700 | oklch(40% 0.014 264) | ~#3f3f46 |
| gray-900 | oklch(17% 0.016 264) | ~#18181b |
| white | oklch(100% 0 0) | #ffffff |
| red-500 | oklch(58% 0.22 27) | ~#ef4444 |
| green-500 | oklch(64% 0.17 145) | ~#22c55e |

### New semantic tokens (not yet in primitives.css — add these)
| Token | Value | Notes |
|---|---|---|
| --color-warning | oklch(72% 0.19 55) | Amber |
| --color-warning-subtle | oklch(96% 0.05 85) | Light amber bg |
| --color-info | oklch(55% 0.15 240) | Medium blue |
| --color-info-subtle | oklch(95% 0.03 240) | Light blue bg |
| --color-error-subtle | oklch(96% 0.04 27) | Light red bg |
| --color-success-subtle | oklch(95% 0.04 145) | Light green bg |
| --color-brand-accent-subtle | var(--primitive-michigan-maize-light) | Already in primitives |
| --color-brand-primary-hover   | oklch(25% 0.075 243)            | Hover state on navy |
| --color-brand-primary-pressed | oklch(15% 0.05 243)             | Pressed state on navy |
| --color-brand-accent-hover    | oklch(76% 0.185 91)             | Hover state on maize |
| --color-brand-accent-pressed  | oklch(70% 0.185 91)             | Pressed state on maize |
| --color-focus-ring            | var(--primitive-michigan-maize) | Same as accent |
| --color-text-on-brand | var(--primitive-michigan-maize) | Text on blue bg |
| --color-text-link | var(--color-brand-primary-mid) | Link text |
| --color-overlay | oklch(0% 0 0 / 40%) | Modal scrim |

Note: the new semantic tokens above must also be added to
`packages/web/src/tokens/semantic.css` before the swatches will render correctly.
That is a separate task from building the components.

## Primitive CSS Updates Required

The following gray steps are documented in the color guide but not yet in
`packages/web/src/tokens/primitives.css` — add them:

```css
--primitive-gray-600: oklch(50% 0.013 264);
--primitive-gray-800: oklch(28% 0.015 264);
```
