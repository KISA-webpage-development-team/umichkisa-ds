'use client'

import { Container } from '@umichkisa-ds/web'
import { useForm, Form } from '@umichkisa-ds/form'
import { ComponentPreview } from '@/components/ComponentPreview'

/* ── Code strings ──────────────────────────────────────────── */

const lifecycleCode = `// 1. User focuses the email field and types "abc"
// 2. User clicks away (blur) → validation runs → "Invalid email" error appears
// 3. User clicks back and types "abc@umich.edu" → error clears immediately
// 4. Result: errors don't interrupt typing, but appear before submission`

const requiredCode = `<Form.Input
  name="name"
  label="Full Name"
  rules={{ required: 'Full name is required' }}
/>`

const minMaxLengthCode = `<Form.Textarea
  name="bio"
  label="Bio"
  rules={{
    minLength: { value: 10, message: 'At least 10 characters' },
    maxLength: { value: 500, message: 'Maximum 500 characters' },
  }}
/>`

const minMaxCode = `<Form.Input
  name="gradYear"
  label="Graduation Year"
  type="number"
  rules={{
    min: { value: 2020, message: 'Year must be 2020 or later' },
    max: { value: 2030, message: 'Year must be 2030 or earlier' },
  }}
/>`

const patternCode = `<Form.Input
  name="email"
  label="UMich Email"
  rules={{
    required: 'Email is required',
    pattern: {
      value: /^[^@]+@umich\\.edu$/,
      message: 'Must be a @umich.edu email',
    },
  }}
/>`

const customCode = `<Form.Input
  name="password"
  label="Password"
  type="password"
  rules={{
    required: 'Password is required',
    minLength: { value: 8, message: 'At least 8 characters' },
    validate: (value) => {
      if (!/[A-Z]/.test(value)) return 'Must include an uppercase letter'
      if (!/[0-9]/.test(value)) return 'Must include a number'
      return true
    },
  }}
/>`

const combineCode = `<Form.Input
  name="username"
  label="Username"
  rules={{
    required: 'Username is required',
    minLength: { value: 3, message: 'At least 3 characters' },
    maxLength: { value: 20, message: 'Maximum 20 characters' },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: 'Only letters, numbers, and underscores',
    },
  }}
/>`

const overrideCode = `// Errors appear immediately while typing
const form = useForm<MyValues>({ mode: 'onChange' })

// Errors only appear on form submission
const form = useForm<MyValues>({ mode: 'onSubmit' })`

/* ── Demo components ──────────────────────────────────────── */

type ValidationDemoValues = {
  name: string
  email: string
  password: string
}

function ValidationDemo() {
  const form = useForm<ValidationDemoValues>({
    defaultValues: { name: '', email: '', password: '' },
  })

  return (
    <Form form={form} onSubmit={(data) => alert(`Valid! ${data.name} / ${data.email}`)} className="flex flex-col gap-4 w-full max-w-sm">
      <Form.Input
        name="name"
        label="Full Name"
        rules={{ required: 'Full name is required' }}
      />
      <Form.Input
        name="email"
        label="UMich Email"
        type="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^@]+@umich\.edu$/,
            message: 'Must be a @umich.edu email',
          },
        }}
      />
      <Form.Input
        name="password"
        label="Password"
        type="password"
        rules={{
          required: 'Password is required',
          minLength: { value: 8, message: 'At least 8 characters' },
          validate: (value: string) => {
            if (!/[A-Z]/.test(value)) return 'Must include an uppercase letter'
            if (!/[0-9]/.test(value)) return 'Must include a number'
            return true
          },
        }}
      />
      <Form.Button>Submit</Form.Button>
    </Form>
  )
}

/* ── Page ──────────────────────────────────────────────────── */

