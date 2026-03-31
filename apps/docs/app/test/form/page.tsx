'use client'

import { useState } from 'react'
import {
  Label,
  Input,
  Textarea,
  Checkbox,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  RadioGroup,
  RadioItem,
  Switch,
  FormItem,
} from '@umichkisa-ds/web'

export default function FormTestPage() {
  const [role, setRole] = useState('')

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 min-w-0 overflow-hidden">
      <h1 className="type-h1 font-sejong-bold tracking-tight mt-8 mb-4 text-foreground">
        Form UI Review
      </h1>
      <p className="type-body mb-8 text-muted-foreground max-w-prose">
        All form components composed together for visual review.
      </p>

      <div className="flex flex-col gap-4 max-w-md">
        {/* FormItem + Input — required text field */}
        <FormItem htmlFor="name" label="Full name" required>
          <Input id="name" placeholder="Enter your full name" />
        </FormItem>

        {/* FormItem + Input — email with description */}
        <FormItem
          htmlFor="email"
          label="Email"
          description="We'll never share your email with anyone."
        >
          <Input id="email" type="email" placeholder="you@example.com" />
        </FormItem>

        {/* FormItem + Input — error state */}
        <FormItem
          htmlFor="username"
          label="Username"
          required
          error="This username is already taken."
        >
          <Input id="username" placeholder="Choose a username" invalid />
        </FormItem>

        {/* FormItem + Textarea */}
        <FormItem
          htmlFor="bio"
          label="Bio"
          description="Tell us about yourself in a few sentences."
        >
          <Textarea id="bio" placeholder="Write something..." />
        </FormItem>

        {/* FormItem + Select */}
        <FormItem htmlFor="role" label="Role" required>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger placeholder="Select a role" />
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>

        {/* Checkbox with text */}
        <Checkbox text="I agree to the terms and conditions" />

        {/* RadioGroup */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact">Preferred contact method</Label>
          <RadioGroup>
            <RadioItem value="email" text="Email" />
            <RadioItem value="phone" text="Phone" />
            <RadioItem value="mail" text="Mail" />
          </RadioGroup>
        </div>

        {/* Switch with text — default size */}
        <Switch text="Email notifications" />

        {/* Switch with text — sm size */}
        <Switch size="sm" text="SMS alerts" />
      </div>
    </article>
  )
}
