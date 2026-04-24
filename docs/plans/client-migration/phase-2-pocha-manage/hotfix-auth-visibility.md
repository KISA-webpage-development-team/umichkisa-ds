# Hotfix — auth abstraction + PochaSummary visibility

> **For Claude:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task.

**Goal:** Fix three issues surfaced after phase-2 wave-1 merge: (1) `useMockAuth` name/location leaks dev concerns into prod consumers; (2) `PochaManagePageHeader` reads `useSession()` directly, breaking mock-mode auth UX; (3) `PochaSummary` card has low-visibility body (muted foreground on primary content), weak "upcoming" badge, and over-weighted edit button.

**Architecture:** Three sequential commits, direct-push to `dev` (no PR — Mode D interactive per `feedback_interactive_direct_push`). Commit 1 is a cross-cutting rename/move refactor. Commits 2 & 3 are surgical edits to two pocha-manage components.

**Tech stack:** Next.js 14 App Router, React, TypeScript, TailwindCSS v4, `@umichkisa-ds/web` (DS), next-auth, Vitest for tests, sessionStorage-backed mock auth.

**Repo:** `/Users/jiohin/Desktop/KISA/DevTeam/dev/KISA-website/client` (dev branch).

**Out of scope:** `PochaInfoFields` form provider wiring (lane 2.11), `PreviousPochaList` redesign (lane 2.7), `MenuItemList` hover behavior (stays non-hoverable per design decision).

---

## Pre-flight

**Step 0.1:** Verify on `dev`, up-to-date, clean.

```sh
cd /Users/jiohin/Desktop/KISA/DevTeam/dev/KISA-website/client
git status
git branch --show-current   # must be "dev"
git pull --ff-only
```

Expected: clean tree, `dev`, no pending pulls. If dirty → stop and surface.

**Step 0.2:** Baseline typecheck + lint (must pass before we start so later failures are ours).

```sh
npx tsc --noEmit
npm run lint
```

Expected: both exit 0 (ignore pre-existing `moduleResolution=node10` deprecation warning).

---

## Task 1: Rename `useMockAuth` → `useAuth`, relocate context to `@/lib/auth`

**Why this is Commit 1 (not 2/3):** consumers in Task 2 (`PochaManagePageHeader`) import the renamed hook. Must land first.

**Files:**
- **Create:** `src/lib/auth/authContext.tsx` — prod-path context + hook (no mock widget)
- **Create:** `src/mocks/MockAuthToggle.tsx` — extracted dev-only widget
- **Delete:** `src/mocks/authContext.tsx`
- **Modify:** `src/app/(main)/layout.tsx` — import path + MockAuthToggle source
- **Modify:** `src/app/(pocha)/pocha/layout.tsx` — import path + MockAuthToggle source
- **Modify:** `src/components/layout/header/Header.tsx` — hook name + import
- **Modify:** `src/components/layout/header/LoginButton.tsx` — hook name + import
- **Modify:** `src/lib/next-auth/useAdmin.ts` — hook name + import
- **Modify:** `src/mocks/__tests__/authContext.test.tsx` — update imports (still tests the same provider)
- **Modify:** `src/mocks/__tests__/useAdmin.test.tsx` — update imports
- **Modify:** `src/components/layout/header/__tests__/LoginButton.test.tsx` — update `vi.mock(...)` path + member name

### Step 1.1: Create `src/lib/auth/authContext.tsx`

Content — identical to current `src/mocks/authContext.tsx` except:
- Hook renamed `useMockAuth` → `useAuth`
- Error string updated
- `MockAuthToggle` function removed (moves to Task 1.2)
- Keep exports: `AuthContextProvider`, `useAuth`, `type AppSession`, `isMockMode` helper (internal — do NOT export)

