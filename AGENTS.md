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
