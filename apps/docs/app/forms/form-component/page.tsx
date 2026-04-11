import {
  Alert,
  Container,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableMobileList,
  TableMobileItem,
} from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'
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
      <Alert variant="info" className="mb-8">
        The <InlineCode>{'<Form>'}</InlineCode> compound component provides context, submission handling, and field sub-components that automatically wire up labels, errors, and validation. For setup, see{' '}
        <a href="/forms" className="text-link underline hover:text-brand-primary">Forms</a> and{' '}
        <a href="/forms/use-form" className="text-link underline hover:text-brand-primary">useForm</a>.
      </Alert>

      {/* ── Form Root ─────────────────────────────────────── */}
      <Heading as="h2">{'<Form>'}</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The root component wraps your fields in a{' '}
        <InlineCode>FormProvider</InlineCode> and a native{' '}
        <InlineCode>{'<form>'}</InlineCode> element. Pass the{' '}
        <InlineCode>form</InlineCode> instance from{' '}
        <InlineCode>useForm</InlineCode> and an{' '}
        <InlineCode>onSubmit</InlineCode> handler.
      </p>
      <ComponentPreview code={formRootCode} highlightedCode={formRootHighlighted}>
        <FormRootDemo />
      </ComponentPreview>

      {/* ── Form.Input ────────────────────────────────────── */}
      <Heading as="h2">Form.Input</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Wraps{' '}
        <a href="/components/input" className="text-link underline hover:text-brand-primary">Input</a> +{' '}
        <a href="/components/form-item" className="text-link underline hover:text-brand-primary">FormItem</a>{' '}
        with automatic error display. Accepts all
        native input attributes plus{' '}
        <InlineCode>rules</InlineCode> for validation and{' '}
        <InlineCode>description</InlineCode> for helper text.
      </p>
      <ComponentPreview code={inputCode} highlightedCode={inputHighlighted}>
        <InputDemo />
      </ComponentPreview>

      {/* ── Form.Textarea ─────────────────────────────────── */}
      <Heading as="h2">Form.Textarea</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Wraps{' '}
        <a href="/components/textarea" className="text-link underline hover:text-brand-primary">Textarea</a> +{' '}
        <a href="/components/form-item" className="text-link underline hover:text-brand-primary">FormItem</a>.{' '}
        Same pattern as Form.Input but for multi-line text. Supports{' '}
        <InlineCode>minLength</InlineCode> and{' '}
        <InlineCode>maxLength</InlineCode> validation.
      </p>
      <ComponentPreview code={textareaCode} highlightedCode={textareaHighlighted}>
        <TextareaDemo />
      </ComponentPreview>

      {/* ── Form.Select ───────────────────────────────────── */}
      <Heading as="h2">Form.Select</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Wraps the DS{' '}
        <a href="/components/select" className="text-link underline hover:text-brand-primary">Select</a> +{' '}
        <a href="/components/form-item" className="text-link underline hover:text-brand-primary">FormItem</a>.{' '}
        Pass{' '}
        <InlineCode>SelectTrigger</InlineCode>,{' '}
        <InlineCode>SelectContent</InlineCode>, and{' '}
        <InlineCode>SelectItem</InlineCode> as children — these are
        imported from <InlineCode>@umichkisa-ds/web</InlineCode>.
      </p>
      <ComponentPreview code={selectCode} highlightedCode={selectHighlighted}>
        <SelectDemo />
      </ComponentPreview>

      {/* ── Form.Checkbox ─────────────────────────────────── */}
      <Heading as="h2">Form.Checkbox</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Wraps{' '}
        <a href="/components/checkbox" className="text-link underline hover:text-brand-primary">Checkbox</a> +{' '}
        <a href="/components/form-item" className="text-link underline hover:text-brand-primary">FormItem</a>.{' '}
        A single checkbox with label and optional description. The value is a
        boolean. Use <InlineCode>required</InlineCode> to enforce
        agreement flows.
      </p>
      <ComponentPreview code={checkboxCode} highlightedCode={checkboxHighlighted}>
        <CheckboxDemo />
      </ComponentPreview>

      {/* ── Form.Radio ────────────────────────────────────── */}
      <Heading as="h2">Form.Radio</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Wraps{' '}
        <a href="/components/radio" className="text-link underline hover:text-brand-primary">RadioGroup</a> +{' '}
        <a href="/components/form-item" className="text-link underline hover:text-brand-primary">FormItem</a>.{' '}
        Pass{' '}
        <InlineCode>RadioItem</InlineCode> components as children,
        imported from <InlineCode>@umichkisa-ds/web</InlineCode>.
      </p>
      <ComponentPreview code={radioCode} highlightedCode={radioHighlighted}>
        <RadioDemo />
      </ComponentPreview>

      {/* ── Form.Switch ───────────────────────────────────── */}
      <Heading as="h2">Form.Switch</Heading>
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
      <Heading as="h2">Form.DatePicker</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Wraps{' '}
        <a href="/components/datepicker" className="text-link underline hover:text-brand-primary">DatePicker</a> +{' '}
        <a href="/components/form-item" className="text-link underline hover:text-brand-primary">FormItem</a>.{' '}
        A single date picker for selecting dates like event dates, birth dates,
        or deadlines. Supports{' '}
        <InlineCode>placeholder</InlineCode> and{' '}
        <InlineCode>formatDate</InlineCode> props.
      </p>
      <ComponentPreview code={datePickerCode} highlightedCode={datePickerHighlighted}>
        <DatePickerDemo />
      </ComponentPreview>

      {/* ── Form.DateRangePicker ─────────────────────────── */}
      <Heading as="h2">Form.DateRangePicker</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Wraps{' '}
        <a href="/components/datepicker" className="text-link underline hover:text-brand-primary">DateRangePicker</a> +{' '}
        <a href="/components/form-item" className="text-link underline hover:text-brand-primary">FormItem</a>.{' '}
        A date range picker for selecting start and end dates, useful for trip
        booking, report periods, or availability windows. Supports{' '}
        <InlineCode>placeholder</InlineCode> and{' '}
        <InlineCode>formatDate</InlineCode> props.
      </p>
      <ComponentPreview code={dateRangePickerCode} highlightedCode={dateRangePickerHighlighted}>
        <DateRangePickerDemo />
      </ComponentPreview>

      {/* ── Form.Button ───────────────────────────────────── */}
      <Heading as="h2">Form.Button</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Wraps{' '}
        <a href="/components/button" className="text-link underline hover:text-brand-primary">Button</a>{' '}
        as a submit button that auto-disables while the form is submitting. Add{' '}
        <InlineCode>disableWhenInvalid</InlineCode> to also disable
        when validation errors exist.
      </p>
      <ComponentPreview code={buttonCode} highlightedCode={buttonHighlighted}>
        <ButtonDemo />
      </ComponentPreview>

      {/* ── Shared Props ──────────────────────────────────── */}
      <Heading as="h2">Shared Field Props</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All field sub-components (Input, Textarea, Select, Checkbox, Radio,
        Switch, DatePicker, DateRangePicker) share these props:
      </p>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Prop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>name<span aria-label="required">*</span></InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Field name matching a key in your form values type.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>label<span aria-label="required">*</span></InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Visible label text. Also used for accessibility.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>rules</InlineCode></TableCell>
                <TableCell><InlineCode>RegisterOptions</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Validation rules (required, minLength, pattern, validate, etc.).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>description</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Helper text shown below the field.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Applied to the FormItem wrapper for layout spacing.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>name<span aria-label="required">*</span></strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Field name matching a key in your form values type.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>label<span aria-label="required">*</span></strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Visible label text. Also used for accessibility.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>rules</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>RegisterOptions</InlineCode></span>
              <span className="type-caption text-muted-foreground">Validation rules (required, minLength, pattern, validate, etc.).</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>description</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Helper text shown below the field.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Applied to the FormItem wrapper for layout spacing.</span>
            </TableMobileItem>
          </TableMobileList>
          <p className="type-caption mt-2 text-muted-foreground">* Required prop.</p>
        </div>
      </div>

      {/* ── Component-Specific Props ────────────────────────── */}
      <Heading as="h2">Component-Specific Props</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        These props are unique to specific sub-components, in addition to the
        shared props above.
      </p>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead>Prop</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>Form.Button</InlineCode></TableCell>
                <TableCell><InlineCode>disableWhenInvalid</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>false</InlineCode></TableCell>
                <TableCell>Also disable the button when the form has validation errors.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>Form.DatePicker</InlineCode></TableCell>
                <TableCell><InlineCode>placeholder</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Placeholder text shown when no date is selected.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>Form.DatePicker</InlineCode></TableCell>
                <TableCell><InlineCode>formatDate</InlineCode></TableCell>
                <TableCell><InlineCode>{'(date: Date) => string'}</InlineCode></TableCell>
                <TableCell>MM/dd/yyyy</TableCell>
                <TableCell>Custom date formatting function for the trigger display.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>Form.DateRangePicker</InlineCode></TableCell>
                <TableCell><InlineCode>placeholder</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Placeholder text shown when no range is selected.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>Form.DateRangePicker</InlineCode></TableCell>
                <TableCell><InlineCode>formatDate</InlineCode></TableCell>
                <TableCell><InlineCode>{'(date: Date) => string'}</InlineCode></TableCell>
                <TableCell>MM/dd/yyyy</TableCell>
                <TableCell>Custom date formatting function for the trigger display.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>Form.Button</strong> — disableWhenInvalid</span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>false</InlineCode></span>
              <span className="type-caption text-muted-foreground">Also disable the button when the form has validation errors.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>Form.DatePicker</strong> — placeholder</span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Placeholder text shown when no date is selected.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>Form.DatePicker</strong> — formatDate</span>
              <span className="type-caption text-muted-foreground"><InlineCode>{'(date: Date) => string'}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: MM/dd/yyyy</span>
              <span className="type-caption text-muted-foreground">Custom date formatting function for the trigger display.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>Form.DateRangePicker</strong> — placeholder</span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Placeholder text shown when no range is selected.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>Form.DateRangePicker</strong> — formatDate</span>
              <span className="type-caption text-muted-foreground"><InlineCode>{'(date: Date) => string'}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: MM/dd/yyyy</span>
              <span className="type-caption text-muted-foreground">Custom date formatting function for the trigger display.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>
    </Container>
  )
}
