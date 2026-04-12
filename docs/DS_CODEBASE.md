# DS_CODEBASE.md — Consumer Quick-Reference

Lookup table for AI agents consuming `@umichkisa-ds` in client apps. For each component: **when** to use it and **where** to read the full API. Read the source file before using any component.

> Author-side DS internals (token tiers, font pipeline, docs infrastructure) → `docs/DS_AUTHORING.md`

---

## Packages

| Package | Install | What it provides |
|---|---|---|
| `@umichkisa-ds/web` | `npm i @umichkisa-ds/web` | All UI components, tokens, `cn()` utility |
| `@umichkisa-ds/form` | `npm i @umichkisa-ds/form` | RHF-powered form wiring (peer: `react-hook-form`, `@umichkisa-ds/web`) |

### CSS Entry Points

```tsx
// Full compiled styles (components + tokens + fonts) — use in app root
import "@umichkisa-ds/web/dist/styles.css"

// Theme tokens only (variables + utilities, no component styles) — use in shared configs
import "@umichkisa-ds/web/theme.css"
```

### Component Imports

```tsx
import { Button, Card, Icon } from "@umichkisa-ds/web"
import { Form, useForm } from "@umichkisa-ds/form"
```

---

## Component Reference

Grouped by UI intent. **Read the source file before using any component.**

All source paths are relative to `packages/web/src/components/`.

### Showing feedback to the user

| Component | When to use | Source |
|---|---|---|
| Alert | Inline contextual message the user should notice without leaving the page (validation summary, feature caveat, important note) | `feedback/Alert.tsx` |
| toast / Toaster | Transient notification after an action completes — confirming success, warning of a problem, or reporting an error without disrupting flow | `feedback/Toast.tsx` |
| StatusView | Full-page state when there is no content to show — empty results, 404, auth gate, unexpected error | `feedback/StatusView.tsx` |
| LoadingSpinner | The user must wait and there is no layout to skeleton — initial page load, button submit, overlay content | `feedback/LoadingSpinner.tsx` |
| Skeleton | Content is loading but the page layout is known — preserve visual structure and reduce perceived wait time | `feedback/Skeleton.tsx` |

### Collecting user input

| Component | When to use | Source |
|---|---|---|
| Input | Single-line free text — name, email, search query, short answer | `form/Input.tsx` |
| Textarea | Multi-line free text — comments, descriptions, long-form answers | `form/Textarea.tsx` |
| Select | Pick one option from a list too long to show inline — dropdown with search-friendly items | `form/Select.tsx` |
| Checkbox | Toggle a boolean (agree/disagree) or select multiple items from a short list | `form/Checkbox.tsx` |
| RadioGroup / RadioItem | Pick exactly one option from a small visible set (2–5 choices) | `form/Radio.tsx` |
| Switch | Toggle a setting or preference on/off — feels lighter than a checkbox for binary configs | `form/Switch.tsx` |
| Label | Accessible text label for a form control — always pair with an input | `form/Label.tsx` |
| FormItem | Layout wrapper that composes label + control + description + error message into a consistent form row | `form/FormItem.tsx` |
| DatePicker / DateRangePicker | Pick a single date or date range via a calendar popover attached to an input-style trigger | `date/DatePicker.tsx` |

### Triggering actions

| Component | When to use | Source |
|---|---|---|
| Button | Primary call-to-action — submitting a form, confirming a dialog, starting a flow | `button/Button.tsx` |
| IconButton | Action represented by an icon alone — toolbar buttons, close/dismiss, compact controls where label text won't fit | `button/IconButton.tsx` |
| LinkButton | Navigation styled as a button — link to another page or external URL with button appearance | `button/LinkButton.tsx` |

### Organizing & displaying content

| Component | When to use | Source |
|---|---|---|
| Card | Group related content into a visually distinct, bordered container — feature summary, list item, dashboard tile | `display/Card.tsx` |
| Table | Structured data with columns and rows — lists, comparisons, admin data. Use TableMobileList for responsive mobile layout | `display/Table.tsx` |
| Accordion | Progressive disclosure — show/hide secondary content to reduce page clutter (FAQ, advanced settings, grouped details) | `display/Accordion.tsx` |
| Badge | Short status label or count attached to another element — category tag, notification count, status indicator | `display/Badge.tsx` |
| Avatar | Represent a user or entity visually — profile photo with initials/icon fallback | `display/Avatar.tsx` |
| Divider | Visual separator between content sections — horizontal or vertical rule | `divider/Divider.tsx` |

### Overlays & dialogs

| Component | When to use | Source |
|---|---|---|
| Dialog | Modal that demands attention — confirmation prompt, form in a lightbox, detail view that blocks the page | `overlay/Dialog.tsx` |
| Dropdown | Context menu or action list triggered by a button — row actions, "more" menus, profile menu | `overlay/Dropdown.tsx` |
| Popover | Non-modal floating content anchored to a trigger — rich tooltip, mini-form, filter panel | `overlay/Popover.tsx` |
| Tooltip | Brief helper text on hover/focus — label for icon buttons, extra context for truncated text | `overlay/Tooltip.tsx` |

### Navigation & wayfinding

| Component | When to use | Source |
|---|---|---|
| Tabs | Switch between views within the same page context — content panels, settings sections, grouped data | `navigation/Tabs.tsx` |
| Pagination | Navigate through paged data — result lists, tables, bulletin boards | `navigation/Pagination.tsx` |
| ToggleGroup | Segmented control to switch a mode or filter — view toggle (grid/list), category filter, time range selector | `navigation/ToggleGroup.tsx` |

