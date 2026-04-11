import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  Icon,
} from '@umichkisa-ds/web'
import type { IconName } from '@umichkisa-ds/web'
import { CodeBlock } from '@/components/CodeBlock'
import { Heading } from '@/components/Heading'
import Link from 'next/link'

const installCode = `npm install @umichkisa-ds/web
npm install @umichkisa-ds/form react-hook-form`

const sections: { title: string; href: string; icon: IconName; description: string }[] = [
  {
    title: 'Foundation',
    href: '/foundation',
    icon: 'palette',
    description: 'Color tokens, typography scale, spacing system, and iconography standards.',
  },
  {
    title: 'Components',
    href: '/components',
    icon: 'blocks',
    description: '35+ production-ready UI primitives — buttons, form controls, overlays, layout, and more.',
  },
  {
    title: 'Forms',
    href: '/forms',
    icon: 'text-cursor-input',
    description: 'Form DX layer integrating react-hook-form with DS components.',
  },
]

export default async function HomePage() {
  return (
    <Container size="lg" as="article" className="py-12">
      <h1 className="type-display font-sejong-bold tracking-tight mb-4 text-foreground">
        KISA Design System
      </h1>
      <p className="type-body mb-8 text-foreground">
        React components, design tokens, and form utilities for the{' '}
        <a
          href="https://umich.edu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:underline hover:text-brand-primary"
        >
          University of Michigan
        </a>{' '}
        Korean International Student Association website. Built with
        accessibility, consistency, and composability in mind.
      </p>

      <Heading as="h2">Quick Install</Heading>
      <CodeBlock code={installCode} lang="bash" size="lg" />

      <Grid columns={{ base: 1, md: 3 }} gap="component" className="mt-8">
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="block h-full rounded-md focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2"
          >
            <Card hoverable className="h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-brand-primary">
                    <Icon name={section.icon} size="lg" />
                  </span>
                  <CardTitle className="!type-h2">{section.title}</CardTitle>
                </div>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </Grid>
    </Container>
  )
}
