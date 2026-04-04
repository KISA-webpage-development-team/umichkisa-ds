'use client'

import { useState } from 'react'
import { Toaster, toast, Button } from '@umichkisa-ds/web'

type Position = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

const POSITIONS: Position[] = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']

export function ToastProvider() {
  return <Toaster />
}

export function BasicDemo() {
  return (
    <Button onClick={() => toast('Event has been created')}>
      Show toast
    </Button>
  )
}

export function VariantsDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" onClick={() => toast('A neutral notification')}>
        Default
      </Button>
      <Button variant="secondary" onClick={() => toast.info('This is an informational message')}>
        Info
      </Button>
      <Button onClick={() => toast.success('Action completed successfully')}>
        Success
      </Button>
      <Button variant="secondary" onClick={() => toast.warning('Please review before continuing')}>
        Warning
      </Button>
      <Button variant="destructive" onClick={() => toast.error('Something went wrong')}>
        Error
      </Button>
    </div>
  )
}

export function DescriptionDemo() {
  return (
    <Button onClick={() => toast('Event created', { description: 'Monday, January 3rd at 6:00 PM' })}>
      With description
    </Button>
  )
}

export function ActionDemo() {
  return (
    <Button onClick={() => toast('Event deleted', {
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo clicked'),
      },
    })}>
      With action
    </Button>
  )
}

export function PromiseDemo() {
  return (
    <Button onClick={() => {
      toast.promise(
        new Promise((resolve) => setTimeout(resolve, 2000)),
        {
          loading: 'Saving changes...',
          success: 'Changes saved successfully',
          error: 'Failed to save changes',
        }
      )
    }}>
      Save changes
    </Button>
  )
}

export function PositionDemo() {
  const [position, setPosition] = useState<Position>('top-center')

  return (
    <>
      <Toaster position={position} />
      <div className="w-full px-6 flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-2">
          {POSITIONS.map((pos) => (
            <Button
              key={pos}
              variant={position === pos ? 'primary' : 'secondary'}
              size="sm"
              className="w-full"
              onClick={() => {
                setPosition(pos)
                toast.dismiss()
                setTimeout(() => toast(`Position: ${pos}`), 100)
              }}
            >
              {pos}
            </Button>
          ))}
        </div>
        <p className="type-caption text-muted-foreground text-center">
          Current: <code className="rounded px-1 py-0.5 type-caption font-mono bg-surface-subtle text-foreground">{position}</code>.
          On mobile, toasts automatically switch to full-width at the top of the screen.
        </p>
      </div>
    </>
  )
}
