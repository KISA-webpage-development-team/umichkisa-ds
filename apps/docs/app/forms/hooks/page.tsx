import { Container, Alert, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableMobileList, TableMobileItem } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { Heading } from '@/components/Heading'
import { InlineCode } from '@/components/InlineCode'
import { highlight } from '@/lib/highlight'
import { UseFormFieldDemo, UseFormStatusDemo } from './_demos'

/* ── Code strings ──────────────────────────────────────────── */

const useFormFieldCode = `import { useForm, Form, useFormField } from '@umichkisa-ds/form'
import { Input, Label, Button } from '@umichkisa-ds/web'

type ProfileValues = { name: string; email: string }

function InlineField({ name, label, rules }: {
  name: keyof ProfileValues
  label: string
  rules?: Record<string, string>
}) {
  const { inputProps, error } = useFormField<ProfileValues>(name, rules)

  return (
    <div className="flex items-start gap-2">
      <Label htmlFor={name} className="w-20 shrink-0 mt-2">{label}</Label>
      <div className="flex-1">
        <Input id={name} {...inputProps} />
        {error && <p className="type-caption text-error mt-1">{error}</p>}
      </div>
    </div>
  )
}

function ProfileForm() {
  const form = useForm<ProfileValues>({
    defaultValues: { name: '', email: '' },
  })

  return (
    <Form form={form} onSubmit={console.log}>
      <InlineField name="name" label="Name" rules={{ required: 'Name is required' }} />
      <InlineField name="email" label="Email" rules={{ required: 'Email is required' }} />
      <div className="flex items-start gap-2">
        <div className="w-20 shrink-0" />
        <Button type="submit">Save</Button>
      </div>
    </Form>
  )
}`

const useFormStatusCode = `import { useForm, Form, useFormStatus } from '@umichkisa-ds/form'
import { Button } from '@umichkisa-ds/web'

function SubmitFooter() {
  const { isSubmitting, isValid, isDirty } = useFormStatus()

  return (
    <div className="flex items-center justify-between">
      <span className="type-body-sm text-muted-foreground">
        {isDirty ? 'Unsaved changes' : 'No changes'}
      </span>
      <Button type="submit" disabled={isSubmitting || !isValid}>
        {isSubmitting ? 'Saving...' : 'Save changes'}
      </Button>
    </div>
  )
}

function SettingsForm() {
  const form = useForm({ defaultValues: { name: '' } })

  return (
    <Form form={form} onSubmit={(data) => console.log(data)}>
      <Form.Input name="name" label="Display Name" rules={{ required: 'Required' }} />
      <SubmitFooter />
    </Form>
  )
}`

/* ── Page ──────────────────────────────────────────────────── */

