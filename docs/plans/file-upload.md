# FileUpload Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship the DS `FileUpload` component (first instance of a DS upload primitive) — a single-image, storage-agnostic, controlled-value picker with validation, optimistic preview, and i18n-capable copy. Unblocks client migration lanes 2.15 and 2.16 (PochaMenuItemForm FileUpload integration).

**Architecture:** Hybrid control model — consumer owns persisted `value` (`{url, publicId} | null`), component owns transient state (selected File, object URL, isUploading/isRemoving, error). Consumer injects `onUpload`/`onRemove` callbacks; component performs client-side validation, shows optimistic local preview during upload, surfaces all errors through a single inline DS `Alert`. Replace is explicitly blocked — user must remove before uploading a new file (prevents orphan leaks).

**Tech Stack:** React 18 + TypeScript + Tailwind v4 (@theme inline tokens) + vitest + @testing-library/react + DS primitives (`Alert`, `LoadingSpinner`, `Icon`). `cn()` for conditional classes (no CVA — single visual configuration).

---

## Context (read before starting)

- Grill-me output: locked full API, visual spec, error model, test matrix (22 tests). See conversation log or ds#9 body.
- DS primitives used:
  - `@umichkisa-ds/web` → `Alert` (variant="error" for errors), `LoadingSpinner`, `Icon` (registry-driven)
  - Icon names: `"x"` exists ✓; `"upload"` **MUST BE ADDED** to `packages/web/src/components/icon/registry.ts` as part of this plan (lucide `Upload`)
- Alert variant for errors is `"error"` (NOT "destructive" — DS uses info/error). Confirm by reading `packages/web/src/components/feedback/Alert.tsx` during Task 1.
- Docs page layout pattern: study `apps/docs/app/components/dialog/page.tsx` before writing `page.tsx`. Match heading hierarchy, spacing classes, table structure, `ComponentPreview` placement exactly.
- Sidebar config: `apps/docs/lib/nav.ts` — add `{ label: 'File Upload', href: '/components/file-upload' }` to the **Forms** category, alphabetical position between `FormItem` and `Input`.
- Memory constraints to honor:
  - `feedback_api_table_mobile_list` — every API table ships BOTH desktop Table and mobile list
  - `feedback_intro_foreground` — intro paragraphs `text-foreground`, never muted
  - `feedback_blockquote_to_alert` / `feedback_intro_subparagraph_to_alert` — no raw blockquotes; secondary intro paragraphs become Alerts
  - `feedback_h3_first_mt6` — first h3 uses `mt-6`, subsequent `mt-8`
  - `feedback_sejong_display_only` — Sejong only for `type-h1`/`type-display`; component internals are Pretendard via `type-*` tokens
  - `feedback_preview_width` — wrap `ComponentPreview` children with `w-full`
  - `feedback_component_design_language` — rounded-md, 1px borders, compact padding, shadcn-like simplicity

---

## Phase 1 — Component (TDD)

### Files

- **Create:** `packages/web/src/components/form/FileUpload/FileUpload.tsx`
- **Create:** `packages/web/src/components/form/FileUpload/index.ts`
- **Create:** `packages/web/tests/components/form/FileUpload.test.tsx` (tests live in `tests/` tree per project convention, NOT colocated)
- **Modify:** `packages/web/src/index.ts` — append exports
- **Modify:** `packages/web/src/components/icon/registry.ts` — add `"upload": Upload` entry + `import { Upload } from 'lucide-react'`

### Execution rule

**Tests FIRST, then implementation.** Each task below is one TDD cycle:
1. Write the failing test(s)
2. Run `pnpm --filter @umichkisa-ds/web test -- FileUpload` — confirm RED (test fails for the right reason, not a syntax error)
4. Write the minimal implementation to pass
5. Run tests — confirm GREEN
6. `ds-review` agent on changed `.tsx` (Task 1 only needs it on FileUpload.tsx once the skeleton exists; re-run after any structural change)
7. Commit with `test+impl: <what>`

After the test file exists, later tasks can run the full suite (`pnpm test -- FileUpload`) between cycles. Keep commits small — one logical behavior per commit.

---

### Task 0: Add `upload` icon to registry

**Files:**
- Modify: `packages/web/src/components/icon/registry.ts`

**Step 1:** Add import `import { Upload } from 'lucide-react'` alongside existing imports.
**Step 2:** Add `"upload": Upload,` entry in alphabetical position (between `"type"` and `"user-round"`).
**Step 3:** `pnpm --filter @umichkisa-ds/web typecheck` — expect pass.
**Step 4:** Commit: `feat(icon): add upload to registry`.

