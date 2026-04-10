import {
  Container,
  Alert,
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
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'
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
      <p className="type-body mb-8 text-foreground max-w-prose">
        A thin wrapper around react-hook-form&apos;s{' '}
        <InlineCode>useForm</InlineCode> that sets{' '}
        <InlineCode>mode: &quot;onTouched&quot;</InlineCode> by default.
        Returns the same <InlineCode>UseFormReturn</InlineCode> object
        — all react-hook-form methods are available.
      </p>
      <Alert variant="info" title="Why use this over raw react-hook-form?">
        This wrapper pre-configures <InlineCode>mode: &quot;onTouched&quot;</InlineCode> so
        every form validates consistently — errors appear after blur and clear as the user
        types. Use it whenever you build a form with{' '}
        <InlineCode>@umichkisa-ds/form</InlineCode>.
        The returned object is the standard react-hook-form instance — no new API to learn.
      </Alert>

      {/* ── Basic Usage ───────────────────────────────────── */}
      <Heading as="h2">Basic Usage</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Pass a type generic and <InlineCode>defaultValues</InlineCode> to
        get a fully typed form instance. The returned object is passed to
        the <a href="/forms/form-component" className="text-link hover:text-brand-primary hover:underline">
          <InlineCode>{'<Form>'}</InlineCode> component
        </a>.
      </p>
      <ComponentPreview code={basicCode} highlightedCode={basicHighlighted}>
        <BasicDemo />
      </ComponentPreview>

      {/* ── Validation Mode ───────────────────────────────── */}
      <Heading as="h2">Validation Mode</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The default <InlineCode>onTouched</InlineCode> mode provides
        the best user experience: errors appear after a field loses focus (blur),
        then clear immediately as the user corrects the input. You can override
        this per-form.
      </p>
      <CodeBlock code={modeCode} lang="tsx" />

      {/* ── Form Methods ──────────────────────────────────── */}
      <Heading as="h2">Accessing Form Methods</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The returned form instance exposes all react-hook-form methods.
        Common ones include <InlineCode>reset()</InlineCode>,{' '}
        <InlineCode>setError()</InlineCode>, and{' '}
        <InlineCode>watch()</InlineCode>.
      </p>
      <CodeBlock code={methodsCode} lang="tsx" />

      {/* ── API Reference ─────────────────────────────────── */}
      <Heading as="h2">API Reference</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        <InlineCode>useForm</InlineCode> accepts all{' '}
        <InlineCode>UseFormProps</InlineCode> options from
        react-hook-form. The only change is the default value of{' '}
        <InlineCode>mode</InlineCode>.
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
                <TableCell><InlineCode>mode</InlineCode></TableCell>
                <TableCell><InlineCode>{`'onTouched' | 'onChange' | 'onBlur' | 'onSubmit' | 'all'`}</InlineCode></TableCell>
                <TableCell><InlineCode>{`'onTouched'`}</InlineCode></TableCell>
                <TableCell>When validation triggers.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>defaultValues</InlineCode></TableCell>
                <TableCell><InlineCode>{'Partial<T>'}</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>Initial values for all fields. Strongly recommended for type safety.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>resolver</InlineCode></TableCell>
                <TableCell><InlineCode>Resolver</InlineCode></TableCell>
                <TableCell>—</TableCell>
                <TableCell>External validation resolver (e.g., Zod, Yup). See <a href="/forms/validation" className="text-link hover:text-brand-primary hover:underline">Validation</a> for details.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>mode</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>{`'onTouched' | 'onChange' | 'onBlur' | 'onSubmit' | 'all'`}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Default: <InlineCode>{`'onTouched'`}</InlineCode></span>
              <span className="type-caption text-muted-foreground">When validation triggers.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>defaultValues</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>{'Partial<T>'}</InlineCode></span>
              <span className="type-caption text-muted-foreground">Initial values for all fields. Strongly recommended for type safety.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>resolver</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>Resolver</InlineCode></span>
              <span className="type-caption text-muted-foreground">External validation resolver (e.g., Zod, Yup). See <a href="/forms/validation" className="text-link hover:text-brand-primary hover:underline">Validation</a> for details.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      <Heading as="h2">Return Value</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Returns the standard react-hook-form{' '}
        <InlineCode>UseFormReturn{'<T>'}</InlineCode> object. Key
        properties:
      </p>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>handleSubmit</InlineCode></TableCell>
                <TableCell>Validates and calls your onSubmit handler. Used internally by the Form component.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>reset()</InlineCode></TableCell>
                <TableCell>Resets the form to defaultValues (or provided values).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>setError()</InlineCode></TableCell>
                <TableCell>Manually set an error on a field (e.g., server-side validation).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>watch()</InlineCode></TableCell>
                <TableCell>Subscribe to field value changes reactively.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>formState</InlineCode></TableCell>
                <TableCell>Object containing isSubmitting, isValid, isDirty, errors, and more.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>handleSubmit</strong></span>
              <span className="type-caption text-muted-foreground">Validates and calls your onSubmit handler. Used internally by the Form component.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>reset()</strong></span>
              <span className="type-caption text-muted-foreground">Resets the form to defaultValues (or provided values).</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>setError()</strong></span>
              <span className="type-caption text-muted-foreground">Manually set an error on a field (e.g., server-side validation).</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>watch()</strong></span>
              <span className="type-caption text-muted-foreground">Subscribe to field value changes reactively.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>formState</strong></span>
              <span className="type-caption text-muted-foreground">Object containing isSubmitting, isValid, isDirty, errors, and more.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>
    </Container>
  )
}
