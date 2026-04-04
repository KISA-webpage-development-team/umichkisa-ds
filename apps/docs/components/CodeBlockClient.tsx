"use client";

import { useState, useCallback } from "react";
import { IconButton } from "@umichkisa-ds/web";

interface CodeBlockClientProps {
  code: string;
  lang?: string;
  highlightedHtml?: string;
  children?: React.ReactNode;
}

export function CodeBlockClient({
  code,
  lang,
  highlightedHtml,
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
      {/* Language label + copy button */}
      <div className="sticky top-0 right-0 float-right flex items-center gap-2 pr-3 pt-3 z-10">
        {lang && lang !== "text" && (
          <span className="type-caption font-mono text-muted-foreground select-none">
            {lang}
          </span>
        )}
        <IconButton
          icon={copied ? "clipboard-check" : "clipboard-copy"}
          size="sm"
          variant="tertiary"
          aria-label={copied ? "Copied" : "Copy code"}
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>

      {/* Code content */}
      {highlightedHtml ? (
        <div
          className="overflow-x-auto [&_pre]:type-caption [&_pre]:font-mono [&_pre]:px-4 [&_pre]:py-4 [&_pre]:!bg-transparent [&_pre]:m-0 [&_code]:!bg-transparent"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <div className="overflow-x-auto">
          {children}
        </div>
      )}
    </div>
  );
}
