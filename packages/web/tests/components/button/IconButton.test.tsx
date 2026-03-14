import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IconButton } from "@/components/button/IconButton";

describe("IconButton", () => {
  it("renders icon and optional text", () => {
    render(<IconButton icon={<span data-testid="icon" />} text="Write" />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("Write")).toBeInTheDocument();
  });

  it("renders icon without text", () => {
    render(<IconButton icon={<span data-testid="icon" />} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("calls onClick", async () => {
    const onClick = vi.fn();
    render(<IconButton icon={<span />} onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled when disabled prop is true", () => {
    render(<IconButton icon={<span />} disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
