'use client'

import { useState } from 'react'
import { Icon } from '@umichkisa-ds/web'
import { ComponentPreview } from '@/components/ComponentPreview'

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl']

export function SizesExample() {
  const [size, setSize] = useState<Size>('md')

  const code = `import { Icon } from '@umichkisa-ds/web'

<Icon name="arrow-right" size="${size}" />`

  return (
    <div>
      <div className="flex gap-2 mb-3">
        {SIZES.map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={`px-3 py-1.5 rounded-md type-caption font-mono transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring)] focus-visible:shadow-[0_0_0_4px_var(--color-brand-primary)] ${
              size === s
                ? 'bg-brand-primary text-brand-foreground'
                : 'bg-surface-subtle text-muted-foreground hover:text-foreground'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <p className="type-caption text-muted-foreground mb-4">
        xs = 12px · sm = 16px · md = 20px · lg = 24px · xl = 32px
      </p>
      <ComponentPreview code={code}>
        <Icon name="arrow-right" size={size} />
      </ComponentPreview>
    </div>
  )
}
