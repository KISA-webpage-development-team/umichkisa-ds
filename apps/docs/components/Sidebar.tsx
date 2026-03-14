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

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Backdrop — mobile only, appears behind the open sidebar */}
      <div
        className="docs-backdrop"
        data-visible={String(open)}
        onClick={onClose}
        aria-hidden="true"
      />

      <nav
        id="docs-sidebar"
        className="docs-sidebar"
        data-open={String(open)}
        aria-label="Documentation navigation"
      >
        <div className="docs-nav-section">
          <span className="docs-nav-section-label">Foundation</span>
          {FOUNDATION_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="docs-nav-item"
              data-active={String(pathname === item.href)}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="docs-nav-section">
          <span className="docs-nav-section-label">Components</span>
          {COMPONENT_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="docs-nav-item"
              data-active={String(pathname === item.href)}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}
