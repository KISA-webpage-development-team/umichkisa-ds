import { createHighlighter, type Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light"],
      langs: ["tsx", "css", "bash", "json"],
    });
  }
  return highlighterPromise;
}

export type CodeLanguage = "tsx" | "css" | "bash" | "json" | "text";

export async function highlight(
  code: string,
  lang: CodeLanguage = "tsx"
): Promise<string> {
  if (lang === "text") {
    return code;
  }
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    theme: "github-light",
  });
}
