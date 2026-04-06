import { CodeBlockClient } from "./CodeBlockClient";

interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  highlightedCode?: string;
  lang?: string;
}

export function ComponentPreview({
  children,
  code,
  highlightedCode,
  lang = "tsx",
}: ComponentPreviewProps) {
  return (
    <div className="my-6">
      <div className="border border-border rounded-t-lg bg-surface p-8 flex items-center justify-center">
        {children}
      </div>
      <div className="border border-t-0 border-border rounded-b-lg bg-surface-subtle overflow-hidden">
        <CodeBlockClient
          code={code}
          highlightedHtml={highlightedCode || undefined}
        >
          {/* Fallback when no highlighted HTML provided */}
          {!highlightedCode && (
            <pre className="type-caption font-mono text-foreground px-4 py-4 whitespace-pre">
              <code>{code}</code>
            </pre>
          )}
        </CodeBlockClient>
      </div>
    </div>
  );
}
