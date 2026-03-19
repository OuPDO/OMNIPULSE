# ObladenMedia Tech Stack — Wissensdokument & Referenz

> **Zweck:** Dieses Dokument ist die zentrale Wissensgrundlage für alle Entwicklungsprojekte der ObladenMedia Agentur. Es dient als Basis für CLAUDE.md, AGENTS.md und alle projektspezifischen Konfigurationen. Jede technische Entscheidung, Konvention und Architekturvorgabe wird hier dokumentiert und begründet.

> **Stand:** 19. März 2026 | **Pflege:** Dieses Dokument wird kontinuierlich aktualisiert, wenn sich der Stack weiterentwickelt.

---

## 1. Festgeschriebener Tech Stack

### 1.1 Versionstabelle

| Schicht | Technologie | Version | Status |
|---------|------------|---------|--------|
| **Backend-Framework** | Laravel | **12** (Upgrade auf 13 bei Release) | Festgeschrieben |
| **Admin-Panel / Backoffice** | Filament | **v5** (aktuell v5.4.0) | Festgeschrieben |
| **Frontend Web** | Next.js (React) | **16** (aktuell 16.2) | Festgeschrieben |
| **Mobile** | Expo (React Native) | Expo SDK 52+ | Festgeschrieben |
| **Sprache Frontend** | TypeScript (strict mode) | 5.x | Festgeschrieben |
| **CSS-Framework** | Tailwind CSS | **v4** | Festgeschrieben |
| **UI-Komponenten Web** | shadcn/ui | Aktuellste (CLI v4) | Festgeschrieben |
| **Theme-Editor** | TweakCN | Aktuellste | Festgeschrieben |
| **Mobile Styling** | NativeWind | v4.1 (v5 bei Stabilität) | Festgeschrieben |
| **Datenbank** | PostgreSQL | **17** | Festgeschrieben |
| **Vektor-DB (KI/RAG)** | Qdrant | Self-hosted, aktuellste | Festgeschrieben |
| **Automatisierung** | n8n | Self-hosted, aktuellste | Festgeschrieben |
| **Hosting** | Hetzner / Hostinger | Deutsche Server | Festgeschrieben |
| **Deployment-Plattform** | Coolify | v4 (aktuellste) | Festgeschrieben |
| **Monorepo-Tool** | Turborepo + pnpm | Aktuellste | Festgeschrieben |
| **KI-Entwicklungstool** | Claude Code in VS Code | Primäres Tool | Festgeschrieben |
| **Versionskontrolle** | GitHub | Private Repos | Festgeschrieben |
| **DB-GUI lokal** | Beekeeper Studio | Desktop-App (Mac) | Festgeschrieben |
| **DB-GUI web** | pgAdmin (auf Coolify) | Web-basiert | Festgeschrieben |
| **Spreadsheet-DB-View** | NocoDB (auf Coolify) | Self-hosted | Festgeschrieben |
| **Monitoring** | Uptime Kuma (auf Coolify) | Self-hosted | Festgeschrieben |
| **Backup-Ziel** | Google Drive (Google Workspace) | Automatisiert via n8n | Festgeschrieben |
| **Design-Token-Pipeline** | Style Dictionary (Amazon) | Aktuellste | Festgeschrieben |

### 1.2 Versions-Strategie

**Grundprinzip:** Immer die aktuellste stabile Version nutzen. Kein konservatives Festhalten an älteren Versionen — wir starten Projekte auf dem neuesten Stand und upgraden zeitnah bei neuen Major-Versionen.

**Laravel 12 → 13 Upgrade-Plan:** Laravel 13 steht für Q1 2026 bevor (erfordert PHP 8.3). Wir starten mit Laravel 12 (stabil, produktionsreif) und upgraden auf 13 sobald es stable ist. Laravel-Major-Upgrades sind seit v11→12 minimal-invasive Maintenance-Releases — Aufwand ca. ein halber Tag.

**Filament v5:** Seit 16. Januar 2026 stabil. Basiert auf Livewire v4, erfordert Tailwind CSS v4. v5.4.0 (17. März 2026) bringt bereits Laravel 13 Support mit. Zusätzlich nutzen wir **Filament Blueprint** — ein offizielles Tool das KI-Agents (Claude Code) bessere Implementierungspläne für Filament-Projekte generieren lässt.

