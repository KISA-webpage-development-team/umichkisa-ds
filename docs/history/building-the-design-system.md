# Building umichkisa-ds from Scratch

A retrospective on how I built KISA's design system — 38 components, 2 packages,
62+ docs pages, and a full form DX layer — in 3 weeks using Claude Code.

## Context

I'm a UMich CS student currently serving mandatory military service in the Korean Army.
I don't have a local dev environment — everything runs through a VSCode tunnel from my
Mac at home, accessed via a browser in the unit's computer room.

KISA (Korean International Students Association at UMich) had a growing Next.js website
with UI components scattered across the client codebase. No design system, no shared
tokens, no documentation. I wanted to build one properly — not just extract components,
but create a token-driven, constraint-enforced, fully documented system.

The catch: limited screen time (development happened during off-duty hours around
military service), no pair programming, and I needed to move fast.

## Timeline

- **Total duration:** ~3 weeks of off-duty hours (2026-03-14 → 2026-04-05)
- **Active development days:** 11
- **Total commits:** 497
- **Components shipped:** 38
- **Docs pages:** 62+
- **Packages:** 2 (`@umichkisa-ds/web`, `@umichkisa-ds/form`)

## Phase 1 — Bootstrapping (Day 1)

Everything started on 2026-03-14 with `chore: initialize umichkisa-ds package`.

In a single day, I set up:
- Monorepo structure (pnpm workspaces + Turborepo)
- Build pipeline (tsup → ESM + CJS + types)
- Tailwind v4 CSS-first token system (OKLCH primitives → semantic → component)
- Initial component ports from the client app (Button, Input, Label, Dividers, etc.)
- v0.1.0 dist build

This was raw scaffolding — components were copied over without a formal process.

## Phase 2 — Building the Workflow (Days 2–4)

Before touching more components, I invested in process. This turned out to be the
highest-leverage work of the entire project.

### DS Documentation Review
I wrote `DS_CONSTRAINTS.md` — a living constraint document covering colors, typography,
layout, iconography, accessibility, and form controls. Every component would be built
and reviewed against these rules.

### Token & Styles Audit
Audited the token layer to ensure the three-tier model (primitives → semantic → component)
was correctly wired through Tailwind v4's `@theme` system.

### Docs App Setup
Stood up a Next.js 15 App Router docs site within the monorepo. Foundation pages
(colors, typography, layout, iconography) were written first to validate the token system.

### The `new-component-workflow` Skill
This was the key innovation. I created a Claude Code skill that orchestrates an
**8-step lifecycle** for every component:

| Step | What | How |
|------|------|-----|
| 0 | Worktree setup | `superpowers:using-git-worktrees` — isolated branch per component |
| 1 | Design interrogation | `grill-me` — resolve API surface, variants, edge cases |
| 2 | Write plan | `superpowers:writing-plans` — Phase 1 (impl) + Phase 2 (docs) |
| 3 | Implement component | `ds-constrained-execution` — build with constraint gates |
| 4 | Implement docs page | `ds-constrained-execution` — same gates for docs |
| 5 | Validate | `pnpm typecheck && pnpm build` |
| 6 | Docs quality review | `junhee` agent — reviews from a new team member's perspective |
| 7 | Merge | Merge worktree branch to main, rebuild dist |
| 8 | Update tracking | TODO.md, CODEBASE.md |

### The `ds-constrained-execution` Skill
I built this on top of the Superpowers plugin. It wraps plan execution with a mandatory
**DS constraint review gate**:

1. Dispatch an implementer agent for a single task
2. If the task touches `.tsx` files → auto-run `ds-review` agent
3. If violations found → re-dispatch with violation context (max 2 rounds)
4. If still failing after round 2 → **hard stop**, escalate to me
5. Only after DS review passes → typecheck + commit

This meant every line of TSX was checked against `DS_CONSTRAINTS.md` before it could
land. The constraint document grew alongside the components — each batch taught us new
rules.

## Phase 3 — Component Batches (Days 4–11)

With the workflow locked in, I ran **parallel agent sessions** — multiple Claude Code
instances, each in its own git worktree, building different components simultaneously.

### Batch structure
Components were organized into 14 batches by dependency order:

1. **Foundations** — Button, Divider
2. **Button family + Badge** — IconButton, LinkButton, Badge
3. **Form foundations** — Label, Input
4. **Form controls** — Textarea, Checkbox, Select
5. **Form controls cont'd** — Radio, Switch, FormItem
6. **Layout + display** — Container, Grid, Avatar
7. **Overlays** — Tooltip, Popover, Dropdown
8. **Overlays cont'd + nav** — Dialog, Tabs
9. **Feedback** — Skeleton, LoadingSpinner, Alert
10. **Feedback cont'd** — Toast, StatusView (4-in-1 consolidation)
11. **Complex components** — Card, Accordion
12. **Data display** — Pagination, Table
13. **Standalone utilities** — ToggleGroup, OnlyMobileView
14. **Date & Time** — Calendar, DatePicker

Each batch ran 2–3 components in parallel worktree sessions. I'd assign a component to
a session ("work on Button"), the `new-component-workflow` skill would take over, and
I'd switch to another terminal to start the next one.

### Mid-stream investments
Between batches, I paused for cross-cutting work:
- **Batch 5.5** — Form UI design review (brand colors on toggles, `text` prop standardization)
- **Batch 6.5** — Form docs reorganization + official demo page
- **Batch 6.6** — Docs consistency refactor (converted 18 MDX pages to TSX, standardized 36 pages)
- **Batch 10.5** — `@umichkisa-ds/form` package (hooks + compound components wrapping react-hook-form)

## What Made It Work

### 1. Process before code
Investing days 2–4 in workflow skills before writing a single component paid off
exponentially. The `new-component-workflow` reduced each component to a predictable
8-step pipeline.

### 2. Constraints as code review
`DS_CONSTRAINTS.md` + `ds-constrained-execution` meant every component was automatically
reviewed against the design system's rules. No manual review needed — the constraint
gate caught violations before they could land.

### 3. Parallel worktrees
Git worktrees let me run multiple agent sessions without branch conflicts. Each
component lived in its own `component/<name>` branch, merged to main only after
validation.

### 4. Grill-me before planning
Every component started with a `grill-me` session — an adversarial design interview
that resolved API decisions, edge cases, and constraint implications before any code
was written. This eliminated most rework.

### 5. The right level of automation
The skills weren't fully autonomous — every step had a checkpoint requiring my explicit
confirmation. This kept me in the loop for design decisions while automating the
mechanical parts (file creation, constraint checking, docs scaffolding).

## By the Numbers

| Metric | Value |
|--------|-------|
| Duration | ~3 weeks (off-duty hours only) |
| Active dev days | 11 |
| Commits | 497 |
| Components | 38 |
| Docs pages | 62+ |
| Packages | 2 |
| DS constraint rules | ~120 |
| Custom skills | 2 (new-component-workflow, ds-constrained-execution) |
| Custom agents | 2 (ds-review, junhee) |
| Batches | 14 + 4 mid-stream |
