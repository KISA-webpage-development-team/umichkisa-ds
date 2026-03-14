interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ComponentPage({ params }: Props) {
  const { slug } = await params;
  return (
    <div>
      <h1>{slug}</h1>
      {/* TODO: Render component MDX from content/components/{slug}.mdx */}
    </div>
  );
}

// TODO: Replace with real slugs derived from content/components/*.mdx
export async function generateStaticParams() {
  // Placeholder — keeps static export happy until MDX content files exist
  return [{ slug: "_placeholder" }];
}