**Next.js 16.2:** Veröffentlicht am 18. März 2026. Bringt nativ AGENTS.md-Support in `create-next-app`, ~400% schnelleren Dev-Server-Startup, 50% schnelleres Rendering, und experimentelle Agent-DevTools.

### 1.3 Warum dieser Stack (Kurzfassung)

**React/Next.js statt Vue/Nuxt:** React hat 10x mehr npm-Downloads, 3–4x mehr Stellenangebote in Deutschland, und jedes große KI-Coding-Tool produziert signifikant besseren Output für React. Der KI-Kompatibilitäts-Vorteil ist strukturell und nicht aufholbar.

**Laravel + Filament statt Node-Backend:** Ausgereiftes ORM, eingebaute Security, bewährtes Queue-System, riesiges Paket-Ökosystem, Long-Term-Support. Filament v5 mit Livewire v4 ist der dominierende Admin-Panel-Standard.

**PostgreSQL statt MySQL/MariaDB/SQLite:** Überlegene Features (JSONB, Arrays, Window Functions, Row-Level Security), strenge ACID-Konformität, beste Grundlage für mehrmandantenfähige SaaS-Anwendungen mit DSGVO-Anforderungen.

**Natives PostgreSQL statt Self-Hosted Supabase:** Laravel bringt eigene Auth, ORM und Application-Layer mit. Supabase würde ~8 zusätzliche Docker-Services ergänzen für Funktionen, die Laravel bereits abdeckt.

**Expo (React Native):** Expo ist für React Native was Next.js für React ist — ein Framework das auf React Native aufbaut und alles vereinfacht: File-Based Routing (Expo Router), Managed Build Service (iOS/Android Builds ohne lokales Xcode/Android Studio), Over-the-Air Updates, vereinfachtes Native-Modul-Management. Heute wird praktisch jedes neue React-Native-Projekt mit Expo gestartet. Man schreibt den gleichen React-Native-Code, aber mit deutlich weniger Konfigurationsaufwand.

---

## 2. Gesamtarchitektur-Übersicht

### 2.1 Architektur-Prinzip

**Headless-API-First-Ansatz:** Laravel dient als zentrales Backend mit Filament v5 als Backoffice. Alle Frontends kommunizieren über eine einheitliche REST-API. Auth läuft zentral über Laravel Sanctum.

```
┌──────────────────────────────────────────────────────────┐
│                  COOLIFY (Hetzner / Hostinger)            │
│                                                           │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────┐  │
│  │  Laravel 12 +   │  │  Next.js 16    │  │  Expo      │  │
│  │  Filament v5    │  │  Frontend      │  │  (Build    │  │
│  │  (Backend)      │  │  (Web)         │  │   extern)  │  │
│  └────────┬───────┘  └────────┬───────┘  └─────┬──────┘  │
│           │                    │                │         │
│           ▼                    ▼                ▼         │
│  ┌────────────────────────────────────────────────────┐   │
│  │           Laravel REST API (Sanctum Auth)           │   │
│  └───────────────────────┬────────────────────────────┘   │
│                          │                                │
│  ┌────────────┐  ┌──────┴───────┐  ┌─────────────────┐   │
│  │ PostgreSQL  │  │    Qdrant    │  │     Redis        │  │
│  │ (Zentral)   │  │  (Vektoren)  │  │    (Cache)       │  │
│  └────────────┘  └──────────────┘  └─────────────────┘   │
│                                                           │
│  ┌────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ PostgreSQL  │  │  PostgreSQL  │  │  PostgreSQL     │   │
│  │ Client A    │  │  Client B    │  │  Client ...     │   │
│  └────────────┘  └──────────────┘  └─────────────────┘   │
│                                                           │
│  ┌────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │  n8n        │  │   NocoDB     │  │   pgAdmin       │   │
│  │ (Automat.)  │  │ (Spreadsheet)│  │  (DB-GUI Web)   │   │
│  └────────────┘  └──────────────┘  └─────────────────┘   │
│                                                           │
│  ┌────────────┐  ┌──────────────┐                         │
│  │ Uptime      │  │ PG Back Web  │                        │
│  │ Kuma        │  │ (DB-Backups) │                        │
│  └────────────┘  └──────────────┘                         │
└──────────────────────────────────────────────────────────┘

Lokaler Zugriff:
  Mac → Beekeeper Studio → SSH-Tunnel → PostgreSQL-Container
  Mac → Browser → pgAdmin Web-UI (auth-geschützt)
```

