import { render, screen } from "@testing-library/react";
import { useForm as useRHFForm } from "react-hook-form";
import { Form } from "../../../src/components/Form";

function TestForm({ disableWhenInvalid = false }: { disableWhenInvalid?: boolean }) {
  const form = useRHFForm({
    defaultValues: { name: "" },
    mode: "onChange",
  });
  return (
    <Form form={form} onSubmit={() => {}}>
      <Form.Input name="name" label="Name" rules={{ required: "Required" }} />
      <Form.Button disableWhenInvalid={disableWhenInvalid}>
        Submit
      </Form.Button>
    </Form>
  );
}

describe("Form.Button", () => {
  it("renders a submit button", () => {
    render(<TestForm />);
    const btn = screen.getByRole("button", { name: "Submit" });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("type", "submit");
  });

  it("is disabled when disableWhenInvalid and form is invalid", () => {
    render(<TestForm disableWhenInvalid />);
    const btn = screen.getByRole("button", { name: "Submit" });
    expect(btn).toBeDisabled();
  });

  it("is enabled by default even when form is invalid", () => {
    render(<TestForm />);
    const btn = screen.getByRole("button", { name: "Submit" });
    expect(btn).not.toBeDisabled();
  });
});
