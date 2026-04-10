import { Container } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { CodeBlock } from '@/components/CodeBlock'
import { highlight } from '@/lib/highlight'
import { ValidationDemo } from './_demos'

/* ── Code strings ──────────────────────────────────────────── */

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

const tryItCode = `import { useForm, Form } from '@umichkisa-ds/form'

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
    <Form form={form} onSubmit={(data) => alert(\`Valid! \${data.name} / \${data.email}\`)} className="w-full max-w-sm">
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
            value: /^[^@]+@umich\\\\.edu$/,
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
}`

/* ── Page ──────────────────────────────────────────────────── */

export default async function ValidationPage() {
  const tryItHighlighted = await highlight(tryItCode, 'tsx')

  return (
    <Container size="md" as="article">
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">
        Validation
      </h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        How form validation works with the onTouched default, built-in rules,
        and custom validators.
      </p>

      {/* ── onTouched Lifecycle ────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">
        The onTouched Lifecycle
      </h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        React Hook Form supports three validation modes. Our{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">useForm</code>{' '}
        wrapper defaults to{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">onTouched</code>{' '}
        — you get this behavior for free without any configuration.
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-1 max-w-prose">
        <li className="type-body text-foreground">
          <strong>onChange</strong>{' '}
          — validates on every keystroke. Too aggressive for most forms — users see errors before they finish typing.
        </li>
        <li className="type-body text-foreground">
          <strong>onTouched</strong>{' '}
          — validates when a field loses focus (blur), then re-validates on each change. The sweet spot: errors appear after the user is done with a field, and clear immediately as they correct it.
        </li>
        <li className="type-body text-foreground">
          <strong>onSubmit</strong>{' '}
          — validates only on form submission. Users get no feedback until they hit submit, which can feel unresponsive.
        </li>
      </ul>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Here is what onTouched looks like in practice:
      </p>
      <ol className="list-decimal pl-6 mb-4 space-y-1 max-w-prose">
        <li className="type-body text-foreground">User focuses the email field and types &quot;abc&quot;</li>
        <li className="type-body text-foreground">User clicks away (blur) — validation runs, &quot;Invalid email&quot; error appears</li>
        <li className="type-body text-foreground">User clicks back and types &quot;abc@umich.edu&quot; — error clears immediately</li>
        <li className="type-body text-foreground">Result: errors never interrupt typing, but always appear before submission</li>
      </ol>

      {/* ── Live Demo ─────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Try It</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        This form combines required, pattern, minLength, and custom validators.
        Tab through fields to see errors appear on blur, then type to watch them
        clear.
      </p>
      <ComponentPreview code={tryItCode} highlightedCode={tryItHighlighted}>
        <ValidationDemo />
      </ComponentPreview>

      {/* ── Built-in Rules ────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Built-in Rules</h2>

      <h3 className="type-body !font-semibold mt-6 mb-2 text-foreground">required</h3>
      <p className="type-body-sm mb-2 text-muted-foreground max-w-prose">
        Pass a string message to show when the field is empty. The label will
        also display a required indicator.
      </p>
      <CodeBlock code={requiredCode} lang="tsx" />

      <h3 className="type-body !font-semibold mt-6 mb-2 text-foreground">minLength / maxLength</h3>
      <p className="type-body-sm mb-2 text-muted-foreground max-w-prose">
        Enforce character count limits on text fields.
      </p>
      <CodeBlock code={minMaxLengthCode} lang="tsx" />

      <h3 className="type-body !font-semibold mt-6 mb-2 text-foreground">min / max</h3>
      <p className="type-body-sm mb-2 text-muted-foreground max-w-prose">
        Enforce numeric range limits on number inputs.
      </p>
      <CodeBlock code={minMaxCode} lang="tsx" />

      <h3 className="type-body !font-semibold mt-6 mb-2 text-foreground">pattern</h3>
      <p className="type-body-sm mb-2 text-muted-foreground max-w-prose">
        Validate against a regular expression. Useful for email formats,
        phone numbers, or custom patterns.
      </p>
      <CodeBlock code={patternCode} lang="tsx" />

      {/* ── Custom Validators ─────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Custom Validators</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Use the <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">validate</code> rule for complex
        logic. Return <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">true</code> for valid or a
        string error message. You can run multiple checks in sequence.
      </p>
      <CodeBlock code={customCode} lang="tsx" />

      {/* ── Combining Rules ───────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Combining Rules</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        All rules can be used together on a single field. They are checked in
        order: required first, then minLength/maxLength, then pattern, then
        validate.
      </p>
      <CodeBlock code={combineCode} lang="tsx" />

      {/* ── Overriding Mode ───────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Overriding Validation Mode</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        While <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">onTouched</code> is the recommended
        default, you can override the mode per-form via{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">useForm</code>.
      </p>
      <CodeBlock code={overrideCode} lang="tsx" />
    </Container>
  )
}
