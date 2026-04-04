'use client'

import { Container } from '@umichkisa-ds/web'
import { useForm, Form } from '@umichkisa-ds/form'
import { ComponentPreview } from '@/components/ComponentPreview'

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
    <Form form={form} onSubmit={onSubmit} className="flex flex-col gap-4">
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

type SignupValues = {
  name: string
  email: string
}

function BasicDemo() {
  const form = useForm<SignupValues>({
    defaultValues: { name: '', email: '' },
  })

  const onSubmit = (data: SignupValues) => {
    alert(`Welcome, ${data.name}!`)
  }

  return (
    <Form form={form} onSubmit={onSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <Form.Input name="name" label="Full Name" rules={{ required: 'Name is required' }} />
      <Form.Input name="email" label="Email" type="email" rules={{ required: 'Email is required' }} />
      <Form.Button>Sign up</Form.Button>
    </Form>
  )
}

export default function UseFormPage() {
  return (
    <Container size="md" as="article">
      <h1 className="type-heading-2xl !font-semibold tracking-tight mt-8 mb-2 text-foreground">
        useForm
      </h1>
      <p className="type-body mb-8 text-muted-foreground max-w-prose">
        A thin wrapper around react-hook-form&apos;s{' '}
        <code className="type-code">useForm</code> that sets{' '}
        <code className="type-code">mode: &quot;onTouched&quot;</code> by default.
        Returns the same <code className="type-code">UseFormReturn</code> object
        — all react-hook-form methods are available.
      </p>

      {/* ── Basic Usage ───────────────────────────────────── */}
      <h2 className="type-heading-lg !font-semibold mt-8 mb-4 text-foreground">Basic Usage</h2>
      <p className="type-body mb-4 text-muted-foreground max-w-prose">
        Pass a type generic and <code className="type-code">defaultValues</code> to
        get a fully typed form instance. The returned object is passed to the{' '}
        <code className="type-code">{'<Form>'}</code> component.
      </p>
      <ComponentPreview code={basicCode}>
        <BasicDemo />
      </ComponentPreview>

      {/* ── Validation Mode ───────────────────────────────── */}
      <h2 className="type-heading-lg !font-semibold mt-8 mb-4 text-foreground">Validation Mode</h2>
      <p className="type-body mb-4 text-muted-foreground max-w-prose">
        The default <code className="type-code">onTouched</code> mode provides
        the best user experience: errors appear after a field loses focus (blur),
        then clear immediately as the user corrects the input. You can override
        this per-form.
      </p>
      <div className="my-4 border border-border rounded-lg bg-surface-muted overflow-x-auto">
        <pre className="type-caption font-mono text-foreground px-4 py-4 whitespace-pre">
          <code>{modeCode}</code>
        </pre>
      </div>

      {/* ── Form Methods ──────────────────────────────────── */}
      <h2 className="type-heading-lg !font-semibold mt-8 mb-4 text-foreground">Accessing Form Methods</h2>
      <p className="type-body mb-4 text-muted-foreground max-w-prose">
        The returned form instance exposes all react-hook-form methods.
        Common ones include <code className="type-code">reset()</code>,{' '}
        <code className="type-code">setError()</code>, and{' '}
        <code className="type-code">watch()</code>.
      </p>
      <div className="my-4 border border-border rounded-lg bg-surface-muted overflow-x-auto">
        <pre className="type-caption font-mono text-foreground px-4 py-4 whitespace-pre">
          <code>{methodsCode}</code>
        </pre>
      </div>

      {/* ── API Reference ─────────────────────────────────── */}
      <h2 className="type-heading-lg !font-semibold mt-8 mb-4 text-foreground">API Reference</h2>
      <p className="type-body mb-4 text-muted-foreground max-w-prose">
        <code className="type-code">useForm</code> accepts all{' '}
        <code className="type-code">UseFormProps</code> options from
        react-hook-form. The only change is the default value of{' '}
        <code className="type-code">mode</code>.
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
              <td className="px-4 py-3 text-foreground"><code className="type-code">mode</code></td>
              <td className="px-4 py-3 text-foreground"><code className="type-code">{`'onTouched' | 'onChange' | 'onBlur' | 'onSubmit' | 'all'`}</code></td>
              <td className="px-4 py-3 text-foreground"><code className="type-code">{`'onTouched'`}</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">When validation triggers. Our default shows errors after blur and clears on change.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="type-code">defaultValues</code></td>
              <td className="px-4 py-3 text-foreground"><code className="type-code">{'Partial<T>'}</code></td>
              <td className="px-4 py-3 text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Initial values for all fields. Strongly recommended for type safety.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="type-code">resolver</code></td>
              <td className="px-4 py-3 text-foreground"><code className="type-code">Resolver</code></td>
              <td className="px-4 py-3 text-foreground">—</td>
              <td className="px-4 py-3 type-body-sm text-foreground">External validation resolver (e.g., Zod, Yup). Use for complex schemas.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="type-heading-lg !font-semibold mt-8 mb-4 text-foreground">Return Value</h2>
      <p className="type-body mb-4 text-muted-foreground max-w-prose">
        Returns the standard react-hook-form{' '}
        <code className="type-code">UseFormReturn{'<T>'}</code> object. Key
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
              <td className="px-4 py-3 text-foreground"><code className="type-code">handleSubmit</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Validates and calls your onSubmit handler. Used internally by the Form component.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="type-code">reset()</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Resets the form to defaultValues (or provided values).</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="type-code">setError()</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Manually set an error on a field (e.g., server-side validation).</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="type-code">watch()</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Subscribe to field value changes reactively.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground"><code className="type-code">formState</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Object containing isSubmitting, isValid, isDirty, errors, and more.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  )
}
