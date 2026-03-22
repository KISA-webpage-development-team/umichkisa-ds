import { describe, it, expect } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { Icon } from "@/components/icon/Icon";
import type { IconSize } from "@/components/icon/types";

describe("Icon", () => {
  it("renders an svg element", () => {
    const { container } = render(<Icon name="plus" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("defaults to md size (20px)", () => {
    const { container } = render(<Icon name="plus" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "20");
    expect(svg).toHaveAttribute("height", "20");
  });

  it("applies correct pixel size for each size step", () => {
    const cases: [IconSize, number][] = [
      ["xs", 12],
      ["sm", 16],
      ["md", 20],
      ["lg", 24],
      ["xl", 32],
    ];
    for (const [size, px] of cases) {
      const { container } = render(<Icon name="plus" size={size} />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", String(px));
      expect(svg).toHaveAttribute("height", String(px));
      cleanup();
    }
  });

  it("sets aria-hidden=true when no label is provided", () => {
    const { container } = render(<Icon name="plus" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("sets aria-label, role=img, and omits aria-hidden when label is provided", () => {
    const { container } = render(<Icon name="plus" label="Add item" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-label", "Add item");
    expect(svg).toHaveAttribute("role", "img");
    expect(svg).not.toHaveAttribute("aria-hidden");
  });

  it("passes className through to the svg element", () => {
    const { container } = render(<Icon name="plus" className="flex-shrink-0" />);
    expect(container.querySelector("svg")).toHaveClass("flex-shrink-0");
  });
});
