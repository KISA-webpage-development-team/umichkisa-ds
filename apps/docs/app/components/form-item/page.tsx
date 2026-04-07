import {
  FormItem,
  Input,
  Textarea,
  Checkbox,
  Switch,
  RadioGroup,
  RadioItem,
  Container,
} from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'
import { WithSelectDemo, WithA11ySelectDemo } from './_demos'

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
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Input
        </code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Textarea
        </code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Select
        </code>, and any other form control.
      </p>

      {/* ── Examples ────────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Examples</h2>

      {/* Basic */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Basic</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        The simplest usage. A label and input composed together with consistent spacing.
        The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          htmlFor
        </code>{' '}
        prop must match the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          id
        </code>{' '}
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With description</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          description
        </code>{' '}
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With error</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Pass an{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          error
        </code>{' '}
        string to show a validation message. When{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          error
        </code>{' '}
        is set, the description is hidden. Remember to also pass{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          invalid
        </code>{' '}
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Required</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Set{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          required
        </code>{' '}
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With Textarea</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        FormItem composes with any form control. Here it wraps a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Textarea
        </code>.
      </p>
      <ComponentPreview code={withTextareaCode} highlightedCode={withTextareaHighlighted}>
        <div className="w-full max-w-sm">
          <FormItem htmlFor="ta-bio" label="Bio" description="Tell us about yourself.">
            <Textarea id="ta-bio" placeholder="Write something..." />
          </FormItem>
        </div>
      </ComponentPreview>

      {/* With Select */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With Select</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Works with the compound{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Select
        </code>{' '}
        API as well.
      </p>
      <ComponentPreview code={withSelectCode} highlightedCode={withSelectHighlighted}>
        <WithSelectDemo />
      </ComponentPreview>

      {/* With Checkbox */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With Checkbox</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        FormItem composes with toggle controls too. Here it wraps a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Checkbox
        </code>{' '}
        that uses the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          text
        </code>{' '}
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With Switch</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        Works with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Switch
        </code>{' '}
        as well. The{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          text
        </code>{' '}
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
      <h3 className="type-h3 mt-8 mb-2 text-foreground">With RadioGroup</h3>
      <p className="type-body mb-2 text-foreground max-w-prose">
        For radio buttons, wrap a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          RadioGroup
        </code>{' '}
        containing{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          RadioItem
        </code>{' '}
        children. Each item uses the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          text
        </code>{' '}
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
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Accessibility</h2>
      <p className="type-body mb-2 text-foreground max-w-prose">
        FormItem generates predictable IDs on its internal elements:{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          {'{htmlFor}-label'}
        </code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          {'{htmlFor}-description'}
        </code>, and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          {'{htmlFor}-error'}
        </code>
        . Wire{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          aria-describedby
        </code>{' '}
        on the form control to associate helper text, and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          aria-labelledby
        </code>{' '}
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
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          aria-labelledby
        </code>{' '}
        with the auto-generated{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          {'{htmlFor}-label'}
        </code>{' '}
        ID.
      </p>
      <ComponentPreview code={a11ySelectCode} highlightedCode={a11ySelectHighlighted}>
        <div className="w-full max-w-sm">
          <WithA11ySelectDemo />
        </div>
      </ComponentPreview>

      {/* ── API Reference ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        FormItem does not extend native HTML attributes. All props are listed below.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Prop</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">htmlFor</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Connects the label to the form control via matching id.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">label</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Text rendered inside the Label component.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">required</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">boolean</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">false</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Shows a required asterisk on the label.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">error</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Validation error message. When set, replaces the description text.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">description</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Helper text shown below the form control. Hidden when error is set.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">className</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Additional CSS classes applied to the outer wrapper div.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">children</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle">ReactNode</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">The form control (Input, Textarea, Select, etc.).</td>
            </tr>
          </tbody>
        </table>
      </div>

    </Container>
  )
}
