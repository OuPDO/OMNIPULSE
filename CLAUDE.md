# OMNIPULSE — Claude Code Anweisungen

> Zentrale Plattform der ObladenMedia Agentur. Monorepo mit Turborepo + pnpm.

## Tech Stack

- **Backend:** Laravel 12, Filament v5, PHP 8.2+, PostgreSQL 17, Redis
- **Web:** Next.js 16, React, TypeScript strict, Tailwind CSS v4, shadcn/ui
- **Mobile:** Expo (React Native), NativeWind v4.1, Expo Router
- **Vektor-DB:** Qdrant (self-hosted)
- **Deployment:** Coolify auf Hetzner (deutsche Server)

## Brand (ObladenMedia)

- **Primary Text/BG:** OM-GraphiteMist `#40454D`
- **CTA/Buttons:** OM-GoldenSaffron `#F5C754`
- **Links/Accent:** OM-AquaSky `#6DB2CC`
- **Error Only:** OM-CoralBlaze `#F55F52`
- **Success Only:** OM-FreshMeadow `#64BD79`
- **Headings:** Montserrat (600), **Body:** Merriweather Sans (400)
- **Theme:** `packages/tokens/assets/tweakcn-theme-om.css`
- **Tokens:** `packages/tokens/src/tokens.json`
- **Logos:** `packages/tokens/assets/logo-obladen-media-*.svg`

## Workspace-Struktur

```
apps/backend/         → Laravel 12 + Filament v5 (API + Admin)
apps/web/             → Next.js 16 (Marketing, App, Funnel)
apps/mobile/          → Expo / React Native
packages/types/       → Zod-Schemas (Single Source of Truth)
packages/tokens/      → Design-Token-Pipeline + Brand Assets
packages/config/      → Geteilte ESLint, TSConfig, Tailwind Configs
packages/api-client/  → Typisierter Laravel-API-Client
```

## Module (Backend)

Business-Logik in `apps/backend/app/Modules/`:
Auth, CRM, Projects, Sales, Billing, Booking, SEOTools, GoogleAds, ContentManager.
Jedes Modul hat eigene Models, Services, Policies, Events, Data, Actions.
Komplexe Module haben eigene `CLAUDE.md` — siehe `docs/project-organization.md`.

## Befehle

```bash
pnpm dev             # Alle Apps starten
pnpm dev:web         # Nur Next.js
pnpm build           # Alles bauen
pnpm lint            # Linting
pnpm type-check      # TypeScript prüfen
pnpm tokens:build    # Design-Tokens generieren
```

## Regeln

1. **TypeScript strict** — Keine `any`-Typen, explizite Return-Typen
2. **Zod-Schemas** in `packages/types/` als einzige Typdefinitions-Quelle
3. **Laravel Business-Logik** in `Modules/[Name]/Services/`, nie in Controller
4. **Conventional Commits** — `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`
5. **ESLint jsx-a11y als Error** — Accessibility ist nicht optional
6. **Keine Secrets** committen — alles in `.env`, Platzhalter in `.env.example`
7. **API-Versionierung** — `/api/v1/` Namespace, nie Breaking Changes
8. **Filament Blueprint** nutzen für Implementierungspläne
9. **shadcn/ui** mit TweakCN-Theme für alle Web-UI-Komponenten
10. **Design Tokens** aus `packages/tokens/` nutzen, nie Farben hardcoden
11. **Playwright CLI** zum Testen von Web-Oberflächen nutzen (playwright-cli Skill)

## Naming

- Laravel Models: PascalCase Singular (`Customer`)
- API-Endpunkte: kebab-case versioniert (`/api/v1/customer-projects`)
- React-Komponenten: PascalCase (`CustomerCard.tsx`)
- Zod-Schemas: PascalCase + Schema (`CustomerSchema`)
- DB-Container: `pg-om-zentral`, DB: `om_[dienst]`
- Git-Branches: `feature/`, `fix/`, `chore/`

## Verbotene Patterns

- `any` in TypeScript
- Business-Logik in Laravel Controllern
- Inline-Styles (Tailwind nutzen)
- `console.log` in Production-Code (Logger nutzen)
- Direkte DB-Queries in Controllern (Eloquent/Services)
- `eslint-disable` für a11y-Regeln
- Hardcodierte URLs/Secrets/Farben

## CLAUDE.md Hierarchie

Ebene 1: Diese Datei (Root) → Ebene 2: `apps/*/CLAUDE.md` → Ebene 3: `Modules/*/CLAUDE.md`

## Referenzen

- Wissensdokument: `docs/ObladenMedia-Tech-Stack-Wissensdokument.md`
- Projektorganisation: `docs/project-organization.md`
- AGENTS.md: Universelle KI-Agent-Konventionen
