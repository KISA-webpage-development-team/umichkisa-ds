# Client Migration Notes

Append-only log of API changes from existing implementations. Used when updating the client repo.

---

## Button

- `forSubmit` prop removed — use native `type="submit"` instead
- `ButtonVariant` type export removed — variant type is inferred from CVA
- `variant="secondary"` restyled from `bg-slate-100` to semantic surface tokens
- `variant="destructive"` added (new)
- `size` prop added: `"sm" | "md" | "lg"` (default `"md"`)
- Extends `React.ButtonHTMLAttributes<HTMLButtonElement>` — all native button props now accepted

## LinkButton

- `variant="secondary"` restyled from `bg-slate-100` to semantic surface tokens
- `variant="destructive"` added (new, inherited from `buttonVariants`)
- `size` prop added: `"sm" | "md" | "lg"` (default `"md"`)
- Extends `React.AnchorHTMLAttributes<HTMLAnchorElement>` — all native anchor props (`target`, `rel`, etc.) now accepted
- `LinkButtonProps` type changed — no longer manually defines `href`, `className`, `children`

## IconButton

- Now icon-only — `text` prop removed. For icon + text, use `<Button>` with `<Icon>` as a child.
- `icon` prop changed from `React.ReactNode` to `IconName` (string). Pass Lucide name: `icon="pencil"`.
- `forSubmit` prop removed — use `type="submit"` instead.
- `onClick` type changed from `() => void` to native `React.MouseEventHandler<HTMLButtonElement>` (via Button's `ButtonHTMLAttributes`).
- `aria-label` is now required (TypeScript enforced).
- Default variant remains `secondary` (unchanged).
- `size` prop added: `"sm" | "md" | "lg"` (default `"md"`) — produces square dimensions.
- `disabled` handled via native `<button>` attribute passthrough (no separate prop needed).

## Divider

- `HorizontalDivider` renamed to `Divider` (orientation defaults to `"horizontal"`)
- `VerticalDivider` renamed to `Divider orientation="vertical"`
- `color` prop removed — uses `--color-border` token exclusively

## Input

- `type` is now optional (defaults to `"text"`)
- `value` and `onChange` are now optional — uncontrolled usage supported
- `onBlur`, `placeholder`, `required`, `disabled`, `id` are now inherited via `...props` (no API change, just internal simplification)
- Extends `React.InputHTMLAttributes` — all native input attributes now accepted

## Label

- No prop changes — API is identical (`htmlFor`, `required`, `className`, `children`)
- Import change only: `import { Label } from '@umichkisa-ds/web'` (replaces `CustomLabel`)

## Select

- **Breaking:** Replaced native `<select>` with Radix compound component
- `<option value="x">Label</option>` → `<SelectItem value="x">Label</SelectItem>`
- `<optgroup label="Group">` → `<SelectGroup label="Group">`
- `onChange` → `onValueChange` (Radix convention)
- `defaultValue` stays the same (on `<Select>` root)
- `invalid` moved from `<Select>` to `<SelectTrigger>`
- `disabled` stays on `<Select>` root
- Must wrap items in `<SelectContent>` and use `<SelectTrigger>` for the trigger button

## FormItem

- **Breaking:** Complete API redesign — no longer renders its own Input
- Old props removed: `type`, `value`, `onChange`, `placeholder`, `validationRules`, `labelText`
- New API: `label` (string), `children` (form control slot), `error`, `description`, `required`, `className`
- `labelText` renamed to `label`
- `htmlFor` unchanged
- Validation logic removed — consumer passes `error` string from external validation
- Now composes with any form control (Input, Textarea, Select, etc.) via `children`

## Dropdown

- **Breaking:** Near-rewrite of compound component API
- `DropdownContent` gains `side`, `align`, `sideOffset` positioning props
- `DropdownItem` gains `variant` prop (`"default" | "destructive"`) and `disabled` prop
- New exports: `DropdownGroup` (label + children), `DropdownSeparator`
- Hover/focus styling changed from `bg-surface-muted` to `bg-brand-accent-subtle`
- Fade+zoom open/close animations added
- Client app uses full shadcn dropdown — when migrating, use DS version for simple action menus; keep shadcn for sub-menus/checkbox items until DS adds them

## Dialog

- **Near-rewrite** of compound component
- `DialogContent` gains `size` prop (`"sm" | "md" | "lg" | "full"`, default `"md"`)
- `DialogContent` gains `showCloseButton` prop (default `true`) — built-in X close button
- `DialogTitle` restyled from raw `text-lg font-semibold` to `type-h3 text-foreground`
- New exports: `DialogDescription` (wraps Radix `aria-describedby`), `DialogFooter` (flex action bar)
- Overlay + content now animated (fade + slide-up)
- All styling migrated from `var()` syntax to Tailwind token classes
