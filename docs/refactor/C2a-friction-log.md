# C2a — Schema-Friction Log

_Running log of awkward fits, schema gaps, and DS-side discrepancies surfaced
during COMPONENT.md authoring. Per Pitfall §4.4: friction goes here, NOT into
silent schema mutations. Finalized at C2a.final into recommendations for the
human to decide whether A2 needs amending before future authoring._

Entries are appended in the order they surface. Each entry: short and
self-contained — what was awkward, how it was handled, recommendation.

---

## C2a.2 — Layout group (Container, Grid)

### F1. Container's actual padding diverges from `/DESIGN.md` Layout prose — **RESOLVED at C2a.2 checkpoint**

- **Awkward**: `/DESIGN.md` Layout section prose said "page shell combines `mx-auto w-full max-w-screen-2xl px-4 md:px-6 lg:px-8`" and DS_CLIENT_USAGE rule `p2-ly-1` echoed the same. The live `Container.tsx` actually emitted `mx-auto w-full p-6 lg:p-12` (all-sides, single breakpoint, larger values).
- **Resolution**: User chose to align Container with a slightly-revised page-shell pattern — **all-sides** padding `p-4 md:p-6 lg:p-8` (vertical + horizontal at three breakpoints). Changes shipped in same commit as F1 resolution:
  - `packages/web/src/components/layout/Container.tsx` → `p-6 lg:p-12` → `p-4 md:p-6 lg:p-8`
  - `packages/web/scripts/templates/04-layout.md.tpl` + `08-dos-and-donts.md.tpl` → updated page-shell utility string
  - `docs/DS_CONSTRAINTS.md` §Page Shell `l-ps-1` → updated utility string + clarified padding is all-sides
  - `docs/DS_CLIENT_USAGE.md` §Layout `p2-ly-1` → updated utility string
  - `apps/docs/app/foundation/layout/usage/page.tsx` + `apps/docs/app/foundation/layout/spacing/page.tsx` → updated InlineCode references
  - `/DESIGN.md` regenerated via `pnpm --filter @umichkisa-ds/web compile-design`
  - `COMPONENT.md` Container `intrinsic_behavior` updated to match
- **Follow-up**: A `@umichkisa-ds/web` patch bump (per MEMORY: all DS bumps are patch) is required to publish this behavior change to consumers. Bump deferred — surface to user after C2a checkpoint.

### F2. ~~`compound_parts` is omitted entirely on simple components~~ — **DROPPED, not friction**

User confirmed: schema is working as designed. The "everything optional except identity + picks" shape is correct and survives first contact. No friction.

### F3. Grid anti-pattern was wrong — **RESOLVED at C2a.2 checkpoint**

- **Awkward** (original framing): Grid's "passing className that overrides grid-cols-*" anti-pattern's `redirect:` told consumers to "drop Grid and use plain CSS grid utilities directly."
- **Resolution**: User flagged this as a bad rule — the DS preference is "always use Grid; if `columns` doesn't fit, override via `className`, not by dropping Grid for raw utilities." Anti-pattern rewritten:
  - Removed: "passing className that overrides grid-cols-*" — that's now the supported escape hatch, not an anti-pattern.
  - Removed: `reject_when` line "the layout has unequal column weights or fixed column widths (use plain CSS grid utilities…)" — same reason.
  - Added: new anti-pattern flagging the OPPOSITE behavior — "dropping Grid and writing raw `<div className=\"grid grid-cols-…\">` instead of `<Grid className=\"grid-cols-…\">`."
  - Updated `apps/docs/app/components/grid/page.tsx` Alert (the only docs page mentioning the old "use Tailwind grid utilities directly" advice) to match the new policy.
- **Recommendation**: Cross-invariant `ds-layout-no-utility-override` may need refinement — the rule there forbids "flex / overflow / height / max-height utilities passed via className to force a DS layout component's size". That's still correct; the Grid `className` escape hatch is for `grid-cols-*` extension specifically, not for forcing height/overflow. No invariant edit needed. Surface for re-review when C2a.6 / .8 / .9 / .11 author the other members of `ds-layout-no-utility-override`.

### F4. ~~`cross_component_invariants` referencing yet-to-be-authored components~~ — **DROPPED, not friction**

User: dangling references are fine — every component will land before C2a.final. Removed the inline `# Note:` comment from the invariant entry.
