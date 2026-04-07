#!/usr/bin/env bash
# If certbot saved the cert but failed to install into nginx ("could not find matching
# server block for www..."), your HTTP server_name must list every hostname on the cert.
#
# Run as root AFTER editing nginx (or let this script try a common fix for miodios.com):
#   sudo bash /opt/prayer/deploy/fix-certbot-nginx-install.sh
#
# Then:
#   sudo certbot install --cert-name miodios.com

set -euo pipefail

CONFIG="${NGINX_SITE:-/etc/nginx/sites-available/prayer}"

if [[ ! -f "$CONFIG" ]]; then
  echo "Missing $CONFIG — set NGINX_SITE=... to your site file." >&2
  exit 1
fi

cp -a "$CONFIG" "${CONFIG}.bak.$(date +%s)"

# Common case: only apex in server_name; cert includes www — add www.
if grep -qE '^\s*server_name\s+miodios\.com\s*;\s*$' "$CONFIG"; then
  sed -i 's/^\(\s*server_name\) miodios\.com\(\s*;\s*\)$/\1 miodios.com www.miodios.com\2/' "$CONFIG"
  echo "Updated server_name to include www.miodios.com in $CONFIG"
elif grep -q 'www.miodios.com' "$CONFIG"; then
  echo "www.miodios.com already appears in $CONFIG — no change."
else
  echo "Could not auto-fix. Manually set in BOTH :80 (and :443 if present) blocks:" >&2
  echo "  server_name miodios.com www.miodios.com;" >&2
  echo "Then: nginx -t && systemctl reload nginx && certbot install --cert-name miodios.com" >&2
  exit 1
fi

nginx -t
systemctl reload nginx

echo "Nginx OK. Now run:"
echo "  certbot install --cert-name miodios.com"
