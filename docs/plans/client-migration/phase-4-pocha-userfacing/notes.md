# Phase 4 — pocha-userfacing — Notes

Append-only breadcrumb log: DS bugs found, decision changes, blockers, user feedback.

---

## 2026-05-02 — Mode A audit kickoff

- `/pocha/history` excluded from Phase 4 scope (admin-only; folded into new Phase 5).
- Phase renumber: original Phase 5 (`kisa-web`) shifts to Phase 6; new Phase 5 = admin-pocha consolidation.
- `POCHA_THEME` flipped `spring` → `default` on client `dev` (commit `eac2afb`) before audit write.
- Tip flow excised from pay-success per Q6 — `TipModal.tsx` and localStorage payment-method scaffolding deleted in 4.6. Reversible via git.
- Stripe handling: MockPayButton swap in mock mode; Stripe not mocked. Smoke real Stripe path manually before any `dev → main` ship.
