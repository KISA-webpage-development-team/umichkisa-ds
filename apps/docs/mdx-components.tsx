import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // TODO: Replace with @umichkisa-ds/web components when design is ready
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    p: ({ children }) => <p>{children}</p>,
    code: ({ children, ...props }) => <code {...props}>{children}</code>,
    pre: ({ children, ...props }) => <pre {...props}>{children}</pre>,
    ...components,
  };
}
