/**
 * compile-design.ts — KISA DS DESIGN.md compiler.
 *
 * Spec: docs/refactor/A4-design-compile.md.
 * Reads:
 *   - packages/web/src/styles/index.css   (semantic @theme + @layer ds-components .type-*)
 *   - packages/web/src/tokens/primitives.css (one level of var() resolution only)
 *   - packages/web/package.json            (KISA package version, stamped into Overview)
 * Writes:
 *   - /DESIGN.md at the monorepo root.
 *
 * Throws on: var() chains > 1 deep, missing typography classes, template
 * placeholder failures, OKLCH parse errors. Lint gate (C1.4) wraps this
 * script.
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss, { type Declaration, type AtRule, type Rule } from 'postcss';
import { converter, parse as parseColor, formatHex } from 'culori';

// ─── Paths ─────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_DIR = resolve(__dirname, '..');                       // packages/web
const REPO_ROOT = resolve(PKG_DIR, '..', '..');                 // monorepo root
const INDEX_CSS = join(PKG_DIR, 'src/styles/index.css');
const PRIMITIVES_CSS = join(PKG_DIR, 'src/tokens/primitives.css');
const PKG_JSON = join(PKG_DIR, 'package.json');
const TEMPLATES_DIR = join(__dirname, 'templates');
const OUTPUT = join(REPO_ROOT, 'DESIGN.md');

// ─── Hard-coded values from A4 D4 (no DS source token) ────────────────

const SPACING_LAYOUT_TIERS: Record<string, string> = {
  element: '8px',
  component: '16px',
  section: '24px',
};

const ROUNDED_TIERS: Record<string, string> = {
  md: '8px',
  lg: '12px',
  full: '9999px',
};

// ─── Token slots emitted to DESIGN.md (locked enumeration) ────────────

const COLOR_KEYS = [
  'brand-primary', 'brand-primary-mid', 'brand-primary-hover', 'brand-primary-pressed',
  'brand-accent', 'brand-accent-subtle', 'brand-accent-hover', 'brand-accent-pressed',
  'brand-foreground', 'focus-ring',
  'surface', 'surface-muted', 'surface-subtle',
  'border', 'border-strong',
  'foreground', 'muted-foreground', 'disabled-foreground', 'link',
  'error', 'error-hover', 'error-pressed', 'error-subtle', 'error-foreground',
  'success', 'success-subtle',
  'warning', 'warning-subtle',
  'info', 'info-subtle',
  'overlay',
];

const TYPOGRAPHY_KEYS = [
  'display', 'h1', 'h2', 'h3', 'h4', 'body', 'body-sm', 'label', 'caption', 'code',
];

const ICON_KEYS = ['icon-xs', 'icon-sm', 'icon-md', 'icon-lg', 'icon-xl'];

// ─── PostCSS parsing ──────────────────────────────────────────────────

interface Tokens {
  primitives: Record<string, string>;
  semantic: Record<string, string>;
  fontFamilies: Record<string, string>;
  iconSizes: Record<string, string>;
}

function readTokens(): Tokens {
  const primitives: Record<string, string> = {};
  const semantic: Record<string, string> = {};
  const fontFamilies: Record<string, string> = {};
  const iconSizes: Record<string, string> = {};

  // Primitives — :root { --primitive-* }
  const primAst = postcss.parse(readFileSync(PRIMITIVES_CSS, 'utf8'));
  primAst.walkRules((rule: Rule) => {
    if (rule.selector !== ':root') return;
    rule.walkDecls((decl: Declaration) => {
      if (decl.prop.startsWith('--primitive-')) {
        primitives[decl.prop] = decl.value.trim();
      }
    });
  });

  // index.css — @theme block carries --color-*, --icon-*, --font-*
  const idxAst = postcss.parse(readFileSync(INDEX_CSS, 'utf8'));
  idxAst.walkAtRules('theme', (atRule: AtRule) => {
    atRule.walkDecls((decl: Declaration) => {
      const v = decl.value.trim();
      if (decl.prop.startsWith('--color-')) {
        semantic[decl.prop] = v;
      } else if (decl.prop.startsWith('--icon-')) {
        iconSizes[decl.prop] = v;
      } else if (decl.prop.startsWith('--font-')) {
        fontFamilies[decl.prop] = v;
      }
    });
  });

  return { primitives, semantic, fontFamilies, iconSizes };
}

// ─── var() resolution (depth ≤ 1) ─────────────────────────────────────

const VAR_RE = /^var\((--[A-Za-z0-9-]+)\)$/;

function resolveVar(value: string, primitives: Record<string, string>, depth = 0): string {
  const m = value.match(VAR_RE);
  if (!m) return value;
  if (depth > 0) {
    throw new Error(`var() indirection deeper than 1 level: ${value}`);
  }
  const target = m[1];
  const next = primitives[target];
  if (next === undefined) {
    throw new Error(`Unresolved var(): ${value} (target ${target} not found in primitives)`);
  }
  return resolveVar(next, primitives, depth + 1);
}

// ─── OKLCH → sRGB hex (drops alpha) ──────────────────────────────────

const toRgb = converter('rgb');

function oklchToHex(value: string): string {
  // Accept oklch(...) or already-hex passthrough (defensive).
  if (value.startsWith('#')) return value.toLowerCase();
  const parsed = parseColor(value);
  if (!parsed) {
    throw new Error(`culori failed to parse color: ${value}`);
  }
  // Drop alpha by re-converting through rgb without the alpha channel.
  const rgb = toRgb(parsed);
  if (!rgb) {
    throw new Error(`culori failed to convert to rgb: ${value}`);
  }
  // formatHex emits 6-digit hex; alpha is discarded.
  const hex = formatHex({ ...rgb, alpha: undefined });
  if (!hex) throw new Error(`formatHex returned null for: ${value}`);
  return hex.toLowerCase();
}

// ─── Typography extraction ────────────────────────────────────────────

interface TypographySlot {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: string | number;
  letterSpacing?: string;
}

function readTypography(fontFamilies: Record<string, string>): Record<string, TypographySlot> {
  const out: Record<string, TypographySlot> = {};
  // Use accumulators; we need to take the LARGEST breakpoint's font-size.
  // Strategy: walk all rules in @layer ds-components (base) and inside
  // @media rules. Track each .type-* slot's properties; for fontSize,
  // overwrite as we encounter larger media-query min-widths.
  const fontSizeBreakpoint: Record<string, number> = {};      // tracks largest min-width seen for each slot's fontSize

  const ast = postcss.parse(readFileSync(INDEX_CSS, 'utf8'));

  function processRule(rule: Rule, mediaMinWidth: number) {
    const selector = rule.selector.trim();
    if (!selector.startsWith('.type-')) return;
    const slot = selector.slice('.type-'.length);
    const cur = (out[slot] ??= {
      fontFamily: '',
      fontSize: '',
      fontWeight: 400,
      lineHeight: 1,
    });
    rule.walkDecls((decl: Declaration) => {
      const v = decl.value.trim();
      switch (decl.prop) {
        case 'font-family':
          cur.fontFamily = resolveFontFamily(v, fontFamilies);
          break;
        case 'font-size':
          if ((fontSizeBreakpoint[slot] ?? -1) <= mediaMinWidth) {
            cur.fontSize = remToPx(v);
            fontSizeBreakpoint[slot] = mediaMinWidth;
          }
          break;
        case 'font-weight':
          cur.fontWeight = Number(v);
          break;
        case 'line-height':
          cur.lineHeight = isNaN(Number(v)) ? v : Number(v);
          break;
        case 'letter-spacing':
          cur.letterSpacing = v;
          break;
      }
    });
  }

  ast.walkAtRules('layer', (layer: AtRule) => {
    if (layer.params.trim() !== 'ds-components') return;
    layer.walkRules((rule) => processRule(rule, 0));
  });

  ast.walkAtRules('media', (media: AtRule) => {
    const m = media.params.match(/min-width:\s*(\d+)px/);
    const minWidth = m ? Number(m[1]) : 0;
    media.walkRules((rule) => processRule(rule, minWidth));
  });

  // Synthesize typography.code from --font-geist-mono.
  const geist = fontFamilies['--font-geist-mono'];
  if (!geist) throw new Error('Missing --font-geist-mono in @theme');
  out.code = {
    fontFamily: stripFontStack(geist),
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.5,
  };

  return out;
}

function resolveFontFamily(value: string, fontFamilies: Record<string, string>): string {
  const m = value.match(VAR_RE);
  if (m) {
    const stack = fontFamilies[m[1]];
    if (!stack) throw new Error(`Font family var unresolved: ${value}`);
    return stripFontStack(stack);
  }
  return stripFontStack(value);
}

function stripFontStack(stack: string): string {
  // Take the first family in the stack, strip surrounding quotes.
  const first = stack.split(',')[0].trim();
  return first.replace(/^['"]|['"]$/g, '');
}

function remToPx(v: string): string {
  const m = v.match(/^([\d.]+)rem$/);
  if (m) return `${Math.round(parseFloat(m[1]) * 16)}px`;
  return v; // already px / em — pass through
}

// ─── YAML emission ────────────────────────────────────────────────────

function emitYaml(
  colors: Record<string, string>,
  typography: Record<string, TypographySlot>,
  spacing: Record<string, string>,
  rounded: Record<string, string>,
  kisaVersion: string,
): string {
  const lines: string[] = [];
  lines.push('---');
  lines.push('version: alpha');
  lines.push('name: KISA Design System');
  lines.push('description: University of Michigan KISA — navy + maize Michigan brand, Korean-first typography.');

  lines.push('colors:');
  for (const k of COLOR_KEYS) {
    const v = colors[k];
    if (!v) throw new Error(`Missing color slot: ${k}`);
    lines.push(`  ${k}: "${v}"`);
  }

  lines.push('typography:');
  for (const k of TYPOGRAPHY_KEYS) {
    const t = typography[k];
    if (!t) throw new Error(`Missing typography slot: ${k}`);
    const parts: string[] = [];
    parts.push(`fontFamily: "${t.fontFamily}"`);
    parts.push(`fontSize: ${t.fontSize}`);
    parts.push(`fontWeight: ${t.fontWeight}`);
    parts.push(`lineHeight: ${typeof t.lineHeight === 'number' ? t.lineHeight : t.lineHeight}`);
    if (t.letterSpacing) parts.push(`letterSpacing: ${t.letterSpacing}`);
    lines.push(`  ${k}: { ${parts.join(', ')} }`);
  }

  lines.push('spacing:');
  for (const [k, v] of Object.entries(spacing)) {
    lines.push(`  ${k}: ${v}`);
  }

  lines.push('rounded:');
  for (const [k, v] of Object.entries(rounded)) {
    lines.push(`  ${k}: ${v}`);
  }
  lines.push('---');
  lines.push('');
  // Stamp version into a comment that survives YAML lint.
  void kisaVersion;
  return lines.join('\n');
}

// ─── Markdown body assembly ───────────────────────────────────────────

function renderBody(kisaVersion: string): string {
  const files = readdirSync(TEMPLATES_DIR).filter((f) => f.endsWith('.md.tpl')).sort();
  const sections: string[] = [];
  for (const f of files) {
    const raw = readFileSync(join(TEMPLATES_DIR, f), 'utf8');
    const rendered = raw.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
      switch (key) {
        case 'kisa_version':
          return kisaVersion;
        default:
          throw new Error(`Unknown template placeholder {{${key}}} in ${f}`);
      }
    });
    sections.push(rendered.trimEnd());
  }
  return sections.join('\n\n');
}

const HEADER = `<!--
  @generated — produced by packages/web/scripts/compile-design.ts.
  Do NOT edit by hand. Edits are overwritten on the next build's
  prebuild step. To change content: edit the source CSS in
  packages/web/src/{styles,tokens}/, or the prose templates in
  packages/web/scripts/templates/.
  Spec: docs/refactor/A4-design-compile.md.
-->`;

// ─── Main ─────────────────────────────────────────────────────────────

function main() {
  const tokens = readTokens();

  // Resolve colors → hex
  const colors: Record<string, string> = {};
  for (const k of COLOR_KEYS) {
    const cssProp = `--color-${k}`;
    const raw = tokens.semantic[cssProp];
    if (!raw) throw new Error(`Missing semantic color in @theme: ${cssProp}`);
    const resolved = resolveVar(raw, tokens.primitives);
    colors[k] = oklchToHex(resolved);
  }

  // Spacing = layout tiers (hard-coded) + icon sizes (rem→px, ordered)
  const spacing: Record<string, string> = { ...SPACING_LAYOUT_TIERS };
  for (const k of ICON_KEYS) {
    const cssProp = `--${k}`;
    const raw = tokens.iconSizes[cssProp];
    if (!raw) throw new Error(`Missing icon size in @theme: ${cssProp}`);
    spacing[k] = remToPx(raw);
  }

  // Typography
  const typography = readTypography(tokens.fontFamilies);

  // Verify A1 inventory parity — every key in the locked enum must be present.
  for (const k of TYPOGRAPHY_KEYS) {
    if (!typography[k]) throw new Error(`Typography slot missing in CSS: type-${k}`);
  }

  // Read KISA package version
  const pkg = JSON.parse(readFileSync(PKG_JSON, 'utf8')) as { version: string };
  const kisaVersion = pkg.version;

  // Emit
  const yaml = emitYaml(colors, typography, spacing, ROUNDED_TIERS, kisaVersion);
  const body = renderBody(kisaVersion);
  const out = `${HEADER}\n\n${yaml}\n${body}\n`;

  writeFileSync(OUTPUT, out, 'utf8');
  console.log(`compile-design: wrote ${OUTPUT} (${colors['brand-primary']} brand-primary, KISA v${kisaVersion})`);
}

main();
