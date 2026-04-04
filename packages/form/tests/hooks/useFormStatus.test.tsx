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
