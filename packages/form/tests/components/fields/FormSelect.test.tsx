import { render, screen } from "@testing-library/react";
import { useForm as useRHFForm, useController } from "react-hook-form";
import { Form } from "../../../src/components/Form";
import { FormSelect } from "../../../src/components/fields/FormSelect";

// Mock @umichkisa-ds/web to avoid Radix dual-React issue in tests
vi.mock("@umichkisa-ds/web", async () => {
  const actual = await vi.importActual<Record<string, unknown>>("@umichkisa-ds/web");
  return {
    ...actual,
    Select: ({ children, value, onValueChange }: { children: React.ReactNode; value?: string; onValueChange?: (v: string) => void }) => (
      <div data-testid="select-root" data-value={value}>
        {children}
        {/* Simple select simulation for testing */}
        <select
          data-testid="select-native"
          value={value || ""}
          onChange={(e) => onValueChange?.(e.target.value)}
        >
          <option value="">Pick a color</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </select>
      </div>
    ),
    SelectTrigger: ({ placeholder }: { placeholder?: string }) => (
      <span data-testid="select-trigger">{placeholder}</span>
    ),
    SelectContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SelectItem: ({ value, children }: { value: string; children: React.ReactNode }) => (
      <div data-value={value}>{children}</div>
    ),
  };
});

function TestForm() {
  const form = useRHFForm({ defaultValues: { color: "" }, mode: "onTouched" });
  return (
    <Form form={form} onSubmit={() => {}}>
      <Form.Select
        name="color"
        label="Favorite Color"
        rules={{ required: "Color is required" }}
      >
        <span>trigger placeholder</span>
      </Form.Select>
    </Form>
  );
}

describe("Form.Select", () => {
  it("renders label", () => {
    render(<TestForm />);
    expect(screen.getByText("Favorite Color")).toBeInTheDocument();
  });

  it("wires value and onValueChange from controller", () => {
    render(<TestForm />);
    const select = screen.getByTestId("select-native") as HTMLSelectElement;
    expect(select.value).toBe("");
  });
});
