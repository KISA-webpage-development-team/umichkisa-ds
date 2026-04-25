# Lane 2.19 Fixups Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Resolve 10 of 11 Toss Frontend Fundamentals violations found during Lane 2.19's pocha-manage audit (P12 deferred).

**Architecture:** Pure refactor — no behavior changes. All edits land directly on `lane/2.19-audit-after` in the client repo, one commit per task, push to `dev` at the end (Mode D direct push per `feedback_interactive_direct_push`). No worktree (Mode D per `feedback_no_worktree_interactive`). No new unit tests — existing pocha-manage components have no test coverage and these are mechanical refactors; verification is `npm run typecheck` per task + final user smoke on `dev` preview.

**Tech Stack:** Next.js 14 (App Router), Tailwind v4, `@umichkisa-ds/web` 1.0.17, `@umichkisa-ds/form`, `swr`, `next-auth`, `react-hook-form`.

**Scope sequence (fixed order, each its own commit):**
P1 → P2 → P3 → P10 → P5 → P8 → P4 → P6 → P7 → P9 → P11

**Per-task gate:** `npm run typecheck` must pass before commit. No `npm run build` (per user instruction).

**Working directory for ALL bash commands:** `/Users/jiohin/Desktop/KISA/DevTeam/dev/KISA-website/client`

---

## Task P1 — Extract `getDialogTitle` from nested ternary

**Files:**
- Modify: `src/features/pocha/components/manage/PochaFormDialog.tsx:88-94`

**Step 1: Add module-level helper above the component**

Insert after the existing `parseYmdToDate` helper (line ~65), before `export default function PochaFormDialog`:

```ts
type MenuFormStateForTitle = MenuFormState;

function getDialogTitle(
  isMenuForm: boolean,
  mode: "create" | "update",
  menuFormState: MenuFormStateForTitle
): string {
  if (isMenuForm && menuFormState) {
    return menuFormState.mode === "create" ? "메뉴 추가하기" : "메뉴 수정하기";
  }
  return mode === "create" ? "포차 생성하기" : "포차 수정하기";
}
```

(The `MenuFormStateForTitle` alias is unnecessary — just reuse `MenuFormState` directly. Drop the alias and reference `MenuFormState`.)

**Step 2: Replace inline ternary**

Lines 88-94 currently:

```ts
const dialogTitle = isMenuForm
  ? menuFormState.mode === "create"
    ? "메뉴 추가하기"
    : "메뉴 수정하기"
  : mode === "create"
    ? "포차 생성하기"
    : "포차 수정하기";
```

Replace with:

```ts
const dialogTitle = getDialogTitle(isMenuForm, mode, menuFormState);
```

**Step 3: Typecheck**

Run: `npm run typecheck`
Expected: PASS (no new errors).

**Step 4: Commit**

```bash
git add src/features/pocha/components/manage/PochaFormDialog.tsx
git commit -m "refactor(pocha-manage): extract getDialogTitle helper (P1)"
```

---

## Task P2 — Replace 4-state nested ternary with `renderContent` early returns

**Files:**
- Modify: `src/features/pocha/components/manage/PreviousPochaList.tsx:50-95`

**Step 1: Define `renderContent` inside the component, above `return`**

Insert above `return (` (after line ~48):

```ts
const renderContent = () => {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[0, 1, 2].map((i) => (
          <Card key={i} hoverable={false}>
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-1" />
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="error" title="이전 포차 정보를 불러오지 못했습니다.">
        {error instanceof Error
          ? error.message
          : "잠시 후 다시 시도해주세요."}
      </Alert>
    );
  }

  if (!previousPochaList || previousPochaList.length === 0) {
    return <Alert variant="info">아직 진행된 포차가 없습니다.</Alert>;
  }

  return (
    <div className="flex flex-col gap-3">
      {previousPochaList.map((pocha) => (
        <PreviousPochaSummary
          key={pocha.pochaID}
          pochaInfo={pocha}
          onClick={
            onSelectPocha
              ? () => onSelectPocha(pocha)
              : () => setDetailPocha(pocha)
          }
          isSelected={selectedPochaId === pocha.pochaID}
        />
      ))}
    </div>
  );
};
```

