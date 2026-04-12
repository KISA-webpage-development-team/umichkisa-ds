# DS Fixes Log

Accumulator for DS fixes made during client migration. Grouped by package, entries tagged with phase.

## @umichkisa-ds/web

<!-- Entry format:
- **[Phase N.M]** Brief description of fix (commit SHA) -->
- **[Phase 1.2]** Added missing `loading?: boolean` to `ButtonProps` — prop was absent causing "Type 'boolean' is not assignable to type 'never'" in client. Renders `LoadingSpinner size="sm"` inline; sets `disabled` + `aria-busy` when true. (commit e2f6ba3)

## @umichkisa-ds/form

<!-- Entry format:
- **[Phase N.M]** Brief description of fix (commit SHA) -->
