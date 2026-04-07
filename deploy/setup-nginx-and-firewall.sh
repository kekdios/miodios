#!/usr/bin/env bash
# Run on the droplet as root after the app is built and systemd is running.
# Usage:
#   sudo bash /opt/prayer/deploy/setup-nginx-and-firewall.sh
# With a domain (HTTP only here; add TLS separately, e.g. certbot):
#   sudo bash /opt/prayer/deploy/setup-nginx-and-firewall.sh app.example.com

set -euo pipefail

DOMAIN="${1:-}"

apt-get update -y
apt-get install -y nginx

if [[ -n "$DOMAIN" ]]; then
  NGINX_CONF=$(cat <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN};

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF
)
else
  NGINX_CONF=$(cat <<'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
EOF
)
fi

printf '%s\n' "$NGINX_CONF" >/etc/nginx/sites-available/prayer
ln -sf /etc/nginx/sites-available/prayer /etc/nginx/sites-enabled/prayer
rm -f /etc/nginx/sites-enabled/default

nginx -t
systemctl enable nginx
systemctl reload nginx

ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "nginx is proxying to 127.0.0.1:8080. ufw is enabled (22, 80, 443)."
if [[ -z "$DOMAIN" ]]; then
  echo "For a real hostname, re-run with: $0 your.domain.com then add HTTPS (e.g. certbot --nginx)."
fi
