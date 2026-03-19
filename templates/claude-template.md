# {{PROJECT_NAME}} — Claude Code Anweisungen

> Kundenprojekt der ObladenMedia Agentur. Basiert auf OMNIPULSE-Templates.

## Projekt

- **Kunde:** {{CLIENT_NAME}}
- **Typ:** {{PROJECT_TYPE}}
- **Erstellt:** {{DATE}}

## Tech Stack

{{#if HAS_BACKEND}}
- **Backend:** Laravel 12, Filament v5, PHP 8.2+
{{/if}}
{{#if HAS_WEB}}
- **Web:** Next.js 16, TypeScript strict, Tailwind CSS v4, shadcn/ui
{{/if}}
{{#if HAS_MOBILE}}
- **Mobile:** Expo, NativeWind v4.1
{{/if}}
- **Datenbank:** PostgreSQL 17, Redis
- **Deployment:** Coolify auf Hetzner

## Konventionen

Dieses Projekt folgt den ObladenMedia-Konventionen:
- TypeScript strict, keine `any`-Typen
- Conventional Commits (`feat:`, `fix:`, `chore:`)
- ESLint jsx-a11y als Error (BFSG-Compliance)
- Laravel Business-Logik in Services, nie in Controllern
- API-Endpunkte: kebab-case, versioniert (`/api/v1/`)

## Projekt-spezifisch

<!-- Hier projektspezifische Anweisungen ergänzen -->
