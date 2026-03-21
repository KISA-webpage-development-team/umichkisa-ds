# Iconography Review — Phase 2 & 3 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix 7 identified gaps in the Iconography MDX pages, then extract all constraints into DS_CONSTRAINTS.md.

**Architecture:** Documentation-only. Edit 4 MDX files under `apps/docs/content/foundation/iconography/`, then populate the `## Iconography` section and relevant `## Accessibility` entries in `docs/DS_CONSTRAINTS.md`. No code is touched.

**Tech Stack:** MDX, DS_CONSTRAINTS.md constraint format (`Must/Never/Prefer/Avoid: [rule] [source:path]`)

---

## Decisions Reference (from grill-me session)

| # | Decision |
|---|---|
| Q1 | Disabled icon color → `Must: use --color-text-disabled`. Add to usage.mdx Color section. |
| Q2 | `className` → document in props table; restrict to layout utilities only (not color, not sizing). |
| Q3 | Responsive sizing → `Never` apply breakpoint prefixes directly to icon size. Add to sizes.mdx and usage.mdx. |
| Q4 | Touch target → replace `p-3` universal guidance with `min-w-[44px] min-h-[44px]` wrapper pattern. |
| Q5 | Color syntax → fix `text-[--color-text-muted]` → `text-text-muted`, `text-[--color-error]` → `text-error`. |
| Q6 | Custom icon process → add soft `Prefer` — exhaust Lucide search before adding custom SVG. |
| Q7 | Success/warning icon contrast → add to accessibility.mdx, not usage.mdx. |

---

## Task 1: Fix usage.mdx — add `className` to props table

**File:** `apps/docs/content/foundation/iconography/usage.mdx`

**What to change:** The props table (around line 20–26) is missing `className`. Add a row.

**Step 1: Open and read usage.mdx to confirm current props table**

Read `apps/docs/content/foundation/iconography/usage.mdx` lines 18–27.

**Step 2: Edit — add `className` row to the props table**

Find the props table. After the `label` row, add:

```
| `className` | `string` | — | Layout utilities only (`block`, `flex-shrink-0`). Never use for color or sizing — those are controlled by parent color and the `size` prop. |
```

The table should look like:

```md
| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | required | Lucide icon name in kebab-case |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size from the 5-step scale |
| `label` | `string` | — | Accessible label; omit for decorative icons |
| `className` | `string` | — | Layout utilities only (`block`, `flex-shrink-0`). Never use for color or sizing — those are controlled by parent color and the `size` prop. |
```

**Step 3: Verify** — read the file and confirm the table looks correct.

---

## Task 2: Fix usage.mdx — correct Tailwind v4 color syntax

**File:** `apps/docs/content/foundation/iconography/usage.mdx`

**What to change:** The Color section (around lines 93–113) uses bracket syntax `text-[--color-text-muted]` and `text-[--color-error]`. These must be changed to semantic utility classes.

**Step 1: Find all bracket-syntax color references**

Search usage.mdx for `text-[--color-`.

**Step 2: Edit — replace bracket syntax with semantic utility classes**

Replace:
```tsx
<span className="text-[--color-text-muted]">
```
With:
```tsx
<span className="text-text-muted">
```

Replace:
```tsx
<span className="text-[--color-error]">
```
With:
```tsx
<span className="text-error">
```

Also fix the Do/Don't example if it uses bracket syntax — same replacements apply.

**Step 3: Verify** — read the Color section and confirm no `text-[--` remains.

---

## Task 3: Fix usage.mdx — disabled icon color + responsive sizing note

**File:** `apps/docs/content/foundation/iconography/usage.mdx`

**What to change:** (a) Add disabled state guidance to the Color section. (b) Add a note about breakpoint prefixes in the Color or sizing context.

**Step 1: Add disabled icon color to the Color section**

After the existing Color section prose (which ends with "reach for that instead"), add:

```md
## Disabled Icons

Disabled icons use `--color-text-disabled` — the same token as disabled text. Never reduce size or weight to communicate disabled state. Only color changes.

```tsx
<span className="text-text-disabled">
  <Icon name="lock" />
</span>
```
```

**Step 2: Add responsive sizing note**

At the end of the `## The \<Icon\> Component` section (or as a new subsection), add:

