import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm as useRHFForm } from "react-hook-form";
import { Form } from "../../../src/components/Form";

function TestForm() {
  const form = useRHFForm({ defaultValues: { notifications: false }, mode: "onTouched" });
  return (
    <Form form={form} onSubmit={() => {}}>
      <Form.Switch name="notifications" label="Notifications" />
    </Form>
  );
}

describe("Form.Switch", () => {
  it("renders label and switch", () => {
    render(<TestForm />);
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("toggles switch state", async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    const sw = screen.getByRole("switch");
    expect(sw).not.toBeChecked();
    await user.click(sw);
    expect(sw).toBeChecked();
    await user.click(sw);
    expect(sw).not.toBeChecked();
  });
});
