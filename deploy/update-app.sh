#!/usr/bin/env bash
# Deploy latest app on the droplet (run as the deploy user).
#
# Full update (git + build + restart) — typical manual use:
#   bash /opt/prayer/deploy/update-app.sh
#
# Only build + restart after repo is already updated (used by GitHub Actions):
#   SKIP_GIT=1 bash /opt/prayer/deploy/update-app.sh

set -euo pipefail

APP_DIR="${APP_DIR:-/opt/prayer}"
cd "$APP_DIR"

if [[ "${SKIP_GIT:-}" != "1" ]]; then
  git fetch origin main
  git reset --hard origin/main
fi

npm ci
npm run build
sudo systemctl restart prayer

echo "Updated and restarted prayer."
