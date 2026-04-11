import type { Metadata } from 'next'
import { DocsLayout } from '@/components/DocsLayout'

export const metadata: Metadata = {
  title: 'Components',
  description:
    'Accessible, token-driven UI components for building KISA product surfaces.',
}

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DocsLayout>{children}</DocsLayout>
}
