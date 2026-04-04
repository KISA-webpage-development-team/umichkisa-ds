import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm as useRHFForm } from "react-hook-form";
import { Form } from "../../../src/components/Form";

function TestForm() {
  const form = useRHFForm({ defaultValues: { bio: "" }, mode: "onTouched" });
  return (
    <Form form={form} onSubmit={() => {}}>
      <Form.Textarea
        name="bio"
        label="Bio"
        rules={{ required: "Bio is required" }}
        placeholder="Tell us about yourself"
      />
    </Form>
  );
}

describe("Form.Textarea", () => {
  it("renders label and textarea", () => {
    render(<TestForm />);
    expect(screen.getByText("Bio")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Tell us about yourself")).toBeInTheDocument();
  });

  it("shows error after blur on empty required field", async () => {
    const user = userEvent.setup();
    render(<TestForm />);
    const textarea = screen.getByPlaceholderText("Tell us about yourself");
    await user.click(textarea);
    await user.tab();
    expect(await screen.findByText("Bio is required")).toBeInTheDocument();
  });
});