### 2.2 Multi-Frontend-Strategie

Ein stabiles Laravel-Backend bedient verschiedene spezialisierte Clients:

- **Next.js 16 Apps:** B2B/B2C-Frontends, Funnels, Landing Pages, Marketing-Sites
- **Filament v5 Panel:** Internes Admin-Dashboard, CRM, Projektmanagement, Kunden-Portal
- **Expo / React Native:** iOS- und Android-Apps
- **Drittanbieter-Integrationen:** Webhooks, n8n-Workflows, externe APIs

---

## 3. Ordnerstruktur des Masterprojekts

### 3.1 Monorepo-Struktur (Turborepo + pnpm)

```
obladen-platform/
│
├── apps/
│   ├── backend/                          # Laravel 12 + Filament v5
│   │   ├── app/
│   │   │   ├── Filament/
│   │   │   │   ├── Admin/                # Admin-Panel (internes Team)
│   │   │   │   │   ├── Resources/
│   │   │   │   │   ├── Pages/
│   │   │   │   │   └── Widgets/
│   │   │   │   └── Client/               # Client-Panel (Kunden-Portal)
│   │   │   │       ├── Resources/
│   │   │   │       ├── Pages/
│   │   │   │       └── Widgets/
│   │   │   ├── Http/
│   │   │   │   ├── Controllers/
│   │   │   │   │   └── Api/
│   │   │   │   │       ├── V1/
│   │   │   │   │       └── V2/
│   │   │   │   ├── Middleware/
│   │   │   │   └── Requests/
│   │   │   ├── Models/
│   │   │   ├── Modules/                  # Modulare Geschäftslogik
│   │   │   │   ├── CRM/
│   │   │   │   │   ├── Models/
│   │   │   │   │   ├── Services/
│   │   │   │   │   ├── Policies/
│   │   │   │   │   └── Events/
│   │   │   │   ├── Projects/
│   │   │   │   ├── Sales/
│   │   │   │   ├── Billing/
│   │   │   │   ├── Booking/
│   │   │   │   ├── SEOTools/
│   │   │   │   ├── ContentManager/
│   │   │   │   └── Auth/
│   │   │   ├── Services/
│   │   │   ├── Policies/
│   │   │   ├── Observers/
│   │   │   └── Jobs/
│   │   ├── config/
│   │   ├── database/
│   │   │   ├── migrations/
│   │   │   ├── seeders/
│   │   │   └── factories/
│   │   ├── routes/
│   │   │   ├── api.php
│   │   │   ├── web.php
│   │   │   └── channels.php
│   │   ├── resources/
│   │   │   └── css/
│   │   │       └── filament/
│   │   │           └── admin/
│   │   │               └── theme.css     # TweakCN-abgeleitetes Theme
│   │   ├── tests/
│   │   ├── composer.json
│   │   ├── .env.example
│   │   ├── Dockerfile
│   │   └── vite.config.js
│   │
│   ├── web/                              # Next.js 16 Frontend
│   │   ├── app/
│   │   │   ├── (marketing)/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── blog/
│   │   │   │   └── leistungen/
│   │   │   ├── (app)/
│   │   │   │   ├── dashboard/
│   │   │   │   └── settings/
│   │   │   ├── (funnel)/
│   │   │   ├── api/
│   │   │   ├── layout.tsx
│   │   │   ├── sitemap.ts
│   │   │   └── robots.ts
│   │   ├── components/
│   │   │   ├── ui/                       # shadcn/ui
│   │   │   ├── layout/
│   │   │   ├── forms/
│   │   │   └── seo/
│   │   ├── lib/
│   │   │   ├── api.ts
│   │   │   ├── auth.ts
│   │   │   └── utils.ts
│   │   ├── styles/
│   │   │   └── globals.css               # TweakCN-generierte Tokens
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── mobile/                           # Expo / React Native
│       ├── app/
│       │   ├── (tabs)/
│       │   ├── (auth)/
│       │   └── _layout.tsx
│       ├── components/
│       │   ├── ui/
│       │   └── shared/
│       ├── lib/
│       │   ├── api.ts
│       │   └── auth.ts
│       ├── app.json
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       └── package.json
│
├── packages/
│   ├── types/                            # Zod-Schemas + TS-Typen (Single Source of Truth)
│   │   ├── src/
│   │   │   ├── user.ts
│   │   │   ├── project.ts
│   │   │   ├── invoice.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── ui/                               # Geteilte React-Komponenten
│   ├── api-client/                       # Typisierter Laravel-API-Client
│   │   ├── src/
│   │   │   ├── client.ts
│   │   │   ├── endpoints/
│   │   │   └── index.ts
│   │   └── package.json
│   ├── hooks/
│   ├── tokens/                           # Design-Token-Pipeline
│   │   ├── src/
│   │   │   ├── tokens.json               # DTCG-Format
│   │   │   └── config.js                 # Style Dictionary Config
│   │   ├── build/
│   │   │   ├── css/                      # → Tailwind v4
│   │   │   ├── ts/                       # → NativeWind
│   │   │   └── php/                      # → Filament v5
│   │   └── package.json
│   └── config/
│       ├── eslint/
│       ├── tsconfig/
│       └── tailwind/
│
├── templates/                            # Wiederverwendbare Blueprints
│   ├── laravel-filament-base/            # Laravel 12 + Filament v5
│   │   ├── app/
│   │   ├── composer.json
│   │   ├── Dockerfile
│   │   ├── .env.example
│   │   └── README.md
│   ├── nextjs-shadcn-base/               # Next.js 16 + shadcn/ui
│   │   ├── app/
│   │   ├── components/ui/
│   │   ├── styles/globals.css
│   │   ├── Dockerfile
│   │   └── README.md
│   ├── expo-nativewind-base/             # Expo + NativeWind
│   │   └── README.md
│   └── docker-compose-base/              # PostgreSQL + Redis + Qdrant
│       ├── docker-compose.yml
│       └── README.md
│
├── infrastructure/
│   ├── docker-compose.yml
│   ├── docker-compose.prod.yml
│   ├── coolify/
│   │   └── README.md
│   ├── backups/
│   │   ├── pg-backup-gdrive.sh
│   │   └── n8n-backup-workflow.json      # Auto-Discovery Backup
│   └── monitoring/
│       └── uptime-kuma-config.json
│
├── docs/
│   ├── architecture.md                   # Dieses Dokument
│   ├── api-contracts.md
│   ├── deployment.md
│   ├── accessibility.md
│   └── seo-checklist.md
│
├── AGENTS.md
├── CLAUDE.md
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
├── .gitignore
└── README.md
```

