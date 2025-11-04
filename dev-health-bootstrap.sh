#!/usr/bin/env bash
set -euo pipefail
PORT="${PORT:-3000}"
HEALTH_URL="http://localhost:$PORT"
LOG_DIR=".logs"; LOG_FILE="$LOG_DIR/dev.log"

say(){ printf "\n\033[1;36m▶ %s\033[0m\n" "$*"; }
ok(){  printf "\033[1;32m✓ %s\033[0m\n" "$*"; }
fail(){ printf "\033[1;31m✗ %s\033[0m\n" "$*"; exit 1; }

[ -f package.json ] || fail "Run in repo root."

# Setup nvm if available
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  export NVM_DIR="$HOME/.nvm"
  . "$NVM_DIR/nvm.sh"
  nvm use default >/dev/null 2>&1 || true
fi

mkdir -p "$LOG_DIR"
: > "$LOG_FILE"

if [ ! -f .env.local ]; then
  cat > .env.local <<EOF
NEXT_PUBLIC_SITE_URL=http://localhost:$PORT
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
EOF
fi

if command -v lsof >/dev/null 2>&1; then
  PIDS=$(lsof -ti tcp:"$PORT" || true); [ -n "$PIDS" ] && kill -9 $PIDS || true
fi

# install deps
if command -v pnpm >/dev/null 2>&1; then pnpm i
elif command -v yarn >/dev/null 2>&1; then yarn
else npm i
fi

# validate content
npm run -s validate:content

# start dev server (background)
( PORT="$PORT" npm run dev ) >> "$LOG_FILE" 2>&1 &
DEV_PID=$!

# health wait
deadline=$(( $(date +%s) + 150 ))
while [ "$(date +%s)" -lt "$deadline" ]; do
  if curl -sSf "$HEALTH_URL" >/dev/null 2>&1; then ok "Dev server is up → $HEALTH_URL"; exit 0; fi
  sleep 2
done

fail "Dev didn't come up. Check logs: tail -n 200 $LOG_FILE"

