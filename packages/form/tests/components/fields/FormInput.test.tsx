import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm as useRHFForm } from "react-hook-form";
import { Form } from "../../../src/components/Form";

function TestForm({ onSubmit = () => {} }: { onSubmit?: (data: Record<string, unknown>) => void }) {
  const form = useRHFForm({ defaultValues: { email: "" }, mode: "onTouched" });
  return (
    <Form form={form} onSubmit={onSubmit}>
      <Form.Input
        name="email"
        label="Email"
        rules={{ required: "Email is required" }}
        placeholder="Enter email"
      />
      <button type="submit">Submit</button>
    </Form>
  );
}

describe("Form.Input", () => {
  it("renders label and input", () => {
    render(<TestForm />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
  });

  it("shows error after blur on empty required field", async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    const input = screen.getByPlaceholderText("Enter email");
    await user.click(input);
    await user.tab();
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
  });

  it("clears error when valid value entered", async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    const input = screen.getByPlaceholderText("Enter email");
    await user.click(input);
    await user.tab();
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    await user.type(input, "test@example.com");
    expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
  });
});
