import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm as useRHFForm } from "react-hook-form";
import { Form } from "../../../src/components/Form";

// Mock @umichkisa-ds/web to avoid Radix dual-React issue in tests
vi.mock("@umichkisa-ds/web", async () => {
  const actual = await vi.importActual<Record<string, unknown>>("@umichkisa-ds/web");
  return {
    ...actual,
    RadioGroup: ({
      children,
      value,
      onValueChange,
    }: {
      children: React.ReactNode;
      value?: string;
      onValueChange?: (v: string) => void;
      invalid?: boolean;
    }) => (
      <div role="radiogroup" data-value={value}>
        {/* Render children and inject onValueChange context via data attributes */}
        {children}
        {/* Hidden inputs for testing value changes */}
        <input
          type="hidden"
          data-testid="radio-value"
          value={value || ""}
          onChange={() => {}}
        />
        <button
          data-testid="select-sm"
          onClick={() => onValueChange?.("sm")}
          type="button"
        >
          Select Small
        </button>
        <button
          data-testid="select-md"
          onClick={() => onValueChange?.("md")}
          type="button"
        >
          Select Medium
        </button>
      </div>
    ),
    RadioItem: ({ value, text }: { value: string; text: string }) => (
      <div data-value={value}>{text}</div>
    ),
  };
});

function TestForm() {
  const form = useRHFForm({ defaultValues: { size: "" }, mode: "onTouched" });
  return (
    <Form form={form} onSubmit={() => {}}>
      <Form.Radio name="size" label="Size">
        <div data-value="sm">Small</div>
        <div data-value="md">Medium</div>
        <div data-value="lg">Large</div>
      </Form.Radio>
    </Form>
  );
}

describe("Form.Radio", () => {
  it("renders label and radio group", () => {
    render(<TestForm />);
    expect(screen.getByText("Size")).toBeInTheDocument();
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("updates value on selection", async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    const hiddenInput = screen.getByTestId("radio-value") as HTMLInputElement;
    expect(hiddenInput.value).toBe("");
    await user.click(screen.getByTestId("select-sm"));
    // After clicking, the form value changes and re-renders with new value
    const updatedInput = screen.getByTestId("radio-value") as HTMLInputElement;
    expect(updatedInput.value).toBe("sm");
  });
});
