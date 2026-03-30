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

## Divider

- `HorizontalDivider` renamed to `Divider` (orientation defaults to `"horizontal"`)
- `VerticalDivider` renamed to `Divider orientation="vertical"`
- `color` prop removed — uses `--color-border` token exclusively