**Step 2: Replace the JSX body**

The `return (...)` block (lines 50-104) currently has the nested ternary. Replace its content (everything between `<section ...>` and `</section>`, plus the trailing `{showDialog && ...}`) with:

```tsx
return (
  <section className="flex flex-col w-full gap-4">
    <div className="flex items-center gap-2">
      <h2 className="type-h2 font-semibold text-foreground">
        이전 포차 목록
      </h2>
      {!isLoading && !error && previousPochaList && (
        <span className="type-caption text-muted-foreground">{count}개</span>
      )}
    </div>

    {renderContent()}

    {showDialog && (
      <PreviousPochaDetailDialog
        pocha={detailPocha}
        onClose={() => setDetailPocha(null)}
      />
    )}
  </section>
);
```

**Step 3: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

**Step 4: Commit**

```bash
git add src/features/pocha/components/manage/PreviousPochaList.tsx
git commit -m "refactor(pocha-manage): flatten PreviousPochaList ternary into renderContent (P2)"
```

---

## Task P3 — Extract `handleFormSubmit` from inline `onSubmit`

**Files:**
- Modify: `src/features/pocha/components/manage/PochaFormDialog.tsx:209-219`

**Step 1: Define handler above `return`**

Insert above `return (` (around line ~186, after `submitDisabled` derivation):

```ts
const handleFormSubmit = (values: PochaFormValues) => {
  if (errors.endDate || errors.endTime) {
    setActiveTab("info");
    return;
  }
  if (menus.length === 0) {
    setActiveTab("menu");
    return;
  }
  return onSubmit(values);
};
```

**Step 2: Replace inline lambda**

Line 209 currently:

```tsx
<Form
  form={methods}
  onSubmit={(values) => {
    if (errors.endDate || errors.endTime) {
      setActiveTab("info");
      return;
    }
    if (menus.length === 0) {
      setActiveTab("menu");
      return;
    }
    return onSubmit(values);
  }}
  className="flex flex-col gap-4"
>
```

Replace with:

```tsx
<Form
  form={methods}
  onSubmit={handleFormSubmit}
  className="flex flex-col gap-4"
>
```

**Step 3: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

**Step 4: Commit**

```bash
git add src/features/pocha/components/manage/PochaFormDialog.tsx
git commit -m "refactor(pocha-manage): extract handleFormSubmit (P3)"
```

---

## Task P10 — Rename `PreviosPochaSummary.tsx` → `PreviousPochaSummary.tsx`

**Files:**
- Rename: `src/features/pocha/components/manage/PreviosPochaSummary.tsx` → `PreviousPochaSummary.tsx`
- Modify: `src/features/pocha/components/manage/PreviousPochaList.tsx:8` (import path)

**Step 1: Git-rename**

```bash
git mv src/features/pocha/components/manage/PreviosPochaSummary.tsx src/features/pocha/components/manage/PreviousPochaSummary.tsx
```

**Step 2: Update import**

In `src/features/pocha/components/manage/PreviousPochaList.tsx`, change line 8:

```ts
import PreviousPochaSummary from "./PreviosPochaSummary";
```

to:

```ts
import PreviousPochaSummary from "./PreviousPochaSummary";
```

**Step 3: Verify no other imports**

Run: `grep -rn "PreviosPochaSummary" src/`
Expected: empty (no matches).

**Step 4: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/features/pocha/components/manage/
git commit -m "refactor(pocha-manage): fix PreviosPochaSummary filename typo (P10)"
```

---

## Task P5 — Extract Cloudinary I/O from `PochaMenuItemForm`

**Files:**
- Create: `src/apis/cloudinary/menuImage.ts`
- Modify: `src/features/pocha/components/manage/PochaMenuItemForm.tsx`

**Step 1: Create the API module**

`src/apis/cloudinary/menuImage.ts`:

```ts
import { FileUploadValue } from "@umichkisa-ds/web";