```tsx
"use client";

import type { Session } from "next-auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AppSession = Session & { token: string };

const MOCK_SESSION: AppSession = {
  user: {
    name: "KISA Tester",
    email: "tester@umich.edu",
    image: "/default_profile.png",
  },
  token: "mock-access-token",
  expires: new Date(Date.now() + 86_400_000).toISOString(),
};

const AUTH_KEY = "kisa-mock-auth-authenticated";
const ADMIN_KEY = "kisa-mock-auth-isadmin";

const isMockMode = () => process.env.NEXT_PUBLIC_MOCK_API === "1";

type AuthContextValue = {
  session: AppSession | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  toggle: () => void;
  toggleIsAdmin: () => void;
  isMockMode: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthContextProvider({
  initialSession,
  children,
}: {
  initialSession: AppSession | null;
  children: ReactNode;
}) {
  const IS_MOCK_MODE = isMockMode();
  const [mockAuthed, setMockAuthed] = useState(false);
  const [mockIsAdmin, setMockIsAdmin] = useState(false);

  useEffect(() => {
    if (IS_MOCK_MODE) {
      if (sessionStorage.getItem(AUTH_KEY) === "1") setMockAuthed(true);
      if (sessionStorage.getItem(ADMIN_KEY) === "1") setMockIsAdmin(true);
    }
  }, [IS_MOCK_MODE]);

  useEffect(() => {
    if (IS_MOCK_MODE) {
      sessionStorage.setItem(AUTH_KEY, mockAuthed ? "1" : "0");
    }
  }, [mockAuthed, IS_MOCK_MODE]);

  useEffect(() => {
    if (IS_MOCK_MODE) {
      sessionStorage.setItem(ADMIN_KEY, mockIsAdmin ? "1" : "0");
    }
  }, [mockIsAdmin, IS_MOCK_MODE]);

  useEffect(() => {
    if (IS_MOCK_MODE && !mockAuthed && mockIsAdmin) {
      setMockIsAdmin(false);
    }
  }, [mockAuthed, mockIsAdmin, IS_MOCK_MODE]);

  const value: AuthContextValue = IS_MOCK_MODE
    ? {
        session: mockAuthed ? MOCK_SESSION : null,
        isAuthenticated: mockAuthed,
        isAdmin: mockAuthed && mockIsAdmin,
        toggle: () => setMockAuthed((p) => !p),
        toggleIsAdmin: () => setMockIsAdmin((p) => !p),
        isMockMode: true,
      }
    : {
        session: initialSession,
        isAuthenticated: initialSession !== null,
        isAdmin: false,
        toggle: () => {},
        toggleIsAdmin: () => {},
        isMockMode: false,
      };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthContextProvider>");
  }
  return ctx;
}

export { MOCK_SESSION };
export type { AppSession, AuthContextValue };
```

Note: `MOCK_SESSION` is re-exported so `MockAuthToggle.tsx` can reuse it in its label.

### Step 1.2: Create `src/mocks/MockAuthToggle.tsx`

```tsx
"use client";

import { Switch } from "@umichkisa-ds/web";
import { useAuth, MOCK_SESSION } from "@/lib/auth/authContext";

export function MockAuthToggle() {
  const { isMockMode, isAuthenticated, isAdmin, toggle, toggleIsAdmin } =
    useAuth();

  if (!isMockMode) return null;

  return (
    <div
      role="group"
      aria-label="Mock authentication toggle"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 rounded-lg border border-border-strong bg-surface px-3 py-2 shadow-md"
    >
      <div className="flex items-center gap-2">
        <Switch
          checked={isAuthenticated}
          onChange={toggle}
          aria-label="Toggle mock authentication"
        />
        <span className="relative type-body-sm text-foreground">
          <span aria-hidden="true" className="invisible">
            Mock: {MOCK_SESSION.user!.email}
          </span>
          <span className="absolute inset-0">
            {isAuthenticated
              ? `Mock: ${MOCK_SESSION.user!.email}`
              : "Mock: logged out"}
          </span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={isAdmin}
          onChange={toggleIsAdmin}
          disabled={!isAuthenticated}
          aria-label="Toggle mock admin"
        />
        <span className="type-body-sm text-foreground">Mock: admin</span>
      </div>
    </div>
  );
}
```

### Step 1.3: Delete old file

```sh
rm src/mocks/authContext.tsx
```

### Step 1.4: Update `src/app/(main)/layout.tsx`

Change import block:

Before:
```tsx
import {
  AuthContextProvider,
  MockAuthToggle,
  type AppSession,
} from "@/mocks/authContext";
```

After:
```tsx
import { AuthContextProvider, type AppSession } from "@/lib/auth/authContext";
import { MockAuthToggle } from "@/mocks/MockAuthToggle";
```

Leave all other JSX/logic untouched.

### Step 1.5: Update `src/app/(pocha)/pocha/layout.tsx`

Before:
```tsx
import {
  AuthContextProvider,
  MockAuthToggle,
} from '@/mocks/authContext';
```