### 3.2 Erläuterung der Schlüsselordner

**`apps/backend/app/Modules/`** — Modulare Geschäftslogik nach DDD-Prinzipien. Filament v5 bietet offizielle DDD-/Modular-Architektur-Dokumentation mit eigenem Plugin-System pro Modul.

**`apps/backend/app/Filament/Admin/` und `/Client/`** — Separate Filament-Panels. Filament v5 unterstützt multiple Panels nativ mit eigenen Resources, Auth-Guards und Konfigurationen.

**`packages/types/`** — Zod-Schemas als Single Source of Truth. Web, Mobile und API-Client konsumieren identische Typdefinitionen.

**`packages/tokens/`** — Style Dictionary Pipeline. TweakCN → JSON → CSS + TS + PHP.

**`templates/`** — Nackte Basis-Setups als Blueprint für losgelöste Kundenprojekte. Inklusive Dockerfiles, TweakCN-Basis-Theme, Accessibility-Setup.

---

## 4. Infrastruktur: Single-Server Coolify

### 4.1 Server-Setup

Alles auf **einem Server**. Coolify verwaltet sämtliche Services.

**Mindest-Specs:** 8 vCPU, 16 GB RAM, 160 GB SSD (Hetzner CPX41 ca. 28 €/Monat) + Hetzner Volume 100 GB+ für PostgreSQL-Daten (ca. 5,20 €/Monat). **Nur deutsche Standorte** (nbg1/fsn1). Für Hostinger: Gleiche Prinzipien, VPS mit vergleichbaren Specs.

