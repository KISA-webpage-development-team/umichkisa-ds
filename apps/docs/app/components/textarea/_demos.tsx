'use client'

import { useState } from 'react'
import { Textarea } from '@umichkisa-ds/web'

export function ControlledDemo() {
  const [value, setValue] = useState('')

  return (
    <div className="w-full max-w-sm flex flex-col gap-2">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
        maxLength={200}
      />
      <p className="type-caption text-muted-foreground">{value.length}/200</p>
    </div>
  )
}
