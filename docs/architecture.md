# OMNIPULSE — Architektur-Dokumentation

> Detaillierte Architektur-Referenz. Für den vollständigen Tech Stack siehe `ObladenMedia-Tech-Stack-Wissensdokument.md`.

## Architektur-Prinzip

Headless-API-First-Ansatz: Laravel 12 als zentrales Backend mit Filament v5 als Backoffice.
Alle Frontends (Next.js, Expo) kommunizieren über eine einheitliche REST-API.
Auth läuft zentral über Laravel Sanctum.

## Module

Die Backend-Geschäftslogik ist in Module aufgeteilt (`apps/backend/app/Modules/`):

| Modul | Beschreibung | Priorität |
|-------|-------------|-----------|
| Auth | Authentifizierung, RBAC, Sanctum | Phase 2 |
| CRM | Kontakte, Firmen, Notizen | Phase 2+ |
| Projects | Projektmanagement, Aufgaben | Phase 2+ |
| Sales | Vertriebspipeline, Deals | Später |
| Billing | Rechnungen, Angebote | Später |
| Booking | Terminbuchung | Später |
| SEOTools | SEO-Audit, Keyword-Tracking | Später |
| ContentManager | Content-Planung, Redaktion | Später |

## API-Design

- REST mit JSON:API-inspirierten Konventionen
- Versioniert: `/api/v1/`, `/api/v2/`
- Paginierung: Cursor-basiert für Listen
- Filtering: `?filter[status]=active&filter[client_id]=5`
- Includes: `?include=client,tasks`
- Sortierung: `?sort=-created_at,name`

## Datenbank-Schema (Kern)

Wird in Phase 2 mit Laravel Migrations definiert. Siehe `ObladenMedia-Tech-Stack-Wissensdokument.md` Abschnitt 4.2 für die Datenbank-Architektur.
