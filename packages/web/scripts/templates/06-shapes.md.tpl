## Shapes

Three rounded radii, picked by surface size and shape:

- `rounded.md` (`8px`) — default. Buttons, inputs, cards, most
  interactive surfaces.
- `rounded.lg` (`12px`) — modals, drawers, larger surfaces where
  `md` looks pinched.
- `rounded.full` (`9999px`) — pills, avatars, circular badges.

Off-tier radii (`rounded-xl`, `rounded-2xl`) require explicit
DS-surface justification. Geometry stays minimal — no decorative
clipping, no asymmetric corners.
