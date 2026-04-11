# Required-Prop Asterisk Sweep — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Standardize the required-prop convention across all API Reference tables — asterisk on prop name with `aria-label="required"`, caption below tables, old `(required)` pattern removed.

**Architecture:** Mechanical sweep across ~36 component pages and ~3 forms pages. Each page gets the same transformation: find props that are required per TypeScript types, wrap the `*` in a `<span aria-label="required">`, add `* Required prop.` caption. One DS_CONSTRAINTS.md rule addition.

**Tech Stack:** Next.js TSX pages, `@umichkisa-ds/web` Table components, InlineCode docs component.

---

## Reference Pattern

**Desktop Table (inside `<InlineCode>`):**
```tsx
<TableCell><InlineCode>propName<span aria-label="required">*</span></InlineCode></TableCell>
```

**Mobile TableMobileList (inside `<strong>`):**
```tsx
<span className="type-body-sm text-foreground"><strong>propName<span aria-label="required">*</span></strong></span>
```

**Caption (after each Table and TableMobileList that contains required props):**
```tsx
<p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
```

**When a page has `(required)` in the Default column**, replace it with `—` and move the marking to the prop name instead.

---

## Required Props by Component (from TypeScript audit)

| Component | Required Props |
|-----------|---------------|
| AccordionItem | `value` |
| DropdownItem | `children` |
| DropdownGroup | `label`, `children` |
| FormItem | `htmlFor`, `label` |
| Icon | `name` |
| IconButton | `icon`, `aria-label` |
| Label | `htmlFor`, `children` (already marked) |
| Pagination | `page`, `totalPages`, `onPageChange` |
| RadioItem | `value`, `text` |
| SelectItem | `value`, `children` |
| SelectGroup | `label`, `children` |
| StatusView | `variant` |
| TabsTrigger | `value` |
| TabsContent | `value` |
| ToggleGroup | `value`, `onValueChange`, `items` |
| Tooltip | `content`, `children` |
| Form (FormRoot) | `form`, `onSubmit` |
| Form.* fields | `name`, `label` (already marked on form-component page) |

> **Note:** Only mark props that are already listed in the page's API table. If a required prop like `children` isn't in the table, don't add it — this sweep standardizes existing table content, not adds new rows.

---

## Task 1: Update DS_CONSTRAINTS.md

**Files:**
- Modify: `docs/DS_CONSTRAINTS.md`

**Step 1:** Add the following rule under a new `### API Reference Tables` heading (place it after the existing docs constraints section, or at the end):

```markdown
### API Reference Tables

Must: Required props (no `?` in TypeScript type, no default value) use an asterisk appended to the prop name — never `(required)` in the Default column. Pattern: `<InlineCode>propName<span aria-label="required">*</span></InlineCode>` (desktop) and `<strong>propName<span aria-label="required">*</span></strong>` (mobile). Default column shows `—` for required props. [source:required-prop-sweep/2026-04-11]
Must: Tables containing required props must have a `<p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>` caption after both the desktop Table and mobile TableMobileList. Omit when no props are required. [source:required-prop-sweep/2026-04-11]
```

**Step 2:** Commit.

```bash
git add docs/DS_CONSTRAINTS.md
git commit -m "docs: add required-prop asterisk convention to DS_CONSTRAINTS"
```

---

## Task 2: Update existing pages — Label + Form Component (aria-label fix)

These pages already have the asterisk pattern but lack `aria-label="required"` on the `*`.

**Files:**
- Modify: `apps/docs/app/components/label/page.tsx`
- Modify: `apps/docs/app/forms/form-component/page.tsx`

**Step 1:** In `label/page.tsx`, replace every `htmlFor*` and `children*` occurrence:

Desktop — change:
```tsx
<InlineCode>htmlFor*</InlineCode>
```
to:
```tsx
<InlineCode>htmlFor<span aria-label="required">*</span></InlineCode>
```

Mobile — change:
```tsx
<strong>htmlFor*</strong>
```
to:
```tsx
<strong>htmlFor<span aria-label="required">*</span></strong>
```

Same for `children*`.

**Step 2:** In `form-component/page.tsx`, same transformation for `name*` and `label*`.

**Step 3:** Commit.

```bash
git add apps/docs/app/components/label/page.tsx apps/docs/app/forms/form-component/page.tsx
git commit -m "fix(docs): add aria-label to existing required-prop asterisks"
```

---

## Task 3: Convert Select + Dropdown (remove `(required)` pattern)

**Files:**
- Modify: `apps/docs/app/components/select/page.tsx`
- Modify: `apps/docs/app/components/dropdown/page.tsx`

**Step 1:** In `select/page.tsx`:
- Find `SelectItem` table rows — `value` and `children` props are required
- Find `SelectGroup` table rows — `label` and `children` props are required
- For each: add `<span aria-label="required">*</span>` to the prop name
- Replace `<InlineCode>(required)</InlineCode>` in Default column with `—`
- Replace `<span className="type-caption text-muted-foreground">Required</span>` in mobile with the standard mobile default format or remove the line
- Add `* Required prop.` caption after each table/mobile-list that has required props

