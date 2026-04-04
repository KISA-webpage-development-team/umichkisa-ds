'use client'

import { useState } from 'react'
import { Checkbox } from '@umichkisa-ds/web'

export function ControlledDemo() {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <Checkbox
        text="I agree to the terms"
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
      />
      <p className="type-caption text-muted-foreground">{agreed ? 'Accepted' : 'Not accepted'}</p>
    </div>
  )
}
