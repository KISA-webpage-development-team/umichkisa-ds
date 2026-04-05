import { Container } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'
import {
  FormRootDemo,
  InputDemo,
  TextareaDemo,
  SelectDemo,
  CheckboxDemo,
  RadioDemo,
  SwitchDemo,
  DatePickerDemo,
  DateRangePickerDemo,
  ButtonDemo,
} from './_demos'

/* ── Code strings ──────────────────────────────────────────── */

const formRootCode = `import { useForm, Form } from '@umichkisa-ds/form'

type ContactValues = { name: string; message: string }

function ContactForm() {
  const form = useForm<ContactValues>({
    defaultValues: { name: '', message: '' },
  })

  return (
    <Form form={form} onSubmit={(data) => console.log(data)}>
      <Form.Input name="name" label="Name" rules={{ required: 'Name is required' }} />
      <Form.Textarea name="message" label="Message" rules={{ required: 'Message is required' }} />
      <Form.Button>Send</Form.Button>
    </Form>
  )
}`

const inputCode = `<Form.Input
  name="email"
  label="Email"
  type="email"
  placeholder="you@umich.edu"
  description="We'll use your UMich email for verification."
  rules={{ required: 'Email is required' }}
/>`

const textareaCode = `<Form.Textarea
  name="bio"
  label="Bio"
  placeholder="Tell us about yourself..."
  description="Minimum 10 characters."
  rules={{
    required: 'Bio is required',
    minLength: { value: 10, message: 'At least 10 characters' },
  }}
/>`

const selectCode = `import { SelectTrigger, SelectContent, SelectItem } from '@umichkisa-ds/web'

<Form.Select name="role" label="Role" rules={{ required: 'Select a role' }}>
  <SelectTrigger placeholder="Choose a role" />
  <SelectContent>
    <SelectItem value="member">Member</SelectItem>
    <SelectItem value="officer">Officer</SelectItem>
    <SelectItem value="president">President</SelectItem>
  </SelectContent>
</Form.Select>`

const checkboxCode = `<Form.Checkbox
  name="terms"
  label="I agree to the terms and conditions"
  rules={{ required: 'You must agree to continue' }}
/>`

const radioCode = `import { RadioItem } from '@umichkisa-ds/web'

<Form.Radio
  name="contact"
  label="Preferred contact method"
  rules={{ required: 'Select a contact method' }}
>
  <RadioItem value="email" text="Email" />
  <RadioItem value="kakao" text="KakaoTalk" />
  <RadioItem value="phone" text="Phone" />
</Form.Radio>`

const switchCode = `<Form.Switch
  name="notifications"
  label="Email notifications"
  description="Receive updates about KISA events and announcements."
/>`

const datePickerCode = `<Form.DatePicker
  name="eventDate"
  label="Event date"
  rules={{ required: 'Date is required' }}
  placeholder="Pick a date"
/>`

const dateRangePickerCode = `<Form.DateRangePicker
  name="availability"
  label="Availability"
  description="When are you available for this event?"
  placeholder="Select dates"
/>`

const buttonCode = `// Auto-disables while form is submitting
<Form.Button>Submit</Form.Button>

// Also disable when form has validation errors
<Form.Button disableWhenInvalid>Submit</Form.Button>`

/* ── Page ──────────────────────────────────────────────────── */

