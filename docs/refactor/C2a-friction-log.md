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

---

## C2a.5 — Triggering actions group (Button, IconButton, LinkButton)

### F5. Button uses `!font-bold` to override `type-body[-sm]` weight — DS itself violates USAGE.md p2-tk-3 candidate

- **Awkward**: Button's primary / secondary / destructive variants apply `!font-bold` to override the `type-body[-sm]` class's regular weight. USAGE rule `p2-tk-3` (carried forward from old DS_CLIENT_USAGE.md) says "Never: Override type-* weight with `!font-*`" — but DS-side code is itself doing this in Button.tsx, by design. PHASE-A-SUMMARY §6 deferred action 3 already flagged this rule for relaxation in Phase C USAGE.md authoring. MEMORY entry `feedback_type_weight_override` confirms `!font-*` overrides are sometimes necessary because `type-*` classes lock weight.
- **Handled**: Logged the pre-existing `!font-bold` in Button's `intrinsic_behavior` ("primary / secondary / destructive variants apply `!font-bold` to override the underlying `type-body[-sm]` class weight (intentional contract — Button text is heavier than body text by design)"). Did NOT add an anti-pattern about `!font-*` to USAGE — that's C2b.
- **Recommendation**: When C2b authors USAGE.md, the `!font-*` override rule must be relaxed (drop p2-tk-3, drop p2-tk-4 carve-out) per A2 decision 3 + A3 input. The DS itself depends on `!font-*` for variant-weight contracts.

### F6. IconButton's TypeScript-enforced `aria-label` — **RESOLVED at C2a.5 checkpoint**

- **Awkward**: IconButton's TS type marks `aria-label: string` as required. A2 `notable_props` had no `required` field; requirement was captured only in prose `pick_guidance`.
- **Resolution**: User confirmed adding `required: true` to A2 schema. Applied:
  - `A2-component-schema.md` §Schema — `required: true` added to `notable_props.<entry>` block (OPTIONAL, default false)
  - `A2-component-schema.md` §Authoring disciplines (item 3) — added the rule "mark `required: true` on every prop the TypeScript type marks as required (no `?`)"
  - `COMPONENT.md` retrofitted: `Icon.name`, `IconButton.icon`, `IconButton.aria-label` carry `required: true`
- **Going forward**: Every future C2a entry checks the TS type and emits `required: true` for every non-`?` prop in `notable_props`.

---

## C2a.6 — Display group (Card, Table, Accordion, Badge, Avatar, Divider)

### F7. A1 inventory missed `TableMobileItem` and Accordion's compound parts — **RESOLVED at C2a.6 checkpoint**

- **Awkward**: A1's Table entry listed only `TableMobileList`; actual surface also exports `TableMobileItem`, plus the full `TableHeader`/`Body`/`Row`/`Head`/`Cell`/`Footer`/`Caption` family. A1 listed Accordion's `compound_parts: null`; actual surface ships `AccordionItem` / `AccordionTrigger` / `AccordionContent` as required children.
- **Resolution**:
  - `A1-inventory.md` Table + Accordion entries fixed to enumerate full compound-parts.
  - `A2-component-schema.md` Authoring disciplines — added item 6: "`compound_parts` mirrors the live source, not A1." Going forward, every entry's compound parts come from the `.tsx` source; A1 disagreements get fixed in the same commit.
- **Going forward (carry-over to C2a.7+)**: Verify Dialog, Dropdown, Popover, Tooltip (Radix-backed — likely have Trigger/Content/etc. children); RadioGroup, Tabs in their respective groups. A1's `null` for these may also be wrong.

### F8. CardTitle uses `!font-semibold` — same root cause as F5

Recorded for completeness: CardTitle (`type-h4 !font-semibold text-foreground …`) and Table TableHead (`!font-medium`) both rely on the `!font-*` override pattern. Same resolution as F5 — relax `p2-tk-3` when C2b authors USAGE.md.

---

## C2a.7 — Feedback group (Alert, Toaster, StatusView, LoadingSpinner, Skeleton)

### F9. A1's StatusView variant list included a `loading` variant that doesn't exist in source

- **Awkward**: A1 listed StatusView variants as `[not-authorized, not-found, not-logged-in, error, loading]`. Live source has only 4 — no `loading` variant. (Loading states route through `LoadingSpinner` / `Skeleton` instead, which makes more sense.)
- **Handled**: Updated A1 inventory to the correct 4-variant list and expanded `notable_props` from `[fullScreen]` to the full set (`[fullScreen, code, icon, title, description, action]`). Authored COMPONENT.md against the live source.
- **Recommendation**: Same pattern as F7 — A1 baseline drifts; live source wins; A1 gets fixed in the same commit.

---

## C2a.8 — Overlays group (Dialog, Dropdown, Popover, Tooltip)

### F10. A1 missed compound parts on every Radix-backed overlay (Dialog, Dropdown, Popover) — RESOLVED

- **Awkward**: A1 listed `compound_parts: null` for Dialog, Dropdown, and Popover. Live surface exports 6 / 5 / 2 compound parts respectively.
- **Resolution**: A1 inventory updated for all three with the live compound-part lists. Tooltip kept at `null` — Tooltip.tsx genuinely has no exposed compound parts (uses `content: string` prop + `children` as the trigger; Radix Provider/Root/Trigger/Portal/Content are internal). COMPONENT.md authored against live source.
- **Carry-over**: Same pattern likely on RadioGroup (C2a.10) and Tabs (C2a.9 — already correct in A1, but verify against source).

---

## C2a.10 — Web Form components group (Input, Textarea, Select, Checkbox, RadioGroup, Switch, Label, FormItem, FileUpload, DatePicker, DateRangePicker)

### F11. A1 missed Select's full compound-part family — RESOLVED

- **Awkward**: A1 listed `Select` with `compound_parts: null`. Live `form/Select.tsx` exports `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectSeparator` — 5 compound parts (3 required, 2 optional). Same shape as F10 (Radix-backed overlays missed by A1).
- **Resolution**: A1 inventory updated to enumerate the full Select compound family. COMPONENT.md authored against live source. RadioGroup verified — A1 was correct (only `RadioItem`).
- **Status**: F7 + F10 + F11 cluster confirms the A1 baseline systematically misses Radix-backed compound parts. Per A2 discipline 6 ("compound_parts mirrors the live source, not A1"), no further action needed beyond the in-place fixes — but recommend C2a.final calls this out as the single largest A1-trust pattern surfaced during C2a.

### F12. FormItem aria wiring is consumer-owned for non-native triggers — invariant captured, no schema change

- **Awkward**: FormItem auto-generates `${htmlFor}-description` / `${htmlFor}-error` ids but cannot reach into children to set `aria-describedby` / `aria-errormessage` / `aria-labelledby` on non-native triggers (Select, DatePicker, RadioGroup). For Form.X members the wiring lives in the wrapper; for bare-FormItem usage the consumer must wire it.
- **Handled**: Captured as cross-invariant `formitem-htmlfor-aria-wiring` (detection: static). FormItem's `intrinsic_behavior` notes the id-generation contract; the invariant carries the full wiring rule with reasoning. No schema change needed — A2 already supports `cross_component_invariants` with `detection: static`.
- **Recommendation**: Surface this as a USAGE.md must-rule when C2b authors USAGE — bare-FormItem composition is a real consumer pattern (header search bars, ad-hoc filter rows) and the aria wiring is silently broken when missed.
