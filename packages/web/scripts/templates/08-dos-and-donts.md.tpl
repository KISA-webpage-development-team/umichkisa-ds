## Do's and Don'ts

A short surfacing list. The comprehensive consumer rulebook is
`USAGE.md` (Layer 3).

**Do**

- Use semantic color tokens (`brand-primary`, `surface`,
  `foreground`) for every color decision.
- Use `type-*` classes for every typographic decision and pair them
  with an explicit color token.
- Pick spacing from the three named tiers (`element` / `component` /
  `section`); pick radius from the three named tiers (`md` / `lg` /
  `full`).
- Go through `<Icon>` for every icon; pick `size` from the 5-step
  scale (`xs` / `sm` / `md` / `lg` / `xl`).

**Don't**

- Reference `--primitive-*` tokens directly in component code.
- Compose `mx-auto max-w-screen-2xl px-4` manually — use `Container`.
- Override `type-*` weight with `!font-*`.
- Use Geist Mono for body or UI text; it is reserved for code-display.
- Implement dark mode (no `.dark`, no media queries, no dark layer).
