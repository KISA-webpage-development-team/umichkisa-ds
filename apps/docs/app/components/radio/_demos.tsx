'use client'

import { useState } from 'react'
import { RadioGroup, RadioItem } from '@umichkisa-ds/web'

export function ControlledDemo() {
  const [fruit, setFruit] = useState('banana')

  return (
    <div className="flex flex-col gap-2">
      <RadioGroup value={fruit} onValueChange={setFruit}>
        <RadioItem value="apple" text="Apple" />
        <RadioItem value="banana" text="Banana" />
        <RadioItem value="cherry" text="Cherry" />
      </RadioGroup>
      <p className="type-caption text-muted-foreground">You picked: {fruit}</p>
    </div>
  )
}