### 4.2 Datenbank-Architektur: Hybrid-Ansatz

#### Prinzip: Zentral für Internes, Isoliert für Kunden

**Ein zentraler PostgreSQL-Container** für alle internen Datenbanken:

```
Container: pg-om-zentral
├── om_platform          # Agentur-Backend (CRM, Projekte, Billing...)
├── om_n8n               # n8n Workflow-Daten
├── om_nocodb            # NocoDB
└── om_staging           # Staging der Plattform
```

**Separate Container pro Kundenprojekt** (isoliert):

```
Container: pg-client-book        → DB: client_book_prod
Container: pg-client-haug        → DB: client_haug_prod
Container: pg-client-probeacademy → DB: client_probe_prod
```

**Vorteile:** Internes zentral und effizient, Kundenprojekte isoliert (ein Crash betrifft nur ein Projekt, können auf anderen Server verschoben werden). Coolify verwaltet Backups pro Container nativ.

**Naming-Konvention:**
- Container: `pg-om-zentral`, `pg-client-[name]`
- Datenbanken intern: `om_[dienst]`
- Datenbanken Kunden: `client_[name]_[env]`

#### Lokaler DB-Zugriff: Beekeeper Studio via SSH-Tunnel

**Beekeeper Studio** (Mac Desktop-App) baut SSH-Tunnel nativ im Hintergrund auf — fühlt sich an wie eine direkte Verbindung, ist aber sicher.

```
Connection Type: PostgreSQL
SSH Tunnel: Enabled
  SSH Host: [Server-IP]
  SSH User: [SSH-User]
  SSH Key: [Pfad zum Key]
Database Host: localhost (durch Tunnel)
Database Port: 5432
Database: om_platform
```

Pro Datenbank eine gespeicherte Verbindung anlegen. **PostgreSQL wird niemals öffentlich exponiert.** Zugriff nur über SSH-Tunnel (Beekeeper), pgAdmin (Web-UI), oder internes Docker-Netzwerk.

#### pgAdmin + NocoDB

pgAdmin als Web-UI auf Coolify (z.B. `pgadmin.oblm.de`, auth-geschützt). NocoDB zeigt auf die zentrale PostgreSQL-Instanz für Spreadsheet-Zugriff durch nicht-technische Teammitglieder.

### 4.3 Backup-Konzept: Dreistufig mit Auto-Discovery

**Stufe 1: Coolify Built-In** — `pg_dump` alle 4h, 7 Tage Retention, pro Container.

**Stufe 2: PG Back Web** — Web-UI für Backup-Management auf Coolify.

**Stufe 3: Google Drive via n8n (Auto-Discovery):**

1. Cron-Trigger: Täglich 02:00 Uhr
2. **Auto-Discovery:** Docker API abfragen → alle PostgreSQL-Container automatisch erkennen. Neue Datenbanken werden beim nächsten Lauf mitgesichert. Zero Konfiguration.
3. Pro Container: `pg_dumpall` über Docker Exec
4. gzip-Komprimierung
5. Google Drive API Upload in strukturierten Ordner
6. Rotation: 30 Tage
7. Telegram/E-Mail Benachrichtigung bei Erfolg/Fehler

```
ObladenMedia Backups/
├── PostgreSQL/
│   ├── pg-om-zentral/
│   │   ├── 2026-03-19_0200_om_platform.sql.gz
│   │   └── ...
│   ├── pg-client-book/
│   └── ... (automatisch erkannte neue Container)
└── Coolify/
    └── coolify-instance-backup/
```

**Hinweis:** Bestehender ähnlicher n8n-Backup-Workflow als Ausgangsbasis nutzen und um Auto-Discovery erweitern.

**Kritisch:** n8n-Encryption-Key extern sichern (Google Workspace Passwort-Manager).

### 4.4 Deployment: GitHub → Coolify

