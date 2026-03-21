# Colors Documentation Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Apply all 9 documentation fixes identified during the Colors MDX review session to sharpen rules, close ambiguity, and prepare the content for DS_CONSTRAINTS.md extraction.

**Architecture:** Documentation-only changes across 4 MDX files. No implementation code is touched. Changes are additive (new sections, new table rows, new callouts) or surgical (fix one sentence, remove one attribute). Each task targets one file and is independently committable.

**Tech Stack:** MDX (Next.js App Router), existing components: `<ColorSwatchGrid>`, `<ColorSwatch>`, `<ContrastTable>`, `<DoDont>`, `<Do>`, `<Dont>`

---

### Task 1: overview.mdx — Dark mode out-of-scope callout

**Files:**
- Modify: `apps/docs/content/foundation/colors/overview.mdx`

**Step 1: Add callout at the bottom of overview.mdx**

Append after line 97 (end of the Component Layer section), before any trailing content:

```mdx
---

## Dark Mode

This design system does not support dark mode. There is no dark-mode token layer,
no `.dark` class, and no media query variant. Components should not implement
dark mode behavior. If this changes in a future version, it will be documented here.
```

**Step 2: Verify the page renders**

Run: `pnpm --filter @umichkisa-ds/docs dev`
Expected: Colors > Overview page loads, new section visible at bottom.

**Step 3: Commit**

```bash
git add apps/docs/content/foundation/colors/overview.mdx
git commit -m "docs(colors): state dark mode is out of scope"
```

---

### Task 2: primitives.mdx — Remove approximate hex from utility colors

**Files:**
- Modify: `apps/docs/content/foundation/colors/primitives.mdx`

**Step 1: Remove the `hex` attribute from red-500 and green-500 swatches**

In the Utility section, change:

```mdx
<ColorSwatch token="--primitive-red-500"   value="oklch(58% 0.22 27)"   hex="~#ef4444" label="Red 500" />
<ColorSwatch token="--primitive-green-500" value="oklch(64% 0.17 145)"  hex="~#22c55e" label="Green 500" />
```

To:

```mdx
<ColorSwatch token="--primitive-red-500"   value="oklch(58% 0.22 27)"  label="Red 500" />
<ColorSwatch token="--primitive-green-500" value="oklch(64% 0.17 145)" label="Green 500" />
```

**Step 2: Add a note above the Utility swatches**

Add after the `## Utility` heading and description, before `<ColorSwatchGrid>`:

```mdx
> **On hex values:** Michigan brand colors show exact hex values from the official UMich brand guidelines. Utility colors (red, green) have no canonical hex — OKLCH is the authoritative definition. Inspect the browser to get the rendered value.
```

**Step 3: Verify build**

Run: `pnpm --filter @umichkisa-ds/docs dev`
Expected: Primitives page renders, red and green swatches show no hex value.

**Step 4: Commit**

```bash
git add apps/docs/content/foundation/colors/primitives.mdx
git commit -m "docs(colors): remove approximate hex from utility primitives"
```

---

### Task 3: tokens.mdx — Add subtle/muted naming concept section

**Files:**
- Modify: `apps/docs/content/foundation/colors/tokens.mdx`

**Step 1: Insert naming explanation before the Surface section**

Add the following block immediately before the `### Surface` heading (currently line 35):

```mdx
---

### Understanding `-subtle` and `-muted`

Two suffixes appear across multiple token groups — `-subtle` and `-muted`. They do not mean the same thing and are not interchangeable.

**`-subtle`** means one step softer in visual weight. It creates a tinted region without drawing attention. Used for card and panel backgrounds (`--color-surface-subtle`), alert box fills (`--color-error-subtle`), and similar containers.

**`-muted`** means reduced visual prominence — not necessarily darker. `--color-surface-muted` is *lighter* than `--color-surface-subtle` because it is designed to sit *inside* a subtle surface and appear elevated. `--color-text-muted` is lower contrast than `--color-text-primary` because it carries supporting, not primary, information.

The key rule: a `-muted` value always serves a deprioritized role. A `-subtle` value always serves a container or background role.

---
```