After:
```tsx
import { AuthContextProvider } from '@/lib/auth/authContext';
import { MockAuthToggle } from '@/mocks/MockAuthToggle';
```

### Step 1.6: Update `src/components/layout/header/Header.tsx`

- Line ~22: `import { useMockAuth } from "@/mocks/authContext";` → `import { useAuth } from "@/lib/auth/authContext";`
- Line ~27: `const { session, isAuthenticated } = useMockAuth();` → `const { session, isAuthenticated } = useAuth();`

### Step 1.7: Update `src/components/layout/header/LoginButton.tsx`

- Line 6: `import { useMockAuth } from "@/mocks/authContext";` → `import { useAuth } from "@/lib/auth/authContext";`
- Line 19: `const { isMockMode, toggle } = useMockAuth();` → `const { isMockMode, toggle } = useAuth();`

### Step 1.8: Update `src/lib/next-auth/useAdmin.ts`

- Line 5: `import { useMockAuth } from "@/mocks/authContext";` → `import { useAuth } from "@/lib/auth/authContext";`
- Line 17: `const mock = useMockAuth();` → `const mock = useAuth();`

Keep the local variable name `mock` — it's descriptive and doesn't leak.

### Step 1.9: Update test files

**`src/mocks/__tests__/authContext.test.tsx`:**
- Update any `from "../authContext"` / `from "@/mocks/authContext"` → `from "@/lib/auth/authContext"`
- Rename any `useMockAuth` identifier to `useAuth`

**`src/mocks/__tests__/useAdmin.test.tsx`:**
- Lines 4 + any other: `from "../authContext"` → `from "@/lib/auth/authContext"`
- Replace `useMockAuth` identifier → `useAuth`

**`src/components/layout/header/__tests__/LoginButton.test.tsx`:**
- `vi.mock("@/mocks/authContext", ...)` → `vi.mock("@/lib/auth/authContext", ...)`
- Inside the factory, `useMockAuth: () => ({ ... })` → `useAuth: () => ({ ... })`

Read each file first; apply minimum-diff edits. Do NOT relocate test files.

### Step 1.10: Verify — typecheck + lint + targeted tests

```sh
npx tsc --noEmit
npm run lint
npx vitest run src/mocks/__tests__/authContext.test.tsx src/mocks/__tests__/useAdmin.test.tsx src/components/layout/header/__tests__/LoginButton.test.tsx
```

Expected:
- tsc: 0 errors (pre-existing `moduleResolution=node10` deprecation warning OK)
- lint: 0 errors
- vitest: all 3 test files pass

If any import path was missed, tsc will point at it — fix and re-run. Do not proceed to Step 1.11 with red tests.

### Step 1.11: Commit

```sh
git add src/lib/auth/authContext.tsx src/mocks/MockAuthToggle.tsx src/app/\(main\)/layout.tsx "src/app/(pocha)/pocha/layout.tsx" src/components/layout/header/Header.tsx src/components/layout/header/LoginButton.tsx src/lib/next-auth/useAdmin.ts src/mocks/__tests__/authContext.test.tsx src/mocks/__tests__/useAdmin.test.tsx src/components/layout/header/__tests__/LoginButton.test.tsx
git rm src/mocks/authContext.tsx
git commit -m "$(cat <<'EOF'
refactor(auth): useMockAuth → useAuth, relocate context to @/lib/auth

Consumer code no longer carries "mock" vocabulary. The provider still
branches on NEXT_PUBLIC_MOCK_API internally; callers just ask for the
current session via useAuth(). Extracted MockAuthToggle to src/mocks/
since it is genuinely dev-only UI.

- move src/mocks/authContext.tsx → src/lib/auth/authContext.tsx
- rename export useMockAuth → useAuth
- extract MockAuthToggle → src/mocks/MockAuthToggle.tsx
- update 5 prod consumers and 3 test files

No behavioral change.
EOF
)"
```

Push handled at end of plan.

---

## Task 2: `PochaManagePageHeader` — drop `useSession()`, use `useAuth()`

**Files:**
- **Modify:** `src/features/pocha/components/manage/PochaManagePageHeader.tsx`

### Step 2.1: Rewrite file

Current (lines 1-32) uses `useSession()` from next-auth directly, which returns `undefined` in mock mode → `UserInfo` never renders and `LoginButton` stays as "로그인" regardless of mock toggle.

