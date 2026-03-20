# KISA Design System — V1 Roadmap

## Strategy

Build every component from DS documentation and architecture (Tailwind v4 CVA + OKLCH tokens).
Use the client app (`../KISA-website/client/`) as a **requirements reference only** — not an implementation template.

**Definition of done per component:** implement → docs MDX page → live iframe preview in docs.

---

## Bootstrapping Phase (do first, once)

- [ ] **Step -1 — Full DS Documentation Review**
  - Re-read all foundation docs end-to-end: colors, typography, layout, iconography
  - Pay special attention to the colors doc — verify the three-tier model, OKLCH values, and semantic naming are all consistent and complete
  - Flag any gaps, contradictions, or undocumented decisions before touching any code
  - Reference: `apps/docs/content/foundation/`

- [ ] **Step 0 — Token & Styles Audit**
  - Review `packages/web/src/tokens/primitives.css` and `semantic.css` against the DS foundation docs (colors, typography, spacing, iconography)
  - Review `packages/web/src/styles/index.css` (type-* utilities, base layer) against typography DS docs
  - Fix any mismatches, missing tokens, or naming inconsistencies before any component work begins
  - Reference docs: `apps/docs/content/foundation/` (colors, typography, layout, iconography)

- [ ] **Step 1 — Icon Implementation**
  - Replace all 19 hand-crafted SVG icon components with a Lucide-based `Icon` wrapper
  - DS docs define Lucide as the single source of truth (`apps/docs/content/foundation/iconography/`)
  - Output: `packages/web/src/components/icon/Icon.tsx` + updated exports

- [ ] **Step 2 — Icon Docs Page (establishes the standard)**
  - First component documentation page — becomes the **MDX template** all future docs follow
  - Include: overview, props table, usage examples, code snippets, visual preview
  - Output: `apps/docs/content/components/icon.mdx`

- [ ] **Step 3 — Iframe Preview Infrastructure**
  - Set up live component rendering inside the docs site
  - Output: reusable preview setup usable by all future component docs pages

- [ ] **Step 4 — Component Skill**
  - Codify the full flow (implement → document → preview) as a Claude skill
  - Every future component session runs through this skill automatically

---

## Component Order (34 total)

Work through these one per session, human-in-loop, using the skill from Step 4.

- [ ] 1. `Icon` — foundation
- [ ] 2. `Button` — action
- [ ] 3. `IconButton` — action
- [ ] 4. `LinkButton` — action
- [ ] 5. `ImageButton` — action
- [ ] 6. `Badge` — display
- [ ] 7. `Avatar` — display
- [ ] 8. `Input` — form
- [ ] 9. `Textarea` — form
- [ ] 10. `Select` — form
- [ ] 11. `Checkbox` — form
- [ ] 12. `Radio` — form
- [ ] 13. `Switch` — form
- [ ] 14. `Label` — form
- [ ] 15. `FormItem` — form
- [ ] 16. `Divider` — layout
- [ ] 17. `Container` — layout
- [ ] 18. `Grid` — layout
- [ ] 19. `Tabs` — navigation
- [ ] 20. `Tooltip` — overlay
- [ ] 21. `Popover` — overlay
- [ ] 22. `Dropdown` — overlay
- [ ] 23. `Dialog` — overlay
- [ ] 24. `Skeleton` — feedback
- [ ] 25. `LoadingSpinner` — feedback
- [ ] 26. `Alert` — feedback
- [ ] 27. `Toast` — feedback
- [ ] 28. `NotFound` / `NotAuthorized` / `NotLogin` / `UnexpectedError` — feedback
- [ ] 29. `Card` — display
- [ ] 30. `Accordion` — disclosure
- [ ] 31. `Pagination` — navigation
- [ ] 32. `Table` — data
- [ ] 33. `Calendar` — form
- [ ] 34. `DatePicker` — form

---

## Key Files

| Purpose | Path |
|---|---|
| Codebase notes | `docs/NOTES.md` |
| Token primitives | `packages/web/src/tokens/primitives.css` |
| Token semantic | `packages/web/src/tokens/semantic.css` |
| Styles entry | `packages/web/src/styles/index.css` |
| Component exports | `packages/web/src/index.ts` |
| Docs content (components) | `apps/docs/content/components/` (currently empty) |
| Iconography DS docs | `apps/docs/content/foundation/iconography/` |
| Layout component spec | `apps/docs/content/_layout-implementation.md` |
| Reference client | `../KISA-website/client/src/components/ui/` |
