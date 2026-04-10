import {
  FormItem,
  Input,
  Textarea,
  Checkbox,
  Switch,
  RadioGroup,
  RadioItem,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableMobileItem,
  TableMobileList,
  TableRow,
} from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'
import { WithSelectDemo, WithA11ySelectDemo } from './_demos'
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'

const basicCode = `import { FormItem, Input } from '@umichkisa-ds/web'

<FormItem htmlFor="name" label="Name">
  <Input id="name" placeholder="Enter your name" />
</FormItem>`

const withDescriptionCode = `import { FormItem, Input } from '@umichkisa-ds/web'

<FormItem
  htmlFor="email"
  label="Email"
  description="We'll never share your email."
>
  <Input id="email" type="email" placeholder="you@example.com" />
</FormItem>`

const withErrorCode = `import { FormItem, Input } from '@umichkisa-ds/web'

<FormItem
  htmlFor="email"
  label="Email"
  error="Please enter a valid email address."
>
  <Input id="email" type="email" invalid placeholder="you@example.com" />
</FormItem>`

const requiredCode = `import { FormItem, Input } from '@umichkisa-ds/web'

<FormItem htmlFor="username" label="Username" required>
  <Input id="username" placeholder="Choose a username" />
</FormItem>`

const withTextareaCode = `import { FormItem, Textarea } from '@umichkisa-ds/web'

<FormItem htmlFor="bio" label="Bio" description="Tell us about yourself.">
  <Textarea id="bio" placeholder="Write something..." />
</FormItem>`

const withCheckboxCode = `import { FormItem, Checkbox } from '@umichkisa-ds/web'

<FormItem htmlFor="terms" label="Terms" required>
  <Checkbox id="terms" text="I agree to the terms and conditions" />
</FormItem>`

const withSwitchCode = `import { FormItem, Switch } from '@umichkisa-ds/web'

<FormItem htmlFor="notifications" label="Notifications">
  <Switch id="notifications" text="Send email updates" />
</FormItem>`

const withRadioCode = `import { FormItem, RadioGroup, RadioItem } from '@umichkisa-ds/web'

<FormItem htmlFor="contact" label="Preferred contact">
  <RadioGroup>
    <RadioItem value="email" text="Email" />
    <RadioItem value="phone" text="Phone" />
    <RadioItem value="mail" text="Mail" />
  </RadioGroup>
</FormItem>`

const a11yCode = `import { FormItem, Input } from '@umichkisa-ds/web'

<FormItem htmlFor="email" label="Email" description="We'll never share your email.">
  <Input id="email" aria-describedby="email-description" placeholder="you@example.com" />
</FormItem>`

const a11ySelectCode = `import { FormItem, Select, SelectTrigger, SelectContent, SelectItem } from '@umichkisa-ds/web'

<FormItem htmlFor="fruit" label="Fruit">
  <Select>
    <SelectTrigger placeholder="Pick a fruit..." aria-labelledby="fruit-label" />
    <SelectContent>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectContent>
  </Select>
</FormItem>`

const withSelectCode = `import { FormItem, Select, SelectTrigger, SelectContent, SelectItem } from '@umichkisa-ds/web'

const [role, setRole] = useState('')

<FormItem htmlFor="role" label="Role" required>
  <Select value={role} onValueChange={setRole}>
    <SelectTrigger placeholder="Select a role" />
    <SelectContent>
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="editor">Editor</SelectItem>
      <SelectItem value="viewer">Viewer</SelectItem>
    </SelectContent>
  </Select>
</FormItem>`

