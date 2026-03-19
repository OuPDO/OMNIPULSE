# OMNIPULSE

> Zentrale Plattform der Digitalagentur ObladenMedia — CRM, Projektmanagement, Vertriebspipeline, Buchhaltung, Terminbuchung, SEO-Tools, Content-Management und Kundenverwaltung in einem modularen System.

## Tech Stack

**Backend:** Laravel 12 + Filament v5 · **Web:** Next.js 16 + shadcn/ui · **Mobile:** Expo + NativeWind · **DB:** PostgreSQL 17 + Redis + Qdrant · **Monorepo:** Turborepo + pnpm · **Deploy:** Coolify auf Hetzner

## Quick Start

```bash
# Prerequisites: Node.js 20+, pnpm 9+, Docker
pnpm install
docker compose -f infrastructure/docker-compose.yml up -d
pnpm dev
```

## Struktur

```
apps/backend/     Laravel 12 + Filament v5 (API + Admin-Panel)
apps/web/         Next.js 16 (Marketing, App, Funnel)
apps/mobile/      Expo / React Native
packages/types/   Zod-Schemas (Single Source of Truth)
packages/tokens/  Design-Token-Pipeline
packages/config/  Geteilte Configs (ESLint, TSConfig, Tailwind)
templates/        Blueprints für Kundenprojekte
infrastructure/   Docker, Coolify, Backups, Monitoring
docs/             Architektur, API, Deployment, A11y, SEO
```

## Neues Kundenprojekt erstellen

```bash
./scripts/create-client-project.sh --name firmaxy --type website
```

Typen: `website` | `webapp` | `portal` | `mobile` | `full`

## Dokumentation

- [Tech Stack Wissensdokument](docs/ObladenMedia-Tech-Stack-Wissensdokument.md)
- [Projektorganisation & Multi-Repo](docs/project-organization.md)
- [Architektur](docs/architecture.md)
- [API Contracts](docs/api-contracts.md)
- [Deployment](docs/deployment.md)
- [Barrierefreiheit](docs/accessibility.md)
- [SEO-Checkliste](docs/seo-checklist.md)
