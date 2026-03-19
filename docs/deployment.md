# OMNIPULSE — Deployment

> Coolify auf Hetzner (deutsche Server). Details in `ObladenMedia-Tech-Stack-Wissensdokument.md` Abschnitt 4.

## Pipeline

```
Push auf main/staging → GitHub Action → Build Image → GHCR Push → Coolify Webhook → Deploy
```

## Environments

| Environment | Branch | URL |
|------------|--------|-----|
| Production | `main` | `omnipulse.oblm.de` |
| Staging | `staging` | `staging.omnipulse.oblm.de` |
| Local | `feature/*` | `localhost:3000` (Web), `localhost:8000` (API) |

## Docker-Services

Siehe `infrastructure/docker-compose.yml` für lokale Entwicklung.
Siehe `infrastructure/docker-compose.prod.yml` für Production-Referenz.