export default function ValidationPage() {
  return (
    <Container size="md" as="article">
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">
        Validation
      </h1>
      <p className="type-body mb-8 text-muted-foreground max-w-prose">
        How form validation works with the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">onTouched</code> default, built-in rules,
        and custom validators.
      </p>

      {/* ── onTouched Lifecycle ────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">
        The onTouched Lifecycle
      </h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The default <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">onTouched</code> mode strikes
        the right balance: errors appear after the user leaves a field (blur),
        and clear immediately as they correct the input. This prevents errors
        from flashing while typing but still provides feedback before submission.
      </p>
      <div className="my-4 border border-border rounded-lg bg-surface-muted overflow-x-auto">
        <pre className="type-caption font-mono text-foreground px-4 py-4 whitespace-pre">
          <code>{lifecycleCode}</code>
        </pre>
      </div>

      {/* ── Live Demo ─────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Try It</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        This form combines required, pattern, minLength, and custom validators.
        Tab through fields to see errors appear on blur, then type to watch them
        clear.
      </p>
      <ComponentPreview code={`// See the rules used in each field below`}>
        <ValidationDemo />
      </ComponentPreview>

      {/* ── Built-in Rules ────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Built-in Rules</h2>

      <h3 className="type-body !font-semibold mt-6 mb-2 text-foreground">required</h3>
      <p className="type-body-sm mb-2 text-muted-foreground max-w-prose">
        Pass a string message to show when the field is empty. The label will
        also display a required indicator.
      </p>
      <div className="my-4 border border-border rounded-lg bg-surface-muted overflow-x-auto">
        <pre className="type-caption font-mono text-foreground px-4 py-4 whitespace-pre">
          <code>{requiredCode}</code>
        </pre>
      </div>

      <h3 className="type-body !font-semibold mt-6 mb-2 text-foreground">minLength / maxLength</h3>
      <p className="type-body-sm mb-2 text-muted-foreground max-w-prose">
        Enforce character count limits on text fields.
      </p>
      <div className="my-4 border border-border rounded-lg bg-surface-muted overflow-x-auto">
        <pre className="type-caption font-mono text-foreground px-4 py-4 whitespace-pre">
          <code>{minMaxLengthCode}</code>
        </pre>
      </div>

      <h3 className="type-body !font-semibold mt-6 mb-2 text-foreground">min / max</h3>
      <p className="type-body-sm mb-2 text-muted-foreground max-w-prose">
        Enforce numeric range limits on number inputs.
      </p>
      <div className="my-4 border border-border rounded-lg bg-surface-muted overflow-x-auto">
        <pre className="type-caption font-mono text-foreground px-4 py-4 whitespace-pre">
          <code>{minMaxCode}</code>
        </pre>
      </div>

      <h3 className="type-body !font-semibold mt-6 mb-2 text-foreground">pattern</h3>
      <p className="type-body-sm mb-2 text-muted-foreground max-w-prose">
        Validate against a regular expression. Useful for email formats,
        phone numbers, or custom patterns.
      </p>
      <div className="my-4 border border-border rounded-lg bg-surface-muted overflow-x-auto">
        <pre className="type-caption font-mono text-foreground px-4 py-4 whitespace-pre">
          <code>{patternCode}</code>
        </pre>
      </div>

      {/* ── Custom Validators ─────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Custom Validators</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Use the <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">validate</code> rule for complex
        logic. Return <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">true</code> for valid or a
        string error message. You can run multiple checks in sequence.
      </p>
      <div className="my-4 border border-border rounded-lg bg-surface-muted overflow-x-auto">
        <pre className="type-caption font-mono text-foreground px-4 py-4 whitespace-pre">
          <code>{customCode}</code>
        </pre>
      </div>

      {/* ── Combining Rules ───────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Combining Rules</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All rules can be used together on a single field. They are checked in
        order: required first, then minLength/maxLength, then pattern, then
        validate.
      </p>
      <div className="my-4 border border-border rounded-lg bg-surface-muted overflow-x-auto">
        <pre className="type-caption font-mono text-foreground px-4 py-4 whitespace-pre">
          <code>{combineCode}</code>
        </pre>
      </div>

      {/* ── Overriding Mode ───────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Overriding Validation Mode</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        While <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">onTouched</code> is the recommended
        default, you can override the mode per-form via{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">useForm</code>.
      </p>
      <div className="my-4 border border-border rounded-lg bg-surface-muted overflow-x-auto">
        <pre className="type-caption font-mono text-foreground px-4 py-4 whitespace-pre">
          <code>{overrideCode}</code>
        </pre>
      </div>
    </Container>
  )
}
