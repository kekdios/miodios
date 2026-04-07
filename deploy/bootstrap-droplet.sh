#!/usr/bin/env bash
# One-time setup on Ubuntu 22.04/24.04: Node.js 20 LTS + systemd unit for the app.
# Run as root: sudo bash deploy/bootstrap-droplet.sh
#
# Before this: create a `deploy` user, clone the repo to /opt/prayer owned by deploy,
# and copy .env.example to /opt/prayer/.env with production values.

set -euo pipefail

apt-get update -y
apt-get install -y ca-certificates curl gnupg

curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
install -m 0644 "${SCRIPT_DIR}/prayer.service" /etc/systemd/system/prayer.service
systemctl daemon-reload
systemctl enable prayer

echo "Node $(node -v) installed. Next:"
echo "  cd /opt/prayer && sudo -u deploy npm ci && sudo -u deploy npm run build"
echo "  sudo systemctl start prayer"
echo "Optionally allow GitHub deploy user to restart:"
echo "  echo 'deploy ALL=(ALL) NOPASSWD: /bin/systemctl restart prayer' | sudo tee /etc/sudoers.d/prayer-deploy"