export default async function FormItemPage() {
  const [
    basicHighlighted,
    withDescriptionHighlighted,
    withErrorHighlighted,
    requiredHighlighted,
    withTextareaHighlighted,
    withCheckboxHighlighted,
    withSwitchHighlighted,
    withRadioHighlighted,
    a11yHighlighted,
    a11ySelectHighlighted,
    withSelectHighlighted,
  ] = await Promise.all([
    highlight(basicCode),
    highlight(withDescriptionCode),
    highlight(withErrorCode),
    highlight(requiredCode),
    highlight(withTextareaCode),
    highlight(withCheckboxCode),
    highlight(withSwitchCode),
    highlight(withRadioCode),
    highlight(a11yCode),
    highlight(a11ySelectCode),
    highlight(withSelectCode),
  ])

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 mb-4 text-foreground">FormItem</h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Layout wrapper that composes a label, form control, and optional description/error text
        for consistent form field structure. FormItem is presentation-only — it does not manage
        state or validate input. Pass an error string when validation fails, and FormItem renders it.
        Designed to work with{' '}
        <InlineCode>
          Input
        </InlineCode>,{' '}
        <InlineCode>
          Textarea
        </InlineCode>,{' '}
        <InlineCode>
          Select
        </InlineCode>, and any other form control.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <Heading as="h2">Examples</Heading>

      {/* Basic */}
      <Heading as="h3" className="mt-6">Basic</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The simplest usage. A label and input composed together with consistent spacing.
        The{' '}
        <InlineCode>
          htmlFor
        </InlineCode>{' '}
        prop must match the{' '}
        <InlineCode>
          id
        </InlineCode>{' '}
        on the form control so the label is accessible.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <div className="w-full max-w-sm">
          <FormItem htmlFor="basic-name" label="Name">
            <Input id="basic-name" placeholder="Enter your name" />
          </FormItem>
        </div>
      </ComponentPreview>

      {/* With description */}
      <Heading as="h3">With description</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass a{' '}
        <InlineCode>
          description
        </InlineCode>{' '}
        prop to render helper text below the form control.
      </p>
      <ComponentPreview code={withDescriptionCode} highlightedCode={withDescriptionHighlighted}>
        <div className="w-full max-w-sm">
          <FormItem
            htmlFor="desc-email"
            label="Email"
            description="We'll never share your email."
          >
            <Input id="desc-email" type="email" placeholder="you@example.com" />
          </FormItem>
        </div>
      </ComponentPreview>

      {/* With error */}
      <Heading as="h3">With error</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass an{' '}
        <InlineCode>
          error
        </InlineCode>{' '}
        string to show a validation message. When{' '}
        <InlineCode>
          error
        </InlineCode>{' '}
        is set, the description is hidden. Remember to also pass{' '}
        <InlineCode>
          invalid
        </InlineCode>{' '}
        to the input for error border styling.
      </p>
      <ComponentPreview code={withErrorCode} highlightedCode={withErrorHighlighted}>
        <div className="w-full max-w-sm">
          <FormItem
            htmlFor="error-email"
            label="Email"
            error="Please enter a valid email address."
          >
            <Input id="error-email" type="email" invalid placeholder="you@example.com" />
          </FormItem>
        </div>
      </ComponentPreview>

      {/* Required */}
      <Heading as="h3">Required</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Set{' '}
        <InlineCode>
          required
        </InlineCode>{' '}
        to show an asterisk on the label.
      </p>
      <ComponentPreview code={requiredCode} highlightedCode={requiredHighlighted}>
        <div className="w-full max-w-sm">
          <FormItem htmlFor="req-username" label="Username" required>
            <Input id="req-username" placeholder="Choose a username" />
          </FormItem>
        </div>
      </ComponentPreview>

      {/* With Textarea */}
      <Heading as="h3">With Textarea</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        FormItem composes with any form control. Here it wraps a{' '}
        <InlineCode>
          Textarea
        </InlineCode>.
      </p>
      <ComponentPreview code={withTextareaCode} highlightedCode={withTextareaHighlighted}>
        <div className="w-full max-w-sm">
          <FormItem htmlFor="ta-bio" label="Bio" description="Tell us about yourself.">
            <Textarea id="ta-bio" placeholder="Write something..." />
          </FormItem>
        </div>
      </ComponentPreview>

      {/* With Select */}
      <Heading as="h3">With Select</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Works with the compound{' '}
        <InlineCode>
          Select
        </InlineCode>{' '}
        API as well.
      </p>
      <ComponentPreview code={withSelectCode} highlightedCode={withSelectHighlighted}>
        <WithSelectDemo />
      </ComponentPreview>

      {/* With Checkbox */}
      <Heading as="h3">With Checkbox</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        FormItem composes with toggle controls too. Here it wraps a{' '}
        <InlineCode>
          Checkbox
        </InlineCode>{' '}
        that uses the{' '}
        <InlineCode>
          text
        </InlineCode>{' '}
        prop for its inline label.
      </p>
      <ComponentPreview code={withCheckboxCode} highlightedCode={withCheckboxHighlighted}>
        <div className="w-full max-w-sm">
          <FormItem htmlFor="cb-terms" label="Terms" required>
            <Checkbox id="cb-terms" text="I agree to the terms and conditions" />
          </FormItem>
        </div>
      </ComponentPreview>

      {/* With Switch */}
      <Heading as="h3">With Switch</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Works with{' '}
        <InlineCode>
          Switch
        </InlineCode>{' '}
        as well. The{' '}
        <InlineCode>
          text
        </InlineCode>{' '}
        prop renders the inline label next to the toggle.
      </p>
      <ComponentPreview code={withSwitchCode} highlightedCode={withSwitchHighlighted}>
        <div className="w-full max-w-sm">
          <FormItem htmlFor="sw-notifications" label="Notifications">
            <Switch id="sw-notifications" text="Send email updates" />
          </FormItem>
        </div>
      </ComponentPreview>

      {/* With RadioGroup */}
      <Heading as="h3">With RadioGroup</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        For radio buttons, wrap a{' '}
        <InlineCode>
          RadioGroup
        </InlineCode>{' '}
        containing{' '}
        <InlineCode>
          RadioItem
        </InlineCode>{' '}
        children. Each item uses the{' '}
        <InlineCode>
          text
        </InlineCode>{' '}
        prop for its label.
      </p>
      <ComponentPreview code={withRadioCode} highlightedCode={withRadioHighlighted}>
        <div className="w-full max-w-sm">
          <FormItem htmlFor="rg-contact" label="Preferred contact">
            <RadioGroup>
              <RadioItem value="email" text="Email" />
              <RadioItem value="phone" text="Phone" />
              <RadioItem value="mail" text="Mail" />
            </RadioGroup>
          </FormItem>
        </div>
      </ComponentPreview>

      {/* ── Accessibility ────────────────────────────────────── */}
      <Heading as="h2">Accessibility</Heading>
      <p className="type-body mb-2 text-foreground max-w-prose">
        FormItem generates predictable IDs on its internal elements:{' '}
        <InlineCode>
          {'{htmlFor}-label'}
        </InlineCode>,{' '}
        <InlineCode>
          {'{htmlFor}-description'}
        </InlineCode>, and{' '}
        <InlineCode>
          {'{htmlFor}-error'}
        </InlineCode>
        . Wire{' '}
        <InlineCode>
          aria-describedby
        </InlineCode>{' '}
        on the form control to associate helper text, and{' '}
        <InlineCode>
          aria-labelledby
        </InlineCode>{' '}
        for non-native triggers (e.g. Select).
      </p>
      <ComponentPreview code={a11yCode} highlightedCode={a11yHighlighted}>
        <div className="w-full max-w-sm">
          <FormItem
            htmlFor="a11y-email"
            label="Email"
            description="We'll never share your email."
          >
            <Input id="a11y-email" aria-describedby="a11y-email-description" placeholder="you@example.com" />
          </FormItem>
        </div>
      </ComponentPreview>

      <p className="type-body mt-4 mb-2 text-foreground max-w-prose">
        For non-native triggers like Select, use{' '}
        <InlineCode>
          aria-labelledby
        </InlineCode>{' '}
        with the auto-generated{' '}
        <InlineCode>
          {'{htmlFor}-label'}
        </InlineCode>{' '}
        ID.
      </p>
      <ComponentPreview code={a11ySelectCode} highlightedCode={a11ySelectHighlighted}>
        <div className="w-full max-w-sm">
          <WithA11ySelectDemo />
        </div>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <Heading as="h2">API Reference</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        FormItem does not extend native HTML attributes. All props are listed below.
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
                <TableCell><InlineCode>htmlFor</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Connects the label to the form control via matching id.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>label</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Text rendered inside the Label component.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>required</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell><InlineCode>false</InlineCode></TableCell>
                <TableCell>Shows a required asterisk on the label.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>error</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Validation error message. When set, replaces the description text.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>description</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Helper text shown below the form control. Hidden when error is set.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>className</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Additional CSS classes applied to the outer wrapper div.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>children</InlineCode></TableCell>
                <TableCell><InlineCode>ReactNode</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>The form control (Input, Textarea, Select, etc.).</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>htmlFor</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Connects the label to the form control via matching id.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>label</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Text rendered inside the Label component.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>required</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>false</InlineCode></span>
              <span className="type-caption text-muted-foreground">Shows a required asterisk on the label.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>error</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Validation error message. When set, replaces the description text.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>description</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Helper text shown below the form control. Hidden when error is set.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>className</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Additional CSS classes applied to the outer wrapper div.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>children</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>ReactNode</InlineCode></span>
              <span className="type-caption text-muted-foreground">The form control (Input, Textarea, Select, etc.).</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

    </Container>
  )
}
