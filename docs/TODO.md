# TODO

## Bootstrapping
- [x] Step -1 — DS Documentation Review
- [x] Step 0 — Token & Styles Audit
- [x] Step 0.5 — Docs App Token Alignment (migrate globals.css + docs components to use DS token layer fully; fix font injection gap)
- [x] Step 1 — Icon Implementation
- [x] Step 2+3 — Icon Docs Page + ComponentPreview Primitive
- [x] Step 4 — Component Skill

## Components (spec: docs/specs/component.md)

Each batch runs 2-3 parallel worktree sessions. Complete all items in a batch before starting the next.
Use `new-component-workflow` skill for each component. Type: `audit` = existing code needs review, `new` = build from scratch.

**Session startup:** When a batch is the next task, ask the user which component from that batch they want to work on in THIS session. Do not assume — the user may be running multiple sessions in parallel.

- [x] Icon

### Batch 1 — Foundations
- [x] Button (audit)
- [x] Divider (audit) — includes HorizontalDivider + VerticalDivider

### Batch 2 — Button family + Badge
- [x] IconButton (audit, depends: Button)
- [x] LinkButton (audit, depends: Button)
- [x] Badge (new)

### Batch 3 — Form foundations
- [x] Label (audit)
- [x] Input (audit)

### Batch 4 — Form controls
- [x] Textarea (new)
- [x] Checkbox (new)
- [x] Select (new)

### Batch 5 — Form controls cont'd
- [x] Radio (new)
- [x] Switch (new)
- [x] FormItem (audit, depends: Label + Input)

### Batch 5.5 - Form UI Design Review
- [x] Form UI design review — brand colors on toggles, `text` prop standardization, Select brand treatment, docs updates, DS_CONSTRAINTS updates

### Batch 6 — Layout + display
- [x] Container (new)
- [x] Grid (new)
- [x] Avatar (new)

### Batch 6.5 — Form docs reorganization + demo page
- [ ] Reorganize all form component docs pages in the design doc app
- [ ] Add official form demo page to docs app (replace /test/form with a proper docs page)

### Batch 6.6 — Docs pages Container refactor
- [ ] Replace `<article className="mx-auto max-w-3xl px-6 py-12 ...">` wrapper on all docs pages with `<Container>` component

### Batch 7 — Overlays
- [ ] Tooltip (new)
- [ ] Popover (audit)
- [ ] Dropdown (audit)

### Batch 8 — Overlays cont'd + navigation
- [ ] Dialog (audit)
- [ ] Tabs (new)

### Batch 9 — Feedback
- [ ] Skeleton (new)
- [ ] LoadingSpinner (audit)
- [ ] Alert (new)

### Batch 10 — Feedback cont'd
- [ ] Toast (new)
- [ ] NotFound / NotAuthorized / NotLogin / UnexpectedError (audit, 4-in-1)

### Batch 11 — Complex components
- [ ] Card (new)
- [ ] Accordion (new)

### Batch 12 — Data display
- [ ] Pagination (new)
- [ ] Table (new)

### Batch 13 — Standalone utilities
- [ ] ToggleBar (audit)
- [ ] OnlyMobileView (new)
- [ ] UnderConstruction (new)

### Batch 14 — Deferred (v1.1)
- [ ] Calendar (new)
- [ ] DatePicker (new, depends: Calendar)

### Post-v1.0
- [ ] Form DX — custom hooks (useFormField, etc.) + form building guideline doc
- [ ] Toggle checked state variant — navy + white (alternative to navy + maize for small-scale indicators)
- [ ] Label component — add `id` prop support for `aria-labelledby` patterns
