"use client";

import { useState, useCallback } from "react";
import { IconButton } from "@umichkisa-ds/web";
import type { CodeBlockSize } from "./CodeBlock";

interface CodeBlockClientProps {
  code: string;
  highlightedHtml?: string;
  size?: CodeBlockSize;
  children?: React.ReactNode;
}

const sizeClassMap: Record<CodeBlockSize, string> = {
  default: "type-caption",
  md: "type-body-sm",
  lg: "type-body",
};

export function CodeBlockClient({
  code,
  highlightedHtml,
  size = "default",
  children,
}: CodeBlockClientProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="group relative">
      {/* Copy button */}
      <div className="absolute top-2 right-2 z-10 pointer-events-none bg-surface-subtle rounded-md">
        <IconButton
          icon={copied ? "clipboard-check" : "clipboard-copy"}
          size="sm"
          variant="tertiary"
          aria-label={copied ? "Copied" : "Copy code"}
          onClick={handleCopy}
          className="opacity-60 group-hover:opacity-100 transition-opacity pointer-events-auto"
        />
      </div>

      {/* Code content */}
      {highlightedHtml ? (
        <div
          className={`overflow-x-auto pr-16 ${sizeClassMap[size]} [&_pre]:font-mono [&_pre]:px-4 [&_pre]:py-4 [&_pre]:!bg-transparent [&_pre]:m-0 [&_code]:!bg-transparent`}
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <div className="overflow-x-auto pr-16">
          {children}
        </div>
      )}
    </div>
  );
}