```md
## Responsive Sizing

Never apply breakpoint prefixes directly to icon size. Icon size is determined by component context (button size, nav density), not viewport width.

If a component changes size across breakpoints, the icon size change is encapsulated inside that component's variant — not expressed as a breakpoint override on `<Icon>`.

```tsx
// ✅ correct — component variant controls icon size
<Button size={{ base: 'sm', md: 'md' }}>
  <Icon name="plus" size="sm" /> {/* size set by Button internally */}
</Button>

// ❌ wrong — breakpoint prefix on the icon directly
<Icon name="plus" size="sm" className="md:size-md" />
```
```

**Step 3: Verify** — read the relevant sections and confirm both additions are present.

---

## Task 4: Fix sizes.mdx — add responsive sizing rule

**File:** `apps/docs/content/foundation/iconography/sizes.mdx`

**What to change:** Add a `Never Size Responsively` section clarifying that breakpoint prefixes do not belong on icon size.

**Step 1: Read sizes.mdx to find the end of file**

Read `apps/docs/content/foundation/iconography/sizes.mdx`.

**Step 2: Add section after the Pairing table**

After the last existing section ("Pairing Icons with Text"), append:

```md
---

## Never Apply Breakpoints to Icon Size

Icon size is determined by context — the component the icon lives in — not by the viewport width. Never use breakpoint prefixes on the `size` prop or on any class that affects icon dimensions.

If a component changes size across breakpoints (a button that is compact on mobile and default on desktop), the icon size change is handled inside that component's variant logic. The `<Icon>` itself receives a fixed `size` prop.

```tsx
// ✅ correct — fixed size, component handles responsiveness
<Icon name="search" size="md" />

// ❌ wrong — breakpoint prefix on icon size
<Icon name="search" size="sm" className="md:size-md" />
```
```

**Step 3: Verify** — read sizes.mdx tail and confirm the section is present.

---

## Task 5: Fix accessibility.mdx — touch target + success/warning contrast

**File:** `apps/docs/content/foundation/iconography/accessibility.mdx`

**What to change:** (a) Replace `p-3` universal touch target guidance with `min-w-[44px] min-h-[44px]` wrapper pattern. (b) Add success/warning icon contrast warning.

**Step 1: Read accessibility.mdx Touch Targets section (lines 74–92)**

Read `apps/docs/content/foundation/iconography/accessibility.mdx` lines 70–103.

**Step 2: Edit — rewrite the touch target guidance**

Replace the current `p-3` example and its surrounding prose with:

```md
## Touch Targets

The `<Icon>` component renders an SVG at the specified size — 12px to 32px. None of these are large enough to serve as a touch target.

Interactive wrappers around icons must be at least 44×44px. This is the minimum touch target size for mobile use per WCAG 2.5.5. Use `min-w-[44px] min-h-[44px]` on the button with `flex items-center justify-center` so the icon is centered inside:

```tsx
<button
  aria-label="Close"
  className="flex items-center justify-center min-w-[44px] min-h-[44px]"
>
  <Icon name="x" />
</button>
```

This approach works for any icon size — the wrapper always meets 44×44px, and the icon sits centered inside regardless of its visual size. Never rely solely on padding calculated from the icon's pixel size, as changing the `size` prop would break the math.

Never reduce the button dimensions below 44×44px to make an icon-only button feel smaller.
```

**Step 3: Add success/warning icon contrast warning**

After the Touch Targets section, add a new section:

```md
---

## Icon Color and Contrast

Icons are non-text UI components and must meet the 3:1 contrast ratio threshold (WCAG 1.4.11).

Two semantic color tokens fail this threshold and must never be used as the sole color of an icon:

- `--color-success` — 2.2:1 on white. Fails both text and non-text thresholds.
- `--color-warning` — 3.0:1 on white. Exactly at the floor, not a comfortable pass.

When using these tokens in a feedback context (success state, warning state), always pair the icon with a visible text label using `--color-text-primary`. The label carries the accessible meaning; the icon adds visual reinforcement.

```tsx
// ✅ correct — icon + text label, icon contrast does not matter alone
<span className="flex items-center gap-2">
  <span className="text-success"><Icon name="check-circle" /></span>
  <span className="text-text-primary type-body">Profile saved</span>
</span>

// ❌ wrong — standalone icon with --color-success, fails 3:1
<span className="text-success"><Icon name="check-circle" label="Success" /></span>
```

`--color-error` (3.9:1) passes non-text contrast and may be used as a standalone icon color for error state indicators, though pairing with a label is still preferred.
```

