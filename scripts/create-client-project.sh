#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# OMNIPULSE — Neues Kundenprojekt erstellen
# ============================================================
#
# Erstellt ein neues Kundenprojekt basierend auf OMNIPULSE-Templates.
# Registriert es als Git Submodule im Meta-Repo.
#
# Usage:
#   ./scripts/create-client-project.sh --name firmaxy --type website
#
# Optionen:
#   --name    Kundenname (kebab-case, z.B. "firmaxy")
#   --type    Projekttyp: website | webapp | portal | mobile | full
#   --org     GitHub-Organisation (default: obladenmedia)
#   --no-git  Kein Git-Repo erstellen (nur Dateien kopieren)

# === Defaults ===
CLIENT_NAME=""
PROJECT_TYPE=""
GITHUB_ORG="obladenmedia"
INIT_GIT=true
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
TEMPLATES_DIR="$ROOT_DIR/templates"
DATE=$(date +%Y-%m-%d)

# === Farben ===
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()   { echo -e "${GREEN}✅ $1${NC}"; }
warn()  { echo -e "${YELLOW}⚠️  $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}" >&2; exit 1; }

# === Args parsen ===
while [[ $# -gt 0 ]]; do
  case $1 in
    --name)   CLIENT_NAME="$2"; shift 2 ;;
    --type)   PROJECT_TYPE="$2"; shift 2 ;;
    --org)    GITHUB_ORG="$2"; shift 2 ;;
    --no-git) INIT_GIT=false; shift ;;
    *)        error "Unbekannte Option: $1" ;;
  esac
done

# === Validierung ===
[[ -z "$CLIENT_NAME" ]] && error "Client-Name fehlt. Nutzung: --name firmaxy"
[[ -z "$PROJECT_TYPE" ]] && error "Projekttyp fehlt. Nutzung: --type website|webapp|portal|mobile|full"
[[ ! "$CLIENT_NAME" =~ ^[a-z0-9-]+$ ]] && error "Client-Name muss kebab-case sein (a-z, 0-9, -)"

VALID_TYPES=("website" "webapp" "portal" "mobile" "full")
if [[ ! " ${VALID_TYPES[*]} " =~ " ${PROJECT_TYPE} " ]]; then
  error "Ungültiger Typ: $PROJECT_TYPE. Erlaubt: ${VALID_TYPES[*]}"
fi

REPO_NAME="client-$CLIENT_NAME"
PROJECT_DIR="$ROOT_DIR/../$REPO_NAME"

echo ""
echo "🚀 Erstelle Kundenprojekt: $REPO_NAME (Typ: $PROJECT_TYPE)"
echo "   Zielverzeichnis: $PROJECT_DIR"
echo ""

# === Verzeichnis erstellen ===
[[ -d "$PROJECT_DIR" ]] && error "Verzeichnis existiert bereits: $PROJECT_DIR"
mkdir -p "$PROJECT_DIR"

# === Templates kopieren ===
case $PROJECT_TYPE in
  website)
    if [[ -d "$TEMPLATES_DIR/nextjs-shadcn-base" ]]; then
      cp -r "$TEMPLATES_DIR/nextjs-shadcn-base/." "$PROJECT_DIR/" 2>/dev/null || true
    fi
    ;;
  portal)
    if [[ -d "$TEMPLATES_DIR/laravel-filament-base" ]]; then
      cp -r "$TEMPLATES_DIR/laravel-filament-base/." "$PROJECT_DIR/" 2>/dev/null || true
    fi
    ;;
  webapp|full)
    mkdir -p "$PROJECT_DIR/apps"
    if [[ -d "$TEMPLATES_DIR/nextjs-shadcn-base" ]]; then
      cp -r "$TEMPLATES_DIR/nextjs-shadcn-base" "$PROJECT_DIR/apps/web" 2>/dev/null || true
    fi
    if [[ -d "$TEMPLATES_DIR/laravel-filament-base" ]]; then
      cp -r "$TEMPLATES_DIR/laravel-filament-base" "$PROJECT_DIR/apps/backend" 2>/dev/null || true
    fi
    ;;
  mobile)
    if [[ -d "$TEMPLATES_DIR/expo-nativewind-base" ]]; then
      cp -r "$TEMPLATES_DIR/expo-nativewind-base/." "$PROJECT_DIR/" 2>/dev/null || true
    fi
    ;;
esac

# === Docker Compose kopieren ===
if [[ -f "$TEMPLATES_DIR/docker-compose-base/docker-compose.yml" ]]; then
  cp "$TEMPLATES_DIR/docker-compose-base/docker-compose.yml" "$PROJECT_DIR/docker-compose.yml"
  # Client-Name einsetzen
  sed -i "s/\${CLIENT_NAME:-example}/$CLIENT_NAME/g" "$PROJECT_DIR/docker-compose.yml" 2>/dev/null || true
fi

# === CLAUDE.md generieren ===
if [[ -f "$TEMPLATES_DIR/claude-template.md" ]]; then
  DISPLAY_NAME=$(echo "$CLIENT_NAME" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2))}1')

  sed -e "s/{{PROJECT_NAME}}/Client $DISPLAY_NAME/g" \
      -e "s/{{CLIENT_NAME}}/$DISPLAY_NAME/g" \
      -e "s/{{PROJECT_TYPE}}/$PROJECT_TYPE/g" \
      -e "s/{{DATE}}/$DATE/g" \
      "$TEMPLATES_DIR/claude-template.md" > "$PROJECT_DIR/CLAUDE.md"
  log "CLAUDE.md generiert"
fi

# === .env.example erstellen ===
cat > "$PROJECT_DIR/.env.example" << EOF
# Client: $CLIENT_NAME
# Typ: $PROJECT_TYPE

APP_ENV=local
APP_DEBUG=true

DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5433
DB_DATABASE=client_${CLIENT_NAME//-/_}_dev
DB_USERNAME=omnipulse
DB_PASSWORD=

REDIS_HOST=localhost
REDIS_PORT=6380
EOF
log ".env.example erstellt"

# === .gitignore erstellen ===
cat > "$PROJECT_DIR/.gitignore" << 'EOF'
node_modules/
vendor/
dist/
build/
.next/
.expo/
.env
.env.local
.env.*.local
!.env.example
.DS_Store
*.log
.turbo/
coverage/
EOF
log ".gitignore erstellt"

# === Git initialisieren ===
if $INIT_GIT; then
  cd "$PROJECT_DIR"
  git init -b main
  git add -A
  git commit -m "chore: initialize client-$CLIENT_NAME from OMNIPULSE template ($PROJECT_TYPE)"
  log "Git-Repository initialisiert"

  echo ""
  warn "Nächste Schritte:"
  echo "  1. GitHub-Repo erstellen:  gh repo create $GITHUB_ORG/$REPO_NAME --private"
  echo "  2. Remote setzen:          git remote add origin git@github.com:$GITHUB_ORG/$REPO_NAME.git"
  echo "  3. Pushen:                 git push -u origin main"
  echo "  4. Als Submodule:          cd obladen-projects && git submodule add git@github.com:$GITHUB_ORG/$REPO_NAME.git clients/$REPO_NAME"
fi

echo ""
log "Kundenprojekt '$REPO_NAME' erfolgreich erstellt in $PROJECT_DIR"
