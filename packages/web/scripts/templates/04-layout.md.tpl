## Layout

Three-breakpoint, three-tier system.

**Breakpoints.** `default` (mobile), `md:` (≥768px), `lg:` (≥1024px).
No `sm:`, `xl:`, or `2xl:`.

**Spacing tiers** (`spacing.element` / `spacing.component` /
`spacing.section`):

- `element` (`8px`) — label↔input, icon↔text, caption-below,
  heading↔subtitle.
- `component` (`16px`) — stacked fields, list items, stacked cards,
  nav items.
- `section` (`24px`) — gaps between major page sections (1.5×
  component).

Vertical spacing does not scale across breakpoints — responsiveness
is column reflow, not vertical breathing.

**Icon sizes** (`spacing.icon-{xs,sm,md,lg,xl}`) map to text context:
`xs`/caption, `sm`/caption, `md`/body (default), `md`–`lg`/subhead,
`lg`/heading, `xl`/hero. Pick via the `size` prop on `<Icon>`; never
override with `font-size` or arbitrary CSS.

The page shell (`Container`) combines max-width, horizontal padding,
and centering: `mx-auto w-full max-w-screen-2xl px-4 md:px-6 lg:px-8`.
Never compose this manually.
