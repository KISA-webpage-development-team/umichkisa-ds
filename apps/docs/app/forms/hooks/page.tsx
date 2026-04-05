import { Container } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'
import { UseFormFieldDemo, UseFormStatusDemo } from './_demos'

/* ── Code strings ──────────────────────────────────────────── */

const useFormFieldCode = `import { useForm, Form, useFormField } from '@umichkisa-ds/form'
import { Input, FormItem } from '@umichkisa-ds/web'

type ProfileValues = { name: string; email: string }

function NameField() {
  const { inputProps, error } = useFormField<ProfileValues>('name', {
    required: 'Name is required',
  })

  return (
    <FormItem htmlFor="name" label="Name" error={error} required>
      <Input id="name" {...inputProps} />
    </FormItem>
  )
}

function ProfileForm() {
  const form = useForm<ProfileValues>({
    defaultValues: { name: '', email: '' },
  })

  return (
    <Form form={form} onSubmit={console.log}>
      <NameField />
      <button type="submit">Save</button>
    </Form>
  )
}`

const useFormStatusCode = `import { useForm, Form, useFormStatus } from '@umichkisa-ds/form'
import { Button } from '@umichkisa-ds/web'

function SubmitFooter() {
  const { isSubmitting, isValid, isDirty } = useFormStatus()

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
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
      <p className="type-body mb-8 text-muted-foreground max-w-prose">
        For cases where the compound{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Form>'}</code> components don&apos;t fit
        your layout, use these hooks to build custom field layouts and
        status-aware UI.
      </p>

      {/* ── useFormField ──────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">useFormField</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Returns <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">inputProps</code> that you spread
        onto any DS input component, plus the current error state. Use this
        when you need a custom field layout — for example, a label beside the
        input instead of above it.
      </p>
      <ComponentPreview code={useFormFieldCode} highlightedCode={useFormFieldHighlighted}>
        <UseFormFieldDemo />
      </ComponentPreview>

      <h3 className="type-body !font-semibold mt-6 mb-2 text-foreground">API</h3>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Parameter</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">name</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">string</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Field name matching a key in your form values type.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">rules</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">RegisterOptions</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Optional validation rules (same as compound components).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="type-body !font-semibold mt-6 mb-2 text-foreground">Return Value</h3>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Property</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">value</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">unknown</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Current field value.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">invalid</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">boolean</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Whether the field has a validation error.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">error</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">string | undefined</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Error message string, if any.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">inputProps</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">object</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Spread onto your input: name, value, onChange, onBlur, invalid, ref.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── useFormStatus ─────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">useFormStatus</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        Returns the form&apos;s submission and validity state. Use this to build
        custom submit footers, progress indicators, or conditional UI. Must be
        called within a <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{'<Form>'}</code> or{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">FormProvider</code> context.
      </p>
      <ComponentPreview code={useFormStatusCode} highlightedCode={useFormStatusHighlighted}>
        <UseFormStatusDemo />
      </ComponentPreview>

      <h3 className="type-body !font-semibold mt-6 mb-2 text-foreground">Return Value</h3>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Property</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">isSubmitting</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">boolean</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">True while the onSubmit handler is running (including async).</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">isValid</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">boolean</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">True when all fields pass validation.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">isDirty</code></td>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">boolean</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">True when any field value differs from defaultValues.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Decision Guide ────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">When to Use What</h2>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead className="bg-surface-subtle">
            <tr>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Approach</th>
              <th className="px-4 py-3 text-left type-caption border-b border-border text-muted-foreground">Use when</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">Form.*</code> compounds</td>
              <td className="px-4 py-3 type-body-sm text-foreground">Standard forms with label-above-field layout. Handles 90% of cases with zero boilerplate.</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">useFormField</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Custom field layouts (e.g., inline labels, grouped fields) or wrapping non-DS inputs.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-foreground"><code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">useFormStatus</code></td>
              <td className="px-4 py-3 type-body-sm text-foreground">Custom submit footers, dirty indicators, or any UI that reacts to form state.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  )
}
