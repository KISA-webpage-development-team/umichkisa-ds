# Components Index Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `ds-constrained-execution` to implement this plan task-by-task. Run `ds-review` agent after every task that modifies `.tsx` files.

**Goal:** Replace the placeholder `/components` index page with a catalog of all DS components — intro, install snippet, and alphabetical card grid.

**Architecture:** Single-file page (`apps/docs/app/components/page.tsx`). Data-driven: a `components` array at the top of the file maps over `Card` + `Link` in a `Grid`. Follows the same layout pattern as `/forms/overview` (Container, h1, intro, Installation h2, content h2). No client interactivity needed — server component only.

**Tech Stack:** Next.js 15 App Router, `@umichkisa-ds/web` (Container, Grid, Card, CardHeader, CardTitle, CardDescription, Alert), docs components (CodeBlock, Heading, InlineCode), `next/link`.

**Reference files:**
- Pattern to follow: `apps/docs/app/forms/overview/page.tsx`
- Current placeholder: `apps/docs/app/components/page.tsx`
- Alert reorder: `apps/docs/app/components/forms/page.tsx`

---

## Task 1: Build the Components index page

**Files:**
- Rewrite: `apps/docs/app/components/page.tsx`

**Step 1: Define the component data array**

Add a typed array at the top of the file with all 35 components in alphabetical order. Each entry has `name`, `href`, and `description` (one sentence).

```tsx
const components: { name: string; href: string; description: string }[] = [
  { name: 'Accordion', href: '/components/accordion', description: 'Vertically stacked collapsible sections for organizing content.' },
  { name: 'Alert', href: '/components/alert', description: 'Contextual feedback messages with info, success, warning, and error variants.' },
  { name: 'Avatar', href: '/components/avatar', description: 'User image with initials and icon fallback chain.' },
  { name: 'Badge', href: '/components/badge', description: 'Compact status label with semantic color variants.' },
  { name: 'Button', href: '/components/button', description: 'Primary actions and form submissions with four variants and three sizes.' },
  { name: 'Calendar', href: '/components/calendar', description: 'Date selection grid with single and range modes.' },
  { name: 'Card', href: '/components/card', description: 'Compound content container with header, body, and footer slots.' },
  { name: 'Checkbox', href: '/components/checkbox', description: 'Boolean toggle with optional inline label text.' },
  { name: 'Container', href: '/components/container', description: 'Page shell wrapper with responsive max-width and padding.' },
  { name: 'DatePicker', href: '/components/datepicker', description: 'Popover-triggered calendar for single and range date input.' },
  { name: 'Dialog', href: '/components/dialog', description: 'Modal overlay for confirmations, forms, and focused tasks.' },
  { name: 'Divider', href: '/components/divider', description: 'Horizontal or vertical rule for separating content sections.' },
  { name: 'Dropdown', href: '/components/dropdown', description: 'Action menu overlay triggered by a button.' },
  { name: 'FormItem', href: '/components/form-item', description: 'Layout wrapper that pairs a label, description, and error with any form control.' },
  { name: 'Forms', href: '/components/forms', description: 'Composition guide for assembling form controls with FormItem.' },
  { name: 'Grid', href: '/components/grid', description: 'Responsive equal-width column layout with DS spacing tiers.' },
  { name: 'Icon', href: '/components/icon', description: 'Single component with a static registry of Lucide and custom SVG icons.' },
  { name: 'IconButton', href: '/components/icon-button', description: 'Icon-only square button with required accessible label.' },
  { name: 'Input', href: '/components/input', description: 'Single-line text field with error state support.' },
  { name: 'Label', href: '/components/label', description: 'Form control label with optional required indicator.' },
  { name: 'LinkButton', href: '/components/link-button', description: 'Anchor element styled as a button for navigation actions.' },
  { name: 'LoadingSpinner', href: '/components/loading-spinner', description: 'Animated spinner with three sizes and optional visible label.' },
  { name: 'OnlyMobileView', href: '/components/only-mobile-view', description: 'Gate component that renders children on mobile and shows a message on desktop.' },
  { name: 'Pagination', href: '/components/pagination', description: 'Page navigation with prev/next arrows, page numbers, and ellipsis.' },
  { name: 'Popover', href: '/components/popover', description: 'Floating content panel anchored to a trigger element.' },
  { name: 'Radio', href: '/components/radio', description: 'Single-select option group with inline label text.' },
  { name: 'Select', href: '/components/select', description: 'Dropdown menu for choosing from a list of options.' },
  { name: 'Skeleton', href: '/components/skeleton', description: 'Loading placeholder with rectangular and circular variants.' },
  { name: 'StatusView', href: '/components/status-view', description: 'Centered status message for error pages, auth gates, and empty states.' },
  { name: 'Switch', href: '/components/switch', description: 'Toggle control for binary on/off settings.' },
  { name: 'Table', href: '/components/table', description: 'Data table with brand-styled headers and mobile list primitives.' },
  { name: 'Tabs', href: '/components/tabs', description: 'Tabbed content switcher with underline and pill variants.' },
  { name: 'Textarea', href: '/components/textarea', description: 'Multi-line text field with resizable height.' },
  { name: 'Toast', href: '/components/toast', description: 'Ephemeral notification with five semantic variants.' },
  { name: 'ToggleGroup', href: '/components/toggle-group', description: 'Segmented button group for single-select navigation.' },
  { name: 'Tooltip', href: '/components/tooltip', description: 'Hover-triggered text bubble for supplementary context.' },
]
```

