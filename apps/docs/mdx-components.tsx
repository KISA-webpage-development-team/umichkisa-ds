import type { MDXComponents } from "mdx/types"
import { Callout } from "@/components/Callout"
import { ColorSwatch } from "@/components/ColorSwatch"
import { ColorSwatchGrid } from "@/components/ColorSwatchGrid"
import { ContrastTable } from "@/components/ContrastTable"
import { DoDont, Do, Dont } from "@/components/DoDont"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings
    h1: ({ children }) => (
      <h1
        style={{ color: "var(--color-foreground)" }}
        className="text-3xl font-bold mt-8 mb-4"
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        style={{ color: "var(--color-foreground)" }}
        className="text-2xl font-semibold mt-10 mb-4"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{ color: "var(--color-foreground)" }}
        className="text-base font-semibold mt-6 mb-2"
      >
        {children}
      </h3>
    ),

    // Paragraph
    p: ({ children }) => (
      <p
        style={{ color: "var(--color-foreground)" }}
        className="mb-4 leading-7"
      >
        {children}
      </p>
    ),

    // Blockquote
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeftColor: "var(--color-brand-accent)",
          backgroundColor: "var(--color-surface-subtle)",
        }}
        className="border-l-[3px] pl-4 py-2 my-4 rounded-r"
      >
        <span
          style={{ color: "var(--color-muted-foreground)" }}
          className="italic block"
        >
          {children}
        </span>
      </blockquote>
    ),

    // Lists
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>
    ),
    li: ({ children }) => (
      <li
        style={{ color: "var(--color-foreground)" }}
        className="leading-7"
      >
        {children}
      </li>
    ),

    // Horizontal rule
    hr: () => (
      <hr
        style={{ borderTopColor: "var(--color-border)" }}
        className="my-8 border-0 border-t"
      />
    ),

    // Inline elements
    strong: ({ children }) => (
      <strong
        style={{ color: "var(--color-foreground)" }}
        className="font-semibold"
      >
        {children}
      </strong>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        style={{ color: "var(--color-link)" }}
        className="underline-offset-2 hover:underline"
        {...props}
      >
        {children}
      </a>
    ),

    // Code — inline only (block code is handled by rehype-pretty-code via pre)
    code: ({ children, className, ...props }) => {
      // rehype-pretty-code sets a className on block code; skip inline styling for those
      if (className) {
        return <code className={className} {...props}>{children}</code>
      }
      return (
        <code
          style={{
            backgroundColor: "var(--color-surface-subtle)",
            color: "var(--color-foreground)",
          }}
          className="rounded px-1.5 py-0.5 text-[0.875em] font-mono"
          {...props}
        >
          {children}
        </code>
      )
    },
    pre: ({ children, ...props }) => (
      <pre className="overflow-x-auto max-w-full" {...props}>{children}</pre>
    ),

    // Table
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto">
        <table
          style={{ borderColor: "var(--color-border)" }}
          className="w-full border-collapse text-sm border"
        >
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead
        style={{ backgroundColor: "var(--color-surface-subtle)" }}
      >
        {children}
      </thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr
        style={{ borderBottomColor: "var(--color-border)" }}
        className="border-b"
      >
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th
        style={{
          color: "var(--color-muted-foreground)",
          borderBottomColor: "var(--color-border)",
        }}
        className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide border-b"
      >
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td
        style={{ color: "var(--color-foreground)" }}
        className="px-4 py-3"
      >
        {children}
      </td>
    ),

    // Custom doc components — available in all MDX without explicit import
    Callout,
    ColorSwatch,
    ColorSwatchGrid,
    ContrastTable,
    DoDont,
    Do,
    Dont,
    ...components,
  }
}
