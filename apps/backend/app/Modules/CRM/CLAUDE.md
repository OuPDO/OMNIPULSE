# CRM-Modul

## Kontext
Kontakt- und Unternehmensverwaltung, Vertriebs-Pipeline, Aktivitäten-Tracking.

## Datenmodell
- Contact → belongsTo Company, hasMany Activities, hasMany Deals
- Company → hasMany Contacts, hasMany Projects
- Deal → belongsTo Contact, belongsTo Pipeline Stage
- Activity → polymorphic (Call, Email, Meeting, Note)

## Business Rules
- Kontakt-Duplikat-Erkennung über E-Mail + Telefonnummer
- Pipeline-Stages sind konfigurierbar pro Team
- Deal-Wert wird automatisch in Forecast aggregiert
- Aktivitäten-Log ist append-only (keine Löschung)

## API-Endpunkte
- `GET/POST /api/v1/contacts` — CRUD + Suche
- `GET/POST /api/v1/companies` — CRUD + Suche
- `GET/POST /api/v1/deals` — Pipeline-Management
- `POST /api/v1/activities` — Aktivität loggen

## Zoho CRM Sync
- Bidirektionale Synchronisation über n8n Webhooks
- Zoho als Lead-Source, OMNIPULSE als Master für Bestandskunden
- Sync-Konflikte: OMNIPULSE gewinnt (last-write-wins mit Timestamp)
