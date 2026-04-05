import { Container } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { CodeBlock } from '@/components/CodeBlock'
import { highlight } from '@/lib/highlight'
import { BasicDemo } from './_demos'

const basicCode = `import { useForm, Form } from '@umichkisa-ds/form'

type SignupValues = {
  name: string
  email: string
}

function SignupForm() {
  const form = useForm<SignupValues>({
    defaultValues: { name: '', email: '' },
  })

  const onSubmit = (data: SignupValues) => {
    console.log(data)
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Form.Input name="name" label="Full Name" rules={{ required: 'Name is required' }} />
      <Form.Input name="email" label="Email" type="email" rules={{ required: 'Email is required' }} />
      <Form.Button>Sign up</Form.Button>
    </Form>
  )
}`

const modeCode = `// Default: onTouched — errors appear after blur, clear as you type
const form = useForm<MyValues>()

// Override to onChange — errors appear immediately while typing
const form = useForm<MyValues>({ mode: 'onChange' })

// Override to onSubmit — errors only appear on form submission
const form = useForm<MyValues>({ mode: 'onSubmit' })`

const methodsCode = `const form = useForm<ProfileValues>({
  defaultValues: { name: 'Jioh', bio: '' },
})

// Reset the form to initial values
form.reset()

// Set a server-side error on a specific field
form.setError('email', { message: 'Email already taken' })

// Watch a field value reactively
const name = form.watch('name')`

export default async function UseFormPage() {
  const basicHighlighted = await highlight(basicCode, 'tsx')

  return (
    <Container size="md" as="article">
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">
        useForm
      </h1>
      <p className="type-body mb-8 text-muted-foreground max-w-prose">
        A thin wrapper around react-hook-form&apos;s{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">useForm</code> that sets{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">mode: &quot;onTouched&quot;</code> by default.
        Returns the same <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">UseFormReturn</code> object
        — all react-hook-form methods are available.
      </p>

      {/* ── Basic Usage ───────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Basic Usage</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Pass a type generic and <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">defaultValues</code> to
        get a fully typed form instance. The returned object is passed to the{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Form>'}</code> component.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <BasicDemo />
      </ComponentPreview>

      {/* ── Validation Mode ───────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Validation Mode</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The default <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">onTouched</code> mode provides
        the best user experience: errors appear after a field loses focus (blur),
        then clear immediately as the user corrects the input. You can override
        this per-form.
      </p>
      <CodeBlock code={modeCode} lang="tsx" />

      {/* ── Form Methods ──────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Accessing Form Methods</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The returned form instance exposes all react-hook-form methods.
        Common ones include <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">reset()</code>,{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">setError()</code>, and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">watch()</code>.
      </p>
      <CodeBlock code={methodsCode} lang="tsx" />

      {/* ── API Reference ─────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">useForm</code> accepts all{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">UseFormProps</code> options from
        react-hook-form. The only change is the default value of{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">mode</code>.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Option</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Default</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">mode</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{`'onTouched' | 'onChange' | 'onBlur' | 'onSubmit' | 'all'`}</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{`'onTouched'`}</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">When validation triggers. Our default shows errors after blur and clears on change.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">defaultValues</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'Partial<T>'}</code></td>
              <td className="px-4 py-3 text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Initial values for all fields. Strongly recommended for type safety.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">resolver</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Resolver</code></td>
              <td className="px-4 py-3 text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">External validation resolver (e.g., Zod, Yup). Use for complex schemas.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="type-h2 mt-8 mb-4 text-foreground">Return Value</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Returns the standard react-hook-form{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">UseFormReturn{'<T>'}</code> object. Key
        properties:
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Property</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">handleSubmit</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Validates and calls your onSubmit handler. Used internally by the Form component.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">reset()</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Resets the form to defaultValues (or provided values).</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">setError()</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Manually set an error on a field (e.g., server-side validation).</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">watch()</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Subscribe to field value changes reactively.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">formState</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Object containing isSubmitting, isValid, isDirty, errors, and more.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  )
}
