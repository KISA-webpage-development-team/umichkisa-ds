import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm as useRHFForm } from "react-hook-form";
import { Form } from "../../../src/components/Form";

function TestForm() {
  const form = useRHFForm({ defaultValues: { agree: false }, mode: "onTouched" });
  return (
    <Form form={form} onSubmit={() => {}}>
      <Form.Checkbox name="agree" label="Terms" />
    </Form>
  );
}

describe("Form.Checkbox", () => {
  it("renders label and checkbox", () => {
    render(<TestForm />);
    expect(screen.getByText("Terms")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("toggles checked state", async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
