import {
  Container,
  Alert,
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { CodeBlock } from '@/components/CodeBlock'
import { highlight } from '@/lib/highlight'
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'
import Link from 'next/link'
import { QuickStartDemo } from './_demos'

const installCode = `npm install @umichkisa-ds/form`

const installRHFCode = `npm install react-hook-form`

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
    <Form form={form} onSubmit={onSubmit}>
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

export default async function FormsPage() {
  const quickStartHighlighted = await highlight(quickStartCode, 'tsx')

  return (
    <Container size="md" as="article">
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">
        Forms
      </h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        <InlineCode>@umichkisa-ds/form</InlineCode>{' '}
        is a thin integration layer between{' '}
        <InlineCode>react-hook-form</InlineCode>{' '}
        and the KISA Design System. It provides sensible defaults, automatic error
        wiring, and compound components that eliminate boilerplate.
      </p>

      {/* ── Installation ──────────────────────────────────── */}
      <Heading as="h2">Installation</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Install the form package via the GitHub Packages registry:
      </p>
      <CodeBlock code={installCode} lang="bash" />
      <p className="type-body mb-4 text-foreground max-w-prose">
        You also need <InlineCode>react-hook-form</InlineCode> as
        a peer dependency:
      </p>
      <CodeBlock code={installRHFCode} lang="bash" />
      <Alert variant="info" className="mb-8">
        <InlineCode>@umichkisa-ds/web</InlineCode> is also a peer dependency.
        Install it with{' '}
        <InlineCode>npm install @umichkisa-ds/web</InlineCode>.
      </Alert>

      {/* ── Quick Start ───────────────────────────────────── */}
      <Heading as="h2">Quick Start</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        A complete login form in under 30 lines:
      </p>
      <ComponentPreview code={quickStartCode} highlightedCode={quickStartHighlighted}>
        <QuickStartDemo />
      </ComponentPreview>

      {/* ── What's Inside ─────────────────────────────────── */}
      <Heading as="h2">{"What's Inside"}</Heading>
      <Grid columns={{ base: 1, md: 2 }} gap="component" className="my-6">
        <Link href="/forms/use-form" className="block h-full rounded-md focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2">
          <Card hoverable className="h-full">
            <CardHeader>
              <CardTitle>useForm</CardTitle>
              <CardDescription>
                Wrapper hook with <InlineCode>onTouched</InlineCode> validation mode by default. Drop-in replacement for react-hook-form.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/forms/form-component" className="block h-full rounded-md focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2">
          <Card hoverable className="h-full">
            <CardHeader>
              <CardTitle>Form Component</CardTitle>
              <CardDescription>
                Compound component with Form.Input, Form.Textarea, Form.Select, Form.Checkbox, Form.Radio, Form.Switch, and Form.Button.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/forms/validation" className="block h-full rounded-md focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2">
          <Card hoverable className="h-full">
            <CardHeader>
              <CardTitle>Validation</CardTitle>
              <CardDescription>
                Built-in rules, custom validators, and the onTouched lifecycle that shows errors at the right moment.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/forms/hooks" className="block h-full rounded-md focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2">
          <Card hoverable className="h-full">
            <CardHeader>
              <CardTitle>Hooks</CardTitle>
              <CardDescription>
                useFormField and useFormStatus for custom field layouts and status-aware UI.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/forms/examples" className="block md:col-span-2 h-full rounded-md focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2">
          <Card hoverable className="h-full">
            <CardHeader>
              <CardTitle>Examples</CardTitle>
              <CardDescription>
                Live interactive forms: login, profile edit, feedback, and a hooks-based variant.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </Grid>
    </Container>
  )
}
