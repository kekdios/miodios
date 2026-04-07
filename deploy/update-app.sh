#!/usr/bin/env bash
# Deploy latest app on the droplet. Prefer the deploy user (owns /opt/prayer).
# As root, this script re-execs as deploy so git/npm are not "dubious ownership" failures.
#
#   bash /opt/prayer/deploy/update-app.sh
#   SKIP_GIT=1 bash /opt/prayer/deploy/update-app.sh   # after git is already updated (CI)

set -euo pipefail

APP_DIR="${APP_DIR:-/opt/prayer}"
SCRIPT_PATH="$(readlink -f "${BASH_SOURCE[0]}")"

if [[ $(id -u) -eq 0 ]] && id deploy &>/dev/null; then
  exec sudo -u deploy env SKIP_GIT="${SKIP_GIT:-}" APP_DIR="${APP_DIR:-/opt/prayer}" NODE_OPTIONS="${NODE_OPTIONS:-}" bash "$SCRIPT_PATH" "$@"
fi

cd "$APP_DIR"
git config --global --add safe.directory "$APP_DIR" 2>/dev/null || true

if [[ "${SKIP_GIT:-}" != "1" ]]; then
  git fetch origin main
  git reset --hard origin/main
fi

# Next.js build can spike memory; small droplets may OOM without swap — see deploy/add-swap.sh
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=4096}"

npm ci
npm run build
sudo systemctl restart prayer

echo "Updated and restarted prayer."
