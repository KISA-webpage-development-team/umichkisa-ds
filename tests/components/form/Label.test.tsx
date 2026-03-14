import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Label } from "@/components/form/Label";

describe("Label", () => {
  it("renders label text", () => {
    render(<Label htmlFor="email">Email</Label>);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("is associated with input via htmlFor", () => {
    render(<Label htmlFor="email">Email</Label>);
    expect(screen.getByText("Email")).toHaveAttribute("for", "email");
  });

  it("shows required indicator when required is true", () => {
    render(<Label htmlFor="name" required>Name</Label>);
    expect(screen.getByText("*")).toBeInTheDocument();
  });
});
