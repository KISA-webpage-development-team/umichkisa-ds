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
