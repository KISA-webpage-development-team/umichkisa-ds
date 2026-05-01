/**
 * Pastiche cross-doc tag-sanity lint (spec §14.2).
 *
 * FACT.md is the single source of truth. This script verifies:
 *   - WISDOM.md: every [tag] resolves to a FACT atom or is the [GENERAL]
 *     allow-listed system-wide marker.
 *   - KNOWLEDGE.md: every PascalCase component code-span (incl. `Form.Foo`
 *     namespace) and every `--*` / `.type-*` / `.ds-*` token code-span
 *     resolves to a FACT atom.
 *
 * Tailwind-default and arbitrary utility code-spans in KNOWLEDGE are ignored
 * by design (spec §11 lightness; see `_handoff-to-3b.md` open issue on a
 * future `useTailwindV4` flag).
 *
 * Fails closed with a line-numbered error per offence.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const DOCS = path.join(REPO_ROOT, 'docs/pastiche');

const ALLOW_LISTED_TAGS = new Set(['GENERAL']);

export interface FactAtoms {
  components: Set<string>;
  tokens: Set<string>;
}

export interface LintViolation {
  file: string;
  line: number;
  message: string;
}

// ---------------------------------------------------------------------------
// FACT parsing
// ---------------------------------------------------------------------------

export function parseFact(text: string): FactAtoms {
  const components = new Set<string>();
  const tokens = new Set<string>();
  let inTokens = false;
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (line.startsWith('## Tokens')) { inTokens = true; continue; }
    if (line.startsWith('## ') && !line.startsWith('## Tokens')) inTokens = false;
    const compMatch = line.match(/^### \[([^\]]+)\]/);
    if (compMatch) { components.add(compMatch[1]); continue; }
    if (inTokens) {
      const tokMatch = line.match(/^- (\S+)/);
      if (tokMatch) tokens.add(tokMatch[1]);
    }
  }
  return { components, tokens };
}

// ---------------------------------------------------------------------------
// WISDOM check
// ---------------------------------------------------------------------------

export function lintWisdom(text: string, fact: FactAtoms, file = 'WISDOM.md'): LintViolation[] {
  const violations: LintViolation[] = [];
  const valid = new Set([...fact.components, ...fact.tokens]);
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('<!--')) continue; // skip preamble comments
    // Strip backtick code-spans first — bracket-shaped Tailwind arbitrary
    // values like `px-[24px]` are prose, not tags.
    const stripped = line.replace(/`[^`]*`/g, '');
    // Match [Foo], [--color-bar], [.type-baz]; allow concatenated [A][B][C].
    const tagRegex = /\[([A-Za-z0-9_.\-]+)\]/g;
    let m: RegExpExecArray | null;
    while ((m = tagRegex.exec(stripped)) !== null) {
      const tag = m[1];
      if (ALLOW_LISTED_TAGS.has(tag)) continue;
      if (!valid.has(tag)) {
        violations.push({
          file,
          line: i + 1,
          message: `unknown tag [${tag}] — not in FACT.md`,
        });
      }
    }
  }
  return violations;
}

// ---------------------------------------------------------------------------
// KNOWLEDGE check
// ---------------------------------------------------------------------------

const COMPONENT_HEAD = /^([A-Z][A-Za-z0-9]*(?:\.[A-Z][A-Za-z0-9]*)?)\b/;
const TOKEN_SHAPE = /^(--[A-Za-z0-9-]+|\.(?:type|ds)-[A-Za-z0-9-]+)$/;

export function lintKnowledge(text: string, fact: FactAtoms, file = 'KNOWLEDGE.md'): LintViolation[] {
  const violations: LintViolation[] = [];
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('<!--')) continue;
    const codeSpanRegex = /`([^`]+)`/g;
    let m: RegExpExecArray | null;
    while ((m = codeSpanRegex.exec(line)) !== null) {
      const span = m[1].trim();
      // Token shape — must resolve verbatim.
      if (TOKEN_SHAPE.test(span)) {
        if (!fact.tokens.has(span)) {
          violations.push({
            file,
            line: i + 1,
            message: `unknown token \`${span}\` — not in FACT.md`,
          });
        }
        continue;
      }
      // Component shape — first PascalCase head (incl. `Form.Foo`) must resolve.
      const head = span.match(COMPONENT_HEAD);
      if (head) {
        const name = head[1];
        if (!fact.components.has(name)) {
          violations.push({
            file,
            line: i + 1,
            message: `unknown component \`${name}\` (in \`${span}\`) — not in FACT.md`,
          });
        }
      }
      // Anything else (Tailwind utilities, JSX prop strings, raw HTML) is
      // out of scope for v1 — silently ignored.
    }
  }
  return violations;
}

// ---------------------------------------------------------------------------
// CLI entry
// ---------------------------------------------------------------------------

function main(): void {
  const fact = parseFact(fs.readFileSync(path.join(DOCS, 'FACT.md'), 'utf8'));
  const wisdom = fs.readFileSync(path.join(DOCS, 'WISDOM.md'), 'utf8');
  const knowledge = fs.readFileSync(path.join(DOCS, 'KNOWLEDGE.md'), 'utf8');

  const violations = [
    ...lintWisdom(wisdom, fact),
    ...lintKnowledge(knowledge, fact),
  ];

  if (violations.length === 0) {
    console.log(`pastiche:lint OK — FACT atoms: ${fact.components.size} components, ${fact.tokens.size} tokens.`);
    return;
  }

  for (const v of violations) {
    console.error(`${v.file}:${v.line} ${v.message}`);
  }
  console.error(`\npastiche:lint FAILED — ${violations.length} violation(s).`);
  process.exit(1);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
