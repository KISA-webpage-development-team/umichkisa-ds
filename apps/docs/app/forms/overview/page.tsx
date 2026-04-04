'use client'

import { Container } from '@umichkisa-ds/web'
import { useForm, Form } from '@umichkisa-ds/form'
import { ComponentPreview } from '@/components/ComponentPreview'
import Link from 'next/link'

const installCode = `npm install @umichkisa-ds/form react-hook-form`

const quickStartCode = `import { useForm, Form } from '@umichkisa-ds/form'

type LoginValues = {
  email: string
  password: string
}

function LoginForm() {
  const form = useForm<LoginValues>({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (data: LoginValues) => {
    console.log(data)
  }

  return (
    <Form form={form} onSubmit={onSubmit} className="flex flex-col gap-4">
      <Form.Input
        name="email"
        label="Email"
        type="email"
        placeholder="you@umich.edu"
        rules={{ required: 'Email is required' }}
      />
      <Form.Input
        name="password"
        label="Password"
        type="password"
        rules={{ required: 'Password is required' }}
      />
      <Form.Button>Sign in</Form.Button>
    </Form>
  )
}`

type LoginValues = {
  email: string
  password: string
}

function QuickStartDemo() {
  const form = useForm<LoginValues>({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (data: LoginValues) => {
    alert(`Logged in as ${data.email}`)
  }

  return (
    <Form form={form} onSubmit={onSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <Form.Input
        name="email"
        label="Email"
        type="email"
        placeholder="you@umich.edu"
        rules={{ required: 'Email is required' }}
      />
      <Form.Input
        name="password"
        label="Password"
        type="password"
        rules={{ required: 'Password is required' }}
      />
      <Form.Button>Sign in</Form.Button>
    </Form>
  )
}

export default function FormsOverviewPage() {
  return (
    <Container size="md" as="article">
      <h1 className="type-heading-2xl !font-semibold tracking-tight mt-8 mb-2 text-foreground">
        Forms
      </h1>
      <p className="type-body mb-8 text-muted-foreground max-w-prose">
        A thin integration layer between{' '}
        <code className="type-code">react-hook-form</code> and the KISA Design
        System. It provides sensible defaults, automatic error wiring, and
        compound components that eliminate boilerplate.
      </p>

      {/* ── Installation ──────────────────────────────────── */}
      <h2 className="type-heading-lg !font-semibold mt-8 mb-4 text-foreground">Installation</h2>
      <div className="my-4 border border-border rounded-lg bg-surface-muted overflow-x-auto">
        <pre className="type-caption font-mono text-foreground px-4 py-4 whitespace-pre">
          <code>{installCode}</code>
        </pre>
      </div>
      <p className="type-body-sm mb-8 text-muted-foreground max-w-prose">
        The package requires{' '}
        <code className="type-code">@umichkisa-ds/web</code> as a peer
        dependency — it wraps DS form primitives (Input, Textarea, Select, etc.)
        with react-hook-form controllers.
      </p>

      {/* ── Quick Start ───────────────────────────────────── */}
      <h2 className="type-heading-lg !font-semibold mt-8 mb-4 text-foreground">Quick Start</h2>
      <p className="type-body mb-4 text-muted-foreground max-w-prose">
        A complete login form in under 30 lines. The{' '}
        <code className="type-code">useForm</code> hook provides a form
        instance, and the{' '}
        <code className="type-code">{'<Form>'}</code> compound component handles
        context, submission, and error display automatically.
      </p>
      <ComponentPreview code={quickStartCode}>
        <QuickStartDemo />
      </ComponentPreview>

      {/* ── What's Inside ─────────────────────────────────── */}
      <h2 className="type-heading-lg !font-semibold mt-8 mb-4 text-foreground">{"What's Inside"}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <Link
          href="/forms/use-form"
          className="block p-4 rounded-lg border border-border bg-surface hover:bg-surface-subtle transition-colors"
        >
          <h3 className="type-body !font-semibold text-foreground mb-1">useForm</h3>
          <p className="type-body-sm text-muted-foreground">
            Wrapper hook with <code className="type-code">onTouched</code> validation mode by default. Drop-in replacement for react-hook-form.
          </p>
        </Link>

        <Link
          href="/forms/form-component"
          className="block p-4 rounded-lg border border-border bg-surface hover:bg-surface-subtle transition-colors"
        >
          <h3 className="type-body !font-semibold text-foreground mb-1">Form Component</h3>
          <p className="type-body-sm text-muted-foreground">
            Compound component with Form.Input, Form.Textarea, Form.Select, Form.Checkbox, Form.Radio, Form.Switch, and Form.Button.
          </p>
        </Link>

        <Link
          href="/forms/validation"
          className="block p-4 rounded-lg border border-border bg-surface hover:bg-surface-subtle transition-colors"
        >
          <h3 className="type-body !font-semibold text-foreground mb-1">Validation</h3>
          <p className="type-body-sm text-muted-foreground">
            Built-in rules, custom validators, and the onTouched lifecycle that shows errors at the right moment.
          </p>
        </Link>

        <Link
          href="/forms/hooks"
          className="block p-4 rounded-lg border border-border bg-surface hover:bg-surface-subtle transition-colors"
        >
          <h3 className="type-body !font-semibold text-foreground mb-1">Hooks</h3>
          <p className="type-body-sm text-muted-foreground">
            useFormField and useFormStatus for custom field layouts and status-aware UI.
          </p>
        </Link>

        <Link
          href="/forms/examples"
          className="block p-4 rounded-lg border border-border bg-surface hover:bg-surface-subtle transition-colors sm:col-span-2"
        >
          <h3 className="type-body !font-semibold text-foreground mb-1">Examples</h3>
          <p className="type-body-sm text-muted-foreground">
            Live interactive forms: login, profile edit, feedback, and a hooks-based variant.
          </p>
        </Link>
      </div>
    </Container>
  )
}
