## Components

The Google Labs DESIGN.md `components:` block is intentionally
omitted — component composition belongs to Layer 2, not the visual
contract.

For per-component identity, sibling discrimination
(`pick_when` / `reject_when`), variants, notable props, intrinsic
behavior, compound parts, and component-scoped anti-patterns, see
`COMPONENT.md` at the repo root.

For cross-component invariants (e.g. icon-only button + tooltip
aria-label match), see the `cross_component_invariants` block in the
same file.
