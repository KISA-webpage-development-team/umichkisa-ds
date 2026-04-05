'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconButton } from '@umichkisa-ds/web'

/* ── Data types ──────────────────────────────────────────────────── */

interface SidebarCategory {
  label: string
  items: SidebarLink[]
}

interface SidebarLink {
  label: string
  href: string
}

type SectionKey = 'foundation' | 'components' | 'forms'

/* ── Navigation data ─────────────────────────────────────────────── */

const FOUNDATION_CATEGORIES: SidebarCategory[] = [
  {
    label: 'Colors',
    items: [
      { label: 'Overview',      href: '/foundation/colors/overview' },
      { label: 'Tokens',        href: '/foundation/colors/tokens' },
      { label: 'Usage',         href: '/foundation/colors/usage' },
      { label: 'Primitives',    href: '/foundation/colors/primitives' },
      { label: 'Accessibility', href: '/foundation/colors/accessibility' },
    ],
  },
  {
    label: 'Typography',
    items: [
      { label: 'Overview',   href: '/foundation/typography/overview' },
      { label: 'Fonts',      href: '/foundation/typography/fonts' },
      { label: 'Type Scale', href: '/foundation/typography/scale' },
      { label: 'Usage',      href: '/foundation/typography/usage' },
    ],
  },
  {
    label: 'Layout',
    items: [
      { label: 'Overview',     href: '/foundation/layout/overview' },
      { label: 'Breakpoints',  href: '/foundation/layout/breakpoints' },
      { label: 'Spacing',      href: '/foundation/layout/spacing' },
      { label: 'Usage',        href: '/foundation/layout/usage' },
    ],
  },
  {
    label: 'Iconography',
    items: [
      { label: 'Overview',      href: '/foundation/iconography/overview' },
      { label: 'Library',       href: '/foundation/iconography/library' },
      { label: 'Sizes',         href: '/foundation/iconography/sizes' },
      { label: 'Usage',         href: '/foundation/iconography/usage' },
      { label: 'Accessibility', href: '/foundation/iconography/accessibility' },
    ],
  },
]

const COMPONENT_CATEGORIES: SidebarCategory[] = [
  {
    label: 'Icon',
    items: [
      { label: 'Icon', href: '/components/icon' },
    ],
  },
  {
    label: 'Buttons',
    items: [
      { label: 'Button',     href: '/components/button' },
      { label: 'IconButton', href: '/components/icon-button' },
      { label: 'LinkButton', href: '/components/link-button' },
    ],
  },
  {
    label: 'Layout',
    items: [
      { label: 'Container', href: '/components/container' },
      { label: 'Divider',   href: '/components/divider' },
      { label: 'Grid',      href: '/components/grid' },
    ],
  },
  {
    label: 'Forms',
    items: [
      { label: 'Forms Overview', href: '/components/forms' },
      { label: 'Checkbox',       href: '/components/checkbox' },
      { label: 'FormItem',       href: '/components/form-item' },
      { label: 'Input',          href: '/components/input' },
      { label: 'Label',          href: '/components/label' },
      { label: 'Radio',          href: '/components/radio' },
      { label: 'Select',         href: '/components/select' },
      { label: 'Switch',         href: '/components/switch' },
      { label: 'Textarea',       href: '/components/textarea' },
    ],
  },
  {
    label: 'Data Display',
    items: [
      { label: 'Accordion', href: '/components/accordion' },
      { label: 'Avatar',    href: '/components/avatar' },
      { label: 'Badge',     href: '/components/badge' },
      { label: 'Card',      href: '/components/card' },
      { label: 'Table',     href: '/components/table' },
    ],
  },
  {
    label: 'Overlays',
    items: [
      { label: 'Dialog',   href: '/components/dialog' },
      { label: 'Dropdown', href: '/components/dropdown' },
      { label: 'Popover',  href: '/components/popover' },
      { label: 'Tooltip',  href: '/components/tooltip' },
    ],
  },
  {
    label: 'Navigation',
    items: [
      { label: 'Pagination',   href: '/components/pagination' },
      { label: 'Tabs',         href: '/components/tabs' },
      { label: 'ToggleGroup',  href: '/components/toggle-group' },
    ],
  },
  {
    label: 'Feedback',
    items: [
      { label: 'Alert',          href: '/components/alert' },
      { label: 'LoadingSpinner', href: '/components/loading-spinner' },
      { label: 'Skeleton',       href: '/components/skeleton' },
      { label: 'StatusView',     href: '/components/status-view' },
      { label: 'Toast',          href: '/components/toast' },
    ],
  },
  {
    label: 'Utilities',
    items: [
      { label: 'OnlyMobileView', href: '/components/only-mobile-view' },
    ],
  },
  {
    label: 'Date & Time',
    items: [
      { label: 'Calendar',   href: '/components/calendar' },
      { label: 'DatePicker', href: '/components/datepicker' },
    ],
  },
]

const FORMS_CATEGORIES: SidebarCategory[] = [
  {
    label: 'Forms',
    items: [
      { label: 'Overview',       href: '/forms/overview' },
      { label: 'useForm',        href: '/forms/use-form' },
      { label: 'Form Component', href: '/forms/form-component' },
      { label: 'Validation',     href: '/forms/validation' },
      { label: 'Hooks',          href: '/forms/hooks' },
      { label: 'Examples',       href: '/forms/examples' },
    ],
  },
]

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
          w-[var(--docs-sidebar-w)] bg-surface
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
        <div className="lg:hidden pl-14 pr-8 py-8 flex flex-col gap-4">
          {([
            { label: 'Foundation', href: '/foundation', prefix: '/foundation', key: 'foundation' as SectionKey },
            { label: 'Components', href: '/components', prefix: '/components', key: 'components' as SectionKey },
            { label: 'Forms', href: '/forms/overview', prefix: '/forms', key: 'forms' as SectionKey },
          ]).map((s, i) => {
            const isCurrent = pathname.startsWith(s.prefix)
            return (
              <div key={s.key}>
                <div className={`flex items-center ${i === 0 ? 'justify-between' : ''}`}>
                  <Link
                    href={s.href}
                    className={`inline-block w-fit py-1 px-2 rounded-sm
                      type-body !font-sejong-bold transition-colors duration-150
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
                      size="sm"
                      aria-label="Close navigation menu"
                      onClick={onClose}
                    />
                  )}
                </div>

                {/* Expand children for current section */}
                {isCurrent && (
                  <div className="ml-2 mt-2 flex flex-col gap-2">
                    {SECTIONS[s.key].flatMap((cat) => cat.items).map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`inline-block w-fit py-1 px-2 rounded-sm
                            type-body
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
