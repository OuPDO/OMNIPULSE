# OMNIPULSE — Projektorganisation & Modul-Architektur

> **Stand:** 19. März 2026

---

## 1. Grundprinzip

OMNIPULSE ist ein **einziges Monorepo** das die gesamte Agentur-Plattform enthält. Neue Features (CRM, Buchungstool, SEO-Tool, Google Ads Tool etc.) werden als **interne Module** innerhalb des Monorepos entwickelt — nicht als separate Repositories.

Kundenprojekte (externe Websites, Portale) sind die absolute Ausnahme und kommen wahrscheinlich nie vor. Falls doch, können sie als separate Repos mit dem Scaffold-Script erstellt werden.

## 2. Modul-Architektur

### Backend-Module (Laravel)

Jedes Feature-Gebiet ist ein eigenes Modul unter `apps/backend/app/Modules/`:

```
apps/backend/app/Modules/
├── Auth/                   ← Authentifizierung, 2FA, Sessions
├── CRM/                    ← Kontakte, Unternehmen, Pipeline
├── Projects/               ← Projektmanagement, Tasks, Zeiterfassung
├── Sales/                  ← Vertriebspipeline, Deals, Forecasts
├── Billing/                ← Rechnungen, Angebote, Zoho Books Sync
├── Booking/                ← Terminbuchung, Kalender-Integration
├── SEOTools/               ← Keyword-Tracking, Site-Audits, Rankings
├── GoogleAds/              ← Kampagnen-Management, Reporting
├── ContentManager/         ← Blog, Landing Pages, Media Library
└── [NächstesModul]/        ← Einfach neues Verzeichnis anlegen
```

Jedes Modul folgt der gleichen internen Struktur:

```
Modules/CRM/
├── Models/                 ← Eloquent Models (Contact.php, Company.php)
├── Services/               ← Business-Logik (ContactService.php)
├── Policies/               ← Authorization Policies
├── Events/                 ← Domain Events
├── Listeners/              ← Event Listeners
├── Jobs/                   ← Queue Jobs
├── Data/                   ← Data Transfer Objects (Spatie Laravel-Data)
├── Actions/                ← Single-Action-Klassen
└── CLAUDE.md               ← Modul-spezifische KI-Anweisungen
```

### Frontend-Module (Next.js)

Die Next.js App nutzt Route Groups für die logische Trennung:

```
apps/web/app/
├── (marketing)/            ← Öffentliche Seiten, SEO-optimiert
│   ├── page.tsx
│   ├── blog/
│   └── leistungen/
├── (app)/                  ← Internes Dashboard (hinter Auth)
│   ├── dashboard/
│   ├── crm/                ← CRM-Oberfläche
│   ├── projects/           ← Projektmanagement
│   ├── booking/            ← Terminbuchung
│   ├── seo/                ← SEO-Tools
│   ├── google-ads/         ← Google Ads Dashboard
│   └── settings/
└── (funnel)/               ← Conversion Funnels
```

### Filament-Panel-Module

Filament v5 unterstützt nativ mehrere Panels:

```
apps/backend/app/Filament/
├── Admin/                  ← Internes Team (CRM, Projekte, Billing)
│   ├── Resources/
│   ├── Pages/
│   └── Widgets/
└── Client/                 ← Kunden-Portal (Projektstatus, Rechnungen)
    ├── Resources/
    ├── Pages/
    └── Widgets/
```

## 3. CLAUDE.md Vererbungshierarchie

KI-Anweisungen folgen einer klaren Vererbungskette. Jede Ebene ergänzt die darüber — keine Redundanz.

```
Ebene 1: /CLAUDE.md (Root)
  → Globale Regeln: Tech Stack, Naming, Commits, verbotene Patterns
  → Gilt für ALLES im Monorepo
  → Max. 200 Zeilen, knapp und präzise

Ebene 2: /apps/backend/CLAUDE.md
  → Laravel-spezifisch: PHP-Konventionen, Filament-Patterns, API-Regeln
  → Referenziert packages/types/ für Schema-Konsistenz

Ebene 2: /apps/web/CLAUDE.md
  → Next.js-spezifisch: RSC-Patterns, SEO, Accessibility, shadcn/ui

Ebene 2: /apps/mobile/CLAUDE.md
  → Expo-spezifisch: NativeWind, Native Navigation, Token-Auth

Ebene 3: /apps/backend/app/Modules/CRM/CLAUDE.md
  → Modul-spezifisch: Datenmodell, Business Rules, API-Endpunkte
  → Nur bei komplexen Modulen nötig

Ebene 3: /apps/backend/app/Modules/Booking/CLAUDE.md
  → Buchungslogik, Kalender-Constraints, Timezone-Handling
```

**Regel:** Ebene 3 (Modul-CLAUDE.md) nur anlegen wenn ein Modul eigene domänenspezifische Regeln hat. Für einfache CRUD-Module reicht Ebene 2.

## 4. Neues Modul hinzufügen

### Backend-Modul

```bash
# 1. Verzeichnisstruktur anlegen
mkdir -p apps/backend/app/Modules/GoogleAds/{Models,Services,Policies,Events,Data,Actions}

# 2. Optional: CLAUDE.md für Modul erstellen
# (nur wenn das Modul eigene domänenspezifische Regeln hat)

# 3. Migration erstellen
cd apps/backend && php artisan make:migration create_google_ads_campaigns_table

# 4. Filament Resource (mit Blueprint)
php artisan make:filament-resource GoogleAds/Campaign --generate
```

### Frontend-Route (Next.js)

```bash
mkdir -p apps/web/app/\(app\)/google-ads
touch apps/web/app/\(app\)/google-ads/page.tsx
touch apps/web/app/\(app\)/google-ads/layout.tsx
```

## 5. Skalierung

Diese Architektur skaliert auf 20+ Module weil:

- Jedes Laravel-Modul ist in sich geschlossen (eigene Models, Services, Policies)
- Filament Resources registrieren sich automatisch über Panel-Provider
- Next.js Route Groups sind nur Ordner — kein zusätzlicher Overhead
- Turborepo cached pro Package — neue Module verlangsamen den Build nicht
- CLAUDE.md pro Modul gibt KI-Agents den nötigen Kontext ohne das Root-Dokument aufzublähen
- `packages/types/` bleibt die Single Source of Truth für alle Zod-Schemas

## 6. Kundenprojekte (Ausnahme)

Falls jemals ein Kundenprojekt als separates Repo nötig wird:

```bash
./scripts/create-client-project.sh --name firmaxy --type website
```

Das Script kopiert aus `templates/` und generiert eine eigene CLAUDE.md. Aber der Standardfall ist immer ein neues Modul in OMNIPULSE.
