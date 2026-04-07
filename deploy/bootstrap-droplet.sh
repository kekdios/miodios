#!/usr/bin/env bash
# One-time (and safe re-run) setup on Ubuntu 22.04/24.04: Node.js 24, deploy user, clone, build, systemd.
# Intended to be copied to the server (e.g. via deploy/provision.sh) and run as root:
#   bash /root/miodios-deploy/bootstrap-droplet.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GIT_REPO="${GIT_REPO:-https://github.com/kekdios/miodios.git}"

apt-get update -y
apt-get install -y ca-certificates curl gnupg git

curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
apt-get install -y nodejs

if ! id deploy >/dev/null 2>&1; then
  useradd --create-home --shell /bin/bash deploy
fi

mkdir -p /opt/prayer
chown deploy:deploy /opt/prayer

install -m 0644 "${SCRIPT_DIR}/prayer.service" /etc/systemd/system/prayer.service
systemctl daemon-reload
systemctl enable prayer

if [[ -d /opt/prayer/.git ]]; then
  sudo -u deploy bash -lc 'cd /opt/prayer && git pull --ff-only'
else
  rm -rf /opt/prayer
  mkdir -p /opt/prayer
  chown deploy:deploy /opt/prayer
  sudo -u deploy git clone "$GIT_REPO" /opt/prayer
fi

if [[ ! -f /opt/prayer/.env ]]; then
  sudo -u deploy cp /opt/prayer/.env.example /opt/prayer/.env
  echo "Created /opt/prayer/.env from .env.example — edit with production secrets (SPRITE_API_KEY, etc.)."
fi

sudo -u deploy bash -lc 'cd /opt/prayer && npm ci && npm run build'

echo 'deploy ALL=(ALL) NOPASSWD: /bin/systemctl restart prayer' >/etc/sudoers.d/prayer-deploy
chmod 0440 /etc/sudoers.d/prayer-deploy

systemctl restart prayer
systemctl --no-pager status prayer || true

echo "Done. Node $(node -v). App on 127.0.0.1:8080."
echo "On this host, install nginx + ufw (do not paste firewall lines into your Mac zsh):"
echo "  sudo bash /opt/prayer/deploy/setup-nginx-and-firewall.sh"