export default async function FormComponentPage() {
  const [
    formRootHighlighted,
    inputHighlighted,
    textareaHighlighted,
    selectHighlighted,
    checkboxHighlighted,
    radioHighlighted,
    switchHighlighted,
    datePickerHighlighted,
    dateRangePickerHighlighted,
    buttonHighlighted,
  ] = await Promise.all([
    highlight(formRootCode),
    highlight(inputCode),
    highlight(textareaCode),
    highlight(selectCode),
    highlight(checkboxCode),
    highlight(radioCode),
    highlight(switchCode),
    highlight(datePickerCode),
    highlight(dateRangePickerCode),
    highlight(buttonCode),
  ])

  return (
    <Container size="md" as="article">
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">
        Form Component
      </h1>
      <p className="type-body mb-8 text-muted-foreground max-w-prose">
        The <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Form>'}</code> compound component
        provides context, submission handling, and field sub-components that
        automatically wire up labels, errors, and validation.
      </p>

      {/* ── Form Root ─────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">{'<Form>'}</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The root component wraps your fields in a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">FormProvider</code> and a native{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<form>'}</code> element. Pass the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">form</code> instance from{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">useForm</code> and an{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">onSubmit</code> handler.
      </p>
      <ComponentPreview code={formRootCode} highlightedCode={formRootHighlighted}>
        <FormRootDemo />
      </ComponentPreview>

      {/* ── Form.Input ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Form.Input</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Wraps{' '}
        <a href="/components/input" className="text-link underline hover:text-brand-primary">Input</a> +{' '}
        <a href="/components/form-item" className="text-link underline hover:text-brand-primary">FormItem</a>{' '}
        with automatic error display. Accepts all
        native input attributes plus{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">rules</code> for validation and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">description</code> for helper text.
      </p>
      <ComponentPreview code={inputCode} highlightedCode={inputHighlighted}>
        <InputDemo />
      </ComponentPreview>

      {/* ── Form.Textarea ─────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Form.Textarea</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Wraps{' '}
        <a href="/components/textarea" className="text-link underline hover:text-brand-primary">Textarea</a> +{' '}
        <a href="/components/form-item" className="text-link underline hover:text-brand-primary">FormItem</a>.{' '}
        Same pattern as Form.Input but for multi-line text. Supports{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">minLength</code> and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">maxLength</code> validation.
      </p>
      <ComponentPreview code={textareaCode} highlightedCode={textareaHighlighted}>
        <TextareaDemo />
      </ComponentPreview>

      {/* ── Form.Select ───────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Form.Select</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Wraps the DS{' '}
        <a href="/components/select" className="text-link underline hover:text-brand-primary">Select</a> +{' '}
        <a href="/components/form-item" className="text-link underline hover:text-brand-primary">FormItem</a>.{' '}
        Pass{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">SelectTrigger</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">SelectContent</code>, and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">SelectItem</code> as children — these are
        imported from <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">@umichkisa-ds/web</code>.
      </p>
      <ComponentPreview code={selectCode} highlightedCode={selectHighlighted}>
        <SelectDemo />
      </ComponentPreview>

      {/* ── Form.Checkbox ─────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Form.Checkbox</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Wraps{' '}
        <a href="/components/checkbox" className="text-link underline hover:text-brand-primary">Checkbox</a> +{' '}
        <a href="/components/form-item" className="text-link underline hover:text-brand-primary">FormItem</a>.{' '}
        A single checkbox with label and optional description. The value is a
        boolean. Use <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">required</code> to enforce
        agreement flows.
      </p>
      <ComponentPreview code={checkboxCode} highlightedCode={checkboxHighlighted}>
        <CheckboxDemo />
      </ComponentPreview>

      {/* ── Form.Radio ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Form.Radio</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Wraps{' '}
        <a href="/components/radio" className="text-link underline hover:text-brand-primary">RadioGroup</a> +{' '}
        <a href="/components/form-item" className="text-link underline hover:text-brand-primary">FormItem</a>.{' '}
        Pass{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">RadioItem</code> components as children,
        imported from <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">@umichkisa-ds/web</code>.
      </p>
      <ComponentPreview code={radioCode} highlightedCode={radioHighlighted}>
        <RadioDemo />
      </ComponentPreview>

      {/* ── Form.Switch ───────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Form.Switch</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Wraps{' '}
        <a href="/components/switch" className="text-link underline hover:text-brand-primary">Switch</a> +{' '}
        <a href="/components/form-item" className="text-link underline hover:text-brand-primary">FormItem</a>.{' '}
        A toggle switch for boolean settings. Useful for preferences and
        opt-in/opt-out controls.
      </p>
      <ComponentPreview code={switchCode} highlightedCode={switchHighlighted}>
        <SwitchDemo />
      </ComponentPreview>

      {/* ── Form.DatePicker ──────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Form.DatePicker</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Wraps{' '}
        <a href="/components/datepicker" className="text-link underline hover:text-brand-primary">DatePicker</a> +{' '}
        <a href="/components/form-item" className="text-link underline hover:text-brand-primary">FormItem</a>.{' '}
        A single date picker for selecting dates like event dates, birth dates,
        or deadlines. Supports{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">placeholder</code> and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">formatDate</code> props.
      </p>
      <ComponentPreview code={datePickerCode} highlightedCode={datePickerHighlighted}>
        <DatePickerDemo />
      </ComponentPreview>

      {/* ── Form.DateRangePicker ─────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Form.DateRangePicker</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Wraps{' '}
        <a href="/components/datepicker" className="text-link underline hover:text-brand-primary">DateRangePicker</a> +{' '}
        <a href="/components/form-item" className="text-link underline hover:text-brand-primary">FormItem</a>.{' '}
        A date range picker for selecting start and end dates, useful for trip
        booking, report periods, or availability windows. Supports{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">placeholder</code> and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">formatDate</code> props.
      </p>
      <ComponentPreview code={dateRangePickerCode} highlightedCode={dateRangePickerHighlighted}>
        <DateRangePickerDemo />
      </ComponentPreview>

      {/* ── Form.Button ───────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Form.Button</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Wraps{' '}
        <a href="/components/button" className="text-link underline hover:text-brand-primary">Button</a>{' '}
        as a submit button that auto-disables while the form is submitting. Add{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">disableWhenInvalid</code> to also disable
        when validation errors exist.
      </p>
      <ComponentPreview code={buttonCode} highlightedCode={buttonHighlighted}>
        <ButtonDemo />
      </ComponentPreview>

      {/* ── Shared Props ──────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Shared Field Props</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All field sub-components (Input, Textarea, Select, Checkbox, Radio,
        Switch, DatePicker, DateRangePicker) share these props:
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Required</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">name</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">string</code></td>
              <td className="px-4 py-3 text-foreground">Yes</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Field name matching a key in your form values type.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">label</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">string</code></td>
              <td className="px-4 py-3 text-foreground">Yes</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Visible label text. Also used for accessibility.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">rules</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">RegisterOptions</code></td>
              <td className="px-4 py-3 text-foreground">No</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Validation rules (required, minLength, pattern, validate, etc.).</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">description</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">string</code></td>
              <td className="px-4 py-3 text-foreground">No</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Helper text shown below the field.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">string</code></td>
              <td className="px-4 py-3 text-foreground">No</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Applied to the FormItem wrapper for layout spacing.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  )
}