/**
 * Upload a menu image to Cloudinary via the app's API route.
 * The route is responsible for the actual Cloudinary call + signing.
 */
export async function uploadMenuImage(
  file: File,
  token: string
): Promise<FileUploadValue> {
  const timestamp = new Date().getTime();
  const fileName = `pocha-menu-${timestamp}`.replace(/ /g, "-");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("public_id", `/${fileName}`);
  formData.append("folder", "temp");
  formData.append("resource_type", "image");

  const response = await fetch("/api/upload-to-cloudinary", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  const result = await response.json();
  return { url: result.secure_url, publicId: result.public_id };
}

/**
 * Delete a previously-uploaded image. Used for orphan cleanup when
 * the user cancels a menu form after uploading.
 */
export async function deleteMenuImage(
  publicId: string,
  token: string
): Promise<void> {
  if (!publicId || !token) return;

  try {
    const response = await fetch("/api/delete-from-cloudinary", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ publicId }),
    });

    if (!response.ok) {
      console.error("Failed to delete image from Cloudinary");
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
}
```

**Step 2: Update PochaMenuItemForm to consume the API**

In `src/features/pocha/components/manage/PochaMenuItemForm.tsx`:

- Add import at top:
  ```ts
  import {
    uploadMenuImage,
    deleteMenuImage,
  } from "@/apis/cloudinary/menuImage";
  ```
- Delete the entire body of `deleteImageFromCloudinary` (lines 63-82) and inline replace its two callsites:
  - In `handleRemove` (line 116-120): replace with
    ```ts
    const handleRemove = async (publicId: string): Promise<void> => {
      if (publicId && session?.token) {
        await deleteMenuImage(publicId, session.token);
      }
    };
    ```
  - In `handleCloseForm` (line 169-176): replace with
    ```ts
    const handleCloseForm = () => {
      if (fileUploadValue?.publicId && session?.token) {
        deleteMenuImage(fileUploadValue.publicId, session.token);
      }
      closeItemForm();
    };
    ```
- Replace `handleUpload` (lines 84-114) with:
  ```ts
  const handleUpload = async (file: File): Promise<FileUploadValue> => {
    if (!session?.token) {
      toast.error("로그인이 필요합니다.");
      throw new Error("Not logged in");
    }
    return uploadMenuImage(file, session.token);
  };
  ```

**Step 3: Typecheck**

Run: `npm run typecheck`
Expected: PASS. Net diff: PochaMenuItemForm.tsx ~50 lines smaller.

**Step 4: Commit**

```bash
git add src/apis/cloudinary/ src/features/pocha/components/manage/PochaMenuItemForm.tsx
git commit -m "refactor(pocha-manage): extract Cloudinary I/O to apis/cloudinary (P5)"
```

---

## Task P8 — Extract `useTypedSession` wrapper

**Files:**
- Create: `src/lib/next-auth/useTypedSession.ts`
- Modify: `src/features/pocha/components/manage/PochaFormDialog.tsx:74-77`
- Modify: `src/features/pocha/components/manage/PochaMenuItemForm.tsx:45-48`

**Step 1: Create wrapper**

`src/lib/next-auth/useTypedSession.ts`:

```ts
"use client";

import { useSession } from "next-auth/react";
import { UserSession } from "./types";

/**
 * Typed wrapper around next-auth's useSession that asserts our app-level
 * session shape (UserSession). Centralizes the type assertion so it lives
 * in exactly one place; if next-auth changes signatures, only this file
 * needs updating.
 */
