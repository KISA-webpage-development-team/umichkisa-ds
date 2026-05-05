# RSVP Page — Spec

## Purpose

KISA hosts events throughout the year (general meetings, banquets, cultural nights, networking dinners). Members need a simple page where they can RSVP for a specific upcoming event and where organizers can convey what the event is about.

For this experiment, the page is a single self-contained surface — one event, one form, one confirmation state. No event list, no admin view, no auth.

## Audience

KISA members and prospective attendees. Most are UMich undergraduates; a non-trivial slice prefers Korean. Page should feel approachable but organized.

## What the page must convey

1. **Event identity** — title, date/time, location, a short description that sets expectations (dress code, what to bring, who's invited).
2. **A clear primary action** — submit an RSVP. The user should never have to hunt for it.
3. **Required information from the attendee** — at minimum: name, UMich email, attendance choice (yes / no / maybe), party size (1–6), dietary restrictions (free text, optional), a note to the organizer (optional).
4. **Confirmation that the RSVP was recorded** — after submit, the user must see their submission was captured and what they submitted.
5. **Allow re-submission** — users may change their mind. Submitting again overwrites the previous response for the same email.

## Functional requirements

### Form behavior

- All required fields validated client-side before submit. Empty required field → inline error on the field; submit disabled or surfaces a top-of-form summary on attempted submit.
- Email must look like an email. Party size is an integer 1–6.
- Attendance choice is exclusive: one of `yes` / `no` / `maybe`. Default unselected.
- Dietary restrictions and note are free text; cap each at a reasonable length (~280 chars).
- Submit button shows a loading/pending state while the "API call" is in flight (simulate a 600–900ms delay).

### Persistence

- On submit success, persist the submission to `localStorage` under a deterministic key (e.g. `rsvp:<event-slug>:<email>`).
- Also write a console log: `API call made to the server` (verbatim string), as if the page were posting to a real backend. Assume the server exists; do not actually fetch anything.
- On mount, if a submission exists in `localStorage` for this event + email combination, the page may pre-fill the form from it (nice-to-have, not required for the experiment).

### Confirmation state

- After successful submit, transition to a confirmation view that shows: a success indicator, a summary of what was submitted (name, attendance, party size, dietary restrictions if any, note if any), and an affordance to edit / resubmit.
- "Edit" returns to the form, pre-filled with the prior submission.

### Error states

- Field-level validation errors visible next to each field.
- A simulated submit failure path is **not** required for this experiment — the "API call" always succeeds after the delay.

### Empty / loading states

- First load: form is interactive immediately (no skeleton needed for this static event).
- Submit pending: button reflects pending; form fields disabled during the delay.

## The event (hard-coded for this page)

```
Title:       KISA Spring Banquet 2026
Date/Time:   Saturday, May 16, 2026 — 6:00 PM
Location:    Michigan League Ballroom, 911 N University Ave, Ann Arbor
Dress code:  Semi-formal
Description: Annual KISA spring banquet — dinner, performances, awards.
             Open to KISA members and guests. Tickets included.
RSVP by:     Friday, May 9, 2026
```

This data is hard-coded into the page; no fetching.

## Out of scope

- Authentication, server-side persistence, email confirmation.
- Multi-event listing, calendar integration, capacity limits.
- Admin / organizer view of who RSVPed.
- i18n switching (page may be English-primary; Korean accents welcome but not required).
- Analytics, tracking.

## Success criteria

A KISA member can land on the page, read what the event is, fill the form, see validation if they try to submit something invalid, submit a valid RSVP, see their confirmation, and reload the page without losing the record. The console shows `API call made to the server` exactly once per successful submit.
