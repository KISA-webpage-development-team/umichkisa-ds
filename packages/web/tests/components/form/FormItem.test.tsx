import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormItem } from "@/components/form/FormItem";

describe("FormItem", () => {
  it("renders label and input", () => {
    render(
      <FormItem
        htmlFor="email"
        labelText="Email"
        type="email"
        value=""
        onChange={() => {}}
      />
    );
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("shows error when required field is empty and blurred", async () => {
    render(
      <FormItem
        htmlFor="name"
        labelText="Name"
        type="text"
        value=""
        onChange={() => {}}
        required
      />
    );
    await userEvent.tab(); // focus
    await userEvent.tab(); // blur
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("shows validation error from custom rule", async () => {
    const rule = (v: string) => (v.length < 3 ? "Too short" : null);
    render(
      <FormItem
        htmlFor="name"
        labelText="Name"
        type="text"
        value="ab"
        onChange={() => {}}
        validationRules={[rule]}
      />
    );
    await userEvent.tab();
    await userEvent.tab();
    expect(screen.getByText("Too short")).toBeInTheDocument();
  });
});