export function useTypedSession() {
  return useSession() as {
    data: UserSession | undefined;
    status: "authenticated" | "unauthenticated" | "loading";
  };
}
```

**Step 2: Replace call sites**

In `PochaFormDialog.tsx`:
- Remove `import { useSession } from "next-auth/react";`
- Remove `import { UserSession } from "@/lib/next-auth/types";` (no longer needed locally)
- Add `import { useTypedSession } from "@/lib/next-auth/useTypedSession";`
- Change lines 74-77 from:
  ```ts
  const { data: session } = useSession() as {
    data: UserSession | undefined;
    status: string;
  };
  ```
  to:
  ```ts
  const { data: session } = useTypedSession();
  ```

In `PochaMenuItemForm.tsx`:
- Same import swap.
- Change lines 45-48 to:
  ```ts
  const { data: session } = useTypedSession();
  ```

**Step 3: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

**Step 4: Commit**

```bash
git add src/lib/next-auth/useTypedSession.ts src/features/pocha/components/manage/PochaFormDialog.tsx src/features/pocha/components/manage/PochaMenuItemForm.tsx
git commit -m "refactor(pocha-manage): centralize useSession type cast as useTypedSession (P8)"
```

---

## Task P4 — Move cross-field re-validation into `PochaInfoFields`

**Files:**
- Modify: `src/features/pocha/components/manage/PochaInfoFields.tsx`
- Modify: `src/features/pocha/components/manage/PochaFormDialog.tsx:114-130` (remove the trigger effect)

**Step 1: Update `PochaInfoFields` to colocate the trigger**

Replace the entire content of `PochaInfoFields.tsx` with:

```tsx
"use client";

import { useEffect } from "react";
import { Form, useFormContext } from "@umichkisa-ds/form";

interface PochaInfoFieldsProps {}

