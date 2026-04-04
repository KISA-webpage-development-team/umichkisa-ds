import { Container } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'
import { highlight } from '@/lib/highlight'
import { LoginDemo, ProfileDemo, FeedbackDemo, HooksLoginDemo } from './_demos'

/* ── Code strings ─────────────────────────────────────────── */

const loginCode = `import { useForm, Form } from '@umichkisa-ds/form'

type LoginValues = {
  email: string
  password: string
}

function LoginForm() {
  const form = useForm<LoginValues>({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (data: LoginValues) => {
    alert(\`Logged in as \${data.email}\`)
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
        rules={{
          required: 'Password is required',
          minLength: { value: 6, message: 'At least 6 characters' },
        }}
      />
      <Form.Button>Sign in</Form.Button>
    </Form>
  )
}`

const profileCode = `import { useForm, Form } from '@umichkisa-ds/form'
import { RadioItem } from '@umichkisa-ds/web'

type ProfileValues = {
  name: string
  bio: string
  gradYear: string
  contact: string
  notifications: boolean
}

function ProfileForm() {
  const form = useForm<ProfileValues>({
    defaultValues: {
      name: '',
      bio: '',
      gradYear: '',
      contact: '',
      notifications: true,
    },
  })

  return (
    <Form form={form} onSubmit={(data) => console.log(data)}>
      <Form.Input
        name="name"
        label="Full Name"
        rules={{ required: 'Name is required' }}
      />
      <Form.Textarea
        name="bio"
        label="Bio"
        placeholder="Tell us about yourself..."
        rules={{ maxLength: { value: 200, message: 'Max 200 characters' } }}
      />
      <Form.Input
        name="gradYear"
        label="Graduation Year"
        type="number"
        rules={{
          required: 'Graduation year is required',
          min: { value: 2020, message: '2020 or later' },
          max: { value: 2030, message: '2030 or earlier' },
        }}
      />
      <Form.Radio name="contact" label="Preferred Contact" rules={{ required: 'Choose one' }}>
        <RadioItem value="email" text="Email" />
        <RadioItem value="kakao" text="KakaoTalk" />
        <RadioItem value="phone" text="Phone" />
      </Form.Radio>
      <Form.Switch
        name="notifications"
        label="Email notifications"
        description="Get updates about KISA events."
      />
      <Form.Button>Save profile</Form.Button>
    </Form>
  )
}`

const feedbackCode = `import { useForm, Form } from '@umichkisa-ds/form'
import { SelectTrigger, SelectContent, SelectItem } from '@umichkisa-ds/web'

type FeedbackValues = {
  subject: string
  message: string
  anonymous: boolean
}

function FeedbackForm() {
  const form = useForm<FeedbackValues>({
    defaultValues: { subject: '', message: '', anonymous: false },
  })

  return (
    <Form form={form} onSubmit={(data) => console.log(data)}>
      <Form.Select
        name="subject"
        label="Subject"
        rules={{ required: 'Select a subject' }}
      >
        <SelectTrigger placeholder="What is this about?" />
        <SelectContent>
          <SelectItem value="event">Event feedback</SelectItem>
          <SelectItem value="website">Website issue</SelectItem>
          <SelectItem value="suggestion">Suggestion</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Form.Select>
      <Form.Textarea
        name="message"
        label="Message"
        placeholder="Share your thoughts..."
        rules={{
          required: 'Message is required',
          minLength: { value: 20, message: 'At least 20 characters' },
        }}
      />
      <Form.Checkbox
        name="anonymous"
        label="Submit anonymously"
        description="Your name won't be attached to this feedback."
      />
      <Form.Button>Send feedback</Form.Button>
    </Form>
  )
}`

const hooksCode = `import { useForm, useFormField, useFormStatus } from '@umichkisa-ds/form'
import { Input, Button, FormItem } from '@umichkisa-ds/web'
import { FormProvider } from 'react-hook-form'

type LoginValues = { email: string; password: string }

function EmailField() {
  const { inputProps, error } = useFormField<LoginValues>('email', {
    required: 'Email is required',
  })
  return (
    <FormItem htmlFor="email" label="Email" error={error} required>
      <Input id="email" type="email" placeholder="you@umich.edu" {...inputProps} />
    </FormItem>
  )
}

function PasswordField() {
  const { inputProps, error } = useFormField<LoginValues>('password', {
    required: 'Password is required',
    minLength: { value: 6, message: 'At least 6 characters' },
  })
  return (
    <FormItem htmlFor="password" label="Password" error={error} required>
      <Input id="password" type="password" {...inputProps} />
    </FormItem>
  )
}

function SubmitButton() {
  const { isSubmitting, isValid } = useFormStatus()
  return (
    <Button type="submit" disabled={isSubmitting || !isValid}>
      {isSubmitting ? 'Signing in...' : 'Sign in'}
    </Button>
  )
}

function HooksLoginForm() {
  const form = useForm<LoginValues>({
    defaultValues: { email: '', password: '' },
  })

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((data) => alert(\`Logged in as \${data.email}\`))}
        className="flex flex-col gap-4"
      >
        <EmailField />
        <PasswordField />
        <SubmitButton />
      </form>
    </FormProvider>
  )
}`

/* ── Page ──────────────────────────────────────────────────── */

export default async function ExamplesPage() {
  const [loginHighlighted, profileHighlighted, feedbackHighlighted, hooksHighlighted] =
    await Promise.all([
      highlight(loginCode),
      highlight(profileCode),
      highlight(feedbackCode),
      highlight(hooksCode),
    ])

  return (
    <Container size="md" as="article">
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">
        Examples
      </h1>
      <p className="type-body mb-8 text-muted-foreground max-w-prose">
        Live interactive forms you can try right here. Each example is a
        complete, working form using{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">@umichkisa-ds/form</code>.
      </p>

      {/* ── Login Form ────────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Login Form</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        A simple login form with email and password validation. Try submitting
        with empty fields or a short password to see validation in action.
      </p>
      <ComponentPreview code={loginCode} highlightedCode={loginHighlighted}>
        <LoginDemo />
      </ComponentPreview>

      {/* ── Profile Edit ──────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Profile Edit</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        A KISA member profile editor demonstrating text inputs, textarea, number
        validation, radio groups, and a switch toggle.
      </p>
      <ComponentPreview code={profileCode} highlightedCode={profileHighlighted}>
        <ProfileDemo />
      </ComponentPreview>

      {/* ── Feedback Form ─────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Feedback Form</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        A feedback form with a select dropdown, textarea with minimum length,
        and an optional anonymous checkbox.
      </p>
      <ComponentPreview code={feedbackCode} highlightedCode={feedbackHighlighted}>
        <FeedbackDemo />
      </ComponentPreview>

      {/* ── Using Hooks ───────────────────────────────────── */}
      <h2 className="type-h2 mt-8 mb-4 text-foreground">Using Hooks</h2>
      <p className="type-body mb-4 text-foreground max-w-prose">
        The same login form rebuilt using{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">useFormField</code> and{' '}
        <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">useFormStatus</code> hooks. The result is
        identical but gives you full control over the field layout and submit
        button behavior.
      </p>
      <ComponentPreview code={hooksCode} highlightedCode={hooksHighlighted}>
        <HooksLoginDemo />
      </ComponentPreview>
    </Container>
  )
}
