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

### Sidebar Categories (defined in apps/docs/components/Sidebar.tsx)

| Order | Category     | Components (alphabetical within)                                                  |
|-------|-------------|-----------------------------------------------------------------------------------|
| 1     | Icon        | Icon                                                                              |
| 2     | Buttons     | Button, IconButton, LinkButton                                                    |
| 3     | Layout      | Container, Divider, Grid                                                          |
| 4     | Forms       | Forms Overview (always first), Checkbox, FormItem, Input, Label, Radio, Select, Switch, Textarea |
| 5     | Data Display | Accordion, Avatar, Badge, Card, Table                                             |
| 6     | Navigation  | Pagination, Tabs                                                                  |
| 7     | Overlays    | Dialog, Dropdown, Popover, Tooltip                                                |
| 8     | Feedback    | Alert, LoadingSpinner, Skeleton, Toast                                            |
| 9     | Utilities   | NotFound/NotAuthorized/NotLogin/UnexpectedError, OnlyMobileView, ToggleBar, UnderConstruction |
| 10    | Date & Time | Calendar, DatePicker                                                              |

Only show categories with ≥1 shipped component. When a batch ships a component that creates a new category, add the category to `COMPONENT_CATEGORIES` in Sidebar.tsx.

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
- [x] Reorganize all form component docs pages in the design doc app
- [x] Add official form demo page to docs app (replace /test/form with a proper docs page)

### Batch 6.6 — Docs pages consistency refactor
- [x] Convert foundation MDX content to inline TSX with DS type tokens (18 pages)
- [x] Replace article wrappers with `<Container size="md" as="article">` (36 pages)
- [x] Standardize API Reference tables to Container page pattern (15 pages)
- [x] Remove MDX infrastructure (packages, config, content files)

### Batch 7 — Overlays
- [x] Tooltip (new)
- [x] Popover (audit)
- [x] Dropdown (audit)

### Batch 8 — Overlays cont'd + navigation
- [x] Dialog (audit)
- [x] Tabs (new)

### Batch 9 — Feedback
- [x] Skeleton (new)
- [x] LoadingSpinner (audit)
- [x] Alert (new)

### Batch 10 — Feedback cont'd
- [ ] Toast (new)
- [ ] NotFound / NotAuthorized / NotLogin / UnexpectedError (audit, 4-in-1)

### Batch 10.5 — Form DX package
- [ ] `@umichkisa-ds/form` — custom hooks for validation, form submission, and form state management (pair with `@umichkisa-ds/web` form components)

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

### Batch 14 — Date & Time
- [ ] Calendar (new)
- [ ] DatePicker (new, depends: Calendar)

### Post-v1.0
- [ ] Docs app Header & Sidebar redesign
- [ ] Fill in index pages (/components, /foundation, etc.)
- [ ] Label component — add `id` prop support for `aria-labelledby` patterns
- [ ] CodeBlock component — syntax-highlighted code blocks for docs (replace raw `<pre><code>`)