**Step 4: Verify** — read the full accessibility.mdx and confirm both changes are correct.

---

## Task 6: Fix library.mdx — custom icon soft preference

**File:** `apps/docs/content/foundation/iconography/library.mdx`

**What to change:** Add a `Prefer` guidance before the custom SVG instructions: exhaust Lucide search before reaching for a custom SVG.

**Step 1: Read the Custom Icons section (lines 69–82)**

Read `apps/docs/content/foundation/iconography/library.mdx` lines 68–82.

**Step 2: Edit — prepend preference note to Custom Icons section**

At the start of the `## Custom Icons` section, before the current first paragraph, add:

```md
Before adding a custom SVG, confirm Lucide truly does not have what you need. The Lucide search understands intent and synonyms — try several keywords before concluding the icon is missing. Custom SVGs are exceptions, not alternatives.

```

So the section opening becomes:

```md
## Custom Icons

Before adding a custom SVG, confirm Lucide truly does not have what you need. The Lucide search understands intent and synonyms — try several keywords before concluding the icon is missing. Custom SVGs are exceptions, not alternatives.

If Lucide does not have the icon you need, use an inline SVG directly in the component — not a new icon library.
...
```

**Step 3: Verify** — read the Custom Icons section and confirm the note is present.

---

## Task 7: Phase 3 — Populate DS_CONSTRAINTS.md Iconography section

**File:** `docs/DS_CONSTRAINTS.md`

**What to change:** Replace the `_To be populated during the Iconography section of Step -1._` placeholder with fully extracted constraints from all 5 iconography MDX pages, and add icon-specific rules to the `## Accessibility` section.

**Step 1: Read DS_CONSTRAINTS.md to find the Iconography section placeholder**

Read `docs/DS_CONSTRAINTS.md` lines 146–191 (Iconography through Components).

**Step 2: Replace the Iconography placeholder with extracted constraints**

Replace:
```md
## Iconography

_To be populated during the Iconography section of Step -1._
```

With:

```md
## Iconography

### Library

Must: Use Lucide as the sole icon library. Never import from `react-icons`, use emoji as icons, or use PNG/JPG icons. [source:foundation/iconography/library]
Never: Import a Lucide icon directly into a component — always use the `<Icon>` wrapper component. [source:foundation/iconography/overview]
Prefer: Exhausting the Lucide search (including synonyms) before adding a custom SVG. Custom SVGs are exceptions, not alternatives. [source:foundation/iconography/library]

### Custom Icons

Must: Custom SVGs that replace missing Lucide icons must match Lucide's visual language exactly: `viewBox="0 0 24 24"`, `stroke-width="2"`, `stroke="currentColor"`, `fill="none"`, `stroke-linecap="round"`, `stroke-linejoin="round"`. [source:foundation/iconography/library]
Never: Use a second icon library when a Lucide icon is unavailable — use an inline SVG with Lucide-matching attributes. [source:foundation/iconography/library]
Never: Put complex logo marks or illustrations through the `<Icon>` system — use `<img>` or an inline SVG component instead. [source:foundation/iconography/library]

### Naming

Must: Pass Lucide icon names to `<Icon>` in exact kebab-case as shown on lucide.dev — never translate to camelCase or PascalCase. [source:foundation/iconography/library]

### The `<Icon>` Component — Props

Must: Use the `size` prop from the 5-step scale (`xs`/`sm`/`md`/`lg`/`xl`) — never override icon dimensions with font-size utilities or arbitrary CSS. [source:foundation/iconography/sizes]
Must: Document `className` usage as layout utilities only (`block`, `flex-shrink-0`). Never pass color or sizing classes via `className`. [source:foundation/iconography/usage]
Must: Omit `label` prop for decorative icons (icon is hidden with `aria-hidden="true"`). Provide `label` prop only when the icon is the sole indicator of meaning with no surrounding text or button label. [source:foundation/iconography/accessibility]
Never: Provide `label` prop on `<Icon>` when the wrapper button already has `aria-label` — this creates duplicate screen reader announcements. [source:foundation/iconography/accessibility]

### Sizing

Must: Use `md` (20px) as the default icon size for buttons, nav items, and general UI. [source:foundation/iconography/sizes]
Must: Match icon size to text context — `sm` (16px) with caption/label text, `md` (20px) with body text, `md`/`lg` with subheadings, `lg` (24px) with headings. [source:foundation/iconography/sizes]
Never: Apply breakpoint prefixes (`md:`, `lg:`) directly to icon size. Icon size is determined by component context. If a component changes size across breakpoints, the icon size change is encapsulated inside that component's variant logic. [source:foundation/iconography/sizes]
Never: Set icon size via `text-*` font-size utilities — SVG size is controlled by `width`/`height` attributes via the `size` prop. [source:foundation/iconography/sizes]

### Color

Must: Control icon color through the parent element's text color using semantic tokens — icons inherit `currentColor`. [source:foundation/iconography/usage]
Must: Use `text-text-disabled` for disabled icons — same token as disabled text. Never reduce size or weight to communicate disabled state. [source:foundation/iconography/usage]
Never: Pass color or fill values directly to `<Icon>` — use semantic token classes on the parent wrapper. [source:foundation/iconography/usage]

### Interactivity

Never: Attach event handlers (e.g. `onClick`) directly to `<Icon>` — SVGs have no button role and are not keyboard-reachable by default. [source:foundation/iconography/usage]
Must: Wrap interactive icons in a `<button>` or `<a>`. The wrapper provides interaction semantics, keyboard target, and accessible label. [source:foundation/iconography/usage]

### Icon + Text Layout

Must: Use `flex items-center gap-2` as the default layout for icon + text pairings. [source:foundation/iconography/usage]
Prefer: `gap-1` (4px) for compact contexts (tags, badges); `gap-3` (12px) for larger display contexts. [source:foundation/iconography/usage]

### Icon-Only Interactive Elements

Must: Provide `aria-label` on the button/link wrapper for icon-only interactive elements. [source:foundation/iconography/usage]
Prefer: Wrapping icon-only buttons in a `<Tooltip>` for sighted users. The tooltip content must match the `aria-label` exactly. [source:foundation/iconography/usage]
```

