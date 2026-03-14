import { DocsLayout } from '@/components/DocsLayout'

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DocsLayout>{children}</DocsLayout>
}