Per memory `feedback_ds_bump_semver` this is a patch-bump-worthy change (lane 2.4b will publish).

---

### Task 1: Scaffold files + types (no behavior yet)

**Files:**
- Create `FileUpload.tsx` with:
  - All type exports (`FileUploadValue`, `AcceptedMimeType`, `FileUploadMessages`, `FileUploadProps`)
  - `FILE_UPLOAD_MAX_BYTES_DEFAULT` constant
  - Component shell that renders a single `<div>` with `className` forwarded (no interactive behavior)
- Create `index.ts` re-exporting the component + all types + constant
- Modify `packages/web/src/index.ts` to re-export from `./components/form/FileUpload`
- Create `FileUpload.test.tsx` with a single smoke test: `renders without crashing`

**Step 1:** Write smoke test (renders, finds the wrapper div by testid or role). RED (file doesn't exist).
**Step 2:** Scaffold types + empty component. GREEN.
**Step 3:** `pnpm --filter @umichkisa-ds/web typecheck` — must pass. Confirm exports surface at package root (`import { FileUpload } from '@umichkisa-ds/web'` typechecks).
**Step 4:** Commit: `feat(FileUpload): scaffold types + re-exports`.

**ds-review:** Not yet meaningful on an empty component — defer to Task 2.

---

### Task 2: Empty-state trigger (static render + a11y)

**Tests (write first — all should RED):**
- Test: renders trigger as `<button>` with `aria-label="Upload image"` (default) when `value === null`.
- Test: trigger contains `type-label-sm` text `"Click to upload"` and the derived helper `"PNG · JPG · WEBP"`.
- Test: trigger has `disabled` attribute when `disabled={true}` is passed.
- Test: when `value !== null`, trigger `<button>` is NOT in the document (replace-block — Q2).

**Implementation (minimal):**
- Render `<button type="button">` with the locked classes from visual spec (128×128 dashed bordered square).
- Render `<Icon name="upload">` + label + helper derived from `accept` prop.
- Hidden `<input type="file" ref>` with `tabIndex={-1}`, `accept={accept.join(',')}`, `disabled={disabled || isUploading}`, `className="sr-only"`.
- Derive helper text: `accept.map(mimeToShort).join(' · ')` where `mimeToShort('image/png') === 'PNG'`, etc.
- Trigger `onClick` fires `inputRef.current?.click()`.
- When `value !== null`, return null for the trigger branch (populated branch comes in Task 4).

**Step:** test → RED → impl → GREEN → ds-review on FileUpload.tsx → commit.

---

### Task 3: Client-side validation (size + MIME, pre-onUpload)

**Tests (write first):**
- Test: selecting a file with `file.size > maxSize` renders DS Alert containing the default sizeExceeded message; `onUpload` is NOT called.
- Test: selecting a file with MIME outside `accept` renders DS Alert with the default invalidType message; `onUpload` is NOT called.
- Test: after an error, clicking the trigger again clears the error (Alert unmounts). (Use `userEvent.click` on trigger.)
- Test: custom `messages.sizeExceeded(maxBytes)` function is called with the `maxSize` arg and its return is rendered.

**Implementation:**
- `onChange` handler on hidden input reads `e.target.files?.[0]`.
- Validate size against `maxSize` (default `FILE_UPLOAD_MAX_BYTES_DEFAULT`). On fail, `setError(messages?.sizeExceeded?.(maxSize) ?? DEFAULT_SIZE_MSG(maxSize))`.
- Validate `file.type` ∈ `accept`. On fail, `setError(messages?.invalidType?.(accept) ?? DEFAULT_MIME_MSG(accept))`.
- Render `<Alert variant="error" role="alert">{error}</Alert>` below the 128-square when `error !== null`.
- Trigger `onClick` clears error before opening picker.

**DEFAULT_SIZE_MSG / DEFAULT_MIME_MSG** are module-local helpers — English copy, produce readable strings like `"File exceeds ${mb}MB limit"` and `"Only PNG, JPG, WEBP are allowed"`.

**Step:** tests → RED → impl → GREEN → commit.

---

### Task 4: Upload happy path + optimistic preview

**Tests (write first):**
- Test: selecting a valid file calls `onUpload(file)` exactly once (spy).
- Test: during pending upload, the 128-square renders an `<img>` with an object-URL src AND a spinner overlay (assert both present by role/testid).
- Test: during pending upload, trigger button is not in the DOM (replaced by preview-with-spinner layout).
- Test: on `onUpload` resolve, `onChange` is called with the returned `{url, publicId}` exactly once.
- Test: `URL.revokeObjectURL` is called with the object URL after `onUpload` resolves (spy `URL.createObjectURL` + `URL.revokeObjectURL`).
- Test: after `onUpload` resolves, internal `isUploading` is false (Task 4 assertion is implicit — covered by the value-controlled render branch taking over).

**Implementation:**
- Add state: `const [pending, setPending] = useState<{ file: File; blobUrl: string } | null>(null)`.
- Add state: `const [isUploading, setIsUploading] = useState(false)`.
- On valid file: `const blobUrl = URL.createObjectURL(file); setPending({file, blobUrl}); setIsUploading(true); try { const result = await onUpload(file); onChange(result); } catch (e) { ... } finally { URL.revokeObjectURL(blobUrl); setPending(null); setIsUploading(false); }`
- Render layout during `pending !== null`:
  - `<div className="relative h-32 w-32">` containing `<img src={pending.blobUrl}>` + a `<div className="absolute inset-0 grid place-items-center bg-background/40"><LoadingSpinner/></div>`.
  - The X button is rendered but `disabled` (prepare for Task 6 integration) — or defer X to Task 5. Choose to defer X entirely until Task 5 to keep this task scoped.
- Wrapper gets `aria-busy={isUploading}`.

**Step:** tests → RED → impl → GREEN → commit.

---

### Task 5: Upload failure surfacing

**Tests (write first):**
- Test: `onUpload` rejects with `new Error("Specific message")` → Alert shows "Specific message"; `onChange` NOT called; slot reverts to empty (no preview); object URL revoked.
- Test: `onUpload` rejects with `new Error("")` (empty message) → Alert shows `messages?.uploadFailed ?? DEFAULT_UPLOAD_FAILED`.
- Test: custom `messages.uploadFailed` is used when rejection message is empty.

**Implementation:**
- In the `catch (e)` branch: `setError(e instanceof Error && e.message ? e.message : (messages?.uploadFailed ?? DEFAULT_UPLOAD_FAILED))`.
- Ensure `finally` still revokes object URL and clears pending (already from Task 4 — verify).

**Step:** tests → RED → impl → GREEN → commit.

---

### Task 6: Populated-state (`value !== null`) render + X remove

**Tests (write first):**
- Test: when `value={{ url: "http://...", publicId: "abc" }}`, renders `<img src="http://...">` with object-cover 128×128 classes.
- Test: X button is rendered with `aria-label="Remove image"` (default) absolutely positioned top-right.
- Test: trigger button is NOT rendered (covered in Task 2 but assert again here for populated branch).
- Test: clicking X calls `onRemove(value.publicId)` exactly once.
- Test: during pending remove, X button shows a spinner icon in place of the X (disabled, loses pointer events).
- Test: on `onRemove` resolve, `onChange(null)` is called.
- Test: on `onRemove` reject with `new Error("X")`, Alert shows "X"; `onChange` NOT called; X reverts to normal icon.
- Test: on `onRemove` reject with empty message, Alert shows `messages?.removeFailed ?? DEFAULT_REMOVE_FAILED`.
- Test: custom `messages.removeLabel` is used for X aria-label.

**Implementation:**
- Branch: when `value !== null` AND `pending === null`, render `<img src={value.url}>` + `<button aria-label={messages?.removeLabel ?? 'Remove image'}>` with the X-spinner swap based on `isRemoving` state.
- `handleRemove`: `setIsRemoving(true); setError(null); try { await onRemove(value.publicId); onChange(null); } catch (e) { setError(...) } finally { setIsRemoving(false); }`
- X button disabled during `isRemoving` OR `disabled` prop.

**Step:** tests → RED → impl → GREEN → commit.

---

### Task 7: Disabled state + final a11y polish

**Tests (write first):**
- Test: `disabled={true}` + empty → trigger has `disabled` attribute; clicking it does not open file picker (spy that `inputRef.click()` isn't called — or assert input is also `disabled`).
- Test: `disabled={true}` + populated → X button has `disabled` attribute.
- Test: wrapper has `aria-busy={true}` during upload.
- Test: wrapper has `aria-describedby` pointing at the Alert's id when error is present.

**Implementation:**
- Thread `disabled` through trigger, X, and hidden input.
- Compute `aria-busy = isUploading`.
- Generate Alert id via `useId()`; set `aria-describedby` when error is non-null.

**Step:** tests → RED → impl → GREEN → commit.

---

### Task 8: Phase 1 validation gate

- Run `pnpm --filter @umichkisa-ds/web test` — ALL FileUpload tests GREEN.
- Run `pnpm typecheck` at repo root — pass.
- Run `pnpm build` at repo root — pass (typechecks + tsup + tailwind).
- Invoke `ds-review` agent on `FileUpload.tsx` — must pass; address any violation in a follow-up commit (hard stop if violations persist after 2 ds-review rounds — escalate).
- Commit any fixes as `fix(FileUpload): ds-review polish`.

**Phase 1 complete when:** all 22 tests GREEN + typecheck + build + ds-review clean.

---

## Phase 2 — Docs Page + Sidebar

### Files

- **Create:** `apps/docs/app/components/file-upload/page.tsx`
- **Create:** `apps/docs/app/components/file-upload/preview.tsx`
- **Modify:** `apps/docs/lib/nav.ts` — add Forms entry

### Task 9: Study reference + scaffold preview

**Read:** `apps/docs/app/components/dialog/page.tsx` top-to-bottom. Note the exact pattern: imports, heading classes, spacing between sections, table structure, `ComponentPreview` wrapper classes. Match it.

**Create `preview.tsx`:**
- Export `FileUploadDemo` — uses `useState<FileUploadValue|null>(null)` locally.
- Mock `onUpload`: `return new Promise(resolve => setTimeout(() => resolve({url: 'https://placehold.co/200', publicId: 'mock-id-' + Date.now()}), 1500))`.
- Mock `onRemove`: `return new Promise(resolve => setTimeout(resolve, 800))`.
- Also export variants: `FileUploadDisabledDemo`, `FileUploadKoreanDemo`, `FileUploadRestrictedDemo` (PNG-only, 1MB).
- All demos wrap their FileUpload in `<div className="w-full flex justify-center py-6">` per `feedback_preview_width`.

**Commit:** `feat(docs): FileUpload preview demos`.

---

### Task 10: Docs page

**Create `page.tsx` with these sections (matching dialog/page.tsx layout):**

1. **Header block**
   - `<h1 className="type-h1">File Upload</h1>`
   - Intro paragraph `<p className="type-body-lg text-foreground mt-2">` — describe: storage-agnostic DS primitive for single-image upload with optimistic preview.
   - `<Alert variant="info" className="mt-4">` — note about consumer owning `onUpload`/`onRemove` contract; mention Cloudinary is one common backend.

2. **Preview (`mt-8` or per dialog page)**
   - `<ComponentPreview>` wrapping `<div className="w-full flex justify-center"><FileUploadDemo /></div>`.

3. **Usage — `<h2 className="type-h2 mt-12">Usage</h2>`**
   - Minimal `<pre><code>` block showing `import { FileUpload } from '@umichkisa-ds/web'` + basic consumer setup (state, onUpload stub, onRemove stub).

4. **Examples — `<h2 className="type-h2 mt-12">Examples</h2>`**
   - Three subsections, each with `<h3 className="type-h3 mt-6">` (FIRST h3) then `mt-8` for the next two:
     - **Disabled** — `<ComponentPreview><FileUploadDisabledDemo/></ComponentPreview>`
     - **Korean localization** — shows the `messages` prop wiring; doubles as lane 2.16 reference.
     - **Custom accept + maxSize** — PNG-only, 1MB cap.

5. **API Reference — `<h2 className="type-h2 mt-12">API Reference</h2>`**
   - DS `<Table className="hidden md:block">` with rows for: `value`, `onChange`, `onUpload`, `onRemove`, `accept`, `maxSize`, `disabled`, `messages`, `className`.
   - `<TableMobileList className="block md:hidden">` with the same props in mobile list shape (per `feedback_api_table_mobile_list`).
   - Second sub-table (or nested rows) for `FileUploadMessages` keys: `clickToUpload`, `uploadLabel`, `removeLabel`, `sizeExceeded`, `invalidType`, `uploadFailed`, `removeFailed`.

6. **Behavior — `<h2 className="type-h2 mt-12">Behavior</h2>`**
   - `<h3 className="type-h3 mt-6">Lifecycle</h3>` — empty → validation → optimistic preview + spinner → populated (or error + revert). Prose.
   - `<h3 className="type-h3 mt-8">Replace flow</h3>` — user must remove before uploading a new file (block semantics). Rationale: orphan safety.
   - `<h3 className="type-h3 mt-8">Error surfacing</h3>` — size/MIME use `messages` defaults; `onUpload`/`onRemove` rejections prefer `err.message` with fallback to `messages.uploadFailed`/`removeFailed`.
   - `<h3 className="type-h3 mt-8">Orphan cleanup responsibility</h3>` — component only calls `onRemove`; consumer's handler must actually delete from storage.

**No Accessibility h3.** (Matches dialog page brevity; a11y details are implicit in the API table.)

**ds-review:** run on `page.tsx` AND `preview.tsx`. Fix violations before committing.

**Commit:** `docs: FileUpload page + examples`.

---

### Task 11: Sidebar entry

**Modify `apps/docs/lib/nav.ts`:**
- In the `Forms` category of `COMPONENT_CATEGORIES`, insert `{ label: 'File Upload', href: '/components/file-upload' }` between `FormItem` and `Input` (alphabetical).

**Step:** edit → visit `http://<tunnel>/components/file-upload` in browser (dev server if running) → confirm sidebar shows link and page renders → commit: `docs: add FileUpload to sidebar nav`.

---

### Task 12: Phase 2 validation gate

- `pnpm --filter @umichkisa-ds/docs typecheck` (or repo-root typecheck) — pass
- `pnpm build` at repo root — pass
- Visual check in browser: empty, uploading (via mock), populated, remove, error states all render correctly
- `ds-review` clean on docs files

**Phase 2 complete when:** docs page renders correctly + ds-review clean + sidebar entry present + builds pass.

---

## Risks / Bailout triggers

| Risk | Trigger | Action |
|---|---|---|
| **`upload` icon missing from registry** | Confirmed at plan time | Task 0 adds it. Not a bailout. |
| **`Alert` variant="destructive" doesn't exist** | Confirmed — DS uses `variant="error"` | Plan uses `"error"`. Not a bailout. |
| **`lucide-react` `Upload` icon unavailable** | Import fails in Task 0 | Bailout — surface to user; pick an alternative icon or update lucide-react |
| **vitest + RTL not configured in packages/web** | Confirmed present (devDeps). If any test-setup file is missing (e.g., `vitest.config.ts` or `@testing-library/jest-dom` setup), bailout | Check `packages/web/vitest.config.*` + `packages/web/src/test-setup.ts` or equivalent exists BEFORE Task 2. If missing, pause and ask user. |
| **`ComponentPreview` component doesn't exist in docs app** | Task 10 | Read `apps/docs/components/ComponentPreview.tsx` (or equivalent) first. If not present, use same wrapper pattern as dialog page. |
| **`Table` / `TableMobileList` missing or shaped differently** | Task 10 | Match whatever dialog page uses. If dialog doesn't have a mobile list, this may be a precedent to set — follow `feedback_api_table_mobile_list` anyway. |
| **DS `ds-review` agent flags CVA-absence or suggests CVA** | Task 8 or later | Push back — single visual config, no variant matrix. If reviewer insists, reconvene with user. |
| **Tests reveal an API ambiguity** | Any task | Surface to user — do not silently revise the locked API. |

---

## Non-goals (do NOT implement)

- Multi-file uploads
- Drag-and-drop
- Cropping / image manipulation
- Progress percentage (spinner only)
- `<input name>` / native form-post integration
- `forwardRef`
- `renderError` / render-prop error slot
- Label / description / helper props (those belong to FormField)
- Non-image MIME types (PDF, etc.)

---

## References

- Issue: [ds#9 — Phase 2 / 2.4 DS FileUpload component](https://github.com/KISA-webpage-development-team/umichkisa-ds/issues/9)
- Phase plan: `docs/plans/client-migration/phase-2-pocha-manage/plan.md` — Lane 2.4
- Phase audit: `docs/plans/client-migration/phase-2-pocha-manage/audit.md` — Q5, §3 risk #2
- DS constraints: `docs/DS_CONSTRAINTS.md`
- DS components registry: `docs/DS_CODEBASE.md`
- Dialog docs page (layout reference): `apps/docs/app/components/dialog/page.tsx`
- Client reference (to be replaced in lane 2.16): `../KISA-website/client/src/features/pocha/components/manage/PochaMenuItemForm.tsx` lines 380–435
- Memory: `feedback_api_table_mobile_list`, `feedback_intro_foreground`, `feedback_blockquote_to_alert`, `feedback_intro_subparagraph_to_alert`, `feedback_h3_first_mt6`, `feedback_sejong_display_only`, `feedback_preview_width`, `feedback_component_design_language`, `feedback_ds_bump_semver`
