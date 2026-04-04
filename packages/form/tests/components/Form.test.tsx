import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm as useRHFForm } from "react-hook-form";
import { Form } from "../../src/components/Form";

function TestForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: Record<string, unknown>) => void;
  defaultValues?: Record<string, unknown>;
}) {
  const form = useRHFForm({ defaultValues, mode: "onTouched" });
  return (
    <Form form={form} onSubmit={onSubmit}>
      <input {...form.register("name")} placeholder="Name" />
      <button type="submit">Submit</button>
    </Form>
  );
}

describe("Form", () => {
  it("renders a form element", () => {
    render(<TestForm onSubmit={() => {}} />);
    const form = document.querySelector("form");
    expect(form).toBeInTheDocument();
  });

  it("calls onSubmit with form data", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <TestForm onSubmit={onSubmit} defaultValues={{ name: "" }} />
    );
    await user.type(screen.getByPlaceholderText("Name"), "Jioh");
    await user.click(screen.getByText("Submit"));
    expect(onSubmit).toHaveBeenCalledWith(
      { name: "Jioh" },
      expect.anything()
    );
  });

  it("applies default flex column layout with gap-4", () => {
    render(<TestForm onSubmit={() => {}} />);
    const form = document.querySelector("form");
    expect(form).toHaveClass("flex", "flex-col", "gap-4");
  });

  it("merges className with default layout", () => {
    function TestFormWithClass() {
      const form = useRHFForm();
      return (
        <Form form={form} onSubmit={() => {}} className="max-w-sm">
          <button type="submit">Go</button>
        </Form>
      );
    }
    render(<TestFormWithClass />);
    const form = document.querySelector("form");
    expect(form).toHaveClass("flex", "flex-col", "gap-4", "max-w-sm");
  });
});
