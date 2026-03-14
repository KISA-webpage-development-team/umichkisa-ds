import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { HorizontalDivider } from "@/components/layout/HorizontalDivider";
import { VerticalDivider } from "@/components/layout/VerticalDivider";

describe("HorizontalDivider", () => {
  it("renders with light color by default", () => {
    const { container } = render(<HorizontalDivider />);
    expect(container.firstChild).toHaveClass("border-gray-200/60");
  });

  it("renders with gray color when specified", () => {
    const { container } = render(<HorizontalDivider color="gray" />);
    expect(container.firstChild).toHaveClass("border-gray-300");
  });
});

describe("VerticalDivider", () => {
  it("renders a vertical line", () => {
    const { container } = render(<VerticalDivider />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
