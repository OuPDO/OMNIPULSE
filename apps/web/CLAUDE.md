# CLAUDE.md — Next.js Web Frontend

> App-spezifische Anweisungen für `apps/web/`. Ergänzt die Root-CLAUDE.md.

## Stack

Next.js 16 + TypeScript strict + Tailwind CSS v4 + shadcn/ui + TweakCN

## Architektur

- **App Router** mit Route Groups: `(marketing)`, `(app)`, `(funnel)`
- **React Server Components** als Default, `'use client'` nur wo nötig
- **API-Client** aus `packages/api-client/` — nie direkt fetch zum Backend
- **Auth** über Laravel Sanctum (Cookie-basiert für SPA)

## Brand & Design

- **TweakCN Theme:** `packages/tokens/assets/tweakcn-theme-om.css` → `globals.css`
- **Primärfarbe:** OM-GoldenSaffron `#F5C754` (CTAs, Buttons)
- **Text:** OM-GraphiteMist `#40454D`
- **Headings:** Montserrat (SemiBold 600)
- **Body:** Merriweather Sans (Regular 400)
- **Akzent-Font:** Caveat (nur kurze Highlights, ab 40px)
- **Semantic Colors:** Siehe `packages/tokens/src/tokens.json`

## Regeln

1. **Accessibility als Error:** ESLint jsx-a11y, Kontrast 4,5:1, Keyboard-Nav
2. **SEO:** Metadata API nutzen, `sitemap.ts`, `robots.ts`, `next/image` mit priority
3. **Keine Inline-Styles** → Tailwind Utilities
4. **Komponenten** → shadcn/ui Primitives (Radix UI), nie eigene wenn shadcn es hat
5. **Typen** → Import aus `@omnipulse/types`, nie lokal duplizieren
6. **Bilder** → `next/image` mit expliziten width/height (CLS < 0.1)
7. **Fonts** → `next/font` (Montserrat + Merriweather Sans)

## Rendering-Strategien

- Landing Pages: SSG
- Blog/Content: ISR (60–300s)
- Dashboard: CSR (hinter Auth)
- Funnel-Einstieg: SSG
- Funnel-Schritte: CSR + `noindex`

## Route Groups

```
(marketing)/ → Öffentlich, SEO-optimiert, SSG/ISR
(app)/       → Hinter Auth, CSR, alle internen Tools
(funnel)/    → Conversion Funnels, Einstieg SSG, Rest CSR
```
