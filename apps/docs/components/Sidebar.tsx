'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const FOUNDATION_ITEMS = [
  { label: 'Colors',        href: '/foundation/colors' },
  { label: 'Typography',    href: '/foundation/typography' },
  { label: 'Iconography',   href: '/foundation/iconography' },
  { label: 'Layout Tokens', href: '/foundation/layout-tokens' },
]

// Component items are placeholders — will expand as MDX content is added
const COMPONENT_ITEMS = [
  { label: 'Button',   href: '/components/button' },
  { label: 'Icon',     href: '/components/icon' },
  { label: 'Form',     href: '/components/form' },
  { label: 'Feedback', href: '/components/feedback' },
]

const SECTIONS = {
  foundation: { label: 'Foundation', items: FOUNDATION_ITEMS },
  components:  { label: 'Components', items: COMPONENT_ITEMS },
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()
  const section = pathname.startsWith('/components') ? SECTIONS.components : SECTIONS.foundation

  return (
    <>
      {/* Backdrop: mobile-only, shown when open */}
      <div
        className={`fixed inset-0 bg-black/35 z-[var(--docs-z-backdrop)] ${open ? 'block lg:hidden' : 'hidden'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/*
       * Sidebar:
       *   Desktop (lg+): always visible — lg:translate-x-0 overrides the mobile default
       *   Mobile: slides in from left when open, hidden behind viewport otherwise
       */}
      <nav
        id="docs-sidebar"
        className={`fixed top-[var(--docs-header-h)] left-0 bottom-0 w-[var(--docs-sidebar-w)] bg-surface border-r border-border overflow-y-auto z-[var(--docs-z-sidebar)] py-6 pb-8 flex flex-col transition-transform duration-[250ms] ease-in-out lg:translate-x-0 ${
          open
            ? 'translate-x-0 shadow-[4px_0_24px_rgba(0,0,0,0.08)]'
            : '-translate-x-full lg:shadow-none'
        }`}
        aria-label="Documentation navigation"
      >
        <div className="px-8">
          <span className="block font-sejong-bold text-md text-text-primary mb-3">
            {section.label}
          </span>
          {section.items.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-3 px-3 text-sm transition-colors 
                  font-sejong-bold rounded-md
                  duration-[120ms] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-[-2px] ${
                  isActive
                    ? 'text-text-primary'
                    : 'text-text-muted hover:bg-surface-subtle'
                }`}
                onClick={onClose}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