Replace file with:

```tsx
"use client";

import LoginButton from "@/components/layout/header/LoginButton";
import UserInfo from "@/components/layout/header/UserInfo";
import { useAuth } from "@/lib/auth/authContext";

export default function PochaManagePageHeader() {
  const { session, isAuthenticated } = useAuth();

  return (
    <div className="relative flex min-h-[4.5rem] items-center justify-between gap-4 overflow-hidden py-2">
      <h1 className="type-h1 relative z-10 text-foreground">포차 관리</h1>
      <div className="relative z-10 flex items-center gap-4">
        {session?.user?.email && session.user.name && session.user.image && (
          <UserInfo
            email={session.user.email}
            image={session.user.image}
            name={session.user.name}
          />
        )}
        <LoginButton isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
}
```

Drops: `useSession` import, `UserSession` type import (no longer needed).
Adds: `useAuth` import.

### Step 2.2: Verify

```sh
npx tsc --noEmit
npm run lint
```

Expected: 0 errors.

### Step 2.3: `ds-client-review` (mandatory per CLAUDE.md for every `.tsx` change)

Dispatch the `ds-client-review` agent with the updated file + `docs/DS_CLIENT_USAGE.md`.

Expected: PASS (no new tokens, no DS primitives added).

### Step 2.4: Commit

```sh
git add src/features/pocha/components/manage/PochaManagePageHeader.tsx
git commit -m "$(cat <<'EOF'
fix(pocha-manage): PochaManagePageHeader reads useAuth, not useSession (lane 2.8 hotfix)

useSession() from next-auth returns undefined in mock mode, so UserInfo
never rendered and LoginButton stayed "로그인" regardless of the mock
toggle. Switching to useAuth() — which handles both mock and prod paths
internally — restores the expected mock-mode UX.

Visible in dev at /pocha/manage with NEXT_PUBLIC_MOCK_API=1: clicking
로그인 now flips the header state.
EOF
)"
```

---

## Task 3: `PochaSummary` — visibility + badge variant + button variant

**Files:**
- **Modify:** `src/features/pocha/components/manage/PochaSummary.tsx`

### Step 3.1: Edit file

Three changes:
1. **Line 28:** `statusVariant` when `!ongoing`: `"default"` → `"info"` (gray → blue, readable).
2. **Lines 54, 60, 66, 72:** drop `text-muted-foreground` from value spans. These are primary content; labels already use default foreground, values should too. Simplest fix: remove the `<span className="text-muted-foreground">` wrapper entirely and inline the text.
3. **Line 41:** Button `variant="secondary"` → `variant="tertiary"` (edit is an inline record action, not a page-level secondary CTA).

After edit the file reads:

```tsx
import React from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@umichkisa-ds/web";

import { MenuItemRaw, PochaInfo } from "@/types/pocha";
import { formatDateTimeString } from "@/utils/formats/date";

interface PochaSummaryProps {
  pochaInfo: PochaInfo;
  isEditPochaFormOpen: boolean;
  setIsEditPochaFormOpen: (isOpen: boolean) => void;
  menuList: MenuItemRaw[];
}

export default function PochaSummary({
  pochaInfo,
  isEditPochaFormOpen,
  setIsEditPochaFormOpen,
  menuList,
}: PochaSummaryProps) {
  const statusLabel = pochaInfo.ongoing ? "진행 중" : "진행 예정";
  const statusVariant = pochaInfo.ongoing ? "success" : "info";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CardTitle as="h3" className="type-h3 !font-semibold">
              {pochaInfo.title}
            </CardTitle>
            <Badge variant={statusVariant}>{statusLabel}</Badge>
          </div>
          <Button
            variant="tertiary"
            size="sm"
            onClick={() => setIsEditPochaFormOpen(!isEditPochaFormOpen)}
          >
            {isEditPochaFormOpen ? "수정 취소" : "수정하기"}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2">
          <p className="type-body">
            <span>설명: </span>
            <span>{pochaInfo.description}</span>
          </p>
          <p className="type-body">
            <span>시작 날짜: </span>
            <span>{formatDateTimeString(pochaInfo.startDate)}</span>
          </p>
          <p className="type-body">
            <span>종료 날짜: </span>
            <span>{formatDateTimeString(pochaInfo.endDate)}</span>
          </p>
          <p className="type-body">
            <span>메뉴: </span>
            <span>{menuList.map((menu) => menu.nameKor).join(", ")}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
```

