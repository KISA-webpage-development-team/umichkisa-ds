import type { Metadata } from 'next'
import { DocsLayout } from '@/components/DocsLayout'

export const metadata: Metadata = {
  title: 'Forms',
  description:
    'Form DX layer wrapping react-hook-form with KISA Design System components.',
}

export default function FormsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DocsLayout>{children}</DocsLayout>
}