Push auf `main`/`staging` → GitHub Action baut Image → GHCR Push → Webhook triggert Coolify → Zero-Downtime Deploy. Laravel-Image: `serversideup/php`. Next.js: Multi-Stage Dockerfile.

### 4.5 Coolify-Services (Gesamt)

| Service | Zweck |
|---------|-------|
| PostgreSQL (Zentral) | Interne OM-Datenbanken |
| PostgreSQL (pro Kunde) | Isolierte Kundenprojekte |
| Redis | Cache, Sessions, Queues |
| Laravel 12 + Filament v5 | API + Admin |
| Next.js 16 | Web-Frontend |
| Qdrant | Vektor-DB für RAG/KI |
| n8n | Workflow-Automatisierung |
| NocoDB | Spreadsheet-View |
| pgAdmin | DB-GUI Web |
| PG Back Web | Backup-Management |
| Uptime Kuma | Monitoring |

---

## 5. Design-System: TweakCN → Style Dictionary → Alle Plattformen

### 5.1 TweakCN als Ausgangspunkt

TweakCN (tweakcn.com) — visueller No-Code Theme-Editor für shadcn/ui + Tailwind v4. Generiert produktionsreife CSS-Variablen (OKLCH/HSL, Light + Dark Mode) mit Accessibility-Kontrastprüfungen.

**Workflow:** TweakCN Editor → CSS exportieren → Style Dictionary Pipeline → Alle Plattformen

### 5.2 Style Dictionary Pipeline

```
tokens.json (DTCG)  →  CSS-Variablen (Tailwind v4 @theme)
                     →  TS-Konstanten (NativeWind)
                     →  PHP-Arrays (Filament v5)
```

### 5.3 Filament v5 Theming

Filament v5 nutzt Tailwind CSS v4 nativ. TweakCN-Tokens fließen über `theme.css` und Panel-Provider-Config direkt ins Filament-Design. `.fi-*` CSS-Hooks für tiefere Anpassungen. Konsistentes Erscheinungsbild über alle Plattformen.

---

## 6. SEO-Architektur

### 6.1 Rendering-Strategien

| Seitentyp | Rendering | Begründung |
|-----------|-----------|------------|
| Landing Pages | SSG | Schnellstmöglicher LCP |
| Blog/Content | ISR (60–300s) | Frische ohne Rebuild |
| SaaS-Dashboard | CSR | Hinter Auth |
| Funnel-Einstieg | SSG | Einzige indexierte Seite |
| Funnel-Schritte | CSR + `noindex` | Keine SEO-Relevanz |

### 6.2 Next.js 16 SEO-Features

Eingebaute typsichere Metadata API, `sitemap.ts`, `robots.ts`. Kein externes Paket für Basis-SEO nötig. Laravel liefert SEO-Felder per API (`seo_title`, `meta_description`, `og_image`, `canonical_url`). Webhook bei Publish → `revalidatePath`.

### 6.3 Toolset

- Eingebaute Metadata API + `sitemap.ts` + `robots.ts`
- `next-seo` nur für JSON-LD Structured Data
- `next-intl` für hreflang (de-DE/de-AT/de-CH)
- `next/image` mit `priority`, `next/font` für Zero-CLS

### 6.4 Core Web Vitals

**LCP < 2,5s:** SSG, priority-Bilder, Font-Preloading
**INP < 200ms:** React Server Components, `useTransition`, Code-Splitting
**CLS < 0,1:** Explizite Bildgrößen, `next/font`, Skeletons

### 6.5 Deutscher Markt

`locale: 'de_DE'`, hreflang-Tags, Analytics erst nach Consent, Impressum/Datenschutz als SSG.

---

## 7. Barrierefreiheit (BFSG / WCAG)

### 7.1 Rechtslage

BFSG seit 28.06.2025 durchsetzbar. WCAG 2.1 AA (2.2 empfohlen). Bis 100.000 € Strafe + Abmahnrisiko. B2B-only ausgenommen.

### 7.2 shadcn/ui

Radix UI Primitives mit WAI-ARIA, Keyboard-Nav, Fokus-Management. Nicht automatisch konform — Kontraste prüfen (4,5:1 Text, 3:1 UI). TweakCN hat eingebaute Kontrast-Checks.

