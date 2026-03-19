#!/usr/bin/env bash
# OMNIPULSE — SSH-Tunnel zu Coolify PostgreSQL + Redis
#
# Nutzung:
#   ./scripts/tunnel.sh        → Tunnel starten
#   ./scripts/tunnel.sh stop   → Tunnel stoppen
#   ./scripts/tunnel.sh status → Status prüfen
#
# Voraussetzung: SSH-Key im Agent (ssh-add --apple-use-keychain ~/.ssh/id_ed25519)

SERVER="root@168.119.183.251"
PG_CONTAINER_IP="10.0.1.29"
REDIS_CONTAINER_IP="10.0.1.30"
LOCAL_PG_PORT=5433
LOCAL_REDIS_PORT=6380

case "${1:-start}" in
  start)
    # Prüfe ob Tunnel schon läuft
    if lsof -i:$LOCAL_PG_PORT >/dev/null 2>&1; then
      echo "Tunnel läuft bereits auf Port $LOCAL_PG_PORT"
      exit 0
    fi

    echo "Starte SSH-Tunnel zu Coolify..."
    ssh -f -N \
      -L ${LOCAL_PG_PORT}:${PG_CONTAINER_IP}:5432 \
      -L ${LOCAL_REDIS_PORT}:${REDIS_CONTAINER_IP}:6379 \
      -o ServerAliveInterval=60 \
      -o ServerAliveCountMax=3 \
      "$SERVER"

    sleep 1
    if lsof -i:$LOCAL_PG_PORT >/dev/null 2>&1; then
      echo "Tunnel aktiv:"
      echo "  PostgreSQL → localhost:${LOCAL_PG_PORT}"
      echo "  Redis      → localhost:${LOCAL_REDIS_PORT}"
    else
      echo "Fehler: Tunnel konnte nicht gestartet werden."
      echo "Ist dein SSH-Key geladen? (ssh-add -l)"
      exit 1
    fi
    ;;

  stop)
    # Finde und beende den SSH-Tunnel-Prozess
    PIDS=$(lsof -ti:$LOCAL_PG_PORT 2>/dev/null)
    if [ -n "$PIDS" ]; then
      kill $PIDS 2>/dev/null
      echo "Tunnel gestoppt."
    else
      echo "Kein aktiver Tunnel gefunden."
    fi
    ;;

  status)
    if lsof -i:$LOCAL_PG_PORT >/dev/null 2>&1; then
      echo "Tunnel aktiv:"
      echo "  PostgreSQL → localhost:${LOCAL_PG_PORT}"
      echo "  Redis      → localhost:${LOCAL_REDIS_PORT}"
    else
      echo "Kein aktiver Tunnel."
    fi
    ;;

  *)
    echo "Nutzung: $0 {start|stop|status}"
    exit 1
    ;;
esac
