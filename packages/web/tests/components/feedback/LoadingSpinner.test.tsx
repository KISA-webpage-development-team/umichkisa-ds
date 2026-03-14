import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "@/components/feedback/LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders loading label", () => {
    render(<LoadingSpinner label="Loading..." />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders fullscreen overlay by default", () => {
    const { container } = render(<LoadingSpinner />);
    expect(container.firstChild).toHaveClass("fixed");
  });

  it("renders inline when fullScreen is false", () => {
    const { container } = render(<LoadingSpinner fullScreen={false} />);
    expect(container.firstChild).not.toHaveClass("fixed");
  });
});
