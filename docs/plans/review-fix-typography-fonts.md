# Typography Fonts — Fix Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix 8 review findings on `/foundation/typography/fonts` — migrate raw specimen cards to DS Card, raw tables to DS Table with mobile list view, raw blockquote to Alert, fix raw hex colors, fix raw typography utilities, remove redundant content, add Korean specimen text, and add responsive font sizing.

**Architecture:** Single-file edit (`apps/docs/app/foundation/typography/fonts/page.tsx`). Import DS components (`Card`, `CardContent`, `CardFooter`, `Alert`, `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableMobileList`, `TableMobileItem`) from `@umichkisa-ds/web`. Follow established patterns from `colors/tokens/page.tsx` for table migration and `colors/overview/page.tsx` for Alert migration.

**Tech Stack:** React, Tailwind v4, `@umichkisa-ds/web` components

**Reference:** Review findings at `docs/reviews/docs-app-review.md` § `/foundation/typography/fonts`

---

### Task 1: Migrate 3 raw HTML tables to DS Table + TableMobileList (Finding #5)

**Files:**
- Modify: `apps/docs/app/foundation/typography/fonts/page.tsx`

**What to change:**

Add imports at top of file:
```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableMobileList, TableMobileItem } from '@umichkisa-ds/web'
```

There are 3 tables on this page:
1. **SejongHospital weights** (lines 28-53) — 2 rows: Light 300, Bold 700
2. **Pretendard weights** (lines 105-138) — 3 rows: Regular 400, Medium 500, Semibold 600
3. **Geist Mono weight** (lines 178-197) — 1 row: Regular 400

For each table, replace the raw `<div className="my-6 overflow-x-auto"><table ...>` with the DS pattern:

**Pattern for desktop table (example: SejongHospital):**
```tsx
{/* Desktop */}
<div className="hidden md:block my-6">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Weight</TableHead>
        <TableHead>Class</TableHead>
        <TableHead>Use</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Light 300</TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-sejong-light</code></TableCell>
        <TableCell>Decorative display, large pull quotes</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Bold 700</TableCell>
        <TableCell><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-sejong-bold</code></TableCell>
        <TableCell>Default for all Display and H1</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>
```

**Pattern for mobile list (same table):**
```tsx
{/* Mobile */}
<div className="block md:hidden my-6">
  <TableMobileList>
    <TableMobileItem>
      <span className="type-caption text-muted-foreground">Weight</span>
      <span className="type-body-sm text-foreground">Light 300</span>
      <span className="type-caption text-muted-foreground">Class</span>
      <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-sejong-light</code>
      <span className="type-caption text-muted-foreground">Use</span>
      <span className="type-body-sm text-foreground">Decorative display, large pull quotes</span>
    </TableMobileItem>
    <TableMobileItem>
      <span className="type-caption text-muted-foreground">Weight</span>
      <span className="type-body-sm text-foreground">Bold 700</span>
      <span className="type-caption text-muted-foreground">Class</span>
      <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">font-sejong-bold</code>
      <span className="type-caption text-muted-foreground">Use</span>
      <span className="type-body-sm text-foreground">Default for all Display and H1</span>
    </TableMobileItem>
  </TableMobileList>
</div>
```

Apply the same pattern to all 3 tables. The Pretendard table has 3 rows, Geist Mono has 1 row.

**Verify:** `pnpm typecheck` passes. Visually confirm tables render with navy header text and hover rows.

---

### Task 2: Migrate specimen cards to DS Card component (Finding #2)

**Files:**
- Modify: `apps/docs/app/foundation/typography/fonts/page.tsx`

**What to change:**

Add Card imports:
```tsx
import { Card, CardContent, CardFooter } from '@umichkisa-ds/web'
```

**SejongHospital specimen** (lines 81-90): Replace the raw `<div className="my-8 rounded-xl border border-border overflow-hidden">` with:

```tsx
{/* Raw utilities: specimen demonstrating font appearance, not type scale */}
<Card className="my-8 overflow-hidden">
  <CardContent className="bg-brand-primary py-10">
    <p className="text-3xl md:text-5xl font-sejong-bold text-brand-foreground">University of Michigan</p>
    <p className="mt-3 text-xl md:text-2xl font-sejong-light text-brand-foreground opacity-50">Korean International Students Association</p>
  </CardContent>
  <CardFooter>
    <span className="type-caption text-muted-foreground font-mono">Bold 700 — font-sejong-bold</span>
    <span className="type-caption text-muted-foreground font-mono">Light 300 — font-sejong-light</span>
  </CardFooter>
</Card>
```

