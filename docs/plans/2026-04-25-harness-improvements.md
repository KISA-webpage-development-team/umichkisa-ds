# Harness + ds-client-constrained-execution Improvements

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Tighten the ds-client-migration harness before Phase 3 — fix doc/agent token plumbing, bake Phase 1+2 evidence into write-time enforcement, add a Toss-FF code-quality pass, add a manually-invoked visual UI review skill, and trim the cold-session preflight.

**Architecture:** Three layers of change:
1. **Agents/skills** — `ds-client-review` self-loads its doc; new `toss-fe-review` agent dispatched per task; new standalone `review-ui-on-browser` skill (manual, Playwright CLI).
2. **Docs** — `DS_CLIENT_USAGE.md` restructured (write-time decision tree on top, review rulebook on bottom) and content-extended with G1–G5 from Phase 2 evidence + MEMORY-only rules absorbed.
3. **Orchestration** — `ds-client-constrained-execution/SKILL.md` wires the new review agent and trims wording; `CLAUDE.md` preflight goes minimal (TODO + symlink + inlined mode-detection); HARNESS/AP become consult-on-demand.

**Tech Stack:** Markdown docs, Claude Code agents (.md w/ frontmatter), Claude Code skills (SKILL.md w/ frontmatter), Playwright CLI (manual install on user Mac for skill #4).

**Repo:** `/Users/jiohin/Desktop/KISA/DevTeam/dev/umichkisa-ds/` (DS repo only — no client-side changes in this batch).

**Branch model:** Single feature branch off `main` (this is harness/docs work, not migration lane). Recommend branch `harness-improvements-2026-04-25`. One PR.

---

## Phase Overview

| Phase | What | Depends on | Parallelizable? |
|---|---|---|---|
| 1 | Update `ds-client-review` agent (self-load doc) | — | ⏸ block all later phases |
| 2 | Restructure + extend `DS_CLIENT_USAGE.md` | Phase 1 | ⏸ block Phase 3+ |
| 3 | Create `toss-fe-review` agent | Phase 2 (refs new doc structure) | ✅ parallel with Phase 4 |
| 4 | Create `review-ui-on-browser` skill | Phase 2 (refs DS_CLIENT_USAGE) | ✅ parallel with Phase 3 |
| 5 | Update `implementer-template.md` (pre-flight checklist) | Phase 2 | ✅ parallel with Phase 3, 4 |
| 6 | Update `DS_CODEBASE.md` (implementer pointer note) | Phase 2 | ✅ parallel with Phase 3, 4, 5 |
| 7 | Update `ds-client-constrained-execution/SKILL.md` (wire toss-fe-review, drop inline-paste, trim) | Phases 1, 3, 5 | ⏸ block Phase 8+ |
| 8 | Update `HARNESS_DESIGN.md` + `AUTONOMOUS_PROTOCOL.md` | Phase 7 | ✅ parallel with Phase 9 |
| 9 | Update `CLAUDE.md` preflight | Phases 7, 8 | ✅ parallel with Phase 8 |
| 10 | Verification — re-read SKILL.md flow, `pnpm build`, `pnpm typecheck` | All | — |

Phases marked ✅ parallel can be dispatched as parallel subagents. Phases marked ⏸ are gating.

---

## Phase 1 — `ds-client-review` agent self-loads its doc

**Why first:** every other change that touches the skill assumes the agent owns its doc. Land this before SKILL.md drops the inline-paste step (Phase 7).

### Task 1.1 — agent loads DS_CLIENT_USAGE.md itself

**Files:**
- Modify: `.claude/agents/ds-client-review.md` lines 11–16 (input section) and any other place that says "you will receive ... DS_CLIENT_USAGE.md"

**Step 1: Replace the "Your input" block**

Current (lines 11–16):
```
## Your input

You will receive:
1. The full content of one or more changed `.tsx` files from the client app
2. The full content of `docs/DS_CLIENT_USAGE.md`
```

Replace with:
```
## Your input

You will receive:
1. The full content of one or more changed `.tsx` files from the client app

## Your reference doc

Before reviewing, Read `docs/DS_CLIENT_USAGE.md` (resolve relative to the umichkisa-ds repo root: `/Users/jiohin/Desktop/KISA/DevTeam/dev/umichkisa-ds/docs/DS_CLIENT_USAGE.md`). This is your authoritative ruleset. Re-read it on every invocation — do not assume cached content.
```

**Step 2: Scan agent file for any other reference assuming inline-paste**

Run: `grep -n "DS_CLIENT_USAGE" .claude/agents/ds-client-review.md`
Expected: only the new "Your reference doc" block references it. If any "you will receive ... DS_CLIENT_USAGE" leftover, remove.

**Step 3: Commit**

```bash
git add .claude/agents/ds-client-review.md
git commit -m "ds-client-review: agent reads DS_CLIENT_USAGE.md itself

Move ownership of the constraint doc from caller-pasted to agent-loaded.
Cuts ~3K tokens per review round in the parent (ds-client-constrained-execution
skill) without changing review behavior — agent runs in its own sub-context
and Reads the doc each invocation."
```

### Acceptance criteria
- Agent file no longer claims it receives DS_CLIENT_USAGE.md as an input
- Agent file instructs the reviewer to Read the file each invocation, with absolute path
- `grep "paste DS_CLIENT_USAGE.md inline"` in `.claude/agents/ds-client-review.md` returns nothing

---

## Phase 2 — Restructure + extend `DS_CLIENT_USAGE.md`

**Why before Phases 3–6:** new agent and template phrasings reference the new section names. Reshape and extend in one pass.

**Target shape (new top-to-bottom order):**

```
# DS Client Usage Constraints
[purpose / 3-line intro — same as today]

---

## Part 1 — Write-Time Decision Tree (read this BEFORE writing code)

### Available DS Surface (quick-ref)
[component list, token tier table, icon registry pointer — see Task 2.4]

### Tier Picker (write-time check)
[spacing tier picker, color picker, radius picker, type picker — see Task 2.5]

### "What to Use" Rules (Must)
[concise list — every Must rule from current doc, grouped by surface]

---

## Part 2 — Review-Time Rulebook (the reviewer reads this)

### Setup
### Component Usage
### Styling
### Icons
### Forms
### Layout
### Local Components
### className Passthrough
### Third-Party Libraries
### Migration-Specific
### NEW: DS Component Defaults — Do Not Override (G1)
### NEW: Status Variant Selection (G2)
### NEW: Spacing Tier Mistakes (G3 — already partially in doc, expand)
### NEW: Form Hooks Import Path (G4)
### NEW: type-* Weight Override (G5)
### NEW: Visibility Rule — text-muted-foreground vs text-foreground
### NEW: No Left-Border Accent
### NEW: Intro Foreground (intro paragraphs are primary text)
### NEW: No Card Padding Override
```

### Task 2.1 — Move existing content into "Part 2 — Review-Time Rulebook"

**Files:**
- Modify: `docs/DS_CLIENT_USAGE.md` (whole file rewrite)

**Step 1: Read current full doc** (already done — 144 lines).

**Step 2: Create the new shell**

Open the doc, keep lines 1–7 (purpose/intro) plus the existing horizontal rule, then insert under it:

```markdown
## Part 1 — Write-Time Decision Tree

_Read this BEFORE writing any line of client code that touches UI. Implementers: this is your write-time cheat sheet. Reviewers: skip to Part 2 — Review-Time Rulebook below._

[Tasks 2.4 + 2.5 + 2.6 fill this in]

---

## Part 2 — Review-Time Rulebook

_Full constraint taxonomy. The `ds-client-review` agent scans this end-to-end._
```

Then move all current sections (Setup → Migration-Specific) **under Part 2** verbatim. Do not change content yet — just reposition.

**Step 3: Commit (intermediate, structural only)**

```bash
git add docs/DS_CLIENT_USAGE.md
git commit -m "DS_CLIENT_USAGE: split into Part 1 (write-time) / Part 2 (review)

Structural-only — no rule changes. Existing content is moved verbatim under
Part 2. Part 1 is a placeholder filled by subsequent commits."
```

### Task 2.2 — Add G1: Do Not Override DS Layout Components

**Files:**
- Modify: `docs/DS_CLIENT_USAGE.md` — add section under Part 2 (after current "className Passthrough" section)

**Step 1: Add this section content under Part 2**

```markdown
### DS Component Layout — Do Not Override (G1)

Never: Add flex / overflow / height / max-height utility classes to a DS layout component (`Dialog`, `DialogContent`, `Tabs`, `TabsList`, `TabsContent`, `Form`, `Card`, `CardContent`, `CardFooter`, `Sheet`, `Drawer`) to force size or layout. The DS owns the layout pattern of these components — flex containers, gap spacing, overflow behavior. Adding `flex flex-1 overflow-hidden` to `<Tabs>` or `<Form>` to make them fill height is fighting the DS. [source:phase-2/lane-2.11b smoke fix, commit c4cea05]

If a layout doesn't fit:
- Cap inner content with `max-h-[60vh]` (or similar) on the inner content child (e.g., `<TabsContent>`), not on the outer DS layout component
- If the cap doesn't solve it, the DS component is missing a variant — collect via `ds-fix-during-migration`

Allowed (positioning passthrough): `mt-4`, `w-full`, `mx-auto`, `hidden md:block` on DS components — these are layout/positioning, not internal layout overrides.

Disallowed examples (would have been caught here in Phase 2):
- `<Tabs className="flex flex-1 flex-col overflow-hidden">` — overrides DS Tabs layout
- `<Form className="flex flex-1 flex-col gap-4 overflow-hidden">` — overrides DS Form layout
- `<DialogContent className="max-h-[90dvh] flex flex-col">` — DS Dialog now owns this; override is redundant

Allowed:
- `<TabsContent className="max-h-[60vh] overflow-y-auto">` — height cap on inner content, not on DS layout
```

**Step 2: Commit**

```bash
git add docs/DS_CLIENT_USAGE.md
git commit -m "DS_CLIENT_USAGE: add G1 (no override on DS layout components)

From Phase 2 lane 2.11b smoke fix (commit c4cea05): implementer applied
flex/overflow utilities to <Tabs> and <Form> to force fill-height, fighting
DS layout. Codify the rule: do not add layout overrides to DS layout
components; use max-h on inner content instead."
```

### Task 2.3 — Add G2 through G5

**Files:**
- Modify: `docs/DS_CLIENT_USAGE.md`

**Step 1: G2 — Status Variant Selection**

Add under Part 2 (near `Component Usage`):

```markdown
### Status Variant Selection (G2)

Must: When a `Badge`, `Alert`, or other DS feedback component expresses status, use the **semantic** variant — `success`, `warning`, `error`, `info` — not the neutral/outline variant.

Status content includes: "available now" / "즉시 제공" → `success`; "age check required" / "연령 확인" → `warning`; error states → `error`; passive informational → `info`.

`outline` / default neutral is for non-status content (categorical tags, generic labels).

[source:phase-2/lane-2.11b smoke fix, commit 59462d4]
```

**Step 2: G3 — Spacing Tier (expand existing layout section)**

Find the existing `### Layout` section in Part 2. Append after `Must: Follow the three-tier vertical spacing system`:

```markdown
**Tier-justify every spacing value before writing.** Spacing inside a single component (image+text inside a row, label+input inside a field, icon+text inside a chip) is **Component or Element tier** (`gap-2` / `gap-3` / `gap-4`), not Section tier. `gap-6`/`gap-8` are reserved for boundaries between major page sections. [source:phase-2/lane-2.11b smoke fix, commit 59462d4 — `gap-6` → `gap-4` correction on row internals]

Write-time check (when picking a `gap-*` / `space-*` value):
1. What is the role of the container? (page section / component-internal / inline)
2. Is the chosen value the canonical tier value for that role? (8 / 16 / 24 px = `gap-2` / `gap-4` / `gap-6`)
3. If you cannot answer (1) and (2) cleanly, do not write the value — ask.
```

**Step 3: G4 — Form Hooks Import Path**

Find the existing `### Forms` section. Replace the current `Never: Import \`react-hook-form\` directly` line with:

```markdown
Never: Import any RHF symbol (`useForm`, `useFormField`, `useFormStatus`, `useFormContext`, `useFormState`, `useWatch`, `Controller`) directly from `react-hook-form`. Always use `@umichkisa-ds/form` re-exports. The DS form package wraps `useForm` with `mode: "onTouched"` and other defaults; bypassing the wrapper produces inconsistent validation timing and breaks the DS form contract.

If a hook you need is not yet re-exported by `@umichkisa-ds/form`, treat it as a DS gap and run `ds-fix-during-migration` to add the re-export — do not import from `react-hook-form` as a workaround. [source:phase-2/lane-2.19 — `useFormContext` was missing from `@umichkisa-ds/form`; required form 1.0.1 re-export commit 086c148]
```

**Step 4: G5 — type-\* Weight Override**

Find the existing `### Tokens` section under `Styling`. Add after the existing `Must: Use \`type-*\` semantic utility classes` line:

```markdown
Never: Override the weight of a `type-*` class with `!font-*` (e.g., `type-body !font-semibold`, `type-h2 !font-bold`). The `type-*` tier already bakes weight, font-family, and line-height. If a different weight is needed, pick a different `type-*` class — do not override. [source:MEMORY/feedback_type_weight_override; phase-2/lane-2.19 commit 09d2cd0 swept these out]

Exception during migration: short-lived `!font-*` overrides may exist when the type-* tier doesn't yet expose the desired weight. Collect these as a DS gap (request a new `type-*` tier or a weight variant via `ds-fix-during-migration`); do not let them ship long-term.
```

**Step 5: Commit (one commit covering G2–G5)**

```bash
git add docs/DS_CLIENT_USAGE.md
git commit -m "DS_CLIENT_USAGE: add G2–G5 from Phase 2 evidence

G2: Status variant selection — semantic, not outline (lane 2.11b)
G3: Spacing tier write-time check — gap-6 ≠ component-internal (lane 2.11b)
G4: Form hooks import path — never bypass @umichkisa-ds/form (lane 2.19)
G5: type-* weight override prohibition (MEMORY rule, lane 2.19 sweep)"
```

### Task 2.4 — Add "Available DS Surface" quick-ref (Part 1)

**Files:**
- Modify: `docs/DS_CLIENT_USAGE.md` — fill in Part 1 first section

**Step 1: Generate the quick-ref content**

The implementer needs to know: which components exist, which token classes exist, where icons come from. This is a curated subset of `DS_CODEBASE.md`. Read `docs/DS_CODEBASE.md` and extract:
- Component list with import path + one-line use ("Button — `@umichkisa-ds/web`, primary actions")
- Token utility classes (`text-foreground`, `bg-surface`, `border-brand-primary`, `type-h1` through `type-caption`)
- Icon source: `<Icon name="..." />` from `@umichkisa-ds/web` — registry at `packages/web/src/components/icon/registry.ts`
- Form components: `Form.Input`, `Form.Textarea`, `Form.Select`, `Form.Checkbox`, `Form.Radio`, `Form.Switch`, `Form.Button` from `@umichkisa-ds/form`
- Hooks: `useForm`, `useFormField`, `useFormStatus`, `useFormContext` from `@umichkisa-ds/form`

Insert under `## Part 1 — Write-Time Decision Tree` as the first subsection:

```markdown
### Available DS Surface (quick-ref)

For complete details, see `DS_CODEBASE.md`. This subset covers the surface most lanes need.

**Components (`@umichkisa-ds/web`):**
- Layout: `Container`, `Card` (+ `CardHeader`, `CardContent`, `CardFooter`, `CardTitle`, `CardDescription`)
- Surfaces: `Dialog`, `Sheet`, `Drawer`, `Popover`, `Tooltip`, `HoverCard`
- Inputs (raw — prefer `Form.*` from form package): `Button`, `Badge`, `Avatar`
- Feedback: `StatusView` (variants: `not-authorized`, `not-found`, `not-logged-in`, `error`, `loading`; `fullScreen` prop), `Alert` (variants: `success`, `warning`, `error`, `info`), `LoadingSpinner`
- Navigation: `Tabs` (+ `TabsList`, `TabsTrigger`, `TabsContent`), `Accordion`, `DropdownMenu`, `NavigationMenu`
- Toast: `Toaster` (mount once at root), `toast()` from `@umichkisa-ds/web`
- Utility: `cn()`, `Icon`

**Form components (`@umichkisa-ds/form`):**
- Compounds: `Form.Input`, `Form.Textarea`, `Form.Select`, `Form.Checkbox`, `Form.Radio`, `Form.Switch`, `Form.Button`
- Hooks: `useForm`, `useFormField`, `useFormStatus`, `useFormContext`

**Token classes (Tailwind v4 @theme):**
- Color: `text-foreground`, `text-muted-foreground`, `bg-surface`, `bg-surface-subtle`, `bg-brand-primary`, `bg-brand-accent`, `bg-brand-accent-subtle`, `border-border`, `border-border-strong`, `border-brand-primary`, plus status: `bg-success`, `bg-warning`, `bg-error`, `bg-info`
- Typography: `type-display`, `type-h1`, `type-h2`, `type-h3`, `type-body`, `type-body-lg`, `type-body-sm`, `type-label`, `type-caption`
- Spacing tiers: `gap-2` / `gap-4` / `gap-6` (Element / Component / Section)
- Radius: `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-full`
- Breakpoints: default, `md:`, `lg:` only

**Icons:**
- `<Icon name="..." size="xs|sm|md|lg|xl" />` from `@umichkisa-ds/web`. Registry: `packages/web/src/components/icon/registry.ts`. If a name is missing, use `ds-fix-during-migration`.
```

**Step 2: Commit**

```bash
git add docs/DS_CLIENT_USAGE.md
git commit -m "DS_CLIENT_USAGE: add Part 1 'Available DS Surface' quick-ref

Implementer-facing component / token / icon catalog so the implementer
doesn't need to also read DS_CODEBASE.md. Content is a curated subset
of DS_CODEBASE.md, deliberately denormalized for write-time use."
```

### Task 2.5 — Add Tier Picker (Part 1)

**Files:**
- Modify: `docs/DS_CLIENT_USAGE.md`

**Step 1: Add this subsection under Part 1, after "Available DS Surface"**

```markdown
### Tier Picker (write-time check)

Before writing any spacing / color / radius / text / icon-size value, identify its tier and pick the canonical token. If you cannot tier-justify a value, do not write it — flag it and ask.

**Spacing (gap, padding, margin):**
- Element tier (8px) → `gap-2`, `space-x-2`, `p-2` — icon+text, button+icon, tag clusters, inline groups
- Component tier (16px) → `gap-4`, `space-y-4`, `p-4` — between sibling components inside a feature, list items, stacked form fields, card internals
- Section tier (24px) → `gap-6`, `space-y-6`, `p-6` — between major page sections, page-level container padding
- Off-tier (gap-3, gap-5, gap-7) → only inside a single component's internal layout (e.g., `p-3` on a chip is fine; `gap-3` between siblings is wrong)

**Color (text):**
- Primary content → `text-foreground` (body, labels users read, card values, headers)
- Genuinely secondary → `text-muted-foreground` (captions, helper text, metadata, timestamps, placeholder hints)
- Test: "if this text went to 40% opacity, would the screen still be usable?" If no, it's primary; keep `text-foreground`.

**Color (background / border):**
- Surfaces → `bg-surface` (cards), `bg-surface-subtle` (subtle blocks)
- Brand → `bg-brand-primary`, `bg-brand-accent`, `bg-brand-accent-subtle`
- Status (Badge/Alert) → `bg-success`, `bg-warning`, `bg-error`, `bg-info` (or use semantic variants on DS components)
- Borders → `border-border` (default), `border-border-strong` (emphasized), `border-brand-primary` (brand emphasis)

**Radius:**
- `rounded-sm` / `rounded-md` → buttons, inputs, cards (default DS)
- `rounded-lg` → modals, larger surfaces
- `rounded-full` → avatars, pills
- `rounded-xl` / `rounded-2xl` → only with explicit DS-surface justification

**Typography:**
- Display / hero → `type-display`
- Headings → `type-h1`, `type-h2`, `type-h3`
- Body → `type-body` (default), `type-body-lg` (lead paragraphs), `type-body-sm` (compact)
- Labels → `type-label` (form labels, button labels)
- Captions → `type-caption` (metadata, timestamps)
- Always pair with a color token (`type-*` does not set color).
- Never override weight with `!font-*` — pick a different `type-*` class.

**Icon size:**
- 5-step scale: `xs` / `sm` / `md` / `lg` / `xl`
- Never override with font-size utilities or arbitrary CSS.
```

**Step 2: Commit**

```bash
git add docs/DS_CLIENT_USAGE.md
git commit -m "DS_CLIENT_USAGE: add Part 1 'Tier Picker' write-time check

Forces the implementer to tier-justify every spacing/color/radius/type/icon
value before writing. Codifies the 'redesign over preserve, at write time'
principle that was added to the skill but not enforced by the doc."
```

### Task 2.6 — Add "What to Use" Rules (Part 1) + absorb MEMORY-only rules

**Files:**
- Modify: `docs/DS_CLIENT_USAGE.md`

**Step 1: Add this subsection under Part 1, after "Tier Picker"**

```markdown
### "What to Use" Rules (Must)

A condensed, write-time view of the Must rules from Part 2. Read Part 2 for full context and source citations.

- Use `Container` for page shells. Never compose `mx-auto max-w-screen-2xl px-4 ...` manually.
- Use `Form.*` compounds + `useForm` from `@umichkisa-ds/form` for all forms. Never `useState` for form state.
- Use `<Icon name="..." />` from `@umichkisa-ds/web` for all icons. Never `react-icons`, never direct `lucide-react`, never inline SVGs.
- Use `cn()` from `@umichkisa-ds/web` for all className merging. Never raw `clsx` or string concatenation.
- Use `StatusView` (variants + `fullScreen` prop) for full-page status. Never `<div className="h-screen flex items-center">` wrappers.
- Use semantic Badge / Alert variants for status content (`success`, `warning`, `error`, `info`). Never `outline` for status.
- Use breakpoints `default` / `md:` / `lg:` only. Never `sm:`, `xl:`, `2xl:`.
- Use `type-*` classes paired with a color token. Never override with `!font-*`.
- Cap inner content with `max-h-[…]` if a DS layout component (Dialog, Tabs, Form, Card) doesn't fit. Never apply `flex` / `overflow-*` to the DS component to force fill.

### Visibility & Hierarchy Rules

- **`text-muted-foreground` is NOT default body color.** Reserve for *genuinely secondary* content (captions, helper text, metadata, timestamps). Card values, list labels, body paragraphs, form labels stay `text-foreground`. [source:MEMORY/feedback]
- **Intro paragraphs are primary content.** A page's lead paragraph or section intro is `text-foreground`, not muted. [source:MEMORY/feedback_intro_foreground]
- **No left-border accent for selected state.** Use `bg-brand-accent-subtle border-brand-primary` (full border ring), not a `border-l-4` accent stripe. [source:MEMORY/feedback_no_left_border]
- **No padding override on Card / CardContent / CardFooter.** Respect component defaults. If padding feels wrong, the Card is being misused for a non-card surface — pick a different DS component. [source:MEMORY/feedback_card_no_override]
```

**Step 2: Commit**

```bash
git add docs/DS_CLIENT_USAGE.md
git commit -m "DS_CLIENT_USAGE: add Part 1 'What to Use' + absorb MEMORY rules

Condensed Must list for write-time scanning, plus visibility/hierarchy
rules previously living only in MEMORY (text-muted-foreground visibility,
intro foreground, no-left-border, no-card-padding-override)."
```

### Acceptance criteria (Phase 2)
- `docs/DS_CLIENT_USAGE.md` opens with Part 1 (Available DS Surface → Tier Picker → What to Use → Visibility) and ends with Part 2 (full rulebook).
- All G1–G5 sections present in Part 2.
- All listed MEMORY rules present in Part 1's Visibility & Hierarchy block.
- Word count grew from ~144 to ~300–350 lines (estimate). Confirm with `wc -l docs/DS_CLIENT_USAGE.md`.

---

## Phase 3 — Create `toss-fe-review` agent (parallel-safe)

### Task 3.1 — Write the agent file

**Files:**
- Create: `.claude/agents/toss-fe-review.md`

**Step 1: Write the agent**

Full content:

```markdown
---
name: toss-fe-review
description: Frontend code-quality reviewer applying Toss Frontend Fundamentals (readability, predictability, cohesion, coupling). Use after ds-client-review passes on a task that touches .tsx files. Returns structured findings with severity gates so the orchestrator can decide whether to re-dispatch the implementer.
tools: Read, Glob
---

# Toss FE Code-Quality Reviewer

You are a focused code-quality reviewer applying the Toss Frontend Fundamentals rubric. Your only job is to flag readability / predictability / cohesion / coupling smells in the changed `.tsx` files. Do not check DS constraints (a separate agent owns that). Do not check perf (vercel-react-best-practices owns that at end-of-feature).

## Your input

You will receive the full content of one or more changed `.tsx` files from the client app. The orchestrator may also paste relevant adjacent files for context (parents, siblings, hook callers).

## Rubric — four axes

### Readability — how fast can a new reader understand this code?

- Functions are short and single-purpose. Threshold: a single function or component body > 80 lines is a candidate for extraction; > 120 lines is a clear smell.
- Conditional logic is named. Inline `condition1 && condition2 || ...` chains buried in JSX should be lifted to a named const (`const canSubmit = ...`).
- Magic numbers / strings have names. `if (count > 7)` is a smell; `const MAX_ITEMS = 7; if (count > MAX_ITEMS)` is not.
- Ternaries nest at most 2 deep. `a ? b : c ? d : e` is the limit. `a ? b : (c ? d : (e ? f : g))` is a clear smell.
- Code reads top-to-bottom. Time-traveling (declaring a hook before its dependencies are defined, or referencing later-declared helpers without `function` hoisting) hurts readability.
- Mixed concerns in one function (data fetching + transformation + render decisions) should split.

### Predictability — does the code do what its name implies?

- Same-shape functions return same-shape types. If `getUser()` returns `User`, `getOrder()` should return `Order`, not sometimes `null` and sometimes throwing.
- No name collisions across module / hook / variable scope.
- A "useFoo" hook returns the canonical shape `{ data, error, isLoading }` (or `{ data, error, isLoading, refetch }`) consistently across hooks in the same feature.
- No hidden side effects. A function named `formatDate` should not also mutate global state.

### Cohesion — does code that changes together live together?

- Field-level validation logic colocated with the field, not in a top-level form file.
- Helpers used only by one component live next to that component, not in a shared `utils/` until they're used by ≥ 2 callers.
- Sub-components that exist only to be passed to one parent live in the parent's file (or a `_shared/` sibling), not a top-level component dir.
- Cross-field validation logic colocates at the form root with `useFormContext`, not duplicated in each field.

### Coupling — when this changes, what else has to change?

- Components don't reach into siblings' internals. Communicate via props or a shared parent.
- I/O (Cloudinary calls, fetch, localStorage access) lives in a dedicated `apis/` or hook layer, not inline in components.
- Type casts (`as Foo`) for `next-auth` session, query params, etc. are centralized in a wrapper hook, not scattered.
- Deep prop drilling (> 2 levels of `prop` passthrough that the middle layers don't use) is a smell — prefer composition or context.

## Severity gate

Every finding has a severity. The orchestrating skill uses severity to decide what to do.

- **BLOCK** — must be fixed before commit. Re-dispatches the implementer with the finding. Reserved for severe smells:
  - Function / component body > 80 lines AND mixing concerns (e.g., data + transformation + render in one block)
  - Ternary depth > 3
  - Clear duplication (≥ 2 copies of the same 5+ line block in the same file or sibling files)
  - Leaky abstraction across module boundary (a low-level util reaches into a domain type, or a domain type carries a UI concern)
  - I/O inline in a component (raw fetch / Cloudinary / localStorage) when the codebase has an established hook/api layer
- **SUGGEST** — note in PR body, not blocking. Default for most findings: extract a helper, name a magic number, lift a conditional to a named const, colocate a sub-component.
- **INFO** — purely advisory, no PR-body note. Style preferences, micro-readability nits.

Default disposition is conservative. **When in doubt, downgrade to SUGGEST.** The over-refactor risk (nightly autonomous lanes spinning on Toss-FF re-dispatches) is worse than a missed BLOCK.

Style preferences (one-liner vs. helper for trivial single-call cases, prefer-const-vs-let, arrow-vs-function) are NEVER BLOCK. Often INFO or skipped entirely.

## Output format

For every finding:

```
FINDING N [BLOCK|SUGGEST|INFO]
File: <file path>:<line number>
Axis: readability | predictability | cohesion | coupling
Smell: <one-line problem statement>
Suggested refactor: <concrete change or extraction>
```

End every response with a result line:

```
---
Result: B BLOCK, S SUGGEST, I INFO finding(s)
```

If fully clean:

```
---
Result: PASS — no findings
```

## Rules for reviewing

- Be specific about line numbers
- Only report Toss-FF rubric smells — not DS constraints (ds-client-review's job), not perf (vercel-react-best-practices' job)
- Concrete suggestions only — "make this more readable" is not actionable; "extract `validatePochaInfo` to `_shared/validate.ts`" is
- Do NOT BLOCK on style preferences
- Do NOT BLOCK on the user's commit habits, naming idioms, or framework choices
- If the file is < 30 lines and does one thing, default to PASS — short focused code is the goal
- BLOCK threshold is intentionally narrow: severe smells only
```

**Step 2: Commit**

```bash
git add .claude/agents/toss-fe-review.md
git commit -m "agent: add toss-fe-review (frontend code-quality reviewer)

New agent applying the four Toss FF axes (readability, predictability,
cohesion, coupling) with a conservative BLOCK / SUGGEST / INFO severity
gate. Wired into ds-client-constrained-execution per-task flow in a
separate commit. Designed with a minimum-change disposition to avoid
over-refactor loops in autonomous routines."
```

### Acceptance criteria
- `.claude/agents/toss-fe-review.md` exists with the four-axis rubric, severity gate, output format, and conservative defaults
- Agent uses only `Read` and `Glob` tools (matches `ds-client-review` shape)
- Frontmatter `description` triggers cleanly on "use after ds-client-review on .tsx tasks"

---

## Phase 4 — Create `review-ui-on-browser` skill (parallel-safe)

### Task 4.1 — Write the skill file

**Files:**
- Create: `.claude/skills/review-ui-on-browser/SKILL.md`

**Step 1: Write the skill**

Full content:

```markdown
---
name: review-ui-on-browser
description: Visual UI/UX review of a running localhost dev server using Playwright CLI. Use when the user wants Claude to look at the actual rendered UI on the browser (not just static code) and produce findings on hierarchy, spacing, primary action visibility, loading/empty/error states, and content readability. Manually invoked — not wired into autonomous routines.
---

# Review UI On Browser

## When to invoke

Manually, by the user, during:
- **Mode C (PR review)** — after checking out the branch and starting the dev server, before merge approval, to catch visual issues a human reviewer might miss
- **Mode D (interactive execution)** — after a UI-touching task completes, before `git commit`, to sanity-check the rendered result

NOT invoked from:
- `ds-client-constrained-execution` skill (intentional — Vercel preview auth + per-branch URL constraints make this impractical for autonomous use)
- Autonomous nightly routine (same)

## Prerequisites (one-time setup on the user's Mac)

```bash
# In ANY directory — Playwright manages its own browser binaries:
npx playwright install chromium
```

This downloads the Chromium browser binary (~150MB, ~2 min). Once installed, subsequent invocations skip this step.

## Prerequisites (per invocation)

The user must have:
1. Checked out the branch they want to review
2. Started the dev server (`cd ../KISA-website/client && npm run dev`)
3. Confirmed the dev server is reachable at the URL they pass to the skill (default `http://localhost:3000`)

The skill does NOT start the dev server. It assumes the running server.

## Inputs (the user tells the skill these)

- **Base URL** (default `http://localhost:3000`)
- **Routes** to visit (e.g., `["/pocha/manage", "/pocha/manage/?dialog=open"]`)
- **Key flows** (optional — descriptions like "open the create dialog, fill the info tab, switch to menu tab")
- **Viewports** (default `[{ width: 1280, height: 800, label: "desktop" }, { width: 375, height: 812, label: "mobile" }]`)
- **What changed** (a 1–2 sentence summary of what the user wants reviewed — e.g., "the PochaForm dialog redesign with sticky footer")

## Process

For each route × viewport combination:

1. Launch a headless browser via `npx playwright`
2. Navigate to `<baseURL><route>`
3. Set viewport size
4. Wait for `networkidle`
5. Screenshot — save to `/tmp/review-ui-on-browser/<timestamp>/<route-slug>-<viewport-label>.png`
6. Capture the accessibility tree (Playwright `page.accessibility.snapshot()`)
7. If a flow is described, walk through it (click selectors, fill inputs) — screenshot at each step

After captures, review every screenshot against the rubric below and return findings.

## Rubric

For each screenshot, evaluate:

### Hierarchy
- Is the primary action visually prominent (size, color, position)?
- Are headings clearly differentiated by size + weight from body text?
- Does the visual order match the intended reading order?

### Spacing rhythm
- Consistent gap tier within sections? (No `gap-2` jumping to `gap-6` arbitrarily)
- Page padding consistent with siblings on adjacent routes?
- Component-internal padding feels deliberate, not cramped or floating?

### Primary action visibility
- Can the user tell what to do next within 2 seconds of looking?
- Disabled / loading states distinct from the active state?
- Submit button position predictable (sticky footer for forms, end of card for actions)?

### State coverage
- Loading: a skeleton, spinner, or text placeholder is visible during data fetch
- Empty: empty state has helpful text + (if applicable) a primary action to fill it
- Error: error state has a clear message + recovery path
- All three states reachable in the routes/flows visited

### Content readability
- Body text uses primary foreground color (not muted-foreground for content the user must read)
- Status content uses semantic colors (success/warning/error/info), not muted neutrals
- No content overflow / text clipping at either viewport
- Korean + English text both render with their intended type tier

### Mobile (375px) specifics
- Tap targets ≥ 44×44 px
- No horizontal scroll on the body
- Modals / dialogs adapt to viewport (no offscreen content)
- Sticky footer stays in view during keyboard open (best-effort; flag if you can't tell)

## Output format

Per finding:

```
FINDING N [BLOCK|SUGGEST|INFO]
Screenshot: /tmp/review-ui-on-browser/<timestamp>/<route-slug>-<viewport-label>.png
Route: <route>
Viewport: <viewport label>
Smell: <one-line problem>
Suggested fix: <concrete change in code or design>
```

Severity:
- **BLOCK** — broken UX (overflow, content unreachable, primary action invisible, error state missing)
- **SUGGEST** — visible polish issue (spacing rhythm, hierarchy off, status badge wrong variant)
- **INFO** — minor polish or alternative

End with a summary:

```
---
Reviewed: <N> route(s) × <M> viewport(s)
Screenshots: /tmp/review-ui-on-browser/<timestamp>/
Result: B BLOCK, S SUGGEST, I INFO finding(s)
```

If clean:

```
Result: PASS — no findings
```

## Implementation notes

- Use `npx playwright codegen` patterns mentally; do not actually invoke codegen
- Run Playwright in headless mode (`--headed` is for the user to debug, not for the skill)
- Capture each screenshot as PNG
- The screenshots are the primary artifact — text findings reference them with absolute paths so the user can open them
- If `npx playwright install chromium` has not been run, fail early with the install instruction — do NOT silently install
- Do not modify any client files. Do not run dev server. Do not commit anything.

## Common pitfalls

- Forgetting to wait for `networkidle` before screenshot → captures loading skeleton instead of loaded UI
- Mixing up base URL with route — base URL is `http://localhost:3000`, route is `/pocha/manage`
- Reviewing only desktop — always include mobile (375px) at minimum
- Reporting findings without absolute screenshot paths — the user must be able to open the image to verify
```

**Step 2: Commit**

```bash
git add .claude/skills/review-ui-on-browser/SKILL.md
git commit -m "skill: add review-ui-on-browser (manual visual UI review)

Standalone skill, manually invoked. Uses Playwright CLI (one-time
\`npx playwright install chromium\` on user's Mac). Takes localhost
URL + routes + flows + viewports, captures screenshots, evaluates
against UI/UX rubric (hierarchy, spacing rhythm, primary action,
state coverage, content readability, mobile specifics).

Not wired into autonomous routine — Vercel preview auth + free-tier
dev-only branch make per-PR Playwright impractical. User invokes
during PR review (after checkout + dev server) or after a UI-touching
Mode D task before commit."
```

### Acceptance criteria
- `.claude/skills/review-ui-on-browser/SKILL.md` exists
- Frontmatter description makes it discoverable when user asks "review the UI" / "look at this in the browser"
- Skill explicitly states it does NOT start the dev server, assumes it's running
- Rubric covers hierarchy / spacing / primary action / state coverage / readability / mobile

---

## Phase 5 — Update `implementer-template.md` (parallel-safe)

### Task 5.1 — Add write-time pre-flight checklist

**Files:**
- Modify: `.claude/skills/ds-client-constrained-execution/implementer-template.md` lines 22–28 (the "Your Job" block)

**Step 1: Insert pre-flight block before "Your Job"**

Find this in the template (around line 21):

```
    ## Your Job

    Implement **Step 1 only** — create or modify the files as specified.
```

Insert this block ABOVE `## Your Job`:

```
    ## Pre-flight (do this FIRST — before writing any code)

    Read `docs/DS_CLIENT_USAGE.md` Part 1 (Write-Time Decision Tree). Then,
    for the task you're about to implement, list every styling decision
    you'll make and its DS tier or token justification:

    1. Spacing values — list every `gap-*`, `space-*`, `p*`, `m*` you'll write,
       with the role of its container (Element / Component / Section / inline)
       and the canonical tier value.
    2. Color values — list every `text-*`, `bg-*`, `border-*` and which DS
       semantic token applies (`text-foreground` vs `text-muted-foreground`,
       `bg-surface` vs `bg-brand-accent-subtle`, etc.).
    3. Radius values — list every `rounded-*` and the DS surface role.
    4. Type values — list every `type-*` class with its color pairing.
    5. Icon names + sizes — list every `<Icon name="..." size="...">` you'll
       write. If a name is missing from the registry, flag it as a DS gap.

    If you cannot tier-justify a value, do NOT write it — flag it as a
    question in your report and stop. The reviewer will not catch every
    off-tier value; you must catch them at write time.

    This is the "redesign over preserve" principle: when the original
    code's value conflicts with the DS tier, ship the DS-canonical value,
    not a mechanical demotion. Record every such choice as a "Deviation
    from original" line for the PR body.

```

**Step 2: Adjust the existing "DS Client Usage Constraints" block**

Find this (around line 32–37):

```
    ## DS Client Usage Constraints

    Follow every rule below as you write code. A constraint review agent will verify your
    output — aim for zero violations on the first pass.

    [PASTE FULL CONTENTS OF docs/DS_CLIENT_USAGE.md HERE]
```

Replace with:

```
    ## DS Client Usage Constraints

    Follow every rule in `docs/DS_CLIENT_USAGE.md`. A constraint review agent
    will verify your output — aim for zero violations on the first pass.

    Read the full file before writing. Part 1 (Write-Time Decision Tree)
    is your primary guide; Part 2 (Review-Time Rulebook) is what the
    reviewer will check you against.

    [PASTE FULL CONTENTS OF docs/DS_CLIENT_USAGE.md HERE]
```

(Keep the paste — implementer still gets the full doc inline. We reinforce that Part 1 is the write-time guide.)

**Step 3: Commit**

```bash
git add .claude/skills/ds-client-constrained-execution/implementer-template.md
git commit -m "implementer-template: add pre-flight tier-justification checklist

Forces implementer to enumerate every spacing / color / radius / type / icon
value with DS tier justification BEFORE writing code. Reinforces the
'redesign over preserve at write time, not review time' principle and
addresses the recurring G3 (spacing tier mismatch) finding from Phase 2.

Also points implementer at DS_CLIENT_USAGE.md Part 1 / Part 2 split."
```

### Acceptance criteria
- `implementer-template.md` has a "Pre-flight" section above "Your Job"
- Pre-flight enumerates the 5 categories (spacing, color, radius, type, icon)
- The existing inline-paste of DS_CLIENT_USAGE.md is preserved (only the framing changed)

---

## Phase 6 — Update `DS_CODEBASE.md` pointer (parallel-safe)

### Task 6.1 — Add implementer pointer note

**Files:**
- Modify: `docs/DS_CODEBASE.md` (top of file, after the title)

**Step 1: Locate the doc**

Run: `head -10 docs/DS_CODEBASE.md`

**Step 2: Insert this note immediately after the H1 title**

```markdown
> **Implementers, read `docs/DS_CLIENT_USAGE.md` instead.** This doc is the
> human-facing DS surface catalog used during planning / grill / discovery —
> not the write-time enforcement doc. The `ds-client-review` agent and the
> implementer subagent both read `DS_CLIENT_USAGE.md`, which has a Part 1
> ("Available DS Surface" + tier picker + write-time rules) curated for
> implementers and a Part 2 (full constraint rulebook) for the reviewer.
```

**Step 3: Commit**

```bash
git add docs/DS_CODEBASE.md
git commit -m "DS_CODEBASE: point implementers at DS_CLIENT_USAGE.md

Disambiguates the two docs: DS_CODEBASE is human-facing discovery
(used in grill / planning); DS_CLIENT_USAGE is write-time + review-time
enforcement (used by implementer + reviewer agents)."
```

### Acceptance criteria
- `DS_CODEBASE.md` opens with a clear note redirecting implementers to `DS_CLIENT_USAGE.md`

---

## Phase 7 — Update `ds-client-constrained-execution/SKILL.md`

**Why this phase is gating:** wires the new toss-fe-review pass + drops the inline-paste from ds-client-review invocation + trims wording. Depends on Phases 1, 3, 5.

### Task 7.1 — Drop inline-paste of DS_CLIENT_USAGE.md from ds-client-review invocation

**Files:**
- Modify: `.claude/skills/ds-client-constrained-execution/SKILL.md` lines 159–168 (DS Client Review section)

**Step 1: Replace the "What to pass in the agent prompt" block**

Find this:

```markdown
**What to pass in the agent prompt:**
1. The full content of each changed `.tsx` file (paste inline)
2. The full content of `docs/DS_CLIENT_USAGE.md` (paste inline)
3. Instruction: return structured violations per the agent's output format
```

Replace with:

```markdown
**What to pass in the agent prompt:**
1. The full content of each changed `.tsx` file (paste inline)
2. Instruction: return structured violations per the agent's output format

The agent reads `docs/DS_CLIENT_USAGE.md` itself — do not paste it inline.
```

**Step 2: Commit (intermediate)**

```bash
git add .claude/skills/ds-client-constrained-execution/SKILL.md
git commit -m "skill: drop DS_CLIENT_USAGE.md inline-paste from ds-client-review invocation

Agent now reads the doc itself (Phase 1). Saves ~3K tokens per review
round in the orchestrating skill."
```

### Task 7.2 — Wire toss-fe-review into per-task flow

**Files:**
- Modify: `.claude/skills/ds-client-constrained-execution/SKILL.md` — both flowcharts and supporting prose

**Step 1: Update the NO-TDD flowchart**

Find the `digraph no_tdd { ... }` block (around lines 44–76). Insert a `toss-fe-review` step between `ds-client-review` (after PASS) and `Typecheck + commit`. New flowchart structure:

```
"Start next task" → "Dispatch implementer" → "BLOCKED?"
  yes → "HARD STOP (escalate)"
  no → "Any .tsx?"
    yes → "ds-client-review"
      "Violations?"
        yes → "Re-dispatch with violations" → "Round 2 exhausted?"
          still failing → "HARD STOP (DS violations)"
          no → "ds-client-review"
        no → "toss-fe-review"
          "BLOCK findings?"
            yes → "Re-dispatch with toss findings" → "Round 2 exhausted (toss)?"
              still failing → "HARD STOP (toss BLOCK)"
              no → "toss-fe-review"
            no → "Collect SUGGEST/INFO for PR body" → "Typecheck + commit"
    no → "Typecheck + commit"
"Typecheck + commit" → "All tasks done?"
  yes → "vercel-react-best-practices"
  no → "Start next task"
```

Rewrite the digraph in DOT to match. (Keep it compact — don't over-state.)

**Step 2: Update the TDD flowchart**

Same insertion: between ds-client-review's PASS arrow and "Run tests (expect GREEN)", insert the toss-fe-review block. BLOCK findings re-dispatch implementer; SUGGEST/INFO collected. Then proceed to "Run tests (expect GREEN)" as before.

**Step 3: Add a "Toss FE Review" subsection**

After the existing "DS Client Review" section (around line 159), add:

```markdown
## Toss FE Review

After ds-client-review passes (no violations), and before typecheck (NO-TDD)
or before tests-green-verify (TDD), invoke the `toss-fe-review` agent using
the Agent tool.

**What to pass in the agent prompt:**
1. The full content of each changed `.tsx` file (paste inline)
2. (Optional) Adjacent files for context — parents, hook callers, sibling components — if the changed file references them in non-trivial ways
3. Instruction: return structured findings per the agent's output format

The agent reads its own rubric — do not paste rules inline.

**Severity gate (orchestrator behavior):**
- **BLOCK** finding(s) → re-dispatch implementer with the findings; same 2-round hard-stop rule as ds-client-review
- **SUGGEST** / **INFO** → collect for the PR body's `## Toss FE notes` section; do NOT re-dispatch

**Hard stop on toss BLOCK after 2 rounds:**

1. Print: `TOSS FE REVIEW HARD STOP — unresolved BLOCK findings after 2 rounds`
2. List every remaining BLOCK finding
3. Stop. Do not move to the next task.
4. Ask the user:
   > How would you like to proceed?
   > (a) Downgrade BLOCK to SUGGEST for this task — accept and move on
   > (b) Adjust the task scope — break out the refactor into its own lane
   > (c) Attempt one more round with new direction
   > (d) Override — accept the smell and ship as-is

Wait for explicit instruction.

**SUGGEST / INFO collection:**

Append SUGGEST findings to a `## Toss FE notes` section in the PR body
under each lane's commit. INFO findings are not surfaced.
```

**Step 4: Trim wording across the file**

Targets (current SKILL.md = 216 lines; target ~140 lines after trim):
- "Common Mistakes" section (lines 207–217 currently): keep only items NOT redundant with flowchart labels. Likely keeps 3–4 bullets, drops the rest.
- "Implementer Subagent" section (lines 139–149) and "Test-Writer Subagent" section (lines 151–158): consolidate into a single 4-line "Subagent Templates" subsection that points at `implementer-template.md` and `test-writer-template.md`. Drop the duplicated rule list.
- "Detecting `.tsx` tasks" subsection (lines 38–40): merge into the flowchart's first step description; doesn't need its own heading.
- Flowchart prose around the digraphs (e.g., lines 42–43, 78–79): trim to 1 sentence each.

**Step 5: Commit**

```bash
git add .claude/skills/ds-client-constrained-execution/SKILL.md
git commit -m "skill: wire toss-fe-review into per-task flow + trim wording

Per-task flow becomes: implementer → ds-client-review → toss-fe-review
→ typecheck → commit (NO-TDD); same insertion in TDD between ds-client-review
and tests-green-verify.

Severity gate: BLOCK re-dispatches implementer (2-round hard stop);
SUGGEST/INFO collected for PR body. Conservative defaults prevent
over-refactor loops.

Trim: 'Common Mistakes' kept only non-redundant items; subagent
sections collapsed to a 4-line pointer; flowchart prose tightened.
Net: 216 → ~140 lines."
```

### Acceptance criteria
- Both flowcharts have toss-fe-review inserted in the right place
- "Toss FE Review" section exists, documents the severity gate + hard-stop
- "DS Client Review" section no longer instructs caller to paste DS_CLIENT_USAGE.md
- File length is < 160 lines
- Run: `wc -l .claude/skills/ds-client-constrained-execution/SKILL.md` to verify

---

## Phase 8 — Update `HARNESS_DESIGN.md` + `AUTONOMOUS_PROTOCOL.md` (parallel-safe with Phase 9)

### Task 8.1 — `HARNESS_DESIGN.md` updates

**Files:**
- Modify: `docs/plans/client-migration/HARNESS_DESIGN.md`

**Step 1: Add "consult on demand" disclaimer at top**

Insert after line 3 (after the `Locked decisions from the grill session ...` line):

```markdown
> **For Claude:** This is a decisions reference doc, not a preflight load.
> Consult on demand when (a) a harness decision is being challenged,
> (b) a new phase is being planned, or (c) a mode-specific section is
> referenced by a skill. Do NOT read end-to-end on every cold session.
```

**Step 2: Update the per-phase internal flow section**

Find lines 51–60 (the "Execute" step). Replace the `[NO-TDD]` and `[TDD]` flow descriptions with:

```markdown
4. **Execute** — `ds-client-constrained-execution` skill. One skill with two modes:
   - `[NO-TDD]` tasks: implementer → ds-client-review → toss-fe-review → typecheck → commit
   - `[TDD]` tasks: test-writer (red) → implementer (green) → ds-client-review → toss-fe-review → tests-green-verify → refactor → typecheck → commit
   - Final pass after all tasks: `vercel-react-best-practices`
   - Manual UI review: invoke `review-ui-on-browser` skill before merge for any UI-touching lane (run `npm run dev` first)
```

**Step 3: Commit**

```bash
git add docs/plans/client-migration/HARNESS_DESIGN.md
git commit -m "HARNESS_DESIGN: note consult-on-demand + new review pipeline

- Top-of-doc disclaimer: not a preflight load; consult on demand
- Per-phase flow updated to include toss-fe-review per task and
  manual review-ui-on-browser before merge"
```

### Task 8.2 — `AUTONOMOUS_PROTOCOL.md` updates

**Files:**
- Modify: `docs/plans/client-migration/AUTONOMOUS_PROTOCOL.md`

**Step 1: Add consult-on-demand disclaimer at top**

Insert after line 3 (after the `_Authoritative reference ..._` italic line):

```markdown
> **For Claude:** This is operational reference. The cold-session protocol
> in CLAUDE.md inlines the mode-detection logic from §10 — you do NOT need
> to read this doc end-to-end on every session. Load specific sections
> just-in-time per the mode you're in (Mode A → §3 + HARNESS phase flow;
> Mode B → §3, §4; Mode C → `review-pr-queue` skill + §11; Mode D →
> `ds-client-constrained-execution` skill; Mode E → §14 + HARNESS close-out).
```

**Step 2: Update §15 (Skills Referenced)**

Find the table around line 622–636. Add three new rows:

```markdown
| `toss-fe-review` agent | Per-task code-quality review (readability/predictability/cohesion/coupling), inserted between ds-client-review and typecheck |
| `review-ui-on-browser` | Manual visual UI review via Playwright CLI on a running dev server. Used in Mode C (PR review) and Mode D (post-task) — never in autonomous routines |
```

**Step 3: Note in §10 (Cold-Session Modes) that detection logic moved to CLAUDE.md**

Find §10 around line 385. After the heading (line 385) and before "When you start a Claude Code session..." paragraph, insert:

```markdown
> **Detection logic now lives in `CLAUDE.md`.** This section remains as
> the canonical reference for the modes themselves (mode flows, mode triggers).
> The cold-session preflight in CLAUDE.md inlines the trigger-detection
> rules so the session can route into a mode without reading this doc first.
```

**Step 4: Drop the deferred Playwright allowlist note**

Search for any `visual-review` / Playwright allowlist mention in §9 (lines around 348–384). If present (we added one in earlier discussion drafts), remove it. If not present, no-op.

Run: `grep -n -i 'visual-review\|playwright' docs/plans/client-migration/AUTONOMOUS_PROTOCOL.md`
Expected: no matches related to allowlist additions.

**Step 5: Commit**

```bash
git add docs/plans/client-migration/AUTONOMOUS_PROTOCOL.md
git commit -m "AUTONOMOUS_PROTOCOL: consult-on-demand + register new agent + skill

- Top-of-doc disclaimer pointing to CLAUDE.md inlined mode detection
- §15: register toss-fe-review agent and review-ui-on-browser skill
- §10: note that detection logic moved to CLAUDE.md (this section
  remains as mode flow reference)
- Confirm no stale visual-review / Playwright allowlist additions"
```

### Acceptance criteria
- HARNESS_DESIGN.md has the consult-on-demand banner at the top
- HARNESS phase flow lists toss-fe-review and review-ui-on-browser
- AUTONOMOUS_PROTOCOL.md §15 lists the two new artifacts
- AUTONOMOUS_PROTOCOL.md §10 notes mode detection is in CLAUDE.md
- No stale visual-review allowlist references

---

## Phase 9 — Update `CLAUDE.md` preflight (parallel-safe with Phase 8)

### Task 9.1 — Trim preflight + inline mode-detection logic

**Files:**
- Modify: `CLAUDE.md`

**Step 1: Read current CLAUDE.md cold-session protocol**

Run: `cat CLAUDE.md`

Expected: ~30-line file with `### Cold-Session Startup` block (currently steps 1–4) and Mode A–E description deferred to AUTONOMOUS_PROTOCOL.

**Step 2: Replace the cold-session protocol block**

Find the current Cold-Session Startup section. Replace with:

```markdown
### Cold-Session Startup

**Preflight** (run every cold session — minimal universal load):

1. Read `docs/TODO.md` → find first unchecked entry under "## Client Migration"
2. **DS symlink check** (Phase 0+): `ls -la ../KISA-website/client/node_modules/@umichkisa-ds/web` — if not `->` symlink, run `bash ../KISA-website/client/scripts/link-ds.sh` (requires DS `dist/`; run `pnpm build` first if missing)

**Mode detection** (inlined from `AUTONOMOUS_PROTOCOL.md` §10 — do this without loading AP):

Derive the phase folder: `docs/plans/client-migration/phase-<N>-<slug>/` (where `<N>-<slug>` matches the first unchecked phase in TODO).

Then check repo state:

| Signal | Mode |
|---|---|
| `audit.md` missing in phase folder | **Mode A** — Audit writing |
| `audit.md` exists, `plan.md` missing | **Mode B** — Plan writing + issue generation |
| Open PRs exist for `phase-<N>` (per `gh pr list --label phase-<N>`) | **Mode C** — PR review |
| `plan.md` exists, open `needs-interactive` issues without linked PRs | **Mode D** — Interactive execution |
| All lanes merged for the phase | **Mode E** — Phase close-out |

**Propose, don't execute.** Say:
> "I see [state summary]. Likely mode: **X**. Proceed with Mode X, or pick a different mode?"

Wait for user confirmation. NEVER execute without explicit go-ahead.

**Mode-specific lazy loads** (load only when mode is confirmed):

| Mode | Load |
|---|---|
| A | `docs/plans/client-migration/HARNESS_DESIGN.md` (Per-Phase Internal Flow); `docs/plans/client-migration/AUTONOMOUS_PROTOCOL.md` §3 (issue template) |
| B | `AUTONOMOUS_PROTOCOL.md` §3 (issue template), §4 (6-rule autonomous gate) |
| C | `review-pr-queue` skill (handles its own loads) |
| D | `ds-client-constrained-execution` skill (handles its own loads) |
| E | `ds-phase-end-bump` skill; HARNESS_DESIGN.md "Phase close-out" section |

`docs/DS_CODEBASE.md` is loaded only if the current task involves DS surface discovery (typically Mode A grill or Mode D when a new component is needed). Implementers in Mode D execution use `docs/DS_CLIENT_USAGE.md` instead.

### Wrapping up a merged PR / lane

Invoke `wrapping-up-pr`.

### Closing a phase (Mode E)

1. All subphase entries already ticked (per-PR `wrapping-up-pr` handles those)
2. `pnpm build` + `pnpm typecheck` pass
3. If `ds-fixes-log.md` has phase entries, invoke `ds-phase-end-bump`
4. Tick the parent phase entry
```

**Step 3: Verify file is well-formed**

Run: `cat CLAUDE.md | head -60`
Expected: opens with `# umichkisa-ds — KISA Design System`, then `## Session Protocol`, then the new Cold-Session Startup. No leftover step references to HARNESS_DESIGN.md preload.

**Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "CLAUDE.md: trim preflight to minimal universal load + inline mode detection

Old preflight: TODO → HARNESS (full) → symlink → DS_CODEBASE.
New preflight: TODO → symlink. Mode-detection logic inlined from AP §10
(table-form so the session can route into a mode without preloading AP).
Mode-specific docs lazy-loaded only when the mode is confirmed.

Cuts cold-session context cost by ~40K tokens (HARNESS 265 lines + AP 700
lines no longer auto-loaded). Preserves all behaviors via the lazy-load
table — every mode pulls its own docs."
```

### Acceptance criteria
- `CLAUDE.md` Cold-Session Startup block has TODO + symlink as the only auto-loaded items
- Mode-detection table is present (5 modes, signals, lazy-load entries)
- HARNESS_DESIGN.md and DS_CODEBASE.md are no longer in the preflight steps
- "Wait for user confirmation" rule is explicit
- Wrapping-up + Mode E sections are unchanged at the bottom

---

## Phase 10 — Verification

### Task 10.1 — End-to-end SKILL.md flow review

**Step 1: Read the updated SKILL.md end-to-end**

Run: `cat .claude/skills/ds-client-constrained-execution/SKILL.md`

Walk through it as if you're starting a new task. Confirm:
- The flowchart is followable
- Both NO-TDD and TDD paths are clear
- The Toss FE Review section's severity gate is unambiguous
- Hard-stop language is consistent across DS and Toss reviews
- No leftover instruction to paste DS_CLIENT_USAGE.md inline anywhere
- File length < 160 lines

**Step 2: Cross-check that referenced files exist**

```bash
test -f .claude/agents/ds-client-review.md && echo "ds-client-review: ok"
test -f .claude/agents/toss-fe-review.md && echo "toss-fe-review: ok"
test -f .claude/skills/ds-client-constrained-execution/implementer-template.md && echo "implementer-template: ok"
test -f .claude/skills/ds-client-constrained-execution/test-writer-template.md && echo "test-writer-template: ok"
test -f .claude/skills/review-ui-on-browser/SKILL.md && echo "review-ui-on-browser: ok"
test -f docs/DS_CLIENT_USAGE.md && echo "DS_CLIENT_USAGE: ok"
test -f docs/DS_CODEBASE.md && echo "DS_CODEBASE: ok"
```

Expected: 7 lines of `: ok`.

**Step 3: Confirm DS_CLIENT_USAGE.md has Part 1 / Part 2 structure**

```bash
grep -n "^## Part [12]" docs/DS_CLIENT_USAGE.md
```

Expected: two matches.

```bash
grep -n "^### " docs/DS_CLIENT_USAGE.md
```

Expected: includes "Available DS Surface", "Tier Picker", "What to Use" (Part 1) plus the Part 2 sections.

**Step 4: DS-side build + typecheck (sanity — no code changes, but make sure docs/skills don't break a tooling check)**

```bash
cd /Users/jiohin/Desktop/KISA/DevTeam/dev/umichkisa-ds
pnpm build
pnpm typecheck
```

Expected: both green.

**Step 5: Commit any final adjustments + push**

If verification surfaces gaps (e.g., a referenced section doesn't exist, a flowchart label is wrong), fix them with one final commit:

```bash
git add -A
git commit -m "verify: harness improvements end-to-end pass"
```

### Task 10.2 — Open PR

**Step 1: Push branch**

```bash
git push -u origin harness-improvements-2026-04-25
```

**Step 2: Open PR**

```bash
gh pr create --title "Harness + ds-client-constrained-execution improvements (pre-Phase 3)" --body "$(cat <<'EOF'
## Summary

Tightens the ds-client-migration harness before Phase 3. Locked through grill-me on 2026-04-25.

## Changes

**Agents:**
- `ds-client-review` reads `DS_CLIENT_USAGE.md` itself (dropped caller paste, ~3K tokens/round saved)
- New `toss-fe-review` agent — per-task code-quality review (4 axes, BLOCK/SUGGEST/INFO severity)

**Skills:**
- `ds-client-constrained-execution` — wires `toss-fe-review` between `ds-client-review` and typecheck (both NO-TDD + TDD flows). Trim from 216 → ~140 lines.
- New `review-ui-on-browser` — standalone manual skill, Playwright CLI, for visual UI review on running dev server. Not wired into autonomous routine (Vercel free-tier + auth constraints).

**Docs:**
- `DS_CLIENT_USAGE.md` restructured into Part 1 (write-time decision tree, available DS surface, tier picker, "what to use" rules, visibility/hierarchy rules absorbed from MEMORY) + Part 2 (full review-time rulebook with G1–G5 from Phase 2 evidence)
- `DS_CODEBASE.md` — implementer pointer note redirects to DS_CLIENT_USAGE.md
- `implementer-template.md` — pre-flight tier-justification checklist before "Your Job"
- `HARNESS_DESIGN.md` + `AUTONOMOUS_PROTOCOL.md` — consult-on-demand banners; AP §15 registers new agent + skill
- `CLAUDE.md` — preflight trimmed to TODO + symlink check + inlined mode-detection table; HARNESS / AP / DS_CODEBASE moved to lazy-load per mode

## Test plan

- [x] `pnpm build` green (DS-side)
- [x] `pnpm typecheck` green (DS-side)
- [x] `DS_CLIENT_USAGE.md` has Part 1 / Part 2 structure
- [x] All seven referenced files exist after merge
- [ ] Phase 3 audit (Mode A) is the first session that exercises the new preflight — sanity-check on next cold session
- [ ] First Phase 3 lane that touches a `.tsx` exercises the new toss-fe-review per-task flow — verify behavior on the first run
EOF
)"
```

Return the PR URL.

### Acceptance criteria
- All seven artifacts confirmed present
- DS_CLIENT_USAGE.md has Part 1 + Part 2
- Build + typecheck green
- PR opened against `main`

---

## Notes for executor

- Work in the worktree at `/Users/jiohin/Desktop/KISA/DevTeam/dev/umichkisa-ds`
- All commits use HEREDOC-style messages (per project convention)
- Phases 3, 4, 5, 6 are parallelizable — dispatch concurrently if executing via `superpowers:subagent-driven-development`. Phases 7, 8, 9, 10 are gating in that order (8 + 9 may parallel, but both must finish before 10).
- This PR has zero code changes — only docs / skills / agents. No tests required.
- Avoid scope creep: do NOT also rewrite the Korean `toss-frontend-fundamentals` skill (the new `toss-fe-review` agent stands alone, fresh English prompt). Do NOT modify any client-side files.