**Step 2: Write the install code snippets**

```tsx
const installPkgJson = `"@umichkisa-ds/web": "github:KISA-webpage-development-team/umichkisa-ds#vX.X.X"`

const installBash = `npm install`
```

**Step 3: Write the full page component**

Follow the forms overview pattern exactly: `Container size="md" as="article"`, same h1 styling, same intro paragraph styling, same Installation section structure.

```tsx
import {
  Container,
  Alert,
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@umichkisa-ds/web'
import { CodeBlock } from '@/components/CodeBlock'
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'
import Link from 'next/link'

// ... components array and install snippets from Steps 1-2 ...

export default function ComponentsPage() {
  return (
    <Container size="md" as="article">
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">
        Components
      </h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        <InlineCode>@umichkisa-ds/web</InlineCode> is the KISA Design System
        component library. It provides production-ready UI primitives — buttons,
        form controls, overlays, layout, and more — built with consistent tokens,
        accessibility, and composability in mind.
      </p>

      {/* ── Installation ──────────────────────────────────── */}
      <Heading as="h2">Installation</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        This package is distributed via GitHub git tags — not the npm registry.
        Add the git URL to your project{"'"}s{' '}
        <InlineCode>package.json</InlineCode> dependencies, pointing to the
        desired release tag:
      </p>
      <CodeBlock code={installPkgJson} lang="json" />
      <p className="type-body mb-4 text-foreground max-w-prose">
        Then install dependencies:
      </p>
      <CodeBlock code={installBash} lang="bash" />
      <Alert variant="info" className="mb-8">
        You also need <InlineCode>react</InlineCode> and{' '}
        <InlineCode>react-dom</InlineCode> as peer dependencies. For form state
        management and validation, see the{' '}
        <a
          href="/forms/overview"
          className="text-link underline hover:text-brand-primary"
        >
          Forms
        </a>{' '}
        package.
      </Alert>

      {/* ── All Components ────────────────────────────────── */}
      <Heading as="h2">All Components</Heading>
      <Grid columns={{ base: 1, md: 2, lg: 3 }} gap="component" className="mt-6">
        {components.map((component) => (
          <Link
            key={component.href}
            href={component.href}
            className="block h-full rounded-md focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2"
          >
            <Card className="h-full hover:bg-surface-subtle transition-colors">
              <CardHeader>
                <CardTitle>{component.name}</CardTitle>
                <CardDescription>{component.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </Grid>
    </Container>
  )
}
```

**Step 4: Verify**

Run: `pnpm typecheck`
Expected: PASS — no type errors.

Open in browser: visit the devtunnels URL at `/components`. Verify:
- h1, intro paragraph, Installation section render correctly
- Card grid is 3 columns on desktop, 2 on tablet, 1 on mobile
- Every card links to the correct component page
- Hover state works on cards

**Step 5: Commit**

```bash
git add apps/docs/app/components/page.tsx
git commit -m "feat(docs): add components index page with install guide and catalog grid"
```

---

## Task 2: Reorder Alert on `/components/forms`

**Files:**
- Modify: `apps/docs/app/components/forms/page.tsx`

**Step 1: Move the Alert block above the intro paragraph**

Current order (lines 188-207):
1. h1
2. intro `<p>`
3. Alert

New order:
1. h1
2. Alert (with `mb-4`)
3. intro `<p>` (keep `mb-8`)

The Alert already exists at line 198-207. Move it above the `<p>` at line 189-196. Change the Alert's className from `mb-8` (inside the wrapping `<div>`) to just `mb-4` directly on the Alert, and remove the wrapping `<div className="mb-8 max-w-prose">`. The intro `<p>` keeps its existing `mb-8`.

Before (simplified):
```tsx
<h1 ...>Forms</h1>
<p className="type-body mb-4 ...">How to compose form components...</p>
<div className="mb-8 max-w-prose">
  <Alert variant="info">For form state management...</Alert>
</div>
```

After:
```tsx
<h1 ...>Forms</h1>
<Alert variant="info" className="mb-4 max-w-prose">
  For form state management, validation, and submission handling, see the{' '}
  <a href="/forms/overview" className="text-link underline hover:text-brand-primary">
    Forms
  </a>{' '}
  section — it provides a{' '}
  <InlineCode>{'<Form>'}</InlineCode>{' '}
  compound component that wires these primitives to react-hook-form automatically.
</Alert>
<p className="type-body mb-8 ...">How to compose form components...</p>
```

**Step 2: Verify**

Run: `pnpm typecheck`
Expected: PASS.

Open in browser: visit `/components/forms`. Verify the Alert now appears above the intro paragraph.

**Step 3: Commit**

```bash
git add apps/docs/app/components/forms/page.tsx
git commit -m "fix(docs): move forms redirect Alert above intro on /components/forms"
```
