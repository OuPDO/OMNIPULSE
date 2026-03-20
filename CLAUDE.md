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

## Entwicklungs-Workflow

### Gold-Standard: Superpowers Plugin

Das **Superpowers Plugin** ist der verbindliche Entwicklungsstandard für alle nicht-trivialen Arbeiten. Es steuert den gesamten Lifecycle automatisch über Skills:

```
Brainstorming → Writing Plans → Executing Plans → Verification → Code Review → Finish Branch
```

**Kern-Skills und wann sie greifen:**

| Skill | Wann |
|-------|------|
| `superpowers:brainstorming` | **Immer vor kreativer Arbeit** — Features, Komponenten, Architekturänderungen |
| `superpowers:writing-plans` | Nach genehmigtem Design, vor Code |
| `superpowers:subagent-driven-development` | Plan ausführen: 1 Subagent pro Task + 2-Stage Review |
| `superpowers:executing-plans` | Alternative: Plan inline ausführen mit Checkpoints |
| `superpowers:test-driven-development` | Bei jeder Implementierung: RED → GREEN → REFACTOR |
| `superpowers:systematic-debugging` | Bei Bugs: 4-Phasen Root-Cause-Analyse |
| `superpowers:verification-before-completion` | **Immer vor Completion-Claims** — Evidenz vor Behauptungen |
| `superpowers:requesting-code-review` | Code Review vor Merge |
| `superpowers:using-git-worktrees` | Isolierte Workspaces für Feature-Branches |
| `superpowers:finishing-a-development-branch` | Branch abschließen: Merge/PR/Keep/Discard |
| `superpowers:dispatching-parallel-agents` | Parallele Subagent-Workflows |

**Prioritäts-Regel:** Wenn auch nur 1% Chance besteht, dass ein Superpowers-Skill relevant ist → Skill aufrufen. Im Zweifel immer nutzen.

### `/feature-dev` — Ergänzender Feature-Workflow

Das Feature-Dev Plugin (`.claude/plugins/feature-dev/`) ergänzt Superpowers mit OMNIPULSE-spezifischen Agents für schnelle Codebase-Analyse:

- **code-explorer** (gelb) — Codebase-Analyse, kennt Monorepo-Struktur & Module
- **code-architect** (grün) — Architektur-Entwürfe mit OMNIPULSE-Constraints
- **code-reviewer** (rot) — Prüft gegen alle CLAUDE.md-Regeln, Confidence ≥ 80

**Nutzung:** `/feature-dev Beschreibung des Features` — kann mit Superpowers kombiniert werden.

### Quick Fix — Triviale Änderungen

Für einfache Fixes ohne Architekturentscheidung (Typos, Config, 1-Zeilen-Bug-Fix):
1. Context7 nur wenn API-Unsicherheit besteht
2. Direkt implementieren
3. Playwright-Check wenn UI betroffen
4. Verification before Completion — auch bei Quick Fixes gilt: Evidenz vor Behauptungen

### CLAUDE.md-Pflege — Projekt-Gedächtnis aktuell halten

Das **claude-md-management Plugin** sorgt dafür, dass alle CLAUDE.md-Dateien aktuell bleiben:

- **`/revise-claude-md`** — Am Ende einer Session: Learnings in CLAUDE.md aufnehmen
- **`claude-md-improver` Skill** — Periodisch oder nach größeren Änderungen: Audit aller CLAUDE.md-Dateien gegen Codebase-Stand

**Wann CLAUDE.md aktualisieren:**

| Auslöser | Aktion |
|----------|--------|
| Neues Modul/Feature abgeschlossen | Prüfen ob Root + Modul-CLAUDE.md aktuell sind |
| Neue Befehle/Patterns entdeckt | In passende CLAUDE.md aufnehmen |
| Größerer Meilenstein erreicht | `/revise-claude-md` + `claude-md-improver` Audit |
| Tech-Stack-Änderung (Package-Upgrade, neue Dependency) | Sofort aktualisieren |
| Session mit vielen Learnings beenden | `/revise-claude-md` |

**CLAUDE.md Hierarchie für OMNIPULSE:**
```
CLAUDE.md                              → Root: Tech Stack, Workflows, Regeln
├── apps/backend/CLAUDE.md             → Laravel/Filament-spezifisch
│   └── app/Modules/*/CLAUDE.md        → Modul-spezifisch (CRM, Billing, etc.)
├── apps/web/CLAUDE.md                 → Next.js-spezifisch
├── apps/mobile/CLAUDE.md              → Expo-spezifisch
└── packages/*/CLAUDE.md               → Package-spezifisch (types, tokens, etc.)
```

**Prinzip:** Jede CLAUDE.md dokumentiert nur, was für ihren Scope relevant ist. Keine Duplikation zwischen Ebenen.

## Pflicht-Tools in allen Workflows

### Context7 Plugin — Doku-Recherche
- **Wann:** Neue APIs, unbekannte Libraries, Version-Unsicherheit (Laravel 12, Next.js 16, Filament v5, Tailwind v4)
- **Wie:** Erst Library-ID auflösen, dann Doku abfragen
- **Überspringen wenn:** Pattern bekannt & sicher, einfacher Bug-Fix ohne neue APIs

### Playwright CLI — UI-Verifikation
- **IMMER** nach UI-Änderungen, Routing-Änderungen, Auth/Middleware-Änderungen
- **Optional** bei reinen Backend-Logik-Änderungen ohne UI-Impact
- Screenshots, Interaktionen, Console-Error-Checks

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
12. **Context7 Plugin** für Doku-Checks bei neuen/unsicheren APIs nutzen
13. **Superpowers Plugin** als Gold-Standard für alle Entwicklungs-Workflows
14. **`/feature-dev`** für OMNIPULSE-spezifische Codebase-Analyse bei neuen Features
15. **CLAUDE.md-Pflege** nach Meilensteinen und größeren Features — `/revise-claude-md` + Audit

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
