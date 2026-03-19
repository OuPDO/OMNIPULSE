# OMNIPULSE — API Contracts

> Wird in Phase 2 (Laravel Backend) mit konkreten Endpunkten befüllt.

## Konventionen

- Base URL: `https://api.omnipulse.oblm.de/api/v1/`
- Auth: Laravel Sanctum (Cookie für SPA, Token für Mobile/API)
- Format: JSON, UTF-8
- HTTP-Methoden: GET (lesen), POST (erstellen), PATCH (updaten), DELETE (löschen)
- Status-Codes: 200 (OK), 201 (Created), 204 (No Content), 400, 401, 403, 404, 422, 429, 500

## Endpunkt-Übersicht

| Methode | Pfad | Beschreibung |
|---------|------|-------------|
| POST | `/sanctum/csrf-cookie` | CSRF-Cookie initialisieren |
| POST | `/api/v1/auth/login` | Login |
| POST | `/api/v1/auth/logout` | Logout |
| GET | `/api/v1/me` | Aktueller User |
| GET | `/api/v1/users` | User-Liste (paginiert) |
| ... | ... | Wird erweitert |
