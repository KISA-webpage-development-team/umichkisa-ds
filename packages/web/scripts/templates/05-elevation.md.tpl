## Elevation & Depth

Flat by default. The system has no shadow tokens.

Depth is carried by **borders** (`border` / `border-strong`) and
**tonal layering** (`surface` / `surface-muted` / `surface-subtle`).
Cards sit on `surface` with a `border` ring; elevated regions shift to
`surface-subtle`; deprioritized regions shift to `surface-muted`.
Two-level depth is the maximum.

Overlays (Dialog scrim, Drawer scrim) use `overlay` at 40% opacity —
the only place a transparent value appears in the system.
