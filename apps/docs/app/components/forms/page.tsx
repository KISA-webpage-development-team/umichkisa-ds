import {
  FormItem,
  Input,
  Textarea,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Checkbox,
  Switch,
  RadioGroup,
  RadioItem,
  Button,
  Container,
  Alert,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'

/* ── Code snippets ─────────────────────────────────────────── */

const basicCode = `import { FormItem, Input } from '@umichkisa-ds/web'

<FormItem htmlFor="name" label="Name">
  <Input id="name" placeholder="Enter your name" />
</FormItem>`

const errorCode = `import { FormItem, Input } from '@umichkisa-ds/web'

<FormItem
  htmlFor="email"
  label="Email"
  error="Please enter a valid email address."
>
  <Input id="email" type="email" invalid placeholder="you@example.com" />
</FormItem>`

const textareaCode = `import { FormItem, Textarea } from '@umichkisa-ds/web'

<FormItem htmlFor="bio" label="Bio" description="Tell us about yourself.">
  <Textarea id="bio" placeholder="Write something..." />
</FormItem>`

const selectCode = `import { FormItem, Select, SelectTrigger, SelectContent, SelectItem } from '@umichkisa-ds/web'

<FormItem htmlFor="role" label="Role" required>
  <Select>
    <SelectTrigger placeholder="Select a role" />
    <SelectContent>
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="editor">Editor</SelectItem>
      <SelectItem value="viewer">Viewer</SelectItem>
    </SelectContent>
  </Select>
</FormItem>`

const checkboxCode = `import { FormItem, Checkbox } from '@umichkisa-ds/web'

<FormItem htmlFor="terms" label="Agreement" required>
  <Checkbox id="terms" text="I agree to the terms and conditions" />
</FormItem>`

const switchCode = `import { FormItem, Switch } from '@umichkisa-ds/web'

<FormItem htmlFor="notifications" label="Notifications">
  <Switch id="notifications" text="Enable email updates" />
</FormItem>`

const radioCode = `import { FormItem, RadioGroup, RadioItem } from '@umichkisa-ds/web'

<FormItem htmlFor="contact" label="Preferred contact method">
  <RadioGroup>
    <RadioItem value="email" text="Email" />
    <RadioItem value="phone" text="Phone" />
    <RadioItem value="mail" text="Mail" />
  </RadioGroup>
</FormItem>`

const completeFormCode = `import {
  Card, CardHeader, CardTitle, CardDescription, CardContent,
  FormItem, Input, Textarea,
  Select, SelectTrigger, SelectContent, SelectItem,
  RadioGroup, RadioItem, Switch, Checkbox, Button,
} from '@umichkisa-ds/web'

<Card>
  <CardHeader>
    <CardTitle>Event Registration</CardTitle>
    <CardDescription>
      Register for the upcoming KISA networking event. Fields marked with * are required.
    </CardDescription>
  </CardHeader>

  <CardContent>
    <div className="flex flex-col gap-4 max-w-md mx-auto">
      <FormItem htmlFor="name" label="Full name" required>
        <Input id="name" placeholder="e.g. Kim Minjun" />
      </FormItem>

      <FormItem
        htmlFor="email"
        label="Email"
        required
        description="We'll send confirmation details to this address."
      >
        <Input id="email" type="email" placeholder="minjun@umich.edu" />
      </FormItem>

      <FormItem htmlFor="year" label="Year" required>
        <Select>
          <SelectTrigger placeholder="Select your year" />
          <SelectContent>
            <SelectItem value="freshman">Freshman</SelectItem>
            <SelectItem value="sophomore">Sophomore</SelectItem>
            <SelectItem value="junior">Junior</SelectItem>
            <SelectItem value="senior">Senior</SelectItem>
            <SelectItem value="graduate">Graduate</SelectItem>
          </SelectContent>
        </Select>
      </FormItem>

      <FormItem htmlFor="dietary" label="Dietary restrictions"
        description="Let us know so we can accommodate your needs.">
        <Input id="dietary" placeholder="e.g. Vegetarian, gluten-free" />
      </FormItem>

      <FormItem htmlFor="notes" label="Additional notes">
        <Textarea id="notes" placeholder="Anything else you'd like us to know..." />
      </FormItem>

      <FormItem htmlFor="contact" label="Preferred contact method">
        <RadioGroup>
          <RadioItem value="email" text="Email" />
          <RadioItem value="kakaotalk" text="KakaoTalk" />
          <RadioItem value="instagram" text="Instagram DM" />
        </RadioGroup>
      </FormItem>

      <FormItem htmlFor="updates" label="Updates">
        <Switch id="updates" text="Receive event reminders via email" />
      </FormItem>

      <FormItem htmlFor="terms" label="Terms" required>
        <Checkbox id="terms" text="I agree to the event code of conduct" />
      </FormItem>

      <div className="pt-2">
        <Button>Register</Button>
      </div>
    </div>
  </CardContent>
</Card>`

/* ── Page ──────────────────────────────────────────────────── */

export default async function FormsPage() {
  const [
    basicHighlighted,
    errorHighlighted,
    textareaHighlighted,
    selectHighlighted,
    checkboxHighlighted,
    switchHighlighted,
    radioHighlighted,
    completeFormHighlighted,
  ] = await Promise.all([
    highlight(basicCode),
    highlight(errorCode),
    highlight(textareaCode),
    highlight(selectCode),
    highlight(checkboxCode),
    highlight(switchCode),
    highlight(radioCode),
    highlight(completeFormCode),
  ])

  return (
    <Container size="md" as="article">

      {/* ── Header ──────────────────────────────────────────── */}
      <h1 className="type-h1 mb-4 text-foreground">Forms</h1>
      <p className="type-body mb-4 text-foreground max-w-prose">
        How to compose form components in the KISA design system.{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          FormItem
        </code>{' '}
        is the composition wrapper that pairs a label, description, and error message with any
        form control for consistent structure and spacing.
      </p>
      <div className="mb-8 max-w-prose">
        <Alert variant="info">
          For form state management, validation, and submission handling, see the{' '}
          <a href="/forms/overview" className="text-link underline hover:text-brand-primary">
            Forms
          </a>{' '}
          section — it provides a{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Form>'}</code>{' '}
          compound component that wires these primitives to react-hook-form automatically.
        </Alert>
      </div>

      {/* ── Section 1: Composition Patterns ─────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Composition Patterns</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Every form field should be wrapped in a{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          FormItem
        </code>
        . Below are the supported control pairings.
      </p>

      {/* Text inputs */}
      <h3 className="type-h3 mt-6 mb-2 text-foreground">Text inputs</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          FormItem
        </code>{' '}
        composes with{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Input
        </code>
        ,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Textarea
        </code>
        , and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Select
        </code>{' '}
        for single-line, multi-line, and dropdown text entry. Pass an{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          error
        </code>{' '}
        string to surface validation feedback, and mirror it on the control with the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          invalid
        </code>{' '}
        prop.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <div className="w-full max-w-sm">
          <FormItem htmlFor="cp-name" label="Name">
            <Input id="cp-name" placeholder="Enter your name" />
          </FormItem>
        </div>
      </ComponentPreview>
      <ComponentPreview code={errorCode} highlightedCode={errorHighlighted}>
        <div className="w-full max-w-sm">
          <FormItem
            htmlFor="cp-email-err"
            label="Email"
            error="Please enter a valid email address."
          >
            <Input id="cp-email-err" type="email" invalid placeholder="you@example.com" />
          </FormItem>
        </div>
      </ComponentPreview>
      <ComponentPreview code={textareaCode} highlightedCode={textareaHighlighted}>
        <div className="w-full max-w-sm">
          <FormItem htmlFor="cp-bio" label="Bio" description="Tell us about yourself.">
            <Textarea id="cp-bio" placeholder="Write something..." />
          </FormItem>
        </div>
      </ComponentPreview>
      <ComponentPreview code={selectCode} highlightedCode={selectHighlighted}>
        <div className="w-full max-w-sm">
          <FormItem htmlFor="cp-role" label="Role" required>
            <Select>
              <SelectTrigger placeholder="Select a role" />
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        </div>
      </ComponentPreview>

      {/* Toggle controls */}
      <h3 className="type-h3 mt-8 mb-2 text-foreground">Toggle controls</h3>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Checkbox
        </code>
        ,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          Switch
        </code>
        , and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          RadioGroup
        </code>{' '}
        compose inside{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          FormItem
        </code>{' '}
        with their inline description supplied via the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          text
        </code>{' '}
        prop. The FormItem provides the field heading; the toggle&apos;s{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          text
        </code>{' '}
        provides the inline label.
      </p>
      <ComponentPreview code={checkboxCode} highlightedCode={checkboxHighlighted}>
        <FormItem htmlFor="cp-terms" label="Agreement" required>
          <Checkbox id="cp-terms" text="I agree to the terms and conditions" />
        </FormItem>
      </ComponentPreview>
      <ComponentPreview code={switchCode} highlightedCode={switchHighlighted}>
        <FormItem htmlFor="cp-notif" label="Notifications">
          <Switch id="cp-notif" text="Enable email updates" />
        </FormItem>
      </ComponentPreview>
      <ComponentPreview code={radioCode} highlightedCode={radioHighlighted}>
        <FormItem htmlFor="cp-contact" label="Preferred contact method">
          <RadioGroup>
            <RadioItem value="email" text="Email" />
            <RadioItem value="phone" text="Phone" />
            <RadioItem value="mail" text="Mail" />
          </RadioGroup>
        </FormItem>
      </ComponentPreview>

      {/* ── Section 2: Complete Form Example ────────────────── */}
      <h2 className="type-h2 mt-12 mb-4 text-foreground">Complete Form Example</h2>
      <p className="type-body mb-6 text-foreground max-w-prose">
        A realistic event registration form composing multiple{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
          FormItem
        </code>{' '}
        instances into a cohesive layout. This demonstrates how the components work
        together in a production-like scenario.
      </p>

      <ComponentPreview code={completeFormCode} highlightedCode={completeFormHighlighted}>
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>Event Registration</CardTitle>
              <CardDescription>
                Register for the upcoming KISA networking event. Fields marked with * are required.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-4 max-w-md mx-auto">
                <FormItem htmlFor="demo-name" label="Full name" required>
                  <Input id="demo-name" placeholder="e.g. Kim Minjun" />
                </FormItem>

                <FormItem
                  htmlFor="demo-email"
                  label="Email"
                  required
                  description="We'll send confirmation details to this address."
                >
                  <Input id="demo-email" type="email" placeholder="minjun@umich.edu" />
                </FormItem>

                <FormItem htmlFor="demo-year" label="Year" required>
                  <Select>
                    <SelectTrigger placeholder="Select your year" />
                    <SelectContent>
                      <SelectItem value="freshman">Freshman</SelectItem>
                      <SelectItem value="sophomore">Sophomore</SelectItem>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>

                <FormItem
                  htmlFor="demo-dietary"
                  label="Dietary restrictions"
                  description="Let us know so we can accommodate your needs."
                >
                  <Input id="demo-dietary" placeholder="e.g. Vegetarian, gluten-free" />
                </FormItem>

                <FormItem htmlFor="demo-notes" label="Additional notes">
                  <Textarea id="demo-notes" placeholder="Anything else you'd like us to know..." />
                </FormItem>

                <FormItem htmlFor="demo-contact" label="Preferred contact method">
                  <RadioGroup>
                    <RadioItem value="email" text="Email" />
                    <RadioItem value="kakaotalk" text="KakaoTalk" />
                    <RadioItem value="instagram" text="Instagram DM" />
                  </RadioGroup>
                </FormItem>

                <FormItem htmlFor="demo-updates" label="Updates">
                  <Switch id="demo-updates" text="Receive event reminders via email" />
                </FormItem>

                <FormItem htmlFor="demo-terms" label="Terms" required>
                  <Checkbox id="demo-terms" text="I agree to the event code of conduct" />
                </FormItem>

                <div className="pt-2">
                  <Button>Register</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ComponentPreview>

      {/* ── Section 3: Guidelines ───────────────────────────── */}
      <h2 className="type-h2 mt-12 mb-4 text-foreground">Guidelines</h2>

      <ul className="list-disc pl-6 flex flex-col gap-3">
        <li className="type-body text-foreground max-w-prose">
          Always wrap form controls in{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
            FormItem
          </code>{' '}
          for consistent spacing, labels, and helper text.
        </li>
        <li className="type-body text-foreground max-w-prose">
          Match the{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
            htmlFor
          </code>{' '}
          prop on{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
            FormItem
          </code>{' '}
          to the{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
            id
          </code>{' '}
          on the control for accessibility. This connects the label to the input for
          screen readers and enables click-to-focus.
        </li>
        <li className="type-body text-foreground max-w-prose">
          Use the{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
            error
          </code>{' '}
          prop on{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
            FormItem
          </code>{' '}
          together with{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
            invalid
          </code>{' '}
          on the control. The error prop displays the message; the invalid prop styles the
          control border.
        </li>
        <li className="type-body text-foreground max-w-prose">
          Prefer vertical form layouts. Stack{' '}
          <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">
            FormItem
          </code>{' '}
          components in a column with consistent gap spacing for the most readable
          and mobile-friendly result.
        </li>
      </ul>

    </Container>
  )
}
