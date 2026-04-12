# Phase 1.2 — Job Detail: Notes

## DS Fixes

DS FIX: Added missing `loading?: boolean` prop to `Button` — was typed as absent (effectively `never`), causing client code using `<Button loading={isSubmitting}>` to error with "Type 'boolean' is not assignable to type 'never'". Fix renders `LoadingSpinner size="sm"` inline and sets `disabled` + `aria-busy` when true. (commit e2f6ba3)
