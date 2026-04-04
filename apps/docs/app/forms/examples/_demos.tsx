'use client'

import {
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

/* ══════════════════════════════════════════════════════════════
   Example 1: Login Form
   ══════════════════════════════════════════════════════════════ */

type LoginValues = { email: string; password: string }

export function LoginDemo() {
  const form = useForm<LoginValues>({
    defaultValues: { email: '', password: '' },
  })

  return (
    <Form
      form={form}
      onSubmit={(data) => alert(`Logged in as ${data.email}`)}
      className="w-full max-w-sm"
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

type ProfileValues = {
  name: string
  bio: string
  gradYear: string
  contact: string
  notifications: boolean
}

export function ProfileDemo() {
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
      className="w-full max-w-sm"
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
}

/* ══════════════════════════════════════════════════════════════
   Example 3: Feedback Form
   ══════════════════════════════════════════════════════════════ */

type FeedbackValues = {
  subject: string
  message: string
  anonymous: boolean
}

export function FeedbackDemo() {
  const form = useForm<FeedbackValues>({
    defaultValues: { subject: '', message: '', anonymous: false },
  })

  return (
    <Form
      form={form}
      onSubmit={(data) => alert(`Feedback sent about "${data.subject}"`)}
      className="w-full max-w-sm"
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

type HooksLoginValues = { email: string; password: string }

function HooksEmailField() {
  const { inputProps, error } = useFormField<HooksLoginValues>('email', {
    required: 'Email is required',
  })
  const { value, ...rest } = inputProps
  return (
    <FormItem htmlFor="hooks-email" label="Email" error={error} required>
      <Input id="hooks-email" type="email" placeholder="you@umich.edu" value={value as string} {...rest} />
    </FormItem>
  )
}

function HooksPasswordField() {
  const { inputProps, error } = useFormField<HooksLoginValues>('password', {
    required: 'Password is required',
    minLength: { value: 6, message: 'At least 6 characters' },
  })
  const { value, ...rest } = inputProps
  return (
    <FormItem htmlFor="hooks-password" label="Password" error={error} required>
      <Input id="hooks-password" type="password" value={value as string} {...rest} />
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

export function HooksLoginDemo() {
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
