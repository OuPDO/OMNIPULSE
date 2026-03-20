# AGENTS.md — OMNIPULSE

> Universelle KI-Agent-Konfiguration für alle Agents die in diesem Repository arbeiten.

## Identität

Dieses Repository ist **OMNIPULSE** — die zentrale Plattform der Digitalagentur ObladenMedia.
Architektur: Headless-API-First-Monorepo mit Laravel Backend und React-basierten Frontends.

## Tech Stack Constraints

### Festgeschrieben (nicht verhandelbar)
- Laravel 12 + Filament v5 (Backend)
- Next.js 16 + TypeScript strict (Web)
- Expo + NativeWind v4.1 (Mobile)
- PostgreSQL 17 (Datenbank)
- Redis (Cache/Queue)
- Qdrant (Vektor-DB)
- Tailwind CSS v4 + shadcn/ui (Styling)
- Turborepo + pnpm (Monorepo)
- Coolify auf Hetzner (Deployment)

### Paket-Installation
- Neue npm-Pakete: Nur mit Begründung, bevorzuge eingebaute APIs
- Neue Composer-Pakete: Spatie-Ökosystem bevorzugt
- Keine jQuery, Lodash (für einzelne Funktionen), Moment.js (date-fns oder Intl nutzen)

## Code-Konventionen

### TypeScript (Web + Mobile)
```typescript
// ✅ Korrekt
export function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// ❌ Falsch: any, kein Return-Type
export function calculateTotal(items: any) {
  return items.reduce((sum: any, item: any) => sum + item.price * item.quantity, 0);
}
```

### Laravel/PHP
```php
// ✅ Korrekt: Service-Pattern
class InvoiceService
{
    public function create(CreateInvoiceData $data): Invoice
    {
        // Business-Logik hier
    }
}

// ❌ Falsch: Logik im Controller
class InvoiceController extends Controller
{
    public function store(Request $request)
    {
        // Keine Business-Logik hier!
    }
}
```

### Naming-Konventionen
| Bereich | Konvention | Beispiel |
|---------|-----------|---------|
| Laravel Models | PascalCase Singular | `Customer` |
| Laravel Migrations | snake_case Datum-prefixed | `2026_03_19_create_customers_table` |
| API-Endpunkte | kebab-case versioniert | `/api/v1/customer-projects` |
| React-Komponenten | PascalCase | `CustomerCard.tsx` |
| React-Hooks | camelCase mit use-Prefix | `useCustomerData.ts` |
| Zod-Schemas | PascalCase + Schema | `CustomerSchema` |
| CSS-Klassen | Tailwind Utilities | Keine custom Classes |
| Env-Variablen | SCREAMING_SNAKE_CASE | `DATABASE_URL` |

## Git-Workflow

- **Branches:** `main` (Production), `staging` (Test), `feature/*`, `fix/*`, `chore/*`
- **Commits:** Conventional Commits — `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`
- **PRs:** Immer gegen `staging`, nie direkt gegen `main`
- **Reviews:** Mindestens 1 Approval vor Merge

## Entwicklungs-Workflows

### Gold-Standard: Superpowers Plugin

Das **Superpowers Plugin** ist der verbindliche Entwicklungsstandard. Es steuert den Lifecycle über spezialisierte Skills:

```
┌─────────────────────────────────────────────────────┐
│  BRAINSTORMING                                      │
│  → Idee → Design → Spec → Review → User-Approval   │
│  → IMMER vor kreativer Arbeit (auch "simple" Tasks) │
├─────────────────────────────────────────────────────┤
│  WRITING PLANS                                      │
│  → Spec → Bite-Sized Tasks → TDD-Steps              │
│  → Plan Review Loop bis sauber                      │
├─────────────────────────────────────────────────────┤
│  EXECUTION (wähle einen Modus)                      │
│  → Subagent-Driven: 1 Agent/Task + 2-Stage Review   │
│  → Inline: Batch-Execution mit Checkpoints          │
├─────────────────────────────────────────────────────┤
│  TDD (bei jeder Implementierung)                    │
│  → RED: Failing Test schreiben                      │
│  → GREEN: Minimaler Code zum Bestehen               │
│  → REFACTOR: Aufräumen, Tests grün halten           │
├─────────────────────────────────────────────────────┤
│  VERIFICATION                                       │
│  → Evidenz vor Behauptungen — IMMER                 │
│  → Command ausführen, Output lesen, DANN claimen    │
├─────────────────────────────────────────────────────┤
│  CODE REVIEW & FINISH                               │
│  → Review dispatchen, Feedback verarbeiten          │
│  → Branch abschließen: Merge/PR/Keep/Discard        │
└─────────────────────────────────────────────────────┘
```

**Kern-Prinzipien:**
- Wenn auch nur 1% Chance besteht, dass ein Skill greift → **Skill aufrufen**
- Kein Code ohne failing Test (TDD)
- Keine Completion-Claims ohne frische Verifikation
- Design vor Code — auch bei "simplen" Aufgaben

**Weitere Skills:**
- `superpowers:systematic-debugging` — 4-Phasen Root-Cause-Analyse bei Bugs
- `superpowers:using-git-worktrees` — Isolierte Workspaces
- `superpowers:dispatching-parallel-agents` — Parallele Subagent-Workflows

### `/feature-dev` Plugin — OMNIPULSE-spezifische Agents

Ergänzt Superpowers mit Agents die den OMNIPULSE Monorepo-Kontext kennen:

