# Docs App Style Guide

Conventions specific to `apps/docs/`. These are *page-level* rhythm and content rules — they don't belong in `DS_CONSTRAINTS.md` (which governs `packages/web/` components) but they govern how every docs page is authored and reviewed.

Load this file when writing or reviewing pages under `apps/docs/`.

---

## Page Rhythm

### Heading spacing

Must: First `<h3>` directly under an `<h2>` uses `mt-6 mb-2`. Every subsequent `<h3>` under the same `<h2>` uses `mt-8 mb-2`.

Why: The first h3 stays close to its parent h2 so the section reads as one group; later h3s need more breathing room to separate sibling subsections. Confirmed across reviewed pages. Do not flag this as inconsistency.

### Component preview width

Must: Wrap block-level demo children inside `<ComponentPreview>` in `<div className="w-full">`.

Why: ComponentPreview doesn't constrain width by default, so block-level components (Accordion, Card, Alert, etc.) snap narrower when their content collapses/changes — visually jarring.

---

## Content Patterns

### Blockquote → Alert

Must: Replace any raw `<blockquote>` in docs pages with `<Alert variant="info">` (or appropriate variant) from `@umichkisa-ds/web`.

Why: Hand-rolled blockquotes use arbitrary values (`border-l-[3px]`, etc.) and skip DS tokens. Alert provides consistent styling, proper tokens, and correct radius/spacing.

### Intro sub-paragraph → Alert

Must: Any secondary muted paragraph at the top of a docs page (`type-body-sm`/`type-caption` + `text-muted-foreground`) carrying a cross-reference or caveat ("For X, use Y") must be replaced with `<Alert>`.

Why: These muted sub-paragraphs carry important orientation info but get buried by their own muted styling. Alert gives them appropriate weight and matches the "Blockquote → Alert" pattern.

### Intro paragraphs

Must: Page intro paragraphs use `text-foreground`, never `text-muted-foreground`. Intros are primary content.

(Same rule as `DS_CONSTRAINTS.md` Typography > Usage; restated here because it's the most common docs-page mistake.)

---

## Visual Language

### Match the KISA component baseline

When introducing or reviewing any component-like element (cards, alerts, inline boxes) in docs:

- Default to `rounded-md`, uniform 1px `border`, and compact padding (`px-3 py-{2-3}`) — the Input/Badge/Textarea baseline
- Use `items-start` (not `items-center`) when icons pair with multi-line text
- Title + description in one component are tightly coupled — `gap-1`, not `gap-2`
- Think shadcn-like simplicity: thin borders, subtle backgrounds, compact proportions

Avoid: heavy left-border accents (`border-l-4`), oversized radii (`rounded-lg+`), generous padding (`p-4+`) that looks out of place next to existing components.

### No left-border accent for active states

Never: Use a left- or right-border accent to indicate active/selected nav items.

Why: Outdated and visually heavy. Modern docs sites (shadcn, Radix, Tailwind) use background highlight + bold text instead.

How to apply: Active nav state = `bg-surface-subtle` (or similar tinted background) + bold text.