### Layout

| Component | When to use | Source |
|---|---|---|
| Container | Page-width wrapper with consistent max-width and horizontal padding — wrap main page content | `layout/Container.tsx` |
| Grid | Equal-width responsive column grid — card grids, feature lists, multi-column layouts | `layout/Grid.tsx` |

### Date selection

| Component | When to use | Source |
|---|---|---|
| Calendar | Standalone calendar for inline date picking — always-visible date selection, scheduling views | `date/Calendar.tsx` |
| DatePicker / DateRangePicker | Date input with popover calendar — form field for date entry (see "Collecting user input" above) | `date/DatePicker.tsx` |

### Utilities

| Component | When to use | Source |
|---|---|---|
| Icon | Any icon in the UI — uses a static Lucide registry with `name` prop | `icon/Icon.tsx` |
| OnlyMobileView | Gate content to mobile-only — renders children on mobile, shows "use your phone" overlay on desktop | `utilities/OnlyMobileView.tsx` |
| cn() | Merge class names with Tailwind conflict resolution — use instead of raw `clsx` | `utils/cn.ts` |

---

## Form Wiring (`@umichkisa-ds/form`)

Prefer `Form.*` compound fields over manual hook wiring. Source → `packages/form/src/index.ts`

| Export | When to use |
|---|---|
| Form | Form container — wraps all fields, provides RHF context and handles submit |
| Form.Input | Text input field wired to form state — replaces manual `useController` + `Input` |
| Form.Textarea | Multi-line text field wired to form state |
| Form.Select | Dropdown select wired to form state |
| Form.Checkbox | Boolean checkbox wired to form state |
| Form.Radio | Radio group wired to form state |
| Form.Switch | Toggle switch wired to form state |
| Form.Button | Submit button that auto-disables during submission |
| useForm | Initialize form instance — thin RHF wrapper with `mode: "onTouched"` default |
| useFormField | Escape hatch — manual field wiring for custom controls not covered by `Form.*` compounds |
| useFormStatus | Read-only form state — rarely needed, `Form.Button` already handles submit state |

---

## Token Utility Classes

All tokens are available as standard Tailwind classes. No `var()` needed.

### Semantic Colors

**Brand**
| Class pattern | Token |
|---|---|
| `*-brand-primary` | Michigan Blue — primary brand color |
| `*-brand-primary-mid` | Mid-tone blue — links, info accents |
| `*-brand-primary-hover` | Blue hover state |
| `*-brand-primary-pressed` | Blue pressed state |
| `*-brand-accent` | Michigan Maize — accent, highlights |
| `*-brand-accent-subtle` | Light maize — subtle highlight backgrounds |
| `*-brand-accent-hover` | Maize hover state |
| `*-brand-accent-pressed` | Maize pressed state |
| `*-brand-foreground` | Maize — text on brand-primary backgrounds |

Use as `bg-brand-primary`, `text-brand-accent`, `border-brand-primary`, etc.

**Surface & Border**
| Class pattern | Token |
|---|---|
| `*-surface` | White — default background |
| `*-surface-muted` | Gray 50 — muted section background |
| `*-surface-subtle` | Gray 100 — subtle section background |
| `*-border` | Gray 200 — default border |
| `*-border-strong` | Gray 300 — emphasized border |

**Text**
| Class pattern | Token |
|---|---|
| `text-foreground` | Gray 900 — primary text |
| `text-muted-foreground` | Gray 500 — secondary/helper text |
| `text-disabled-foreground` | Gray 400 — disabled text |
| `text-link` | Mid blue — link text |

**Feedback**
| Class pattern | Token |
|---|---|
| `*-error` | Red — error state |
| `*-error-subtle` | Light red — error background |
| `*-error-foreground` | White — text on error backgrounds |
| `*-success` | Green — success state |
| `*-success-subtle` | Light green — success background |
| `*-warning` | Amber — warning state |
| `*-warning-subtle` | Light amber — warning background |
| `*-info` | Mid blue — info state |
| `*-info-subtle` | Light blue — info background |

**Overlay**
| Class pattern | Token |
|---|---|
| `*-overlay` | Black 40% — modal/overlay backdrop |

**Focus**
| Class pattern | Token |
|---|---|
| `*-focus-ring` | Maize — focus ring color |

### Typography

| Class | Use for |
|---|---|
| `.type-display` | Hero headlines, landing page titles |
| `.type-h1` | Page titles |
| `.type-h2` | Section headings |
| `.type-h3` | Sub-section headings |
| `.type-body` | Default body text (1rem) |
| `.type-body-sm` | Secondary body text, descriptions (0.875rem) |
| `.type-label` | Form labels, UI labels (0.875rem, medium weight) |
| `.type-caption` | Timestamps, fine print, helper text (0.75rem) |

### Font Families

| Class | Use for |
|---|---|
| `font-sejong-bold` | Brand display text — headings, hero titles |
| `font-sejong-light` | Brand light text — decorative, stylized |
| `font-pretendard` | Default UI text — body, labels, buttons |
| `font-geist-mono` | Code, technical values, monospace content |

### Icon Sizes

| Token | Value | Typical use |
|---|---|---|
| `--icon-xs` | 0.75rem (12px) | Inline with caption text |
| `--icon-sm` | 1rem (16px) | Inline with body text |
| `--icon-md` | 1.25rem (20px) | Default icon size |
| `--icon-lg` | 1.5rem (24px) | Emphasized icons |
| `--icon-xl` | 2rem (32px) | Feature icons, empty states |
