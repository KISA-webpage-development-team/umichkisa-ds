'use client'

import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()
  const hasSidebar =
    pathname.startsWith('/foundation') ||
    pathname.startsWith('/components') ||
    pathname.startsWith('/forms')

  return (
    <footer
      className={`mt-16 py-8 px-6 lg:px-12 text-center ${hasSidebar ? 'lg:ml-[var(--docs-sidebar-w)]' : ''}`}
    >
      <p className="type-caption text-muted-foreground">
        KISA Design System · ©{' '}
        {new Date().getFullYear()}{' '}
        <a
          href="https://github.com/retz8"
          className="text-link hover:text-brand-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jioh In
        </a>
      </p>
    </footer>
  )
}
