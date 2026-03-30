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
