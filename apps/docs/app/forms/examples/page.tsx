'use client'

import {
  Container,
  Input,
  Button,
  FormItem,
  SelectTrigger,
  SelectContent,
  SelectItem,
  RadioItem,
} from '@umichkisa-ds/web'
import { useForm, Form, useFormField, useFormStatus } from '@umichkisa-ds/form'
import { FormProvider } from 'react-hook-form'
import { ComponentPreview } from '@/components/ComponentPreview'

/* ══════════════════════════════════════════════════════════════
   Example 1: Login Form
   ══════════════════════════════════════════════════════════════ */

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
        rules={{
          required: 'Password is required',
          minLength: { value: 6, message: 'At least 6 characters' },
        }}
      />
      <Form.Button>Sign in</Form.Button>
    </Form>
  )
}`

type LoginValues = { email: string; password: string }

function LoginDemo() {
  const form = useForm<LoginValues>({
    defaultValues: { email: '', password: '' },
  })

  return (
    <Form
      form={form}
      onSubmit={(data) => alert(`Logged in as ${data.email}`)}
      className="flex flex-col gap-4 w-full max-w-sm"
    >
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
}

/* ══════════════════════════════════════════════════════════════
   Example 2: Profile Edit
   ══════════════════════════════════════════════════════════════ */

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
    <Form form={form} onSubmit={(data) => console.log(data)} className="flex flex-col gap-4">
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
        <RadioItem value="email" label="Email" />
        <RadioItem value="kakao" label="KakaoTalk" />
        <RadioItem value="phone" label="Phone" />
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

type ProfileValues = {
  name: string
  bio: string
  gradYear: string
  contact: string
  notifications: boolean
}

function ProfileDemo() {
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
    <Form
      form={form}
      onSubmit={(data) => alert(`Saved profile for ${data.name} (${data.gradYear})`)}
      className="flex flex-col gap-4 w-full max-w-sm"
    >
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
        <RadioItem value="email" label="Email" />
        <RadioItem value="kakao" label="KakaoTalk" />
        <RadioItem value="phone" label="Phone" />
      </Form.Radio>
      <Form.Switch
        name="notifications"
        label="Email notifications"
        description="Get updates about KISA events."
      />
      <Form.Button>Save profile</Form.Button>
    </Form>
  )
}

/* ══════════════════════════════════════════════════════════════
   Example 3: Feedback Form
   ══════════════════════════════════════════════════════════════ */

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
    <Form form={form} onSubmit={(data) => console.log(data)} className="flex flex-col gap-4">
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

type FeedbackValues = {
  subject: string
  message: string
  anonymous: boolean
}

function FeedbackDemo() {
  const form = useForm<FeedbackValues>({
    defaultValues: { subject: '', message: '', anonymous: false },
  })

  return (
    <Form
      form={form}
      onSubmit={(data) => alert(`Feedback sent about "${data.subject}"`)}
      className="flex flex-col gap-4 w-full max-w-sm"
    >
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
}

/* ══════════════════════════════════════════════════════════════
   Example 4: Using Hooks (login form rebuilt with hooks)
   ══════════════════════════════════════════════════════════════ */

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

type HooksLoginValues = { email: string; password: string }

function HooksEmailField() {
  const { inputProps, error } = useFormField<HooksLoginValues>('email', {
    required: 'Email is required',
  })
  return (
    <FormItem htmlFor="hooks-email" label="Email" error={error} required>
      <Input id="hooks-email" type="email" placeholder="you@umich.edu" {...inputProps} />
    </FormItem>
  )
}

function HooksPasswordField() {
  const { inputProps, error } = useFormField<HooksLoginValues>('password', {
    required: 'Password is required',
    minLength: { value: 6, message: 'At least 6 characters' },
  })
  return (
    <FormItem htmlFor="hooks-password" label="Password" error={error} required>
      <Input id="hooks-password" type="password" {...inputProps} />
    </FormItem>
  )
}

function HooksSubmitButton() {
  const { isSubmitting, isValid } = useFormStatus()
  return (
    <Button type="submit" disabled={isSubmitting || !isValid}>
      {isSubmitting ? 'Signing in...' : 'Sign in'}
    </Button>
  )
}

function HooksLoginDemo() {
  const form = useForm<HooksLoginValues>({
    defaultValues: { email: '', password: '' },
  })

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((data) => alert(`Logged in as ${data.email}`))}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <HooksEmailField />
        <HooksPasswordField />
        <HooksSubmitButton />
      </form>
    </FormProvider>
  )
}

/* ── Page ──────────────────────────────────────────────────── */

export default function ExamplesPage() {
  return (
    <Container size="md" as="article">
      <h1 className="type-heading-2xl !font-semibold tracking-tight mt-8 mb-2 text-foreground">
        Examples
      </h1>
      <p className="type-body mb-8 text-muted-foreground max-w-prose">
        Live interactive forms you can try right here. Each example is a
        complete, working form using{' '}
        <code className="type-code">@umichkisa-ds/form</code>.
      </p>

      {/* ── Login Form ────────────────────────────────────── */}
      <h2 className="type-heading-lg !font-semibold mt-8 mb-4 text-foreground">Login Form</h2>
      <p className="type-body mb-4 text-muted-foreground max-w-prose">
        A simple login form with email and password validation. Try submitting
        with empty fields or a short password to see validation in action.
      </p>
      <ComponentPreview code={loginCode}>
        <LoginDemo />
      </ComponentPreview>

      {/* ── Profile Edit ──────────────────────────────────── */}
      <h2 className="type-heading-lg !font-semibold mt-8 mb-4 text-foreground">Profile Edit</h2>
      <p className="type-body mb-4 text-muted-foreground max-w-prose">
        A KISA member profile editor demonstrating text inputs, textarea, number
        validation, radio groups, and a switch toggle.
      </p>
      <ComponentPreview code={profileCode}>
        <ProfileDemo />
      </ComponentPreview>

      {/* ── Feedback Form ─────────────────────────────────── */}
      <h2 className="type-heading-lg !font-semibold mt-8 mb-4 text-foreground">Feedback Form</h2>
      <p className="type-body mb-4 text-muted-foreground max-w-prose">
        A feedback form with a select dropdown, textarea with minimum length,
        and an optional anonymous checkbox.
      </p>
      <ComponentPreview code={feedbackCode}>
        <FeedbackDemo />
      </ComponentPreview>

      {/* ── Using Hooks ───────────────────────────────────── */}
      <h2 className="type-heading-lg !font-semibold mt-8 mb-4 text-foreground">Using Hooks</h2>
      <p className="type-body mb-4 text-muted-foreground max-w-prose">
        The same login form rebuilt using{' '}
        <code className="type-code">useFormField</code> and{' '}
        <code className="type-code">useFormStatus</code> hooks. The result is
        identical but gives you full control over the field layout and submit
        button behavior.
      </p>
      <ComponentPreview code={hooksCode}>
        <HooksLoginDemo />
      </ComponentPreview>
    </Container>
  )
}
