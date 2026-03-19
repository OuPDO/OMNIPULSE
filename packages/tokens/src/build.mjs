/**
 * OMNIPULSE Design Token Build Script
 *
 * Generiert aus tokens.json (DTCG-Format) drei Outputs:
 * 1. CSS-Variablen → Tailwind CSS v4 / shadcn/ui
 * 2. TypeScript-Konstanten → NativeWind (React Native)
 * 3. PHP-Array → Filament v5 Theme
 *
 * Workflow: TweakCN → tokens.json → Style Dictionary → Alle Plattformen
 */

import StyleDictionary from "style-dictionary";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokensPath = resolve(__dirname, "tokens.json");
const buildDir = resolve(__dirname, "../build");

// Token-Datei laden
const tokens = JSON.parse(readFileSync(tokensPath, "utf-8"));

/**
 * Tokens in flache Struktur konvertieren (Style Dictionary kompatibel)
 */
function flattenTokens(obj, prefix = "") {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;

    const path = prefix ? `${prefix}-${key}` : key;

    if (value && typeof value === "object" && "$value" in value) {
      result[path] = value.$value;
    } else if (value && typeof value === "object") {
      Object.assign(result, flattenTokens(value, path));
    }
  }

  return result;
}

const flatTokens = flattenTokens(tokens);

// --- Output 1: CSS Custom Properties ---
function buildCSS() {
  mkdirSync(resolve(buildDir, "css"), { recursive: true });

  const lines = [
    "/* OMNIPULSE Design Tokens — Auto-generated, do not edit */",
    "/* Source: packages/tokens/src/tokens.json */",
    "/* Run: pnpm tokens:build */",
    "",
    ":root {",
  ];

  for (const [key, value] of Object.entries(flatTokens)) {
    const cssVar = `--om-${key}`;
    const cssValue = Array.isArray(value) ? value.join(", ") : value;
    lines.push(`  ${cssVar}: ${cssValue};`);
  }

  lines.push("}");
  lines.push("");

  writeFileSync(resolve(buildDir, "css/tokens.css"), lines.join("\n"));
  console.log("✅ CSS tokens generated → build/css/tokens.css");
}

// --- Output 2: TypeScript Constants ---
function buildTS() {
  mkdirSync(resolve(buildDir, "ts"), { recursive: true });

  const lines = [
    "/* OMNIPULSE Design Tokens — Auto-generated, do not edit */",
    "/* Source: packages/tokens/src/tokens.json */",
    "",
    "export const tokens = {",
  ];

  for (const [key, value] of Object.entries(flatTokens)) {
    const tsKey = key.replace(/-/g, "_").replace(/\./g, "_");
    const tsValue = Array.isArray(value) ? JSON.stringify(value) : `"${value}"`;
    lines.push(`  ${tsKey}: ${tsValue},`);
  }

  lines.push("} as const;");
  lines.push("");
  lines.push("export type TokenKey = keyof typeof tokens;");
  lines.push("");

  writeFileSync(resolve(buildDir, "ts/tokens.ts"), lines.join("\n"));
  console.log("✅ TypeScript tokens generated → build/ts/tokens.ts");
}

// --- Output 3: PHP Array ---
function buildPHP() {
  mkdirSync(resolve(buildDir, "php"), { recursive: true });

  const lines = [
    "<?php",
    "",
    "/**",
    " * OMNIPULSE Design Tokens — Auto-generated, do not edit.",
    " * Source: packages/tokens/src/tokens.json",
    " * Run: pnpm tokens:build",
    " */",
    "",
    "return [",
  ];

  for (const [key, value] of Object.entries(flatTokens)) {
    const phpKey = key.replace(/-/g, "_").replace(/\./g, "_");
    const phpValue = Array.isArray(value) ? JSON.stringify(value) : `'${value}'`;
    lines.push(`    '${phpKey}' => ${phpValue},`);
  }

  lines.push("];");
  lines.push("");

  writeFileSync(resolve(buildDir, "php/tokens.php"), lines.join("\n"));
  console.log("✅ PHP tokens generated → build/php/tokens.php");
}

// Build all outputs
console.log("🔧 Building OMNIPULSE Design Tokens...\n");
buildCSS();
buildTS();
buildPHP();
console.log("\n🎉 All tokens built successfully!");