**Step 3: Add icon-specific rules to the Accessibility section**

Find the existing `## Accessibility` section. After the existing `### Focus` subsection, add:

```md
### Iconography — Touch Targets & Contrast

Must: Interactive wrappers around icons must be at least 44×44px. Use `min-w-[44px] min-h-[44px] flex items-center justify-center` on the button — this works for any icon size. [source:foundation/iconography/accessibility]
Never: Rely on padding calculated from icon pixel size for touch target — changing the `size` prop would break the math. [source:foundation/iconography/accessibility]
Never: Use `--color-success` (2.2:1) as a standalone icon color — fails non-text contrast (3:1 required). [source:foundation/iconography/accessibility]
Never: Use `--color-warning` (3.0:1) as a standalone icon color — at the exact floor, not a safe pass. [source:foundation/iconography/accessibility]
Must: When using `--color-success` or `--color-warning` for feedback icons, always pair with a `--color-text-primary` text label. The label carries the accessible meaning. [source:foundation/iconography/accessibility]
Must: Decorative icons (with `aria-hidden="true"`) have no contrast requirement — their meaning is carried by surrounding text. Only semantic icons (with `label` prop) are subject to the 3:1 non-text contrast threshold. [source:foundation/iconography/accessibility]
```

**Step 4: Verify** — read the full DS_CONSTRAINTS.md Iconography and Accessibility sections and confirm all constraints are present with source tags.

---

## Task 8: Build verification

**Step 1: Run build and typecheck**

```bash
pnpm build && pnpm typecheck
```

Expected: both pass with no errors.

**Step 2: If MDX errors appear**

MDX errors are typically unclosed JSX tags or malformed code fences. Read the error line, fix in the relevant `.mdx` file, re-run.

**Step 3: Commit**

```bash
git add apps/docs/content/foundation/iconography/ docs/DS_CONSTRAINTS.md docs/plans/
git commit -m "docs(iconography): review and extract constraints — Step -1 Iconography section"
```

---

## Completion Criteria

- [ ] `usage.mdx` — `className` in props table, color syntax fixed, disabled state documented, responsive sizing note added
- [ ] `sizes.mdx` — responsive sizing rule section added
- [ ] `accessibility.mdx` — touch target rewritten to 44×44px wrapper pattern, success/warning contrast warning added
- [ ] `library.mdx` — custom icon soft preference note prepended
- [ ] `DS_CONSTRAINTS.md` — Iconography section fully populated, Accessibility section has icon-specific rules
- [ ] `pnpm build` and `pnpm typecheck` pass
- [ ] Committed
