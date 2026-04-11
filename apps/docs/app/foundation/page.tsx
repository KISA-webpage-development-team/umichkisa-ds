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
import Link from 'next/link'

const sections: { title: string; href: string; icon: IconName; description: string }[] = [
  {
    title: 'Colors',
    href: '/foundation/colors/overview',
    icon: 'palette',
    description: 'Color primitives, semantic tokens, and accessibility guidelines.',
  },
  {
    title: 'Typography',
    href: '/foundation/typography/overview',
    icon: 'type',
    description: 'Type scale, font families, and text usage patterns.',
  },
  {
    title: 'Layout',
    href: '/foundation/layout/overview',
    icon: 'layout-grid',
    description: 'Spacing system, breakpoints, and responsive layout guidance.',
  },
  {
    title: 'Iconography',
    href: '/foundation/iconography/overview',
    icon: 'image',
    description: 'Icon library, sizing conventions, and usage standards.',
  },
]

export default function FoundationPage() {
  return (
    <Container size="md" as="article">
      <h1 className="type-h1 font-sejong-bold tracking-tight mb-4 text-foreground">
        Foundation
      </h1>
      <p className="type-body mb-8 text-foreground max-w-prose">
        Design tokens and visual language that underpin every component in the
        KISA Design System.
      </p>

      <Grid columns={{ base: 1, md: 2 }} gap="component">
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="block h-full rounded-md focus-visible:outline-2 focus-visible:outline-focus-ring focus-visible:outline-offset-2"
          >
            <Card hoverable className="h-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon name={section.icon} size="md" />
                  <CardTitle>{section.title}</CardTitle>
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
