import type { Metadata } from 'next'
import { DocsLayout } from '@/components/DocsLayout'

export const metadata: Metadata = {
  title: 'Foundation',
  description:
    'Design tokens, typography, colors, spacing, and layout primitives that underpin the KISA Design System.',
}

export default function FoundationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DocsLayout>{children}</DocsLayout>
}
