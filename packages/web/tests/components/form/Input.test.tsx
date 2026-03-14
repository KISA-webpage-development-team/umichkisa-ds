import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "@/components/form/Input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input type="text" value="" onChange={() => {}} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("calls onChange when typing", async () => {
    const onChange = vi.fn();
    render(<Input type="text" value="" onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "a");
    expect(onChange).toHaveBeenCalled();
  });

  it("applies invalid styling when invalid prop is true", () => {
    render(<Input type="text" value="" onChange={() => {}} invalid />);
    expect(screen.getByRole("textbox").className).toContain("border-[var(--color-error)]");
  });

  it("shows placeholder text", () => {
    render(<Input type="text" value="" onChange={() => {}} placeholder="Enter name" />);
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
  });
});
