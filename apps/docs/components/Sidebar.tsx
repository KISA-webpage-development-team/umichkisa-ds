'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconButton } from '@umichkisa-ds/web'
import {
  FOUNDATION_CATEGORIES,
  COMPONENT_CATEGORIES,
  FORMS_CATEGORIES,
  type SidebarCategory,
} from '@/lib/nav'

type SectionKey = 'foundation' | 'components' | 'forms'

const SECTIONS: Record<SectionKey, SidebarCategory[]> = {
  foundation: FOUNDATION_CATEGORIES,
  components: COMPONENT_CATEGORIES,
  forms: FORMS_CATEGORIES,
}

const ALL_CATEGORIES: SidebarCategory[] = [
  ...FOUNDATION_CATEGORIES,
  ...COMPONENT_CATEGORIES,
  ...FORMS_CATEGORIES,
]

/* ── Helpers ─────────────────────────────────────────────────────── */

function getSectionKey(pathname: string): SectionKey | null {
  if (pathname.startsWith('/foundation')) return 'foundation'
  if (pathname.startsWith('/components')) return 'components'
  if (pathname.startsWith('/forms')) return 'forms'
  return null
}

/* ── Component ───────────────────────────────────────────────────── */

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()
  const sectionKey = getSectionKey(pathname)

  // Section pages: show that section's categories
  // Other pages (homepage): show all sections for mobile nav
  const categories = sectionKey
    ? SECTIONS[sectionKey]
    : ALL_CATEGORIES

  // Desktop: only visible on section pages
  const desktopVisibility = sectionKey ? 'lg:translate-x-0' : ''

  return (
    <>
      {/* Backdrop: mobile-only */}
      <div
        className={`fixed inset-0 bg-overlay z-[var(--docs-z-backdrop)] transition-opacity duration-200 ${
          open ? 'opacity-100 lg:hidden' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <nav
        id="docs-sidebar"
        className={`fixed top-[var(--docs-header-h)] left-0 bottom-0
          w-full lg:w-[var(--docs-sidebar-w)] bg-surface
          after:absolute after:right-0 after:top-8 after:bottom-8
          after:w-px after:bg-border
          overflow-y-auto scrollbar-hidden
          z-[var(--docs-z-sidebar)]
          flex flex-col
          transition-transform duration-200 ease-in-out
          ${desktopVisibility}
          ${open ? 'translate-x-0 shadow-lg' : '-translate-x-full lg:shadow-none'}`}
        aria-label="Documentation navigation"
      >
        {/* Mobile nav: section headings with current section expanded */}
        <div className="lg:hidden px-8 py-8 flex flex-col gap-5">
          {([
            { label: 'Foundation', href: '/foundation', prefix: '/foundation', key: 'foundation' as SectionKey },
            { label: 'Components', href: '/components', prefix: '/components', key: 'components' as SectionKey },
            { label: 'Forms', href: '/forms', prefix: '/forms', key: 'forms' as SectionKey },
          ]).map((s, i) => {
            const isCurrent = pathname.startsWith(s.prefix)
            return (
              <div key={s.key}>
                <div className={`flex items-center ${i === 0 ? 'justify-between' : ''}`}>
                  <Link
                    href={s.href}
                    className={`inline-block w-fit py-2 px-3 rounded-sm
                      type-heading !font-sejong-bold transition-colors duration-150
                      ${isCurrent
                        ? 'text-brand-primary !font-semibold'
                        : 'text-foreground hover:text-brand-primary'
                      }`}
                    onClick={isCurrent ? undefined : onClose}
                  >
                    {s.label}
                  </Link>
                  {i === 0 && (
                    <IconButton
                      icon="x"
                      variant="tertiary"
                      size="md"
                      aria-label="Close navigation menu"
                      onClick={onClose}
                    />
                  )}
                </div>

                {/* Expand children for current section */}
                {isCurrent && (
                  <div className="ml-3 mt-3 flex flex-col gap-5">
                    {SECTIONS[s.key].map((cat, catIdx) => (
                      <div key={`${catIdx}-${cat.label}`}>
                        <span className="block type-body-lg !font-sejong-bold text-foreground mb-2 px-3">
                          {cat.label}
                        </span>
                        <div className="ml-2 flex flex-col gap-1">
                          {cat.items.map((item) => {
                            const isActive = pathname === item.href
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={`inline-block w-fit py-2 px-3 rounded-sm
                                  type-body-lg
                                  transition-colors duration-150
                                  ${isActive
                                    ? 'text-brand-primary bg-brand-accent-subtle !font-semibold'
                                    : 'text-foreground hover:bg-brand-accent-subtle'
                                  }`}
                                onClick={onClose}
                              >
                                {item.label}
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Desktop nav: current section categories only */}
        <div className="hidden lg:flex pl-14 pr-8 py-8 flex-col gap-6">
          {categories.map((category, idx) => (
            <div key={`${idx}-${category.label}`}>
              {/* Category heading — non-interactive */}
              <span className="block type-body-sm !font-sejong-bold text-foreground mb-2 px-2">
                {category.label}
              </span>

              {/* Nav links — indented under heading */}
              <div className="ml-2 flex flex-col gap-2">
                {category.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`inline-block w-fit py-1 px-2 rounded-sm
                        type-body-sm
                        transition-colors duration-150
                        focus-visible:outline focus-visible:outline-2
                        focus-visible:outline-brand-primary focus-visible:outline-offset-[-2px]
                        ${isActive
                          ? 'text-brand-primary bg-brand-accent-subtle !font-semibold'
                          : 'text-foreground hover:bg-brand-accent-subtle'
                        }`}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </>
  )
}
