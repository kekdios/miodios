#!/usr/bin/env bash
# Run on the droplet as root after HTTP works and DNS points here.
# Let's Encrypt needs a valid email for expiry notices.
#
#   sudo CERTBOT_EMAIL=you@yourdomain.com bash deploy/enable-https.sh
#
# Optional: only one host (no www):
#   sudo CERTBOT_EMAIL=you@yourdomain.com bash deploy/enable-https.sh miodios.com

set -euo pipefail

EMAIL="${CERTBOT_EMAIL:-}"
if [[ -z "$EMAIL" ]]; then
  echo "Set CERTBOT_EMAIL to your real address, e.g.:" >&2
  echo "  sudo CERTBOT_EMAIL=you@example.com bash $0" >&2
  exit 1
fi

DOMAIN_PRIMARY="${1:-miodios.com}"

apt-get update -y
apt-get install -y certbot python3-certbot-nginx

# Obtain cert and let certbot patch nginx for :443 + redirect HTTP→HTTPS
if [[ "$DOMAIN_PRIMARY" == "miodios.com" ]]; then
  certbot --nginx \
    --non-interactive \
    --agree-tos \
    -m "$EMAIL" \
    -d miodios.com \
    -d www.miodios.com
else
  certbot --nginx \
    --non-interactive \
    --agree-tos \
    -m "$EMAIL" \
    -d "$DOMAIN_PRIMARY"
fi

nginx -t
systemctl reload nginx

echo "HTTPS should be live. Test: curl -sI https://${DOMAIN_PRIMARY}"
echo "Renewal is installed as a systemd timer; check: systemctl status certbot.timer"