**Step 2: Verify build**

Run: `pnpm --filter @umichkisa-ds/docs dev`
Expected: Tokens page renders, new section appears between the token header and the Surface section.

**Step 3: Commit**

```bash
git add apps/docs/content/foundation/colors/tokens.mdx
git commit -m "docs(colors): add subtle vs muted naming explanation to tokens page"
```

---

### Task 4: tokens.mdx — Add "Maps to" column to Feedback table

**Files:**
- Modify: `apps/docs/content/foundation/colors/tokens.mdx`

**Step 1: Replace the existing Feedback table**

Find the current Feedback table (the one with two columns: Token and Role) and replace it with:

```mdx
| Token | Maps to | Role |
|---|---|---|
| `--color-error` | `--primitive-red-500` | Error state. Form validation failures, destructive action warnings. |
| `--color-error-subtle` | `oklch(97% 0.02 27)` | Background for error alert boxes. |
| `--color-success` | `--primitive-green-500` | Success state. Confirmations, completed actions. |
| `--color-success-subtle` | `oklch(97% 0.02 145)` | Background for success alert boxes. |
| `--color-warning` | `oklch(72% 0.15 60)` | Warning state. Non-blocking issues that need attention. |
| `--color-warning-subtle` | `oklch(97% 0.02 60)` | Background for warning alert boxes. |
| `--color-info` | `--primitive-michigan-blue-mid` | Informational state. Neutral tips, contextual help. |
| `--color-info-subtle` | `--primitive-michigan-blue-light` | Background for info alert boxes. |
```

**Step 2: Commit**

```bash
git add apps/docs/content/foundation/colors/tokens.mdx
git commit -m "docs(colors): add Maps to column to feedback token table"
```

---

### Task 5: tokens.mdx — Add Info/link overlap callout

**Files:**
- Modify: `apps/docs/content/foundation/colors/tokens.mdx`

**Step 1: Add callout after the Feedback table's ColorSwatchGrid**

After the closing `</ColorSwatchGrid>` of the Feedback section, add:

```mdx
> **On `--color-info` and `--color-text-link`:** Both resolve to `--primitive-michigan-blue-mid` — the same rendered color. This is intentional: blue reads as both informational and interactive in this system. Do not use them interchangeably. Use the token that matches the semantic role: `--color-info` for state indicators and alert borders, `--color-text-link` for clickable inline text.
```

**Step 2: Commit**

```bash
git add apps/docs/content/foundation/colors/tokens.mdx
git commit -m "docs(colors): document info and text-link color overlap"
```

---

### Task 6: tokens.mdx — Document dual focus ring pattern

**Files:**
- Modify: `apps/docs/content/foundation/colors/tokens.mdx`

**Step 1: Expand the focus ring row description in the Interactive table**

Find the `--color-focus-ring` row in the Interactive table:

```mdx
| `--color-focus-ring` | `--primitive-michigan-maize` | Keyboard focus indicator. High contrast, always visible against dark backgrounds. |
```

Replace with:

```mdx
| `--color-focus-ring` | `--primitive-michigan-maize` | Keyboard focus indicator. Use as a dual-ring: maize outer ring + 2px dark offset ring (`--color-brand-primary`). The maize ring provides contrast on dark surfaces; the offset ring provides contrast on white/light surfaces. |
```

**Step 2: Add implementation note after the Interactive ColorSwatchGrid**

After the closing `</ColorSwatchGrid>` of the Interactive section, add:

```mdx
**Focus ring implementation pattern:**

```css
/* Applied to every interactive element */
:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px var(--color-brand-primary);
}
```

The `outline` (maize) provides contrast against dark backgrounds. The `box-shadow` (navy) provides contrast against white/light backgrounds. Both must be present. Do not apply one without the other.
```

**Step 3: Commit**

```bash
git add apps/docs/content/foundation/colors/tokens.mdx
git commit -m "docs(colors): document dual focus ring pattern for light and dark surfaces"
```

---

### Task 7: tokens.mdx — Add interim neutral interactive guidance

**Files:**
- Modify: `apps/docs/content/foundation/colors/tokens.mdx`