Note: kept the inner `<span>` wrappers (rather than inlining raw text) to preserve the "label + value" DOM shape — if later someone wants `font-semibold` on labels or any bold/normal split, the hooks are already there. Zero classes on the value span — inherits default `text-foreground`.

### Step 3.2: Verify — Badge `info` variant exists in DS

```sh
grep -n '"info"' /Users/jiohin/Desktop/KISA/DevTeam/dev/umichkisa-ds/packages/web/src/components/feedback/Badge.tsx
```

Expected: non-empty match. If Badge has no `info` variant → HARD STOP and surface (would need a DS fix, out of this plan's scope).

### Step 3.3: Typecheck + lint

```sh
npx tsc --noEmit
npm run lint
```

Expected: 0 errors.

### Step 3.4: `ds-client-review` (mandatory for `.tsx` change)

Dispatch `ds-client-review` agent with updated file + `docs/DS_CLIENT_USAGE.md`.

Expected: PASS. (No muted-foreground on primary content now, tertiary button is valid variant, no raw grays.)

### Step 3.5: Commit

```sh
git add src/features/pocha/components/manage/PochaSummary.tsx
git commit -m "$(cat <<'EOF'
fix(pocha-manage): PochaSummary visibility + variant corrections (lane 2.9 hotfix)

- 진행 예정 Badge: default (gray) → info (blue); gray badge was not
  distinct enough from muted content.
- Value spans drop text-muted-foreground; card values are primary
  content users need to read. Labels + values both inherit
  text-foreground now.
- 수정하기 Button: secondary → tertiary. Inline record action should
  not compete with page-level CTAs; tertiary (transparent, subtle
  hover) matches its in-context role.

Informed by the feedback_intro_foreground rule and the visibility
clause newly added to the ds-client-constrained-execution skill.
EOF
)"
```

---

## Task 4: Push + post-merge sync

### Step 4.1: Push all three commits

```sh
git log --oneline -4   # confirm 3 new commits on top of wave-1 head
git push origin dev
```

### Step 4.2: Post-merge sync (per CLAUDE.md) — already on `dev`, just verify clean

```sh
cd /Users/jiohin/Desktop/KISA/DevTeam/dev/KISA-website/client
git status    # clean
git log --oneline -5
```

Report:
- ✅ `KISA-website-client` `dev` up-to-date at `<new-head-sha>`

### Step 4.3: Hand off

Stop here and surface to user:

> Three commits pushed to `dev`. Ready for visual re-review at `/pocha/manage` (mock mode):
> - 로그인 button now toggles header state (Task 2)
> - Active pocha card: values readable, blue info badge for upcoming, subtle tertiary edit button (Task 3)
>
> Once you've looked, we proceed to grill-me for lane 2.7 (PreviousPochaList redesign + hoverable card).

---

## Failure modes & handling

| Symptom | Likely cause | Action |
|---|---|---|
| `tsc` cannot find `@/lib/auth/authContext` after Step 1.4-1.8 | Missed consumer or typo in path | re-grep `"@/mocks/authContext"` across `src/`, fix each, re-run tsc |
| LoginButton test fails after Step 1.9 | `vi.mock` member name still `useMockAuth` | fix factory to return `useAuth`, re-run |
| `Badge` has no `info` variant (Step 3.2 fails) | DS gap | HARD STOP — this becomes a DS fix lane, not part of this plan |
| ds-client-review flags `text-muted-foreground` removal as a regression | Rule mis-tuned in DS_CLIENT_USAGE.md | re-read the rule quote; if the rule says "prefer muted", surface the conflict with the new visibility clause in `ds-client-constrained-execution` skill — escalate to user |
| `MockAuthToggle` doesn't render in dev after Task 1 | Import path wrong in one of the two `layout.tsx` files | check `/` and `/pocha` routes in browser, inspect console for import error |

## Related context for the executor

- `feedback_interactive_direct_push` — Mode D lanes push direct to `dev`, no PR
- `feedback_intro_foreground` — primary content never uses `text-muted-foreground`
- `ds-client-constrained-execution` SKILL.md "Redesign over Preserve" — visibility rule
- `CLAUDE.md` post-merge sync section — required even for direct-push work
- DS Card `hoverable` prop — NOT used in this plan (PochaSummary stays non-hoverable by design)
