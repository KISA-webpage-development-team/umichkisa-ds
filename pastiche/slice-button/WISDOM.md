<!-- Atom-intrinsic rules. Tag format: [Atom1][Atom2] rule text. -->

- [Button] Default `type` is `"button"`. Inside a `<form>`, set `type="submit"` explicitly on the submit button.
- [Button] Variants `primary`, `secondary`, `destructive` apply `!font-bold`; `tertiary` does not. Overriding font weight via className requires `!font-` to win specificity.
- [Button][IconButton][LinkButton] Dual-ring focus (outline + box-shadow) is built into `buttonVariants`; never override or remove it via className.
- [IconButton] `aria-label` is required by the type. Provide a phrase that names the action ("Close", "Edit profile"), not the icon ("X icon").
- [IconButton] When wrapping in `Tooltip` for sighted users, tooltip content must match `aria-label` exactly to avoid duplicate screen reader announcements.
- [LinkButton] When `disabled`, renders `<span role="link" aria-disabled="true">` instead of `<a>`; anchor-only props (e.g. `href`, `target`) are dropped in this branch.
- [Button][IconButton][LinkButton] Do not wrap or re-export to add default props or rename (e.g. no `MyButton`); this creates a shadow component layer that drifts from the DS.