- **code-explorer** (gelb) — Codebase-Analyse, kennt Module, CLAUDE.md-Hierarchie
- **code-architect** (grün) — Architektur mit OMNIPULSE-Constraints (Services, Zod, Tokens)
- **code-reviewer** (rot) — Prüft gegen alle CLAUDE.md-Regeln, Confidence ≥ 80

**Nutzung:** `/feature-dev Beschreibung` — kann mit Superpowers kombiniert werden.

### Quick Fix — Triviale Änderungen

Für 1-Zeilen-Fixes, Typos, Config-Änderungen:
1. Context7 nur bei API-Unsicherheit
2. Direkt implementieren
3. Playwright-Check wenn UI betroffen
4. Verification before Completion — auch hier: Evidenz vor Behauptungen

### CLAUDE.md-Pflege — Projekt-Gedächtnis

CLAUDE.md-Dateien sind das kollektive Gedächtnis des Projekts. Sie **müssen aktuell bleiben**.

**Tools (claude-md-management Plugin):**
- `/revise-claude-md` — Session-Learnings in CLAUDE.md aufnehmen
- `claude-md-improver` Skill — Audit aller CLAUDE.md-Dateien gegen Codebase

**Pflicht-Auslöser:**

| Ereignis | Aktion |
|----------|--------|
| Feature/Modul abgeschlossen | Root + betroffene Modul-CLAUDE.md prüfen & aktualisieren |
| Neues Modul angelegt | Eigene `CLAUDE.md` im Modul-Ordner erstellen |
| Meilenstein erreicht | Vollständiger Audit mit `claude-md-improver` |
| Neue Patterns/Befehle entdeckt | In passende CLAUDE.md aufnehmen |
| Tech-Stack-Änderung | Sofort aktualisieren |
| Session mit Learnings beenden | `/revise-claude-md` |

**Hierarchie:**
```
CLAUDE.md                              → Root: Tech Stack, Workflows, Regeln
├── apps/backend/CLAUDE.md             → Laravel/Filament
│   └── app/Modules/*/CLAUDE.md        → Modul-spezifisch
├── apps/web/CLAUDE.md                 → Next.js
├── apps/mobile/CLAUDE.md              → Expo
└── packages/*/CLAUDE.md               → Packages
```

**Qualitätskriterien:** Konkret, aktuell, knapp. Jede Zeile muss Mehrwert bieten. Keine generischen Best Practices, keine Duplikation zwischen Ebenen.

---

## Pflicht-Tools

### Context7 Plugin — Doku-Recherche

| Situation | Context7? | Begründung |
|-----------|-----------|------------|
| Neues npm/Composer-Paket einbinden | Ja | API kann sich geändert haben |
| Laravel 12 / Filament v5 Feature nutzen | Ja | Neueste Versionen, Wissen ggf. veraltet |
| Next.js 16 neue APIs (RSC, Metadata) | Ja | Schnelle API-Änderungen |
| Tailwind v4 Klassen/Config | Ja | Großer Breaking Change von v3→v4 |
| Standard-CRUD in bekanntem Pattern | Nein | Bekanntes Terrain |
| Einfacher Bug-Fix ohne neue APIs | Nein | Kein Mehrwert |
| Expo/React Native Navigation | Prüfen | Nur bei Expo Router v4+ Unsicherheit |

### Playwright CLI — UI-Verifikation

- **IMMER** nach UI-Änderungen (Seiten, Komponenten, Layouts)
- **IMMER** nach Routing-Änderungen
- **IMMER** nach Auth/Middleware-Änderungen (Login-Flow testen)
- **Optional** bei reinen Backend-Logik-Änderungen ohne UI-Impact
- Skill: `playwright-cli`

## Testing-Anforderungen

- **Laravel:** PHPUnit/Pest, Feature-Tests für API-Endpunkte, Unit-Tests für Services
- **Next.js:** Jest + React Testing Library, Playwright für E2E
- **Mobile:** Jest + React Native Testing Library
- **Accessibility:** jest-axe in Unit-Tests, Pa11y CI in Pipeline
- **Minimum:** Jeder neue API-Endpunkt braucht mindestens einen Smoke-Test

## Sicherheits-Regeln

1. Keine Secrets in Code oder Git-History
2. SQL-Queries nur über Eloquent ORM
3. User-Input immer validieren (FormRequest / Zod)
4. CORS korrekt konfigurieren (nicht `*` in Production)
5. Rate-Limiting auf allen öffentlichen Endpunkten
6. HTTPS erzwingen

## Accessibility (BFSG/WCAG)

- ESLint `jsx-a11y` als **Error** (nicht Warn)
- Alle interaktiven Elemente keyboard-navigierbar
- Kontrast mindestens 4,5:1 (Text) / 3:1 (UI)
- Alt-Texte für alle Bilder
- ARIA-Labels wo semantisches HTML nicht reicht
- Fokus-Management bei Modals/Dialogen

## SEO

- Next.js Metadata API nutzen (nicht manuell `<meta>` setzen)
- `sitemap.ts` + `robots.ts` pflegen
- `next/image` mit `priority` für Above-the-Fold
- `next/font` für Zero-CLS
- Strukturierte Daten (JSON-LD) wo sinnvoll

## Dateien die nie geändert werden sollten

- `docs/ObladenMedia-Tech-Stack-Wissensdokument.md` (nur manuell updaten)
- `packages/tokens/src/tokens.json` (nur über Design-Token-Pipeline)
- `.env` Dateien (nie committen)
