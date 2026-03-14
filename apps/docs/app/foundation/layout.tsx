import { DocsLayout } from '@/components/DocsLayout'

export default function FoundationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DocsLayout>{children}</DocsLayout>
}
