'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getPrevNext } from '@/lib/nav'

const LINK_CLASS =
  'type-body text-link hover:text-brand-primary hover:underline ' +
  'focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-brand-primary focus-visible:outline-offset-2 ' +
  'rounded-sm'

export function PrevNext() {
  const pathname = usePathname()
  const { prev, next } = getPrevNext(pathname)

  if (!prev && !next) return null

  const justify =
    prev && next ? 'justify-between' : next ? 'justify-end' : 'justify-start'

  return (
    <nav
      aria-label="Pagination navigation"
      className={`mt-16 flex ${justify} gap-4`}
    >
      {prev && (
        <Link href={prev.href} className={LINK_CLASS}>
          {prev.label}
        </Link>
      )}
      {next && (
        <Link href={next.href} className={LINK_CLASS}>
          {next.label}
        </Link>
      )}
    </nav>
  )
}