Note: This also fixes Finding #1 (raw hex → semantic tokens), Finding #3 (text-xs → type-caption on footer), Finding #8 (responsive text sizing), and the opacity-70 issue.

**Pretendard specimen** (lines 156-166): Replace the raw `<div className="my-8 rounded-xl border border-border overflow-hidden">` with:

```tsx
{/* Raw utilities: specimen demonstrating font appearance, not type scale */}
<Card className="my-8 overflow-hidden">
  <CardContent className="space-y-4 py-8">
    <p className="text-3xl font-pretendard font-semibold text-foreground">Section Heading — Semibold 600</p>
    <p className="text-base font-pretendard font-normal text-foreground leading-relaxed">Body text — Regular 400. The quick brown fox jumps over the lazy dog. Pretendard reads cleanly at every size from caption to heading.</p>
    <p className="text-base font-pretendard font-normal text-foreground leading-relaxed">본문 텍스트 — 미시간 대학교 한인학생회. 한국어와 영어를 동일한 품질로 지원합니다.</p>
    <p className="text-sm font-pretendard font-medium text-muted-foreground">Label or navigation item — Medium 500</p>
    <p className="text-xs font-pretendard font-normal text-muted-foreground">Caption text — Regular 400</p>
  </CardContent>
  <CardFooter>
    <span className="type-caption text-muted-foreground font-mono">font-pretendard — weights 400 · 500 · 600</span>
  </CardFooter>
</Card>
```

Note: This also fixes Finding #7 (adds Korean text to Pretendard specimen) and Finding #3 (footer label fix).

**Verify:** `pnpm typecheck` passes. Visually confirm Card styling (rounded-md, border, surface-subtle bg).

---

### Task 3: Replace raw blockquote with DS Alert (Finding #4)

**Files:**
- Modify: `apps/docs/app/foundation/typography/fonts/page.tsx`

**What to change:**

Add Alert import:
```tsx
import { Alert } from '@umichkisa-ds/web'
```

Replace the blockquote at lines 320-327:
```tsx
<blockquote className="border-l-[3px] border-brand-accent bg-surface-subtle pl-4 py-2 my-4 rounded-r">
  <span className="italic text-muted-foreground type-body-sm">
    Non-Next.js consumers can skip this step entirely. ...
  </span>
</blockquote>
```

With:
```tsx
<Alert className="my-4">
  Non-Next.js consumers can skip this step entirely. The DS{' '}
  <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">@font-face</code>{' '}
  declarations work on their own — fonts will load via the standard CSS path. The
  trade-off is a brief flash of system font on first visit while the TTF files download.
</Alert>
```

**Verify:** `pnpm typecheck` passes. Visually confirm Alert renders without left-border accent.

---

### Task 4: Remove redundant content (Finding #6)

**Files:**
- Modify: `apps/docs/app/foundation/typography/fonts/page.tsx`

**What to change:**

In the paragraph at lines 55-63, remove the last sentence: "If you are unsure, use Bold."

The paragraph currently ends with:
```
Never use it below text-4xl. If you are unsure, use Bold.
```

Change to:
```
Never use it below text-4xl.
```

Specifically, remove the trailing ` If you are unsure, use Bold.` from line 63 (keeping the period after `text-4xl`).

**Verify:** Read the paragraph to confirm it still flows naturally.

---

### Task 5: Final verification

**Run:**
```bash
pnpm build && pnpm typecheck
```

Both must pass. If either fails, fix the issue before marking complete.

**Visual spot-check (if dev server running):** Navigate to `/foundation/typography/fonts` and confirm:
- Tables show navy header text with hover highlight on rows
- Specimen cards use Card styling (rounded-md, subtle background)
- SejongHospital specimen shows brand colors (navy bg, maize text)
- Pretendard specimen includes Korean text line
- Alert renders instead of blockquote
- No raw hex colors remain

---

### Task 6: Commit

```bash
git add apps/docs/app/foundation/typography/fonts/page.tsx
git commit -m "fix(docs): review fixes for /foundation/typography/fonts

- Migrate 3 raw tables to DS Table + TableMobileList
- Migrate 2 specimen cards to DS Card component
- Replace raw hex colors with semantic tokens
- Replace raw blockquote with DS Alert
- Fix specimen footer labels (text-xs → type-caption)
- Add responsive font sizing to SejongHospital specimen
- Add Korean text to Pretendard specimen
- Remove redundant content"
```
