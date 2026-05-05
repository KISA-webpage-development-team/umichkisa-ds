# RSVP Page — Implementation Plan

This plan describes **what** to build and the **logic** it must implement. It deliberately does not name design-system tokens, components, or class utilities — atom selection is the implementer's job.

Work happens on the `pastiche-experiment` branch off `dev` in the client repo (`KISA-website/client`).

Refer to `rsvp_spec.md` for product context and the hard-coded event data.

---

## Scope

A single Next.js App Router page that renders an event description and an RSVP form, validates input, simulates a server submission, persists to `localStorage`, and shows a confirmation view on success. Re-submission allowed.

## Deliverables

- A new page under `src/app/(main)/<route>/page.tsx` (the dispatch will name the route — e.g. `/pastiche-rsvp` or `/superpowers-rsvp`).
- Any colocated components / hooks the implementer chooses to extract, under the same route folder (e.g. `_components/`, `_hooks/`).
- No changes to shared layout, routing config, or global CSS unless strictly required.

## Page composition (logical regions)

The page is one vertical document. Break it into these regions in order:

1. **Page header** — page title and a one-line subtitle clarifying that this is the RSVP surface.
2. **Event summary** — renders the hard-coded event: title, date/time, location, dress code, description, RSVP-by date.
3. **RSVP form** — the interactive region; collects the fields enumerated in the spec.
4. **Confirmation view** — replaces the form region after a successful submit. Shows the captured response and an edit affordance.
5. **Footer / fine print** — a single line acknowledging the data is stored locally for this demo.

Regions 3 and 4 are mutually exclusive — exactly one is visible at a time, controlled by component state.

## Form fields

| Field | Type | Required | Validation |
|---|---|:---:|---|
| Full name | single-line text | yes | non-empty after trim |
| UMich email | single-line text | yes | non-empty AND matches a basic email shape (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) |
| Attendance | exclusive selection of `yes` / `no` / `maybe` | yes | one option must be selected |
| Party size | integer 1–6 | yes (only if attendance is `yes` or `maybe`) | integer in [1, 6] |
| Dietary restrictions | multi-line text | no | length ≤ 280 |
| Note to organizer | multi-line text | no | length ≤ 280 |

When attendance is `no`, party size is hidden (or disabled) and not validated.

## State model

The form is a single client component. Suggested shape — implementer may adapt:

```ts
type Attendance = "yes" | "no" | "maybe";

type FormState = {
  fullName: string;
  email: string;
  attendance: Attendance | null;
  partySize: number | null;       // null when attendance === "no"
  dietary: string;
  note: string;
};

type Phase =
  | { kind: "editing"; errors: Partial<Record<keyof FormState, string>> }
  | { kind: "submitting" }
  | { kind: "confirmed"; submitted: FormState };
```

Phase transitions:

- `editing → submitting` on a valid submit.
- `submitting → confirmed` after the simulated delay.
- `confirmed → editing` when user clicks "Edit" (prefill from `submitted`).

## Validation behavior

- Validation runs on submit, not on every keystroke. (Implementers may additionally clear a field's error as the user types in it; not required.)
- On invalid submit, set `errors` per-field and keep the form in `editing`. The first invalid field should receive focus.
- Field-level error messages render adjacent to their field.

## Submission flow

On a valid submit:

1. Set phase to `submitting`. Disable form inputs and the submit control.
2. `await new Promise(r => setTimeout(r, 600 + Math.random() * 300))` — simulate latency.
3. `console.log("API call made to the server")` (exact string).
4. Write to `localStorage` under key `rsvp:kisa-spring-banquet-2026:<lowercased-email>`. Value is the serialized `FormState` plus a `submittedAt` ISO timestamp.
5. Set phase to `confirmed` with the submitted snapshot.

## Persistence and prefill

- On mount, **after** the user types or selects an email that matches a stored key, the form *may* prefill from the stored record (nice-to-have, not required). Simpler acceptable behavior: do not prefill on mount; prefill only when the user clicks "Edit" from the confirmation view (in which case the snapshot is already in component state).
- Re-submission for the same email overwrites the stored record.

## Confirmation view content

- A clear success indicator (icon or marker + heading text).
- A read-only summary of the submitted fields. Skip empty optional fields rather than showing "—".
- An "Edit response" affordance that returns to the form.

## Accessibility floor

- All form controls have associated labels.
- The submit control communicates its pending state to assistive tech (e.g. `aria-busy`, or a textual change).
- Error messages are associated with their fields (e.g. `aria-describedby`).
- Focus moves to the first invalid field on a failed submit attempt.

These are floor requirements; the design system may have stricter rules that take precedence.

## Non-goals (do not do)

- Do not add a real `fetch` call; the console log is the contract.
- Do not introduce a global store, context provider, or external form library unless one is already idiomatic in this codebase. Prefer component-local state for this single form.
- Do not add tests in this experiment branch — we are measuring single-pass implementation quality.
- Do not edit unrelated files (no formatter sweeps, no shared component edits).

## Definition of done

- Route renders without error.
- Submitting a fully valid form transitions to the confirmation view, logs the exact console string once, and writes to `localStorage`.
- Submitting an invalid form surfaces field-level errors and does not advance.
- Reloading the page after submit retains the localStorage record (verifiable via DevTools).
- TypeScript compiles cleanly for the new page.

## Branch & route

- Branch: `pastiche-experiment` (already created off `origin/dev`).
- The route slug is supplied at dispatch time; touch only that route's folder.