**Step 1: Add provisional callout at the end of the Interactive section**

After the focus ring implementation pattern added in Task 6, add:

```mdx
> **Interim — Neutral interactive states:** Interactive tokens currently cover brand-primary and brand-accent elements only. For neutral/gray elements (secondary buttons, ghost buttons, form inputs), use `--color-surface-subtle` as hover background and `--color-border-strong` as hover border as an interim convention. This guidance will be superseded when Step 0 (Token & Styles Audit) defines dedicated neutral interactive tokens.
```

**Step 2: Commit**

```bash
git add apps/docs/content/foundation/colors/tokens.mdx
git commit -m "docs(colors): add interim neutral interactive state guidance"
```

---

### Task 8: accessibility.mdx — Fix warning/success inconsistency

**Files:**
- Modify: `apps/docs/content/foundation/colors/accessibility.mdx`

**Step 1: Fix the note on feedback colors**

Find the current sentence:

```
**On feedback colors over `--color-surface`:** `--color-error` (3.9:1) and
`--color-warning` (3.0:1) pass for large text only — do not use them as small
body text. `--color-success` (2.2:1) and `--color-warning` fall below the
non-text contrast threshold of 3:1 on white backgrounds, so use them paired
with `--color-text-primary` labels for any readable content. `--color-info`
(5.9:1) passes for all text sizes.
```

Replace with:

```mdx
**On feedback colors over `--color-surface`:** `--color-error` (3.9:1) passes
for large text only — do not use it as small body text. `--color-warning`
(3.0:1) meets the non-text contrast threshold exactly — treat it as a floor,
not a comfortable pass, and always pair it with a `--color-text-primary` label
for any readable content. `--color-success` (2.2:1) fails both text and
non-text contrast thresholds — never use it as standalone text or icon color;
always pair it with a `--color-text-primary` label. `--color-info` (5.9:1)
passes for all text sizes.
```

**Step 2: Commit**

```bash
git add apps/docs/content/foundation/colors/accessibility.mdx
git commit -m "docs(colors): fix warning/success contrast guidance inconsistency"
```

---

### Task 9: accessibility.mdx — Add text-muted on surface-muted contrast row

**Files:**
- Modify: `apps/docs/content/foundation/colors/accessibility.mdx`

**Step 1: Add the missing row to the ContrastTable**

Find the `<ContrastTable rows={[` block and add a new row after the existing `--color-text-muted` on `--color-surface-subtle` row:

```mdx
{ foreground: "--color-text-muted", background: "--color-surface-muted", ratio: "3.8:1", passes: "large-only" },
```

**Step 2: Add a note below the table**

After the existing note on `--color-text-muted` over `--color-surface-subtle`, add:

```mdx
**On `--color-text-muted` over `--color-surface-muted`:** This combination (3.8:1)
passes for large text only. Surface-muted is used inside cards for detail rows —
avoid muted text at small sizes in these regions. Use `--color-text-primary`
instead if the content needs to be readable.
```

**Step 3: Final build and typecheck**

Run: `pnpm build && pnpm typecheck`
Expected: Both pass with no errors.

**Step 4: Commit**

```bash
git add apps/docs/content/foundation/colors/accessibility.mdx
git commit -m "docs(colors): add text-muted on surface-muted to contrast table"
```

---

## Completion Checklist

- [ ] Task 1 — overview.mdx: dark mode callout
- [ ] Task 2 — primitives.mdx: remove approximate hex from utility colors
- [ ] Task 3 — tokens.mdx: subtle/muted naming section
- [ ] Task 4 — tokens.mdx: Maps to column in feedback table
- [ ] Task 5 — tokens.mdx: info/link overlap callout
- [ ] Task 6 — tokens.mdx: dual focus ring pattern
- [ ] Task 7 — tokens.mdx: interim neutral interactive guidance
- [ ] Task 8 — accessibility.mdx: fix warning/success inconsistency
- [ ] Task 9 — accessibility.mdx: text-muted on surface-muted row
- [ ] `pnpm build && pnpm typecheck` pass