export default async function HooksPage() {
  const [useFormFieldHighlighted, useFormStatusHighlighted] = await Promise.all([
    highlight(useFormFieldCode),
    highlight(useFormStatusCode),
  ])

  return (
    <Container size="md" as="article">
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">
        Hooks
      </h1>
      <Alert variant="info" title="When to use hooks" className="mb-8">
        The{' '}
        <InlineCode>Form.*</InlineCode>{' '}
        compound components handle most forms but enforce a label-above-field layout.
        When you need a different layout (e.g., inline labels, grouped fields) or
        custom form chrome (submit footers, dirty indicators), use these hooks —
        they give you the same react-hook-form wiring without the layout opinion.
      </Alert>

      {/* ── useFormField ──────────────────────────────────── */}
      <Heading as="h2">useFormField</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Returns <InlineCode>inputProps</InlineCode> that you spread
        onto any DS input component, plus the current error state. Use this
        when you need a custom field layout — for example, a label beside the
        input instead of above it.
      </p>
      <ComponentPreview code={useFormFieldCode} highlightedCode={useFormFieldHighlighted}>
        <UseFormFieldDemo />
      </ComponentPreview>

      <Heading as="h3" className="type-body !font-semibold mt-6 mb-2">API</Heading>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>name</InlineCode></TableCell>
                <TableCell><InlineCode>string</InlineCode></TableCell>
                <TableCell>Field name matching a key in your form values type.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>rules</InlineCode></TableCell>
                <TableCell><InlineCode>RegisterOptions</InlineCode></TableCell>
                <TableCell>Optional validation rules (same as compound components).</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>name</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string</InlineCode></span>
              <span className="type-caption text-muted-foreground">Field name matching a key in your form values type.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>rules</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>RegisterOptions</InlineCode></span>
              <span className="type-caption text-muted-foreground">Optional validation rules (same as compound components).</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      <Heading as="h3" id="useformfield-return-value" className="type-body !font-semibold mt-8 mb-2">Return Value</Heading>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>value</InlineCode></TableCell>
                <TableCell><InlineCode>unknown</InlineCode></TableCell>
                <TableCell>Current field value.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>invalid</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell>Whether the field has a validation error.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>error</InlineCode></TableCell>
                <TableCell><InlineCode>string | undefined</InlineCode></TableCell>
                <TableCell>Error message string, if any.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>inputProps</InlineCode></TableCell>
                <TableCell><InlineCode>object</InlineCode></TableCell>
                <TableCell>Spread onto your input: name, value, onChange, onBlur, invalid, ref.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>value</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>unknown</InlineCode></span>
              <span className="type-caption text-muted-foreground">Current field value.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>invalid</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
              <span className="type-caption text-muted-foreground">Whether the field has a validation error.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>error</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>string | undefined</InlineCode></span>
              <span className="type-caption text-muted-foreground">Error message string, if any.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>inputProps</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>object</InlineCode></span>
              <span className="type-caption text-muted-foreground">Spread onto your input: name, value, onChange, onBlur, invalid, ref.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* ── useFormStatus ─────────────────────────────────── */}
      <Heading as="h2">useFormStatus</Heading>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Returns the form&apos;s submission and validity state. Use this to build
        custom submit footers, progress indicators, or conditional UI. Must be
        called within a <InlineCode>{'<Form>'}</InlineCode> or{' '}
        <InlineCode>FormProvider</InlineCode> context.
      </p>
      <ComponentPreview code={useFormStatusCode} highlightedCode={useFormStatusHighlighted}>
        <UseFormStatusDemo />
      </ComponentPreview>

      <Heading as="h3" id="useformstatus-return-value" className="type-body !font-semibold mt-6 mb-2">Return Value</Heading>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>isSubmitting</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell>True while the onSubmit handler is running (including async).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>isValid</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell>True when all fields pass validation.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>isDirty</InlineCode></TableCell>
                <TableCell><InlineCode>boolean</InlineCode></TableCell>
                <TableCell>True when any field value differs from defaultValues.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>isSubmitting</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
              <span className="type-caption text-muted-foreground">True while the onSubmit handler is running (including async).</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>isValid</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
              <span className="type-caption text-muted-foreground">True when all fields pass validation.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong>isDirty</strong></span>
              <span className="type-caption text-muted-foreground"><InlineCode>boolean</InlineCode></span>
              <span className="type-caption text-muted-foreground">True when any field value differs from defaultValues.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>

      {/* ── Decision Guide ────────────────────────────────── */}
      <Heading as="h2">When to Use What</Heading>
      <div className="my-6">
        <div className="hidden md:block">
          <Table size="sm">
            <TableHeader>
              <TableRow>
                <TableHead>Approach</TableHead>
                <TableHead>Use when</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><InlineCode>Form.*</InlineCode> compounds</TableCell>
                <TableCell>Standard forms with label-above-field layout. Handles 90% of cases with zero boilerplate.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>useFormField</InlineCode></TableCell>
                <TableCell>Custom field layouts (e.g., inline labels, grouped fields) or wrapping non-DS inputs.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><InlineCode>useFormStatus</InlineCode></TableCell>
                <TableCell>Custom submit footers, dirty indicators, or any UI that reacts to form state.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="block md:hidden">
          <TableMobileList>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong><InlineCode>Form.*</InlineCode> compounds</strong></span>
              <span className="type-caption text-muted-foreground">Standard forms with label-above-field layout. Handles 90% of cases with zero boilerplate.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong><InlineCode>useFormField</InlineCode></strong></span>
              <span className="type-caption text-muted-foreground">Custom field layouts (e.g., inline labels, grouped fields) or wrapping non-DS inputs.</span>
            </TableMobileItem>
            <TableMobileItem>
              <span className="type-body-sm text-foreground"><strong><InlineCode>useFormStatus</InlineCode></strong></span>
              <span className="type-caption text-muted-foreground">Custom submit footers, dirty indicators, or any UI that reacts to form state.</span>
            </TableMobileItem>
          </TableMobileList>
        </div>
      </div>
    </Container>
  )
}
