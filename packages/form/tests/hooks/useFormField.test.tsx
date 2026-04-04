import { renderHook, act } from "@testing-library/react";
import { type ReactNode } from "react";
import { FormProvider, useForm as useRHFForm } from "react-hook-form";
import { useFormField } from "../../src/hooks/useFormField";

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
    await act(async () => {
      result.current.inputProps.onBlur();
    });
    expect(result.current.invalid).toBe(true);
    expect(result.current.error).toBe("Email is required");
  });
});
