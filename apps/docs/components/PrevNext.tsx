'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getPrevNext } from '@/lib/nav'

export function PrevNext() {
  const pathname = usePathname()
  const { prev, next } = getPrevNext(pathname)

  if (!prev && !next) return null

  const justify =
    prev && next ? 'justify-between' : next ? 'justify-end' : 'justify-start'

  const linkClass =
    'type-body text-link hover:text-brand-primary hover:underline ' +
    'focus-visible:outline focus-visible:outline-2 ' +
    'focus-visible:outline-brand-primary focus-visible:outline-offset-2 ' +
    'rounded-sm'

  return (
    <nav
      aria-label="Pagination navigation"
      className={`mt-16 flex ${justify} gap-4`}
    >
      {prev && (
        <Link href={prev.href} className={linkClass}>
          {prev.label}
        </Link>
      )}
      {next && (
        <Link href={next.href} className={linkClass}>
          {next.label}
        </Link>
      )}
    </nav>
  )
}
