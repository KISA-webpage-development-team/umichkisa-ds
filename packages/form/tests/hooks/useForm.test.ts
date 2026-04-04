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
    // onTouched mode starts with isValid false (validation deferred until touch)
    expect(result.current.formState.isValid).toBe(false);
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
    const email: string = result.current.getValues("email");
    expect(email).toBe("");
  });
});
