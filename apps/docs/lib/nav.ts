/* ── Data types ──────────────────────────────────────────────────── */

export interface SidebarLink {
  label: string
  href: string
}

export interface SidebarCategory {
  label: string
  items: SidebarLink[]
}

/* ── Navigation data ─────────────────────────────────────────────── */

export const FOUNDATION_CATEGORIES: SidebarCategory[] = [
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

export const COMPONENT_CATEGORIES: SidebarCategory[] = [
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

export const FORMS_CATEGORIES: SidebarCategory[] = [
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

/* ── Section index pages (not listed in Sidebar as items, but part of the linear flow) ── */

const FOUNDATION_INDEX: SidebarLink = { label: 'Foundation', href: '/foundation' }
const COMPONENTS_INDEX: SidebarLink = { label: 'Components', href: '/components' }

/* ── Flat linear sequence across all three sections ──────────────── */

function flattenCategories(categories: SidebarCategory[]): SidebarLink[] {
  return categories.flatMap((c) => c.items)
}

export function flattenNav(): SidebarLink[] {
  return [
    FOUNDATION_INDEX,
    ...flattenCategories(FOUNDATION_CATEGORIES),
    COMPONENTS_INDEX,
    ...flattenCategories(COMPONENT_CATEGORIES),
    ...flattenCategories(FORMS_CATEGORIES),
  ]
}

/* ── Prev/next lookup ─────────────────────────────────────────────── */

export interface PrevNextResult {
  prev: SidebarLink | null
  next: SidebarLink | null
}

export function getPrevNext(pathname: string): PrevNextResult {
  const flat = flattenNav()
  const idx = flat.findIndex((link) => link.href === pathname)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  }
}
