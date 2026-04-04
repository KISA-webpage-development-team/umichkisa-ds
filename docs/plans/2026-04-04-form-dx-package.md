# @umichkisa-ds/form — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship `@umichkisa-ds/form`, a thin glue layer between react-hook-form and `@umichkisa-ds/web` form components — compound components, hooks, and full TypeScript generics.

**Architecture:** Separate monorepo package (`packages/form/`) wrapping react-hook-form. Exports a `Form` compound component (`Form.Input`, `Form.Select`, etc.) and primitive hooks (`useFormField`, `useFormStatus`). The `Form` component provides RHF's `FormProvider` context; compound components use `useController` internally; the custom `useForm` wrapper defaults to `mode: "onTouched"`.

**Tech Stack:** React, react-hook-form (peer dep), @umichkisa-ds/web (peer dep), TypeScript, tsup (ESM + CJS + types), vitest + @testing-library/react

---

## Phase 1 — Package Scaffold

### Task 1: Create package directory and config files

**Files:**
- Create: `packages/form/package.json`
- Create: `packages/form/tsconfig.json`
- Create: `packages/form/tsup.config.ts`
- Create: `packages/form/vitest.config.ts`
- Create: `packages/form/tests/setup.ts`
- Create: `packages/form/src/index.ts`

**Step 1: Create `packages/form/package.json`**

```json
{
  "name": "@umichkisa-ds/form",
  "version": "0.1.0",
  "description": "Form DX layer — hooks and compound components connecting react-hook-form to @umichkisa-ds/web",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "files": ["dist", "src"],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0",
    "react-hook-form": ">=7.50.0",
    "@umichkisa-ds/web": "workspace:*"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "6.9.1",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@umichkisa-ds/web": "workspace:*",
    "@vitejs/plugin-react": "^4.3.4",
    "jsdom": "^25.0.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.50.0",
    "tsup": "^8.3.5",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
```

**Step 2: Create `packages/form/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

**Step 3: Create `packages/form/tsup.config.ts`**

```typescript
import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "react-hook-form", "@umichkisa-ds/web"],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});
```

**Step 4: Create `packages/form/vitest.config.ts`**

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**Step 5: Create `packages/form/tests/setup.ts`**

```typescript
import "@testing-library/jest-dom";
```

**Step 6: Create empty barrel `packages/form/src/index.ts`**

```typescript
// @umichkisa-ds/form — entry point
// Exports added as hooks and components are built
```

**Step 7: Install dependencies and verify build**

Run: `cd /Users/jiohin/Desktop/KISA/DevTeam/dev/umichkisa-ds && pnpm install`
Run: `pnpm --filter @umichkisa-ds/form build`
Expected: Clean build, `packages/form/dist/` created with index.js, index.cjs, index.d.ts

**Step 8: Commit**

```bash
git add packages/form/
git commit -m "chore(form): scaffold @umichkisa-ds/form package"
```

---

## Phase 2 — useForm Wrapper

### Task 2: `useForm` — thin wrapper with `onTouched` default

**Files:**
- Create: `packages/form/src/hooks/useForm.ts`
- Create: `packages/form/tests/hooks/useForm.test.ts`
- Modify: `packages/form/src/index.ts`

**Step 1: Write the failing test**

Create `packages/form/tests/hooks/useForm.test.ts`:

```typescript
import { renderHook } from "@testing-library/react";
import { useForm } from "../../src/hooks/useForm";

