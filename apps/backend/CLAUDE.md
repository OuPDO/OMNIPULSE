# CLAUDE.md — Laravel Backend

> App-spezifische Anweisungen für `apps/backend/`. Ergänzt die Root-CLAUDE.md.

## Stack

Laravel 12 + Filament v5 (Livewire v4) + PHP 8.2+ + PostgreSQL 17

## Architektur

- **Headless-API-First:** REST-API für Web/Mobile, Filament für Admin/Client-Portal
- **Modulare Struktur:** Business-Logik in `app/Modules/[Modul]/`, nie in Controllern
- **Zwei Filament-Panels:** `Admin` (internes Team), `Client` (Kunden-Portal)
- **RBAC:** Spatie Permission + Filament Shield

## Regeln

1. **Business-Logik** → Services/Actions in Modules, NIE in Controllern
2. **Validation** → FormRequest-Klassen, nie inline im Controller
3. **API-Versionierung** → `/api/v1/` Namespace, Controller in `Http/Controllers/Api/V1/`
4. **Eloquent** → Immer über Models/Scopes, keine Raw-Queries
5. **DTOs** → Spatie Laravel-Data für strukturierte Daten zwischen Layern
6. **Auth** → Sanctum (Cookie für SPA, Token für Mobile/API)
7. **Tests** → Pest/PHPUnit, jeder API-Endpunkt braucht mindestens einen Smoke-Test
8. **PSR-12** → PHP Code Style Standard

## Neues Modul anlegen

```bash
mkdir -p app/Modules/[Name]/{Models,Services,Policies,Events,Data,Actions}
```

## Filament Blueprint

Nutze `php artisan filament:blueprint` für Implementierungspläne bei Filament-Resources. Generiert besseren Code als manuelles Scaffolding.

## Datenbank-Naming

- Tabellen: `snake_case` Plural (`customer_projects`)
- Pivot: alphabetisch (`company_contact`)
- Container: `pg-om-zentral`, DB: `om_platform`
