# Docker Compose Base Template

Basis-Setup für Kundenprojekte: PostgreSQL 17 + Redis.

## Verwendung

```bash
# Variablen setzen
export CLIENT_NAME=firmaxy
export ENV=dev
export DB_PORT=5433

# Starten
docker compose up -d
```

## Naming-Konventionen

- Container: `pg-client-[name]`
- Datenbank: `client_[name]_[env]`
