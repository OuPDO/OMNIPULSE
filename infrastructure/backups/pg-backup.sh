#!/usr/bin/env bash
set -euo pipefail

# OMNIPULSE PostgreSQL Backup Script
# Usage: ./pg-backup.sh [container_name] [backup_dir]
# Default: backs up all PostgreSQL containers found via Docker

BACKUP_DIR="${2:-/tmp/omnipulse-backups}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RETENTION_DAYS=30

mkdir -p "$BACKUP_DIR"

backup_container() {
  local container="$1"
  local db_user
  local db_name

  db_user=$(docker exec "$container" printenv POSTGRES_USER 2>/dev/null || echo "omnipulse")
  db_name=$(docker exec "$container" printenv POSTGRES_DB 2>/dev/null || echo "om_platform")

  local backup_file="${BACKUP_DIR}/${container}_${db_name}_${TIMESTAMP}.sql.gz"

  echo "[$(date '+%H:%M:%S')] Backing up ${container}/${db_name}..."

  if docker exec "$container" pg_dumpall -U "$db_user" | gzip > "$backup_file"; then
    local size
    size=$(du -h "$backup_file" | cut -f1)
    echo "[$(date '+%H:%M:%S')] OK: ${backup_file} (${size})"
  else
    echo "[$(date '+%H:%M:%S')] FAILED: ${container}/${db_name}" >&2
    rm -f "$backup_file"
    return 1
  fi
}

cleanup_old_backups() {
  echo "[$(date '+%H:%M:%S')] Cleaning up backups older than ${RETENTION_DAYS} days..."
  find "$BACKUP_DIR" -name "*.sql.gz" -mtime +"$RETENTION_DAYS" -delete
}

# Main
if [ -n "${1:-}" ]; then
  backup_container "$1"
else
  # Auto-discover all PostgreSQL containers
  containers=$(docker ps --filter "ancestor=postgres" --format "{{.Names}}" 2>/dev/null || true)
  containers="${containers}$(docker ps --filter "ancestor=postgres:17-alpine" --format "{{.Names}}" 2>/dev/null || true)"

  if [ -z "$containers" ]; then
    echo "No PostgreSQL containers found." >&2
    exit 1
  fi

  failed=0
  for container in $containers; do
    backup_container "$container" || ((failed++))
  done

  cleanup_old_backups

  if [ "$failed" -gt 0 ]; then
    echo "WARNING: ${failed} backup(s) failed." >&2
    exit 1
  fi
fi

echo "[$(date '+%H:%M:%S')] All backups completed successfully."
