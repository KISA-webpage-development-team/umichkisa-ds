import { DocsLayout } from '@/components/DocsLayout'

export default function FormsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DocsLayout>{children}</DocsLayout>
}
