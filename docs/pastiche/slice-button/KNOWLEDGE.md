# KNOWLEDGE

Scenario → atom mappings curated by designers and frontend engineers. The implementer's primary reference: given a task, find the fitting scenarios here and use the atoms they prescribe. If no scenario fits, fall back to raw HTML / Tailwind — do not speculate.

The full KNOWLEDGE.md also opens with a **Brand Identity** prose section (descriptive aesthetic spirit). Out of scope for this vertical slice; lives at the top of the real file alongside scenario categories.

---

## Action buttons

### Primary action / main CTA
Submit a form, confirm a modal, advance a flow. The dominant action on the surface.
→ `Button variant="primary"`

### Secondary action
Cancel, "Back", alternative path alongside a primary. Lower visual weight than primary.
→ `Button variant="secondary"`

### Low-emphasis inline action
Action embedded in dense UI (table rows, list headers) that should not compete with surrounding content.
→ `Button variant="tertiary"`

### Destructive action
Delete, remove, irreversible state change. Always paired with a confirmation step.
→ `Button variant="destructive"`

### Icon-only action
Close, edit, more-menu, toolbar action where text would be redundant or space-constrained.
→ `IconButton` with `aria-label` (wrap in `Tooltip` for sighted users where the icon's meaning is not obvious from context — tooltip text must match `aria-label`)

### Anchor styled as a button
External link, navigation that visually presents as a CTA, link inside a button-shaped slot.
→ `LinkButton`
