## Do's and Don'ts

A short surfacing list. The comprehensive consumer rulebook is
`USAGE.md` (Layer 3).

- Do reference semantic color tokens (`brand-primary`, `surface`,
  `foreground`) for every color decision; never use primitive values
  or raw hex.
- Do use `type-*` classes for every typographic decision and pair
  them with an explicit color token.
- Do pick spacing from the three named tiers (`element` / `component`
  / `section`) and radius from the three named tiers (`md` / `lg` /
  `full`).
- Do go through `<Icon name="...">` for every icon and pick `size`
  from the 5-step scale (`xs` / `sm` / `md` / `lg` / `xl`).
- Do use `<Container>` for page shells; never compose
  `mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8` manually.
- Don't reference `--primitive-*` tokens directly in component code.
- Don't override `type-*` weight with `!font-*`.
- Don't use Geist Mono for body or UI text — it is reserved for
  code-display contexts (inline code, code blocks).
- Don't implement dark mode (no `.dark`, no media queries, no dark
  layer).
- Don't use `--color-info` and `--color-link` interchangeably; they
  resolve to the same blue but mark distinct roles.
