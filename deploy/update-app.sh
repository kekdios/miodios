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
  # npm must not run as root; root-owned node_modules breaks deploy's npm ci (EACCES).
  chown -R deploy:deploy "$APP_DIR"
  exec sudo -u deploy env SKIP_GIT="${SKIP_GIT:-}" APP_DIR="${APP_DIR:-/opt/prayer}" NODE_OPTIONS="${NODE_OPTIONS:-}" bash "$SCRIPT_PATH" "$@"
fi

cd "$APP_DIR" || exit 1

# If root ever ran npm here, node_modules can be root-owned; sudoers may allow deploy to fix (see bootstrap-droplet.sh).
if [[ $(id -un) == deploy ]]; then
  sudo -n chown -R deploy:deploy "$APP_DIR" 2>/dev/null || true
fi

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