function startOfDay(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

export default function PochaInfoFields(_props: PochaInfoFieldsProps) {
  // Cross-field validation: re-trigger end-field rules whenever start fields
  // change. Colocated here so the rules and the re-validation glue live in
  // one file (per Toss `cohesion-form-structure`).
  const { watch, trigger } = useFormContext();
  const watchedStartDate = watch("startDate");
  const watchedStartTime = watch("startTime");

  useEffect(() => {
    trigger(["endDate", "endTime"]);
  }, [watchedStartDate, watchedStartTime, trigger]);

  return (
    <div className="flex w-full flex-col gap-6">
      <Form.Input
        name="title"
        label="포차 이름"
        type="text"
        rules={{ required: "포차 제목을 입력해주세요." }}
      />
      <Form.Input
        name="description"
        label="포차 설명"
        type="text"
        rules={{ required: "포차 설명을 입력해주세요." }}
      />
      <Form.DatePicker
        name="startDate"
        label="시작 날짜"
        rules={{ required: "유효한 시작 날짜를 입력해주세요." }}
      />
      <Form.Input
        name="startTime"
        label="시작 시간"
        type="time"
        rules={{ required: "유효한 시작 시간을 입력해주세요." }}
      />
      <Form.DatePicker
        name="endDate"
        label="종료 날짜"
        rules={{
          required: "유효한 종료 날짜를 입력해주세요.",
          validate: (value: Date | undefined, values: Record<string, unknown>) => {
            const start = values.startDate as Date | undefined;
            if (!value || !start) return true;
            return startOfDay(value) < startOfDay(start)
              ? "종료 날짜는 시작 날짜보다 빠를 수 없습니다."
              : true;
          },
        }}
      />
      <Form.Input
        name="endTime"
        label="종료 시간"
        type="time"
        rules={{
          required: "유효한 종료 시간을 입력해주세요.",
          validate: (value: string, values: Record<string, unknown>) => {
            const startDate = values.startDate as Date | undefined;
            const endDate = values.endDate as Date | undefined;
            const startTime = values.startTime as string | undefined;
            if (!value || !startTime || !startDate || !endDate) return true;
            // Only enforce time ordering when start and end fall on the same day;
            // when end is on a later day, any time is fine.
            if (startOfDay(endDate) > startOfDay(startDate)) return true;
            return value <= startTime
              ? "종료 시간은 시작 시간보다 늦어야 합니다."
              : true;
          },
        }}
      />
    </div>
  );
}
```

**Step 2: Verify `useFormContext` is exported from `@umichkisa-ds/form`**

Run: `node -e "console.log(Object.keys(require('@umichkisa-ds/form')))"`
Expected: list includes `useFormContext`.

If NOT exported, fall back to direct `react-hook-form` import: `import { useFormContext } from "react-hook-form";`

**Step 3: Remove the effect from `PochaFormDialog.tsx`**

Delete lines 114-130 (the watchedStartDate/watchedStartTime + useEffect block, plus the `watch`/`trigger` destructure if no longer used elsewhere). Specifically, replace lines 114-130:

```ts
const {
  formState: { isValid, isSubmitting, errors },
  reset,
  watch,
  trigger,
} = methods;

// Cross-field validation lives in the `validate` rules on endDate / endTime
// inside PochaInfoFields. RHF only re-runs a field's rules when *that* field
// changes, so when the user tweaks startDate / startTime we manually trigger
// re-validation on the end fields.
const watchedStartDate = watch("startDate");
const watchedStartTime = watch("startTime");

useEffect(() => {
  trigger(["endDate", "endTime"]);
}, [watchedStartDate, watchedStartTime, trigger]);
```

with:

```ts
const {
  formState: { isValid, isSubmitting, errors },
  reset,
} = methods;
```

Also remove the now-unused `useEffect` import from line 3 if no other effect remains in the file (verify: search for `useEffect` after edit).

**Step 4: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/features/pocha/components/manage/PochaInfoFields.tsx src/features/pocha/components/manage/PochaFormDialog.tsx
git commit -m "refactor(pocha-manage): colocate cross-field validation trigger in PochaInfoFields (P4)"
```

---

## Task P6 — Add `error` and `refetch` to `useMenu` (additive)

**Files:**
- Modify: `src/features/pocha/hooks/useMenu.tsx`

**Scope note:** Originally proposed as "standardize hook return shapes," but `useMenu` has 6+ consumers outside pocha-manage scope. Reframed as additive: bring `useMenu` to parity with `usePocha` by exposing `error` + `refetch` that already exist on the SWR result. No existing caller breaks.

**Step 1: Update useMenu to expose error + refetch**

Replace the body of `src/features/pocha/hooks/useMenu.tsx` with:

```tsx
// [NOTE]
// This is to prevent the menu from being fetched multiple times when the user scrolls up and down
// 기존의 pocha 훅들과는 다르게 생겼으나, 당황하지 말고 SWR 공식문서를 참고하자
// https://swr.vercel.app/ko

import useSWR from "swr";
import { fetcherWithToken } from "@/lib/swr/fetchers";
import { MenuByCategory } from "@/types/pocha";

/**
 * @desc hook to fetch menu of pocha with SWR and existing fetcher
 *
 * Returns `{ menuList, status, error, refetch }` to match the surface of
 * `usePocha`. `refetch` is a thin wrapper over SWR's `mutate` for the
 * current key; callers can invoke it without knowing SWR cache keys.
 */
const useMenu = (pochaID: number, token: string) => {
  const {
    data: menuList,
    error,
    isLoading,
    mutate,
  } = useSWR(
    pochaID && token ? [`/pocha/menu/${pochaID}/`, token] : null,
    fetcherWithToken,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
    }
  );

  return {
    menuList: menuList as MenuByCategory[],
    status: error ? "error" : isLoading ? "loading" : "success",
    error: error as Error | undefined,
    refetch: () => mutate(),
  };
};

export default useMenu;
```

**Step 2: Typecheck**

Run: `npm run typecheck`
Expected: PASS — additive change, no consumer touched.

**Step 3: Commit**

```bash
git add src/features/pocha/hooks/useMenu.tsx
git commit -m "refactor(pocha): expose error + refetch on useMenu to match usePocha surface (P6)"
```

---

## Task P7 — Extract `findMenuByNameEng` helper to surface the identity invariant

**Files:**
- Create: `src/features/pocha/utils/menuIdentity.ts`
- Modify: `src/features/pocha/components/manage/PochaMenuItemList.tsx:43`
- Modify: `src/features/pocha/components/manage/PochaMenuItemForm.tsx:158-160` + duplicate-check rules (lines 191-206, 214-229)

**Step 1: Create util**

`src/features/pocha/utils/menuIdentity.ts`:

```ts
import { MenuItemRaw } from "@/types/pocha";

/**
 * The pocha-manage flow identifies in-flight menu items by `nameEng`.
 * This is enforced at the form level via duplicate-check `validate` rules,
 * but the invariant is otherwise implicit. Centralize the identity check
 * here so the assumption is grep-able from one location.
 *
 * (Long-term: replace with a client-side UUID assigned at insert time.)
 */
export function isSameMenu(a: MenuItemRaw, b: MenuItemRaw): boolean {
  return a.nameEng === b.nameEng;
}

export function findMenuByNameEng(
  menus: MenuItemRaw[],
  nameEng: string
): MenuItemRaw | undefined {
  return menus.find((m) => m.nameEng === nameEng);
}

export function hasMenuWithNameKor(
  menus: MenuItemRaw[],
  nameKor: string
): boolean {
  return menus.some((m) => m.nameKor === nameKor);
}

export function hasMenuWithNameEng(
  menus: MenuItemRaw[],
  nameEng: string
): boolean {
  return menus.some((m) => m.nameEng === nameEng);
}
```

**Step 2: Use in `PochaMenuItemList.tsx`**

Add import:
```ts
import { isSameMenu } from "../../utils/menuIdentity";
```

Replace line 43:
```ts
setMenus(menus.filter((menu) => menu.nameEng !== deletingMenu.nameEng));
```
with:
```ts
setMenus(menus.filter((menu) => !isSameMenu(menu, deletingMenu)));
```

**Step 3: Use in `PochaMenuItemForm.tsx`**

Add import:
```ts
import {
  hasMenuWithNameKor,
  hasMenuWithNameEng,
} from "../../utils/menuIdentity";
```

Replace `nameKor` validate (lines 191-206):
```ts
validate: (value: string) => {
  if (mode === "create" && hasMenuWithNameKor(menus, value)) {
    return "이미 존재하는 메뉴입니다.";
  }
  if (
    mode === "update" &&
    value !== initialData?.nameKor &&
    hasMenuWithNameKor(menus, value)
  ) {
    return "이미 존재하는 메뉴입니다.";
  }
  return true;
},
```

Replace `nameEng` validate (lines 214-229):
```ts
validate: (value: string) => {
  if (mode === "create" && hasMenuWithNameEng(menus, value)) {
    return "이미 존재하는 메뉴입니다.";
  }
  if (
    mode === "update" &&
    value !== initialData?.nameEng &&
    hasMenuWithNameEng(menus, value)
  ) {
    return "이미 존재하는 메뉴입니다.";
  }
  return true;
},
```

Replace update map (lines 158-160):
```ts
const updatedMenus = menus.map((menu) =>
  menu.nameEng === initialData?.nameEng ? newMenuItem : menu
);
```
with:
```ts
const updatedMenus = menus.map((menu) =>
  initialData && isSameMenu(menu, initialData) ? newMenuItem : menu
);
```

Add import for `isSameMenu` to the same line as the other identity imports.

**Step 4: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

**Step 5: Commit**

```bash
git add src/features/pocha/utils/menuIdentity.ts src/features/pocha/components/manage/PochaMenuItemList.tsx src/features/pocha/components/manage/PochaMenuItemForm.tsx
git commit -m "refactor(pocha-manage): centralize menu identity helpers (P7)"
```

---

## Task P9 — Extract shared `PochaDateBlock` and `PochaMenuGroup`

**Files:**
- Create: `src/features/pocha/components/manage/_shared/PochaDateBlock.tsx`
- Create: `src/features/pocha/components/manage/_shared/PochaMenuGroup.tsx`
- Modify: `src/features/pocha/components/manage/PochaSummary.tsx`
- Modify: `src/features/pocha/components/manage/PreviousPochaDetailDialog.tsx`

**Step 1: Create `PochaDateBlock`**

`src/features/pocha/components/manage/_shared/PochaDateBlock.tsx`:

```tsx
import { Icon } from "@umichkisa-ds/web";

import {
  formatDateInTz,
  formatTimeInTz,
  tzAbbreviation,
} from "@/utils/formats/timezone";

interface PochaDateBlockProps {
  label: string;
  date: Date | string;
}

export default function PochaDateBlock({ label, date }: PochaDateBlockProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon name="calendar" size="sm" />
        <span className="type-body-sm">{label}</span>
      </div>
      <p className="type-h4 font-semibold text-foreground">
        {formatDateInTz(date)}
      </p>
      <p className="type-body-sm text-muted-foreground">
        {formatTimeInTz(date)} ({tzAbbreviation(date)})
      </p>
    </div>
  );
}
```

**Step 2: Create `PochaMenuGroup`**

`src/features/pocha/components/manage/_shared/PochaMenuGroup.tsx`:

```tsx
import { Badge } from "@umichkisa-ds/web";
import { MenuItemRaw } from "@/types/pocha";

interface PochaMenuGroupProps {
  label: string;
  items: MenuItemRaw[];
}

export default function PochaMenuGroup({ label, items }: PochaMenuGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="type-body-sm text-muted-foreground">
        {label} · {items.length}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((menu) => (
          <Badge
            key={menu.menuID ?? menu.nameKor}
            variant="outline"
            size="md"
          >
            {menu.nameKor}
          </Badge>
        ))}
      </div>
    </div>
  );
}
```

**Step 3: Update `PochaSummary.tsx`**

- Remove the local `MenuGroup` function (lines 106-131).
- Remove the inline date-block JSX (lines 62-87) and replace with two `<PochaDateBlock>` calls.
- Remove now-unused imports (`Icon`, `formatDateInTz`, `formatTimeInTz`, `tzAbbreviation` if no longer referenced).
- Replace inline date-block grid (lines 61-88) with:
  ```tsx
  <div className="grid grid-cols-2 gap-4">
    <PochaDateBlock label="시작" date={pochaInfo.startDate} />
    <PochaDateBlock label="종료" date={pochaInfo.endDate} />
  </div>
  ```
- Replace `<MenuGroup ...>` callsites (lines 94, 97) with `<PochaMenuGroup ...>`.
- Add imports:
  ```ts
  import PochaDateBlock from "./_shared/PochaDateBlock";
  import PochaMenuGroup from "./_shared/PochaMenuGroup";
  ```

**Step 4: Update `PreviousPochaDetailDialog.tsx`**

- Remove local `DateBlock` (lines 75-96) and `MenuGroup` (lines 137-162).
- Replace `<DateBlock ...>` callsites (lines 58-59) with `<PochaDateBlock>`.
- Replace `<MenuGroup ...>` callsites (lines 128, 131) with `<PochaMenuGroup>`.
- Remove now-unused imports (`Icon` if not used elsewhere; `formatDateInTz`, `formatTimeInTz`, `tzAbbreviation`).
- Add imports:
  ```ts
  import PochaDateBlock from "./_shared/PochaDateBlock";
  import PochaMenuGroup from "./_shared/PochaMenuGroup";
  ```

**Step 5: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

**Step 6: Commit**

```bash
git add src/features/pocha/components/manage/_shared/ src/features/pocha/components/manage/PochaSummary.tsx src/features/pocha/components/manage/PreviousPochaDetailDialog.tsx
git commit -m "refactor(pocha-manage): extract shared PochaDateBlock + PochaMenuGroup (P9)"
```

---

## Task P11 — Extract `formatPrice` for the hardcoded `$` symbol

**Files:**
- Create: `src/utils/formats/currency.ts`
- Modify: `src/features/pocha/components/manage/PochaMenuItemList.tsx:185`

**Step 1: Create util**

`src/utils/formats/currency.ts`:

```ts
/**
 * Format a USD price for display. KISA pocha is USD-only today; if a
 * second currency ever appears, extend this with a currency-code argument.
 */
export function formatPrice(price: number | undefined): string {
  if (price === undefined || price === null) return "$0";
  return `$${price.toLocaleString()}`;
}
```

**Step 2: Use in `PochaMenuItemList.tsx`**

Add import:
```ts
import { formatPrice } from "@/utils/formats/currency";
```

Replace line 185:
```tsx
<span>${menu.price?.toLocaleString()}</span>
```
with:
```tsx
<span>{formatPrice(menu.price)}</span>
```

**Step 3: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

**Step 4: Commit**

```bash
git add src/utils/formats/currency.ts src/features/pocha/components/manage/PochaMenuItemList.tsx
git commit -m "refactor(pocha-manage): extract formatPrice util for USD symbol (P11)"
```

---

## Final verification + push

**Step 1: Final typecheck**

Run: `npm run typecheck`
Expected: PASS.

**Step 2: Sanity grep — confirm targets are gone**

Run: `grep -rn "PreviosPochaSummary" src/ || echo "OK: typo-name removed"`
Expected: `OK: typo-name removed`.

Run: `grep -rn "menu.nameEng !== deletingMenu.nameEng" src/ || echo "OK: P7 swept"`
Expected: `OK: P7 swept`.

Run: `grep -rEn "useSession\(\) as \\{" src/features/pocha src/lib || echo "OK: P8 swept"`
Expected: `OK: P8 swept` (the only remaining match should be inside `useTypedSession.ts` itself, which is acceptable — adjust grep to exclude it if needed).

**Step 3: Push to dev (Mode D direct push)**

Per `feedback_interactive_direct_push`, lane 2.19 merges to `dev` directly without a PR.

```bash
git checkout dev
git merge --no-ff lane/2.19-audit-after -m "Lane 2.19: pocha-manage Toss FF audit fixups (P1-P11 minus P12)"
git push origin dev
git branch -d lane/2.19-audit-after
git push origin --delete lane/2.19-audit-after  # if branch was pushed remotely
```

**Step 4: User smoke verification on Vercel `dev` preview**

User walks through `/pocha/manage` at 375px + 1280px:
- Create pocha (info tab → menu tab → submit) — toast appears, dialog closes, summary card populates.
- Edit pocha — fields prefilled, save updates summary.
- Add menu item with image upload — Cloudinary roundtrip works (P5 didn't break it).
- Cancel menu form after upload — orphan cleanup runs (P5 didn't break it).
- Cross-field date validation — change start to be after end → end fields show errors immediately (P4 still works).
- Delete menu — Dialog confirm → row removed (P7 still keys correctly).
- Open Previous Pocha detail dialog → date blocks + menu groups render (P9 didn't break shapes).

**Step 5: Wrap-up (per `wrapping-up-pr` skill)**

After user confirms smoke:
- Close GitHub issue #104 (`gh issue close 104 -R umichkisa/KISA-website` or via web UI; strip `lane:2.19` label).
- Tick `Phase 2.19` in DS repo `docs/TODO.md`.
- Append phase summary line to `docs/plans/client-migration/phase-2-pocha-manage/notes.md` if applicable.

---

## Notes & non-goals

- **No new unit tests added.** These components have no existing test infra in the client repo (Phase 2 testing focused on MSW handlers). Refactor verification is typecheck + manual smoke.
- **No `npm run build` per user instruction** — typecheck is the cheap gate; final smoke happens against Vercel `dev` preview.
- **Tailwind v4 syntax sweep** (`!font-*` → `font-*`) is already committed earlier on this branch — not part of this plan.
- **P12 deferred** — SWR cache-key prefix knowledge in `page.tsx:79-85` is left as-is per user decision.
- **P6 was reframed from "standardize all hook shapes" to "additive parity for useMenu"** because the larger rename would touch 6+ consumers outside pocha-manage scope.
