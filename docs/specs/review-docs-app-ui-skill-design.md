# review-docs-app-ui — Skill Design Spec

_The repeatable workflow for reviewing each docs page in the design system._
_Referenced by `docs/TODO.md` § Docs App Review._

---

## Review Skill: `review-docs-app-ui`

- One invocation = one page, both viewports (1280px desktop, 375px mobile)
- Document-only — no fixes during review
- Findings recorded in `docs/reviews/docs-app-review.md` (single file, section per page)
- Screenshots at `docs/reviews/screenshots/<page>-<n>.png`
- Fix plan output at `docs/plans/review-fix-<page-name>.md` (one per page)
- If zero findings, check both review and fix boxes in TODO
- Ends with handoff: option to fix in same session or copy-paste prompt for fresh session

## Finding Format

### Severity

| Level | Definition |
|-------|-----------|
| **critical** | Visually broken, unreadable, or misleading. User cannot understand or use the page correctly. (e.g., overlapping elements, invisible text, completely wrong information) |
| **major** | Noticeably wrong but still functional. User can work around it. (e.g., wrong token usage, inconsistent spacing, unclear explanation of an important concept) |
| **minor** | Polish-level. Wouldn't confuse anyone but doesn't meet our quality bar. (e.g., slightly awkward wording, extra whitespace, could-be-better alignment) |

- Any `DS_CONSTRAINTS.md` violation is automatically **≥ major**.

### Types

| Type | Description |
|------|-------------|
| `layout` | Broken grid, overflow, wrong width, misaligned elements (within a single viewport) |
| `styling` | Wrong colors, fonts, spacing, borders, shadows |
| `ds-violation` | Violates a rule in `DS_CONSTRAINTS.md` |
| `content` | Typos, unclear writing, missing/wrong information |
| `ux` | Confusing interaction, poor navigation, missing affordance |
| `accessibility` | Missing alt text, contrast issues, keyboard nav problems |
| `responsive` | Works in one viewport but breaks in another — clamping, overflow, missing breakpoint handling |

### Viewport Tag

Each finding is tagged: `desktop`, `mobile`, or `both`.

### Table Format

```markdown
## /foundation/colors/overview

| # | Severity | Type | Viewport | Finding | Screenshot |
|---|----------|------|----------|---------|------------|
| 1 | major | ds-violation | desktop | ... | [screenshot](screenshots/colors-overview-1.png) |
| 2 | minor | content | both | ... | — |

**Notes:** (optional — broader observations, patterns, or suggestions that don't fit a single row)
```

## Review Workflow Per Page

1. Navigate to the page at **1280px** width
2. Screenshot full page — scroll top to bottom, capture as we go
3. Review desktop — identify findings (collaborative, one by one)
4. Resize to **375px**
5. Screenshot full page at mobile
6. Review mobile — identify findings
7. Record all findings into the review doc
8. Invoke `superpowers:writing-plans` to produce a fix plan at `docs/plans/review-fix-<page-name>.md`
9. If zero findings, check both review and fix boxes in TODO
10. Present handoff:
    > Review complete. Fix plan saved at `docs/plans/review-fix-<page-name>.md`.
    > (a) Continue in this session — invoke `ds-constrained-execution` to implement fixes
    > (b) Fresh session — here's the prompt to copy-paste:
    > ```
    > Execute the fix plan at docs/plans/review-fix-<page-name>.md using ds-constrained-execution. Read docs/DS_CONSTRAINTS.md first.
    > ```

## Artifacts

| Artifact | Path | Cardinality |
|----------|------|-------------|
| Review findings | `docs/reviews/docs-app-review.md` | Single file, one section per page |
| Screenshots | `docs/reviews/screenshots/<page>-<n>.png` | Per finding |
| Fix plan | `docs/plans/review-fix-<page-name>.md` | One per page |

## TODO Structure

Each page has two checkboxes in `docs/TODO.md`:

```markdown
- [ ] Review `/foundation/colors/overview`
- [ ] Fix `/foundation/colors/overview`
```

- Pre-populated upfront for all pages
- Review checkbox checked when review session completes
- Fix checkbox checked when fix plan is executed and verified
- If zero findings, both are checked by the review skill

## Session Trigger

1. User opens a new session, says "pick up the task"
2. Read `docs/TODO.md`, find the next unchecked batch
3. Present available tasks in that batch (mix of review and fix tasks)
4. User picks one
5. Invoke `review-docs-app-ui` for review tasks, or `ds-constrained-execution` for fix tasks

## Batch List

Batches are grouped 3–4 pages each, for human cognitive load. Cross-section merging is fine.

**Batch 1** — Colors
- `/foundation/colors/overview`
- `/foundation/colors/primitives`
- `/foundation/colors/tokens`

**Batch 2** — Colors + Typography
- `/foundation/colors/usage`
- `/foundation/colors/accessibility`
- `/foundation/typography/overview`

**Batch 3** — Typography + Layout
- `/foundation/typography/scale`
- `/foundation/typography/fonts`
- `/foundation/typography/usage`
- `/foundation/layout/overview`

**Batch 4** — Layout
- `/foundation/layout/spacing`
- `/foundation/layout/breakpoints`
- `/foundation/layout/usage`

**Batch 5** — Iconography
- `/foundation/iconography/overview`
- `/foundation/iconography/sizes`
- `/foundation/iconography/library`

**Batch 6** — Iconography
- `/foundation/iconography/usage`
- `/foundation/iconography/accessibility`
- `/components/badge`

**Batch 7** — Components
- `/components/button`
- `/components/icon-button`
- `/components/link-button`

**Batch 8** — Components
- `/components/icon`
- `/components/avatar`
- `/components/skeleton`
- `/components/loading-spinner`

**Batch 9** — Components
- `/components/alert`
- `/components/status-view`
- `/components/divider`

**Batch 10** — Components
- `/components/accordion`
- `/components/tabs`
- `/components/tooltip`
- `/components/popover`

**Batch 11** — Components
- `/components/dropdown`
- `/components/dialog`
- `/components/toast`

**Batch 12** — Components
- `/components/container`
- `/components/grid`
- `/components/card`
- `/components/table`

**Batch 13** — Components (Form Controls)
- `/components/input`
- `/components/textarea`
- `/components/select`
- `/components/label`

**Batch 14** — Components (Form Controls)
- `/components/checkbox`
- `/components/radio`
- `/components/switch`
- `/components/form-item`

**Batch 15** — Components
- `/components/toggle-group`
- `/components/pagination`
- `/components/calendar`
- `/components/datepicker`

**Batch 16** — Components
- `/components/only-mobile-view`
- `/components/forms` (forms landing)

**Batch 17** — Forms
- `/forms/overview`
- `/forms/form-component`
- `/forms/use-form`

**Batch 18** — Forms
- `/forms/hooks`
- `/forms/validation`
- `/forms/examples`

**Final Batch** — Index Pages (deferred until all content pages are reviewed)
- `/`
- `/foundation`
- `/components`

## Viewports

| Viewport | Width | Breakpoint Tier |
|----------|-------|----------------|
| Desktop | 1280px | `lg:` (≥ 1024px) |
| Mobile | 375px | default (< 768px) |

## Skills Referenced

| Step | Skill |
|------|-------|
| Review | `review-docs-app-ui` |
| Fix planning | `superpowers:writing-plans` |
| Fix execution | `ds-constrained-execution` |
| DS review gate | `ds-review` (invoked by ds-constrained-execution) |
