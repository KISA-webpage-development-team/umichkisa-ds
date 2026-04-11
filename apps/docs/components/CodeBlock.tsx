import { highlight, type CodeLanguage } from "@/lib/highlight";
import { CodeBlockClient } from "./CodeBlockClient";

export type CodeBlockSize = "default" | "md" | "lg";

interface CodeBlockProps {
  code: string;
  lang?: CodeLanguage;
  /** Font size for the code content. Default: "default" (type-caption / 12px). */
  size?: CodeBlockSize;
}

export async function CodeBlock({
  code,
  lang = "tsx",
  size = "default",
}: CodeBlockProps) {
  const highlightedHtml = lang === "text" ? "" : await highlight(code, lang);

  return (
    <div className="my-6 border border-border rounded-md bg-surface-subtle overflow-hidden">
      <CodeBlockClient
        code={code}
        highlightedHtml={highlightedHtml || undefined}
        size={size}
      >
        {/* Fallback for lang="text" */}
        {lang === "text" && (
          <pre className="type-caption font-mono text-foreground px-4 py-4 whitespace-pre">
            <code>{code}</code>
          </pre>
        )}
      </CodeBlockClient>
    </div>
  );
}
