import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LinkButton } from "@/components/button/LinkButton";

describe("LinkButton", () => {
  it("renders an anchor with correct href", () => {
    render(<LinkButton href="/home">Home</LinkButton>);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/home");
  });

  it("renders as a disabled span when disabled", () => {
    render(<LinkButton href="/home" disabled>Home</LinkButton>);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Home").tagName).toBe("SPAN");
  });

  it("applies variant class", () => {
    render(<LinkButton href="/" variant="secondary">Sec</LinkButton>);
    expect(screen.getByRole("link").className).toContain("bg-slate");
  });
});
