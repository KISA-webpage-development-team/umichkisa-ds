import { highlight, type CodeLanguage } from "@/lib/highlight";
import { CodeBlockClient } from "./CodeBlockClient";

interface CodeBlockProps {
  code: string;
  lang?: CodeLanguage;
}

export async function CodeBlock({ code, lang = "tsx" }: CodeBlockProps) {
  const highlightedHtml = lang === "text" ? "" : await highlight(code, lang);

  return (
    <div className="my-6 border border-border rounded-md bg-surface-subtle overflow-hidden">
      <CodeBlockClient
        code={code}
        lang={lang}
        highlightedHtml={highlightedHtml || undefined}
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