**Step 2:** In `dropdown/page.tsx`:
- Find `DropdownItem` table rows — `children` is required
- Find `DropdownGroup` table rows — `label` and `children` are required
- Same transformation: asterisk on prop name, `—` in Default, caption added
- Replace `<InlineCode>(required)</InlineCode>` in Default column with `—`

**Step 3:** Verify by reading the modified files.

**Step 4:** Commit.

```bash
git add apps/docs/app/components/select/page.tsx apps/docs/app/components/dropdown/page.tsx
git commit -m "fix(docs): convert select/dropdown from (required) to asterisk convention"
```

---

## Task 4: Add required-prop marking — Accordion, FormItem, Icon, IconButton

**Files:**
- Modify: `apps/docs/app/components/accordion/page.tsx`
- Modify: `apps/docs/app/components/form-item/page.tsx`
- Modify: `apps/docs/app/components/icon/page.tsx`
- Modify: `apps/docs/app/components/icon-button/page.tsx`

**Step 1:** For each file, read the API Reference section. Find rows matching the required props:
- **accordion**: AccordionItem → `value`
- **form-item**: FormItem → `htmlFor`, `label`
- **icon**: Icon → `name`
- **icon-button**: IconButton → `icon`, `aria-label`

**Step 2:** For each matching prop row in both desktop Table and mobile TableMobileList:
- Desktop: `<InlineCode>propName</InlineCode>` → `<InlineCode>propName<span aria-label="required">*</span></InlineCode>`
- Mobile: `<strong>propName</strong>` → `<strong>propName<span aria-label="required">*</span></strong>`

**Step 3:** Add caption after each table/mobile-list section that gained required markers:
```tsx
<p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
```

**Step 4:** Commit.

```bash
git add apps/docs/app/components/accordion/page.tsx apps/docs/app/components/form-item/page.tsx apps/docs/app/components/icon/page.tsx apps/docs/app/components/icon-button/page.tsx
git commit -m "fix(docs): add required-prop asterisks to accordion, form-item, icon, icon-button"
```

---

## Task 5: Add required-prop marking — Pagination, Radio, StatusView

**Files:**
- Modify: `apps/docs/app/components/pagination/page.tsx`
- Modify: `apps/docs/app/components/radio/page.tsx`
- Modify: `apps/docs/app/components/status-view/page.tsx`

**Step 1:** Read each file's API Reference section. Required props:
- **pagination**: `page`, `totalPages`, `onPageChange`
- **radio**: RadioItem → `value`, `text`
- **status-view**: `variant`

**Step 2:** Apply the asterisk pattern to matching rows (desktop + mobile). Add caption.

**Step 3:** Commit.

```bash
git add apps/docs/app/components/pagination/page.tsx apps/docs/app/components/radio/page.tsx apps/docs/app/components/status-view/page.tsx
git commit -m "fix(docs): add required-prop asterisks to pagination, radio, status-view"
```

---

## Task 6: Add required-prop marking — Tabs, ToggleGroup, Tooltip

**Files:**
- Modify: `apps/docs/app/components/tabs/page.tsx`
- Modify: `apps/docs/app/components/toggle-group/page.tsx`
- Modify: `apps/docs/app/components/tooltip/page.tsx`

**Step 1:** Read each file's API Reference section. Required props:
- **tabs**: TabsTrigger → `value`; TabsContent → `value`
- **toggle-group**: `value`, `onValueChange`, `items`
- **tooltip**: `content`, `children`

**Step 2:** Apply the asterisk pattern to matching rows (desktop + mobile). Add caption.

**Step 3:** Commit.

```bash
git add apps/docs/app/components/tabs/page.tsx apps/docs/app/components/toggle-group/page.tsx apps/docs/app/components/tooltip/page.tsx
git commit -m "fix(docs): add required-prop asterisks to tabs, toggle-group, tooltip"
```

---

## Task 7: Forms pages — hooks, use-form, validation

**Files:**
- Modify: `apps/docs/app/forms/use-form/page.tsx` (if Form's `form`/`onSubmit` are documented here)
- Check: `apps/docs/app/forms/hooks/page.tsx`

**Step 1:** Read each forms page. Check if any API tables list props that are required per TypeScript. The Form root component (`form`, `onSubmit`) may be documented on either form-component (already done) or use-form.

**Step 2:** Apply asterisk pattern to any required props found. Add caption.

**Step 3:** If no required props found in these pages, skip — no changes needed.

**Step 4:** Commit (if changes were made).

```bash
git add apps/docs/app/forms/
git commit -m "fix(docs): add required-prop asterisks to forms pages"
```

---

## Task 8: Build verification + TODO update

**Step 1:** Run build and typecheck.

```bash
pnpm build && pnpm typecheck
```

Both must pass.

**Step 2:** Update `docs/CODEBASE.md` if needed.

**Step 3:** Check off the item in `docs/TODO.md`:
```markdown
- [x] Standardize API Reference required-prop convention → asterisk.
```

**Step 4:** Commit.

```bash
git add docs/TODO.md docs/CODEBASE.md
git commit -m "chore(docs): mark required-prop asterisk sweep complete"
```
