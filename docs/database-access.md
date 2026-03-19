# OMNIPULSE — Datenbankzugang

> PostgreSQL wird **nie** öffentlich exponiert. Zugriff nur via SSH-Tunnel oder internes Docker-Netzwerk auf Coolify.

## Coolify-Ressourcen

| Ressource  | UUID | Container |
|------------|------|-----------|
| PostgreSQL | `r0kkc0s8woks80kg8kww80ow` | `pg-om-zentral` |
| Redis      | `vcowgo0ogcs484s4ocsocg0s` | `om-redis` |
| Projekt    | `u0kccs808c8k8k8kowcs44gk` | OMNIPULSE |

## Entwicklung via SSH-Tunnel

### Tunnel öffnen

```bash
# PostgreSQL (lokal :5433) + Redis (lokal :6380)
ssh -L 5433:localhost:5432 -L 6380:localhost:6379 root@<server-ip>
```

Danach kann Laravel lokal gegen die Coolify-DB arbeiten (`DB_PORT=5433`, `REDIS_PORT=6380`).

### Beekeeper Studio / DBeaver / pgAdmin

| Feld         | Wert                     |
|--------------|--------------------------|
| SSH Host     | `<server-ip>`            |
| SSH Port     | `22`                     |
| SSH User     | `root`                   |
| SSH Key      | `~/.ssh/id_ed25519`      |
| DB Host      | `localhost` (via Tunnel) |
| DB Port      | `5432`                   |
| Database     | `om_platform`            |
| User         | `omnipulse`              |
| Password     | *(siehe `.env` oder Coolify Dashboard)* |

### Laravel .env (lokale Entwicklung)

```env
DB_HOST=127.0.0.1
DB_PORT=5433          # SSH-Tunnel
DB_DATABASE=om_platform
DB_USERNAME=omnipulse

REDIS_HOST=127.0.0.1
REDIS_PORT=6380       # SSH-Tunnel
```

## Interne Coolify-URLs (für Produktion)

Apps auf dem gleichen Coolify-Server nutzen die internen Docker-URLs:

```env
# PostgreSQL
DATABASE_URL=postgres://omnipulse:<password>@r0kkc0s8woks80kg8kww80ow:5432/om_platform

# Redis
REDIS_URL=redis://default:<password>@vcowgo0ogcs484s4ocsocg0s:6379/0
```

## Sicherheitsregeln

1. **Kein öffentlicher Port** — PostgreSQL/Redis nur intern oder via SSH-Tunnel
2. **SSH-Key-Only** — Passwort-Auth ist auf dem Server deaktiviert
3. **Starke Passwörter** — Generiert via Coolify, nie im Code
4. **Regelmäßige Backups** — Siehe `infrastructure/backups/`
5. **Keine Wildcards** — `pg_hba.conf` erlaubt nur spezifische Netzwerke
