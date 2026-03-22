# Spec: Step 2+3 — Icon Docs Page + ComponentPreview Primitive

## Goal

Build the `/components/icon` docs page — the canonical reference for how to use
the `<Icon>` component from `@umichkisa-ds/web`. As a side effect, establish the
`<ComponentPreview>` primitive that every future component docs page will use.

---

## Scope

### In scope
- `apps/docs/app/components/icon/page.tsx` — new icon component docs page
- `apps/docs/components/SizesExample.tsx` — interactive size toggle (client component)
- `apps/docs/components/ComponentPreview.tsx` — stacked preview+code primitive
- `apps/docs/content/_components_to_switch.md` — tracking doc for future DS component replacements

### Out of scope
- `apps/docs/content/foundation/iconography/` — library.mdx stays text-only; no icon grid
- `apps/docs/components/Sidebar.tsx` — already has the Icon entry
- `apps/docs/mdx-components.tsx` — ComponentPreview is used in .tsx pages only, not MDX
- `packages/web/` — no changes to the component package itself

---

## Decisions

| # | Decision |
|---|---|
| 1 | Steps 2 and 3 are merged into one |
| 2 | No iframe isolation — docs app and web package share the same token layer |
| 3 | Component pages are pure `.tsx`, not `.mdx` |
| 4 | `ComponentPreview` uses a stacked layout: preview pane on top, code block below (no tabs) |
| 5 | Stacked layout is a placeholder — tracked in `_components_to_switch.md` for Tabs replacement |
| 6 | No Installation/Import section — code snippets in each example already show the import |
| 7 | Size toggle is a raw client component — tracked for future DS SegmentedControl replacement |
| 8 | Code blocks use plain `<pre><code>` — no Shiki; tracked for future upgrade |
| 9 | `page.tsx` is a server component; interactive parts extracted to `apps/docs/components/` |
| 10 | All docs app components live flat in `apps/docs/components/` — no subfolders |
| 11 | Page max-width: `max-w-3xl` inside `article` |

---

## File Map

```
apps/docs/
├── app/components/icon/page.tsx          ← new: icon docs page
├── components/
│   ├── ComponentPreview.tsx              ← new: shared preview+code primitive
│   └── SizesExample.tsx                  ← new: interactive size toggle
└── content/_components_to_switch.md      ← new: future replacement tracking
```

---

## Page: `/components/icon`

Server component. Layout: `<article className="mx-auto max-w-3xl px-6 py-12 min-w-0 overflow-hidden">`.

### Section order

```
# Icon
[description]

## Examples
### Default          — arrow-right, no props
### Sizes            — arrow-right, SizesExample interactive toggle
### Color            — plus icon, three colored wrappers (default / brand-primary / error)
### With a label     — thumbs-up, decorative vs labeled variants
### Inside a button  — trash-2, button wrapper with aria-label + 44×44px target

## API Reference
[props table: name, size, label, className]
```

Note: `label` prop sets `aria-label` only — does **not** set `role="img"`. Document real behavior.

---

## Component: `<ComponentPreview>`

Props: `{ children: React.ReactNode, code: string }`

Stacked layout: bordered preview pane (`bg-surface`, rounded-t) above a code block (`bg-surface-subtle`, rounded-b, border-t-0). All colors via DS token classes. No copy button — tracked in `_components_to_switch.md`.

---

## Component: `SizesExample`

`'use client'`. State: `size` (`'xs'|'sm'|'md'|'lg'|'xl'`, default `'md'`).

Renders: row of five toggle buttons (active: `bg-brand-primary text-brand-foreground`; inactive: `bg-surface-subtle text-muted-foreground`) + size reference line + `<ComponentPreview>` with `<Icon name="arrow-right" size={size} />`.

---

## Implementation Plan

See `docs/plans/2026-03-22-icon-docs-page.md` for task-by-task steps with full code.

> **For Claude:** Use the `ds-constrained-execution` skill. It replaces `superpowers:executing-plans` for all KISA DS work — after each task that creates or modifies `.tsx` files, a DS constraint review subagent checks the output against `docs/DS_CONSTRAINTS.md` before proceeding.

---

## Last Session [2026-03-22]
Task: Step 2+3 — Icon Docs Page + ComponentPreview Primitive
Done: Wrote `ds-constrained-execution` skill + `ds-review` subagent; updated this spec and plan to reference the skill. Implementation plan is at `docs/plans/2026-03-22-icon-docs-page.md`.
Last file: `.claude/skills/ds-constrained-execution/SKILL.md`, `.claude/agents/ds-review.md`
Next action: Invoke `ds-constrained-execution` skill and execute the implementation plan task-by-task starting from Task 1.
Blockers: none

---

## Session End Checklist

1. `pnpm build` passes
2. `pnpm typecheck` passes
3. `/components/icon` renders with all five example sections visible
4. Size toggle is interactive — preview and code snippet both update
5. `apps/docs/content/_components_to_switch.md` exists with all four entries
6. `apps/docs/components/ComponentPreview.tsx` exists
7. `apps/docs/components/SizesExample.tsx` exists
8. Update `docs/CODEBASE.md` status tables
9. Check off Step 2+3 in `docs/TODO.md`