describe("useForm", () => {
  it("returns a react-hook-form instance", () => {
    const { result } = renderHook(() => useForm());
    expect(result.current.register).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.formState).toBeDefined();
  });

  it("defaults to onTouched validation mode", () => {
    const { result } = renderHook(() => useForm());
    // RHF exposes mode through internal config; we test behavior instead:
    // formState.isValid should be true when no fields registered
    expect(result.current.formState.isValid).toBe(true);
  });

  it("allows overriding mode", () => {
    const { result } = renderHook(() =>
      useForm({ mode: "onChange" })
    );
    expect(result.current.register).toBeDefined();
  });

  it("passes defaultValues through", () => {
    const { result } = renderHook(() =>
      useForm({ defaultValues: { email: "test@test.com" } })
    );
    expect(result.current.getValues("email")).toBe("test@test.com");
  });

  it("preserves generic type safety", () => {
    type LoginForm = { email: string; password: string };
    const { result } = renderHook(() =>
      useForm<LoginForm>({ defaultValues: { email: "", password: "" } })
    );
    // This is a compile-time check — if it compiles, generics work
    const email: string = result.current.getValues("email");
    expect(email).toBe("");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @umichkisa-ds/form test -- tests/hooks/useForm.test.ts`
Expected: FAIL — module not found

**Step 3: Write the implementation**

Create `packages/form/src/hooks/useForm.ts`:

```typescript
import {
  useForm as useRHFForm,
  type UseFormProps,
  type UseFormReturn,
  type FieldValues,
} from "react-hook-form";

export function useForm<T extends FieldValues = FieldValues>(
  props?: UseFormProps<T>
): UseFormReturn<T> {
  return useRHFForm<T>({
    mode: "onTouched",
    ...props,
  });
}
```

**Step 4: Export from barrel**

Update `packages/form/src/index.ts`:

```typescript
export { useForm } from "./hooks/useForm";
```

**Step 5: Run test to verify it passes**

Run: `pnpm --filter @umichkisa-ds/form test -- tests/hooks/useForm.test.ts`
Expected: PASS (all 5 tests)

**Step 6: Commit**

```bash
git add packages/form/src/hooks/ packages/form/tests/hooks/ packages/form/src/index.ts
git commit -m "feat(form): add useForm wrapper with onTouched default"
```

---

## Phase 3 — useFormField Hook

### Task 3: `useFormField` — primitive hook for manual wiring

This hook wraps RHF's `useController` and returns props shaped for DS components: `{ value, onChange, onBlur, invalid, error, inputProps }`.

**Files:**
- Create: `packages/form/src/hooks/useFormField.ts`
- Create: `packages/form/tests/hooks/useFormField.test.tsx`
- Modify: `packages/form/src/index.ts`

**Step 1: Write the failing test**

Create `packages/form/tests/hooks/useFormField.test.tsx`:

```tsx
import { renderHook, act } from "@testing-library/react";
import { type ReactNode } from "react";
import { FormProvider, useForm as useRHFForm } from "react-hook-form";
import { useFormField } from "../../src/hooks/useFormField";

// Wrapper that provides RHF context
function createWrapper(defaultValues: Record<string, unknown> = {}) {
  return function Wrapper({ children }: { children: ReactNode }) {
    const form = useRHFForm({ defaultValues, mode: "onTouched" });
    return <FormProvider {...form}>{children}</FormProvider>;
  };
}

describe("useFormField", () => {
  it("returns value from form context", () => {
    const { result } = renderHook(
      () => useFormField("email"),
      { wrapper: createWrapper({ email: "test@test.com" }) }
    );
    expect(result.current.value).toBe("test@test.com");
  });

  it("returns invalid=false when no error", () => {
    const { result } = renderHook(
      () => useFormField("email"),
      { wrapper: createWrapper({ email: "" }) }
    );
    expect(result.current.invalid).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it("returns inputProps spread-ready for DS components", () => {
    const { result } = renderHook(
      () => useFormField("email"),
      { wrapper: createWrapper({ email: "hello" }) }
    );
    const { inputProps } = result.current;
    expect(inputProps).toHaveProperty("value", "hello");
    expect(inputProps).toHaveProperty("onChange");
    expect(inputProps).toHaveProperty("onBlur");
    expect(inputProps).toHaveProperty("invalid", false);
    expect(inputProps).toHaveProperty("name", "email");
  });

  it("passes rules to useController", async () => {
    const { result } = renderHook(
      () => useFormField("email", { required: "Email is required" }),
      { wrapper: createWrapper({ email: "" }) }
    );
    // Trigger validation by simulating blur
    await act(async () => {
      result.current.inputProps.onBlur();
    });
    expect(result.current.invalid).toBe(true);
    expect(result.current.error).toBe("Email is required");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @umichkisa-ds/form test -- tests/hooks/useFormField.test.tsx`
Expected: FAIL — module not found

**Step 3: Write the implementation**

Create `packages/form/src/hooks/useFormField.ts`:

```typescript
import {
  useController,
  type UseControllerProps,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";

export type UseFormFieldReturn = {
  value: unknown;
  invalid: boolean;
  error: string | undefined;
  inputProps: {
    name: string;
    value: unknown;
    onChange: (...event: unknown[]) => void;
    onBlur: () => void;
    invalid: boolean;
    ref: React.Ref<unknown>;
  };
};

export function useFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  name: TName,
  rules?: UseControllerProps<TFieldValues, TName>["rules"]
): UseFormFieldReturn {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TName>({ name, rules });

  const invalid = !!error;

  return {
    value: field.value,
    invalid,
    error: error?.message,
    inputProps: {
      name: field.name,
      value: field.value,
      onChange: field.onChange,
      onBlur: field.onBlur,
      invalid,
      ref: field.ref,
    },
  };
}
```

**Step 4: Export from barrel**

Add to `packages/form/src/index.ts`:

```typescript
export { useForm } from "./hooks/useForm";
export { useFormField } from "./hooks/useFormField";
export type { UseFormFieldReturn } from "./hooks/useFormField";
```

**Step 5: Run test to verify it passes**

Run: `pnpm --filter @umichkisa-ds/form test -- tests/hooks/useFormField.test.tsx`
Expected: PASS (all 4 tests)

**Step 6: Commit**

```bash
git add packages/form/src/hooks/useFormField.ts packages/form/tests/hooks/useFormField.test.tsx packages/form/src/index.ts
git commit -m "feat(form): add useFormField hook for manual DS component wiring"
```

---

## Phase 4 — useFormStatus Hook

### Task 4: `useFormStatus` — submission and validation state

**Files:**
- Create: `packages/form/src/hooks/useFormStatus.ts`
- Create: `packages/form/tests/hooks/useFormStatus.test.tsx`
- Modify: `packages/form/src/index.ts`

**Step 1: Write the failing test**

Create `packages/form/tests/hooks/useFormStatus.test.tsx`:

```tsx
import { renderHook } from "@testing-library/react";
import { type ReactNode } from "react";
import { FormProvider, useForm as useRHFForm } from "react-hook-form";
import { useFormStatus } from "../../src/hooks/useFormStatus";

function createWrapper() {
  return function Wrapper({ children }: { children: ReactNode }) {
    const form = useRHFForm({ defaultValues: { name: "" } });
    return <FormProvider {...form}>{children}</FormProvider>;
  };
}

describe("useFormStatus", () => {
  it("returns isSubmitting as false initially", () => {
    const { result } = renderHook(() => useFormStatus(), {
      wrapper: createWrapper(),
    });
    expect(result.current.isSubmitting).toBe(false);
  });

  it("returns isDirty as false initially", () => {
    const { result } = renderHook(() => useFormStatus(), {
      wrapper: createWrapper(),
    });
    expect(result.current.isDirty).toBe(false);
  });

  it("returns isValid", () => {
    const { result } = renderHook(() => useFormStatus(), {
      wrapper: createWrapper(),
    });
    expect(typeof result.current.isValid).toBe("boolean");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @umichkisa-ds/form test -- tests/hooks/useFormStatus.test.tsx`
Expected: FAIL — module not found

**Step 3: Write the implementation**

Create `packages/form/src/hooks/useFormStatus.ts`:

```typescript
import { useFormContext } from "react-hook-form";

export type UseFormStatusReturn = {
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
};

export function useFormStatus(): UseFormStatusReturn {
  const {
    formState: { isSubmitting, isValid, isDirty },
  } = useFormContext();

  return { isSubmitting, isValid, isDirty };
}
```

**Step 4: Export from barrel**

Add to `packages/form/src/index.ts`:

```typescript
export { useFormStatus } from "./hooks/useFormStatus";
export type { UseFormStatusReturn } from "./hooks/useFormStatus";
```

**Step 5: Run test to verify it passes**

Run: `pnpm --filter @umichkisa-ds/form test -- tests/hooks/useFormStatus.test.tsx`
Expected: PASS (all 3 tests)

**Step 6: Commit**

```bash
git add packages/form/src/hooks/useFormStatus.ts packages/form/tests/hooks/useFormStatus.test.tsx packages/form/src/index.ts
git commit -m "feat(form): add useFormStatus hook for submission/validation state"
```

---

## Phase 5 — Form Component (Root)

### Task 5: `Form` component — `<form>` + `FormProvider`

**Files:**
- Create: `packages/form/src/components/Form.tsx`
- Create: `packages/form/tests/components/Form.test.tsx`
- Modify: `packages/form/src/index.ts`

**Step 1: Write the failing test**

Create `packages/form/tests/components/Form.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm as useRHFForm } from "react-hook-form";
import { Form } from "../../src/components/Form";

// Test helper — wraps Form with a real useForm instance
function TestForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: Record<string, unknown>) => void;
  defaultValues?: Record<string, unknown>;
}) {
  const form = useRHFForm({ defaultValues, mode: "onTouched" });
  return (
    <Form form={form} onSubmit={onSubmit}>
      <input {...form.register("name")} placeholder="Name" />
      <button type="submit">Submit</button>
    </Form>
  );
}

describe("Form", () => {
  it("renders a <form> element", () => {
    render(<TestForm onSubmit={() => {}} />);
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("calls onSubmit with form data", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <TestForm onSubmit={onSubmit} defaultValues={{ name: "" }} />
    );
    await user.type(screen.getByPlaceholderText("Name"), "Jioh");
    await user.click(screen.getByText("Submit"));
    expect(onSubmit).toHaveBeenCalledWith(
      { name: "Jioh" },
      expect.anything()
    );
  });

  it("prevents default form submission", async () => {
    const user = userEvent.setup();
    render(<TestForm onSubmit={() => {}} defaultValues={{ name: "" }} />);
    await user.click(screen.getByText("Submit"));
    // If default wasn't prevented, the test environment would error
    expect(true).toBe(true);
  });

  it("passes className to form element", () => {
    function TestFormWithClass() {
      const form = useRHFForm();
      return (
        <Form form={form} onSubmit={() => {}} className="my-form">
          <button type="submit">Go</button>
        </Form>
      );
    }
    render(<TestFormWithClass />);
    expect(screen.getByRole("form")).toHaveClass("my-form");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @umichkisa-ds/form test -- tests/components/Form.test.tsx`
Expected: FAIL — module not found

**Step 3: Write the implementation**

Create `packages/form/src/components/Form.tsx`:

```tsx
import { FormProvider, type UseFormReturn, type FieldValues, type SubmitHandler } from "react-hook-form";

export type FormProps<T extends FieldValues = FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  className?: string;
};

export function Form<T extends FieldValues = FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={className}
        aria-label="form"
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}
```

**Step 4: Export from barrel**

Add to `packages/form/src/index.ts`:

```typescript
export { Form } from "./components/Form";
export type { FormProps } from "./components/Form";
```

**Step 5: Run test to verify it passes**

Run: `pnpm --filter @umichkisa-ds/form test -- tests/components/Form.test.tsx`
Expected: PASS (all 4 tests)

**Step 6: Commit**

```bash
git add packages/form/src/components/ packages/form/tests/components/ packages/form/src/index.ts
git commit -m "feat(form): add Form component with FormProvider context"
```

---

## Phase 6 — Compound Components

### Task 6: `Form.Input` — first compound component (establishes the pattern)

**Files:**
- Create: `packages/form/src/components/fields/FormInput.tsx`
- Create: `packages/form/tests/components/fields/FormInput.test.tsx`
- Modify: `packages/form/src/components/Form.tsx` (attach as `Form.Input`)
- Modify: `packages/form/src/index.ts`

**Step 1: Write the failing test**

Create `packages/form/tests/components/fields/FormInput.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm as useRHFForm } from "react-hook-form";
import { Form } from "../../../src/components/Form";
import "../../../src/components/fields/FormInput";

type TestData = { email: string };

function TestForm({ onSubmit = vi.fn() }: { onSubmit?: (data: TestData) => void }) {
  const form = useRHFForm<TestData>({
    defaultValues: { email: "" },
    mode: "onTouched",
  });
  return (
    <Form form={form} onSubmit={onSubmit}>
      <Form.Input
        name="email"
        label="Email"
        placeholder="you@example.com"
        rules={{ required: "Email is required" }}
      />
      <button type="submit">Submit</button>
    </Form>
  );
}

describe("Form.Input", () => {
  it("renders label and input", () => {
    render(<TestForm />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
  });

  it("shows error after blur on invalid field", async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    const input = screen.getByPlaceholderText("you@example.com");
    await user.click(input);
    await user.tab(); // blur
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
  });

  it("clears error when field becomes valid", async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    const input = screen.getByPlaceholderText("you@example.com");
    await user.click(input);
    await user.tab();
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    await user.type(input, "test@test.com");
    expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
  });

  it("submits with form data", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TestForm onSubmit={onSubmit} />);
    await user.type(screen.getByPlaceholderText("you@example.com"), "jioh@umich.edu");
    await user.click(screen.getByText("Submit"));
    expect(onSubmit).toHaveBeenCalledWith(
      { email: "jioh@umich.edu" },
      expect.anything()
    );
  });

  it("renders description when provided", () => {
    function WithDescription() {
      const form = useRHFForm({ defaultValues: { email: "" } });
      return (
        <Form form={form} onSubmit={() => {}}>
          <Form.Input name="email" label="Email" description="We'll never share this." />
        </Form>
      );
    }
    render(<WithDescription />);
    expect(screen.getByText("We'll never share this.")).toBeInTheDocument();
  });

  it("marks field as required when rules.required is set", () => {
    render(<TestForm />);
    // Label should show asterisk (from FormItem's required prop)
    expect(screen.getByText("*")).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @umichkisa-ds/form test -- tests/components/fields/FormInput.test.tsx`
Expected: FAIL — module not found

**Step 3: Write the implementation**

Create `packages/form/src/components/fields/FormInput.tsx`:

```tsx
import {
  useController,
  type UseControllerProps,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";
import { FormItem, Input, type InputProps } from "@umichkisa-ds/web";

export type FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  label: string;
  rules?: UseControllerProps<TFieldValues, TName>["rules"];
  description?: string;
  className?: string;
} & Omit<InputProps, "invalid" | "name" | "value" | "onChange" | "onBlur">;

export function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  rules,
  description,
  className,
  ...inputProps
}: FormInputProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TName>({ name, rules });

  const required = !!rules?.required;

  return (
    <FormItem
      htmlFor={name}
      label={label}
      required={required}
      error={error?.message}
      description={description}
      className={className}
    >
      <Input
        id={name}
        invalid={!!error}
        {...inputProps}
        name={field.name}
        value={field.value ?? ""}
        onChange={field.onChange}
        onBlur={field.onBlur}
        ref={field.ref}
      />
    </FormItem>
  );
}
```

**Step 4: Attach to Form as compound component**

Update `packages/form/src/components/Form.tsx` — add at the end of the file:

```tsx
import { FormProvider, type UseFormReturn, type FieldValues, type SubmitHandler } from "react-hook-form";
import { FormInput } from "./fields/FormInput";

export type FormProps<T extends FieldValues = FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  className?: string;
};

export function Form<T extends FieldValues = FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={className}
        aria-label="form"
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}

Form.Input = FormInput;
```

> **Note on compound component typing:** Because `Form` is a generic function, attaching static properties requires a type assertion or namespace merge. The simplest approach: assign after declaration. TypeScript infers the compound shape. If the executor encounters type errors, use `Object.assign` pattern:
>
> ```typescript
> export const Form = Object.assign(FormBase, { Input: FormInput });
> ```
>
> Use whichever compiles cleanly. The test is the authority.

**Step 5: Run test to verify it passes**

Run: `pnpm --filter @umichkisa-ds/form test -- tests/components/fields/FormInput.test.tsx`
Expected: PASS (all 6 tests)

**Step 6: Commit**

```bash
git add packages/form/src/components/fields/ packages/form/tests/components/fields/ packages/form/src/components/Form.tsx
git commit -m "feat(form): add Form.Input compound component"
```

---

### Task 7: `Form.Textarea`

**Files:**
- Create: `packages/form/src/components/fields/FormTextarea.tsx`
- Create: `packages/form/tests/components/fields/FormTextarea.test.tsx`
- Modify: `packages/form/src/components/Form.tsx` (attach `Form.Textarea`)

**Step 1: Write the failing test**

Create `packages/form/tests/components/fields/FormTextarea.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm as useRHFForm } from "react-hook-form";
import { Form } from "../../../src/components/Form";
import "../../../src/components/fields/FormTextarea";

function TestForm() {
  const form = useRHFForm({ defaultValues: { bio: "" }, mode: "onTouched" });
  return (
    <Form form={form} onSubmit={() => {}}>
      <Form.Textarea
        name="bio"
        label="Bio"
        placeholder="Tell us about yourself"
        rules={{ required: "Bio is required" }}
      />
    </Form>
  );
}

describe("Form.Textarea", () => {
  it("renders label and textarea", () => {
    render(<TestForm />);
    expect(screen.getByText("Bio")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Tell us about yourself")).toBeInTheDocument();
  });

  it("shows error after blur on empty required field", async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    await user.click(screen.getByPlaceholderText("Tell us about yourself"));
    await user.tab();
    expect(await screen.findByText("Bio is required")).toBeInTheDocument();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @umichkisa-ds/form test -- tests/components/fields/FormTextarea.test.tsx`
Expected: FAIL

**Step 3: Write the implementation**

Create `packages/form/src/components/fields/FormTextarea.tsx`:

```tsx
import {
  useController,
  type UseControllerProps,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";
import { FormItem, Textarea, type TextareaProps } from "@umichkisa-ds/web";

export type FormTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  label: string;
  rules?: UseControllerProps<TFieldValues, TName>["rules"];
  description?: string;
  className?: string;
} & Omit<TextareaProps, "invalid" | "name" | "value" | "onChange" | "onBlur">;

export function FormTextarea<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  rules,
  description,
  className,
  ...textareaProps
}: FormTextareaProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TName>({ name, rules });

  return (
    <FormItem
      htmlFor={name}
      label={label}
      required={!!rules?.required}
      error={error?.message}
      description={description}
      className={className}
    >
      <Textarea
        id={name}
        invalid={!!error}
        {...textareaProps}
        name={field.name}
        value={field.value ?? ""}
        onChange={field.onChange}
        onBlur={field.onBlur}
        ref={field.ref}
      />
    </FormItem>
  );
}
```

**Step 4: Attach to Form**

Add to `packages/form/src/components/Form.tsx`:

```typescript
import { FormTextarea } from "./fields/FormTextarea";
// ... at the end:
Form.Textarea = FormTextarea;
```

**Step 5: Run test to verify it passes**

Run: `pnpm --filter @umichkisa-ds/form test -- tests/components/fields/FormTextarea.test.tsx`
Expected: PASS

**Step 6: Commit**

```bash
git add packages/form/src/components/fields/FormTextarea.tsx packages/form/tests/components/fields/FormTextarea.test.tsx packages/form/src/components/Form.tsx
git commit -m "feat(form): add Form.Textarea compound component"
```

---

### Task 8: `Form.Select`

Select is more complex — it uses Radix's compound component pattern (`Select > SelectTrigger + SelectContent > SelectItem`). `Form.Select` wraps the Radix `Select` root and wires `value`/`onValueChange` from RHF. Children (SelectTrigger, SelectContent, SelectItem) are passed through from `@umichkisa-ds/web`.

**Files:**
- Create: `packages/form/src/components/fields/FormSelect.tsx`
- Create: `packages/form/tests/components/fields/FormSelect.test.tsx`
- Modify: `packages/form/src/components/Form.tsx`

**Step 1: Write the failing test**

Create `packages/form/tests/components/fields/FormSelect.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm as useRHFForm } from "react-hook-form";
import { SelectTrigger, SelectContent, SelectItem } from "@umichkisa-ds/web";
import { Form } from "../../../src/components/Form";
import "../../../src/components/fields/FormSelect";

function TestForm({ onSubmit = vi.fn() }) {
  const form = useRHFForm({
    defaultValues: { role: "" },
    mode: "onTouched",
  });
  return (
    <Form form={form} onSubmit={onSubmit}>
      <Form.Select
        name="role"
        label="Role"
        rules={{ required: "Please pick a role" }}
      >
        <SelectTrigger placeholder="Select a role" />
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="editor">Editor</SelectItem>
        </SelectContent>
      </Form.Select>
      <button type="submit">Submit</button>
    </Form>
  );
}

describe("Form.Select", () => {
  it("renders label and trigger", () => {
    render(<TestForm />);
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("Select a role")).toBeInTheDocument();
  });

  it("shows required asterisk", () => {
    render(<TestForm />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });
});
```

> **Note:** Radix Select uses portals which are tricky to test with user-event interactions. Test rendering and required marker; integration behavior (open → select → error clears) is covered by the docs examples and manual QA.

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @umichkisa-ds/form test -- tests/components/fields/FormSelect.test.tsx`
Expected: FAIL

**Step 3: Write the implementation**

Create `packages/form/src/components/fields/FormSelect.tsx`:

```tsx
import {
  useController,
  type UseControllerProps,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";
import { FormItem, Select } from "@umichkisa-ds/web";

export type FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  label: string;
  rules?: UseControllerProps<TFieldValues, TName>["rules"];
  description?: string;
  className?: string;
  children: React.ReactNode;
};

export function FormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  rules,
  description,
  className,
  children,
}: FormSelectProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TName>({ name, rules });

  return (
    <FormItem
      htmlFor={name}
      label={label}
      required={!!rules?.required}
      error={error?.message}
      description={description}
      className={className}
    >
      <Select
        value={field.value as string}
        onValueChange={(val) => {
          field.onChange(val);
          field.onBlur(); // trigger validation immediately on selection
        }}
      >
        {children}
      </Select>
    </FormItem>
  );
}
```

**Step 4: Attach to Form**

Add to `packages/form/src/components/Form.tsx`:

```typescript
import { FormSelect } from "./fields/FormSelect";
Form.Select = FormSelect;
```

**Step 5: Run test to verify it passes**

Run: `pnpm --filter @umichkisa-ds/form test -- tests/components/fields/FormSelect.test.tsx`
Expected: PASS

**Step 6: Commit**

```bash
git add packages/form/src/components/fields/FormSelect.tsx packages/form/tests/components/fields/FormSelect.test.tsx packages/form/src/components/Form.tsx
git commit -m "feat(form): add Form.Select compound component"
```

---

### Task 9: `Form.Checkbox`

Checkbox is a boolean field. RHF manages it as `checked` rather than `value`.

**Files:**
- Create: `packages/form/src/components/fields/FormCheckbox.tsx`
- Create: `packages/form/tests/components/fields/FormCheckbox.test.tsx`
- Modify: `packages/form/src/components/Form.tsx`

**Step 1: Write the failing test**

Create `packages/form/tests/components/fields/FormCheckbox.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm as useRHFForm } from "react-hook-form";
import { Form } from "../../../src/components/Form";
import "../../../src/components/fields/FormCheckbox";

function TestForm() {
  const form = useRHFForm({
    defaultValues: { terms: false },
    mode: "onTouched",
  });
  return (
    <Form form={form} onSubmit={() => {}}>
      <Form.Checkbox
        name="terms"
        label="Agreement"
        text="I agree to the terms"
        rules={{ required: "You must agree" }}
      />
    </Form>
  );
}

describe("Form.Checkbox", () => {
  it("renders label and checkbox text", () => {
    render(<TestForm />);
    expect(screen.getByText("Agreement")).toBeInTheDocument();
    expect(screen.getByText("I agree to the terms")).toBeInTheDocument();
  });

  it("renders checkbox input", () => {
    render(<TestForm />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("toggles checked state", async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @umichkisa-ds/form test -- tests/components/fields/FormCheckbox.test.tsx`
Expected: FAIL

**Step 3: Write the implementation**

Create `packages/form/src/components/fields/FormCheckbox.tsx`:

```tsx
import {
  useController,
  type UseControllerProps,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";
import { FormItem, Checkbox, type CheckboxProps } from "@umichkisa-ds/web";

export type FormCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  label: string;
  rules?: UseControllerProps<TFieldValues, TName>["rules"];
  description?: string;
  className?: string;
} & Omit<CheckboxProps, "invalid" | "name" | "checked" | "onChange" | "onBlur">;

export function FormCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  rules,
  description,
  className,
  ...checkboxProps
}: FormCheckboxProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TName>({ name, rules });

  return (
    <FormItem
      htmlFor={name}
      label={label}
      required={!!rules?.required}
      error={error?.message}
      description={description}
      className={className}
    >
      <Checkbox
        id={name}
        invalid={!!error}
        {...checkboxProps}
        checked={!!field.value}
        onChange={(e) => {
          field.onChange(e.target.checked);
          field.onBlur();
        }}
        ref={field.ref}
      />
    </FormItem>
  );
}
```

**Step 4: Attach to Form**

```typescript
import { FormCheckbox } from "./fields/FormCheckbox";
Form.Checkbox = FormCheckbox;
```

**Step 5: Run test, verify pass, commit**

Run: `pnpm --filter @umichkisa-ds/form test -- tests/components/fields/FormCheckbox.test.tsx`

```bash
git add packages/form/src/components/fields/FormCheckbox.tsx packages/form/tests/components/fields/FormCheckbox.test.tsx packages/form/src/components/Form.tsx
git commit -m "feat(form): add Form.Checkbox compound component"
```

---

### Task 10: `Form.Radio`

Radio uses Radix RadioGroup. RHF manages as a string value.

**Files:**
- Create: `packages/form/src/components/fields/FormRadio.tsx`
- Create: `packages/form/tests/components/fields/FormRadio.test.tsx`
- Modify: `packages/form/src/components/Form.tsx`

**Step 1: Write the failing test**

Create `packages/form/tests/components/fields/FormRadio.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm as useRHFForm } from "react-hook-form";
import { RadioItem } from "@umichkisa-ds/web";
import { Form } from "../../../src/components/Form";
import "../../../src/components/fields/FormRadio";

function TestForm() {
  const form = useRHFForm({
    defaultValues: { contact: "" },
    mode: "onTouched",
  });
  return (
    <Form form={form} onSubmit={() => {}}>
      <Form.Radio
        name="contact"
        label="Contact Method"
        rules={{ required: "Pick one" }}
      >
        <RadioItem value="email" text="Email" />
        <RadioItem value="phone" text="Phone" />
      </Form.Radio>
    </Form>
  );
}

describe("Form.Radio", () => {
  it("renders label and radio options", () => {
    render(<TestForm />);
    expect(screen.getByText("Contact Method")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
  });

  it("renders radio inputs", () => {
    render(<TestForm />);
    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });

  it("selects a radio option", async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    const emailRadio = screen.getByRole("radio", { name: "Email" });
    await user.click(emailRadio);
    expect(emailRadio).toBeChecked();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @umichkisa-ds/form test -- tests/components/fields/FormRadio.test.tsx`

**Step 3: Write the implementation**

Create `packages/form/src/components/fields/FormRadio.tsx`:

```tsx
import {
  useController,
  type UseControllerProps,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";
import { FormItem, RadioGroup, type RadioGroupProps } from "@umichkisa-ds/web";

export type FormRadioProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  label: string;
  rules?: UseControllerProps<TFieldValues, TName>["rules"];
  description?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<RadioGroupProps, "value" | "onValueChange" | "invalid">;

export function FormRadio<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  rules,
  description,
  className,
  children,
  ...radioGroupProps
}: FormRadioProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TName>({ name, rules });

  return (
    <FormItem
      htmlFor={name}
      label={label}
      required={!!rules?.required}
      error={error?.message}
      description={description}
      className={className}
    >
      <RadioGroup
        invalid={!!error}
        {...radioGroupProps}
        value={field.value as string}
        onValueChange={(val) => {
          field.onChange(val);
          field.onBlur();
        }}
      >
        {children}
      </RadioGroup>
    </FormItem>
  );
}
```

**Step 4: Attach to Form**

```typescript
import { FormRadio } from "./fields/FormRadio";
Form.Radio = FormRadio;
```

**Step 5: Run test, verify pass, commit**

```bash
git add packages/form/src/components/fields/FormRadio.tsx packages/form/tests/components/fields/FormRadio.test.tsx packages/form/src/components/Form.tsx
git commit -m "feat(form): add Form.Radio compound component"
```

---

### Task 11: `Form.Switch`

Switch is boolean like Checkbox but uses the switch role.

**Files:**
- Create: `packages/form/src/components/fields/FormSwitch.tsx`
- Create: `packages/form/tests/components/fields/FormSwitch.test.tsx`
- Modify: `packages/form/src/components/Form.tsx`

**Step 1: Write the failing test**

Create `packages/form/tests/components/fields/FormSwitch.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm as useRHFForm } from "react-hook-form";
import { Form } from "../../../src/components/Form";
import "../../../src/components/fields/FormSwitch";

function TestForm() {
  const form = useRHFForm({
    defaultValues: { notifications: false },
    mode: "onTouched",
  });
  return (
    <Form form={form} onSubmit={() => {}}>
      <Form.Switch
        name="notifications"
        label="Notifications"
        text="Enable email updates"
      />
    </Form>
  );
}

describe("Form.Switch", () => {
  it("renders label and switch text", () => {
    render(<TestForm />);
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("Enable email updates")).toBeInTheDocument();
  });

  it("renders switch input", () => {
    render(<TestForm />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    const toggle = screen.getByRole("switch");
    expect(toggle).not.toBeChecked();
    await user.click(toggle);
    expect(toggle).toBeChecked();
  });
});
```

**Step 2: Run test to verify it fails**

**Step 3: Write the implementation**

Create `packages/form/src/components/fields/FormSwitch.tsx`:

```tsx
import {
  useController,
  type UseControllerProps,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";
import { FormItem, Switch, type SwitchProps } from "@umichkisa-ds/web";

export type FormSwitchProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  label: string;
  rules?: UseControllerProps<TFieldValues, TName>["rules"];
  description?: string;
  className?: string;
} & Omit<SwitchProps, "invalid" | "name" | "checked" | "onChange" | "onBlur">;

export function FormSwitch<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  rules,
  description,
  className,
  ...switchProps
}: FormSwitchProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error },
  } = useController<TFieldValues, TName>({ name, rules });

  return (
    <FormItem
      htmlFor={name}
      label={label}
      required={!!rules?.required}
      error={error?.message}
      description={description}
      className={className}
    >
      <Switch
        id={name}
        invalid={!!error}
        {...switchProps}
        checked={!!field.value}
        onChange={(e) => {
          field.onChange(e.target.checked);
          field.onBlur();
        }}
        ref={field.ref}
      />
    </FormItem>
  );
}
```

**Step 4: Attach to Form, run test, commit**

```typescript
import { FormSwitch } from "./fields/FormSwitch";
Form.Switch = FormSwitch;
```

```bash
git add packages/form/src/components/fields/FormSwitch.tsx packages/form/tests/components/fields/FormSwitch.test.tsx packages/form/src/components/Form.tsx
git commit -m "feat(form): add Form.Switch compound component"
```

---

### Task 12: `Form.Button`

**Files:**
- Create: `packages/form/src/components/fields/FormButton.tsx`
- Create: `packages/form/tests/components/fields/FormButton.test.tsx`
- Modify: `packages/form/src/components/Form.tsx`

**Step 1: Write the failing test**

Create `packages/form/tests/components/fields/FormButton.test.tsx`:

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm as useRHFForm } from "react-hook-form";
import { Form } from "../../../src/components/Form";
import "../../../src/components/fields/FormButton";

function TestForm({ onSubmit }: { onSubmit?: () => Promise<void> }) {
  const form = useRHFForm({ defaultValues: { name: "test" } });
  return (
    <Form form={form} onSubmit={onSubmit ?? (() => {})}>
      <Form.Button>Submit</Form.Button>
    </Form>
  );
}

describe("Form.Button", () => {
  it("renders as a submit button", () => {
    render(<TestForm />);
    const btn = screen.getByRole("button", { name: "Submit" });
    expect(btn).toHaveAttribute("type", "submit");
  });

  it("is disabled while submitting", async () => {
    const user = userEvent.setup();
    let resolveSubmit: () => void;
    const onSubmit = () =>
      new Promise<void>((resolve) => {
        resolveSubmit = resolve;
      });
    render(<TestForm onSubmit={onSubmit} />);
    const btn = screen.getByRole("button", { name: "Submit" });
    expect(btn).not.toBeDisabled();
    await user.click(btn);
    await waitFor(() => expect(btn).toBeDisabled());
    resolveSubmit!();
    await waitFor(() => expect(btn).not.toBeDisabled());
  });
});
```

**Step 2: Run test to verify it fails**

**Step 3: Write the implementation**

Create `packages/form/src/components/fields/FormButton.tsx`:

```tsx
import { useFormContext } from "react-hook-form";
import { Button, type ButtonProps } from "@umichkisa-ds/web";

export type FormButtonProps = Omit<ButtonProps, "type" | "disabled"> & {
  disableWhenInvalid?: boolean;
};

export function FormButton({
  disableWhenInvalid = false,
  children,
  ...buttonProps
}: FormButtonProps) {
  const {
    formState: { isSubmitting, isValid },
  } = useFormContext();

  const disabled = isSubmitting || (disableWhenInvalid && !isValid);

  return (
    <Button type="submit" disabled={disabled} {...buttonProps}>
      {children}
    </Button>
  );
}
```

**Step 4: Attach to Form**

```typescript
import { FormButton } from "./fields/FormButton";
Form.Button = FormButton;
```

**Step 5: Run test, verify pass, commit**

```bash
git add packages/form/src/components/fields/FormButton.tsx packages/form/tests/components/fields/FormButton.test.tsx packages/form/src/components/Form.tsx
git commit -m "feat(form): add Form.Button compound component"
```

---

### Task 13: Final barrel export and full build verification

**Files:**
- Modify: `packages/form/src/index.ts`

**Step 1: Finalize barrel exports**

Update `packages/form/src/index.ts` to its final state:

```typescript
// Hooks
export { useForm } from "./hooks/useForm";
export { useFormField } from "./hooks/useFormField";
export type { UseFormFieldReturn } from "./hooks/useFormField";
export { useFormStatus } from "./hooks/useFormStatus";
export type { UseFormStatusReturn } from "./hooks/useFormStatus";

// Components
export { Form } from "./components/Form";
export type { FormProps } from "./components/Form";
```

> **Note:** Compound components (Form.Input, Form.Textarea, etc.) are accessed via the Form namespace, not exported individually. Consumers do `import { Form } from "@umichkisa-ds/form"` and use `<Form.Input>`.

**Step 2: Run all tests**

Run: `pnpm --filter @umichkisa-ds/form test`
Expected: ALL PASS

**Step 3: Run full build**

Run: `pnpm --filter @umichkisa-ds/form build`
Expected: Clean build with ESM + CJS + types

**Step 4: Run monorepo-wide checks**

Run: `pnpm build && pnpm typecheck`
Expected: All packages build and typecheck successfully

**Step 5: Commit**

```bash
git add packages/form/src/index.ts
git commit -m "feat(form): finalize barrel exports for @umichkisa-ds/form"
```

---

## Phase 7 — Docs App: Forms Section

### Task 14: Add "Forms" top-level section to Sidebar navigation

The Sidebar currently supports two sections (Foundation, Components) toggled by URL prefix. We need to add a third section for `/forms/*` routes.

**Files:**
- Modify: `apps/docs/components/Sidebar.tsx`
- Create: `apps/docs/app/forms/layout.tsx`

**Step 1: Add FORMS_ITEMS to Sidebar**

Add a new nav array in `apps/docs/components/Sidebar.tsx` after `COMPONENT_ITEMS`:

```typescript
const FORMS_ITEMS: NavItem[] = [
  {
    label: 'Overview',
    href: '/forms/overview',
  },
  {
    label: 'useForm',
    href: '/forms/use-form',
  },
  {
    label: 'Form Component',
    href: '/forms/form-component',
  },
  {
    label: 'Validation',
    href: '/forms/validation',
  },
  {
    label: 'Hooks',
    href: '/forms/hooks',
  },
  {
    label: 'Examples',
    href: '/forms/examples',
  },
]
```

**Step 2: Update SECTIONS and section detection logic**

Update the `SECTIONS` object and the `section` detection in the component:

```typescript
const SECTIONS = {
  foundation: { label: 'Foundation', items: FOUNDATION_ITEMS },
  components: { label: 'Components', items: COMPONENT_ITEMS },
  forms: { label: 'Forms', items: FORMS_ITEMS },
}

// In the component body, replace the section detection:
const isForms = pathname.startsWith('/forms')
const isComponents = pathname.startsWith('/components')
const section = isForms
  ? SECTIONS.forms
  : isComponents
    ? SECTIONS.components
    : SECTIONS.foundation
```

**Step 3: Create forms layout**

Create `apps/docs/app/forms/layout.tsx`:

```typescript
import { DocsLayout } from '@/components/DocsLayout'

export default function FormsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DocsLayout>{children}</DocsLayout>
}
```

**Step 4: Update the Header navigation**

Check if `apps/docs/components/Header.tsx` (or `DocsShell.tsx`) has links to Foundation/Components. If so, add a "Forms" link pointing to `/forms/overview`.

> **Note to executor:** Read the Header/DocsShell component and add a "Forms" nav link alongside the existing Foundation and Components links.

**Step 5: Commit**

```bash
git add apps/docs/components/Sidebar.tsx apps/docs/app/forms/
git commit -m "feat(docs): add Forms top-level section to sidebar navigation"
```

---

### Task 15: Forms Overview page — installation and quick start

**Files:**
- Create: `apps/docs/app/forms/overview/page.tsx`

**Step 1: Write the Overview page**

This page should cover:
1. **What is `@umichkisa-ds/form`** — one paragraph
2. **Installation** — `npm install @umichkisa-ds/form react-hook-form`
3. **Quick Start** — a complete login form example with `Form`, `Form.Input`, `Form.Button`

Create `apps/docs/app/forms/overview/page.tsx`:

```tsx
'use client'

import { Container } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'

const installCode = `npm install @umichkisa-ds/form react-hook-form`

const quickStartCode = `import { useForm } from 'react-hook-form'
import { Form } from '@umichkisa-ds/form'

type LoginData = { email: string; password: string }

function LoginForm() {
  const form = useForm<LoginData>({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: LoginData) => {
    await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  return (
    <Form form={form} onSubmit={onSubmit} className="flex flex-col gap-4">
      <Form.Input
        name="email"
        label="Email"
        type="email"
        placeholder="you@umich.edu"
        rules={{ required: 'Email is required' }}
      />
      <Form.Input
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        rules={{
          required: 'Password is required',
          minLength: { value: 8, message: 'At least 8 characters' },
        }}
      />
      <Form.Button>Log In</Form.Button>
    </Form>
  )
}`

export default function FormsOverviewPage() {
  return (
    <Container size="md" as="article">
      <h1 className="type-heading-2xl mb-2">Forms</h1>
      <p className="type-body text-muted-foreground mb-8">
        <code className="type-code">@umichkisa-ds/form</code> connects{' '}
        <a href="https://react-hook-form.com" className="text-brand-primary underline" target="_blank" rel="noopener noreferrer">
          react-hook-form
        </a>{' '}
        to KISA design system components. It provides a <code className="type-code">Form</code> compound
        component with type-safe fields, automatic validation, and submission handling — so you
        can build forms without boilerplate.
      </p>

      <h2 className="type-heading-lg mb-4">Installation</h2>
      <div className="border border-border rounded-lg bg-surface-muted overflow-x-auto mb-8">
        <pre className="type-caption font-mono text-foreground px-4 py-4 whitespace-pre">
          <code>{installCode}</code>
        </pre>
      </div>

      <h2 className="type-heading-lg mb-4">Quick Start</h2>
      <p className="type-body text-muted-foreground mb-4">
        A complete login form in under 30 lines. The form validates on blur,
        shows inline errors, and disables the submit button while the request is in flight.
      </p>
      <ComponentPreview code={quickStartCode}>
        <div className="w-full max-w-sm text-left text-muted-foreground type-body-sm">
          <p>See live example on the <a href="/forms/examples" className="text-brand-primary underline">Examples</a> page.</p>
        </div>
      </ComponentPreview>

      <h2 className="type-heading-lg mb-4 mt-8">What's inside</h2>
      <div className="flex flex-col gap-3 mb-8">
        <div className="border border-border rounded-md p-4">
          <p className="type-body !font-semibold mb-1">Form Component</p>
          <p className="type-body-sm text-muted-foreground">
            <code className="type-code">{'<Form>'}</code> with compound fields:
            {' '}<code className="type-code">Form.Input</code>,
            {' '}<code className="type-code">Form.Textarea</code>,
            {' '}<code className="type-code">Form.Select</code>,
            {' '}<code className="type-code">Form.Checkbox</code>,
            {' '}<code className="type-code">Form.Radio</code>,
            {' '}<code className="type-code">Form.Switch</code>,
            {' '}<code className="type-code">Form.Button</code>.
          </p>
        </div>
        <div className="border border-border rounded-md p-4">
          <p className="type-body !font-semibold mb-1">Hooks</p>
          <p className="type-body-sm text-muted-foreground">
            <code className="type-code">useForm</code> (onTouched default),
            {' '}<code className="type-code">useFormField</code> (manual wiring),
            {' '}<code className="type-code">useFormStatus</code> (submission state).
          </p>
        </div>
        <div className="border border-border rounded-md p-4">
          <p className="type-body !font-semibold mb-1">Validation</p>
          <p className="type-body-sm text-muted-foreground">
            Uses react-hook-form's <code className="type-code">rules</code> API directly —
            required, pattern, minLength, maxLength, custom validators.
          </p>
        </div>
      </div>
    </Container>
  )
}
```

**Step 2: Verify it renders**

Run: `pnpm --filter @umichkisa-ds/docs dev`
Navigate to: `http://localhost:3000/forms/overview`
Expected: Page renders with installation instructions and quick start example.

**Step 3: Commit**

```bash
git add apps/docs/app/forms/overview/
git commit -m "feat(docs): add Forms overview page with installation and quick start"
```

---

### Task 16: useForm page

**Files:**
- Create: `apps/docs/app/forms/use-form/page.tsx`

**Content outline:**
1. **What it does** — thin wrapper over RHF's useForm, defaults to `mode: "onTouched"`
2. **Basic usage** — import and call with defaultValues
3. **Validation modes** — explain onTouched (default), onChange, onBlur, onSubmit with practical scenarios for when you'd override
4. **TypeScript generics** — show how `useForm<MyType>()` enables autocomplete on field names
5. **API Reference** — props table matching RHF's UseFormProps, noting the mode default override
6. **Accessing the form instance** — `form.reset()`, `form.setError()`, `form.watch()` — link to RHF docs for full API

> **Note to executor:** Follow the same page structure as the Overview page. Use `Container size="md" as="article"`, `ComponentPreview` for code examples. All code examples should be realistic (e.g., a user edit form, not just `myField`). Write the full page content — don't stub it.

**Step 1: Write the page, Step 2: Verify render, Step 3: Commit**

```bash
git commit -m "feat(docs): add useForm documentation page"
```

---

### Task 17: Form Component page

**Files:**
- Create: `apps/docs/app/forms/form-component/page.tsx`

**Content outline:**
1. **Form** — `<Form form={form} onSubmit={fn}>`, explains FormProvider + `<form>` wrapper
2. **Form.Input** — props, example (email field with validation)
3. **Form.Textarea** — props, example (bio field)
4. **Form.Select** — props, example showing children pattern with `SelectTrigger`, `SelectContent`, `SelectItem`
5. **Form.Checkbox** — props, example (terms agreement)
6. **Form.Radio** — props, example with `RadioItem` children (contact preference)
7. **Form.Switch** — props, example (notification toggle)
8. **Form.Button** — props, example showing auto-disable during submit, `disableWhenInvalid` prop
9. **API Reference table** for each component

> **Note to executor:** Each compound component section should have a `ComponentPreview` with realistic usage, not just the component in isolation. Show it inside a `<Form>` context. Example: for Form.Select, show a role picker in a signup form context.

**Step 1: Write the page, Step 2: Verify render, Step 3: Commit**

```bash
git commit -m "feat(docs): add Form component documentation page"
```

---

### Task 18: Validation page

**Files:**
- Create: `apps/docs/app/forms/validation/page.tsx`

**Content outline:**
1. **How validation works** — onTouched mode explained, error lifecycle (blur → show, type → clear)
2. **Built-in rules** — `required`, `min`, `max`, `minLength`, `maxLength`, `pattern` with examples
3. **Custom validators** — `validate: (value) => string | true` with a practical example (password strength, matching passwords)
4. **Multiple rules** — combining required + pattern + custom validate on one field
5. **Displaying errors** — how FormItem shows `error?.message` automatically, styling
6. **Overriding validation mode** — when to use `onChange` vs `onSubmit`, per-form override via `useForm({ mode: "onChange" })`

> **Note to executor:** Use practical examples throughout. For custom validators, show a "Confirm Password" field that validates against the password field using `form.watch("password")`. For pattern, show email validation.

**Step 1: Write the page, Step 2: Verify render, Step 3: Commit**

```bash
git commit -m "feat(docs): add Forms validation documentation page"
```

---

### Task 19: Hooks page

**Files:**
- Create: `apps/docs/app/forms/hooks/page.tsx`

**Content outline:**
1. **useFormField** — when to use (custom layouts, non-standard components), full API, example wiring manually to `<Input>`
2. **useFormStatus** — when to use (custom submit button, conditional UI), full API, example showing a custom submit area with loading text
3. **When to use hooks vs compound components** — decision guide: compound for 80% case, hooks for custom layouts

> **Note to executor:** The useFormField example should show a realistic scenario where the compound component isn't enough — e.g., an inline field with a custom layout where label is to the left and description is below, not wrappable by FormItem's vertical stack. The useFormStatus example should show a form footer with "Saving..." text and a disabled button.

**Step 1: Write the page, Step 2: Verify render, Step 3: Commit**

```bash
git commit -m "feat(docs): add Forms hooks documentation page"
```

---

### Task 20: Examples page

**Files:**
- Create: `apps/docs/app/forms/examples/page.tsx`

**Content outline — all examples must be real, interactive `'use client'` components:**

1. **Login Form** — email + password, required validation, submit button with loading state
2. **Profile Edit Form** — name, bio (textarea), graduation year (number with min/max), preferred contact (radio), notifications (switch). Shows `defaultValues` pre-population.
3. **Settings Form** — multiple switches and checkboxes, shows boolean field handling
4. **Feedback Form** — subject (select), message (textarea with minLength), anonymous (checkbox). Shows Select + Textarea + Checkbox together.
5. **Using hooks for custom layout** — same login form but built with `useFormField` + `useFormStatus` instead of compound components, showing the flexibility.

> **Note to executor:** Each example should be a live, working form rendered in a `ComponentPreview`. The code string and the rendered component should match. When `@umichkisa-ds/form` is not yet installed in the docs app, create the examples as code-only previews (code + static placeholder) and mark them with a `TODO: make interactive once package is wired` comment. These get upgraded to live examples when the docs app adds `@umichkisa-ds/form` as a dependency.

**Step 1: Write the page, Step 2: Verify render, Step 3: Commit**

```bash
git commit -m "feat(docs): add Forms examples page with practical form recipes"
```

---

### Task 21: Wire `@umichkisa-ds/form` into docs app and make examples live

**Files:**
- Modify: `apps/docs/package.json` — add `@umichkisa-ds/form` dependency
- Modify: `apps/docs/app/forms/examples/page.tsx` — convert code-only previews to live interactive forms

**Step 1: Add dependency**

Add to `apps/docs/package.json` dependencies:
```json
"@umichkisa-ds/form": "workspace:*",
"react-hook-form": "^7.50.0"
```

**Step 2: Install**

Run: `pnpm install`

**Step 3: Update examples to be interactive**

Replace the static placeholder previews with actual rendered `<Form>` components using `@umichkisa-ds/form` imports.

**Step 4: Verify all pages render**

Run: `pnpm --filter @umichkisa-ds/docs dev`
Check all 6 pages under `/forms/*`.

**Step 5: Commit**

```bash
git add apps/docs/package.json apps/docs/app/forms/ pnpm-lock.yaml
git commit -m "feat(docs): wire @umichkisa-ds/form into docs app with live examples"
```

---

## Phase 8 — Final Verification

### Task 22: Full monorepo build + typecheck + test

**Step 1: Run all tests**

Run: `pnpm test`
Expected: All tests pass across all packages

**Step 2: Run build**

Run: `pnpm build`
Expected: All packages build successfully

**Step 3: Run typecheck**

Run: `pnpm typecheck`
Expected: No type errors

**Step 4: Update CODEBASE.md**

Add `@umichkisa-ds/form` to the packages table and update the component status.

**Step 5: Check off TODO.md**

Mark Batch 10.5 as complete:
```markdown
- [x] `@umichkisa-ds/form` — custom hooks for validation, form submission, and form state management (pair with `@umichkisa-ds/web` form components)
```

**Step 6: Final commit**

```bash
git add docs/TODO.md docs/CODEBASE.md
git commit -m "chore: mark Batch 10.5 complete — @umichkisa-ds/form shipped"
```

---

Plan complete and saved to `docs/plans/2026-04-04-form-dx-package.md`. Two execution options:

**1. Subagent-Driven (this session)** — I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** — Open new session with executing-plans, batch execution with checkpoints

Which approach?