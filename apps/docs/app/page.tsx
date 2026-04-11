import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Icon,
} from '@umichkisa-ds/web'
import type { IconName } from '@umichkisa-ds/web'
import { CodeBlock } from '@/components/CodeBlock'
import { Heading } from '@/components/Heading'
import Link from 'next/link'

const installCode = `npm install @umichkisa-ds/web
npm install @umichkisa-ds/form react-hook-form`

const sections: {
  title: string
  href: string
  icon: IconName
  description: string
  highlights: string[]
}[] = [
  {
    title: 'Foundation',
    href: '/foundation',
    icon: 'palette',
    description: 'The visual language underpinning every component.',
    highlights: ['Color tokens', 'Typography scale', 'Spacing system', 'Iconography'],
  },
  {
    title: 'Components',
    href: '/components',
    icon: 'blocks',
    description: 'Production-ready UI primitives.',
    highlights: ['35+ components', 'Buttons & forms', 'Overlays & navigation', 'Layout & display'],
  },
  {
    title: 'Forms',
    href: '/forms/overview',
    icon: 'text-cursor-input',
    description: 'DX layer for react-hook-form.',
    highlights: ['Compound components', 'Auto error wiring', 'Validation patterns', 'Hooks API'],
  },
]

export default async function HomePage() {
  return (
    <>
      {/* ── Full-bleed hero ─────────────────────────── */}
      <section className="w-full bg-brand-primary py-12">
        <Container size="md">
          <h1 className="type-display font-sejong-bold tracking-tight mb-4 text-brand-foreground">
            KISA Design System
          </h1>
          <p className="type-body text-brand-foreground max-w-prose">
            React components, design tokens, and form utilities for the KISA
            website. Built with accessibility, consistency, and composability in
            mind.
          </p>
        </Container>
      </section>

      {/* ── Content below hero ──────────────────────── */}
      <Container size="md" as="article" className="py-12">
        <Heading as="h2">Quick Install</Heading>
        <CodeBlock code={installCode} lang="bash" />

        <Heading as="h2" className="mt-8">Explore</Heading>
        <Grid columns={{ base: 1, md: 3 }} gap="component" className="mt-6">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="block h-full rounded-md focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2"
            >
              <Card hoverable className="h-full">
                <CardHeader>
                  <span className="text-brand-primary">
                    <Icon name={section.icon} size="lg" />
                  </span>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {section.highlights.map((h) => (
                      <li key={h} className="type-body-sm text-muted-foreground">
                        {h}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Grid>
      </Container>
    </>
  )
}