### 7.3 Testing-Pipeline

1. **ESLint** (`jsx-a11y`) — Code-Zeit
2. **Storybook** (`addon-a11y`) — Komponenten
3. **Jest** (`jest-axe`) + **Playwright** (`axe-core`) — Unit/E2E
4. **Pa11y CI** — Produktions-Scans
5. **Manuell** — NVDA, VoiceOver, TalkBack (findet ~43 % die Tools nicht finden)

### 7.4 Expo/React Native

Alles explizit: `accessibilityLabel`, `accessibilityRole`, `accessibilityState`. React Native AMA + `eslint-plugin-react-native-a11y`.

### 7.5 Filament v5 Lücken

Issues #8954, #4794, #14299. Intern vom BFSG nicht betroffen, bei Kunden-Portalen schon. Blade-Views publishen, ARIA ergänzen.

### 7.6 Geschäfts-Chance

Accessibility-Audits als Retainer-Service positionieren.

---

## 8. Sicherheit & DSGVO

### 8.1 Laravel Security

HTTPS, CSRF, Eloquent (SQL-Injection), Blade Escaping (XSS), .env geheim, 2FA (Fortify), RBAC (Spatie + Filament Shield), Rate Limiting, CSP Headers.

### 8.2 Auth

Sanctum: Cookie-basiert (Web SPA), Token-basiert (Mobile/API). CORS korrekt, Token-Rotation, Logout = invalidieren.

### 8.3 PostgreSQL

Niemals öffentlich. SSH-Tunnel oder internes Docker-Netzwerk. RLS für Mandantentrennung. SSL erzwingen.

### 8.4 DSGVO

Deutsche Server (Hetzner nbg1/fsn1). AV-Vertrag. Privacy by Design. Löschkonzepte. Art. 15/17. Qdrant-Telemetrie deaktivieren.

---

## 9. KI-Entwicklung

### 9.1 Tools

**Primär:** Claude Code in VS Code. **Ergänzend:** Filament Blueprint für Filament v5 Implementierungspläne.

### 9.2 AGENTS.md + CLAUDE.md

AGENTS.md: Universeller Standard (60.000+ Repos). Next.js 16.2 generiert sie automatisch bei `create-next-app`. CLAUDE.md: Unter 200 Zeilen, Claude-Code-spezifisch.

### 9.3 TypeScript

`strict: true`, keine `any`, Zod-Schemas in `packages/types/`, Discriminated Unions, explizite Return-Typen.

### 9.4 Workflow

Plan → Review → Atomare Tasks → Tests mitgenerieren → Refactoring separat.

---

## 10. Monitoring

**Uptime Kuma** (One-Click): HTTP, TCP, DNS, 90+ Notifications. **Coolify Sentinel:** CPU, Memory, Disk, Netzwerk pro Container. **Erweitert:** Grafana+Loki, Sentry bei Bedarf.

---

## 11. Konventionen

### Naming

| Bereich | Konvention | Beispiel |
|---------|-----------|---------|
| DB-Container intern | `pg-om-zentral` | — |
| DB-Container Kunden | `pg-client-[name]` | `pg-client-book` |
| Datenbanken intern | `om_[dienst]` | `om_platform` |
| Datenbanken Kunden | `client_[name]_[env]` | `client_book_prod` |
| Laravel Models | PascalCase Singular | `Customer` |
| API-Endpunkte | kebab-case versioniert | `/api/v1/customer-projects` |
| React-Komponenten | PascalCase | `CustomerCard.tsx` |
| Zod-Schemas | PascalCase + Schema | `CustomerSchema` |
| Git-Branches | feature/, fix/ | `feature/crm-pipeline` |
| Git-Commits | Conventional Commits | `feat:`, `fix:`, `chore:` |

### Code-Qualität

TypeScript strict, ESLint jsx-a11y als Error, Prettier, Laravel PSR-12, Smoke-Tests für API, Accessibility-Tests für UI, Conventional Commits.

---

> **Dieses Dokument ist die einzige Wahrheitsquelle für den ObladenMedia Tech Stack.**
