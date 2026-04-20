import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToggleGroup } from "@/components/navigation/ToggleGroup";

const items = [
  { value: "a", label: "A" },
  { value: "b", label: "B" },
  { value: "c", label: "C" },
];

describe("ToggleGroup — single (default)", () => {
  it("renders a radiogroup with radios and correct aria-checked", () => {
    render(<ToggleGroup value="b" onValueChange={() => {}} items={items} />);
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);
    expect(radios[0]).toHaveAttribute("aria-checked", "false");
    expect(radios[1]).toHaveAttribute("aria-checked", "true");
    expect(radios[2]).toHaveAttribute("aria-checked", "false");
  });

  it("clicking an item calls onValueChange with its value", async () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup value="a" onValueChange={onValueChange} items={items} />
    );
    await userEvent.click(screen.getByRole("radio", { name: "C" }));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith("c");
  });

  it("ArrowRight from selected moves selection + focus to next (wraps)", async () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup value="c" onValueChange={onValueChange} items={items} />
    );
    const selected = screen.getByRole("radio", { name: "C" });
    selected.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenLastCalledWith("a");
  });

  it("ArrowLeft wraps at start; Home/End jump to first/last", async () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup value="a" onValueChange={onValueChange} items={items} />
    );
    const selected = screen.getByRole("radio", { name: "A" });
    selected.focus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(onValueChange).toHaveBeenLastCalledWith("c");
    await userEvent.keyboard("{Home}");
    expect(onValueChange).toHaveBeenLastCalledWith("a");
    await userEvent.keyboard("{End}");
    expect(onValueChange).toHaveBeenLastCalledWith("c");
  });

  it("selected item has tabIndex=0; others -1", () => {
    render(<ToggleGroup value="b" onValueChange={() => {}} items={items} />);
    const radios = screen.getAllByRole("radio");
    expect(radios[0]).toHaveAttribute("tabindex", "-1");
    expect(radios[1]).toHaveAttribute("tabindex", "0");
    expect(radios[2]).toHaveAttribute("tabindex", "-1");
  });
});

describe("ToggleGroup — multiple", () => {
  it("renders a group with toggle buttons and aria-pressed reflecting value[]", () => {
    render(
      <ToggleGroup
        type="multiple"
        value={["a", "c"]}
        onValueChange={() => {}}
        items={items}
      />
    );
    expect(screen.getByRole("group")).toBeInTheDocument();
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[2]).toHaveAttribute("aria-pressed", "true");
    buttons.forEach((b) => expect(b).not.toHaveAttribute("aria-checked"));
  });

  it("clicking unselected item adds to value array", async () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup
        type="multiple"
        value={["a"]}
        onValueChange={onValueChange}
        items={items}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "B" }));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(["a", "b"]);
  });

  it("clicking selected item removes it from value array", async () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup
        type="multiple"
        value={["a", "b"]}
        onValueChange={onValueChange}
        items={items}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: "A" }));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(["b"]);
  });

  it("arrow keys move focus only — onValueChange not called", async () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup
        type="multiple"
        value={["a"]}
        onValueChange={onValueChange}
        items={items}
      />
    );
    const firstSelected = screen.getByRole("button", { name: "A" });
    firstSelected.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(document.activeElement).toBe(
      screen.getByRole("button", { name: "B" })
    );
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("Space on a focused item toggles its pressed state", async () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup
        type="multiple"
        value={[]}
        onValueChange={onValueChange}
        items={items}
      />
    );
    const first = screen.getByRole("button", { name: "A" });
    first.focus();
    await userEvent.keyboard(" ");
    expect(onValueChange).toHaveBeenCalledWith(["a"]);
  });

  it("roving tabindex: first selected item gets 0; 0 when none selected", () => {
    const { rerender } = render(
      <ToggleGroup
        type="multiple"
        value={[]}
        onValueChange={() => {}}
        items={items}
      />
    );
    let buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("tabindex", "0");
    expect(buttons[1]).toHaveAttribute("tabindex", "-1");

    rerender(
      <ToggleGroup
        type="multiple"
        value={["b", "c"]}
        onValueChange={() => {}}
        items={items}
      />
    );
    buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("tabindex", "-1");
    expect(buttons[1]).toHaveAttribute("tabindex", "0");
    expect(buttons[2]).toHaveAttribute("tabindex", "0");
  });
});
